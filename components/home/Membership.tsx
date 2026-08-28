import Link from "next/link";

const tiers = [
  {
    num: "01",
    name: "Flame",
    summary: "Pay-per-seat when you need it — with fast-track handling baked in.",
    detail: "For the occasional premium traveller who wants calm, not chaos, on LOS–ABV.",
    founding: "Founding Flame members signal per-trip demand on the corridor.",
  },
  {
    num: "02",
    name: "Ember Elite",
    summary: "A subscription that bundles seats, queue-skip, and lounge access.",
    detail: "For people who live on this route and want the same experience every time.",
    founding: "Founding Ember members help us set subscription pricing and seat bundles.",
  },
  {
    num: "03",
    name: "Corporate",
    summary: "Block seats and staff subscriptions under one company dashboard.",
    detail: "For organisations that need mid-week certainty, not last-minute scrambling.",
    founding: "Founding corporate registrations shape block-seat tiers and volume pricing.",
  },
];

export function Membership() {
  return (
    <section className="rows" id="membership">
      <div className="wrap">
        <p className="eyebrow">Membership tiers</p>
        <h2 className="section-title">
          Pick the tier
          <br />
          that fits your rhythm.
        </h2>
        <p className="section-lead">
          None of these are on sale yet. Tell us which one matches how you actually
          move — so when membership opens, you are already in the right queue.
        </p>
        <div className="mt-10">
          {tiers.map((tier) => (
            <article key={tier.num} className="row">
              <div className="flex items-start gap-4">
                <span className="row__num">{tier.num}</span>
                <div>
                  <p className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">
                    {tier.name}
                  </p>
                  <h3 className="row__name mt-1">{tier.summary}</h3>
                </div>
              </div>
              <div>
                <p className="row__blurb">{tier.detail}</p>
                <p className="mt-2 text-sm font-semibold text-copper">{tier.founding}</p>
              </div>
              <Link href="/#join" className="btn btn--ghost-dark self-center whitespace-nowrap">
                Register as {tier.name}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
