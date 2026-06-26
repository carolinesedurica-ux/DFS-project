import Link from "next/link";
import { ArrowRight, ShieldCheck, CheckCircle2, Cpu, Truck, ChevronRight, Mail, Phone, MapPin, Leaf } from "lucide-react";
import settings from "@/data/settings.json";
import services from "@/data/services.json";
import fleet from "@/data/fleet.json";
import RegionalMap from "@/components/RegionalMap";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. HERO SECTION */}
      <section className="relative bg-primary-deep text-white overflow-hidden py-24 lg:py-32 border-b border-accent-gold/20">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        
        {/* Soft gradient spot */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-accent-gold/5 blur-[120px] rounded-full"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Copy */}
            <div className="lg:col-span-7 space-y-6 animate-fade-in-up">
              <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full text-xs font-semibold text-accent-gold">
                <ShieldCheck className="h-4 w-4" />
                <span>Southern Africa's Premium Cross-Border Network</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none">
                Moving Southern <br />
                <span className="text-accent-gold">Africa Forward</span>
              </h1>
              
              <p className="text-lg text-white/80 max-w-2xl leading-relaxed">
                Reliable bulk and bagged cargo transport, cross-border logistics, and customs clearing support. Powered by a modern fleet capability and a growing digital infrastructure.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/quote"
                  className="flex items-center justify-center space-x-2 px-6 py-3.5 bg-accent-gold text-primary-deep hover:bg-accent-hover rounded-md text-base font-bold shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Request a Quotation</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/services"
                  className="flex items-center justify-center space-x-2 px-6 py-3.5 border border-white/20 hover:border-white hover:bg-white/5 rounded-md text-base font-semibold transition-all"
                >
                  <span>Explore Services</span>
                </Link>
                <Link
                  href="/track"
                  className="flex items-center justify-center space-x-2 px-6 py-3.5 bg-white/5 border border-accent-gold/30 hover:border-accent-gold text-accent-gold rounded-md text-base font-semibold transition-all"
                >
                  <Truck className="h-5 w-5" />
                  <span>Track Demonstration</span>
                </Link>
              </div>
            </div>

            {/* Hero Right: Route / Grid graphic */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="border border-white/10 bg-white/[0.02] p-8 rounded-2xl relative shadow-2xl backdrop-blur-sm">
                <div className="absolute top-0 right-0 p-4 text-[9px] uppercase tracking-widest text-white/30 font-mono">
                  SYS-FOUNDATION // V1.0
                </div>
                <h3 className="text-lg font-bold text-white mb-4">Transit Dispatch Center</h3>
                
                <div className="space-y-4">
                  {/* Mock dispatch tracker */}
                  <div className="border border-white/5 bg-white/5 rounded-lg p-4 flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="text-xs text-white/40 font-mono">ACTIVE ROUTE</div>
                      <div className="text-sm font-bold">JHB → GABORONE</div>
                    </div>
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] px-2 py-0.5 rounded font-mono">
                      IN TRANSIT
                    </span>
                  </div>
                  
                  <div className="border border-white/5 bg-white/5 rounded-lg p-4 flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="text-xs text-white/40 font-mono">CUSTOMS DECLARED</div>
                      <div className="text-sm font-bold">KAZUNGULA BORDER</div>
                    </div>
                    <span className="bg-accent-gold/10 text-accent-gold border border-accent-gold/20 text-[10px] px-2 py-0.5 rounded font-mono">
                      CLEARED
                    </span>
                  </div>

                  <div className="border border-white/5 bg-white/5 rounded-lg p-4 flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="text-xs text-white/40 font-mono">FLEET UNIT ACTIVE</div>
                      <div className="text-sm font-bold">Volvo FH 440 (6x4)</div>
                    </div>
                    <span className="bg-tech-blue/10 text-tech-blue border border-tech-blue/20 text-[10px] px-2 py-0.5 rounded font-mono font-medium">
                      GPS ACTIVE
                    </span>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <Link href="/technology" className="inline-flex items-center space-x-1.5 text-xs text-accent-gold hover:underline">
                    <span>How we build DFS-OS connected logs</span>
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST AND CAPABILITY STATS */}
      <section className="relative z-20 -mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-white border border-gray-100 shadow-xl rounded-xl p-6 lg:p-8">
          {Object.entries(settings.stats).map(([key, stat]) => (
            <div key={key} className="p-4 rounded-lg hover:bg-gray-50 transition-colors border-l-4 border-accent-gold pl-5 space-y-1">
              <span className="block text-3xl font-extrabold text-primary-deep tracking-tight">{stat.value}</span>
              <span className="block text-sm font-bold text-charcoal">{stat.label}</span>
              <span className="block text-xs text-gray-500 leading-normal">{stat.details}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CORE SERVICES */}
      <section className="py-20 lg:py-28 bg-light-bg mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-xs uppercase font-extrabold tracking-widest text-accent-gold">Our Logistics Capability</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-primary-deep tracking-tight">Core Freight & Customs Solutions</h3>
            <p className="text-md text-gray-600 leading-relaxed">
              DFS Group integrates modern haulage equipment with seasoned border expertise to provide reliable cargo movements across the regional network.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((srv) => (
              <div key={srv.id} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-primary-deep/5 flex items-center justify-center text-primary-deep group-hover:bg-primary-deep group-hover:text-accent-gold transition-all duration-300">
                    <Truck className="h-6 w-6" />
                  </div>
                  <h4 className="text-xl font-bold text-primary-deep group-hover:text-primary-deep transition-colors">{srv.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{srv.shortDescription}</p>
                </div>
                <div className="pt-6 mt-6 border-t border-gray-50 flex items-center justify-between">
                  <Link href="/services" className="text-xs font-bold text-primary-deep hover:text-accent-gold transition-colors inline-flex items-center space-x-1">
                    <span>Service Details</span>
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                  <Link href="/quote" className="text-xs font-semibold text-accent-gold hover:text-accent-hover transition-colors">
                    Get Quote
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE DFS */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Copy */}
            <div className="space-y-6">
              <h2 className="text-xs uppercase font-extrabold tracking-widest text-accent-gold">Why Choose DFS Group</h2>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-primary-deep tracking-tight">Built for Regional Supply Chains</h3>
              <p className="text-md text-gray-600 leading-relaxed">
                We bridge current operational gaps by executing with high loading capacities, regional route expertise, and border coordination teams directly on the ground.
              </p>
              
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-accent-gold flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-gray-700">Modern fleet capacity (2025 units)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-accent-gold flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-gray-700">Real-time GPS visibility ready</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-accent-gold flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-gray-700">Active border clearing support</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-accent-gold flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-gray-700">HSEQE safety compliance protocols</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-accent-gold flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-gray-700">Side-Tipper and Flat-Deck links</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-accent-gold flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-gray-700">Client-centered communication</span>
                </li>
              </ul>

              <div className="pt-4">
                <Link href="/about" className="inline-flex items-center space-x-2 text-sm font-bold text-primary-deep hover:text-accent-gold transition-colors">
                  <span>Learn more about our governance & values</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Visual Box */}
            <div className="bg-light-bg border border-gray-100 rounded-2xl p-6 lg:p-8 space-y-6">
              <div className="bg-white rounded-lg p-5 border border-gray-100 flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-accent-gold/10 text-accent-gold flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-primary-deep">Cargo Security Standards</h4>
                  <p className="text-xs text-gray-500 leading-normal">Compliance with SADC road transport regulations and heavy-duty load-lashing constraints.</p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-5 border border-gray-100 flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-primary-deep/10 text-primary-deep flex items-center justify-center flex-shrink-0">
                  <Cpu className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-primary-deep">DFS-OS Integration Foundation</h4>
                  <p className="text-xs text-gray-500 leading-normal">Designed from day one to link directly with fleet telemetry systems and automated customs declarations.</p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-5 border border-gray-100 flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <Leaf className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-primary-deep">Sustainability Commitment</h4>
                  <p className="text-xs text-gray-500 leading-normal">Ongoing evaluations of fuel optimization, low-resistance equipment, and regional carbon-balancing steps.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. REGIONAL NETWORK MAP */}
      <section className="py-20 lg:py-28 bg-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-xs uppercase font-extrabold tracking-widest text-accent-gold">Geographic Reach</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Our Southern African Corridors</h3>
            <p className="text-md text-white/60 leading-relaxed">
              We connect Botswana, South Africa, Zambia, and Zimbabwe, with active support on busy borders to ensure high fleet rotation.
            </p>
          </div>

          <RegionalMap />
          
          <div className="text-center pt-4">
            <Link href="/network" className="inline-flex items-center space-x-2 text-sm font-bold text-accent-gold hover:text-white transition-colors">
              <span>View full office directories and supported routes</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. FLEET PREVIEW */}
      <section className="py-20 lg:py-28 bg-light-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h2 className="text-xs uppercase font-extrabold tracking-widest text-accent-gold">Operational Hardware</h2>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-primary-deep tracking-tight mt-1">High-Capacity Fleet Units</h3>
            </div>
            <Link href="/fleet" className="text-sm font-bold text-primary-deep hover:text-accent-gold transition-colors inline-flex items-center space-x-1.5">
              <span>View Full Fleet Specs</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {fleet.slice(0, 2).map((item) => (
              <div key={item.id} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm space-y-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-bold text-primary-deep">{item.unitName}</h4>
                    <p className="text-sm text-gray-500">{item.trailerType}</p>
                  </div>
                  <span className="bg-primary-deep/5 text-primary-deep border border-primary-deep/10 text-xs px-2.5 py-1 rounded font-bold">
                    Qty: {item.quantity}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg text-sm">
                  <div>
                    <span className="block text-xs text-gray-500 font-medium">CAPACITY</span>
                    <span className="font-semibold text-charcoal">{item.loadingCapacity}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-gray-500 font-medium">SUITABILITY</span>
                    <span className="font-semibold text-charcoal truncate block">{item.suitableCargo[0]}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 leading-normal">{item.operatingConditions}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TECHNOLOGY / DFS-OS FOCUS */}
      <section className="py-20 lg:py-28 bg-primary-deep text-white relative overflow-hidden border-t border-accent-gold/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,161,29,0.05)_0%,transparent_70%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-accent-gold/10 border border-accent-gold/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-accent-gold">
              <Cpu className="h-4 w-4" />
              <span>Digital Transformation: Phase One</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Building a Smarter Logistics Network</h3>
            <p className="text-md text-white/80 leading-relaxed">
              We are developing DFS-OS, a centralized digital system engineered to bridge communications between clients, customs agents, and fleet dispatch teams.
            </p>
            <div className="space-y-3 bg-white/5 border border-white/10 rounded-lg p-5 text-sm">
              <div className="flex items-center space-x-2.5">
                <span className="h-2 w-2 rounded-full bg-accent-gold"></span>
                <span>Milestone updates and central shipment status tracking.</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <span className="h-2 w-2 rounded-full bg-accent-gold"></span>
                <span>Customs documentation digital pre-clearance archives.</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <span className="h-2 w-2 rounded-full bg-accent-gold"></span>
                <span>Secure client-specific shipment timeline portals.</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/technology" className="px-5 py-3 bg-accent-gold text-primary-deep hover:bg-accent-hover rounded-md text-sm font-bold shadow-md transition-all">
                Explore Our Digital Vision
              </Link>
              <Link href="/track" className="px-5 py-3 border border-white/20 hover:border-white hover:bg-white/5 rounded-md text-sm font-semibold transition-all">
                Test Tracking Demo
              </Link>
            </div>
          </div>

          <div className="border border-white/10 bg-charcoal/80 p-6 sm:p-8 rounded-xl shadow-2xl space-y-6">
            <h4 className="text-sm font-bold text-accent-gold uppercase tracking-wider">DFS-OS Portal Previews</h4>
            <p className="text-xs text-white/60 leading-relaxed">
              Get an early look at the planned interfaces designed for both customer cargo management and dispatcher fleet control.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/portal-preview" className="border border-white/5 hover:border-accent-gold/40 bg-white/5 p-4 rounded-lg text-left transition-all space-y-2 block">
                <span className="block font-bold text-sm text-white">Customer Portal</span>
                <span className="block text-[10px] text-white/50 leading-normal">Request quotes, retrieve documents, and follow shipment milestone cards.</span>
              </Link>
              <Link href="/admin-preview" className="border border-white/5 hover:border-accent-gold/40 bg-white/5 p-4 rounded-lg text-left transition-all space-y-2 block">
                <span className="block font-bold text-sm text-white">Admin Dashboard</span>
                <span className="block text-[10px] text-white/50 leading-normal">Monitor border queues, review axle logs, dispatch fleets, and confirm quote approvals.</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. QUOTE CTA BANNER */}
      <section className="py-16 bg-accent-gold text-primary-deep text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h3 className="text-3xl font-extrabold tracking-tight">Tell Us What You Need to Move</h3>
          <p className="text-md font-medium text-primary-deep/80 max-w-2xl mx-auto leading-relaxed">
            Provide cargo details, route coordinates, and customs clearing requirements to receive an optimized cross-border logistics quotation.
          </p>
          <div>
            <Link href="/quote" className="inline-flex items-center space-x-2 px-8 py-4 bg-primary-deep text-white hover:bg-primary-light rounded-md text-base font-bold shadow-lg transition-transform hover:-translate-y-0.5">
              <span>Start Quote Request</span>
              <ArrowRight className="h-5 w-5 text-accent-gold" />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. CONTACT DETAILS PREVIEW */}
      <section className="py-20 lg:py-28 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="space-y-4">
              <h2 className="text-xs uppercase font-extrabold tracking-widest text-accent-gold">Direct Support</h2>
              <h3 className="text-2xl font-bold text-primary-deep tracking-tight">Get in Touch with Our Regional Office</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Connect with our commercial and operations dispatch desk at our Gaborone headquarters.
              </p>
            </div>
            
            <div className="space-y-6 bg-light-bg border border-gray-100 p-6 rounded-xl">
              <h4 className="text-sm font-bold text-primary-deep uppercase tracking-wider">Office Locations</h4>
              <div className="space-y-4 text-sm text-gray-600">
                <div className="flex items-start space-x-2.5">
                  <MapPin className="h-5 w-5 text-accent-gold flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Headquarters:</strong> Plot 3082, Mmamashia, Gaborone, Botswana.
                  </span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <MapPin className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Transit Office Hubs:</strong> Johannesburg (SA), Lusaka (Zambia), Harare (Zimbabwe).
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-6 bg-light-bg border border-gray-100 p-6 rounded-xl">
              <h4 className="text-sm font-bold text-primary-deep uppercase tracking-wider">Phone & Email</h4>
              <div className="space-y-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2.5">
                  <Phone className="h-4 w-4 text-accent-gold flex-shrink-0" />
                  <span>{settings.company.phone1} (Operations)</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Phone className="h-4 w-4 text-accent-gold flex-shrink-0" />
                  <span>{settings.company.phone2} (Direct line)</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Mail className="h-4 w-4 text-accent-gold flex-shrink-0" />
                  <span>{settings.company.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
