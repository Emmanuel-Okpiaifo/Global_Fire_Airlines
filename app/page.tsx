import dynamic from "next/dynamic";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Hero } from "@/components/home/Hero";
import { Corridor } from "@/components/home/Corridor";
import { FoundingBenefits } from "@/components/home/FoundingBenefits";

const Membership = dynamic(() =>
  import("@/components/home/Membership").then((m) => ({ default: m.Membership })),
);
const Join = dynamic(() =>
  import("@/components/home/Join").then((m) => ({ default: m.Join })),
);
const Experience = dynamic(() =>
  import("@/components/home/Experience").then((m) => ({ default: m.Experience })),
);
const Precedent = dynamic(() =>
  import("@/components/home/Precedent").then((m) => ({ default: m.Precedent })),
);
const Atmosphere = dynamic(() =>
  import("@/components/home/Atmosphere").then((m) => ({ default: m.Atmosphere })),
);
const CtaBand = dynamic(() =>
  import("@/components/home/CtaBand").then((m) => ({ default: m.CtaBand })),
);
const Transparency = dynamic(() =>
  import("@/components/home/Transparency").then((m) => ({ default: m.Transparency })),
);
const Counsel = dynamic(() =>
  import("@/components/home/Counsel").then((m) => ({ default: m.Counsel })),
);

export default function HomePage() {
  return (
    <div className="page">
      <SiteHeader />
      <main>
        <Hero />
        <Corridor />
        <FoundingBenefits />
        <Membership />
        <Join />
        <Experience />
        <Precedent />
        <Atmosphere />
        <CtaBand />
        <Transparency />
        <Counsel />
      </main>
      <SiteFooter />
    </div>
  );
}
