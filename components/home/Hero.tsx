import Link from "next/link";
import { MediaImage } from "@/components/MediaImage";

export function Hero() {
  return (
    <section className="hero" id="top" aria-label="Global Fire Airlines">
      <div className="hero__media" aria-hidden="true">
        <MediaImage
          src="/media/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero__img"
        />
        <div className="hero__veil" />
        <div className="grain" aria-hidden="true" />
      </div>

      <div className="hero__content">
        <p className="hero__live rise">
          <span className="hero__pulse" aria-hidden="true" />
          Founding membership · Lagos–Abuja
        </p>
        <h1 className="hero__brand rise" style={{ animationDelay: "0.08s" }}>
          <span className="block">A quieter way</span>
          <span className="hero__brand-last">to move.</span>
        </h1>
        <p className="hero__support rise" style={{ animationDelay: "0.16s" }}>
          Premium membership shuttle for the golden corridor. Join the founding circle
          — be first when we open.
        </p>
        <div className="hero__actions rise" style={{ animationDelay: "0.24s" }}>
          <Link href="/#join" className="btn btn--primary">
            Join the founding circle
          </Link>
          <Link href="/#corridor" className="btn btn--ghost">
            See what we are building
          </Link>
        </div>
        <div className="hero__stats rise" style={{ animationDelay: "0.32s" }}>
          <div className="stat-glass">
            <b>480 km</b>
            <span>Golden corridor</span>
          </div>
          <div className="stat-glass">
            <b>55–65</b>
            <span>Minutes in the air</span>
          </div>
          <div className="stat-glass">
            <b>₦200k</b>
            <span>Target seat*</span>
          </div>
        </div>
        <p className="hero__disclaimer rise" style={{ animationDelay: "0.4s" }}>
          *Planning fare, not live. Interest only — not a ticket sale.
        </p>
      </div>
    </section>
  );
}
