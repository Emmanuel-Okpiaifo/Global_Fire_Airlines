import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Hero } from "@/components/home/Hero";
import { Corridor } from "@/components/home/Corridor";
import { FoundingBenefits } from "@/components/home/FoundingBenefits";
import { Membership } from "@/components/home/Membership";
import { Join } from "@/components/home/Join";
import { Experience } from "@/components/home/Experience";
import { Precedent } from "@/components/home/Precedent";
import { Atmosphere } from "@/components/home/Atmosphere";
import { CtaBand } from "@/components/home/CtaBand";
import { Transparency } from "@/components/home/Transparency";
import { Counsel } from "@/components/home/Counsel";

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
