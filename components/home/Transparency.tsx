export function Transparency() {
  return (
    <section className="steps" id="transparency" style={{ background: "#fffdf8" }}>
      <div className="wrap">
        <p className="eyebrow">Straight with you</p>
        <h2 className="section-title">What this is — and what it is not.</h2>
        <p className="section-lead">
          We would rather lose a signup than mislead anyone. Global Fire Airlines is
          not flying today, not licensed yet, and not selling seats on this site.
        </p>
        <ul className="mt-8 space-y-0">
          {[
            "Registering interest puts you on a founding list — not a booking or a membership purchase.",
            "Target fares and tiers are planning figures from our business research, not live prices.",
            "When a licensed operator partner is in place, founding members will be contacted first.",
          ].map((line) => (
            <li key={line} className="step">
              <span className="step__num" aria-hidden="true">
                ·
              </span>
              <p>{line}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
