"use client";

import { useState, useEffect } from "react";
import { ClipboardList, Search, CheckCircle, XCircle, Clock, MapPin, Scale, Shield } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthContext";
import { DEMO_QUOTES } from "@/data/demo/quotes";
import type { Quote } from "@/types/models";

export default function PortalQuotesPage() {
  const { user } = useAuth();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (user) {
      const filtered = DEMO_QUOTES.filter(q => q.customerId === user.customerId);
      setQuotes(filtered);
    }
  }, [user]);

  const handleUpdateStatus = (id: string, newStatus: "accepted" | "declined") => {
    const updated = quotes.map(q => q.id === id ? { ...q, status: newStatus } : q);
    setQuotes(updated);
    alert(`Quote status updated to: ${newStatus.toUpperCase()}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-emerald-950/40 text-emerald-400 border-emerald-500/20";
      case "quoted":
        return "bg-blue-950/40 text-blue-400 border-blue-500/20 animate-pulse";
      case "under_review":
        return "bg-purple-950/40 text-purple-400 border-purple-500/20";
      case "declined":
        return "bg-red-950/40 text-red-400 border-red-500/20";
      default:
        return "bg-gray-800 text-gray-300 border-gray-700";
    }
  };

  const filteredQuotes = quotes.filter(q => {
    const matchesSearch = 
      q.origin.toLowerCase().includes(searchTerm.toLowerCase()) || 
      q.destination.toLowerCase().includes(searchTerm.toLowerCase()) || 
      q.cargoDetails.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || q.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-black text-white tracking-tight flex items-center space-x-3">
          <ClipboardList className="h-8 w-8 text-accent-gold" />
          <span>Freight Quotations</span>
        </h2>
        <p className="text-gray-400 mt-2 font-medium">
          Review commercial rates, accept logistics contract quotes, or request new corridor rates.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row items-center gap-4 bg-primary-deep border border-accent-gold/20 p-4 rounded-2xl">
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search quotes by cargo, route..."
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
          <option value="draft">Draft</option>
          <option value="under_review">Under Review</option>
          <option value="quoted">Quoted</option>
          <option value="accepted">Accepted</option>
          <option value="declined">Declined</option>
        </select>
      </div>

      {/* Quotes Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredQuotes.length > 0 ? (
          filteredQuotes.map((q) => (
            <div 
              key={q.id} 
              className="bg-primary-deep border border-accent-gold/15 hover:border-accent-gold/30 rounded-2xl p-6 space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Quote Tender Reference</span>
                  <span className={`px-2.5 py-0.5 rounded text-[9px] font-extrabold uppercase border ${getStatusColor(q.status)}`}>
                    {q.status.replace('_', ' ')}
                  </span>
                </div>

                {/* Route */}
                <div className="space-y-1">
                  <span className="text-[9px] text-gray-500 uppercase font-bold tracking-wider">Corridor Route</span>
                  <div className="flex items-center space-x-2 text-white font-extrabold text-sm">
                    <MapPin className="h-4.5 w-4.5 text-accent-gold flex-shrink-0" />
                    <span>{q.origin.split(',')[0]} ➔ {q.destination.split(',')[0]}</span>
                  </div>
                </div>

                {/* Cargo details */}
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-gray-500 block text-[9px] uppercase font-bold">Cargo Details</span>
                    <span className="text-gray-200 mt-1 block font-semibold">{q.cargoDetails}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[9px] uppercase font-bold">Equipment</span>
                    <span className="text-gray-200 mt-1 block font-semibold">{q.equipmentRequirement}</span>
                  </div>
                </div>

                {/* Amount */}
                <div className="bg-primary-black p-4 border border-accent-gold/5 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-gray-500 block text-[9px] uppercase font-bold">Commercial Quote Rate</span>
                    <span className="text-lg font-black text-accent-gold tracking-tight mt-0.5">
                      {q.amount ? q.amount : "Calculating..."}
                    </span>
                  </div>
                  {q.validityDate && (
                    <div className="text-right text-[10px] text-gray-500 font-bold">
                      <span>Expires: {q.validityDate}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              {q.status === "quoted" && (
                <div className="flex items-center space-x-3 pt-4 border-t border-accent-gold/5 w-full">
                  <button
                    onClick={() => handleUpdateStatus(q.id, "accepted")}
                    className="flex-1 flex items-center justify-center space-x-1.5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-emerald-600/10"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Accept Quote</span>
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(q.id, "declined")}
                    className="flex-1 flex items-center justify-center space-x-1.5 py-3 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-xl text-xs font-bold border border-red-500/20 transition"
                  >
                    <XCircle className="h-4 w-4" />
                    <span>Decline</span>
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-2 p-16 border-2 border-dashed border-accent-gold/10 rounded-2xl text-center bg-primary-deep/30">
            <p className="text-gray-500 text-sm">No quotes requested matching the filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
