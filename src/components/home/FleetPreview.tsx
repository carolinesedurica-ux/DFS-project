"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Truck, ArrowRight, Filter, ShieldCheck } from "lucide-react";
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

export default function FleetPreview() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = [
    { label: "All Fleet", value: "All" },
    { label: "Side Tippers", value: "Side Tippers" },
    { label: "Flat Decks", value: "Flat Decks" },
    { label: "Bulk Cargo Units", value: "Bulk Cargo" },
    { label: "Bagged Cargo Units", value: "Bagged Cargo" },
  ];

  const getFilteredFleet = () => {
    switch (activeFilter) {
      case "Side Tippers":
        return fleetData.filter((item) => item.trailerType.toLowerCase().includes("tipper"));
      case "Flat Decks":
        return fleetData.filter((item) => item.trailerType.toLowerCase().includes("flat-deck"));
      case "Bulk Cargo":
        return fleetData.filter((item) => item.category === "bulk");
      case "Bagged Cargo":
        return fleetData.filter((item) => item.category === "bagged");
      default:
        return fleetData;
    }
  };

  const getVehicleImage = (trailerType: string) => {
    if (trailerType.toLowerCase().includes("tipper")) {
      return "/images/dfs-bulk-cargo-side-tipper.png";
    }
    return "/images/dfs-bagged-cargo-flatdeck.png";
  };

  const filteredFleet = getFilteredFleet();

  return (
    <section className="py-20 lg:py-28 bg-light-grey">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs uppercase font-extrabold tracking-widest text-accent-gold block">
              Fleet Capacity
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-deep tracking-tight font-display">
              Built to Carry More
            </h2>
            <p className="text-sm sm:text-base text-slate max-w-2xl">
              DFS Group operates a highly maintained, modern logistics fleet configured for high-capacity regional transport. We connect local suppliers with key SADC corridors.
            </p>
          </div>
          
          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <Link
              href="/fleet"
              className="inline-flex items-center space-x-2 text-sm font-bold text-primary-royal hover:text-accent-gold transition-colors group"
            >
              <span>View Full Fleet Specs</span>
              <ArrowRight className="h-4.5 w-4.5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Filters Panel */}
        <div className="flex flex-wrap items-center gap-2 mb-8 bg-white/60 p-2 rounded-2xl border border-border-dfs">
          <span className="text-xs font-bold text-grey px-3 flex items-center space-x-1">
            <Filter className="h-3.5 w-3.5" />
            <span>Filter:</span>
          </span>
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeFilter === filter.value
                  ? "bg-primary-royal text-white shadow-sm"
                  : "text-slate hover:bg-white hover:text-primary-royal"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Mobile Horizontal Scroll / Desktop Grid Wrapper */}
        <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-grey/20 lg:overflow-visible">
          <div className="flex space-x-6 min-w-[300px] md:min-w-0 lg:grid lg:grid-cols-3 lg:space-x-0 lg:gap-8">
            {filteredFleet.map((item: FleetItem) => (
              <div
                key={item.id}
                className="w-[290px] sm:w-[340px] lg:w-auto flex-shrink-0 bg-white border border-border-dfs rounded-2xl p-5 flex flex-col justify-between hover:shadow-lg transition-shadow bg-white flex-shrink-0"
              >
                <div className="space-y-4">
                  {/* Vehicle Image */}
                  <div className="relative h-40 rounded-xl overflow-hidden bg-primary-light">
                    <Image
                      src={getVehicleImage(item.trailerType)}
                      alt={`${item.unitName} - ${item.trailerType}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-primary-deep/90 border border-accent-gold/40 text-accent-gold text-[10px] px-2.5 py-1 rounded-lg font-bold font-mono">
                      Qty: {item.quantity} Units
                    </div>
                  </div>

                  {/* Vehicle Details */}
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-grey block">
                      {item.trailerType}
                    </span>
                    <h4 className="text-lg font-extrabold text-primary-deep tracking-tight">
                      {item.unitName}
                    </h4>
                  </div>

                  {/* Gold Divider */}
                  <div className="h-0.5 w-12 bg-accent-gold"></div>

                  {/* Core specifications */}
                  <div className="grid grid-cols-2 gap-4 bg-light-grey p-3.5 rounded-xl text-xs">
                    <div>
                      <span className="block text-[10px] font-bold text-grey uppercase">Payload</span>
                      <span className="font-extrabold text-primary-deep">{item.loadingCapacity}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-grey uppercase">Cargo Target</span>
                      <span className="font-extrabold text-primary-deep truncate block" title={item.suitableCargo.join(", ")}>
                        {item.suitableCargo[0]}
                      </span>
                    </div>
                  </div>

                  {/* operatingConditions */}
                  <p className="text-xs text-grey leading-relaxed">
                    {item.operatingConditions}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-border-dfs flex items-center justify-between">
                  <Link
                    href={`/fleet#${item.id}`}
                    className="text-xs font-bold text-primary-royal hover:text-accent-gold transition-colors flex items-center space-x-1"
                  >
                    <span>View Specs</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>

                  <Link
                    href={`/quote?fleet=${item.id}`}
                    className="text-xs font-bold text-accent-deep hover:text-accent-gold transition-colors"
                  >
                    Request Availability
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Fleet Banner Graphic */}
        <div className="mt-12 relative rounded-2xl overflow-hidden h-64 sm:h-80 lg:h-96 shadow-xl group border border-border-dfs">
          <Image
            src="/images/dfs-fleet-lineup.png"
            alt="DFS Group Volvo and Scania regional logistics fleet parked in Gaborone."
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/90 via-primary-deep/40 to-transparent z-10"></div>
          
          <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 z-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 bg-accent-gold text-primary-deep px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Depot Capacity</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Operating a Fleet of Modern High-Capacity Rigs
              </h3>
              <p className="text-xs sm:text-sm text-white/80 max-w-xl">
                DFS Group units undergo weekly mechanical safety audits at our Gaborone hub to maintain a near-zero breakdown record on regional corridors.
              </p>
            </div>
            <Link
              href="/fleet"
              className="px-5 py-3 bg-white text-primary-deep hover:bg-accent-gold hover:text-primary-deep transition-all rounded-xl text-xs font-extrabold shadow-md flex-shrink-0"
            >
              Explore Full Specs
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
