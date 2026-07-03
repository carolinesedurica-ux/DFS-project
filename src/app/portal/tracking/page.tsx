"use client";

import { useState, useEffect } from "react";
import { Truck, MapPin, Scale, Search, ShieldCheck, Activity, Clock } from "lucide-react";
import { DEMO_SHIPMENTS } from "@/data/demo/shipments";
import type { Shipment } from "@/types/models";

export default function PortalTrackingPage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Only display active shipments that are not delivered yet
    const active = DEMO_SHIPMENTS.filter(s => s.status !== "delivered");
    setShipments(active);
    if (active.length > 0) {
      setSelectedShipment(active[0]);
    }
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "border_processing":
        return "text-purple-400 bg-purple-950/40 border-purple-500/20 animate-pulse";
      case "in_transit":
        return "text-blue-400 bg-blue-950/40 border-blue-500/20";
      case "delayed":
        return "text-red-400 bg-red-950/40 border-red-500/20";
      default:
        return "text-gray-400 bg-gray-800 border-gray-700";
    }
  };

  const filtered = shipments.filter(s => 
    s.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.cargoType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Title Header */}
      <div>
        <h2 className="text-3xl font-black text-white tracking-tight flex items-center space-x-3">
          <MapPin className="h-8 w-8 text-accent-gold" />
          <span>Active GPS Fleet Tracking</span>
        </h2>
        <p className="text-gray-400 mt-2 font-medium">
          Real-time SADC corridor tracking tracker. Monitor active heavy duty rigs and transit timeline checkpoints.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Active Runs list (5 cols) */}
        <div className="lg:col-span-5 bg-primary-deep border border-accent-gold/20 rounded-2xl p-6 space-y-6">
          <div className="border-b border-accent-gold/10 pb-4 space-y-4">
            <h3 className="font-extrabold text-white text-lg flex items-center space-x-2">
              <Activity className="h-5 w-5 text-accent-gold" />
              <span>Active Dispatches</span>
            </h3>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search reference, destination..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-primary-black border border-accent-gold/20 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-accent-gold transition-colors"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filtered.length > 0 ? (
              filtered.map((s) => (
                <div 
                  key={s.id}
                  onClick={() => setSelectedShipment(s)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    selectedShipment?.id === s.id 
                      ? "border-accent-gold bg-accent-gold/5" 
                      : "border-accent-gold/5 hover:border-accent-gold/25 bg-primary-black/20"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-mono text-accent-gold text-xs font-bold block">{s.reference}</span>
                      <p className="text-sm font-extrabold text-white mt-1">
                        {s.origin.split(',')[0]} ➔ {s.destination.split(',')[0]}
                      </p>
                      <span className="text-[10px] text-gray-400 font-semibold block mt-0.5">{s.cargoType} ({s.weight})</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[8px] font-extrabold uppercase border ${getStatusColor(s.status)}`}>
                      {s.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-xs text-gray-500 py-6">No active shipments to track.</p>
            )}
          </div>
        </div>

        {/* Right Side: GPS Timeline & Map info (7 cols) */}
        <div className="lg:col-span-7">
          {selectedShipment ? (
            <div className="bg-primary-deep border border-accent-gold/20 rounded-2xl p-6 space-y-6">
              
              {/* Header Info */}
              <div className="flex justify-between items-start border-b border-accent-gold/10 pb-4">
                <div>
                  <span className="font-mono text-accent-gold text-xs font-bold block">{selectedShipment.reference}</span>
                  <h3 className="text-lg font-black text-white mt-0.5">Vehicle: {selectedShipment.vehicle}</h3>
                  <p className="text-xs text-gray-400 mt-1">SADC corridor route progress logs</p>
                </div>
                <div className="text-right space-y-1">
                  <span className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest">Weight load limit</span>
                  <span className="flex items-center text-xs font-extrabold text-emerald-400 justify-end">
                    <Scale className="h-3.5 w-3.5 mr-1" />
                    {selectedShipment.weight}
                  </span>
                </div>
              </div>

              {/* SADC Checkpoint Tracker Map Placeholder */}
              <div className="relative h-44 bg-primary-black border border-accent-gold/15 rounded-xl overflow-hidden flex items-center justify-center p-4">
                {/* SVG Mock Map Grid */}
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:16px_16px]"></div>
                
                <div className="text-center space-y-2 z-10">
                  <MapPin className="h-8 w-8 text-accent-gold mx-auto animate-bounce" />
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-white">Current Coordinates: South SADC Corridor</p>
                    <p className="text-[10px] text-gray-500 font-mono font-bold">22.6438° S, 27.2415° E</p>
                  </div>
                </div>
              </div>

              {/* GPS History Logs */}
              <div className="space-y-4">
                <h4 className="font-bold text-white text-sm">GPS History Checkpoints</h4>
                <div className="space-y-6 pl-4 relative border-l border-accent-gold/10 ml-2">
                  {selectedShipment.trackingEvents.map((evt) => (
                    <div key={evt.id} className="relative space-y-1">
                      <span className="absolute -left-[22px] top-1.5 h-3 w-3 rounded-full bg-accent-gold ring-4 ring-primary-deep flex items-center justify-center">
                        <span className="h-1.5 w-1.5 bg-primary-deep rounded-full"></span>
                      </span>
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="font-extrabold text-accent-gold uppercase tracking-wider">{evt.status.replace('_', ' ')}</span>
                        <span className="text-gray-500 font-semibold">{new Date(evt.timestamp).toLocaleString()}</span>
                      </div>
                      <p className="text-white text-xs font-bold">{evt.location}</p>
                      <p className="text-gray-400 text-xs font-medium leading-relaxed">{evt.notes}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-primary-deep/40 border border-dashed border-accent-gold/15 rounded-2xl p-10 text-center">
              <p className="text-gray-500 text-xs font-semibold">Select an active run to load telematics details.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
