export function StatusStrip() {
  return (
    <section className="impact" aria-label="Where this stands">
      <div className="wrap">
        <div className="impact__inner">
          {[
            ["Early research", "Honest about the gaps. No launch date until proof exists."],
            ["No AOC", "No NCAA application has been filed."],
            ["No flights", "We do not operate, charter, or sell tickets."],
            ["Next gate", "Aviation partner + proven demand."],
          ].map(([value, label]) => (
            <div key={value}>
              <p className="impact__value">{value}</p>
              <p className="impact__label">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
