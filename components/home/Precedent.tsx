import Link from "next/link";
import { MediaImage } from "@/components/MediaImage";

export function Precedent() {
  return (
    <section className="split defer-section" id="precedent">
      <div className="split__grid">
        <div className="split__visual">
          <div className="split__photo-wrap">
            <MediaImage
              src="/media/cockpit.jpg"
              alt="Flight deck at dusk — imagery direction, not a GFA aircraft"
              fill
              sizes="(max-width: 960px) 100vw, 420px"
              className="split__photo"
            />
          </div>
          <p className="split__caption">Imagery direction · not a GFA aircraft</p>
        </div>
        <div>
          <p className="eyebrow">Why believe it</p>
          <h2 className="section-title">
            Premium on this route
            <br />
            already works.
          </h2>
          <p className="section-lead section-lead--wide">
            XEJet has flown an all-business Lagos–Abuja product since 2021 and moved
            to scheduled service in 2024. The corridor can support premium travel.
          </p>
          <p className="split__body">
            GFA is not trying to copy the same seat. We are building the membership
            layer on top — subscriptions, digital ID, corporate blocks, and a path to
            a wider network. Founding members help us prove that layer is wanted.
          </p>
          <Link href="/#join" className="btn btn--primary split__cta">
            Count me in
          </Link>
        </div>
      </div>
    </section>
  );
}
