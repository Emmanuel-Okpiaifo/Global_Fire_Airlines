import Link from "next/link";

const benefits = [
  {
    value: "First access",
    label: "Hear before the public when membership opens on the corridor.",
  },
  {
    value: "Your voice",
    label: "Tell us how often you fly and which tier fits your rhythm.",
  },
  {
    value: "Corporate priority",
    label: "Organisations get early consideration for staff block seats.",
  },
  {
    value: "No payment today",
    label: "One minute on the list. No deposit, no ticket, no commitment.",
  },
];

export function FoundingBenefits() {
  return (
    <section className="impact impact--founding" aria-label="Founding member benefits">
      <div className="wrap">
        <p className="eyebrow impact__eyebrow">Why join now</p>
        <div className="impact__inner">
          {benefits.map((item) => (
            <article key={item.value} className="impact__card">
              <p className="impact__value">{item.value}</p>
              <p className="impact__label">{item.label}</p>
            </article>
          ))}
        </div>
        <div className="impact__cta">
          <Link href="/#join" className="btn btn--primary">
            Join the founding circle
          </Link>
        </div>
      </div>
    </section>
  );
}
