import Link from "next/link";
import { ArrowRight, CheckCircle2, AlertCircle, ShieldAlert } from "lucide-react";
import services from "@/data/services.json";

export const metadata = {
  title: "Our Services | DFS Group",
  description: "Explore DFS Group's transport and logistics solutions: Bulk Cargo Transport, Bagged Cargo, Cross-Border Freight, Customs Clearing, and Tailored Corporate Logistics."
};

export default function Services() {
  return (
    <div className="flex flex-col w-full">
      {/* Page Header */}
      <section className="bg-primary-deep text-white py-16 border-b border-accent-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Our Logistics Services</h1>
          <p className="text-sm text-accent-gold mt-2 font-semibold">Reliable, Compliant, and High-Capacity Transport Solutions across Southern Africa</p>
        </div>
      </section>

      {/* Services Listing */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {services.map((srv, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={srv.id}
                id={srv.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-start scroll-mt-24 ${
                  !isEven ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Details Column */}
                <div className={`lg:col-span-7 space-y-6 ${!isEven ? "lg:order-2" : ""}`}>
                  <div className="space-y-2">
                    <span className="text-xs uppercase font-extrabold tracking-wider text-accent-gold">DFS Capability 0{index + 1}</span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-deep">{srv.title}</h2>
                  </div>
                  
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{srv.longDescription}</p>

                  <div className="space-y-3 pt-2">
                    <h3 className="text-sm font-bold text-primary-deep uppercase tracking-wider">Key Features</h3>
                    <ul className="space-y-2.5">
                      {srv.features.map((feat, i) => (
                        <li key={i} className="flex items-start space-x-2 text-sm text-gray-700">
                          <CheckCircle2 className="h-4.5 w-4.5 text-accent-gold flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Customs Disclaimer Callout */}
                  {srv.id === "customs-clearing" && srv.disclaimer && (
                    <div className="bg-amber-50 border-l-4 border-accent-gold p-4 rounded-md space-y-2">
                      <div className="flex items-center space-x-2 text-accent-gold font-bold text-xs uppercase tracking-wider">
                        <ShieldAlert className="h-4 w-4" />
                        <span>Regulatory Responsibility</span>
                      </div>
                      <p className="text-xs text-charcoal/80 leading-normal">
                        {srv.disclaimer}
                      </p>
                    </div>
                  )}

                  {/* Quote CTA for EVERY service */}
                  <div className="pt-4">
                    <Link
                      href={`/quote?service=${srv.id}`}
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-deep text-white hover:bg-primary-light rounded-md text-sm font-bold shadow-sm transition-transform hover:-translate-y-0.5"
                    >
                      <span>Request a Quote for {srv.title}</span>
                      <ArrowRight className="h-4 w-4 text-accent-gold" />
                    </Link>
                  </div>
                </div>

                {/* Info Card Box Column */}
                <div className={`lg:col-span-5 bg-light-bg border border-gray-100 rounded-xl p-6 sm:p-8 space-y-6 ${!isEven ? "lg:order-1" : ""}`}>
                  <div className="space-y-4">
                    <h3 className="text-md font-bold text-primary-deep border-b border-gray-200 pb-2">Operational Guidelines</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{srv.safetyPractices}</p>
                  </div>

                  {srv.cargoExamples && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-primary-deep uppercase tracking-wider">Common Cargo Handled</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {srv.cargoExamples.map((ex) => (
                          <span key={ex} className="bg-white border border-gray-200 text-charcoal/70 text-xs px-2.5 py-1 rounded font-medium">
                            {ex}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {srv.corridors && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-primary-deep uppercase tracking-wider">Active Transit Corridors</h4>
                      <ul className="space-y-2 text-xs text-gray-600">
                        {srv.corridors.map((c, idx) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-accent-gold flex-shrink-0"></span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Tailored Logistics Banner */}
      <section className="bg-light-bg border-t border-gray-100 py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-deep tracking-tight">Need a Dedicated Fleet Contract?</h2>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
            DFS Group provides contract-based dedicated transport services, scheduling routine shuttle links between mines, manufacturing sites, and border export terminals.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/quote?type=contract" className="px-6 py-3 bg-accent-gold text-primary-deep hover:bg-accent-hover rounded-md text-sm font-bold shadow-sm transition-colors">
              Request Dedicated Rate
            </Link>
            <Link href="/contact" className="px-6 py-3 border border-primary-deep/20 text-primary-deep hover:bg-gray-50 rounded-md text-sm font-semibold transition-colors">
              Speak to Logistics Director
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
