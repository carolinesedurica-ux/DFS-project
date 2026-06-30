import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Zap, ArrowRight, CheckCircle2, Package, MapPin,
  Clock, Phone, Smartphone, Truck, ArrowLeft, Star
} from "lucide-react";

export const metadata: Metadata = {
  title: "DFS Express | Courier & Parcel Delivery | Botswana & Southern Africa",
  description:
    "DFS Express is the courier and express delivery division of DFS Group. Same-day, next-day and express parcel delivery across Botswana and Southern Africa for documents, parcels and commercial freight.",
};

const services = [
  {
    icon: Zap,
    title: "Same-Day Delivery",
    desc: "Urgent same-day delivery for documents and small parcels within Gaborone and major Botswana cities. Book by 10:00 AM.",
  },
  {
    icon: Clock,
    title: "Next-Day Nationwide",
    desc: "Reliable next-business-day delivery across all major Botswana destinations. Track your parcel from collection to doorstep.",
  },
  {
    icon: Package,
    title: "Parcel & Package Delivery",
    desc: "Standard and bulky parcel delivery for individuals and businesses. From envelopes to commercial-grade shipments.",
  },
  {
    icon: Truck,
    title: "Dedicated Courier Runs",
    desc: "Dedicated vehicle runs for high-value or time-sensitive consignments requiring full vehicle exclusivity and direct routing.",
  },
  {
    icon: MapPin,
    title: "Regional Express Freight",
    desc: "Express freight routes across Botswana, South Africa, Zambia and Zimbabwe for commercial and time-critical consignments.",
  },
  {
    icon: Smartphone,
    title: "Digital Tracking",
    desc: "Real-time parcel tracking with SMS and email notifications at every stage of the delivery journey.",
  },
];

const pricingTiers = [
  {
    name: "Standard Parcel",
    speed: "2–3 Business Days",
    weight: "Up to 5 kg",
    tag: "Most Affordable",
    color: "border-gray-200",
  },
  {
    name: "Express Delivery",
    speed: "Next Business Day",
    weight: "Up to 20 kg",
    tag: "Most Popular",
    color: "border-primary-royal",
    highlight: true,
  },
  {
    name: "Same-Day Rush",
    speed: "Same Day",
    weight: "Up to 5 kg",
    tag: "Fastest",
    color: "border-accent-gold",
  },
];

const coverage = [
  "Gaborone & surrounding areas",
  "Francistown & North-East",
  "Maun & Ngamiland",
  "Kasane & Chobe",
  "Jwaneng & Southern Botswana",
  "Lobatse & South-East",
  "Johannesburg & Pretoria",
  "Harare, Zimbabwe",
  "Lusaka, Zambia",
];

