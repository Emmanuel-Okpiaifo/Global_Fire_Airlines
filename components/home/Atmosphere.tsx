const shots = [
  { src: "/media/clouds.jpg", alt: "Cloud layer from altitude", className: "gallery__item--1" },
  { src: "/media/cockpit.jpg", alt: "Cockpit at dusk", className: "gallery__item--2" },
  { src: "/media/jet.jpg", alt: "Light jet on the ramp", className: "gallery__item--3" },
  { src: "/media/runway.jpg", alt: "Aircraft on approach", className: "gallery__item--4" },
  { src: "/media/dusk.jpg", alt: "Travel at golden hour", className: "gallery__item--5" },
  { src: "/media/hero.jpg", alt: "Wing over the weather", className: "gallery__item--6" },
];

export function Atmosphere() {
  return (
    <section className="gallery" aria-label="Imagery direction">
      <div className="gallery__header wrap" style={{ paddingBottom: "2rem" }}>
        <p className="eyebrow">The view from above</p>
        <h2 className="section-title">
          Dawn light. Cloud layers.
          <br />
          A quieter way to move.
        </h2>
      </div>
      <div className="gallery__mosaic">
        {shots.map((shot) => (
          <figure key={shot.src} className={`gallery__item ${shot.className}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={shot.src} alt={shot.alt} />
          </figure>
        ))}
      </div>
    </section>
  );
}
