import Link from "next/link";
import { ArrowRight } from "lucide-react";
import settings from "@/data/settings.json";

// Import modular homepage components
import Hero from "@/components/home/Hero";
import TrackingPanel from "@/components/home/TrackingPanel";
import QuickActions from "@/components/home/QuickActions";
import ServiceShowcase from "@/components/home/ServiceShowcase";
import FleetPreview from "@/components/home/FleetPreview";
import RegionalMap from "@/components/RegionalMap";
import WhyDFS from "@/components/home/WhyDFS";
import TechnologySection from "@/components/home/TechnologySection";
import SustainabilitySafety from "@/components/home/SustainabilitySafety";
import NewsUpdates from "@/components/home/NewsUpdates";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. HERO SECTION */}
      <Hero />

      {/* 2. OVERLAPPING SHIPMENT TRACKING PANEL */}
      <TrackingPanel />

      {/* 3. QUICK ACTION CARDS */}
      <QuickActions />

      {/* 4. STATISTICS BAR */}
      <section className="relative py-12 bg-white border-t border-b border-border-dfs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(settings.stats).map(([key, stat]) => (
              <div
                key={key}
                className="p-5 rounded-2xl hover:bg-light-grey transition-colors border-l-4 border-accent-gold pl-5 space-y-1 bg-white"
              >
                <span className="block text-3xl font-extrabold text-primary-deep tracking-tight font-display">
                  {stat.value}
                </span>
                <span className="block text-xs font-extrabold text-primary-royal uppercase tracking-wider">
                  {stat.label}
                </span>
                <span className="block text-xs text-grey leading-relaxed">
                  {stat.details}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SERVICE SOLUTIONS SHOWCASE */}
      <ServiceShowcase />

      {/* 6. FLEET CAPACITY PREVIEW */}
      <FleetPreview />

      {/* 7. REGIONAL NETWORK CORRIDORS */}
      <section className="py-20 lg:py-28 bg-primary-black text-white border-t border-accent-gold/20 relative">
        {/* Subtle grid mesh */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs uppercase font-extrabold tracking-widest text-accent-gold block font-heading">
              Geographic Network
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display">
              Connected Across Southern Africa
            </h2>
            <p className="text-sm sm:text-base text-white/60 leading-relaxed">
              DFS Group links main logistics routes in Botswana, South Africa, Zambia, and Zimbabwe. We operate on the ground at major border corridors to ensure fast fleet turnaround times.
            </p>
          </div>

          {/* Render the interactive SVG corridor map */}
          <div className="bg-primary-deep/50 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
            <RegionalMap />
          </div>
          
          <div className="text-center pt-4">
            <Link
              href="/network"
              className="inline-flex items-center space-x-2 text-sm font-bold text-accent-gold hover:text-white transition-colors"
            >
              <span>View full office directories and supported routes</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. WHY CHOOSE DFS ADVANTAGES */}
      <WhyDFS />

      {/* 9. TECHNOLOGY & DFS-OS OVERVIEW */}
      <TechnologySection />

      {/* 10. SUSTAINABILITY & HSEQE SAFETY */}
      <SustainabilitySafety />

      {/* 11. NEWS AND BULLETINS */}
      <NewsUpdates />

      {/* 12. FINAL BUSINESS CTA BANNER */}
      <FinalCTA />
    </div>
  );
}
