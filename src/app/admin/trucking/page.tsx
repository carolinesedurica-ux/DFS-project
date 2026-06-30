"use client";

import { useState, useEffect } from "react";
import { 
  Truck, 
  MapPin, 
  User, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Search,
  SlidersHorizontal,
  Box
} from "lucide-react";
import { TruckingService } from "@/services/trucking";
import { SHIPMENT_STATUS_LABELS } from "@/types/models";

export default function TruckingAdminDashboard() {
  const [shipments, setShipments] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(true);

  // New shipment dispatch state
  const [showDispatchModal, setShowDispatchModal] = useState(false);
  const [newShipment, setNewShipment] = useState({
    reference: "DFS-889-BOT",
    origin: "Gaborone Hub, Botswana",
    destination: "Martins Drift Border, SA",
    cargoType: "Bagged Ore link",
    weight: "36 MT",
    vehicle: "Scania G460 (Reg: B 118 AGH)",
    driverRef: "DRV-089",
    status: "booking_confirmed",
    estimatedArrival: "2026-07-02",
    customerReference: "MMM-PO-2026-0210"
  });

  useEffect(() => {
    async function loadShipments() {
      try {
        const res = await TruckingService.getShipments();
        if (res.data) {
          setShipments(res.data);
        }
      } catch (err) {
        console.error("Failed to load shipments:", err);
      } finally {
        setLoading(false);
      }
    }
    loadShipments();
  }, []);

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    const created = {
      ...newShipment,
      id: `shp-${Date.now()}`,
      lastUpdated: new Date().toISOString(),
      trackingEvents: []
    };
    setShipments([created, ...shipments]);
    setShowDispatchModal(false);
    // Reset reference to random number for next dispatch
    setNewShipment(prev => ({
      ...prev,
      reference: `DFS-${Math.floor(100 + Math.random() * 900)}-BOT`
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-emerald-950/40 text-emerald-400 border-emerald-500/20";
      case "in_transit":
        return "bg-blue-950/40 text-blue-400 border-blue-500/20";
      case "border_processing":
        return "bg-purple-950/40 text-purple-400 border-purple-500/20 animate-pulse";
      case "delayed":
        return "bg-red-950/40 text-red-400 border-red-500/20";
      default:
        return "bg-gray-800 text-gray-300 border-gray-700";
    }
  };

  const filteredShipments = shipments.filter(s => {
    const matchesSearch = 
      s.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.cargoType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || s.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-white flex items-center space-x-3">
            <Truck className="h-8 w-8 text-yellow-500" />
            <span>Trucking & Fleet Control</span>
          </h2>
          <p className="text-gray-400 mt-2 font-medium">
            Monitor corridor cargo dispatch, assign fleet assets, and track active heavy load operations.
          </p>
        </div>

        <button
          onClick={() => setShowDispatchModal(true)}
          className="flex items-center justify-center space-x-2 px-5 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-extrabold rounded-xl text-sm transition shadow-lg shadow-yellow-500/10 w-full sm:w-auto"
        >
          <Plus className="h-4.5 w-4.5 stroke-[3]" />
          <span>Dispatch New Cargo</span>
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Loads", val: shipments.filter(s => s.status !== "delivered").length, icon: Truck, color: "text-blue-400 bg-blue-500/10 border-blue-500/10" },
          { label: "Capacity Utilization", val: "94%", icon: SlidersHorizontal, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/10" },
          { label: "Transit Delays", val: shipments.filter(s => s.status === "delayed").length, icon: AlertCircle, color: "text-red-400 bg-red-500/10 border-red-500/10" },
          { label: "Delivered (Mtd)", val: shipments.filter(s => s.status === "delivered").length, icon: CheckCircle2, color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/10" },
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

      {/* Shipments List */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-6 border-b border-gray-800 bg-gray-900/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="font-bold text-lg text-white">Active Cargo Dispatches</h3>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search dispatch ref, route..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-950 border border-gray-800 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors"
              />
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full sm:w-auto px-4 py-2 bg-gray-950 border border-gray-800 rounded-xl text-xs text-white focus:outline-none focus:border-yellow-500 transition-colors"
            >
              <option value="all">All Statuses</option>
              <option value="booking_confirmed">Booking Confirmed</option>
              <option value="in_transit">In Transit</option>
              <option value="border_processing">Border Processing</option>
              <option value="customs_cleared">Customs Cleared</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-semibold text-gray-400">
            <thead className="bg-gray-950 text-gray-500 uppercase tracking-widest text-[10px] border-b border-gray-800">
              <tr>
                <th className="px-6 py-4">Reference</th>
                <th className="px-6 py-4">Route</th>
                <th className="px-6 py-4">Cargo & Weight</th>
                <th className="px-6 py-4">Vehicle & Driver</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Last Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                    Loading shipments...
                  </td>
                </tr>
              ) : filteredShipments.length > 0 ? (
                filteredShipments.map((s, idx) => (
                  <tr key={idx} className="hover:bg-gray-800/10 transition-colors text-white">
                    <td className="px-6 py-4 font-mono text-yellow-500">{s.reference}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-1">
                        <span>{s.origin.split(',')[0]}</span>
                        <span>➔</span>
                        <span>{s.destination.split(',')[0]}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-0.5">
                        <span className="block text-gray-200">{s.cargoType}</span>
                        <span className="block text-[10px] text-gray-500 font-bold">{s.weight}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-0.5 text-gray-300">
                        <div className="flex items-center space-x-1">
                          <Truck className="h-3.5 w-3.5 text-gray-500" />
                          <span>{s.vehicle.split('(')[0].trim()}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-[10px] text-gray-500">
                          <User className="h-3 w-3" />
                          <span>{s.driverRef}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase border ${getStatusColor(s.status)}`}>
                        {SHIPMENT_STATUS_LABELS[s.status as keyof typeof SHIPMENT_STATUS_LABELS] || s.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 font-medium">
                      {new Date(s.lastUpdated).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                    No shipments match the search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dispatch Cargo Modal */}
      {showDispatchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl p-6 space-y-5 animate-fade-in-up">
            <div className="flex justify-between items-center border-b border-gray-800 pb-4">
              <h4 className="text-lg font-bold text-white flex items-center space-x-2">
                <Box className="h-5 w-5 text-yellow-500" />
                <span>Dispatch Cargo Load</span>
              </h4>
              <button 
                onClick={() => setShowDispatchModal(false)}
                className="text-gray-400 hover:text-white text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleDispatch} className="space-y-4 text-xs font-semibold text-gray-300">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-gray-400 uppercase tracking-wider text-[10px]">Reference</label>
                  <input
                    type="text"
                    value={newShipment.reference}
                    readOnly
                    className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl text-yellow-500 font-mono focus:outline-none cursor-not-allowed"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-gray-400 uppercase tracking-wider text-[10px]">Cargo Type</label>
                  <input
                    type="text"
                    required
                    value={newShipment.cargoType}
                    onChange={(e) => setNewShipment({ ...newShipment, cargoType: e.target.value })}
                    placeholder="e.g. Copper Concentrate"
                    className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl text-white focus:outline-none focus:border-yellow-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-gray-400 uppercase tracking-wider text-[10px]">Origin</label>
                  <input
                    type="text"
                    required
                    value={newShipment.origin}
                    onChange={(e) => setNewShipment({ ...newShipment, origin: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl text-white focus:outline-none focus:border-yellow-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-gray-400 uppercase tracking-wider text-[10px]">Destination</label>
                  <input
                    type="text"
                    required
                    value={newShipment.destination}
                    onChange={(e) => setNewShipment({ ...newShipment, destination: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl text-white focus:outline-none focus:border-yellow-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-gray-400 uppercase tracking-wider text-[10px]">Weight</label>
                  <input
                    type="text"
                    required
                    value={newShipment.weight}
                    onChange={(e) => setNewShipment({ ...newShipment, weight: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl text-white focus:outline-none focus:border-yellow-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-gray-400 uppercase tracking-wider text-[10px]">Vehicle</label>
                  <input
                    type="text"
                    required
                    value={newShipment.vehicle}
                    onChange={(e) => setNewShipment({ ...newShipment, vehicle: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl text-white focus:outline-none focus:border-yellow-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-gray-400 uppercase tracking-wider text-[10px]">Driver ID</label>
                  <input
                    type="text"
                    required
                    value={newShipment.driverRef}
                    onChange={(e) => setNewShipment({ ...newShipment, driverRef: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl text-white focus:outline-none focus:border-yellow-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-gray-400 uppercase tracking-wider text-[10px]">Est Delivery Date</label>
                  <input
                    type="date"
                    required
                    value={newShipment.estimatedArrival}
                    onChange={(e) => setNewShipment({ ...newShipment, estimatedArrival: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl text-white focus:outline-none focus:border-yellow-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-yellow-500 hover:bg-yellow-400 text-black font-extrabold rounded-xl transition shadow-lg shadow-yellow-500/10 text-sm"
              >
                Confirm Cargo Dispatch
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
