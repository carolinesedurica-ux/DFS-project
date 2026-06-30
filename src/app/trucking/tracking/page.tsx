"use client";

import { useState, useEffect } from "react";
import { Truck, MapPin, Search, Play, CheckCircle2, Clock } from "lucide-react";
import { DEMO_SHIPMENTS } from "@/data/demo/shipments";
import type { Shipment } from "@/types/models";

export default function TruckingTrackingPage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);

  useEffect(() => {
    const filtered = DEMO_SHIPMENTS.filter(s => s.status !== "delivered");
    setShipments(filtered);
    if (filtered.length > 0) {
      setSelectedShipment(filtered[0]);
    }
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "border_processing":
        return "text-purple-500 bg-purple-50 border-purple-100 animate-pulse";
      case "in_transit":
        return "text-blue-500 bg-blue-50 border-blue-100";
      case "delayed":
        return "text-red-500 bg-red-50 border-red-100";
      default:
        return "text-gray-500 bg-gray-50 border-gray-100";
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black text-primary-deep tracking-tight flex items-center space-x-3">
          <Truck className="h-8 w-8 text-accent-gold" />
          <span>Real-time GPS Corridor Tracking</span>
        </h2>
        <p className="text-gray-600 mt-2 font-medium">
          Track active road dispatches across SADC borders (Martins Drift, Ramokgwebana, Kazungula).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left pane: active shipment list */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="font-extrabold text-sm text-gray-400 uppercase tracking-widest px-1">Active Shipments</h3>
          {shipments.map(s => (
            <div
              key={s.id}
              onClick={() => setSelectedShipment(s)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                selectedShipment?.id === s.id
                  ? "border-accent-gold bg-accent-soft/10"
                  : "border-gray-100 hover:border-gray-200 bg-white"
              }`}
            >
              <div className="flex justify-between items-start">
                <span className="font-mono text-xs font-bold text-primary-royal">{s.reference}</span>
                <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase border ${getStatusColor(s.status)}`}>
                  {s.status.replace('_', ' ')}
                </span>
              </div>
              <p className="text-sm font-extrabold text-primary-deep mt-2">{s.origin.split(',')[0]} ➔ {s.destination.split(',')[0]}</p>
            </div>
          ))}
        </div>

        {/* Right pane: GPS Timeline */}
        <div className="lg:col-span-7">
          {selectedShipment ? (
            <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <h3 className="text-lg font-black text-primary-deep">{selectedShipment.reference}</h3>
                <p className="text-xs text-gray-500 font-semibold mt-1">Vehicle Telemetry: {selectedShipment.vehicle}</p>
              </div>

              {/* Timeline */}
              <div className="space-y-6 pl-4 relative border-l border-gray-100 ml-2">
                {selectedShipment.trackingEvents.map((evt) => (
                  <div key={evt.id} className="relative space-y-1">
                    <span className="absolute -left-[21px] top-1.5 h-3.5 w-3.5 rounded-full bg-primary-royal ring-4 ring-white flex items-center justify-center">
                      <span className="h-1.5 w-1.5 bg-accent-gold rounded-full"></span>
                    </span>
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
          ) : (
            <div className="bg-gray-50 border border-dashed border-gray-200 rounded-2xl p-10 text-center">
              <p className="text-gray-400 text-xs font-semibold">Select an active shipment to load live corridor telematics logs.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
