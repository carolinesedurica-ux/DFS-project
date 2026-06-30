import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Truck, ArrowRight, CheckCircle2, MapPin, Phone, Mail,
  Package, Shield, Globe, Clock, ArrowLeft
} from "lucide-react";

export const metadata: Metadata = {
  title: "DFS Trucking | Bulk & Bagged Road Freight | SADC Corridors",
  description:
    "DFS Trucking operates high-capacity Volvo and Scania trucks across SADC road freight corridors. Bulk minerals, bagged cargo, side-tippers and flat-decks across Botswana, South Africa, Zambia and Zimbabwe.",
};

const capabilities = [
  {
    icon: Truck,
    title: "Bulk Mineral Haulage",
    desc: "Copper concentrates, coal, manganese and other dry bulk minerals transported in 45m³ side-tipper configurations.",
  },
  {
    icon: Package,
    title: "Bagged Cargo Transport",
    desc: "Palletised and bagged commodities — cement, fertilizer, grain and building materials — on flat-deck semi-trailers.",
  },
  {
    icon: Globe,
    title: "Cross-Border SADC Freight",
    desc: "Authorised cross-border transport across Botswana, South Africa, Zambia and Zimbabwe with valid transit permits.",
  },
  {
    icon: Shield,
    title: "Compliant Fleet Operations",
    desc: "All vehicles operated within legal axle-load limits, comprehensively insured and maintained to manufacturer standards.",
  },
  {
    icon: Clock,
    title: "Scheduled & Spot Freight",
    desc: "Regular scheduled corridor runs as well as responsive ad-hoc transport for time-sensitive cargo requirements.",
  },
  {
    icon: MapPin,
    title: "SADC Depot Network",
    desc: "Operational depots and contacts in Gaborone, Johannesburg, Lusaka and Harare for seamless cargo handovers.",
  },
];

const fleet = [
  { model: "Volvo FH 440", config: "45m³ Side Tipper", payload: "38 MT", count: "6 Units" },
  { model: "Scania R460", config: "45m³ Side Tipper", payload: "38 MT", count: "4 Units" },
  { model: "Volvo FH/FMX 440", config: "22.5m³ Side Tipper Link", payload: "34 MT", count: "5 Units" },
  { model: "Scania G460", config: "Flat-Deck Link", payload: "36 MT", count: "4 Units" },
];

