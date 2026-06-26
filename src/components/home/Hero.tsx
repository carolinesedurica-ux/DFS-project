import Link from "next/link";
import { ArrowRight, ShieldCheck, Cpu, Globe } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-primary-deep text-white overflow-hidden min-h-[580px] sm:min-h-[660px] lg:min-h-[760px] flex items-center pt-20 pb-28 sm:pb-36 border-b border-accent-gold/20">
      
      {/* Background visual - Styled with premium overlay grids */}
      <div className="absolute inset-0 bg-primary-black pointer-events-none">
        {/* Subtle grid mesh */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        {/* Deep purple radial glow */}
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-royal/10 blur-[130px] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent-gold/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Copy */}
          <div className="lg:col-span-8 space-y-6 text-left animate-fade-in-up">
            
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-xs font-bold text-accent-gold uppercase tracking-wider">
              <ShieldCheck className="h-4.5 w-4.5 text-accent-gold" />
              <span>Royal Logistics. Regional Strength.</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-none font-display">
              Moving Southern <br />
              <span className="text-accent-gold">Africa Forward</span>
            </h1>

            <p className="text-base sm:text-lg text-white/80 max-w-2xl leading-relaxed">
              Reliable bulk, bagged and cross-border cargo solutions powered by modern fleet capacity, regional expertise and a growing SADC digital logistics network.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href="/quote"
                className="flex items-center justify-center space-x-2 px-7 py-4 gold-gradient text-primary-deep rounded-xl text-sm font-extrabold shadow-lg transition-transform hover:-translate-y-0.5"
              >
                <span>Request a Quote</span>
                <ArrowRight className="h-4.5 w-4.5" />
              </Link>
              
              <Link
                href="/services"
                className="flex items-center justify-center space-x-2 px-7 py-4 border border-white/20 hover:border-white hover:bg-white/5 rounded-xl text-sm font-bold transition-all"
              >
                <span>Explore Our Services</span>
              </Link>
            </div>

          </div>

          {/* Hero Right: Status Indicator Panel */}
          <div className="lg:col-span-4 hidden lg:block animate-fade-in-up delay-150">
            <div className="border border-white/10 bg-primary-black/60 p-6 rounded-2xl shadow-2xl backdrop-blur-sm space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-accent-gold font-bold uppercase tracking-wider">Dispatch Feed</span>
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="bg-white/5 border border-white/5 p-3 rounded-lg flex items-center justify-between">
                  <div>
                    <span className="block text-[9px] text-white/40 font-mono">LINK IN TRANSIT</span>
                    <span className="font-bold text-white">DFS-102-BOT</span>
                  </div>
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] px-2 py-0.5 rounded font-mono font-bold">
                    MARTINS DRIFT
                  </span>
                </div>

                <div className="bg-white/5 border border-white/5 p-3 rounded-lg flex items-center justify-between">
                  <div>
                    <span className="block text-[9px] text-white/40 font-mono">BAGGED FREIGHT</span>
                    <span className="font-bold text-white">DFS-789-ZIM</span>
                  </div>
                  <span className="bg-accent-gold/10 text-accent-gold border border-accent-gold/20 text-[9px] px-2 py-0.5 rounded font-mono font-bold">
                    RAMOKGWEBANA
                  </span>
                </div>

                <div className="bg-white/5 border border-white/5 p-3 rounded-lg flex items-center justify-between">
                  <div>
                    <span className="block text-[9px] text-white/40 font-mono">DEDICATED CARGO</span>
                    <span className="font-bold text-white">DFS-304-ZAM</span>
                  </div>
                  <span className="bg-tech-blue/10 text-tech-blue border border-tech-blue/20 text-[9px] px-2 py-0.5 rounded font-mono font-bold">
                    KAZUNGULA
                  </span>
                </div>
              </div>

              <div className="pt-2 text-center">
                <Link href="/technology" className="text-[10px] font-bold text-accent-gold hover:underline flex items-center justify-center space-x-1">
                  <Cpu className="h-3.5 w-3.5" />
                  <span>Learn about our geofenced SADC tracking</span>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
