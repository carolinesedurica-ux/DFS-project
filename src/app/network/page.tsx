import Link from "next/link";
import { MapPin, Phone, Mail, ArrowRight, HelpCircle } from "lucide-react";
import settings from "@/data/settings.json";
import RegionalMap from "@/components/RegionalMap";

export const metadata = {
  title: "Regional Network & Transit Corridors | DFS Group",
  description: "View our Southern African logistics network, active hubs in Botswana, South Africa, Zambia, and Zimbabwe, and our strategic expansion vision."
};

export default function RegionalNetwork() {
  const offices = settings.offices;
  const expansion = settings.expansion;

  return (
    <div className="flex flex-col w-full">
      {/* Page Header */}
      <section className="bg-primary-deep text-white py-20 border-b border-accent-gold/20 relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="text-xs uppercase font-extrabold tracking-widest text-accent-gold block font-heading">
            SADC Footprint
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display">
            Our Regional Network
          </h1>
          <p className="text-base sm:text-lg text-white/80 max-w-3xl leading-relaxed">
            Serving Southern Africa's key industrial, mining, and transport transit corridors.
          </p>
        </div>
      </section>

      {/* Map Segment */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase font-extrabold tracking-widest text-accent-gold block font-heading">
              Trade Route Geography
            </span>
            <h2 className="text-3xl font-extrabold text-primary-deep tracking-tight font-display">
              Interactive Shipping Corridors
            </h2>
            <p className="text-sm sm:text-base text-grey leading-relaxed">
              DFS Group links SADC trade lanes by coordinating regional cargo trucks and border-clearing procedures. Explore our operating hubs and planned coastal port connectors on the map below.
            </p>
          </div>
          
          <div className="bg-primary-black border border-accent-gold/15 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
            <RegionalMap />
          </div>
        </div>
      </section>

      {/* Office Hub Directories */}
      <section className="py-20 bg-light-grey border-y border-border-dfs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs uppercase font-extrabold tracking-widest text-accent-gold block font-heading">
              Office Locations
            </span>
            <h2 className="text-3xl font-extrabold text-primary-deep tracking-tight font-display">
              Active Logistics Hubs
            </h2>
            <p className="text-sm text-grey">Contact points and services handled at our primary operations centers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {offices.map((office) => (
              <div
                key={office.id}
                className="bg-white rounded-2xl border border-border-dfs p-6 sm:p-8 hover:shadow-lg transition-shadow space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-extrabold text-primary-deep tracking-tight">{office.city} Office</h3>
                      <p className="text-xs text-accent-deep font-bold uppercase tracking-wider">{office.country}</p>
                    </div>
                    <span className="bg-primary-light text-primary-royal border border-primary-royal/10 text-xs px-3 py-1 rounded-xl font-bold font-mono">
                      {office.role}
                    </span>
                  </div>

                  <ul className="space-y-3 text-xs sm:text-sm text-slate">
                    <li className="flex items-start space-x-2.5">
                      <MapPin className="h-4.5 w-4.5 text-accent-gold flex-shrink-0 mt-0.5" />
                      <span>{office.address}</span>
                    </li>
                    <li className="flex items-center space-x-2.5">
                      <Phone className="h-4.5 w-4.5 text-accent-gold flex-shrink-0" />
                      <span>{office.phone}</span>
                    </li>
                    <li className="flex items-center space-x-2.5">
                      <Mail className="h-4.5 w-4.5 text-accent-gold flex-shrink-0" />
                      <span>{office.email}</span>
                    </li>
                  </ul>

                  <div className="space-y-2 pt-2">
                    <span className="block text-xs font-bold text-primary-deep uppercase tracking-wider">
                      Services Coordinated:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {office.services.map((srv) => (
                        <span key={srv} className="bg-light-grey text-slate border border-border-dfs text-[10px] sm:text-xs px-2.5 py-0.5 rounded-lg font-semibold">
                          {srv}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border-dfs">
                  <Link
                    href={`/contact?hub=${office.id}`}
                    className="inline-flex items-center space-x-1 text-xs font-bold text-primary-royal hover:text-accent-gold transition-colors"
                  >
                    <span>Submit Hub Enquiry</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Expansion Targets */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase font-extrabold tracking-widest text-accent-gold block font-heading">
              Regional Expansion
            </span>
            <h2 className="text-3xl font-extrabold text-primary-deep tracking-tight font-display">
              Strategic Expansion Vision
            </h2>
            <p className="text-sm sm:text-base text-grey leading-relaxed">
              To support the growth of Southern African trade, DFS Group is evaluating corridor links connecting our landlocked networks to regional marine ports. This expansion plan is focused on optimizing transit times and offering unified custom logistics solutions along new routes.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {expansion.map((item) => (
                <div key={item.city} className="border border-border-dfs rounded-2xl p-4 bg-light-grey">
                  <h4 className="text-base font-bold text-primary-deep">{item.city}</h4>
                  <span className="text-[10px] text-primary-royal font-bold uppercase tracking-wider">{item.country}</span>
                  <p className="text-xs text-grey mt-1">{item.status}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-primary-deep text-white rounded-3xl p-6 sm:p-8 space-y-4 border border-white/10 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,161,29,0.05)_0%,transparent_50%)] pointer-events-none"></div>
            
            <div className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center text-accent-gold border border-white/10">
              <HelpCircle className="h-6 w-6" />
            </div>
            
            <h3 className="text-lg font-extrabold text-white tracking-tight">
              Planned Expansion Notice
            </h3>
            
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Planned target markets (Walvis Bay, Beira, Dar es Salaam, Durban) represent the future path in our logistics expansion studies. 
            </p>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-[11px] text-white/50 leading-relaxed italic">
              "Planned locations, port connections, and future offices are subject to commercial viability trials, regulatory corridor filings, and final operational clearances by DFS Management."
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
