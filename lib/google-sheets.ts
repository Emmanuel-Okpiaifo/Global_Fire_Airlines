import type { Lead } from "@/lib/leads";
import { kindLabel, membershipLabel, resolveSheetTab } from "@/lib/sheet-tabs";

export type SheetsPushResult =
  | { ok: true; sheet: string }
  | { ok: false; error: string; skipped?: boolean };

const ACCESS_DENIED_MESSAGE =
  "Google Sheets is blocking the form. In the spreadsheet: Extensions → Apps Script → Deploy → Manage deployments → Edit. Set Who has access to Anyone (not “Anyone with a Google account”), click Deploy, then paste the new Web app URL into Netlify and redeploy.";

function normalizeWebhookUrl(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  // Common typo when copying URLs: hhttps://...
  const fixed = /^h+ttps:\/\//i.test(trimmed)
    ? trimmed.replace(/^h+(ttps:\/\/)/i, "https://")
    : trimmed;

  try {
    const parsed = new URL(fixed);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
      return null;
    }
    return parsed.toString();
  } catch {
    return null;
  }
}

function webhookUrl(): string | undefined {
  const raw = process.env.GOOGLE_SHEETS_WEBHOOK_URL || process.env.FORM_WEBHOOK_URL;
  if (!raw) return undefined;
  return normalizeWebhookUrl(raw) ?? undefined;
}

function isHtml(raw: string) {
  return /<!DOCTYPE html|<html[\s>]/i.test(raw);
}

function friendlySheetsError(status: number, raw: string, parsedError?: string): string {
  if (parsedError && !isHtml(parsedError)) return parsedError;
  if (status === 401 || status === 403 || isHtml(raw)) return ACCESS_DENIED_MESSAGE;
  if (status >= 500) return "Google Sheets is temporarily unavailable. Please try again in a moment.";
  return "Could not save to Google Sheets. Check the Apps Script deployment and try again.";
}

/** Payload sent to the Google Apps Script web app (see scripts/google-sheets-webhook.gs). */
export function buildSheetsPayload(lead: Lead) {
  const sheet = resolveSheetTab(lead);
  return {
    secret: process.env.GOOGLE_SHEETS_SECRET ?? "",
    sheet,
    id: lead.id,
    createdAt: lead.createdAt,
    kind: lead.kind,
    kindLabel: kindLabel(lead.kind),
    name: lead.name,
    email: lead.email,
    city: lead.city ?? "",
    travellerType: lead.travellerType ?? "",
    frequency: lead.frequency ?? "",
    membershipInterest: lead.membershipInterest ?? "",
    membershipLabel: membershipLabel(lead.membershipInterest),
    company: lead.company ?? "",
    monthlySeats: lead.monthlySeats ?? "",
    message: lead.message ?? "",
  };
}

/**
 * Apps Script web apps 302 to a googleusercontent URL with the JSON body.
 * Following that POST automatically can land on Google's login HTML (HTTP 401).
 */
async function postToAppsScript(url: string, body: string): Promise<Response> {
  const first = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body,
    redirect: "manual",
  });

  const location = first.headers.get("location");
  if (location && first.status >= 300 && first.status < 400) {
    return fetch(location, { method: "GET", redirect: "follow" });
  }

  if (first.type === "opaqueredirect" || (first.status >= 300 && first.status < 400)) {
    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body,
      redirect: "follow",
    });
  }

  return first;
}

export async function pushLeadToGoogleSheets(lead: Lead): Promise<SheetsPushResult> {
  const rawEnv = process.env.GOOGLE_SHEETS_WEBHOOK_URL || process.env.FORM_WEBHOOK_URL;
  const url = webhookUrl();

  if (!rawEnv?.trim()) {
    return {
      ok: false,
      error: "Google Sheets webhook URL is not configured.",
      skipped: true,
    };
  }

  if (!url) {
    return {
      ok: false,
      error:
        "GOOGLE_SHEETS_WEBHOOK_URL is invalid. Check Netlify env vars for typos (e.g. hhttps instead of https).",
    };
  }

  try {
    const response = await postToAppsScript(url, JSON.stringify(buildSheetsPayload(lead)));
    const raw = await response.text();
    let data: { ok?: boolean; sheet?: string; error?: string } = {};
    try {
      data = raw ? (JSON.parse(raw) as typeof data) : {};
    } catch {
      return {
        ok: false,
        error: friendlySheetsError(response.status, raw),
      };
    }

    if (!response.ok || !data.ok) {
      return {
        ok: false,
        error: friendlySheetsError(response.status, raw, data.error),
      };
    }

    return { ok: true, sheet: data.sheet ?? resolveSheetTab(lead) };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return { ok: false, error: `Could not reach Google Sheets: ${message}` };
  }
}
