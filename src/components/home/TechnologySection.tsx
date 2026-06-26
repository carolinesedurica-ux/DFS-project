import Image from "next/image";
import Link from "next/link";
import { Cpu, ShieldCheck, CheckCircle2, ArrowRight, Monitor, UserCheck } from "lucide-react";

export default function TechnologySection() {
  const capabilities = [
    { title: "Live Shipment Visibility", desc: "GPS tracking updates transmitted at key route milestones." },
    { title: "Digital Document Management", desc: "Instantly retrieve customs forms and consignment notes." },
    { title: "Customer Communication", desc: "Direct client message feeds and dispatch notifications." },
    { title: "Customs Support", desc: "Pre-clearance compliance files sent ahead to borders." },
    { title: "Operational Control", desc: "Centralized fleet loading, axle weighing, and driver assignments." }
  ];

  return (
    <section className="py-20 lg:py-28 bg-primary-deep text-white relative overflow-hidden border-t border-accent-gold/20">
      
      {/* Background Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,161,29,0.04)_0%,transparent_70%)] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Copy Side */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full text-xs font-bold text-accent-gold uppercase tracking-wider">
              <Cpu className="h-4 w-4" />
              <span>DFS Digital Strategy</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight font-display">
              Logistics With <br />
              <span className="text-accent-gold">Greater Visibility</span>
            </h2>
            
            <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl">
              We are building the DFS Digital Logistics Operating System (DFS-OS) to streamline SADC road freight communications. By linking drivers, border teams, and clients, we reduce transit latency.
            </p>

            {/* Interactive Capability List */}
            <div className="space-y-4 pt-2">
              {capabilities.map((cap, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <div className="h-5 w-5 rounded-full bg-accent-gold/10 text-accent-gold flex items-center justify-center flex-shrink-0 mt-0.5 border border-accent-gold/20">
                    <CheckCircle2 className="h-3 w-3" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{cap.title}</h4>
                    <p className="text-xs text-white/60 leading-normal">{cap.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/technology"
                className="inline-flex items-center space-x-2 px-6 py-3.5 bg-accent-gold text-primary-deep hover:bg-accent-bright font-extrabold rounded-xl text-xs shadow-md transition-all"
              >
                <span>Explore Our Digital Vision</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              
              <Link
                href="/track"
                className="inline-flex items-center space-x-2 px-6 py-3.5 border border-white/20 hover:border-white hover:bg-white/5 rounded-xl text-xs font-bold transition-all"
              >
                <span>Test Tracking Simulator</span>
              </Link>
            </div>
          </div>

          {/* Graphic Mockup Side */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-primary-black/60 shadow-2xl p-2">
              
              {/* Dashboard Preview Frame */}
              <div className="relative h-64 sm:h-80 lg:h-96 rounded-xl overflow-hidden">
                <Image
                  src="/images/dfs-technology-dashboard.png"
                  alt="SADC tracking map and axle telemetry dashboard interface on DFS-OS."
                  fill
                  className="object-cover"
                />
              </div>

              {/* Status Header Overlay */}
              <div className="p-4 bg-primary-black/80 rounded-xl mt-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border border-white/5">
                <div className="space-y-1">
                  <span className="text-[9px] uppercase tracking-wider text-accent-gold font-bold block">
                    System Sandbox Preview
                  </span>
                  <p className="text-xs text-white/70">
                    Interact with our live operational concept sandboxes designed for DFS-OS.
                  </p>
                </div>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] px-2.5 py-1 rounded font-mono font-bold">
                  CONCEPT ONLINE
                </span>
              </div>
            </div>

            {/* Action Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/portal-preview"
                className="border border-white/10 bg-white/5 hover:border-accent-gold/40 hover:bg-white/10 p-5 rounded-2xl text-left transition-all space-y-3 block group"
              >
                <div className="h-9 w-9 rounded-lg bg-accent-gold/10 text-accent-gold flex items-center justify-center">
                  <UserCheck className="h-5 w-5" />
                </div>
                <h4 className="font-extrabold text-sm text-white group-hover:text-accent-gold transition-colors">
                  Customer Portal Sandbox
                </h4>
                <p className="text-xs text-white/55 leading-relaxed">
                  Log in to a simulated client space. View live milestone timelines and download customs release documents.
                </p>
              </Link>
              
              <Link
                href="/admin-preview"
                className="border border-white/10 bg-white/5 hover:border-accent-gold/40 hover:bg-white/10 p-5 rounded-2xl text-left transition-all space-y-3 block group"
              >
                <div className="h-9 w-9 rounded-lg bg-primary-light text-primary-royal flex items-center justify-center">
                  <Monitor className="h-5 w-5" />
                </div>
                <h4 className="font-extrabold text-sm text-white group-hover:text-accent-gold transition-colors">
                  Operations Dispatch Sandbox
                </h4>
                <p className="text-xs text-white/55 leading-relaxed">
                  Open the control board. Track border queues, inspect truck axle logs, and simulate real-time dispatch routes.
                </p>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
