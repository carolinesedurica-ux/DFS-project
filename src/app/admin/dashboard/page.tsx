"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Truck, 
  Clock, 
  FileText, 
  Users, 
  MapPin, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  ArrowRight,
  TrendingUp,
  Activity
} from "lucide-react";
import { AdminService, type MockAccessRequest } from "@/services/admin";
import { TruckingService } from "@/services/trucking";
import { ClearingService } from "@/services/clearing";
import { ExpressService } from "@/services/express";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    shipments: 0,
    cases: 0,
    parcels: 0,
    users: 0
  });

  const [accessRequests, setAccessRequests] = useState<MockAccessRequest[]>([]);
  const [loading, setLoading] = useState(true);

  // border queue mock data
  const borderStatuses = [
    { gate: "Martins Drift (SA / Botswana)", time: "6h dwell time", level: "high" },
    { gate: "Kazungula (Botswana / Zambia)", time: "2h dwell time", level: "normal" },
    { gate: "Beitbridge (SA / Zimbabwe)", time: "4h dwell time", level: "medium" },
    { gate: "Ramokgwebana (Botswana / Zim)", time: "1h dwell time", level: "normal" }
  ];

  // vehicle load compliance mock telemetry
  const vehicles = [
    { reg: "B 345 ACD", driver: "Jacob Molefe", cargo: "Copper Concentrates", weight: "38.0 MT", status: "Compliant", color: "text-emerald-400" },
    { reg: "B 112 ADD", driver: "Pule Kebalepile", cargo: "Bagged Cement", weight: "39.1 MT", status: "Overweight", color: "text-red-400" },
    { reg: "B 210 ACE", driver: "Mpho Ndlovu", cargo: "Steel Beams", weight: "34.0 MT", status: "Compliant", color: "text-emerald-400" }
  ];

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [shipmentRes, casesRes, parcelRes, usersRes, reqRes] = await Promise.all([
          TruckingService.getShipments(),
          ClearingService.getCustomsCases(),
          ExpressService.getParcels(),
          AdminService.getAllUsers(),
          AdminService.getAccessRequests()
        ]);

        setStats({
          shipments: shipmentRes.data?.length || 0,
          cases: casesRes.data?.length || 0,
          parcels: parcelRes.data?.length || 0,
          users: usersRes.data?.length || 0
        });

        // Get only pending access requests
        if (reqRes.data) {
          setAccessRequests(reqRes.data.filter(r => r.status === "pending"));
        }
      } catch (err) {
        console.error("Error loading dashboard metrics:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  const handleActionRequest = async (id: string, status: "approved" | "rejected") => {
    try {
      await AdminService.updateAccessRequestStatus(id, status);
      // Re-load requests
      const reqRes = await AdminService.getAccessRequests();
      if (reqRes.data) {
        setAccessRequests(reqRes.data.filter(r => r.status === "pending"));
      }
    } catch (err) {
      console.error("Failed to update access request:", err);
    }
  };

  const statCards = [
    { label: "Active Corridor Fleets", value: stats.shipments, icon: Truck, href: "/admin/trucking", color: "from-blue-600/20 to-cyan-600/10", border: "border-blue-500/20", iconColor: "text-blue-400" },
    { label: "Active Customs Cases", value: stats.cases, icon: Clock, href: "/admin/clearing", color: "from-purple-600/20 to-pink-600/10", border: "border-purple-500/20", iconColor: "text-purple-400" },
    { label: "Express Consignments", value: stats.parcels, icon: FileText, href: "/admin/express", color: "from-amber-600/20 to-orange-600/10", border: "border-amber-500/20", iconColor: "text-amber-400" },
    { label: "Total Portal Users", value: stats.users, icon: Users, href: "/admin/users", color: "from-emerald-600/20 to-teal-600/10", border: "border-emerald-500/20", iconColor: "text-emerald-400" }
  ];

  return (
    <div className="space-y-8">
      {/* Title Header */}
      <div>
        <h2 className="text-3xl font-black text-white tracking-tight flex items-center space-x-3">
          <Activity className="h-8 w-8 text-yellow-500 animate-pulse" />
          <span>DFS Operations Control Tower</span>
        </h2>
        <p className="text-gray-400 mt-2 font-medium">
          Unified dispatcher console monitoring fleet movement, border queue statuses, and portal client access.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card, i) => (
          <Link 
            key={i} 
            href={card.href}
            className={`block p-6 rounded-2xl bg-gradient-to-br ${card.color} border ${card.border} hover:scale-[1.02] transition-transform duration-150 relative overflow-hidden group`}
          >
            <div className="absolute top-0 right-0 p-4 translate-x-3 -translate-y-3 opacity-10 group-hover:scale-110 group-hover:opacity-20 transition-all">
              <card.icon className="h-28 w-28 text-white" />
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{card.label}</span>
              <card.icon className={`h-6 w-6 ${card.iconColor}`} />
            </div>
            
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-extrabold text-white tracking-tight">{card.value}</span>
              <span className="text-xs text-green-400 font-bold flex items-center">
                <TrendingUp className="h-3 w-3 mr-0.5" />
                +12%
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Main Split Console Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side (8 columns): Access Requests and Live Vehicle Monitors */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Pending Access Requests */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-6 border-b border-gray-800 bg-gray-900/50 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-yellow-500" />
                <h3 className="font-bold text-lg text-white">Pending Portal Access Requests</h3>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-xs font-bold">
                {accessRequests.length} Pending
              </span>
            </div>

            <div className="divide-y divide-gray-800/60">
              {accessRequests.length > 0 ? (
                accessRequests.map((req) => (
                  <div key={req.id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-gray-800/20 transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-white text-base">{req.fullName}</span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-sm font-semibold text-yellow-500">{req.companyName}</span>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400 font-medium">
                        <span>Position: {req.position}</span>
                        <span>Email: {req.email}</span>
                        <span>Phone: {req.phone}</span>
                      </div>
                      <span className="block text-[10px] text-gray-500">Submitted: {new Date(req.submittedAt).toLocaleDateString()}</span>
                    </div>

                    <div className="flex items-center space-x-2 w-full md:w-auto">
                      <button
                        onClick={() => handleActionRequest(req.id, "approved")}
                        className="flex-1 md:flex-none flex items-center justify-center space-x-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition"
                      >
                        <CheckCircle className="h-4 w-4" />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => handleActionRequest(req.id, "rejected")}
                        className="flex-1 md:flex-none flex items-center justify-center space-x-1.5 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-xl text-xs font-bold border border-red-500/20 transition"
                      >
                        <XCircle className="h-4 w-4" />
                        <span>Reject</span>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-10 text-center text-gray-500">
                  <p className="text-sm font-medium">No pending portal access requests at the moment.</p>
                </div>
              )}
            </div>
          </div>

          {/* Vehicle Load Compliance */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-6 border-b border-gray-800 bg-gray-900/50 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <Truck className="h-5 w-5 text-yellow-500" />
                <h3 className="font-bold text-lg text-white">Vehicle Axle Monitors (GPS Telemetry)</h3>
              </div>
              <Link href="/admin/tracking" className="text-xs text-yellow-500 hover:text-yellow-400 font-bold flex items-center space-x-1">
                <span>View Full Map</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="p-6 space-y-5">
              {vehicles.map((v, i) => (
                <div key={i} className="bg-gray-950 p-4 border border-gray-800/60 rounded-xl space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <div>
                      <span className="font-extrabold text-sm text-white block">{v.reg}</span>
                      <span className="text-gray-400 font-medium">Driver: {v.driver} | Cargo: {v.cargo}</span>
                    </div>
                    <div className="text-right">
                      <span className={`font-bold block ${v.color}`}>{v.weight}</span>
                      <span className="text-gray-500 font-bold uppercase tracking-wider text-[10px]">{v.status}</span>
                    </div>
                  </div>

                  <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${v.status === "Overweight" ? "bg-red-500" : "bg-emerald-500"}`} 
                      style={{ width: v.status === "Overweight" ? "100%" : "85%" }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>

        {/* Right Side (4 columns): Border Post Delays */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Border Queue Status */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-6 border-b border-gray-800 bg-gray-900/50 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-yellow-500" />
                <h3 className="font-bold text-lg text-white">SADC Border Queues</h3>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              {borderStatuses.map((border, i) => (
                <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-gray-950/40 border border-gray-800/40 text-xs">
                  <div className="space-y-1">
                    <span className="block font-bold text-white">{border.gate}</span>
                    <span className="block text-[10px] text-gray-400 font-semibold">{border.time}</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded text-[9px] font-extrabold uppercase border ${
                    border.level === "high" 
                      ? "bg-red-950/40 text-red-400 border-red-500/20 animate-pulse" 
                      : border.level === "medium" 
                        ? "bg-amber-950/40 text-amber-400 border-amber-500/20" 
                        : "bg-emerald-950/40 text-emerald-400 border-emerald-500/20"
                  }`}>
                    {border.level}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Core Operations Warnings */}
          <div className="p-5 rounded-2xl border border-red-500/10 bg-red-950/5 text-xs text-red-200 space-y-3">
            <h4 className="font-bold flex items-center text-red-400 text-sm">
              <AlertTriangle className="h-4.5 w-4.5 mr-2" />
              Active System Warnings
            </h4>
            <ul className="list-disc pl-4 space-y-1.5 font-medium text-red-300/80">
              <li>High border dwell time detected at Martins Drift (SA Inbound corridor).</li>
              <li>Vehicle load limit telemetry breach reported for Scania R460 `B 112 ADD`.</li>
              <li>Customs declarations verification required for Waybill `DFS-102-BOT`.</li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}
