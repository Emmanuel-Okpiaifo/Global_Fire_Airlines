export type PitchSlide = {
  number: string;
  kicker: string;
  title: string;
  body?: string;
  points?: string[];
  stats?: { value: string; label: string }[];
  footnote?: string;
};

export const pitchSlides: PitchSlide[] = [
  {
    number: "00",
    kicker: "Investor & advisor briefing · Lagos, Nigeria",
    title: "A premium Lagos–Abuja business-class shuttle, built for purposeful scale.",
    body: "Global Fire Airlines is a membership-led concept for Nigeria’s busiest domestic corridor. This briefing is for private counsel — not a request for a cheque.",
    points: [
      "Taking the Fire to the Nations",
      "Premium movement with meaning",
      "July 2026 · early research",
    ],
  },
  {
    number: "01",
    kicker: "The opportunity",
    title: "Start where time matters.",
    body: "A focused premium shuttle on Nigeria’s golden domestic corridor — designed to prove demand before the network expands.",
    stats: [
      { value: "480 km", label: "Approximate LOS–ABV distance" },
      { value: "55–65 min", label: "Typical block time" },
      { value: "₦200k", label: "Target seat price (hypothesis)" },
    ],
    points: [
      "Customer: business and government travellers who value time, privacy, and consistency.",
      "Fleet hypothesis: leased light jets and turboprops — fast dispatch, lower entry cost.",
    ],
    footnote:
      "Price is a planning hypothesis from the business plan, not a validated or currently offered fare.",
  },
  {
    number: "02",
    kicker: "Market validation",
    title: "Nigeria already proves the premium shuttle thesis.",
    body: "XEJet is a live precedent for premium, business-class-only Lagos–Abuja service and the path from charter operations to scheduled service.",
    points: [
      "2021 — XEJet launches as a Lagos-based charter carrier with an all-business-class LOS–ABV product.",
      "2022 — NCAA Air Operator’s Certificate received; non-scheduled charter operations established.",
      "2024 — ATL conversion; daily scheduled LOS–ABV service began 2 November.",
      "GFA’s intended wedge: membership economics, digital ID, proactive communications, and capital-gated expansion — not a copy of the same seat on the same schedule.",
    ],
    footnote:
      "The XEJet precedent is a validation signal, not a guarantee of GFA performance.",
  },
  {
    number: "03",
    kicker: "Customer experience",
    title: "GFA turns a flight into a membership relationship.",
    points: [
      "Flame — pay-per-seat access with standard fast-track handling, for the occasional premium traveller.",
      "Ember Elite — monthly or annual subscription bundling LOS–ABV seats, guaranteed queue-skip, and lounge access.",
      "Corporate accounts — dashboards for block seats and staff subscriptions; the primary driver of mid-week load factor.",
      "The product we intend to build: device-bound digital ID after one-time KYC; OCC-led updates; automatic rebooking or refund offers within 10 minutes of a cancellation.",
    ],
    footnote: "These are intended experience principles, not live product features.",
  },
  {
    number: "04",
    kicker: "Unit economics",
    title: "Economics of the 7-seat wedge.",
    stats: [
      { value: "₦1.4m", label: "Gross revenue per leg at target fare" },
      { value: "5–6", label: "Paid seats to cover direct flight cost" },
      { value: "71–86%", label: "Implied load-factor band" },
    ],
    points: [
      "Against an indicative one-way wet-lease cost of ₦7m–₦8m, pooled membership demand and corporate block bookings are what make per-seat economics work.",
      "Launch hypothesis: wet lease for rapid entry; migrate toward dry lease only as volumes and certification mature.",
    ],
    footnote: "Figures are indicative planning benchmarks, not operating results.",
  },
  {
    number: "05",
    kicker: "Regulatory strategy",
    title: "Regulatory sequencing is part of the strategy.",
    points: [
      "AOP — Airline Operating Permit for non-scheduled commercial air transport (charter). Proposed launch model.",
      "AOC — Air Operator’s Certificate (Nig.CARs Part 9). The non-negotiable safety gate. GFA does not hold one.",
      "ATL — Air Transport Licence for true scheduled operations. Upgrade path after a clean charter record.",
      "Recommended path: AOP + AOC filing → charter/membership launch → 12–18 months clean ops → ATL upgrade.",
    ],
    footnote: "No NCAA application has been filed. This is a sequence, not a live certification.",
  },
  {
    number: "06",
    kicker: "Regulatory capital",
    title: "Capital is a regulatory threshold, not a footnote.",
    stats: [
      { value: "₦500m", label: "Domestic paid-up capital floor" },
      { value: "₦1bn", label: "Regional / ECOWAS tier" },
      { value: "₦2bn", label: "Intercontinental tier" },
    ],
    points: [
      "Light-jet AOC statutory fees total about ₦5.4m — a small line beside manuals, insurance, leases, and postholder salaries.",
      "Budget 9–15 months of runway with no flying revenue during certification.",
      "A realistic all-in figure to reach AOC is more likely $1.5–3 million, not the statutory floor alone.",
    ],
  },
  {
    number: "07",
    kicker: "Scaling roadmap",
    title: "Scale only when the next proof point is earned.",
    points: [
      "Phase 0 — Formation: aviation partner, demand pilot, incorporation.",
      "Phase 1 — Certification: manuals, postholders, AOC/AOP issuance.",
      "Phase 2 — Launch: LOS–ABV shuttle and membership layer live.",
      "Phase 3 — Domestic ATL conversion; PHC, Kano, Enugu.",
      "Phase 4 — Regional ECOWAS: Accra, Cotonou, Dakar.",
      "Phase 5 — Global: London, Dubai, Johannesburg, US East Coast — only at the ₦2bn capital tier.",
    ],
    footnote: "The roadmap is capital-gated to NCAA statutory thresholds, not a calendar promise.",
  },
  {
    number: "08",
    kicker: "Risk and integrity",
    title: "The serious plan starts with the hard questions.",
    points: [
      "XEJet already does this — why would you succeed? Differentiate on recurring corporate membership and a multi-city ambition. Treat incumbents as possible pilot partners, not only rivals.",
      "Who on this team knows how to run an airline? No one yet. The first non-negotiable step is a NCAA-approved Accountable Manager and credentialed postholders before any formal filing.",
      "Is $1.5–3M realistic? Yes. Mitigate by starting with a lower-risk reseller pilot to prove demand before the full raise.",
    ],
  },
  {
    number: "09",
    kicker: "Strategic recommendation",
    title: "The smartest first move is smaller than the full vision.",
    points: [
      "Full vision: own AOC and fleet, ₦500m statutory floor, 9–15 months certification, aircraft leases and insurance.",
      "Smart first move: a reseller / membership pilot — sell seats on existing licensed charter operators. No GFA AOC or aircraft lease required initially.",
      "Goal of the pilot: replace assumptions with paid demand, corporate willingness to buy, and real load-factor evidence.",
    ],
  },
  {
    number: "10",
    kicker: "The next steps",
    title: "The ask today is counsel — not a cheque.",
    points: [
      "Secure an aviation partner: 2–3 serious conversations with retired captains or former airline operations directors.",
      "Scope the pilot: a membership/booking layer that resells seats on an existing AOC holder’s LOS–ABV flights.",
      "Seek counsel: bring the pilot concept and partner vetting to trusted advisors before CAC or NCAA filings.",
      "Conditional proceed: incorporate and begin NCAA Pre-Application only after demand is demonstrated and the core aviation team is in place.",
    ],
  },
  {
    number: "11",
    kicker: "Closing",
    title: "A promise kept in motion.",
    body: "Grounded enough to be trusted. Elevated enough to inspire. Warm enough to be remembered.",
    points: [
      "This site does not sell flights.",
      "This briefing does not constitute an offer of securities or a commitment to operate.",
      "Global Fire Airlines · 2026",
    ],
  },
];
