import Link from "next/link";

export function Counsel() {
  return (
    <section className="quote-band" id="counsel">
      <div className="wrap">
        <p className="eyebrow" style={{ color: "var(--color-gold)" }}>
          Advisors & introductions
        </p>
        <h2 className="section-title" style={{ color: "var(--color-ivory)", maxWidth: "22ch" }}>
          Know someone who should see this?
        </h2>
        <p className="section-lead" style={{ color: "rgba(247,243,234,0.72)" }}>
          Aviation partners, corporate travel leads, or trusted counsel — use the
          Counsel tab on the founding form, or share this page with someone who flies
          the corridor every week.
        </p>
        <div className="hero__actions mt-8">
          <Link href="/#join" className="btn btn--primary">
            Open the founding form
          </Link>
          <Link href="/pitch" className="btn btn--ghost">
            Advisor briefing
          </Link>
        </div>
      </div>
    </section>
  );
}
