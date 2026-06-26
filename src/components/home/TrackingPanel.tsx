"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Info, ShieldAlert } from "lucide-react";

export default function TrackingPanel() {
  const [trackingId, setTrackingId] = useState("");
  const router = useRouter();

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;
    router.push(`/track?id=${trackingId.trim().toUpperCase()}`);
  };

  return (
    <div className="bg-white border border-border rounded-2xl shadow-[0_18px_50px_rgba(23,6,34,0.08)] p-6 sm:p-8 max-w-4xl mx-auto -mt-16 sm:-mt-24 relative z-20">
      <form onSubmit={handleTrack} className="space-y-4">
        
        {/* Panel Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <h3 className="text-lg font-extrabold text-primary-royal tracking-tight flex items-center space-x-2">
            <Search className="h-5 w-5 text-accent-gold" />
            <span>Track Your Shipment</span>
          </h3>
          <span className="text-[10px] text-gray border border-gray/20 px-2 py-0.5 rounded font-mono font-semibold">
            DFS-OS SIMULATOR // V1.0
          </span>
        </div>

        {/* Input & Button */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            placeholder="Enter SADC Waybill / RFQ Code (e.g. DFS-102-BOT)"
            className="flex-grow bg-light-grey border border-border rounded-xl px-4 py-3.5 text-sm text-charcoal placeholder-grey font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent transition-all"
          />
          <button
            type="submit"
            className="px-8 py-3.5 gold-gradient hover:opacity-95 text-primary-deep font-extrabold rounded-xl text-sm transition-all shadow-md flex-shrink-0"
          >
            Track Cargo
          </button>
        </div>

        {/* Sample Codes & Notice */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 pt-1">
          <div className="text-xs text-grey flex flex-wrap gap-2 items-center">
            <span>Sample reference logs:</span>
            <button
              type="button"
              onClick={() => setTrackingId("DFS-102-BOT")}
              className="font-mono font-bold text-primary-royal hover:underline hover:text-accent-gold"
            >
              DFS-102-BOT
            </button>
            <span className="text-border">|</span>
            <button
              type="button"
              onClick={() => setTrackingId("DFS-789-ZIM")}
              className="font-mono font-bold text-primary-royal hover:underline hover:text-accent-gold"
            >
              DFS-789-ZIM
            </button>
          </div>
          
          <div className="flex items-center space-x-1.5 text-[11px] text-grey">
            <Info className="h-3.5 w-3.5 text-accent-gold flex-shrink-0" />
            <span className="italic leading-none">Demonstration notices apply. Live tracking transitions in Stage 2.</span>
          </div>
        </div>

      </form>
    </div>
  );
}
