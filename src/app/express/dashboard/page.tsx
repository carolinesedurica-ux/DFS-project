"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Package, Search, Clock, CheckCircle2, TrendingUp, ArrowRight, Play, FileText, Settings } from "lucide-react";
import { ExpressService, type MockParcel } from "@/services/express";

export default function ExpressDashboard() {
  const [parcels, setParcels] = useState<MockParcel[]>([]);
  const [loading, setLoading] = useState(true);
  const [trackingInput, setTrackingInput] = useState("");
  const [trackedParcel, setTrackedParcel] = useState<MockParcel | null>(null);

  useEffect(() => {
    async function loadParcels() {
      try {
        const res = await ExpressService.getParcels();
        if (res.data) {
          setParcels(res.data);
        }
      } catch (err) {
        console.error("Failed to load parcels:", err);
      } finally {
        setLoading(false);
      }
    }
    loadParcels();
  }, []);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const found = parcels.find(p => p.trackingNumber.toLowerCase() === trackingInput.trim().toLowerCase());
    setTrackedParcel(found || null);
    if (!found) alert("Tracking number not found in local consignment logs.");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "text-emerald-600 bg-emerald-50 border-emerald-100";
      case "transit":
        return "text-blue-600 bg-blue-50 border-blue-100";
      case "out_for_delivery":
        return "text-amber-600 bg-amber-50 border-amber-100 animate-pulse";
      default:
        return "text-gray-600 bg-gray-50 border-gray-100";
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center space-x-3">
            <Package className="h-8 w-8 text-primary-royal" />
            <span>DFS Courier Express Hub</span>
          </h2>
          <p className="text-gray-500 mt-2 font-medium">
            Book local next-day deliveries, calculate shipping rates, and track parcel consignment runs.
          </p>
        </div>

        <Link 
          href="/express/book"
          className="flex items-center justify-center space-x-2 px-5 py-3 bg-primary-royal hover:bg-primary-deep text-white font-extrabold rounded-xl text-sm transition shadow-lg w-full sm:w-auto"
        >
          <span>Book Collection</span>
          <ArrowRight className="h-4.5 w-4.5" />
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Active Deliveries</span>
            <span className="block text-3xl font-extrabold text-gray-900">{parcels.filter(p => p.status !== "delivered").length}</span>
          </div>
          <div className="p-3.5 bg-blue-50 text-blue-500 rounded-xl">
            <Clock className="h-5 w-5" />
          </div>
        </div>

        <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Delivered (MTD)</span>
            <span className="block text-3xl font-extrabold text-gray-900">{parcels.filter(p => p.status === "delivered").length}</span>
          </div>
          <div className="p-3.5 bg-emerald-50 text-emerald-500 rounded-xl">
            <CheckCircle2 className="h-5 w-5" />
          </div>
        </div>

        <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Average Transit Time</span>
            <span className="block text-3xl font-extrabold text-gray-900">18.2 Hrs</span>
          </div>
          <div className="p-3.5 bg-gray-50 text-gray-500 rounded-xl">
            <TrendingUp className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Main Content Splitting */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Hand: Consignments Ledger (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-gray-100 shadow-sm rounded-2xl p-6 space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-gray-50">
            <h3 className="font-extrabold text-lg text-gray-900 flex items-center space-x-2">
              <Package className="h-5 w-5 text-primary-royal" />
              <span>Current Consignments</span>
            </h3>
            <Link href="/express/history" className="text-xs text-primary-royal font-bold flex items-center space-x-1 hover:text-accent-gold">
              <span>Delivery Logs</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="space-y-4">
            {loading ? (
              <p className="text-center text-xs text-gray-400 py-6">Loading consignments...</p>
            ) : parcels.length > 0 ? (
              parcels.map((p) => (
                <div 
                  key={p.id}
                  onClick={() => setTrackedParcel(p)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    trackedParcel?.id === p.id 
                      ? "border-primary-royal bg-primary-royal/5" 
                      : "border-gray-100 hover:border-gray-200 bg-white"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-2 text-xs">
                        <span className="font-mono text-primary-royal font-bold">{p.trackingNumber}</span>
                        <span className="text-gray-300">•</span>
                        <span className="text-gray-500 font-semibold">{p.senderName} ➔ {p.receiverName}</span>
                      </div>
                      <p className="text-sm font-extrabold text-gray-900 mt-1">
                        Dest: {p.destination} | {p.weight} ({p.serviceType})
                      </p>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase border ${getStatusColor(p.status)}`}>
                      {p.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-xs text-gray-400 py-6">No express consignments found.</p>
            )}
          </div>
        </div>

        {/* Right Hand: Consignment Tracker Detail (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Quick tracker form */}
          <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 space-y-4">
            <h3 className="font-extrabold text-gray-900 text-base">Quick Consignment Tracer</h3>
            <form onSubmit={handleTrack} className="flex gap-2">
              <input
                type="text"
                required
                value={trackingInput}
                onChange={(e) => setTrackingInput(e.target.value)}
                placeholder="Enter DFS-EXP-XXXXXX"
                className="flex-grow px-3 py-2 bg-gray-50 border border-gray-150 rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary-royal transition-colors"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary-royal hover:bg-primary-deep text-white text-xs font-bold rounded-xl shadow-sm transition"
              >
                Trace
              </button>
            </form>

            {trackedParcel && (
              <div className="border-t border-gray-100 pt-4 space-y-4 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span className="font-bold text-gray-400">Consignment Number</span>
                  <span className="font-mono font-extrabold text-primary-royal">{trackedParcel.trackingNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-gray-400">Delivery Status</span>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold border uppercase ${getStatusColor(trackedParcel.status)}`}>
                    {trackedParcel.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-gray-400">Recipient Details</span>
                  <span className="font-semibold text-gray-900">{trackedParcel.receiverName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-gray-400">Destination Location</span>
                  <span className="font-semibold text-gray-950">{trackedParcel.destination}</span>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
