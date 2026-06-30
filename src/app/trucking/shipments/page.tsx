"use client";

import { useState, useEffect } from "react";
import { Truck, Search, Calendar, Scale } from "lucide-react";
import { DEMO_SHIPMENTS } from "@/data/demo/shipments";
import type { Shipment } from "@/types/models";

export default function TruckingShipmentsPage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    setShipments(DEMO_SHIPMENTS);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "in_transit":
        return "bg-blue-50 text-blue-600 border-blue-100";
      case "border_processing":
        return "bg-purple-50 text-purple-600 border-purple-100 animate-pulse";
      case "delayed":
        return "bg-red-50 text-red-600 border-red-100";
      default:
        return "bg-gray-50 text-gray-600 border-gray-100";
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
      <div>
        <h2 className="text-3xl font-black text-primary-deep tracking-tight flex items-center space-x-3">
          <Truck className="h-8 w-8 text-accent-gold" />
          <span>Heavy Freight Consignments</span>
        </h2>
        <p className="text-gray-600 mt-2 font-medium">
          Comprehensive ledger of all dry bulk mineral and bagged cargo road shipments.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row items-center gap-4 bg-white border border-gray-100 shadow-sm p-4 rounded-2xl">
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search shipments by reference, route, cargo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm text-primary-deep placeholder-gray-400 focus:outline-none focus:border-accent-gold transition-colors"
          />
        </div>
        
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="w-full md:w-48 px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm text-primary-deep focus:outline-none focus:border-accent-gold transition-colors"
        >
          <option value="all">All Statuses</option>
          <option value="booking_confirmed">Booking Confirmed</option>
          <option value="in_transit">In Transit</option>
          <option value="border_processing">Border Processing</option>
          <option value="customs_cleared">Customs Cleared</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>

      {/* Shipments Table */}
      <div className="bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-semibold text-gray-500">
            <thead className="bg-gray-50 text-gray-400 uppercase tracking-widest text-[10px] border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Reference</th>
                <th className="px-6 py-4">Corridor Route</th>
                <th className="px-6 py-4">Cargo details</th>
                <th className="px-6 py-4">Vehicle Telemetry</th>
                <th className="px-6 py-4">Axle Load</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredShipments.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50/50 text-primary-deep">
                  <td className="px-6 py-4 font-mono font-bold text-primary-royal">{s.reference}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1 font-medium">
                      <span>{s.origin.split(',')[0]}</span>
                      <span>➔</span>
                      <span>{s.destination.split(',')[0]}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">{s.cargoType}</td>
                  <td className="px-6 py-4 text-gray-500 font-medium">{s.vehicle}</td>
                  <td className="px-6 py-4 font-extrabold text-primary-deep">{s.weight}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase border ${getStatusColor(s.status)}`}>
                      {s.status.replace('_', ' ')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
