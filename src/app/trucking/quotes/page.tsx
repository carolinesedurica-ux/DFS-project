"use client";

import { useState, useEffect } from "react";
import { ClipboardList, Search, CheckCircle, Clock, MapPin, Scale } from "lucide-react";
import { DEMO_QUOTES } from "@/data/demo/quotes";
import type { Quote } from "@/types/models";

export default function TruckingQuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Filter quotes relevant to heavy haulage (bulk minerals, flatdeck, side tipper)
    const filtered = DEMO_QUOTES.filter(q => 
      q.cargoDetails.toLowerCase().includes("ore") ||
      q.cargoDetails.toLowerCase().includes("cement") ||
      q.cargoDetails.toLowerCase().includes("fertilizer") ||
      q.equipmentRequirement.toLowerCase().includes("tipper") ||
      q.equipmentRequirement.toLowerCase().includes("flat-deck")
    );
    setQuotes(filtered);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "quoted":
        return "bg-blue-50 text-blue-600 border-blue-100";
      case "under_review":
        return "bg-purple-50 text-purple-600 border-purple-100";
      default:
        return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black text-primary-deep tracking-tight flex items-center space-x-3">
          <ClipboardList className="h-8 w-8 text-accent-gold" />
          <span>Heavy Haulage Tariffs & Quotes</span>
        </h2>
        <p className="text-gray-600 mt-2 font-medium">
          Manage corridor logistics contract rates, bulk mineral bids, and flatdeck freight tenders.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quotes.map((q) => (
          <div key={q.id} className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center text-xs">
              <span className="font-mono text-primary-royal font-bold">Quote Ref: {q.id}</span>
              <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase border ${getStatusColor(q.status)}`}>
                {q.status}
              </span>
            </div>

            <div className="space-y-2">
              <span className="block text-[9px] text-gray-400 font-bold uppercase tracking-wider">Corridor Route</span>
              <div className="flex items-center space-x-1.5 text-primary-deep font-extrabold text-sm">
                <MapPin className="h-4.5 w-4.5 text-accent-gold" />
                <span>{q.origin.split(',')[0]} ➔ {q.destination.split(',')[0]}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs pt-2 border-t border-gray-50">
              <div>
                <span className="text-gray-400 block text-[9px] uppercase font-bold">Cargo Details</span>
                <span className="text-primary-deep mt-0.5 block font-semibold">{q.cargoDetails}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[9px] uppercase font-bold">Trailer configuration</span>
                <span className="text-primary-deep mt-0.5 block font-semibold">{q.equipmentRequirement}</span>
              </div>
            </div>

            <div className="bg-gray-50 p-4 border border-gray-100 rounded-xl flex items-center justify-between mt-4">
              <div>
                <span className="text-gray-400 block text-[9px] uppercase font-bold">Quoted Commercial Rate</span>
                <span className="text-lg font-black text-primary-deep tracking-tight mt-0.5">
                  {q.amount ? q.amount : "Calculating..."}
                </span>
              </div>
              {q.validityDate && (
                <div className="text-right text-[10px] text-gray-400 font-semibold">
                  <span>Valid until: {q.validityDate}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
