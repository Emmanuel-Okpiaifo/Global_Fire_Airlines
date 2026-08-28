import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { PitchDeck } from "@/components/PitchDeck";
import { PITCH_COOKIE } from "@/lib/brand";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Advisor briefing",
  robots: { index: false, follow: false },
};

export default async function PitchPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const jar = await cookies();
  const granted = jar.get(PITCH_COOKIE)?.value === "granted";
  const params = await searchParams;

  if (granted) {
    return (
      <main>
        <div className="absolute left-6 top-6 z-10">
          <Link href="/" className="text-[11px] tracking-[0.18em] uppercase text-gold">
            ← Public site
          </Link>
        </div>
        <PitchDeck />
      </main>
    );
  }

  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center bg-navy px-6 text-ivory">
      <Image
        src="/brand/mark.png"
        alt=""
        width={96}
        height={64}
        className="mb-8 h-16 w-auto"
      />
      <p className="eyebrow text-gold">Unlisted briefing</p>
      <h1 className="mt-4 max-w-lg text-center font-[family-name:var(--font-cormorant)] text-4xl">
        For advisors, not the open web.
      </h1>
      <p className="mt-4 max-w-md text-center text-sm leading-6 text-stone">
        This page restates the pitch deck for private counsel. It is not an offer to
        invest, and it is not a schedule of flights.
      </p>
      <form action="/pitch/unlock" method="post" className="mt-10 flex w-full max-w-sm flex-col gap-3">
        <label className="text-[11px] tracking-[0.16em] uppercase text-gold">
          Access phrase
          <input
            name="password"
            type="password"
            required
            className="mt-2 w-full border border-white/15 bg-navy-deep px-3 py-3 text-sm text-ivory outline-none focus:border-gold"
          />
        </label>
        {params.error && (
          <p className="text-sm text-gold">That phrase was not recognised.</p>
        )}
        <button
          type="submit"
          className="mt-2 bg-copper py-3 text-[12px] tracking-[0.18em] uppercase text-navy hover:bg-gold"
        >
          Enter briefing
        </button>
      </form>
      <Link href="/" className="mt-8 text-xs text-stone/70 hover:text-gold">
        Return to the public site
      </Link>
    </main>
  );
}
