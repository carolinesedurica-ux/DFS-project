import Image from "next/image";
import Link from "next/link";
import { ShieldAlert, Leaf, CheckCircle2, ArrowRight } from "lucide-react";

export default function SustainabilitySafety() {
  const safetyPoints = [
    { title: "Fleet Safety", desc: "Rigorous pre-trip inspections and weekly preventative maintenance checks." },
    { title: "Driver Responsibility", desc: "Advanced defensive driving training and corridor fatigue profiling." },
    { title: "Risk Management", desc: "Dual satellite tracking systems with geofenced incident alarms." },
    { title: "Secure Cargo", desc: "Double-checked heavy-duty cargo cover and strap-tension validations." },
    { title: "Process Compliance", desc: "Strict alignment with SADC cross-border and axle weight constraints." },
  ];

  const greenPoints = [
    { title: "Fleet Efficiency", desc: "Modern Euro-spec fuel-efficient engine technologies." },
    { title: "Aerodynamic Optimisations", desc: "Trailer skirts and streamlined cab overlays reducing drag." },
    { title: "Responsible Route Planning", desc: "Avoiding congested corridors to lower idle fuel burn." },
    { title: "Eco-Lashing Innovations", desc: "Exploring lightweight, high-tensile reusable cargo covers." },
    { title: "Future Green Initiatives", desc: "Phased carbon offsets mapping and eco-depot operations." },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-xs uppercase font-extrabold tracking-widest text-accent-gold block font-heading">
            Corporate Responsibility
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-deep tracking-tight font-display">
            Safer Operations. Smarter Growth.
          </h2>
          <p className="text-sm sm:text-base text-grey leading-relaxed">
            DFS Group operates under a strict Health, Safety, Environment, Quality, and Energy (HSEQE) governance structure. We protect your cargo while planning a sustainable footprint.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Columns Side */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Column 1: Safety & Compliance */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 text-primary-royal border-b border-border-dfs pb-3">
                <div className="h-8 w-8 rounded-lg bg-primary-light text-primary-royal flex items-center justify-center">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-extrabold tracking-tight">
                  Safety & Compliance
                </h3>
              </div>
              
              <div className="space-y-5">
                {safetyPoints.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5">
                    <CheckCircle2 className="h-4.5 w-4.5 text-accent-gold flex-shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <h4 className="text-xs sm:text-sm font-bold text-primary-deep">{item.title}</h4>
                      <p className="text-xs text-grey leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Sustainable Logistics */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 text-primary-royal border-b border-border-dfs pb-3">
                <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Leaf className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-extrabold tracking-tight">
                  Sustainable Logistics
                </h3>
              </div>

              <div className="space-y-5">
                {greenPoints.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5">
                    <CheckCircle2 className="h-4.5 w-4.5 text-accent-gold flex-shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <h4 className="text-xs sm:text-sm font-bold text-primary-deep">{item.title}</h4>
                      <p className="text-xs text-grey leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Image Side */}
          <div className="lg:col-span-4 space-y-6">
            <div className="relative rounded-2xl overflow-hidden h-72 sm:h-96 lg:h-[480px] shadow-xl border border-border-dfs">
              <Image
                src="/images/dfs-driver-safety.png"
                alt="DFS logistics driver verifying safety sensors on truck chassis."
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-primary-deep/10"></div>
            </div>
            
            <div className="bg-light-grey p-5 rounded-2xl border border-border-dfs space-y-4">
              <h4 className="text-xs font-bold text-primary-royal uppercase tracking-wider">
                Our SADC Commitment
              </h4>
              <p className="text-xs text-slate leading-relaxed">
                As a Southern African market leader, DFS Group matches strict corporate governance benchmarks to ensure safety, reliability, and regulatory compliance at every toll and border.
              </p>
              <Link
                href="/sustainability-safety"
                className="inline-flex items-center space-x-1.5 text-xs font-extrabold text-primary-royal hover:text-accent-gold transition-colors"
              >
                <span>Read Full Governance Policy</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
