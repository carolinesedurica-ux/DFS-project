"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Folder, Clock, Bell, Plus, FileText, UserCheck, ShieldAlert, Sparkles, HelpCircle } from "lucide-react";

export default function PortalPreview() {
  const [localRfqs, setLocalRfqs] = useState<any[]>([]);
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    const rfqs = JSON.parse(localStorage.getItem("dfs_rfqs") || "[]");
    setLocalRfqs(rfqs);
  }, []);

  const activeCargos = [
    { ref: "DFS-102-BOT", cargo: "Copper Concentrate", weight: "38 MT", status: "Border Transit", eta: "2026-06-28", route: "JHB → Gaborone" },
    { ref: "DFS-789-ZIM", cargo: "Bagged Cement", weight: "36 MT", status: "Customs Cleared", eta: "2026-06-27", route: "Gaborone → Harare" }
  ];

  const mockDocuments = [
    { name: "Waybill-DFS-789.pdf", type: "Waybill", date: "2026-06-25", size: "320 KB" },
    { name: "CustomsDeclaration-RAM-112.pdf", type: "Customs Form", date: "2026-06-25", size: "1.4 MB" },
    { name: "WeightCert-JHB-908.pdf", type: "Weight Certificate", date: "2026-06-24", size: "480 KB" }
  ];

  const handleRequestAccess = () => {
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 3000);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Page Header */}
      <section className="bg-primary-deep text-white py-12 border-b border-accent-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="text-[10px] text-accent-gold font-extrabold uppercase tracking-wider bg-accent-gold/10 px-2.5 py-1 rounded inline-block mb-1 border border-accent-gold/20">
              DFS-OS Portal Sandbox
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight">Customer Portal Preview</h1>
          </div>
          <button
            onClick={handleRequestAccess}
            className="px-5 py-2.5 bg-accent-gold text-primary-deep hover:bg-accent-hover rounded text-sm font-bold shadow-sm transition-all"
          >
            {successMsg ? "Access Requested!" : "Request Early Live Access"}
          </button>
        </div>
      </section>

      {/* Main Dashboard preview grid */}
      <section className="py-12 bg-light-bg flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header Warning Banner */}
          <div className="bg-primary-deep text-white border border-accent-gold/20 rounded-xl p-5 flex items-start space-x-3 shadow-md relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
            <Sparkles className="h-5 w-5 text-accent-gold flex-shrink-0 mt-0.5 relative z-10" />
            <div className="text-xs relative z-10 space-y-1">
              <span className="font-bold text-accent-gold uppercase block">DFS-OS Customer Dashboard Mockup</span>
              <p className="text-white/80">
                This is a preview of the upcoming Customer Portal. Here, logistics managers will review real-time axle logs, verify HS Tariff codes, download clearing bills, and request dedications.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Block: Cargo List & Quote Histories (8 cols) */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Active Shipments Card */}
              <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                  <h3 className="text-sm font-bold text-primary-deep uppercase tracking-wider flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-accent-gold" />
                    <span>Active Cargo Shipments (2)</span>
                  </h3>
                  <Link href="/track" className="text-xs text-primary-deep hover:underline font-bold">Track Simulator</Link>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100 font-bold text-gray-400">
                        <th className="p-4">Cargo Ref</th>
                        <th className="p-4">Commodity</th>
                        <th className="p-4">Route Lanes</th>
                        <th className="p-4">Status Milestone</th>
                        <th className="p-4 text-right">Target ETA</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-charcoal font-medium">
                      {activeCargos.map((c) => (
                        <tr key={c.ref} className="hover:bg-gray-50/50">
                          <td className="p-4 font-mono font-bold text-primary-deep">
                            <Link href={`/track?id=${c.ref}`} className="hover:underline">{c.ref}</Link>
                          </td>
                          <td className="p-4">{c.cargo} ({c.weight})</td>
                          <td className="p-4">{c.route}</td>
                          <td className="p-4">
                            <span className="bg-amber-50 text-accent-gold border border-accent-gold/20 px-2 py-0.5 rounded text-[10px] font-bold">
                              {c.status}
                            </span>
                          </td>
                          <td className="p-4 text-right text-gray-500">{c.eta}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Submitted RFQs (localStorage integration) */}
              <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                  <h3 className="text-sm font-bold text-primary-deep uppercase tracking-wider flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-accent-gold" />
                    <span>Submitted Quotation Requests ({localRfqs.length})</span>
                  </h3>
                  <Link href="/quote" className="text-xs bg-primary-deep hover:bg-primary-light text-white px-2.5 py-1 rounded font-bold flex items-center space-x-1">
                    <Plus className="h-3.5 w-3.5" />
                    <span>Create Request</span>
                  </Link>
                </div>

                {localRfqs.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {localRfqs.map((rfq) => (
                      <div key={rfq.reference} className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
                        <div>
                          <span className="font-mono font-bold text-primary-deep text-sm">{rfq.reference}</span>
                          <span className="block text-gray-500 font-semibold mt-0.5">{rfq.shipment.cargoDescription} ({rfq.shipment.estimatedWeight})</span>
                          <span className="block text-[10px] text-gray-400">Routes: {rfq.shipment.origin} → {rfq.shipment.destination}</span>
                        </div>
                        <div className="text-left sm:text-right space-y-1.5 w-full sm:w-auto">
                          <span className="bg-gray-100 text-gray-600 border border-gray-200 px-2 py-0.5 rounded text-[10px] font-bold block sm:inline-block">
                            {rfq.status}
                          </span>
                          <span className="block text-[10px] text-gray-400 font-medium">Submitted: {rfq.timestamp.slice(0, 10)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-400 space-y-2">
                    <Folder className="h-8 w-8 mx-auto text-gray-300" />
                    <p className="text-xs">No custom quotation requests filed in this session.</p>
                    <Link href="/quote" className="text-xs text-primary-deep underline hover:text-accent-gold font-bold">Submit a Quote Form</Link>
                  </div>
                )}
              </div>
            </div>

            {/* Right Block: Document Store & Alerts (4 cols) */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Document Repository */}
              <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="text-sm font-bold text-primary-deep uppercase tracking-wider flex items-center space-x-2">
                    <Folder className="h-4 w-4 text-accent-gold" />
                    <span>Clearance Documents</span>
                  </h3>
                </div>
                <div className="p-4 space-y-3">
                  {mockDocuments.map((doc) => (
                    <div key={doc.name} className="border border-gray-50 rounded-lg p-3 hover:bg-gray-50 transition-colors flex items-center justify-between text-xs">
                      <div className="space-y-0.5">
                        <span className="block font-bold text-primary-deep truncate max-w-[180px]">{doc.name}</span>
                        <span className="block text-[9px] text-gray-400 font-semibold">{doc.type} // {doc.size}</span>
                      </div>
                      <button className="text-[10px] font-bold text-accent-gold hover:text-accent-hover">
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Notifications preview */}
              <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="text-sm font-bold text-primary-deep uppercase tracking-wider flex items-center space-x-2">
                    <Bell className="h-4 w-4 text-accent-gold" />
                    <span>Operational Alerts</span>
                  </h3>
                </div>
                <div className="p-5 space-y-4 text-xs">
                  <div className="flex items-start space-x-2.5 text-gray-600">
                    <ShieldAlert className="h-4.5 w-4.5 text-accent-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Martins Drift border post:</strong>
                      <p className="text-[10px] text-gray-500 mt-0.5">Dwell queue times currently estimated at 6 hours. Expect minor transit adjustments.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2.5 text-gray-600">
                    <UserCheck className="h-4.5 w-4.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Customs pre-clearance:</strong>
                      <p className="text-[10px] text-gray-500 mt-0.5">Waybill documents for DFS-789-ZIM uploaded and matching HS codes validated.</p>
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
