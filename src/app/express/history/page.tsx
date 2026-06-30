"use client";

import { useState, useEffect } from "react";
import { Package, Search } from "lucide-react";
import { ExpressService, type MockParcel } from "@/services/express";

export default function ExpressHistoryPage() {
  const [parcels, setParcels] = useState<MockParcel[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function loadParcels() {
      const res = await ExpressService.getParcels();
      if (res.data) setParcels(res.data);
    }
    loadParcels();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "text-emerald-600 bg-emerald-50 border-emerald-100";
      case "transit":
        return "text-blue-600 bg-blue-50 border-blue-100";
      case "out_for_delivery":
        return "text-amber-600 bg-amber-50 border-amber-100";
      default:
        return "text-gray-600 bg-gray-50 border-gray-100";
    }
  };

  const filtered = parcels.filter(p => 
    p.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.receiverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.senderName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center space-x-3">
          <Package className="h-8 w-8 text-primary-royal" />
          <span>Consignment History Logs</span>
        </h2>
        <p className="text-gray-500 mt-2 font-medium">
          Historical registry of local courier shipments, signed waybills, and delivery dates.
        </p>
      </div>

      <div className="relative w-full">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by tracking number, sender, receiver..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-150 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary-royal transition-colors shadow-sm"
        />
      </div>

      <div className="bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-semibold text-gray-500">
            <thead className="bg-gray-50 text-gray-400 uppercase tracking-widest text-[10px] border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Consignment ID</th>
                <th className="px-6 py-4">Sender / Receiver</th>
                <th className="px-6 py-4">Destination</th>
                <th className="px-6 py-4">Weight</th>
                <th className="px-6 py-4">Service</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/50 text-gray-900">
                  <td className="px-6 py-4 font-mono font-bold text-primary-royal">{p.trackingNumber}</td>
                  <td className="px-6 py-4">
                    <div className="space-y-0.5 font-medium">
                      <span className="block text-gray-900">{p.senderName}</span>
                      <span className="block text-[10px] text-gray-400 font-bold">To: {p.receiverName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 font-medium">{p.destination}</td>
                  <td className="px-6 py-4 text-gray-600 font-bold">{p.weight}</td>
                  <td className="px-6 py-4 text-gray-500 font-medium">{p.serviceType}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase border ${getStatusColor(p.status)}`}>
                      {p.status}
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
