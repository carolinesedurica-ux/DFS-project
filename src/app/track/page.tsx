"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, MapPin, Calendar, Truck, FileCheck, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";

export default function Track() {
  const [trackingId, setTrackingId] = useState("");
  const [searched, setSearched] = useState(false);
  const [shipment, setShipment] = useState<any | null>(null);

  // Pre-configured Mock Shipments
  const sampleShipments: Record<string, any> = {
    "DFS-102-BOT": {
      id: "DFS-102-BOT",
      cargo: "Dry Minerals (Copper Concentrates)",
      weight: "38 MT",
      vehicle: "Volvo FH 440 (Reg: B 345 ACD)",
      origin: "Johannesburg Depot, South Africa",
      destination: "Gaborone Mmamashia Depot, Botswana",
      eta: "2026-06-28",
      status: "border", // booking -> assigned -> collected -> transit -> border -> cleared -> delivery -> delivered
      statusLabel: "Border Processing",
      timeline: [
        { label: "Booking Confirmed", date: "2026-06-25 09:00", done: true },
        { label: "Vehicle Assigned", date: "2026-06-25 14:00", done: true },
        { label: "Cargo Collected & Loaded", date: "2026-06-26 08:30", done: true },
        { label: "In Transit (N1 North lane)", date: "2026-06-26 12:00", done: true },
        { label: "Border Gate Entry (Martins Drift)", date: "2026-06-26 16:00", done: true, active: true },
        { label: "Customs Clearing & Inspection", date: "Pending", done: false },
        { label: "Out for Delivery Hub", date: "Pending", done: false },
        { label: "Delivered & Unloaded", date: "Pending", done: false }
      ]
    },
    "DFS-789-ZIM": {
      id: "DFS-789-ZIM",
      cargo: "Bagged Cement Link",
      weight: "36 MT",
      vehicle: "Scania G460 Flat-Deck Link (Reg: B 902 ABF)",
      origin: "Gaborone Depot, Botswana",
      destination: "Harare Transit Hub, Zimbabwe",
      eta: "2026-06-27",
      status: "cleared",
      statusLabel: "Customs Cleared",
      timeline: [
        { label: "Booking Confirmed", date: "2026-06-24 10:00", done: true },
        { label: "Vehicle Assigned", date: "2026-06-24 11:30", done: true },
        { label: "Cargo Collected & Loaded", date: "2026-06-24 16:00", done: true },
        { label: "In Transit (A1 Highway north)", date: "2026-06-25 07:00", done: true },
        { label: "Border Gate Entry (Ramokgwebana)", date: "2026-06-25 14:30", done: true },
        { label: "Customs Cleared & Released", date: "2026-06-26 11:00", done: true, active: true },
        { label: "Out for Delivery Hub", date: "Pending", done: false },
        { label: "Delivered & Unloaded", date: "Pending", done: false }
      ]
    },
    "DFS-304-ZAM": {
      id: "DFS-304-ZAM",
      cargo: "Agricultural Fertilizer Link",
      weight: "36 MT",
      vehicle: "Scania G460 Flat-Deck (Reg: B 118 AGH)",
      origin: "Johannesburg Depot, South Africa",
      destination: "Lusaka Industrial Depot, Zambia",
      eta: "2026-06-30",
      status: "transit",
      statusLabel: "In Transit",
      timeline: [
        { label: "Booking Confirmed", date: "2026-06-25 08:00", done: true },
        { label: "Vehicle Assigned", date: "2026-06-25 10:00", done: true },
        { label: "Cargo Collected & Loaded", date: "2026-06-26 09:00", done: true, active: true },
        { label: "In Transit (Beitbridge route)", date: "Pending", done: false },
        { label: "Border Gate Entry (Kazungula)", date: "Pending", done: false },
        { label: "Customs Clearing Support", date: "Pending", done: false },
        { label: "Out for Delivery Hub", date: "Pending", done: false },
        { label: "Delivered & Unloaded", date: "Pending", done: false }
      ]
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const queryId = trackingId.trim().toUpperCase();
    setSearched(true);

    if (sampleShipments[queryId]) {
      setShipment(sampleShipments[queryId]);
      return;
    }

    // Fallback: Check if it matches a localStorage RFQ reference (for dynamic sandbox simulation)
    const localRfqs = JSON.parse(localStorage.getItem("dfs_rfqs") || "[]");
    const foundRfq = localRfqs.find((r: any) => r.reference.toUpperCase() === queryId);

    if (foundRfq) {
      // Build a dynamic simulation for the RFQ cargo
      setShipment({
        id: foundRfq.reference,
        cargo: foundRfq.shipment.cargoType,
        weight: foundRfq.shipment.estimatedWeight,
        vehicle: "DFS Fleet Unit Assigned (Pre-transit)",
        origin: foundRfq.shipment.origin,
        destination: foundRfq.shipment.destination,
        eta: "TBD (Pending dispatch approval)",
        status: "booking",
        statusLabel: "Booking Confirmed",
        timeline: [
          { label: "Booking Confirmed (RFQ Submitted)", date: foundRfq.timestamp.slice(0, 16).replace("T", " "), done: true, active: true },
          { label: "Vehicle Assigned", date: "Pending approval", done: false },
          { label: "Cargo Collected & Loaded", date: "Pending", done: false },
          { label: "In Transit", date: "Pending", done: false },
          { label: "Border Processing", date: "Pending", done: false },
          { label: "Customs Clearing Support", date: "Pending", done: false },
          { label: "Out for Delivery Hub", date: "Pending", done: false },
          { label: "Delivered & Unloaded", date: "Pending", done: false }
        ]
      });
    } else {
      setShipment(null);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Page Header */}
      <section className="bg-primary-deep text-white py-16 border-b border-accent-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Shipment Tracking Demonstration</h1>
          <p className="text-sm text-accent-gold mt-2 font-semibold">Simulated SADC corridor cargo monitoring</p>
        </div>
      </section>

      {/* Main interactive area */}
      <section className="py-16 sm:py-20 bg-light-bg flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Permanent Disclaimer Notice */}
          <div className="bg-amber-50 border-l-4 border-accent-gold p-4 rounded-md flex items-start space-x-3 shadow-sm">
            <AlertCircle className="h-5 w-5 text-accent-gold flex-shrink-0 mt-0.5" />
            <div className="text-xs text-charcoal/80 space-y-1">
              <span className="font-bold text-primary-deep uppercase block">Demonstration Environment Notice</span>
              <p>
                This tracking interface is a front-end simulation showing the future design of the DFS-OS dispatch timeline. Live transponder coordinates and real SADC customs API integrations will go live in Phase Two.
              </p>
            </div>
          </div>

          {/* Search Box */}
          <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-6 sm:p-8 space-y-6">
            <form onSubmit={handleSearch} className="space-y-4">
              <h3 className="text-lg font-bold text-primary-deep">Enter Shipment / RFQ Code</h3>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-grow">
                  <Search className="absolute left-3.5 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    placeholder="e.g. DFS-102-BOT or your RFQ reference"
                    className="w-full bg-light-bg border border-gray-200 rounded px-10 py-2.5 text-sm text-charcoal focus:ring-1 focus:ring-accent-gold focus:outline-none uppercase font-mono font-semibold"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-primary-deep hover:bg-primary-light text-white text-sm font-bold rounded shadow-sm transition-colors"
                >
                  Track Cargo
                </button>
              </div>

              <div className="text-xs text-gray-500 flex flex-wrap gap-2 items-center">
                <span>Try sample tracking codes:</span>
                <button type="button" onClick={() => setTrackingId("DFS-102-BOT")} className="underline font-mono text-primary-deep hover:text-accent-gold font-bold">DFS-102-BOT</button>
                <span>|</span>
                <button type="button" onClick={() => setTrackingId("DFS-789-ZIM")} className="underline font-mono text-primary-deep hover:text-accent-gold font-bold">DFS-789-ZIM</button>
                <span>|</span>
                <button type="button" onClick={() => setTrackingId("DFS-304-ZAM")} className="underline font-mono text-primary-deep hover:text-accent-gold font-bold">DFS-304-ZAM</button>
              </div>
            </form>
          </div>

          {/* Results display */}
          {searched && (
            <div className="animate-fade-in-up duration-300">
              {shipment ? (
                <div className="bg-white border border-gray-100 shadow-sm rounded-xl overflow-hidden">
                  
                  {/* Top Bar */}
                  <div className="bg-primary-deep text-white p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-accent-gold/20">
                    <div>
                      <span className="text-[10px] text-accent-gold font-extrabold uppercase tracking-wider block">Shipment Reference</span>
                      <span className="text-xl font-mono font-bold">{shipment.id}</span>
                    </div>
                    <span className="bg-accent-gold text-primary-deep px-3 py-1 rounded text-xs font-extrabold uppercase tracking-wide">
                      Status: {shipment.statusLabel}
                    </span>
                  </div>

                  {/* Shipment Info details */}
                  <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 border-b border-gray-100 bg-light-bg/30">
                    <div>
                      <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">Cargo & Payload</span>
                      <span className="text-sm font-semibold text-charcoal">{shipment.cargo}</span>
                      <span className="block text-xs text-gray-500">{shipment.weight}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">Assigned Vehicle</span>
                      <span className="text-sm font-semibold text-charcoal flex items-center space-x-1.5 mt-0.5">
                        <Truck className="h-4 w-4 text-accent-gold" />
                        <span>{shipment.vehicle}</span>
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">Route Coordinates</span>
                      <span className="text-xs font-semibold text-charcoal block mt-0.5">From: {shipment.origin}</span>
                      <span className="text-xs font-semibold text-charcoal block">To: {shipment.destination}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">Estimated Delivery</span>
                      <span className="text-sm font-semibold text-charcoal flex items-center space-x-1.5 mt-0.5">
                        <Calendar className="h-4.5 w-4.5 text-accent-gold" />
                        <span>{shipment.eta}</span>
                      </span>
                    </div>
                  </div>

                  {/* Timeline Tracker */}
                  <div className="p-6 sm:p-8 space-y-6">
                    <h4 className="text-sm font-bold text-primary-deep uppercase tracking-wider">SADC Corridor Progress Timeline</h4>
                    
                    <div className="relative border-l-2 border-gray-200 pl-6 ml-3 space-y-6">
                      {shipment.timeline.map((step: any, idx: number) => (
                        <div key={idx} className="relative">
                          <span className={`absolute -left-[31px] top-0 h-4 w-4 rounded-full border-2 border-white transition-all ${
                            step.active 
                              ? "bg-accent-gold scale-125 ring-4 ring-accent-gold/20 animate-pulse" 
                              : step.done 
                                ? "bg-primary-deep" 
                                : "bg-gray-200"
                          }`}></span>
                          
                          <div className="space-y-0.5">
                            <span className={`block text-xs font-bold ${
                              step.active 
                                ? "text-accent-gold font-extrabold" 
                                : step.done 
                                  ? "text-primary-deep font-semibold" 
                                  : "text-gray-400"
                            }`}>
                              {step.label}
                            </span>
                            <span className="block text-[10px] text-gray-400">{step.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="bg-light-bg/50 px-6 py-4 flex justify-between items-center text-xs">
                    <span className="text-gray-500 font-medium">Have queries regarding border clearances?</span>
                    <Link
                      href="/contact?subject=customs"
                      className="px-4 py-2 bg-primary-deep hover:bg-primary-light text-white font-semibold rounded"
                    >
                      Contact Support Desk
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-8 text-center space-y-4 max-w-md mx-auto">
                  <div className="h-12 w-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
                    <AlertCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-primary-deep">Reference Number Not Found</h4>
                    <p className="text-xs text-gray-500 leading-relaxed mt-1">
                      We couldn't locate tracking ID "{trackingId}". Double-check spelling or copy/paste one of our pre-configured codes above.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
