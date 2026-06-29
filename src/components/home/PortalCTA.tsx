import Image from "next/image";
import Link from "next/link";
import { Lock, UserPlus, Eye, FileText, MessageSquare, Truck, ArrowRight, ShieldCheck } from "lucide-react";

export default function PortalCTA() {
  const benefits = [
    { icon: Eye, title: "Real-Time Shipment Visibility", desc: "Track your cargo across SADC corridors with milestone-by-milestone updates." },
    { icon: FileText, title: "Digital Document Management", desc: "Access waybills, customs declarations, manifests and invoices securely." },
    { icon: MessageSquare, title: "Direct Communication", desc: "Message our dispatch and customs teams directly from your dashboard." },
    { icon: Truck, title: "Fleet & Route Tracking", desc: "See assigned vehicles, routes and estimated delivery windows." },
  ];

  return (
    <section className="py-20 lg:py-28 bg-primary-deep text-white relative overflow-hidden border-t border-accent-gold/20">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,161,29,0.04)_0%,transparent_70%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Copy Side */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full text-xs font-bold text-accent-gold uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4" />
              <span>Secure Customer Portal</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight font-display">
              Smarter Visibility for{" "}
              <span className="text-accent-gold">DFS Customers</span>
            </h2>

            <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl">
              DFS Group is developing a secure digital logistics environment
              that gives approved customers greater visibility over shipments,
              documents and logistics communication.
            </p>

            {/* Benefit List */}
            <div className="space-y-4 pt-2">
              {benefits.map((b, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <div className="h-8 w-8 rounded-lg bg-accent-gold/10 text-accent-gold flex items-center justify-center flex-shrink-0 mt-0.5 border border-accent-gold/20">
                    <b.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{b.title}</h4>
                    <p className="text-xs text-white/60 leading-normal">
                      {b.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/portal/sign-in"
                className="inline-flex items-center space-x-2 px-6 py-3.5 bg-accent-gold text-primary-deep hover:bg-accent-bright font-extrabold rounded-xl text-xs shadow-md transition-all"
              >
                <Lock className="h-4 w-4" />
                <span>Customer Sign In</span>
              </Link>

              <Link
                href="/portal/request-access"
                className="inline-flex items-center space-x-2 px-6 py-3.5 border border-white/20 hover:border-white hover:bg-white/5 rounded-xl text-xs font-bold transition-all"
              >
                <UserPlus className="h-4 w-4 text-accent-gold" />
                <span>Request Portal Access</span>
              </Link>
            </div>
          </div>

          {/* Visual Side — Dashboard Mockup */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-primary-black/60 shadow-2xl p-2">
              <div className="relative h-64 sm:h-80 lg:h-96 rounded-xl overflow-hidden">
                <Image
                  src="/images/dfs-technology-dashboard.png"
                  alt="DFS Customer Portal dashboard preview showing shipment tracking and document management."
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              <div className="p-4 bg-primary-black/80 rounded-xl mt-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border border-white/5">
                <div className="space-y-1">
                  <span className="text-[9px] uppercase tracking-wider text-accent-gold font-bold block">
                    Customer Portal Preview
                  </span>
                  <p className="text-xs text-white/70">
                    Secure access to shipments, documents and communications.
                  </p>
                </div>
                <span className="bg-primary-royal/20 text-accent-gold border border-accent-gold/20 text-[9px] px-2.5 py-1 rounded font-mono font-bold">
                  SECURE ACCESS
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
