import Link from "next/link";
import { Cpu, AlertCircle, ArrowRight, Layers, FileText, CheckCircle2, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Technology & DFS-OS Roadmap | DFS Group",
  description: "Explore the DFS digital logistics operating system (DFS-OS) vision, addressing corridor challenges with unified tracking, customs files, and fleet telemetry."
};

export default function Technology() {
  const challenges = [
    {
      title: "Fragmented Communication",
      desc: "Planners, clients, drivers, and clearing agents coordinating through disconnected email threads and phone calls."
    },
    {
      title: "Manual Document Handling",
      desc: "Physical cargo manifests, packing lists, and clearance permits transit slowly between border gates and HQ."
    },
    {
      title: "Limited Central Visibility",
      desc: "Supply chain managers unable to query unified real-time coordinates, relying on manual location reports."
    },
    {
      title: "Delayed Shipment Updates",
      desc: "Cargo milestones (booking, dispatch, transit, border entry, delivery) updated post-transit rather than in real-time."
    }
  ];

  const features = [
    {
      title: "1. Live Shipment Milestones",
      desc: "Unified tracking maps driven by active vehicle telemetry, providing transparent cargo coordinates.",
      badge: "Telemetry Ready"
    },
    {
      title: "2. Customs Clearance Archiving",
      desc: "Border agent access nodes to upload cleared declarations and coordinate HS Code checks directly.",
      badge: "Regulatory Link"
    },
    {
      title: "3. Document Management",
      desc: "Digital repository for waybills, invoices, custom permits, and cargo manifests accessible securely.",
      badge: "Secure Access"
    },
    {
      title: "4. Unified Customer Comms",
      desc: "Instant notification alerts sent directly when trucks cross borders or complete delivery gates.",
      badge: "Customer First"
    },
    {
      title: "5. Operational Command",
      desc: "Centralized dispatcher dashboard monitoring fleet fuel levels, axle loads, and border queue timelines.",
      badge: "Control Center"
    }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Page Header */}
      <section className="bg-primary-deep text-white py-16 border-b border-accent-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">The Future of Connected Logistics</h1>
          <p className="text-sm text-accent-gold mt-2 font-semibold">DFS-OS: Our Strategic Digital Logistics Operating System Vision</p>
        </div>
      </section>

      {/* Industrial Challenges */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-xs uppercase font-extrabold tracking-widest text-accent-gold">Logistics Pain Points</h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-primary-deep">Overcoming Corridor Obstacles</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Southern African cargo corridors operate under complex border clearing structures and multi-hub coordinates. Traditional transport models rely on fragmented channels, which slows down response times.
            </p>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              DFS Group is actively bridging these gaps by creating a digital foundation that unites operational telemetry and regulatory documents into one environment.
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {challenges.map((item, i) => (
              <div key={i} className="bg-light-bg rounded-lg p-5 border border-gray-50 space-y-2">
                <div className="flex items-center space-x-2 text-primary-deep font-bold text-sm">
                  <AlertCircle className="h-4 w-4 text-accent-gold" />
                  <h4>{item.title}</h4>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future DFS-OS Architecture */}
      <section className="py-16 sm:py-20 bg-charcoal text-white border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-xs uppercase font-extrabold tracking-widest text-accent-gold">Digital Ecosystem</h2>
            <h3 className="text-3xl font-extrabold text-white tracking-tight">The DFS-OS Framework</h3>
            <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
              DFS-OS represents the planned digital logistics environment. We are designing its structure so that customer dashboards and fleet dispatch boards connect to the same core telemetry data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {features.map((item, i) => (
              <div key={i} className="bg-white/[0.03] border border-white/5 rounded-lg p-5 flex flex-col justify-between space-y-4 hover:border-white/10 transition-colors">
                <div className="space-y-2">
                  <span className="text-[10px] text-accent-gold font-bold uppercase tracking-wider bg-accent-gold/5 px-2 py-0.5 rounded inline-block">
                    {item.badge}
                  </span>
                  <h4 className="text-sm font-bold text-white">{item.title}</h4>
                  <p className="text-xs text-white/60 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Phase One Preview */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Interactive Prototypes links */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-xs uppercase font-extrabold tracking-widest text-accent-gold">Phase One Delivery</h2>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-primary-deep">Interactive Previews & Foundation</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                As the digital foundation of DFS-OS, this corporate website hosts interactive previews of the upcoming customer and administrator interfaces. This allows our SADC clients and operational teams to evaluate layout structures and shipment timeline cards.
              </p>
              
              <div className="space-y-4 pt-2">
                <Link
                  href="/track"
                  className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:border-accent-gold hover:bg-gray-50 transition-all group"
                >
                  <div className="space-y-1">
                    <span className="block text-sm font-bold text-primary-deep">1. Shipment tracking Simulator</span>
                    <span className="block text-xs text-gray-500">Query mock reference codes and monitor border transit status milestones.</span>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-accent-gold transition-colors flex-shrink-0" />
                </Link>

                <Link
                  href="/portal-preview"
                  className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:border-accent-gold hover:bg-gray-50 transition-all group"
                >
                  <div className="space-y-1">
                    <span className="block text-sm font-bold text-primary-deep">2. Future Customer Portal Preview</span>
                    <span className="block text-xs text-gray-500">Dashboard structure for cargo document retrieval and quote histories.</span>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-accent-gold transition-colors flex-shrink-0" />
                </Link>

                <Link
                  href="/admin-preview"
                  className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:border-accent-gold hover:bg-gray-50 transition-all group"
                >
                  <div className="space-y-1">
                    <span className="block text-sm font-bold text-primary-deep">3. Future Administrator Dashboard Preview</span>
                    <span className="block text-xs text-gray-500">Internal tool preview for border queue charts, axle logs, and dispatches.</span>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-accent-gold transition-colors flex-shrink-0" />
                </Link>
              </div>
            </div>

            {/* Graphic Timeline */}
            <div className="lg:col-span-6 bg-light-bg rounded-xl border border-gray-100 p-6 sm:p-8 space-y-6">
              <h4 className="text-md font-bold text-primary-deep border-b border-gray-200 pb-2">DFS-OS Deployment Roadmap</h4>
              
              <div className="relative border-l-2 border-accent-gold pl-6 ml-2 space-y-8">
                {/* Stage 1 */}
                <div className="relative">
                  <span className="absolute -left-[31px] top-0 h-4 w-4 rounded-full bg-accent-gold border-2 border-white"></span>
                  <div className="space-y-1">
                    <span className="text-[10px] text-accent-gold font-bold uppercase tracking-wider">Stage 1 (Current)</span>
                    <h5 className="text-sm font-bold text-primary-deep">Web Foundation & Interactive Demos</h5>
                    <p className="text-xs text-gray-500 leading-normal">
                      Launching the responsive corporate portal, interactive tracking timelines, and dashboard prototypes for client review.
                    </p>
                  </div>
                </div>

                {/* Stage 2 */}
                <div className="relative">
                  <span className="absolute -left-[31px] top-0 h-4 w-4 rounded-full bg-gray-300 border-2 border-white"></span>
                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Stage 2 (Planned Q3 2026)</span>
                    <h5 className="text-sm font-bold text-primary-deep">Database Integration & Live Tracking</h5>
                    <p className="text-xs text-gray-500 leading-normal">
                      Linking the tracker to active SADC truck GPS transponders and establishing the customer document database.
                    </p>
                  </div>
                </div>

                {/* Stage 3 */}
                <div className="relative">
                  <span className="absolute -left-[31px] top-0 h-4 w-4 rounded-full bg-gray-300 border-2 border-white"></span>
                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Stage 3 (Planned Q1 2027)</span>
                    <h5 className="text-sm font-bold text-primary-deep">Customs Automation & AI Advisories</h5>
                    <p className="text-xs text-gray-500 leading-normal">
                      Deploying AI customs helpers to support clients with SADC tariff codes and auto-clearing forms directly in the portal.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
