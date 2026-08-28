import { NextResponse } from "next/server";
import { countLeads } from "@/lib/leads";

export async function GET() {
  const count = await countLeads();
  return NextResponse.json({ count });
}
