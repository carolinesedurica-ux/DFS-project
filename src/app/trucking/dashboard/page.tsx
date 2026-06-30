"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Truck, MapPin, Scale, ShieldCheck, Clock, ArrowRight, HelpCircle, Activity } from "lucide-react";
import { DEMO_SHIPMENTS } from "@/data/demo/shipments";
import type { Shipment } from "@/types/models";

export default function TruckingDashboard() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [activeShipment, setActiveShipment] = useState<Shipment | null>(null);

  useEffect(() => {
    // Load trucking shipments (all heavy cargo like ore, cement, steel)
    const filtered = DEMO_SHIPMENTS.filter(s => 
      s.cargoType.toLowerCase().includes("mineral") || 
      s.cargoType.toLowerCase().includes("cement") || 
      s.cargoType.toLowerCase().includes("steel") ||
      s.cargoType.toLowerCase().includes("fertilizer")
    );
    setShipments(filtered);
    if (filtered.length > 0) {
      setActiveShipment(filtered[0]);
    }
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-emerald-950/40 text-emerald-400 border-emerald-500/20";
      case "in_transit":
        return "bg-blue-950/40 text-blue-400 border-blue-500/20";
      case "border_processing":
        return "bg-purple-950/40 text-purple-400 border-purple-500/20 animate-pulse";
      case "delayed":
        return "bg-red-950/40 text-red-400 border-red-500/20";
      default:
        return "bg-gray-800 text-gray-300 border-gray-700";
    }
  };

  return (
    <div className="space-y-8">
      {/* Title Header */}
      <div>
        <h2 className="text-3xl font-black text-primary-deep tracking-tight flex items-center space-x-3">
          <Truck className="h-8 w-8 text-accent-gold" />
          <span>DFS Heavy Road Freight Portal</span>
        </h2>
        <p className="text-gray-600 mt-2 font-medium">
          Operations cockpit for high-capacity side-tippers and flatdecks across SADC border corridors.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Haulage Runs", val: shipments.filter(s => s.status !== "delivered").length, icon: Truck, color: "text-primary-deep bg-primary-royal/10 border-primary-royal/10" },
          { label: "Corridor Routes", val: "4 Active", icon: MapPin, color: "text-emerald-600 bg-emerald-500/10 border-emerald-500/10" },
          { label: "Transit Dwell Time", val: "4.5 Hrs", icon: Clock, color: "text-amber-600 bg-amber-500/10 border-amber-500/10" },
          { label: "Load Limit Checks", val: "100% Compliant", icon: ShieldCheck, color: "text-accent-metallic bg-accent-soft border-accent-gold/10" },
        ].map((item, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">{item.label}</span>
              <span className="block text-2xl font-extrabold tracking-tight text-primary-deep">{item.val}</span>
            </div>
            <div className={`p-3 rounded-xl ${item.color.split(' ')[1]} ${item.color.split(' ')[0]}`}>
              <item.icon className="h-5 w-5" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Console Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Hand: Active Shipments Ledger (7 columns) */}
        <div className="lg:col-span-7 space-y-6 bg-white border border-gray-100 shadow-sm rounded-2xl p-6">
          <div className="flex justify-between items-center pb-4 border-b border-gray-100">
            <h3 className="font-extrabold text-lg text-primary-deep flex items-center space-x-2">
              <Activity className="h-5 w-5 text-accent-gold" />
              <span>Current Fleet Dispatches</span>
            </h3>
            <Link href="/trucking/shipments" className="text-xs text-primary-royal font-bold flex items-center space-x-1 hover:text-accent-gold">
              <span>View All</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="space-y-4">
            {shipments.map((s) => (
              <div 
                key={s.id}
                onClick={() => setActiveShipment(s)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  activeShipment?.id === s.id 
                    ? "border-accent-gold bg-accent-soft/20 shadow-sm" 
                    : "border-gray-100 hover:border-gray-200 bg-white"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-2 text-xs">
                      <span className="font-mono text-primary-royal font-bold">{s.reference}</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-gray-500 font-semibold">{s.cargoType}</span>
                    </div>
                    <p className="text-sm font-extrabold text-primary-deep mt-1">
                      {s.origin.split(',')[0]} ➔ {s.destination.split(',')[0]}
                    </p>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase border ${getStatusColor(s.status)}`}>
                    {s.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Hand: Active Shipment Telemetry Timeline (5 columns) */}
        <div className="lg:col-span-5">
          {activeShipment ? (
            <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 sticky top-24 space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <span className="text-[10px] font-mono text-accent-metallic uppercase font-bold tracking-widest">{activeShipment.reference}</span>
                <h3 className="text-lg font-black text-primary-deep mt-1">Real-time GPS Tracking</h3>
                <p className="text-xs text-gray-500 mt-1">Vehicle: {activeShipment.vehicle} | Payload: {activeShipment.weight}</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-4 pl-3 relative border-l border-gray-200 ml-2">
                  {activeShipment.trackingEvents.map((evt) => (
                    <div key={evt.id} className="relative space-y-1">
                      <span className="absolute -left-[18px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary-royal ring-4 ring-white"></span>
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="font-extrabold text-primary-royal uppercase tracking-wider">{evt.status.replace('_', ' ')}</span>
                        <span className="text-gray-400 font-semibold">{new Date(evt.timestamp).toLocaleString()}</span>
                      </div>
                      <p className="text-primary-deep text-xs font-bold">{evt.location}</p>
                      <p className="text-gray-500 text-xs font-medium leading-relaxed">{evt.notes}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-dashed border-gray-200 rounded-2xl p-10 text-center sticky top-24">
              <p className="text-gray-400 text-xs font-semibold">Select a fleet dispatch run to view SADC border corridor GPS history logs.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
