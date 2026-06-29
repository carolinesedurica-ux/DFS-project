import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/* ─────────────────────────────────────────────
   Custom SVG Illustrations — one per division
───────────────────────────────────────────── */

function TruckIllustration() {
  return (
    <svg viewBox="0 0 280 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <line x1="0" y1="118" x2="280" y2="118" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      <line x1="30" y1="124" x2="80" y2="124" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeLinecap="round" />
      <line x1="110" y1="124" x2="160" y2="124" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeLinecap="round" />
      <line x1="190" y1="124" x2="240" y2="124" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeLinecap="round" />
      <rect x="14" y="44" width="140" height="62" rx="5" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
      <line x1="55"  y1="46" x2="55"  y2="104" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <line x1="95"  y1="46" x2="95"  y2="104" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <line x1="135" y1="46" x2="135" y2="104" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <rect x="24" y="54" width="36" height="18" rx="3" fill="rgba(217,165,32,0.25)" stroke="rgba(217,165,32,0.6)" strokeWidth="1" />
      <text x="42" y="66" textAnchor="middle" fill="#D9A520" fontSize="7" fontWeight="700" fontFamily="sans-serif">DFS</text>
      <rect x="155" y="52" width="100" height="54" rx="6" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
      <rect x="162" y="58" width="52" height="30" rx="4" fill="rgba(217,165,32,0.55)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      <rect x="162" y="52" width="86" height="8" rx="3" fill="rgba(255,255,255,0.1)" />
      <rect x="218" y="60" width="30" height="34" rx="3" fill="rgba(0,0,0,0.25)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      <line x1="222" y1="64" x2="222" y2="92" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      <line x1="230" y1="64" x2="230" y2="92" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      <line x1="238" y1="64" x2="238" y2="92" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      <rect x="246" y="62" width="8" height="5" rx="1.5" fill="#F0C75E" opacity="0.9" />
      <circle cx="42"  cy="118" r="14" fill="#1a0830" stroke="#D9A520" strokeWidth="2" />
      <circle cx="42"  cy="118" r="6"  fill="rgba(217,165,32,0.3)" />
      <circle cx="90"  cy="118" r="14" fill="#1a0830" stroke="#D9A520" strokeWidth="2" />
      <circle cx="90"  cy="118" r="6"  fill="rgba(217,165,32,0.3)" />
      <circle cx="128" cy="118" r="14" fill="#1a0830" stroke="#D9A520" strokeWidth="2" />
      <circle cx="128" cy="118" r="6"  fill="rgba(217,165,32,0.3)" />
      <circle cx="180" cy="118" r="14" fill="#1a0830" stroke="#D9A520" strokeWidth="2" />
      <circle cx="180" cy="118" r="6"  fill="rgba(217,165,32,0.3)" />
      <circle cx="230" cy="118" r="14" fill="#1a0830" stroke="#D9A520" strokeWidth="2" />
      <circle cx="230" cy="118" r="6"  fill="rgba(217,165,32,0.3)" />
      <line x1="0" y1="90"  x2="10" y2="90"  stroke="rgba(217,165,32,0.4)" strokeWidth="2" strokeLinecap="round" />
      <line x1="0" y1="98"  x2="14" y2="98"  stroke="rgba(217,165,32,0.3)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="0" y1="106" x2="8"  y2="106" stroke="rgba(217,165,32,0.2)" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function ClearingIllustration() {
  return (
    <svg viewBox="0 0 280 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <circle cx="110" cy="72" r="56" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
      <ellipse cx="110" cy="72" rx="56" ry="20" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      <line x1="54" y1="72" x2="166" y2="72" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      <path d="M110 16 Q135 44 135 72 Q135 100 110 128" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none" />
      <path d="M110 16 Q85 44 85 72 Q85 100 110 128" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none" />
      <line x1="110" y1="16" x2="110" y2="128" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <rect x="58" y="36" width="46" height="60" rx="4" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      <line x1="66" y1="50" x2="96" y2="50" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="66" y1="58" x2="96" y2="58" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="66" y1="66" x2="84" y2="66" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="66" y1="74" x2="96" y2="74" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeLinecap="round" />
      <path d="M148 30 C148 30 114 40 114 40 L114 80 C114 94 148 108 148 108 C148 108 182 94 182 80 L182 40 C182 40 148 30 148 30Z" fill="rgba(217,165,32,0.85)" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
      <path d="M148 38 C148 38 122 46 122 46 L122 80 C122 91 148 102 148 102 C148 102 174 91 174 80 L174 46 C174 46 148 38 148 38Z" fill="transparent" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      <path d="M133 72 L144 83 L165 58" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="210" cy="45" r="18" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3,3" />
      <circle cx="210" cy="45" r="12" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
      <text x="210" y="48" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="6" fontWeight="700" fontFamily="sans-serif">CLEARED</text>
      <circle cx="240" cy="100" r="14" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="2,2" />
      <circle cx="240" cy="100" r="9" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      <text x="240" y="103" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="5" fontWeight="700" fontFamily="sans-serif">BURS</text>
    </svg>
  );
}

function ExpressIllustration() {
  return (
    <svg viewBox="0 0 280 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <line x1="12" y1="55" x2="60" y2="55" stroke="rgba(217,165,32,0.55)" strokeWidth="3" strokeLinecap="round" />
      <line x1="4"  y1="70" x2="52" y2="70" stroke="rgba(217,165,32,0.45)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="18" y1="85" x2="58" y2="85" stroke="rgba(217,165,32,0.35)" strokeWidth="2" strokeLinecap="round" />
      <line x1="8"  y1="98" x2="50" y2="98" stroke="rgba(217,165,32,0.25)" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="80" y="40" width="100" height="88" rx="8" fill="rgba(255,255,255,0.14)" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
      <path d="M80 54 L130 70 L130 40 L80 40Z" fill="rgba(255,255,255,0.10)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      <path d="M180 54 L130 70 L130 40 L180 40Z" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      <line x1="130" y1="70" x2="130" y2="128" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
      <line x1="80"  y1="90" x2="180" y2="90" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <rect x="95" y="98" width="70" height="22" rx="3" fill="rgba(217,165,32,0.3)" stroke="rgba(217,165,32,0.7)" strokeWidth="1" />
      <text x="130" y="113" textAnchor="middle" fill="#F0C75E" fontSize="9" fontWeight="800" fontFamily="sans-serif">DFS EXPRESS</text>
      <path d="M162 14 L138 60 L154 60 L130 110 L174 52 L158 52 Z" fill="#D9A520" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="200" y1="58" x2="270" y2="58" stroke="rgba(217,165,32,0.45)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="208" y1="72" x2="276" y2="72" stroke="rgba(217,165,32,0.35)" strokeWidth="2" strokeLinecap="round" />
      <line x1="196" y1="86" x2="264" y2="86" stroke="rgba(217,165,32,0.25)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="204" y1="100" x2="268" y2="100" stroke="rgba(217,165,32,0.15)" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Division data
───────────────────────────────────────────── */
const divisions = [
  {
    name: "DFS Trucking",
    tagline: "Bulk & Bagged Freight Across Southern Africa",
    description:
      "High-capacity road freight specialists operating Volvo FH and Scania side-tippers and flat-decks on SADC corridors. Bulk minerals, bagged cargo and cross-border haulage.",
    logo: "/images/logos/dfs-trucking-logo.png",
    href: "/trucking",
    bgFrom: "from-[#3b1063]",
    bgTo: "to-[#1a0830]",
    Illustration: TruckIllustration,
    features: ["Bulk Minerals", "Bagged Cargo", "Side Tippers", "Flat Decks", "Cross-Border"],
    cta: "Explore DFS Trucking",
  },
  {
    name: "DFS Clearing",
    tagline: "Customs Clearing & Compliance Experts",
    description:
      "Professional customs clearing agents operating at all major SADC border posts. HS code classification, duty optimisation, SARS compliance and digital documentation management.",
    logo: "/images/logos/dfs-clearing-logo.png",
    href: "/clearing",
    bgFrom: "from-[#2a1a00]",
    bgTo: "to-[#1a1200]",
    Illustration: ClearingIllustration,
    features: ["HS Classification", "Duty Assessment", "Border Compliance", "Pre-Clearance", "Digital Docs"],
    cta: "Explore DFS Clearing",
  },
  {
    name: "DFS Express",
    tagline: "Express Courier & Last-Mile Delivery",
    description:
      "Fast, reliable courier and parcel delivery services across Botswana and the region. Same-day and next-day options for documents, parcels and commercial consignments.",
    logo: "/images/logos/dfs-express-logo.png",
    href: "/express",
    bgFrom: "from-[#3b1063]",
    bgTo: "to-[#6d0077]",
    Illustration: ExpressIllustration,
    features: ["Same-Day Delivery", "Next-Day Delivery", "Document Courier", "Parcel Tracking", "Commercial Freight"],
    cta: "Explore DFS Express",
  },
];

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */
export default function DivisionsSection() {
  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(123,63,160,0.04)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center space-x-2 bg-primary-light border border-primary-royal/20 px-4 py-1.5 rounded-full text-xs font-bold text-primary-royal uppercase tracking-wider">
            <div className="h-1.5 w-1.5 rounded-full bg-accent-gold animate-pulse" />
            <span>Our Business Divisions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-deep tracking-tight font-display">
            Three Specialised Divisions,{" "}
            <span className="text-accent-gold">One Group</span>
          </h2>
          <p className="text-sm sm:text-base text-grey leading-relaxed">
            DFS Group operates three focused business units — each with
            dedicated expertise, branded identity and specialised service
            delivery across the region.
          </p>
        </div>

        {/* Division Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {divisions.map((div) => {
            const { Illustration } = div;
            return (
              <div
                key={div.name}
                className="group relative flex flex-col rounded-3xl overflow-hidden border border-gray-100 shadow-[0_8px_40px_rgba(23,6,34,0.06)] hover:shadow-[0_20px_60px_rgba(23,6,34,0.16)] transition-all duration-500 hover:-translate-y-2 bg-white"
              >
                {/* ── Illustrated banner ── */}
                <div className={`relative h-52 bg-gradient-to-br ${div.bgFrom} ${div.bgTo} overflow-hidden`}>
                  {/* Ambient glow */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_30%,rgba(220,161,29,0.18)_0%,transparent_65%)]" />
                  {/* Subtle grid */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:2rem_2rem]" />
                  {/* SVG illustration */}
                  <div className="absolute inset-0 flex items-center justify-center p-3">
                    <Illustration />
                  </div>
                  {/* Company logo badge — bottom-left */}
                  <div className="absolute bottom-3 left-3 z-20">
                    <div className="bg-white/95 backdrop-blur-sm rounded-xl px-3 py-1.5 shadow-md ring-1 ring-white/40">
                      <div className="relative h-8 w-28">
                        <Image
                          src={div.logo}
                          alt={`${div.name} logo`}
                          fill
                          sizes="112px"
                          className="object-contain object-left"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Gold accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent-gold/50 to-transparent" />
                </div>

                {/* ── Card content ── */}
                <div className="flex flex-col flex-grow p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-extrabold text-primary-deep tracking-tight">
                      {div.name}
                    </h3>
                    <p className="text-xs font-bold text-accent-gold uppercase tracking-wider mt-0.5">
                      {div.tagline}
                    </p>
                  </div>

                  <p className="text-sm text-grey leading-relaxed flex-grow">
                    {div.description}
                  </p>

                  {/* Feature Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {div.features.map((f) => (
                      <span
                        key={f}
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-light-grey text-slate border border-gray-100 uppercase tracking-wide"
                      >
                        {f}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    href={div.href}
                    className="mt-2 flex items-center justify-center space-x-2 w-full py-3 bg-primary-royal hover:bg-primary-deep text-white font-extrabold rounded-xl text-sm transition-all group-hover:shadow-md border border-accent-gold/20"
                  >
                    <span>{div.cta}</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs text-grey mt-10">
          All three divisions operate under the{" "}
          <span className="font-bold text-primary-royal">DFS Group</span>{" "}
          umbrella — headquartered in Gaborone, Botswana.
        </p>
      </div>
    </section>
  );
}

