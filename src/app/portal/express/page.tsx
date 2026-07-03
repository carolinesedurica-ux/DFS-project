"use client";

import { useState, useEffect } from "react";
import { Package, Search, Plus, Clock, CheckCircle2, TrendingUp, ArrowRight } from "lucide-react";
import { ExpressService, type MockParcel } from "@/services/express";

export default function PortalExpressPage() {
  const [parcels, setParcels] = useState<MockParcel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Booking Form State
  const [newParcel, setNewParcel] = useState({
    receiverName: "",
    destination: "",
    weight: "",
    serviceType: "Next Day Express" as const
  });

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

  const handleBookPickup = (e: React.FormEvent) => {
    e.preventDefault();
    const created: MockParcel = {
      id: `prc-${Date.now()}`,
      trackingNumber: `DFS-EXP-${Math.floor(100000 + Math.random() * 900000)}`,
      senderName: "Mmamashia Mining (Pty) Ltd", // Mock active customer company
      receiverName: newParcel.receiverName,
      destination: newParcel.destination,
      status: "transit",
      weight: newParcel.weight ? `${newParcel.weight} kg` : "1.0 kg",
      serviceType: newParcel.serviceType,
      lastUpdated: new Date().toISOString()
    };
    setParcels([created, ...parcels]);
    setNewParcel({ receiverName: "", destination: "", weight: "", serviceType: "Next Day Express" });
    alert(`Collection scheduled! Consignment Number: ${created.trackingNumber}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "text-emerald-400 bg-emerald-950/40 border-emerald-500/20";
      case "transit":
        return "text-blue-400 bg-blue-950/40 border-blue-500/20";
      case "out_for_delivery":
        return "text-amber-400 bg-amber-950/40 border-amber-500/20 animate-pulse";
      default:
        return "text-gray-400 bg-gray-800 border-gray-700";
    }
  };

  const filteredParcels = parcels.filter(p => 
    p.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.receiverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Title Header */}
      <div>
        <h2 className="text-3xl font-black text-white tracking-tight flex items-center space-x-3">
          <Package className="h-8 w-8 text-accent-gold" />
          <span>DFS Express Courier Hub</span>
        </h2>
        <p className="text-gray-400 mt-2 font-medium">
          Schedule local courier deliveries, view historical transit runs, and check parcel POD signatures.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-6 bg-primary-deep border border-accent-gold/20 rounded-2xl shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Courier Packages</span>
            <span className="block text-3xl font-extrabold text-white">{parcels.filter(p => p.status !== "delivered").length}</span>
          </div>
          <div className="p-3.5 bg-blue-500/10 text-blue-400 rounded-xl">
            <Clock className="h-5 w-5" />
          </div>
        </div>

        <div className="p-6 bg-primary-deep border border-accent-gold/20 rounded-2xl shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Delivered (POD Verified)</span>
            <span className="block text-3xl font-extrabold text-white">{parcels.filter(p => p.status === "delivered").length}</span>
          </div>
          <div className="p-3.5 bg-emerald-500/10 text-emerald-400 rounded-xl">
            <CheckCircle2 className="h-5 w-5" />
          </div>
        </div>

        <div className="p-6 bg-primary-deep border border-accent-gold/20 rounded-2xl shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Average Transit speed</span>
            <span className="block text-3xl font-extrabold text-white">18.5 Hrs</span>
          </div>
          <div className="p-3.5 bg-gray-500/10 text-gray-400 rounded-xl">
            <TrendingUp className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Main Console Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Parcel Ledger List (7 cols) */}
        <div className="lg:col-span-7 bg-primary-deep border border-accent-gold/20 rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-accent-gold/10 gap-4">
            <h3 className="font-extrabold text-lg text-white flex items-center space-x-2">
              <Package className="h-5 w-5 text-accent-gold" />
              <span>Consignments Ledger</span>
            </h3>

            <div className="relative w-full sm:w-60">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search tracking #, recipient..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-primary-black border border-accent-gold/20 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-accent-gold transition-colors"
              />
            </div>
          </div>

          <div className="space-y-4">
            {loading ? (
              <p className="text-center text-xs text-gray-400 py-6">Loading courier logs...</p>
            ) : filteredParcels.length > 0 ? (
              filteredParcels.map((p) => (
                <div 
                  key={p.id}
                  className="p-4 rounded-xl border border-accent-gold/5 bg-primary-black/20 hover:border-accent-gold/25 transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-2 text-xs">
                        <span className="font-mono text-accent-gold font-bold">{p.trackingNumber}</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-400 font-semibold">{p.serviceType}</span>
                      </div>
                      <p className="text-sm font-extrabold text-white mt-1">
                        Dest: {p.destination}
                      </p>
                      <p className="text-[10px] text-gray-500 mt-0.5">
                        Receiver: {p.receiverName} | Weight: {p.weight}
                      </p>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase border ${getStatusColor(p.status)}`}>
                      {p.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-xs text-gray-500 py-6">No courier consignments matching query.</p>
            )}
          </div>
        </div>

        {/* Right Side: Collection Booking form (5 cols) */}
        <div className="lg:col-span-5 bg-primary-deep border border-accent-gold/20 rounded-2xl p-6 space-y-4 sticky top-24">
          <h3 className="font-extrabold text-white text-lg border-b border-accent-gold/10 pb-3 flex items-center space-x-2">
            <span>Schedule Courier Collection</span>
          </h3>

          <form onSubmit={handleBookPickup} className="space-y-4 text-xs font-semibold text-gray-300">
            <div className="space-y-1.5">
              <label className="block text-gray-400 uppercase tracking-wider text-[9px]">Receiver Name</label>
              <input
                type="text"
                required
                value={newParcel.receiverName}
                onChange={(e) => setNewParcel({ ...newParcel, receiverName: e.target.value })}
                placeholder="e.g. Apex Builders Depot"
                className="w-full px-4 py-3 bg-primary-black border border-accent-gold/20 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-accent-gold transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-gray-400 uppercase tracking-wider text-[9px]">Destination Address</label>
              <input
                type="text"
                required
                value={newParcel.destination}
                onChange={(e) => setNewParcel({ ...newParcel, destination: e.target.value })}
                placeholder="e.g. Francistown, Botswana"
                className="w-full px-4 py-3 bg-primary-black border border-accent-gold/20 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-accent-gold transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-gray-400 uppercase tracking-wider text-[9px]">Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={newParcel.weight}
                  onChange={(e) => setNewParcel({ ...newParcel, weight: e.target.value })}
                  placeholder="e.g. 4.5"
                  className="w-full px-4 py-3 bg-primary-black border border-accent-gold/20 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-accent-gold transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-gray-400 uppercase tracking-wider text-[9px]">Service Tier</label>
                <select
                  value={newParcel.serviceType}
                  onChange={(e) => setNewParcel({ ...newParcel, serviceType: e.target.value as any })}
                  className="w-full px-4 py-3 bg-primary-black border border-accent-gold/20 rounded-xl text-white focus:outline-none focus:border-accent-gold transition-colors"
                >
                  <option value="Next Day Express">Next Day Express</option>
                  <option value="Standard Delivery">Standard Delivery</option>
                  <option value="Priority Document">Priority Document</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 gold-gradient text-primary-deep font-extrabold rounded-xl transition shadow-lg shadow-accent-gold/10 text-sm flex items-center justify-center space-x-2"
            >
              <span>Schedule Pickup</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
