import { InterestForm } from "@/components/InterestForm";

const perks = [
  "First to know when founding membership opens on LOS–ABV",
  "Help shape Flame, Ember Elite, or Corporate tiers",
  "Priority consideration for corporate block seats",
  "Takes one minute. No payment or ticket today.",
];

export function Join() {
  return (
    <section className="join" id="join">
      <div className="wrap join__grid">
        <div>
          <p className="eyebrow">Founding circle</p>
          <h2 className="section-title">
            Claim your place
            <br />
            on the list.
          </h2>
          <p className="section-lead">
            If this corridor is part of your work, your name belongs here. Founding
            members are how we show partners and investors that premium membership on
            Lagos–Abuja is real demand — not a slide deck.
          </p>
          <ul className="mt-8 space-y-3">
            {perks.map((perk) => (
              <li
                key={perk}
                className="flex gap-3 text-[0.98rem] leading-relaxed text-[#2c3a4a]"
              >
                <span className="mt-0.5 font-bold text-copper" aria-hidden="true">
                  ✓
                </span>
                {perk}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-[var(--muted)]">
            Prefer counsel or an introduction? Choose the Counsel tab in the form.
          </p>
        </div>
        <div className="join__panel">
          <p className="mb-6 text-[1.25rem] font-bold tracking-[-0.015em] text-navy">
            Join in under a minute
          </p>
          <InterestForm />
        </div>
      </div>
    </section>
  );
}
