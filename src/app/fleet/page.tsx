"use client";

import { useState } from "react";
import Link from "next/link";
import { Truck, Scale, ShieldCheck, Cpu, ArrowRight, RefreshCw, Layers } from "lucide-react";
import fleetData from "@/data/fleet.json";

export default function Fleet() {
  const [cargoFilter, setCargoFilter] = useState<string>("all");
  const [trailerFilter, setTrailerFilter] = useState<string>("all");
  const [capacityFilter, setCapacityFilter] = useState<string>("all");

  const filteredFleet = fleetData.filter((item) => {
    const matchesCargo = cargoFilter === "all" || item.category === cargoFilter;
    
    const matchesTrailer = 
      trailerFilter === "all" || 
      (trailerFilter === "tipper" && item.trailerType.includes("Tipper")) ||
      (trailerFilter === "flat-deck" && item.trailerType.includes("Flat-Deck"));

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

  return (
    <div className="flex flex-col w-full">
      {/* Page Header */}
      <section className="bg-primary-deep text-white py-16 border-b border-accent-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Our Transport Fleet</h1>
          <p className="text-sm text-accent-gold mt-2 font-semibold">Modern, High-Capacity Scania & Volvo Units Engineered for Southern African Routes</p>
        </div>
      </section>

      {/* Fleet Filter Bar */}
      <section className="py-8 bg-light-bg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            {/* Filters grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full lg:w-auto">
              {/* Cargo Category */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-500 uppercase">Cargo Type</label>
                <select
                  value={cargoFilter}
                  onChange={(e) => setCargoFilter(e.target.value)}
                  className="w-full lg:w-48 bg-white border border-gray-200 rounded px-3 py-2 text-sm text-charcoal focus:ring-1 focus:ring-accent-gold focus:outline-none"
                >
                  <option value="all">All Cargo Types</option>
                  <option value="bulk">Bulk Cargo</option>
                  <option value="bagged">Bagged Cargo</option>
                </select>
              </div>

              {/* Trailer configuration */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-500 uppercase">Trailer Config</label>
                <select
                  value={trailerFilter}
                  onChange={(e) => setTrailerFilter(e.target.value)}
                  className="w-full lg:w-48 bg-white border border-gray-200 rounded px-3 py-2 text-sm text-charcoal focus:ring-1 focus:ring-accent-gold focus:outline-none"
                >
                  <option value="all">All Configurations</option>
                  <option value="tipper">Side Tipper</option>
                  <option value="flat-deck">Flat-Deck Link</option>
                </select>
              </div>

              {/* Loading Capacity */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-500 uppercase">Payload Capacity</label>
                <select
                  value={capacityFilter}
                  onChange={(e) => setCapacityFilter(e.target.value)}
                  className="w-full lg:w-48 bg-white border border-gray-200 rounded px-3 py-2 text-sm text-charcoal focus:ring-1 focus:ring-accent-gold focus:outline-none"
                >
                  <option value="all">All Capacities</option>
                  <option value="36">36 Metric Tonnes (MT)</option>
                  <option value="38">38 Metric Tonnes (MT)</option>
                  <option value="39">39 Metric Tonnes (MT)</option>
                </select>
              </div>
            </div>

            {/* Active filters status & reset */}
            <div className="flex items-center space-x-3 w-full lg:w-auto justify-end">
              <span className="text-xs font-bold text-gray-500">
                Showing {filteredFleet.length} of {fleetData.length} categories
              </span>
              <button
                onClick={resetFilters}
                className="flex items-center space-x-1 px-3 py-2 border border-gray-200 bg-white hover:bg-gray-50 rounded text-xs font-semibold text-charcoal transition-colors"
              >
                <RefreshCw className="h-3 w-3" />
                <span>Reset Filters</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFleet.length > 0 ? (
            <div className="space-y-12">
              {filteredFleet.map((item) => (
                <div key={item.id} className="border border-gray-100 shadow-sm rounded-xl p-6 sm:p-8 hover:shadow-md transition-shadow bg-white grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Spec Overview */}
                  <div className="lg:col-span-4 space-y-4">
                    <div className="space-y-1">
                      <span className="bg-primary-deep/5 text-primary-deep text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded border border-primary-deep/10">
                        {item.category === "bulk" ? "Bulk Carrier" : "Bagged Cargo deck"}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-primary-deep">{item.unitName}</h3>
                      <p className="text-sm text-gray-500 font-semibold">{item.trailerType}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-light-bg rounded p-3 border border-gray-50 text-center">
                        <Scale className="h-4.5 w-4.5 text-accent-gold mx-auto mb-1" />
                        <span className="block text-[10px] text-gray-400 font-bold uppercase">Max Capacity</span>
                        <span className="text-sm font-bold text-charcoal">{item.loadingCapacity}</span>
                      </div>
                      <div className="bg-light-bg rounded p-3 border border-gray-50 text-center">
                        <Truck className="h-4.5 w-4.5 text-accent-gold mx-auto mb-1" />
                        <span className="block text-[10px] text-gray-400 font-bold uppercase">Active Units</span>
                        <span className="text-sm font-bold text-charcoal">{item.quantity} units</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Link
                        href={`/quote?fleet=${item.id}`}
                        className="flex items-center justify-center space-x-2 w-full px-4 py-2.5 bg-accent-gold text-primary-deep hover:bg-accent-hover rounded font-bold text-xs shadow-sm transition-colors"
                      >
                        <span>Check Fleet Availability</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Middle Column: Operational & Safety Details */}
                  <div className="lg:col-span-5 space-y-4 border-t lg:border-t-0 lg:border-x border-gray-100 pt-6 lg:pt-0 lg:px-8">
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-primary-deep uppercase tracking-wider">Suitable Cargo</h4>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.suitableCargo.map((cargo, i) => (
                          <span key={i} className="bg-light-bg text-charcoal/80 border border-gray-100 text-[10.5px] px-2 py-0.5 rounded font-medium">
                            {cargo}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1 pt-2">
                      <h4 className="text-xs font-bold text-primary-deep uppercase tracking-wider">Route Operating Conditions</h4>
                      <p className="text-xs text-gray-600 leading-relaxed">{item.operatingConditions}</p>
                    </div>
                  </div>

                  {/* Right Column: Telemetry & Safety Nodes */}
                  <div className="lg:col-span-3 space-y-4 pt-6 lg:pt-0">
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-primary-deep uppercase tracking-wider">Telemetry & Safety Systems</h4>
                      
                      <div className="flex items-start space-x-2 text-xs">
                        <Cpu className="h-4 w-4 text-tech-blue flex-shrink-0 mt-0.5" />
                        <div>
                          <strong>DFS-OS Tracking:</strong>
                          <p className="text-gray-500 mt-0.5 leading-snug">{item.trackingCapability}</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-2 text-xs">
                        <ShieldCheck className="h-4.5 w-4.5 text-accent-gold flex-shrink-0 mt-0.5" />
                        <div>
                          <strong>HSEQE Safeguards:</strong>
                          <ul className="list-disc pl-3 text-gray-500 mt-0.5 space-y-1 leading-snug">
                            {item.safetyFeatures.slice(0, 3).map((sf, idx) => (
                              <li key={idx}>{sf}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-gray-200 rounded-xl p-12 text-center space-y-4 max-w-md mx-auto">
              <Layers className="h-8 w-8 text-gray-300 mx-auto" />
              <div className="space-y-1.5">
                <h4 className="text-md font-bold text-primary-deep">No matching fleet units</h4>
                <p className="text-xs text-gray-500">Try adjusting your filters (e.g. Select 'All Cargo Types' or different payload filters).</p>
              </div>
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-primary-deep text-white hover:bg-primary-light rounded text-xs font-semibold"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Corporate Compliance Note */}
      <section className="bg-light-bg py-10 border-t border-gray-100 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-gray-500 leading-normal space-y-2">
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
