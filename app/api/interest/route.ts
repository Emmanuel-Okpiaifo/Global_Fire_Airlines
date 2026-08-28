import { NextRequest, NextResponse } from "next/server";
import { saveLead, validateLead, type LeadKind } from "@/lib/leads";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const kind = body.kind as LeadKind | undefined;
  const payload = {
    kind,
    name: String(body.name ?? ""),
    email: String(body.email ?? ""),
    city: body.city ? String(body.city) : undefined,
    travellerType: body.travellerType ? String(body.travellerType) : undefined,
    frequency: body.frequency ? String(body.frequency) : undefined,
    company: body.company ? String(body.company) : undefined,
    monthlySeats: body.monthlySeats ? String(body.monthlySeats) : undefined,
    message: body.message ? String(body.message) : undefined,
    membershipInterest: body.membershipInterest
      ? String(body.membershipInterest)
      : undefined,
  };

  const error = validateLead(payload);
  if (error || !payload.kind) {
    return NextResponse.json({ error: error ?? "Invalid form." }, { status: 400 });
  }

  try {
    const result = await saveLead({ ...payload, kind: payload.kind });
    return NextResponse.json({
      ok: true,
      sheet: result.sheets?.ok ? result.sheets.sheet : undefined,
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Could not save your registration.";
    console.error("[api/interest]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
