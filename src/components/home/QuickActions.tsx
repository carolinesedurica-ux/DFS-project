import Link from "next/link";
import { FileText, Truck, Building, ArrowRight } from "lucide-react";

export default function QuickActions() {
  const actions = [
    {
      title: "Request a Quote",
      description: "Submit your cargo, route, and SADC corridor timing requirements.",
      cta: "Start a Quote",
      href: "/quote",
      icon: FileText,
      featured: true
    },
    {
      title: "Explore Fleet Capacity",
      description: "View side-tipper, flat-deck, and high-capacity SADC transport options.",
      cta: "View Our Fleet",
      href: "/fleet",
      icon: Truck,
      featured: false
    },
    {
      title: "Logistics for Business",
      description: "Discuss contract transport, cross-border logistics, and dedicated fleet setups.",
      cta: "Speak to DFS",
      href: "/contact",
      icon: Building,
      featured: false
    }
  ];

  return (
    <section className="py-12 bg-white relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {actions.map((act, i) => {
          const IconComp = act.icon;
          return (
            <div
              key={i}
              className={`border border-border-dfs rounded-2xl p-6 sm:p-8 card-hover-transition flex flex-col justify-between space-y-6 bg-white relative overflow-hidden ${
                act.featured ? "border-t-4 border-t-accent-gold shadow-[0_14px_38px_rgba(23,6,34,0.07)]" : ""
              }`}
            >
              <div className="space-y-4">
                {/* Icon wrapper */}
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                  act.featured ? "bg-primary-light text-primary-royal" : "bg-light-grey text-slate"
                }`}>
                  <IconComp className="h-6 w-6" />
                </div>
                
                <h4 className="text-xl font-extrabold text-primary-deep tracking-tight">{act.title}</h4>
                <p className="text-sm text-grey leading-relaxed">{act.description}</p>
              </div>

              <div className="pt-2">
                <Link
                  href={act.href}
                  className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-primary-royal hover:text-accent-gold transition-colors"
                >
                  <span>{act.cta}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
