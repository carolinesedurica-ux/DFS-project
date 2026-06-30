"use client";

import { useState, useEffect } from "react";
import { 
  Package, 
  Clock, 
  CheckCircle2, 
  MapPin, 
  Activity, 
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Tag,
  Search
} from "lucide-react";
import { ExpressService, type MockParcel } from "@/services/express";

export default function ExpressAdminDashboard() {
  const [parcels, setParcels] = useState<MockParcel[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Hub efficiency mock metrics
  const hubs = [
    { name: "Gaborone Central Hub", workload: 88, status: "Normal", loadColor: "bg-emerald-500" },
    { name: "Francistown West Hub", workload: 42, status: "Normal", loadColor: "bg-emerald-500" },
    { name: "Maun Distribution Point", workload: 92, status: "High Workload", loadColor: "bg-amber-500" }
  ];

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

  const handleUpdateStatus = (id: string, newStatus: MockParcel["status"]) => {
    const updated = parcels.map(p => p.id === id ? { ...p, status: newStatus, lastUpdated: new Date().toISOString() } : p);
    setParcels(updated);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-emerald-950/40 text-emerald-400 border-emerald-500/20";
      case "out_for_delivery":
        return "bg-amber-950/40 text-amber-400 border-amber-500/20 animate-pulse";
      case "transit":
        return "bg-blue-950/40 text-blue-400 border-blue-500/20";
      case "held":
        return "bg-red-950/40 text-red-400 border-red-500/20";
      default:
        return "bg-gray-800 text-gray-300 border-gray-700";
    }
  };

  const getServiceColor = (service: string) => {
    switch (service) {
      case "Next Day Express":
        return "text-amber-400 bg-amber-500/10";
      case "Priority Document":
        return "text-red-400 bg-red-500/10";
      default:
        return "text-blue-400 bg-blue-500/10";
    }
  };

  const filteredParcels = parcels.filter(p => {
    return (
      p.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.senderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.receiverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.destination.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-black tracking-tight text-white flex items-center space-x-3">
          <Package className="h-8 w-8 text-yellow-500" />
          <span>Express & Parcel Logistics</span>
        </h2>
        <p className="text-gray-400 mt-2 font-medium">
          Oversee high-priority documents, parcel delivery tiers, and regional hub processing performance.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Parcels", val: parcels.filter(p => p.status !== "delivered").length, icon: Package, color: "text-blue-400 bg-blue-500/10 border-blue-500/10" },
          { label: "Out For Delivery", val: parcels.filter(p => p.status === "out_for_delivery").length, icon: MapPin, color: "text-amber-400 bg-amber-500/10 border-amber-500/10" },
          { label: "Delivered (Today)", val: parcels.filter(p => p.status === "delivered").length, icon: CheckCircle2, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/10" },
          { label: "Dwell Time (Avg)", val: "1.4 hours", icon: Clock, color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/10" },
        ].map((item, idx) => (
          <div key={idx} className={`p-5 rounded-2xl bg-gray-900 border ${item.color.split(' ')[2]} flex items-center justify-between`}>
            <div className="space-y-1">
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">{item.label}</span>
              <span className="block text-2xl font-extrabold tracking-tight text-white">{item.val}</span>
            </div>
            <div className={`p-3 rounded-xl ${item.color.split(' ')[1]} ${item.color.split(' ')[0]}`}>
              <item.icon className="h-5 w-5" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side (8 columns): Parcels Table */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-6 border-b border-gray-800 bg-gray-900/50 flex flex-col sm:flex-row md:items-center justify-between gap-4">
              <h3 className="font-bold text-lg text-white">Consignment Tracking Board</h3>
              
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search tracking number, receiver..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-gray-950 border border-gray-800 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-semibold text-gray-400">
                <thead className="bg-gray-950 text-gray-500 uppercase tracking-widest text-[10px] border-b border-gray-800">
                  <tr>
                    <th className="px-6 py-4">Tracking ID</th>
                    <th className="px-6 py-4">Route Details</th>
                    <th className="px-6 py-4">Service Level</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/50">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-10 text-center text-gray-500">Loading parcels...</td>
                    </tr>
                  ) : filteredParcels.length > 0 ? (
                    filteredParcels.map((p, i) => (
                      <tr key={i} className="hover:bg-gray-800/10 transition-colors text-white">
                        <td className="px-6 py-4">
                          <div className="space-y-0.5">
                            <span className="block font-mono text-yellow-500 text-sm">{p.trackingNumber}</span>
                            <span className="block text-[10px] text-gray-500 font-bold">Weight: {p.weight}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-0.5">
                            <span className="block text-gray-200">From: {p.senderName}</span>
                            <span className="block text-[10px] text-gray-400">To: {p.receiverName} ({p.destination.split(',')[0]})</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-lg text-[9px] font-bold ${getServiceColor(p.serviceType)}`}>
                            {p.serviceType}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase border ${getStatusColor(p.status)}`}>
                            {p.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-1">
                            {p.status === "transit" && (
                              <button
                                onClick={() => handleUpdateStatus(p.id, "out_for_delivery")}
                                className="px-2 py-1 bg-yellow-500 hover:bg-yellow-400 text-black rounded text-[10px] font-bold transition"
                              >
                                Out for Delivery
                              </button>
                            )}
                            {p.status === "out_for_delivery" && (
                              <button
                                onClick={() => handleUpdateStatus(p.id, "delivered")}
                                className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-bold transition"
                              >
                                Complete
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-10 text-center text-gray-500">No parcels match the search query.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Side (4 columns): Hub Processing Workloads */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Hub monitor */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-6 border-b border-gray-800 bg-gray-900/50">
              <h3 className="font-bold text-lg text-white flex items-center space-x-2">
                <Activity className="h-5 w-5 text-yellow-500" />
                <span>Regional Hub Workloads</span>
              </h3>
            </div>

            <div className="p-6 space-y-5">
              {hubs.map((hub, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white">{hub.name}</span>
                    <span className="text-gray-400 font-bold">{hub.workload}% Capacity</span>
                  </div>

                  <div className="w-full bg-gray-800 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${hub.loadColor}`} 
                      style={{ width: `${hub.workload}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center text-[10px] font-bold text-gray-500">
                    <span>Performance Target: 98%</span>
                    <span className={hub.status === "High Workload" ? "text-yellow-400 animate-pulse" : "text-emerald-400"}>
                      {hub.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
