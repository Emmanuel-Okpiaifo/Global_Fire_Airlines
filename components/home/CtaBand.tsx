import Link from "next/link";

export function CtaBand() {
  return (
    <section className="join" style={{ paddingTop: "clamp(3rem, 8vw, 5rem)" }}>
      <div className="wrap" style={{ textAlign: "center" }}>
        <h2 className="section-title" style={{ margin: "0 auto", maxWidth: "18ch" }}>
          The corridor is waiting.
          <br />
          So is your seat on the list.
        </h2>
        <p className="section-lead" style={{ margin: "1rem auto 0", maxWidth: "32rem" }}>
          If Lagos–Abuja is part of your life, put your name down. Founding members
          are how we prove this should be built — and you will be first to know when
          it is.
        </p>
        <div
          className="hero__actions"
          style={{ justifyContent: "center", marginTop: "1.75rem" }}
        >
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
