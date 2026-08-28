import type { Lead } from "@/lib/leads";
import { kindLabel, membershipLabel, resolveSheetTab } from "@/lib/sheet-tabs";

export type SheetsPushResult =
  | { ok: true; sheet: string }
  | { ok: false; error: string; skipped?: boolean };

function webhookUrl(): string | undefined {
  return process.env.GOOGLE_SHEETS_WEBHOOK_URL || process.env.FORM_WEBHOOK_URL;
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

export async function pushLeadToGoogleSheets(lead: Lead): Promise<SheetsPushResult> {
  const url = webhookUrl();
  if (!url) {
    return { ok: false, error: "Google Sheets webhook URL is not configured.", skipped: true };
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildSheetsPayload(lead)),
      redirect: "follow",
    });

    const raw = await response.text();
    let data: { ok?: boolean; sheet?: string; error?: string } = {};
    try {
      data = raw ? (JSON.parse(raw) as typeof data) : {};
    } catch {
      data = { error: raw.slice(0, 200) || "Invalid response from Google Sheets." };
    }

    if (!response.ok || !data.ok) {
      return {
        ok: false,
        error: data.error ?? `Google Sheets returned HTTP ${response.status}.`,
      };
    }

    return { ok: true, sheet: data.sheet ?? resolveSheetTab(lead) };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return { ok: false, error: message };
  }
}
