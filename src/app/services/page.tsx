import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldAlert } from "lucide-react";
import services from "@/data/services.json";

export const metadata = {
  title: "Our Services | DFS Group",
  description: "Explore DFS Group's transport and logistics solutions: Bulk Cargo Transport, Bagged Cargo, Cross-Border Freight, Customs Clearing, and Tailored Corporate Logistics."
};

export default function Services() {
  const getServiceImage = (serviceId: string) => {
    switch (serviceId) {
      case "bulk-cargo":
        return "/images/dfs-bulk-cargo-side-tipper.png";
      case "bagged-cargo":
        return "/images/dfs-bagged-cargo-flatdeck.png";
      case "cross-border-freight":
        return "/images/dfs-cross-border-road-freight.jpg";
      case "customs-clearing":
        return "/images/dfs-customs-support.png";
      default:
        return "/images/dfs-fleet-lineup.jpg";
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Page Header */}
      <section className="bg-primary-deep text-white py-20 border-b border-accent-gold/20 relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="text-xs uppercase font-extrabold tracking-widest text-accent-gold block font-heading">
            Operational Capabilities
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display">
            Our Logistics Services
          </h1>
          <p className="text-base sm:text-lg text-white/80 max-w-3xl leading-relaxed">
            Reliable, compliant, and high-capacity transport solutions across Southern African corridors.
          </p>
        </div>
      </section>

      {/* Services Listing */}
      <section className="py-20 bg-light-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 lg:space-y-36">
          {services.map((srv, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={srv.id}
                id={srv.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center scroll-mt-24"
              >
                {/* Image Side */}
                <div
                  className={`lg:col-span-5 relative rounded-2xl overflow-hidden shadow-xl aspect-16/10 lg:aspect-4/3 border border-border-dfs ${
                    !isEven ? "lg:order-2" : ""
                  }`}
                >
                  <Image
                    src={getServiceImage(srv.id)}
                    alt={srv.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-primary-deep/5"></div>
                </div>

                {/* Details Column */}
                <div className={`lg:col-span-7 space-y-6 ${!isEven ? "lg:order-1" : ""}`}>
                  <div className="space-y-2">
                    <span className="text-xs uppercase font-extrabold tracking-wider text-accent-gold block">
                      DFS Capability 0{index + 1}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-deep tracking-tight">
                      {srv.title}
                    </h2>
                  </div>
                  
                  <p className="text-slate text-sm sm:text-base leading-relaxed">
                    {srv.longDescription}
                  </p>

                  <div className="space-y-3 pt-2">
                    <h3 className="text-xs font-bold text-primary-deep uppercase tracking-wider">
                      Key Features
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {srv.features.map((feat, i) => (
                        <li key={i} className="flex items-start space-x-2 text-xs sm:text-sm text-slate">
                          <CheckCircle2 className="h-4.5 w-4.5 text-accent-gold flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Customs Disclaimer Callout */}
                  {srv.id === "customs-clearing" && srv.disclaimer && (
                    <div className="bg-amber-50 border-l-4 border-accent-gold p-4.5 rounded-xl space-y-2 max-w-2xl">
                      <div className="flex items-center space-x-2 text-accent-deep font-bold text-xs uppercase tracking-wider">
                        <ShieldAlert className="h-4.5 w-4.5" />
                        <span>Regulatory Responsibility</span>
                      </div>
                      <p className="text-xs text-charcoal/80 leading-relaxed font-medium">
                        {srv.disclaimer}
                      </p>
                    </div>
                  )}

                  {/* Quote CTA for EVERY service */}
                  <div className="pt-4 flex flex-wrap gap-4">
                    <Link
                      href={`/quote?service=${srv.id}`}
                      className="inline-flex items-center space-x-2 px-6 py-3.5 bg-primary-royal hover:bg-primary-deep text-white rounded-xl text-xs font-bold shadow-sm transition-all"
                    >
                      <span>Request a Quote for {srv.title}</span>
                      <ArrowRight className="h-4 w-4 text-accent-gold" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Tailored Logistics Banner */}
      <section className="bg-white border-t border-border-dfs py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-deep tracking-tight font-display">
            Need a Dedicated Fleet Contract?
          </h2>
          <p className="text-sm sm:text-base text-grey max-w-2xl mx-auto leading-relaxed">
            DFS Group provides contract-based dedicated transport services, scheduling routine shuttle links between mines, manufacturing sites, and border export terminals.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <Link
              href="/quote?type=contract"
              className="px-6 py-3.5 gold-gradient text-primary-deep hover:opacity-95 rounded-xl text-xs font-extrabold shadow-md transition-all transform hover:-translate-y-0.5"
            >
              Request Dedicated Rate
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3.5 border border-primary-royal/20 text-primary-royal hover:bg-primary-light rounded-xl text-xs font-bold transition-all"
            >
              Speak to Logistics Director
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
