const chips = [
  "Lagos",
  "Abuja",
  "Membership",
  "Digital ID",
  "OCC",
  "Corporate accounts",
  "Counsel",
  "Aviation partners",
  "LOS–ABV",
  "Ember Elite",
  "Flame",
  "Founding members",
];

export function Marquee() {
  const loop = [...chips, ...chips];
  return (
    <section className="marquee" aria-hidden="true">
      <p className="marquee__label">The language of the brand</p>
      <div className="marquee__wrap">
        <div className="marquee__track">
          {loop.map((item, i) => (
            <span key={`${item}-${i}`} className="marquee__item">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
