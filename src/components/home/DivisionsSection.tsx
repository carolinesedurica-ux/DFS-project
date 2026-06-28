import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Truck, Package, Zap } from "lucide-react";

const divisions = [
  {
    name: "DFS Trucking",
    tagline: "Bulk & Bagged Freight Across Southern Africa",
    description:
      "High-capacity road freight specialists operating Volvo FH and Scania side-tippers and flat-decks on SADC corridors. Bulk minerals, bagged cargo and cross-border haulage.",
    logo: "/images/logos/dfs-trucking-logo.png",
    href: "/trucking",
    accent: "#7B3FA0",
    bgFrom: "from-[#3b1063]",
    bgTo: "to-[#1a0830]",
    badgeColor: "bg-purple-100 text-purple-700",
    icon: Truck,
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
    accent: "#D4A017",
    bgFrom: "from-[#2a1a00]",
    bgTo: "to-[#1a1200]",
    badgeColor: "bg-amber-100 text-amber-700",
    icon: Package,
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
    accent: "#D4A017",
    bgFrom: "from-[#3b1063]",
    bgTo: "to-[#6d0077]",
    badgeColor: "bg-orange-100 text-orange-700",
    icon: Zap,
    features: ["Same-Day Delivery", "Next-Day Delivery", "Document Courier", "Parcel Tracking", "Commercial Freight"],
    cta: "Explore DFS Express",
  },
];

export default function DivisionsSection() {
  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Subtle background texture */}
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
          {divisions.map((div) => (
            <div
              key={div.name}
              className="group relative flex flex-col rounded-3xl overflow-hidden border border-gray-100 shadow-[0_8px_40px_rgba(23,6,34,0.06)] hover:shadow-[0_20px_60px_rgba(23,6,34,0.14)] transition-all duration-500 hover:-translate-y-2 bg-white"
            >
              {/* Top Gradient Banner */}
              <div
                className={`relative h-40 bg-gradient-to-br ${div.bgFrom} ${div.bgTo} p-6 flex items-end`}
              >
                {/* Background glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,161,29,0.15)_0%,transparent_60%)]" />

                {/* Logo */}
                <div className="relative z-10 h-14 w-36">
                  <Image
                    src={div.logo}
                    alt={`${div.name} logo`}
                    fill
                    className="object-contain object-left"
                  />
                </div>
              </div>

              {/* Content */}
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

                {/* CTA Button */}
                <Link
                  href={div.href}
                  className="mt-2 flex items-center justify-center space-x-2 w-full py-3 bg-primary-royal hover:bg-primary-deep text-white font-extrabold rounded-xl text-sm transition-all group-hover:shadow-md border border-accent-gold/20"
                >
                  <span>{div.cta}</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-xs text-grey mt-10">
          All three divisions operate under the{" "}
          <span className="font-bold text-primary-royal">DFS Group</span>{" "}
          umbrella — headquartered in Gaborone, Botswana.
        </p>
      </div>
    </section>
  );
}
