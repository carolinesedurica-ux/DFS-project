import { Shield, Leaf, Heart, FileText, CheckCircle2, Download, AlertTriangle } from "lucide-react";
import settings from "@/data/settings.json";

export const metadata = {
  title: "Sustainability & Safety (HSEQE) | DFS Group",
  description: "Learn about DFS Group's environmental stewardship, carbon monitoring, driver safety protocols, and corporate health & safety policy downloads."
};

export default function SustainabilitySafety() {
  const isElectrificationConfirmed = settings.sustainability.electrificationTarget.isConfirmed;

  const hseqePrinciples = [
    {
      title: "Safe Working Environment",
      desc: "Providing secure depots and logistics hubs with active monitoring, hazard markings, and proper protective gear for all staff."
    },
    {
      title: "Continuous Process Improvement",
      desc: "Routine analysis of transit logs, axle loading variances, and border dwell metrics to refine logistics safety SOPs."
    },
    {
      title: "Risk Management",
      desc: "Proactive route profiling, weather delay monitors, and vehicle inspections prior to border dispatch to prevent en-route failures."
    },
    {
      title: "Driver & Fleet Safety",
      desc: "Comprehensive defensive driver training programs, rest-stops auditing, and speed governors set to regional limits."
    },
    {
      title: "Secure Cargo Handling",
      desc: "Adherence to lashing standards, trailer wall thickness checks for tippers, and automatic tarps for particulate containment."
    },
    {
      title: "Regulatory Compliance",
      desc: "Strict compliance with SADC load controls, customs regulations, POPIA, and local environmental transport guidelines."
    }
  ];

  const downloads = [
    { name: "DFS Group HSEQE Policy Statement 2026", size: "1.2 MB", type: "PDF Policy File" },
    { name: "Standard Road Safety & Driver Manual", size: "2.4 MB", type: "PDF Handbook" },
    { name: "DFS Group Code of Ethical Conduct", size: "980 KB", type: "PDF Document" }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Page Header */}
      <section className="bg-primary-deep text-white py-16 border-b border-accent-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Sustainability & Safety</h1>
          <p className="text-sm text-accent-gold mt-2 font-semibold">Our Commitment to Responsible Operations and Environmental Stewardship</p>
        </div>
      </section>

      {/* Environmental Sustainability */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded text-xs font-semibold text-emerald-700">
              <Leaf className="h-4 w-4" />
              <span>Environmental Stewardship</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-deep">Lowering Our Carbon Footprint</h2>
            
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              DFS Group is committed to exploring cleaner transportation pathways across SADC. In the heavy road freight sector, reducing emissions requires a multi-faceted approach. We combine advanced route optimization software to eliminate empty return runs with strict vehicle maintenance schedules that keep Scania and Volvo engines operating at peak thermodynamic efficiency.
            </p>

            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold text-primary-deep uppercase tracking-wider">Key Green Initiatives</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
                {settings.sustainability.initiatives.map((init, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <CheckCircle2 className="h-4.5 w-4.5 text-accent-gold flex-shrink-0 mt-0.5" />
                    <span>{init}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5 bg-light-bg rounded-xl border border-gray-100 p-6 sm:p-8 space-y-6">
            <h3 className="text-md font-bold text-primary-deep border-b border-gray-200 pb-2">Electrification Targets</h3>
            
            {isElectrificationConfirmed ? (
              <div className="bg-emerald-50/50 border border-emerald-100 rounded-lg p-4 space-y-2">
                <span className="block text-xs font-bold text-emerald-700 uppercase tracking-wide">Approved Milestone</span>
                <p className="text-sm font-bold text-charcoal">{settings.sustainability.electrificationTarget.value}</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 space-y-2">
                  <div className="flex items-center space-x-1.5 text-xs text-accent-gold font-bold uppercase tracking-wide">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Unconfirmed Draft Target</span>
                  </div>
                  <p className="text-xs text-charcoal/80 leading-normal font-medium italic">
                    Draft target under evaluation: "{settings.sustainability.electrificationTarget.value}"
                  </p>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {settings.sustainability.electrificationTarget.draftValue} DFS is currently evaluating total cost of ownership (TCO) and regional grid charging infrastructure limits before locking in electrification dates.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* HSEQE Principles */}
      <section className="py-16 sm:py-20 bg-light-bg border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center space-x-2 bg-primary-deep/5 border border-primary-deep/10 px-3 py-1 rounded text-xs font-semibold text-primary-deep">
              <Heart className="h-4 w-4" />
              <span>Health, Safety & Quality</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-deep tracking-tight">Our HSEQE Principles</h2>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              We implement a structured Health, Safety, Environment, Quality, and Security (HSEQE) management system to govern our depots, fleets, and administrative divisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hseqePrinciples.map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-gray-100 p-6 space-y-3 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="text-base font-bold text-primary-deep flex items-center space-x-2">
                  <span className="h-2 w-2 rounded-full bg-accent-gold"></span>
                  <span>{item.title}</span>
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Downloadable Policies */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-2xl font-bold text-primary-deep tracking-tight">Corporate Policies</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Access and download DFS Group's operational codes, safety declarations, and governance frameworks for procurement and vendor audit purposes.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-4 bg-light-bg border border-gray-100 p-6 rounded-xl">
            {downloads.map((dl, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="flex items-center space-x-3">
                  <div className="h-9 w-9 rounded bg-primary-deep/5 flex items-center justify-center text-primary-deep">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-charcoal">{dl.name}</span>
                    <span className="block text-[10px] text-gray-400 font-semibold uppercase">{dl.type} // {dl.size}</span>
                  </div>
                </div>
                
                {/* Simulated Download button */}
                <button className="flex items-center space-x-1.5 px-3 py-1.5 bg-primary-deep hover:bg-primary-light text-white text-xs font-semibold rounded transition-colors w-full sm:w-auto justify-center">
                  <Download className="h-3.5 w-3.5" />
                  <span>Download</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
