"use client";

import { useState, useEffect } from "react";
import { Globe, Search, Clock, CheckCircle2, AlertTriangle, FileText, ArrowRight, ShieldCheck } from "lucide-react";
import { ClearingService, type MockCustomsCase } from "@/services/clearing";

export default function PortalClearingPage() {
  const [cases, setCases] = useState<MockCustomsCase[]>([]);
  const [selectedCase, setSelectedCase] = useState<MockCustomsCase | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCases() {
      try {
        const res = await ClearingService.getCustomsCases();
        if (res.data) {
          // Filter to simulate only this client's cases
          setCases(res.data);
          if (res.data.length > 0) {
            setSelectedCase(res.data[0]);
          }
        }
      } catch (err) {
        console.error("Failed to load customs cases:", err);
      } finally {
        setLoading(false);
      }
    }
    loadCases();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "cleared":
        return "text-emerald-400 bg-emerald-950/40 border-emerald-500/20";
      case "pending":
        return "text-yellow-400 bg-yellow-950/40 border-yellow-500/20 animate-pulse";
      case "open":
        return "text-blue-400 bg-blue-950/40 border-blue-500/20";
      case "held":
        return "text-red-400 bg-red-950/40 border-red-500/20";
      default:
        return "text-gray-400 bg-gray-800 border-gray-700";
    }
  };

  return (
    <div className="space-y-8">
      {/* Title Header */}
      <div>
        <h2 className="text-3xl font-black text-white tracking-tight flex items-center space-x-3">
          <Globe className="h-8 w-8 text-accent-gold" />
          <span>SADC Customs Clearing Console</span>
        </h2>
        <p className="text-gray-400 mt-2 font-medium">
          Track SAD500 declaration reviews, border agent verification, and gate release status for cross-border cargo.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-6 bg-primary-deep border border-accent-gold/20 rounded-2xl shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Active Filings</span>
            <span className="block text-3xl font-extrabold text-white">{cases.filter(c => c.status !== "cleared").length}</span>
          </div>
          <div className="p-3.5 bg-blue-500/10 text-blue-400 rounded-xl">
            <Clock className="h-5 w-5" />
          </div>
        </div>

        <div className="p-6 bg-primary-deep border border-accent-gold/20 rounded-2xl shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Customs Cleared</span>
            <span className="block text-3xl font-extrabold text-white">{cases.filter(c => c.status === "cleared").length}</span>
          </div>
          <div className="p-3.5 bg-emerald-500/10 text-emerald-400 rounded-xl">
            <CheckCircle2 className="h-5 w-5" />
          </div>
        </div>

        <div className="p-6 bg-primary-deep border border-accent-gold/20 rounded-2xl shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Compliance Status</span>
            <span className="block text-3xl font-extrabold text-white">100% Valid</span>
          </div>
          <div className="p-3.5 bg-gray-500/10 text-gray-400 rounded-xl">
            <ShieldCheck className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Main Splits Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Customs Declarations List (7 cols) */}
        <div className="lg:col-span-7 bg-primary-deep border border-accent-gold/20 rounded-2xl p-6 space-y-6">
          <h3 className="font-extrabold text-lg text-white flex items-center space-x-2 border-b border-accent-gold/10 pb-4">
            <Globe className="h-5 w-5 text-accent-gold" />
            <span>Filing Declarations</span>
          </h3>

          <div className="space-y-4">
            {loading ? (
              <p className="text-center text-xs text-gray-400 py-6">Loading customs filings...</p>
            ) : cases.length > 0 ? (
              cases.map((c) => (
                <div 
                  key={c.id}
                  onClick={() => setSelectedCase(c)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    selectedCase?.id === c.id 
                      ? "border-accent-gold bg-accent-gold/5" 
                      : "border-accent-gold/5 hover:border-accent-gold/25 bg-primary-black/20"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-2 text-xs">
                        <span className="font-mono text-accent-gold font-bold">{c.caseNumber}</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-400 font-semibold">{c.cargoType}</span>
                      </div>
                      <p className="text-sm font-extrabold text-white mt-1">
                        Border Checkpoint: {c.borderPost}
                      </p>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase border ${getStatusColor(c.status)}`}>
                      {c.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-xs text-gray-400 py-6">No customs filings found.</p>
            )}
          </div>
        </div>

        {/* Clearance Milestone Checklist (5 cols) */}
        <div className="lg:col-span-5">
          {selectedCase ? (
            <div className="bg-primary-deep border border-accent-gold/20 rounded-2xl p-6 space-y-6 sticky top-24">
              <div className="border-b border-accent-gold/10 pb-4">
                <span className="text-[10px] text-accent-gold font-mono font-bold">{selectedCase.caseNumber}</span>
                <h3 className="text-lg font-black text-white mt-1">Milestone Verification</h3>
                <p className="text-xs text-gray-400 mt-1">Status: <strong className="uppercase text-accent-gold">{selectedCase.status}</strong></p>
              </div>

              {/* Progress Checklist */}
              <div className="space-y-5 text-xs font-semibold text-gray-300">
                {[
                  { label: "SAD500 Entry Lodged & Registered", done: true },
                  { label: "Broker Invoice Customs Verification", done: true },
                  { label: "Border Customs Inspector Assessment", done: selectedCase.status === "cleared" },
                  { label: "Vat & Duty Payment Dispatched", done: selectedCase.status === "cleared" },
                  { label: "Customs Clearance Gate Release Issued", done: selectedCase.status === "cleared" }
                ].map((step, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <span className={`h-6 w-6 rounded-full flex items-center justify-center border text-[11px] ${
                      step.done 
                        ? "bg-emerald-950/40 border-emerald-500/20 text-emerald-400" 
                        : "bg-primary-black/30 border-accent-gold/15 text-gray-500"
                    }`}>
                      {step.done ? "✓" : idx + 1}
                    </span>
                    <span className={step.done ? "text-white font-bold" : "text-gray-500 font-medium"}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-primary-deep/40 border border-dashed border-accent-gold/15 rounded-2xl p-10 text-center sticky top-24">
              <p className="text-gray-500 text-xs font-semibold">Select a case entry to load customs checkpoints.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
