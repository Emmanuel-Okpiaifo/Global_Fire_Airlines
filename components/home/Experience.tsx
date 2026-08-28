import Link from "next/link";

const items = [
  {
    num: "01",
    title: "Tap-and-go digital ID",
    copy: "Verify once. Carry a Wallet pass. Skip the repeat document dance every time you show up at the GAT.",
  },
  {
    num: "02",
    title: "Updates before you ask",
    copy: "Reminders, check-in windows, and delay reasons pushed from one operations desk — not scattered staff messages.",
  },
  {
    num: "03",
    title: "Recovery without the hold queue",
    copy: "If a departure cancels, rebooking or credit offered in-app within minutes — not after three phone calls.",
  },
];

export function Experience() {
  return (
    <section className="steps" id="experience">
      <div className="wrap">
        <p className="eyebrow">What membership is for</p>
        <h2 className="section-title">
          Less friction.
          <br />
          More arrival.
        </h2>
        <p className="section-lead">
          This is the experience we are designing founding members toward — the reason
          to register interest now, not after launch.
        </p>
        <ol className="mt-10">
          {items.map((item) => (
            <li key={item.num} className="step">
              <span className="step__num">{item.num}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-10">
          <Link href="/#join" className="btn btn--primary">
            Join the founding circle
          </Link>
        </div>
      </div>
    </section>
  );
}
