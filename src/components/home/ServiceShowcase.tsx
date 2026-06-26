import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function ServiceShowcase() {
  const showcaseServices = [
    {
      id: "bulk-cargo",
      title: "Bulk Cargo Transport",
      tagline: "High-Efficiency Haulage for Mining & Aggregates",
      image: "/images/dfs-bulk-cargo-side-tipper.png",
      alt: "DFS Group double side-tipper rig unloading coal at a mineral terminal.",
      description:
        "DFS Group provides high-volume bulk cargo transportation utilizing specialized equipment. We ensure seamless loading, hauling, and tipping operations for key mining and construction projects across Southern African corridors.",
      bullets: [
        "Local and cross-border transport of minerals and commodities",
        "22.5 m³ and 45 m³ heavy-duty side-tipper configurations",
        "Maximised payload capacity conforming to SADC axle regulations",
        "On-road operational visibility and telemetry tracking",
      ],
      ctaText: "Request Bulk Quote",
      ctaHref: "/quote?service=bulk-cargo",
    },
    {
      id: "bagged-cargo",
      title: "Bagged Cargo Transport",
      tagline: "Secure, Weather-Protected Flat-Deck Solutions",
      image: "/images/dfs-bagged-cargo-flatdeck.png",
      alt: "DFS Group flat-deck link combinations carrying palletized bags under covers.",
      description:
        "Our flat-deck combination fleets are designed for long-haul stability and safety. We specialize in transporting bagged cement, agricultural materials, and industrial goods with professional lashings and weather covers.",
      bullets: [
        "Long-distance transport across all SADC routes",
        "High payload capacity up to 36 Metric Tonnes (MT)",
        "Secure cargo handling with certified lashing systems",
        "Cost-effective regional distribution links",
      ],
      ctaText: "Request Bagged Cargo Quote",
      ctaHref: "/quote?service=bagged-cargo",
      reverse: true,
    },
    {
      id: "cross-border-freight",
      title: "Cross-Border Logistics",
      tagline: "Corridor Expertise and Seamless Border Clearing",
      image: "/images/dfs-cross-border-road-freight.jpg",
      alt: "DFS Group freight trucks passing border checkpoint at Martins Drift.",
      description:
        "Cross-border shipping is simplified by our direct corridor control and dedicated teams. We coordinate clearing at all major border crossings to keep your supply chain running without delays.",
      bullets: [
        "Active corridors across Botswana, South Africa, Zambia, and Zimbabwe",
        "Dedicated clearing support at Martins Drift, Kazungula, and Beitbridge",
        "Direct shipment communication and route risk-mitigation planning",
        "Customs documents coordination and digital pre-filing",
      ],
      ctaText: "Request Corridor Rate",
      ctaHref: "/quote?service=cross-border-freight",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24 space-y-4">
          <span className="text-xs uppercase font-extrabold tracking-widest text-accent-gold block">
            Core Operations
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-deep tracking-tight font-display">
            Logistics Solutions Built for Business
          </h2>
          <p className="text-base sm:text-lg text-grey leading-relaxed">
            DFS Group combines modern truck fleet capacity with on-the-ground border clearing coordination to deliver reliable cargo movements across the SADC region.
          </p>
        </div>

        {/* Alternating Service Blocks */}
        <div className="space-y-24 lg:space-y-36">
          {showcaseServices.map((service, idx) => (
            <div
              key={service.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center`}
            >
              {/* Image Side */}
              <div
                className={`lg:col-span-6 relative rounded-2xl overflow-hidden shadow-xl aspect-16/10 lg:aspect-4/3 group ${
                  service.reverse ? "lg:order-2" : ""
                }`}
              >
                <div className="absolute inset-0 bg-primary-deep/10 group-hover:bg-primary-deep/0 transition-colors duration-300 z-10"></div>
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-w-7xl) 50vw, 100vw"
                  priority={idx === 0}
                />
              </div>

              {/* Content Side */}
              <div
                className={`lg:col-span-6 space-y-6 ${
                  service.reverse ? "lg:order-1" : ""
                }`}
              >
                <div className="space-y-2">
                  <span className="text-xs font-bold text-accent-gold uppercase tracking-wider block">
                    {service.tagline}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-primary-deep tracking-tight">
                    {service.title}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-grey leading-relaxed">
                  {service.description}
                </p>

                {/* Capability Bullet List */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {service.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start space-x-2 text-xs sm:text-sm text-slate">
                      <CheckCircle2 className="h-4.5 w-4.5 text-accent-gold flex-shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Call To Action */}
                <div className="pt-4 flex flex-wrap gap-4">
                  <Link
                    href={service.ctaHref}
                    className="inline-flex items-center space-x-2 px-6 py-3.5 bg-primary-royal hover:bg-primary-deep text-white rounded-xl text-xs font-bold shadow-sm transition-all"
                  >
                    <span>{service.ctaText}</span>
                    <ArrowRight className="h-4 w-4 text-accent-gold" />
                  </Link>

                  <Link
                    href={`/services#${service.id}`}
                    className="inline-flex items-center space-x-1.5 px-6 py-3.5 border border-primary-royal/20 text-primary-royal hover:bg-primary-light rounded-xl text-xs font-bold transition-all"
                  >
                    <span>Detailed Specifications</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
