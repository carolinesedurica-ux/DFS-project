import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  FileText, ArrowRight, CheckCircle2, Globe, Shield,
  Clock, Clipboard, BookOpen, Phone, ArrowLeft
} from "lucide-react";

export const metadata: Metadata = {
  title: "DFS Clearing | Customs Clearing & Compliance | SADC Border Posts",
  description:
    "DFS Clearing provides professional customs clearing services at all major SADC border posts. HS code classification, duty optimisation, pre-clearance, digital documentation and SARS compliance.",
};

const services = [
  {
    icon: Clipboard,
    title: "Customs Declaration",
    desc: "Accurate preparation and submission of customs entries, SAD500 declarations and all supporting documents at SADC border posts.",
  },
  {
    icon: BookOpen,
    title: "HS Tariff Classification",
    desc: "Expert classification of goods under the Harmonised System tariff codes to ensure correct duty assessment and compliance.",
  },
  {
    icon: Shield,
    title: "Duty & Tax Optimisation",
    desc: "Identification of rebates, duty drawbacks and preferential trade agreement benefits to minimise your import duties legally.",
  },
  {
    icon: Globe,
    title: "Multi-Country Border Expertise",
    desc: "Clearing operations across Martins Drift, Kazungula, Beitbridge, Ramokgwebana and all major Botswana border posts.",
  },
  {
    icon: FileText,
    title: "Digital Document Management",
    desc: "All clearance documents digitally archived and accessible. Waybills, customs declarations, permits and certificates in one place.",
  },
  {
    icon: Clock,
    title: "Pre-Clearance Services",
    desc: "Documents submitted in advance of vehicle arrival to minimise border dwell time and ensure fast cargo release.",
  },
];

const borderPosts = [
  "Martins Drift (Botswana / SA)",
  "Kazungula (Botswana / Zambia)",
  "Beitbridge (SA / Zimbabwe)",
  "Ramokgwebana (Botswana / Zim)",
  "Tlokweng / Gaborone Gate (Botswana / SA)",
  "Pandamatenga (Botswana / Zambia)",
];

export default function ClearingPage() {
  return (
    <div className="flex flex-col w-full">
      {/* HERO */}
      <section className="relative min-h-[75vh] flex items-end bg-[#1a1200]">
        <Image
          src="/images/dfs-customs-support.png"
          alt="DFS Clearing agents processing customs documentation at a SADC border post."
          fill
          sizes="100vw"
          className="object-cover opacity-25"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1200] via-[#1a1200]/70 to-transparent" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <Link
            href="/"
            className="inline-flex items-center space-x-1.5 text-white/60 hover:text-white text-xs font-semibold mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to DFS Group</span>
          </Link>

          <div className="mb-8 animate-logo-entrance">
            <div className="inline-flex items-center bg-white/95 backdrop-blur-md rounded-2xl px-5 py-3 animate-logo-glow ring-1 ring-white/50">
              <div className="relative h-14 w-48">
                <Image
                  src="/images/logos/dfs-clearing-logo.svg"
                  alt="DFS Clearing"
                  fill
                  sizes="192px"
                  className="object-contain object-left"
                  priority
                />
              </div>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-3xl font-display">
            Clearing the Path{" "}
            <span className="text-accent-gold">Across Every Border</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed">
            Professional customs clearing agents operating at all major SADC
            border posts. Fast, compliant, digital-first clearance so your
            cargo keeps moving.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center space-x-2 px-8 py-4 gold-gradient text-primary-deep font-extrabold rounded-xl text-sm shadow-lg hover:-translate-y-0.5 transition-transform"
            >
              <span>Request Clearing Services</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center space-x-2 px-8 py-4 border border-white/30 hover:border-white text-white font-bold rounded-xl text-sm transition-all"
            >
              <Phone className="h-4 w-4 text-accent-gold" />
              <span>Talk to a Clearing Agent</span>
            </Link>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-[#7B3FA0] text-white py-8 border-t border-accent-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { value: "6+", label: "Border Posts Covered" },
              { value: "4", label: "SADC Countries" },
              { value: "100%", label: "Compliance Rate" },
              { value: "7 Yrs", label: "Industry Experience" },
            ].map((s) => (
              <div key={s.label}>
                <span className="block text-3xl font-extrabold text-accent-gold tracking-tight">
                  {s.value}
                </span>
                <span className="block text-xs text-white/70 font-semibold uppercase tracking-wider mt-0.5">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-deep tracking-tight font-display">
              Our Clearing Services
            </h2>
            <p className="text-sm text-grey max-w-xl mx-auto">
              End-to-end customs clearing from document preparation to cargo
              release — handled by experienced agents.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.title} className="p-6 rounded-2xl border border-gray-100 bg-white hover:bg-light-grey transition-colors shadow-sm space-y-3">
                <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="font-extrabold text-primary-deep">{s.title}</h3>
                <p className="text-sm text-grey leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BORDER POSTS */}
      <section className="py-20 bg-light-grey border-t border-b border-border-dfs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-deep tracking-tight font-display">
                Active Border Post Coverage
              </h2>
              <p className="text-sm text-grey leading-relaxed">
                DFS Clearing agents are present and operational at the most
                critical SADC crossing points. We know the customs authorities,
                the queuing procedures and the documentation requirements at
                each post.
              </p>
              <div className="space-y-3">
                {borderPosts.map((bp) => (
                  <div key={bp} className="flex items-center space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-accent-gold flex-shrink-0" />
                    <span className="text-sm font-semibold text-charcoal">{bp}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm space-y-6">
              <h3 className="font-extrabold text-primary-deep text-lg">
                Why Choose DFS Clearing?
              </h3>
              <ul className="space-y-4 text-sm text-grey">
                {[
                  "Experienced agents who know BURS, SARS and ZIMRA procedures",
                  "Digital document submission reduces border waiting time",
                  "HS code experts prevent costly reclassification delays",
                  "24/7 contact for urgent border clearing support",
                  "Integrated with DFS Trucking for seamless cargo handling",
                  "Transparent cost reporting with no hidden charges",
                ].map((pt) => (
                  <li key={pt} className="flex items-start space-x-3">
                    <div className="h-5 w-5 rounded-full bg-accent-gold/10 text-accent-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="h-3 w-3" />
                    </div>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary-deep text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,161,29,0.06)_0%,transparent_70%)]" />
        <div className="relative z-10 max-w-2xl mx-auto px-4 space-y-6">
          <div className="inline-flex items-center bg-white/95 rounded-2xl px-5 py-3 shadow-lg ring-1 ring-white/30 mx-auto">
            <div className="relative h-12 w-40">
              <Image src="/images/logos/dfs-clearing-logo.svg" alt="DFS Clearing" fill sizes="160px" className="object-contain" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display">
            Need Fast Border Clearance?
          </h2>
          <p className="text-white/70 text-sm leading-relaxed">
            Send us your documents ahead of time and our clearing agents will
            process your entry before the truck arrives at the border.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote" className="px-8 py-4 gold-gradient text-primary-deep font-extrabold rounded-xl text-sm">
              Request Clearing Services
            </Link>
            <Link href="/contact" className="px-8 py-4 border border-white/20 hover:border-white text-white font-bold rounded-xl text-sm">
              Contact DFS Clearing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