export default function ExpressPage() {
  return (
    <div className="flex flex-col w-full">
      {/* HERO */}
      <section className="relative min-h-[75vh] flex items-end bg-[#2a0050]">
        <Image
          src="/images/dfs-home-hero-fleet.jpg"
          alt="DFS Express courier delivery vehicle in Botswana."
          fill
          sizes="100vw"
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2a0050] via-[#2a0050]/70 to-transparent" />

        {/* Animated speed lines decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-gold/30 to-transparent" />
        </div>

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
              <div className="relative h-16 w-52">
                <Image
                  src="/images/logos/dfsexpresslogo.jpeg"
                  alt="DFS Express"
                  fill
                  sizes="208px"
                  className="object-contain object-left"
                  priority
                />
              </div>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-3xl font-display">
            Delivering Botswana{" "}
            <span className="text-accent-gold">At Express Speed</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed">
            Same-day, next-day and express courier services across Botswana and
            the region. Fast, tracked, reliable — for documents, parcels and
            commercial freight.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center space-x-2 px-8 py-4 gold-gradient text-primary-deep font-extrabold rounded-xl text-sm shadow-lg hover:-translate-y-0.5 transition-transform"
            >
              <span>Book a Delivery</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center space-x-2 px-8 py-4 border border-white/30 hover:border-white text-white font-bold rounded-xl text-sm transition-all"
            >
              <Phone className="h-4 w-4 text-accent-gold" />
              <span>Contact DFS Express</span>
            </Link>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-[#5c1a8c] text-white py-8 border-t border-accent-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { value: "Same Day", label: "Fastest Option" },
              { value: "9+", label: "Delivery Zones" },
              { value: "Tracked", label: "Every Parcel" },
              { value: "24/7", label: "Customer Support" },
            ].map((s) => (
              <div key={s.label}>
                <span className="block text-2xl sm:text-3xl font-extrabold text-accent-gold tracking-tight">
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

      {/* SERVICES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-deep tracking-tight font-display">
              Express Delivery Services
            </h2>
            <p className="text-sm text-grey max-w-xl mx-auto">
              From urgent documents to bulky commercial consignments — DFS
              Express has a delivery solution for every need.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.title} className="p-6 rounded-2xl border border-gray-100 bg-white hover:bg-light-grey transition-colors shadow-sm space-y-3">
                <div className="h-10 w-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="font-extrabold text-primary-deep">{s.title}</h3>
                <p className="text-sm text-grey leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERY OPTIONS */}
      <section className="py-20 bg-light-grey border-t border-b border-border-dfs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-deep tracking-tight font-display">
              Choose Your Delivery Speed
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {pricingTiers.map((t) => (
              <div
                key={t.name}
                className={`bg-white rounded-2xl p-8 border-2 ${t.color} shadow-sm space-y-4 relative ${
                  t.highlight ? "shadow-[0_8px_40px_rgba(123,63,160,0.15)]" : ""
                }`}
              >
                {t.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center space-x-1 bg-primary-royal text-white text-[10px] font-extrabold px-3 py-1 rounded-full">
                    <Star className="h-3 w-3 text-accent-gold" />
                    <span>{t.tag}</span>
                  </div>
                )}
                {!t.highlight && (
                  <span className="text-[10px] font-bold text-grey uppercase tracking-wider">{t.tag}</span>
                )}
                <h3 className="text-xl font-extrabold text-primary-deep">{t.name}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-grey">Speed</span>
                    <span className="font-bold text-primary-royal">{t.speed}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-grey">Max Weight</span>
                    <span className="font-bold text-primary-royal">{t.weight}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-grey">Tracking</span>
                    <span className="font-bold text-emerald-600">Included</span>
                  </div>
                </div>
                <Link
                  href="/quote"
                  className={`block w-full text-center py-3 rounded-xl text-sm font-extrabold transition-all ${
                    t.highlight
                      ? "bg-primary-royal hover:bg-primary-deep text-white"
                      : "border border-primary-royal text-primary-royal hover:bg-primary-light"
                  }`}
                >
                  Book Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COVERAGE MAP */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-deep tracking-tight font-display">
                Delivery Coverage Areas
              </h2>
              <p className="text-sm text-grey leading-relaxed">
                DFS Express delivers across Botswana and into neighbouring
                countries for commercial clients. Our network is expanding
                continuously.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {coverage.map((area) => (
                  <div key={area} className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-accent-gold flex-shrink-0" />
                    <span className="text-sm text-charcoal font-medium">{area}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-light-grey rounded-2xl p-8 border border-border-dfs space-y-4">
              <h3 className="font-extrabold text-primary-deep text-lg">Send a Parcel Today</h3>
              <p className="text-sm text-grey leading-relaxed">
                Contact DFS Express to arrange collection and delivery. Our
                commercial team will provide a quote and confirm your delivery
                window within 30 minutes.
              </p>
              <div className="space-y-3 text-sm">
                <a href="tel:+26774191781" className="flex items-center space-x-3 font-bold text-primary-royal hover:text-accent-gold transition-colors">
                  <Phone className="h-4 w-4 text-accent-gold" />
                  <span>+267 74 191 781</span>
                </a>
                <a href="mailto:info@bw-dfsgroup.com" className="flex items-center space-x-3 font-bold text-primary-royal hover:text-accent-gold transition-colors">
                  <Zap className="h-4 w-4 text-accent-gold" />
                  <span>info@bw-dfsgroup.com</span>
                </a>
              </div>
              <Link href="/quote" className="block w-full text-center py-3 gold-gradient text-primary-deep font-extrabold rounded-xl text-sm mt-2">
                Get an Express Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#2a0050] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,161,29,0.08)_0%,transparent_70%)]" />
        <div className="relative z-10 max-w-2xl mx-auto px-4 space-y-6">
          <div className="inline-flex items-center bg-white/95 rounded-2xl px-5 py-3 shadow-lg ring-1 ring-white/30 mx-auto">
            <div className="relative h-16 w-44">
              <Image src="/images/logos/dfsexpresslogo.jpeg" alt="DFS Express" fill sizes="176px" className="object-contain" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display">
            Send It Express Today
          </h2>
          <p className="text-white/70 text-sm leading-relaxed">
            Get your parcel collected and delivered fast. DFS Express operates
            across Botswana and into the region.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote" className="px-8 py-4 gold-gradient text-primary-deep font-extrabold rounded-xl text-sm">
              Book a Delivery
            </Link>
            <Link href="/contact" className="px-8 py-4 border border-white/20 hover:border-white text-white font-bold rounded-xl text-sm">
              Contact DFS Express
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
