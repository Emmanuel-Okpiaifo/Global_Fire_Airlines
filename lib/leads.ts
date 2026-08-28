import { promises as fs } from "fs";
import path from "path";
import { pushLeadToGoogleSheets } from "@/lib/google-sheets";

export type LeadKind = "founding" | "corporate" | "counsel";

export type Lead = {
  id: string;
  createdAt: string;
  kind: LeadKind;
  name: string;
  email: string;
  city?: string;
  travellerType?: string;
  frequency?: string;
  company?: string;
  monthlySeats?: string;
  message?: string;
  membershipInterest?: string;
};

const dataDir = path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "leads.json");

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Netlify/Vercel serverless — project dir is read-only; use Google Sheets in production. */
function isServerlessHost(): boolean {
  return Boolean(process.env.NETLIFY || process.env.VERCEL);
}

export function validateLead(input: Partial<Lead> & { kind?: string }): string | null {
  if (!input.kind || !["founding", "corporate", "counsel"].includes(input.kind)) {
    return "Please choose how you would like to register interest.";
  }
  if (!input.name?.trim() || input.name.trim().length < 2) {
    return "Please share your name.";
  }
  if (!input.email?.trim() || !isValidEmail(input.email.trim())) {
    return "Please provide a valid email address.";
  }
  if (input.kind === "founding" && !input.city?.trim()) {
    return "Please tell us which city you travel from.";
  }
  if (input.kind === "corporate" && !input.company?.trim()) {
    return "Please include your organisation name.";
  }
  return null;
}

export type SaveLeadResult = {
  lead: Lead;
  sheets?: { ok: true; sheet: string } | { ok: false; error: string };
};

async function persistLeadLocally(lead: Lead): Promise<boolean> {
  if (isServerlessHost()) return false;

  try {
    await fs.mkdir(dataDir, { recursive: true });
    let existing: Lead[] = [];
    try {
      const raw = await fs.readFile(dataFile, "utf8");
      existing = JSON.parse(raw) as Lead[];
      if (!Array.isArray(existing)) existing = [];
    } catch {
      existing = [];
    }
    existing.push(lead);
    await fs.writeFile(dataFile, JSON.stringify(existing, null, 2), "utf8");
    return true;
  } catch (error) {
    console.warn("[leads] Local file save unavailable:", error);
    return false;
  }
}

export async function saveLead(input: Omit<Lead, "id" | "createdAt">): Promise<SaveLeadResult> {
  const lead: Lead = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
  };

  const localSaved = await persistLeadLocally(lead);
  const sheets = await pushLeadToGoogleSheets(lead);

  if (sheets.ok) {
    return { lead, sheets: { ok: true, sheet: sheets.sheet } };
  }

  if (isServerlessHost()) {
    const message = sheets.skipped
      ? "Form storage is not configured on this site. Please set GOOGLE_SHEETS_WEBHOOK_URL in Netlify."
      : sheets.error;
    throw new Error(message);
  }

  if (!localSaved) {
    throw new Error(
      sheets.skipped
        ? "Could not save your registration locally."
        : sheets.error || "Could not save your registration.",
    );
  }

  if (!sheets.skipped) {
    console.error("[leads] Google Sheets sync failed:", sheets.error);
  }

  return {
    lead,
    sheets: sheets.skipped ? undefined : { ok: false, error: sheets.error },
  };
}

async function readLeads(): Promise<Lead[]> {
  if (isServerlessHost()) return [];

  try {
    const raw = await fs.readFile(dataFile, "utf8");
    const parsed = JSON.parse(raw) as Lead[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function countLeads(): Promise<number> {
  const leads = await readLeads();
  return leads.length;
}
