"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Truck, Scale, ShieldAlert, FileText, CheckCircle2, Clock, MapPin, Sparkles, Mail } from "lucide-react";

export default function AdminPreview() {
  const [localRfqs, setLocalRfqs] = useState<any[]>([]);
  const [localEnquiries, setLocalEnquiries] = useState<any[]>([]);

  useEffect(() => {
    const rfqs = JSON.parse(localStorage.getItem("dfs_rfqs") || "[]");
    const enqs = JSON.parse(localStorage.getItem("dfs_enquiries") || "[]");
    setLocalRfqs(rfqs);
    setLocalEnquiries(enqs);
  }, []);

  const stats = [
    { label: "Active Corridor Fleets", value: "14", color: "text-primary-deep" },
    { label: "Border Dwell Alerts", value: "3", color: "text-red-500" },
    { label: "Pending RFQs", value: `${localRfqs.length + 4}`, color: "text-accent-gold" },
    { label: "Customer Messages", value: `${localEnquiries.length + 2}`, color: "text-tech-blue" }
  ];

  const borderStatuses = [
    { gate: "Martins Drift (SA / Botswana)", time: "6h dwell time", level: "high" },
    { gate: "Kazungula (Botswana / Zambia)", time: "2h dwell time", level: "normal" },
    { gate: "Beitbridge (SA / Zimbabwe)", time: "4h dwell time", level: "medium" },
    { gate: "Ramokgwebana (Botswana / Zim)", time: "1h dwell time", level: "normal" }
  ];

  const handleApproveRfq = (ref: string) => {
    // Update local state
    const updated = localRfqs.map(r => r.reference === ref ? { ...r, status: "Approved" } : r);
    setLocalRfqs(updated);
    
    // Save to localStorage
    const saved = JSON.parse(localStorage.getItem("dfs_rfqs") || "[]");
    const item = saved.find((r: any) => r.reference === ref);
    if (item) {
      item.status = "Approved";
      localStorage.setItem("dfs_rfqs", JSON.stringify(saved));
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Page Header */}
      <section className="bg-primary-deep text-white py-12 border-b border-accent-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[10px] text-accent-gold font-extrabold uppercase tracking-wider bg-accent-gold/10 px-2.5 py-1 rounded inline-block mb-1 border border-accent-gold/20">
            DFS-OS Dispatch Sandbox
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight">Admin Dashboard Preview</h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-light-bg flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Warning notice */}
          <div className="bg-charcoal text-white border border-white/10 rounded-xl p-5 flex items-start space-x-3 shadow-md relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(29,110,203,0.1)_0%,transparent_60%)]"></div>
            <Sparkles className="h-5 w-5 text-accent-gold flex-shrink-0 mt-0.5" />
            <div className="text-xs space-y-1 relative z-10">
              <span className="font-bold text-accent-gold uppercase block">DFS-OS Dispatch & Telemetry Console Mockup</span>
              <p className="text-white/80">
                This dashboard shows the future admin panel for DFS operators. Planners will approve customer RFQs, analyze axle load sensor data, geofence SADC corridors, and dispatch Scania and Volvo tipper units.
              </p>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white border border-gray-100 p-5 rounded-lg shadow-sm">
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.label}</span>
                <span className={`block text-2xl sm:text-3xl font-extrabold tracking-tight ${stat.color} mt-1`}>{stat.value}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left side: RFQs & Enquiries (8 cols) */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Dynamic Quote Approvals */}
              <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                  <h3 className="text-sm font-bold text-primary-deep uppercase tracking-wider flex items-center space-x-2">
                    <FileText className="h-4.5 w-4.5 text-accent-gold" />
                    <span>Pending Quote Requests ({localRfqs.filter(r => r.status === "Pending Review").length})</span>
                  </h3>
                  <Link href="/quote" className="text-xs text-primary-deep font-bold hover:underline">Submit Mock RFQ</Link>
                </div>

                <div className="divide-y divide-gray-100">
                  {localRfqs.map((rfq) => (
                    <div key={rfq.reference} className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs hover:bg-gray-50/50 transition-colors">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono font-bold text-primary-deep text-sm">{rfq.reference}</span>
                          <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase ${
                            rfq.status === "Approved" ? "bg-emerald-50 text-emerald-600 border border-emerald-200" : "bg-amber-50 text-accent-gold border border-accent-gold/20"
                          }`}>
                            {rfq.status}
                          </span>
                        </div>
                        <span className="block font-semibold text-charcoal">{rfq.shipment.cargoDescription} ({rfq.shipment.estimatedWeight})</span>
                        <span className="block text-gray-400">Route: {rfq.shipment.origin} → {rfq.shipment.destination}</span>
                        <span className="block text-[10px] text-gray-500">Contact: {rfq.customer.fullName} ({rfq.customer.email})</span>
                      </div>
                      
                      {rfq.status === "Pending Review" && (
                        <button
                          onClick={() => handleApproveRfq(rfq.reference)}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-bold transition-colors w-full sm:w-auto"
                        >
                          Approve Quote
                        </button>
                      )}
                    </div>
                  ))}

                  {localRfqs.length === 0 && (
                    <div className="p-8 text-center text-gray-400">
                      <p className="text-xs">No pending RFQs found in this browser session. Try creating one via the Request-a-Quote form.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Dynamic General Inquiries */}
              <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="text-sm font-bold text-primary-deep uppercase tracking-wider flex items-center space-x-2">
                    <Mail className="h-4.5 w-4.5 text-accent-gold" />
                    <span>Recent Customer Enquiries ({localEnquiries.length})</span>
                  </h3>
                </div>

                <div className="divide-y divide-gray-100">
                  {localEnquiries.map((enq) => (
                    <div key={enq.id} className="p-5 space-y-2 text-xs">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-bold text-primary-deep text-sm">{enq.fullName}</span>
                          <span className="block text-[10px] text-gray-400">{enq.companyName || "Private Enquiry"}</span>
                        </div>
                        <span className="text-[10px] text-gray-400">{enq.timestamp.slice(0, 10)}</span>
                      </div>
                      <p className="text-gray-600 bg-light-bg p-3 rounded leading-normal border border-gray-50 font-medium">
                        {enq.message}
                      </p>
                      <div className="flex items-center space-x-4 text-[10px] text-gray-400 font-bold uppercase">
                        <span>Hub: {enq.selectedHub}</span>
                        <span>•</span>
                        <span>Subject: {enq.subject}</span>
                      </div>
                    </div>
                  ))}

                  {localEnquiries.length === 0 && (
                    <div className="p-8 text-center text-gray-400">
                      <p className="text-xs">No customer enquiries submitted in this session. Try filling the contact form.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right side: Border Posts & Axle Monitors (4 cols) */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* SADC border post delays */}
              <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="text-sm font-bold text-primary-deep uppercase tracking-wider flex items-center space-x-2">
                    <Clock className="h-4.5 w-4.5 text-accent-gold" />
                    <span>SADC Border Queue Monitors</span>
                  </h3>
                </div>
                <div className="p-4 space-y-3.5">
                  {borderStatuses.map((b) => (
                    <div key={b.gate} className="flex justify-between items-center text-xs">
                      <div className="space-y-0.5">
                        <span className="block font-bold text-charcoal">{b.gate}</span>
                        <span className="block text-[10px] text-gray-400">{b.time}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase ${
                        b.level === "high" ? "bg-red-50 text-red-600 border border-red-200 animate-pulse" :
                        b.level === "medium" ? "bg-amber-50 text-accent-gold border border-accent-gold/20" :
                        "bg-emerald-50 text-emerald-600 border border-emerald-200"
                      }`}>
                        {b.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Fleet telemetry widgets */}
              <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="text-sm font-bold text-primary-deep uppercase tracking-wider flex items-center space-x-2">
                    <Truck className="h-4.5 w-4.5 text-accent-gold" />
                    <span>Vehicle Axle Monitors (GPS)</span>
                  </h3>
                </div>
                <div className="p-5 space-y-4 text-xs text-gray-600">
                  <div className="space-y-1.5">
                    <div className="flex justify-between font-bold">
                      <span>Volvo FH (Reg: B 345 ACD)</span>
                      <span className="text-emerald-600">38.0 MT (Compliant)</span>
                    </div>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full" style={{ width: "95%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between font-bold">
                      <span>Scania R460 (Reg: B 112 ADD)</span>
                      <span className="text-red-500">39.1 MT (Overweight)</span>
                    </div>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-red-500 h-full" style={{ width: "100%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
