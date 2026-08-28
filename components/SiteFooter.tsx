import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { brand } from "@/lib/brand";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <div>
          <BrandLogo variant="footer" />
          <p className="mt-3 max-w-sm text-[0.9rem] text-[var(--muted)]">{brand.tagline}</p>
          <p className="mt-2 max-w-md text-[0.88rem] leading-6 text-[var(--muted)]">{brand.stage}</p>
        </div>
        <div className="site-footer__cols">
          <div>
            <p className="eyebrow">This site</p>
            <Link href="/#join">Join the founding circle</Link>
            <Link href="/#membership">Membership tiers</Link>
            <Link href="/#counsel">Counsel & intros</Link>
            <Link href="/pitch">Advisor briefing</Link>
          </div>
          <div>
            <p className="eyebrow">Straight with you</p>
            <p className="max-w-[16rem] text-[0.9rem] leading-6 text-[var(--muted)]">
              Not licensed yet. Not selling tickets. Founding registration is interest
              only.
            </p>
          </div>
        </div>
      </div>
      <p className="site-footer__meta">Lagos, Nigeria · 2026 · Founding membership open</p>
    </footer>
  );
}
