import Link from "next/link";

export function CtaBand() {
  return (
    <section className="join cta-band defer-section">
      <div className="wrap cta-band__inner">
        <h2 className="section-title cta-band__title">
          The corridor is waiting.
          <br />
          So is your seat on the list.
        </h2>
        <p className="section-lead cta-band__lead">
          If Lagos–Abuja is part of your life, put your name down. Founding members
          are how we prove this should be built — and you will be first to know when
          it is.
        </p>
        <div className="hero__actions cta-band__actions">
          <Link href="/#join" className="btn btn--primary">
            Join the founding circle
          </Link>
          <Link href="/#membership" className="btn btn--ghost-dark">
            Compare membership tiers
          </Link>
        </div>
      </div>
    </section>
  );
}
