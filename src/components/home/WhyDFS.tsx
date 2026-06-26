import { Globe, Truck, Anchor, Scale, ShieldCheck, Cpu } from "lucide-react";

export default function WhyDFS() {
  const benefits = [
    {
      title: "Regional Expertise",
      description: "Deep, hands-on knowledge of Southern African road corridors and local SADC transit rules.",
      icon: Globe,
    },
    {
      title: "Modern Fleet",
      description: "Volvo FH and Scania G460 rigs maintained weekly to eliminate breakdown risk.",
      icon: Truck,
    },
    {
      title: "Cross-Border Capability",
      description: "Active transit hubs and border agents in Gaborone, Johannesburg, Lusaka, and Harare.",
      icon: Anchor,
    },
    {
      title: "High Loading Capacity",
      description: "High-volume 45 m³ side-tipper combinations and 36 MT flat-deck configurations.",
      icon: Scale,
    },
    {
      title: "Safety and Compliance",
      description: "Strict alignment with HSEQE safety standards, load lash inspections, and axle limits.",
      icon: ShieldCheck,
    },
    {
      title: "Technology Readiness",
      description: "Telemetry systems and geofenced checkpoints ready to feed live logistics dashboards.",
      icon: Cpu,
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20 space-y-4">
          <span className="text-xs uppercase font-extrabold tracking-widest text-accent-gold block font-heading">
            DFS Advantages
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-royal tracking-tight font-display">
            Why Businesses Choose DFS
          </h2>
          <p className="text-sm sm:text-base text-grey leading-relaxed">
            We bridge SADC operational gaps by combining reliable transport hardware with dedicated border clearing and route management expertise.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <div
                key={i}
                className="bg-white border border-border-dfs rounded-2xl p-6 sm:p-8 hover:shadow-[0_14px_38px_rgba(23,6,34,0.05)] transition-shadow duration-300 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Icon with Gold Accent */}
                  <div className="h-12 w-12 rounded-xl bg-primary-light text-primary-royal flex items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-accent-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Icon className="h-6 w-6 text-primary-royal relative z-10" />
                    {/* Tiny gold dot anchor */}
                    <div className="absolute bottom-1 right-1 h-1.5 w-1.5 rounded-full bg-accent-gold"></div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-extrabold text-primary-royal tracking-tight">
                    {benefit.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-grey leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
