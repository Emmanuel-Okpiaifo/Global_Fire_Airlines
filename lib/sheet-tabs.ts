import type { Lead, LeadKind } from "@/lib/leads";

/** Tab names inside the Google Spreadsheet — must match scripts/google-sheets-webhook.gs */
export const SHEET_TABS = {
  flame: "Flame",
  ember: "Ember Elite",
  foundingGeneral: "Founding General",
  corporate: "Corporate",
  counsel: "Counsel",
} as const;

export type SheetTabName = (typeof SHEET_TABS)[keyof typeof SHEET_TABS];

export function resolveSheetTab(lead: Pick<Lead, "kind" | "membershipInterest">): SheetTabName {
  if (lead.kind === "corporate") return SHEET_TABS.corporate;
  if (lead.kind === "counsel") return SHEET_TABS.counsel;

  const tier = lead.membershipInterest?.toLowerCase();
  if (tier === "flame") return SHEET_TABS.flame;
  if (tier === "ember") return SHEET_TABS.ember;
  return SHEET_TABS.foundingGeneral;
}

export const SHEET_TAB_LIST: SheetTabName[] = [
  SHEET_TABS.flame,
  SHEET_TABS.ember,
  SHEET_TABS.foundingGeneral,
  SHEET_TABS.corporate,
  SHEET_TABS.counsel,
];

export const MEMBERSHIP_LABELS: Record<string, string> = {
  flame: "Flame — pay per seat",
  ember: "Ember Elite — subscription",
  unsure: "Not sure yet",
};

export function membershipLabel(value?: string): string {
  if (!value) return "";
  return MEMBERSHIP_LABELS[value.toLowerCase()] ?? value;
}

export function kindLabel(kind: LeadKind): string {
  const labels: Record<LeadKind, string> = {
    founding: "Founding member",
    corporate: "Corporate",
    counsel: "Counsel",
  };
  return labels[kind];
}
