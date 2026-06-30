"use client";

import { useState } from "react";
import { Package, Search, Clock, MapPin, CheckCircle2 } from "lucide-react";

export default function ExpressTrackPage() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [result, setResult] = useState<any | null>(null);

  const mockParcels = [
    { number: "DFS-EXP-772923", status: "out_for_delivery", receiver: "Apex Builders", destination: "Gaborone, Botswana", weight: "4.5 kg", history: [
      { status: "booking_confirmed", location: "Lobatse Hub", time: "2026-06-29T10:00:00Z", note: "Parcel registered and packed." },
      { status: "in_transit", location: "A1 Highway north", time: "2026-06-29T14:00:00Z", note: "Dispatched towards Gaborone." },
      { status: "out_for_delivery", location: "Gaborone Depot", time: "2026-06-30T07:30:00Z", note: "Loaded into delivery van." }
    ]},
    { number: "DFS-EXP-908123", status: "delivered", receiver: "Phakalane Medical Clinic", destination: "Phakalane, Botswana", weight: "1.2 kg", history: [
      { status: "booking_confirmed", location: "Gaborone HQ", time: "2026-06-29T08:00:00Z", note: "Document verified and sealed." },
      { status: "delivered", location: "Phakalane Clinic", time: "2026-06-29T15:00:00Z", note: "Signed by Dr. Kgosi." }
    ]}
  ];

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const found = mockParcels.find(p => p.number.toLowerCase() === trackingNumber.trim().toLowerCase());
    setResult(found || "not_found");
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center space-x-3">
          <Package className="h-8 w-8 text-primary-royal" />
          <span>Consignment Tracking Panel</span>
        </h2>
        <p className="text-gray-500 mt-2 font-medium">
          Check the transit status and proof of delivery signatures for your express couriers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Tracker Search Form (5 columns) */}
        <div className="lg:col-span-5 bg-white border border-gray-100 shadow-sm rounded-2xl p-6 space-y-4">
          <h3 className="font-extrabold text-gray-900 text-lg border-b border-gray-100 pb-3">Trace Cargo</h3>
          
          <form onSubmit={handleTrack} className="space-y-4 text-xs font-semibold text-gray-600">
            <div className="space-y-1.5">
              <label className="block text-gray-400 uppercase tracking-wider text-[9px]">Consignment ID</label>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  required
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="e.g. DFS-EXP-772923"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-primary-deep placeholder-gray-400 focus:outline-none focus:border-primary-royal transition-colors"
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full py-3.5 bg-primary-royal hover:bg-primary-deep text-white font-extrabold rounded-xl transition shadow-lg text-sm"
            >
              Check Status
            </button>
          </form>
        </div>

        {/* Tracker Results Timeline (7 columns) */}
        <div className="lg:col-span-7">
          {result === "not_found" && (
            <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-10 text-center text-gray-500">
              <p className="text-sm font-medium">No consignment logs found matching that tracking number. Please verify and try again.</p>
            </div>
          )}

          {result && result !== "not_found" && (
            <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <span className="text-[10px] text-primary-royal font-mono font-bold">{result.number}</span>
                <h3 className="text-lg font-black text-gray-900 mt-1">Consignment Status: <span className="capitalize text-primary-royal">{result.status}</span></h3>
                <p className="text-xs text-gray-400 mt-1">Recipient: {result.receiver} | Weight: {result.weight}</p>
              </div>

              {/* History Timeline */}
              <div className="space-y-6 pl-4 relative border-l border-gray-200 ml-2">
                {result.history.map((evt: any, idx: number) => (
                  <div key={idx} className="relative space-y-1">
                    <span className="absolute -left-[21px] top-1.5 h-3.5 w-3.5 rounded-full bg-primary-royal ring-4 ring-white flex items-center justify-center">
                      <span className="h-1.5 w-1.5 bg-white rounded-full"></span>
                    </span>
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="font-extrabold text-primary-royal uppercase tracking-wider">{evt.status.replace('_', ' ')}</span>
                      <span className="text-gray-400 font-semibold">{new Date(evt.time).toLocaleString()}</span>
                    </div>
                    <p className="text-gray-900 text-xs font-bold">{evt.location}</p>
                    <p className="text-gray-500 text-xs font-medium leading-relaxed">{evt.note}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
