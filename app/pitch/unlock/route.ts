import { NextRequest, NextResponse } from "next/server";
import { PITCH_COOKIE } from "@/lib/brand";

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const password = String(form.get("password") ?? "");
  const expected = process.env.PITCH_PASSWORD || "discernment";
  const origin = request.nextUrl.origin;

  if (password !== expected) {
    return NextResponse.redirect(new URL("/pitch?error=1", origin), 303);
  }

  const response = NextResponse.redirect(new URL("/pitch", origin), 303);
  response.cookies.set(PITCH_COOKIE, "granted", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
  return response;
}
