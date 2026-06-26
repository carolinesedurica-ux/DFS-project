import Link from "next/link";
import { MapPin, Phone, Mail, Globe, ArrowRight, HelpCircle } from "lucide-react";
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
      <section className="bg-primary-deep text-white py-16 border-b border-accent-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Our Regional Network</h1>
          <p className="text-sm text-accent-gold mt-2 font-semibold">Serving Southern Africa's Key Industrial and Mining Transit Corridors</p>
        </div>
      </section>

      {/* Map Segment */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-deep">Interactive Shipping Corridors</h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              DFS Group links SADC trade lanes by coordinating regional cargo trucks and border-clearing procedures. Explore our operating hubs and planned coastal port connectors on the map below.
            </p>
          </div>
          
          <RegionalMap />
        </div>
      </section>

      {/* Office Hub Directories */}
      <section className="py-16 sm:py-20 bg-light-bg border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-deep">Active Logistics Hubs</h2>
            <p className="text-xs sm:text-sm text-gray-500">Contact points and services handled at our primary operations centers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {offices.map((office) => (
              <div key={office.id} className="bg-white rounded-xl border border-gray-100 p-6 sm:p-8 hover:shadow-md transition-shadow space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-primary-deep">{office.city} Office</h3>
                      <p className="text-xs text-accent-gold font-bold uppercase tracking-wider">{office.country}</p>
                    </div>
                    <span className="bg-primary-deep/5 text-primary-deep border border-primary-deep/10 text-xs px-2.5 py-1 rounded font-bold">
                      {office.role}
                    </span>
                  </div>

                  <ul className="space-y-2.5 text-xs text-gray-600">
                    <li className="flex items-start space-x-2">
                      <MapPin className="h-4.5 w-4.5 text-accent-gold flex-shrink-0 mt-0.5" />
                      <span>{office.address}</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-accent-gold flex-shrink-0" />
                      <span>{office.phone}</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-accent-gold flex-shrink-0" />
                      <span>{office.email}</span>
                    </li>
                  </ul>

                  <div className="space-y-1.5 pt-2">
                    <span className="block text-xs font-bold text-primary-deep uppercase">Services Coordinated:</span>
                    <div className="flex flex-wrap gap-1">
                      {office.services.map((srv) => (
                        <span key={srv} className="bg-light-bg text-charcoal/80 border border-gray-50 text-[10px] px-2 py-0.5 rounded font-medium">
                          {srv}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-50">
                  <Link
                    href={`/contact?hub=${office.id}`}
                    className="inline-flex items-center space-x-1 text-xs font-bold text-primary-deep hover:text-accent-gold transition-colors"
                  >
                    <span>Submit Hub Enquiry</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Expansion Targets */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-deep">Strategic Expansion Vision</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              To support the growth of Southern African trade, DFS Group is evaluating corridor links connecting our landlocked networks to regional marine ports. This expansion plan is focused on optimizing transit times and offering unified custom logistics solutions along new routes.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {expansion.map((item) => (
                <div key={item.city} className="border border-gray-100 rounded-lg p-4 bg-light-bg">
                  <h4 className="text-sm font-bold text-primary-deep">{item.city}</h4>
                  <span className="text-[10px] text-tech-blue font-bold uppercase tracking-wider">{item.country}</span>
                  <p className="text-[10px] text-gray-400 mt-1">{item.status}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5 bg-charcoal text-white rounded-xl p-6 sm:p-8 space-y-4 border border-white/5">
            <div className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center text-accent-gold">
              <HelpCircle className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Planned Expansion Notice</h3>
            <p className="text-xs text-white/70 leading-relaxed">
              Planned target markets (Walvis Bay, Beira, Dar es Salaam, Durban) represent the future path in our logistics expansion studies. 
            </p>
            <div className="bg-white/5 border border-white/10 rounded p-4 text-[11px] text-white/50 leading-relaxed italic">
              "Planned locations, port connections, and future offices are subject to commercial viability trials, regulatory corridor filings, and final operational clearances by DFS Management."
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
