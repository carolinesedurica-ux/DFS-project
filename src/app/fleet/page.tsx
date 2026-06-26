"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Truck, Scale, ShieldCheck, Cpu, ArrowRight, RefreshCw, Layers } from "lucide-react";
import fleetData from "@/data/fleet.json";

interface FleetItem {
  id: string;
  unitName: string;
  trailerType: string;
  quantity: number;
  loadingCapacity: string;
  suitableCargo: string[];
  operatingConditions: string;
  safetyFeatures: string[];
  trackingCapability: string;
  requiresClientConfirmation: boolean;
  confirmationNotes?: string;
  category: string;
}

export default function Fleet() {
  const [cargoFilter, setCargoFilter] = useState<string>("all");
  const [trailerFilter, setTrailerFilter] = useState<string>("all");
  const [capacityFilter, setCapacityFilter] = useState<string>("all");

  const filteredFleet = fleetData.filter((item) => {
    const matchesCargo = cargoFilter === "all" || item.category === cargoFilter;
    
    const matchesTrailer = 
      trailerFilter === "all" || 
      (trailerFilter === "tipper" && item.trailerType.toLowerCase().includes("tipper")) ||
      (trailerFilter === "flat-deck" && item.trailerType.toLowerCase().includes("flat-deck"));

    const matchesCapacity =
      capacityFilter === "all" ||
      (capacityFilter === "36" && item.loadingCapacity.includes("36")) ||
      (capacityFilter === "38" && item.loadingCapacity.includes("38")) ||
      (capacityFilter === "39" && item.loadingCapacity.includes("39"));

    return matchesCargo && matchesTrailer && matchesCapacity;
  });

  const resetFilters = () => {
    setCargoFilter("all");
    setTrailerFilter("all");
    setCapacityFilter("all");
  };

  const getVehicleImage = (trailerType: string) => {
    if (trailerType.toLowerCase().includes("tipper")) {
      return "/images/dfs-bulk-cargo-side-tipper.png";
    }
    return "/images/dfs-bagged-cargo-flatdeck.png";
  };

  return (
    <div className="flex flex-col w-full">
      {/* Page Header */}
      <section className="bg-primary-deep text-white py-20 border-b border-accent-gold/20 relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="text-xs uppercase font-extrabold tracking-widest text-accent-gold block font-heading">
            Operational Hardware
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display">
            Our Transport Fleet
          </h1>
          <p className="text-base sm:text-lg text-white/80 max-w-3xl leading-relaxed">
            Modern, high-capacity Scania & Volvo units engineered for reliable SADC cross-border cargo transit.
          </p>
        </div>
      </section>

      {/* Fleet Filter Bar */}
      <section className="py-8 bg-white border-b border-border-dfs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            
            {/* Filters grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full lg:w-auto">
              {/* Cargo Category */}
              <div className="space-y-2">
                <label className="block text-[10px] font-extrabold text-grey uppercase tracking-wider">Cargo Type</label>
                <select
                  value={cargoFilter}
                  onChange={(e) => setCargoFilter(e.target.value)}
                  className="w-full lg:w-48 bg-light-grey border border-border-dfs rounded-xl px-3.5 py-2.5 text-sm text-charcoal font-semibold focus:ring-2 focus:ring-accent-gold focus:outline-none transition-all"
                >
                  <option value="all">All Cargo Types</option>
                  <option value="bulk">Bulk Cargo</option>
                  <option value="bagged">Bagged Cargo</option>
                </select>
              </div>

              {/* Trailer configuration */}
              <div className="space-y-2">
                <label className="block text-[10px] font-extrabold text-grey uppercase tracking-wider">Trailer Config</label>
                <select
                  value={trailerFilter}
                  onChange={(e) => setTrailerFilter(e.target.value)}
                  className="w-full lg:w-48 bg-light-grey border border-border-dfs rounded-xl px-3.5 py-2.5 text-sm text-charcoal font-semibold focus:ring-2 focus:ring-accent-gold focus:outline-none transition-all"
                >
                  <option value="all">All Configurations</option>
                  <option value="tipper">Side Tipper</option>
                  <option value="flat-deck">Flat-Deck Link</option>
                </select>
              </div>

              {/* Loading Capacity */}
              <div className="space-y-2">
                <label className="block text-[10px] font-extrabold text-grey uppercase tracking-wider">Payload Capacity</label>
                <select
                  value={capacityFilter}
                  onChange={(e) => setCapacityFilter(e.target.value)}
                  className="w-full lg:w-48 bg-light-grey border border-border-dfs rounded-xl px-3.5 py-2.5 text-sm text-charcoal font-semibold focus:ring-2 focus:ring-accent-gold focus:outline-none transition-all"
                >
                  <option value="all">All Capacities</option>
                  <option value="36">36 Metric Tonnes (MT)</option>
                  <option value="38">38 Metric Tonnes (MT)</option>
                  <option value="39">39 Metric Tonnes (MT)</option>
                </select>
              </div>
            </div>

            {/* Active filters status & reset */}
            <div className="flex items-center justify-between sm:justify-end gap-4 w-full lg:w-auto pt-2 lg:pt-0">
              <span className="text-xs font-bold text-slate">
                Showing {filteredFleet.length} of {fleetData.length} specifications
              </span>
              <button
                onClick={resetFilters}
                className="flex items-center space-x-1.5 px-4.5 py-2.5 border border-primary-royal/20 bg-white hover:bg-primary-light rounded-xl text-xs font-bold text-primary-royal transition-all"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Reset Filters</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Grid */}
      <section className="py-16 bg-light-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFleet.length > 0 ? (
            <div className="space-y-8">
              {filteredFleet.map((item: FleetItem) => (
                <div
                  key={item.id}
                  id={item.id}
                  className="border border-border-dfs rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-shadow bg-white grid grid-cols-1 lg:grid-cols-12 gap-8 items-center scroll-mt-24"
                >
                  {/* Left Column: Spec Overview with Image */}
                  <div className="lg:col-span-5 space-y-4">
                    {/* Vehicle Card Image */}
                    <div className="relative h-48 sm:h-56 rounded-xl overflow-hidden bg-primary-light shadow-sm">
                      <Image
                        src={getVehicleImage(item.trailerType)}
                        alt={`${item.unitName} specifications`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-primary-deep/90 border border-accent-gold/40 text-accent-gold text-[10px] px-2.5 py-1 rounded-lg font-bold font-mono">
                        Active Units: {item.quantity}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-accent-gold block">
                        {item.category === "bulk" ? "Bulk Commodity Carrier" : "Bagged Logistics Deck"}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-primary-deep tracking-tight">
                        {item.unitName}
                      </h3>
                      <p className="text-xs sm:text-sm text-grey font-semibold">
                        {item.trailerType}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="bg-light-grey rounded-xl p-3 text-center border border-border-dfs">
                        <Scale className="h-4.5 w-4.5 text-primary-royal mx-auto mb-1" />
                        <span className="block text-[9px] text-grey font-bold uppercase">Max Capacity</span>
                        <span className="text-sm font-extrabold text-primary-deep">{item.loadingCapacity}</span>
                      </div>
                      <div className="bg-light-grey rounded-xl p-3 text-center border border-border-dfs">
                        <Truck className="h-4.5 w-4.5 text-primary-royal mx-auto mb-1" />
                        <span className="block text-[9px] text-grey font-bold uppercase">Category</span>
                        <span className="text-sm font-extrabold text-primary-deep capitalize">{item.category}</span>
                      </div>
                    </div>
                  </div>

                  {/* Middle Column: Operational & Cargo suitability */}
                  <div className="lg:col-span-4 space-y-5 lg:border-l border-border-dfs lg:pl-8 pt-6 lg:pt-0 self-stretch flex flex-col justify-center">
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-primary-deep uppercase tracking-wider">Suitable Cargo</h4>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.suitableCargo.map((cargo, i) => (
                          <span key={i} className="bg-light-grey text-slate border border-border-dfs text-[10.5px] px-2.5 py-1 rounded-lg font-semibold">
                            {cargo}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-primary-deep uppercase tracking-wider">Route Operating Conditions</h4>
                      <p className="text-xs sm:text-sm text-slate leading-relaxed">{item.operatingConditions}</p>
                    </div>

                    {item.requiresClientConfirmation && item.confirmationNotes && (
                      <div className="bg-amber-50 border-l-4 border-accent-gold p-3 rounded-lg text-xs text-charcoal/90">
                        <strong className="block mb-0.5 text-accent-deep font-bold">Operational Note:</strong>
                        {item.confirmationNotes}
                      </div>
                    )}
                  </div>

                  {/* Right Column: Telemetry & HSEQE Systems */}
                  <div className="lg:col-span-3 space-y-5 lg:border-l border-border-dfs lg:pl-8 pt-6 lg:pt-0 self-stretch flex flex-col justify-between">
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold text-primary-deep uppercase tracking-wider">Telemetry & Safety Systems</h4>
                      
                      <div className="flex items-start space-x-2.5 text-xs sm:text-sm">
                        <Cpu className="h-4.5 w-4.5 text-primary-royal flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-primary-deep text-xs font-bold block">DFS-OS Telematics:</strong>
                          <p className="text-slate text-xs mt-0.5 leading-relaxed">{item.trackingCapability}</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-2.5 text-xs sm:text-sm">
                        <ShieldCheck className="h-5 w-5 text-accent-gold flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-primary-deep text-xs font-bold block">HSEQE Features:</strong>
                          <ul className="list-disc pl-3 text-slate text-xs mt-0.5 space-y-1 leading-relaxed">
                            {item.safetyFeatures.map((sf, idx) => (
                              <li key={idx}>{sf}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border-dfs">
                      <Link
                        href={`/quote?fleet=${item.id}`}
                        className="flex items-center justify-center space-x-2 w-full py-3 gold-gradient text-primary-deep rounded-xl font-extrabold text-xs shadow-md transition-all transform hover:-translate-y-0.5"
                      >
                        <span>Check Availability</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border-2 border-dashed border-border-dfs rounded-2xl p-16 text-center space-y-5 max-w-md mx-auto bg-white">
              <Layers className="h-10 w-10 text-grey/40 mx-auto" />
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-primary-deep">No matching fleet units</h4>
                <p className="text-xs text-grey">Try adjusting your filters (e.g. Select 'All Cargo Types' or reset the active payload filters).</p>
              </div>
              <button
                onClick={resetFilters}
                className="px-5 py-3 bg-primary-royal hover:bg-primary-deep text-white rounded-xl text-xs font-bold transition-all shadow-sm"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Corporate Compliance Note */}
      <section className="bg-white py-12 border-t border-border-dfs text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-grey leading-relaxed space-y-2">
          <p>
            Note: Commercially sensitive coordinates, exact fuel tracking telemetry graphs, and specific license registration numbers are restricted to authorized client log-ins on our secure customer portal.
          </p>
          <p>
            All DFS Group vehicles operate under valid cross-border permits and are insured under comprehensive carrier liability coverage.
          </p>
        </div>
      </section>
    </div>
  );
}