export default function TruckingPage() {
  return (
    <div className="flex flex-col w-full">
      {/* HERO */}
      <section className="relative min-h-[75vh] flex items-end bg-[#1a0830]">
        <Image
          src="/images/dfs-fleet-side-tipper-lineup.jpg"
          alt="DFS Trucking fleet — Scania and Volvo side-tipper units on a SADC corridor."
          fill
          sizes="100vw"
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0830] via-[#1a0830]/70 to-transparent" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center space-x-1.5 text-white/60 hover:text-white text-xs font-semibold mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to DFS Group</span>
          </Link>

          {/* Division logo */}
          <div className="mb-8 animate-logo-entrance">
            <div className="inline-flex items-center bg-white/95 backdrop-blur-md rounded-2xl px-5 py-3 animate-logo-glow ring-1 ring-white/50">
              <div className="relative h-14 w-48">
                <Image
                  src="/images/logos/dfstruckinglogo.png"
                  alt="DFS Trucking"
                  fill
                  sizes="192px"
                  className="object-contain object-left"
                  priority
                />
              </div>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-3xl font-display">
            Moving Southern Africa's{" "}
            <span className="text-accent-gold">Heaviest Loads</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed">
            High-capacity road freight specialists operating on SADC corridors.
            Bulk minerals, bagged cargo and cross-border haulage — done right,
            every load.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center space-x-2 px-8 py-4 gold-gradient text-primary-deep font-extrabold rounded-xl text-sm shadow-lg hover:-translate-y-0.5 transition-transform"
            >
              <span>Request a Freight Quote</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center space-x-2 px-8 py-4 border border-white/30 hover:border-white text-white font-bold rounded-xl text-sm transition-all hover:bg-white/5"
            >
              <Phone className="h-4 w-4 text-accent-gold" />
              <span>Speak to Our Team</span>
            </Link>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-primary-royal text-white py-8 border-t border-accent-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { value: "27+", label: "Active Fleet Units" },
              { value: "4", label: "SADC Countries" },
              { value: "38 MT", label: "Max Payload" },
              { value: "7 Yrs", label: "Operating Experience" },
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

      {/* CAPABILITIES GRID */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-deep tracking-tight font-display">
              What DFS Trucking Does
            </h2>
            <p className="text-sm text-grey max-w-xl mx-auto">
              Purpose-built road freight solutions for high-value commodities
              on Southern Africa's most demanding corridors.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((c) => (
              <div
                key={c.title}
                className="p-6 rounded-2xl border border-gray-100 bg-white hover:bg-light-grey transition-colors shadow-sm space-y-3"
              >
                <div className="h-10 w-10 rounded-xl bg-primary-light text-primary-royal flex items-center justify-center">
                  <c.icon className="h-5 w-5" />
                </div>
                <h3 className="font-extrabold text-primary-deep">{c.title}</h3>
                <p className="text-sm text-grey leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FLEET GALLERY */}
      <section className="py-20 bg-light-grey border-t border-b border-border-dfs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-deep tracking-tight font-display">
              Our Trucking Fleet
            </h2>
            <p className="text-sm text-grey">
              Modern, well-maintained vehicles configured for bulk road freight
              across the SADC region.
            </p>
          </div>

          {/* Hero fleet image */}
          <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden mb-6 shadow-lg">
            <Image
              src="/images/dfs-fleet-branding-event.jpg"
              alt="DFS Group fleet lineup at a SADC regional event"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/70 to-transparent flex items-end p-6">
              <div>
                <p className="text-white font-extrabold text-xl">DFS Group — SADC Corridor Fleet</p>
                <p className="text-white/70 text-sm mt-1">Scania & Volvo units operating across Botswana, South Africa, Zambia & Zimbabwe</p>
              </div>
            </div>
          </div>

          {/* Photo grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {[
              { src: '/images/dfs-fleet-scania-volvo-depot.jpg', label: 'Scania + Volvo Depot' },
              { src: '/images/dfs-scania-flatdeck-road.jpg', label: 'Flat-Deck on Corridor' },
              { src: '/images/dfs-volvo-fh-pair.jpg', label: 'Volvo FH 440 Units' },
              { src: '/images/dfs-scania-lineup-blue-sky.jpg', label: 'Scania Lineup' },
              { src: '/images/dfs-scania-sunset-depot.jpg', label: 'Fleet at Dusk' },
              { src: '/images/dfs-fleet-five-scania-rain.jpg', label: '5 Units in Field' },
              { src: '/images/dfs-scania-flatdeck-open.jpg', label: 'Flat-Deck Link' },
              { src: '/images/dfs-volvo-depot-hangar.jpg', label: 'Volvo at Depot' },
            ].map((img) => (
              <div key={img.src} className="relative rounded-xl overflow-hidden aspect-square shadow-sm group">
                <Image
                  src={img.src}
                  alt={img.label}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                  <p className="text-white text-[10px] font-semibold">{img.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/fleet"
              className="inline-flex items-center space-x-2 text-sm font-bold text-primary-royal hover:text-accent-gold transition-colors"
            >
              <span>View Full Fleet Catalogue</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary-deep text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,161,29,0.06)_0%,transparent_70%)]" />
        <div className="relative z-10 max-w-2xl mx-auto px-4 space-y-6">
          <div className="inline-flex items-center bg-white/95 rounded-2xl px-5 py-3 shadow-lg ring-1 ring-white/30 mx-auto">
            <div className="relative h-12 w-40">
              <Image src="/images/logos/dfstruckinglogo.png" alt="DFS Trucking" fill sizes="160px" className="object-contain" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display">
            Ready to Move Your Cargo?
          </h2>
          <p className="text-white/70 text-sm leading-relaxed">
            Get a tailored corridor quotation from the DFS Trucking commercial
            desk. Tell us your route, cargo type and volume — we'll handle the
            rest.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote" className="px-8 py-4 gold-gradient text-primary-deep font-extrabold rounded-xl text-sm">
              Request a Quote
            </Link>
            <Link href="/contact" className="px-8 py-4 border border-white/20 hover:border-white text-white font-bold rounded-xl text-sm">
              Contact DFS Trucking
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
