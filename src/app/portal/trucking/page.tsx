"use client";

import { useState, useEffect } from "react";
import { Truck, Search, Scale, ShieldCheck, Clock, MapPin, Activity, HelpCircle } from "lucide-react";
import { DEMO_SHIPMENTS } from "@/data/demo/shipments";
import type { Shipment } from "@/types/models";

export default function PortalTruckingPage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    // Load heavy road freight shipments (mineral ore, bagged cement, steel structure payload)
    const filtered = DEMO_SHIPMENTS.filter(s => 
      s.cargoType.toLowerCase().includes("mineral") || 
      s.cargoType.toLowerCase().includes("cement") || 
      s.cargoType.toLowerCase().includes("steel") ||
      s.cargoType.toLowerCase().includes("fertilizer")
    );
    setShipments(filtered);
    if (filtered.length > 0) {
      setSelectedShipment(filtered[0]);
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

  const filteredShipments = shipments.filter(s => {
    const matchesSearch = 
      s.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.cargoType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || s.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-black text-white tracking-tight flex items-center space-x-3">
          <Truck className="h-8 w-8 text-accent-gold" />
          <span>Heavy Road Freight Consignments</span>
        </h2>
        <p className="text-gray-400 mt-2 font-medium">
          Monitor your cross-border heavy bulk logistics, GPS coordinate status, and weighbridge checks.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Road Runs", val: shipments.filter(s => s.status !== "delivered").length, icon: Truck, color: "text-accent-gold bg-accent-gold/10 border-accent-gold/10" },
          { label: "Delivered (MTD)", val: shipments.filter(s => s.status === "delivered").length, icon: ShieldCheck, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/10" },
          { label: "Border Dwell wait", val: "4.5 Hrs Avg", icon: Clock, color: "text-purple-400 bg-purple-500/10 border-purple-500/10" },
          { label: "Total Cargo Weight", val: "148 MT", icon: Scale, color: "text-blue-400 bg-blue-500/10 border-blue-500/10" },
        ].map((item, idx) => (
          <div key={idx} className={`p-5 rounded-2xl bg-primary-deep border ${item.color.split(' ')[2]} flex items-center justify-between`}>
            <div className="space-y-1">
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">{item.label}</span>
              <span className="block text-2xl font-extrabold tracking-tight text-white">{item.val}</span>
            </div>
            <div className={`p-3 rounded-xl ${item.color.split(' ')[1]} ${item.color.split(' ')[0]}`}>
              <item.icon className="h-5 w-5" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid Splitting */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Shipments Table (7 columns) */}
        <div className="lg:col-span-7 space-y-6 bg-primary-deep border border-accent-gold/20 rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-accent-gold/10 gap-4">
            <h3 className="font-extrabold text-lg text-white flex items-center space-x-2">
              <Activity className="h-5 w-5 text-accent-gold" />
              <span>Consignment Logs</span>
            </h3>

            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search reference, cargo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-primary-black border border-accent-gold/20 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-accent-gold transition-colors"
                />
              </div>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 bg-primary-black border border-accent-gold/20 rounded-xl text-xs text-white focus:outline-none focus:border-accent-gold transition-colors"
              >
                <option value="all">All Statuses</option>
                <option value="in_transit">In Transit</option>
                <option value="border_processing">Border Processing</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {filteredShipments.map((s) => (
              <div 
                key={s.id}
                onClick={() => setSelectedShipment(s)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  selectedShipment?.id === s.id 
                    ? "border-accent-gold bg-accent-gold/5 shadow-sm" 
                    : "border-accent-gold/5 hover:border-accent-gold/25 bg-primary-black/20"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-2 text-xs">
                      <span className="font-mono text-accent-gold font-bold">{s.reference}</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-400 font-semibold">{s.cargoType}</span>
                    </div>
                    <p className="text-sm font-extrabold text-white mt-1">
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

        {/* GPS Timeline Detail Pane (5 columns) */}
        <div className="lg:col-span-5">
          {selectedShipment ? (
            <div className="bg-primary-deep border border-accent-gold/20 rounded-2xl p-6 sticky top-24 space-y-6">
              <div className="border-b border-accent-gold/10 pb-4">
                <span className="text-[10px] font-mono text-accent-gold uppercase font-bold tracking-widest">{selectedShipment.reference}</span>
                <h3 className="text-lg font-black text-white mt-1">GPS Telematics Timeline</h3>
                <p className="text-xs text-gray-400 mt-1">Truck Payload: {selectedShipment.weight} | Fleet ID: {selectedShipment.vehicle}</p>
              </div>

              <div className="space-y-4">
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
            <div className="bg-primary-deep/40 border border-dashed border-accent-gold/15 rounded-2xl p-10 text-center sticky top-24">
              <p className="text-gray-500 text-xs font-semibold">Select a freight run to load telemetry tracking logs.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
