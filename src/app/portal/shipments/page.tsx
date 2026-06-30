"use client";

import { useState, useEffect } from "react";
import { Truck, Search, MapPin, Calendar, Clock, ArrowRight, ShieldCheck, Box } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthContext";
import { DEMO_SHIPMENTS } from "@/data/demo/shipments";
import type { Shipment } from "@/types/models";

export default function PortalShipmentsPage() {
  const { user } = useAuth();
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);

  useEffect(() => {
    if (user) {
      const filtered = DEMO_SHIPMENTS.filter(s => s.customerId === user.customerId);
      setShipments(filtered);
    }
  }, [user]);

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
      s.cargoType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.customerReference.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || s.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-black text-white tracking-tight flex items-center space-x-3">
          <Truck className="h-8 w-8 text-accent-gold" />
          <span>My Shipment Ledger</span>
        </h2>
        <p className="text-gray-400 mt-2 font-medium">
          Track active road freight, view corridor milestones, and check estimated delivery dates.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-center gap-4 bg-primary-deep border border-accent-gold/20 p-4 rounded-2xl">
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search reference, destination, PO number, or cargo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-primary-black border border-accent-gold/20 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent-gold transition-colors"
          />
        </div>
        
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="w-full md:w-48 px-4 py-3 bg-primary-black border border-accent-gold/20 rounded-xl text-sm text-white focus:outline-none focus:border-accent-gold transition-colors"
        >
          <option value="all">All Statuses</option>
          <option value="booking_confirmed">Booking Confirmed</option>
          <option value="vehicle_assigned">Vehicle Assigned</option>
          <option value="cargo_collected">Cargo Collected</option>
          <option value="in_transit">In Transit</option>
          <option value="border_processing">Border Processing</option>
          <option value="customs_cleared">Customs Cleared</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Shipment List (7 columns) */}
        <div className="lg:col-span-7 space-y-4">
          {filteredShipments.length > 0 ? (
            filteredShipments.map((s) => (
              <div 
                key={s.id}
                onClick={() => setSelectedShipment(s)}
                className={`p-5 rounded-2xl bg-primary-deep border transition-all duration-150 cursor-pointer ${
                  selectedShipment?.id === s.id 
                    ? "border-accent-gold shadow-lg shadow-accent-gold/5" 
                    : "border-accent-gold/15 hover:border-accent-gold/30 bg-primary-deep/60"
                }`}
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-accent-gold text-sm font-black">{s.reference}</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-xs text-gray-400 font-bold">PO: {s.customerReference}</span>
                    </div>
                    <h4 className="text-base font-extrabold text-white">{s.cargoType} ({s.weight})</h4>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded text-[9px] font-extrabold uppercase border ${getStatusColor(s.status)}`}>
                    {s.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-accent-gold/5 text-xs">
                  <div>
                    <span className="text-gray-500 block text-[9px] uppercase font-bold">Origin</span>
                    <span className="text-gray-300 font-semibold block truncate mt-0.5">{s.origin}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[9px] uppercase font-bold">Destination</span>
                    <span className="text-gray-300 font-semibold block truncate mt-0.5">{s.destination}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 text-[10px] text-gray-500 font-bold border-t border-accent-gold/5 pt-3">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Est. Delivery: {s.estimatedArrival}</span>
                  </div>
                  <span className="text-accent-gold hover:text-accent-bright flex items-center space-x-0.5">
                    <span>Timeline Details</span>
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-16 border-2 border-dashed border-accent-gold/10 rounded-2xl text-center bg-primary-deep/30">
              <p className="text-gray-500 text-sm">No shipments match the selected filters.</p>
            </div>
          )}
        </div>

        {/* Shipment Tracking Timeline (5 columns) */}
        <div className="lg:col-span-5">
          {selectedShipment ? (
            <div className="bg-primary-deep border border-accent-gold/20 rounded-2xl p-6 sticky top-24 space-y-6">
              <div className="border-b border-accent-gold/10 pb-4">
                <span className="text-[10px] font-mono text-accent-gold uppercase font-bold tracking-widest">{selectedShipment.reference}</span>
                <h3 className="text-lg font-black text-white mt-1">SADC Telematics History</h3>
                <p className="text-xs text-gray-400 mt-1">Vehicle: {selectedShipment.vehicle}</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-4 pl-3 relative border-l border-accent-gold/20 ml-2">
                  {selectedShipment.trackingEvents.map((evt) => (
                    <div key={evt.id} className="relative space-y-1">
                      <span className="absolute -left-[18px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent-gold ring-4 ring-primary-deep"></span>
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
            <div className="bg-primary-deep/30 border border-dashed border-accent-gold/10 rounded-2xl p-10 text-center sticky top-24">
              <p className="text-gray-500 text-xs font-semibold">Select a shipment from the ledger to load real-time corridor GPS logs and border delay tracking data.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
