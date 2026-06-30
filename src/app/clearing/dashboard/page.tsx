"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Globe, Search, Clock, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, Activity } from "lucide-react";
import { ClearingService, type MockCustomsCase } from "@/services/clearing";

export default function ClearingDashboard() {
  const [cases, setCases] = useState<MockCustomsCase[]>([]);
  const [selectedCase, setSelectedCase] = useState<MockCustomsCase | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCases() {
      try {
        const res = await ClearingService.getCustomsCases();
        if (res.data) {
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
        return "text-emerald-600 bg-emerald-50 border-emerald-100";
      case "pending":
        return "text-purple-600 bg-purple-50 border-purple-100 animate-pulse";
      case "open":
        return "text-blue-600 bg-blue-50 border-blue-100";
      case "held":
        return "text-red-600 bg-red-50 border-red-100";
      default:
        return "text-gray-600 bg-gray-50 border-gray-100";
    }
  };

  return (
    <div className="space-y-8">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight flex items-center space-x-3">
            <Globe className="h-8 w-8 text-primary-royal" />
            <span>DFS Customs Clearing & Compliance Hub</span>
          </h2>
          <p className="text-gray-500 mt-2 font-medium">
            Manage SAD500 customs declarations, tariff classifications, and border clearances for imports/exports.
          </p>
        </div>

        <Link 
          href="/clearing/documents"
          className="flex items-center justify-center space-x-2 px-5 py-3 bg-primary-royal hover:bg-primary-deep text-white font-extrabold rounded-xl text-sm transition shadow-lg w-full sm:w-auto"
        >
          <span>Upload SAD500</span>
          <ArrowRight className="h-4.5 w-4.5" />
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Active Border Filings</span>
            <span className="block text-3xl font-extrabold text-slate-800">{cases.filter(c => c.status !== "cleared").length}</span>
          </div>
          <div className="p-3.5 bg-blue-50 text-blue-500 rounded-xl">
            <Clock className="h-5 w-5" />
          </div>
        </div>

        <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Customs Cleared</span>
            <span className="block text-3xl font-extrabold text-slate-800">{cases.filter(c => c.status === "cleared").length}</span>
          </div>
          <div className="p-3.5 bg-emerald-50 text-emerald-500 rounded-xl">
            <CheckCircle2 className="h-5 w-5" />
          </div>
        </div>

        <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Compliance Rating</span>
            <span className="block text-3xl font-extrabold text-slate-800">100% Verified</span>
          </div>
          <div className="p-3.5 bg-gray-50 text-gray-500 rounded-xl">
            <ShieldCheck className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Main Console Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Hand: Customs Cases List (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-gray-100 shadow-sm rounded-2xl p-6 space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-gray-50">
            <h3 className="font-extrabold text-lg text-slate-800 flex items-center space-x-2">
              <Activity className="h-5 w-5 text-primary-royal" />
              <span>SADC Border Declarations</span>
            </h3>
            <div className="flex space-x-3 text-xs">
              <Link href="/clearing/imports" className="font-bold text-primary-royal hover:underline">Imports</Link>
              <span className="text-gray-300">|</span>
              <Link href="/clearing/exports" className="font-bold text-primary-royal hover:underline">Exports</Link>
            </div>
          </div>

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
                      ? "border-primary-royal bg-primary-royal/5" 
                      : "border-gray-100 hover:border-gray-200 bg-white"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-2 text-xs">
                        <span className="font-mono text-primary-royal font-bold">{c.caseNumber}</span>
                        <span className="text-gray-300">•</span>
                        <span className="text-gray-500 font-semibold">{c.cargoType}</span>
                      </div>
                      <p className="text-sm font-extrabold text-slate-800 mt-1">
                        Border Post: {c.borderPost}
                      </p>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase border ${getStatusColor(c.status)}`}>
                      {c.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-xs text-gray-400 py-6">No customs cases found.</p>
            )}
          </div>
        </div>

        {/* Right Hand: Border Clearance Checklist (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {selectedCase ? (
            <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <span className="text-[10px] text-primary-royal font-mono font-bold">{selectedCase.caseNumber}</span>
                <h3 className="text-lg font-black text-slate-800 mt-1">Clearance Checkpoints</h3>
                <p className="text-xs text-gray-500 mt-1">Filing status: <strong className="uppercase">{selectedCase.status}</strong></p>
              </div>

              {/* Progress Checklist */}
              <div className="space-y-4 text-xs font-semibold text-gray-600">
                {[
                  { label: "Filing & Documentation Uploaded", done: true },
                  { label: "SAD500 Custom Entry Lodged", done: true },
                  { label: "Border Customs Assessment", done: selectedCase.status === "cleared" },
                  { label: "Duties & Taxes Dispatched", done: selectedCase.status === "cleared" },
                  { label: "Customs Gate Release Issued", done: selectedCase.status === "cleared" }
                ].map((step, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <span className={`h-5 w-5 rounded-full flex items-center justify-center border ${
                      step.done 
                        ? "bg-emerald-50 border-emerald-200 text-emerald-500" 
                        : "bg-gray-50 border-gray-200 text-gray-400"
                    }`}>
                      {step.done ? "✓" : idx + 1}
                    </span>
                    <span className={step.done ? "text-gray-900 font-bold" : "text-gray-400 font-medium"}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-dashed border-gray-200 rounded-2xl p-10 text-center">
              <p className="text-gray-400 text-xs font-semibold">Select a border filing declaration to view customs checkpoint verification stages.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
