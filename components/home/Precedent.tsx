import Link from "next/link";

export function Precedent() {
  return (
    <section className="split" id="precedent">
      <div className="split__grid">
        <div className="split__visual">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/media/cockpit.jpg"
            alt="Flight deck at dusk — imagery direction, not a GFA aircraft"
            className="split__photo"
          />
          <p className="split__caption">Imagery direction · not a GFA aircraft</p>
        </div>
        <div>
          <p className="eyebrow">Why believe it</p>
          <h2 className="section-title">
            Premium on this route
            <br />
            already works.
          </h2>
          <p className="section-lead" style={{ maxWidth: "38rem" }}>
            XEJet has flown an all-business Lagos–Abuja product since 2021 and moved
            to scheduled service in 2024. The corridor can support premium travel.
          </p>
          <p className="mt-4 max-w-xl leading-7 text-[#2c3a4a]">
            GFA is not trying to copy the same seat. We are building the membership
            layer on top — subscriptions, digital ID, corporate blocks, and a path to
            a wider network. Founding members help us prove that layer is wanted.
          </p>
          <Link href="/#join" className="btn btn--primary mt-8 inline-flex">
            Count me in
          </Link>
        </div>
      </div>
    </section>
  );
}
