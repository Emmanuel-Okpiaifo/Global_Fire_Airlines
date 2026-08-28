import Link from "next/link";

const pains = [
  {
    title: "The meeting starts without you",
    copy: "A delayed or opaque departure on Lagos–Abuja can cost more than the fare — it costs the room.",
  },
  {
    title: "The same checks, every time",
    copy: "Document queues and manual handling eat the premium you thought you paid for.",
  },
  {
    title: "No one tells you why",
    copy: "Silence during delays is the fastest way to lose trust on Nigeria’s busiest domestic route.",
  },
];

export function Corridor() {
  return (
    <section className="overview" id="corridor">
      <div className="wrap">
        <p className="eyebrow">The corridor</p>
        <h2 className="section-title">
          You lose hours
          <br />
          before you board.
        </h2>
        <p className="overview__copy">
          Lagos–Abuja is Nigeria’s busiest domestic route — and for business and
          government travellers, it is rarely just a flight. It is whether you make
          the brief, the hearing, the deal.
        </p>
        <ul className="audience__list mt-10 border-t border-[var(--line)] pt-8">
          {pains.map((item) => (
            <li key={item.title}>
              <h3 className="font-bold text-[1.12rem] tracking-[-0.01em] text-navy">
                {item.title}
              </h3>
              <p className="mt-2 text-[0.98rem] text-[var(--muted)]">{item.copy}</p>
            </li>
          ))}
        </ul>
        <p className="overview__copy mt-10">
          Global Fire Airlines is designed as a membership-led premium shuttle on that
          corridor — light jets and turboprops, fast-track handling, digital identity,
          and communication that tells you what is happening before you have to ask.
        </p>
        <ul className="overview__meta">
          <li>
            <span>Route</span>
            <strong>Lagos (LOS) – Abuja (ABV)</strong>
          </li>
          <li>
            <span>In the air</span>
            <strong>55–65 minutes</strong>
          </li>
          <li>
            <span>Built for</span>
            <strong>Executives, officials, teams</strong>
          </li>
        </ul>
        <div className="mt-10">
          <Link href="/#join" className="btn btn--primary">
            I fly this corridor — join the list
          </Link>
        </div>
      </div>
    </section>
  );
}
