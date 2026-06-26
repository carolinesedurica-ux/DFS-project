import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mail } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative py-24 sm:py-32 bg-primary-deep text-white overflow-hidden">
      
      {/* Background Image with Deep Purple Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/dfs-home-hero-fleet.png"
          alt="DFS Group logistics truck on a SADC regional corridor."
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-deep/95 via-primary-deep/80 to-primary-black/90 z-10"></div>
        {/* Subtle grid mesh overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] z-10"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center space-y-8">
        <div className="space-y-4">
          <span className="text-xs uppercase font-extrabold tracking-widest text-accent-gold block font-heading">
            Get a Commercial Quote
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight font-display">
            Ready to Move Your Cargo?
          </h2>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            Tell us what you are transporting, where it is going, and when it needs to arrive. Our commercial clearing and routing teams will compile an optimized corridor quotation.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
          {/* Primary Gold CTA */}
          <Link
            href="/quote"
            className="flex items-center justify-center space-x-2 w-full sm:w-auto px-8 py-4 gold-gradient text-primary-deep rounded-xl text-sm font-extrabold shadow-lg transition-transform hover:-translate-y-0.5"
          >
            <span>Request a Quote</span>
            <ArrowRight className="h-4.5 w-4.5" />
          </Link>
          
          {/* Secondary Outline/White CTA */}
          <Link
            href="/contact"
            className="flex items-center justify-center space-x-2 w-full sm:w-auto px-8 py-4 border border-white/20 hover:border-white hover:bg-white/5 text-white rounded-xl text-sm font-bold transition-all"
          >
            <Mail className="h-4.5 w-4.5 text-accent-gold" />
            <span>Contact Our Team</span>
          </Link>
        </div>

        {/* Operational Context Footnote */}
        <p className="text-[10px] text-white/40 tracking-wider uppercase font-mono pt-4">
          SADC Corridor Logistics // Gaborone Office Direct Desk: +267 391 1920
        </p>
      </div>

    </section>
  );
}
