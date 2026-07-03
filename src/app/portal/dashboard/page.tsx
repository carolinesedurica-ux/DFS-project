"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Truck, 
  FileText, 
  ClipboardList, 
  MessageSquare, 
  Clock, 
  ArrowRight, 
  Download,
  AlertCircle,
  TrendingUp,
  MapPin,
  FileCheck2,
  PhoneCall,
  Search
} from "lucide-react";
import { useAuth } from "@/lib/auth/AuthContext";
import { DEMO_SHIPMENTS } from "@/data/demo/shipments";
import { DEMO_QUOTES } from "@/data/demo/quotes";
import { DEMO_DOCUMENTS } from "@/data/demo/documents";
import type { Shipment, Quote, ShipmentDocument } from "@/types/models";

export default function CustomerPortalDashboard() {
  const { user } = useAuth();
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [documents, setDocuments] = useState<ShipmentDocument[]>([]);
  const [loading, setLoading] = useState(true);

  // Active modal state
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [showDocUploadModal, setShowDocUploadModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  
  // Doc Upload Form State
  const [uploadedDoc, setUploadedDoc] = useState({
    type: "waybill",
    fileName: "",
    fileSize: "1.2 MB",
  });

  // Support Form State
  const [supportTicket, setSupportTicket] = useState({
    category: "shipment",
    subject: "",
    message: ""
  });

  useEffect(() => {
    // Load customer specific data based on customerId
    if (user) {
      const customerId = user.customerId;
      
      // Filter data
      const customerShipments = DEMO_SHIPMENTS.filter(s => s.customerId === customerId);
      const customerQuotes = DEMO_QUOTES.filter(q => q.customerId === customerId);
      const customerDocs = DEMO_DOCUMENTS.filter(d => d.customerId === customerId);
      
      setShipments(customerShipments);
      setQuotes(customerQuotes);
      setDocuments(customerDocs);
      setLoading(false);
    }
  }, [user]);

  const handleUploadDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const newDoc: ShipmentDocument = {
      id: `doc-${Date.now()}`,
      customerId: user.customerId,
      shipmentId: shipments[0]?.id || null,
      type: uploadedDoc.type as any,
      fileName: uploadedDoc.fileName || "manifest-draft.pdf",
      fileRef: "#",
      status: "uploaded",
      uploadedBy: user.name,
      uploadedAt: new Date().toISOString(),
      reviewNotes: "Pending ops verification.",
      fileSize: uploadedDoc.fileSize
    };

    setDocuments([newDoc, ...documents]);
    setShowDocUploadModal(false);
    setUploadedDoc({ type: "waybill", fileName: "", fileSize: "1.2 MB" });
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Support Ticket Created!\nSubject: ${supportTicket.subject}\nOur operations team will contact you shortly.`);
    setShowSupportModal(false);
    setSupportTicket({ category: "shipment", subject: "", message: "" });
  };

  const getShipmentStatusBadge = (status: string) => {
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

  const getDocStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      case "under_review":
        return "text-amber-400 bg-amber-500/10 border-amber-500/20";
      case "requires_correction":
        return "text-red-400 bg-red-500/10 border-red-500/20";
      default:
        return "text-gray-400 bg-gray-500/10 border-gray-500/20";
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">
            Greetings, <span className="text-accent-gold">{user?.name}</span>
          </h2>
          <p className="text-gray-400 mt-1 font-medium">
            Manage your cross-border SADC logistics, check quotes, and review compliance documentation.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Link href="/quote" className="flex-1 sm:flex-none text-center px-5 py-3 gold-gradient text-primary-deep font-extrabold rounded-xl text-sm transition shadow-lg shadow-accent-gold/10">
            Request Quote
          </Link>
          <button 
            onClick={() => setShowDocUploadModal(true)}
            className="flex-1 sm:flex-none px-5 py-3 bg-primary-deep hover:bg-primary-deep/80 text-white font-extrabold rounded-xl text-sm border border-accent-gold/20 transition"
          >
            Upload Document
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-6 rounded-2xl bg-primary-deep border border-accent-gold/20 space-y-4">
          <div className="flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-wider">
            <span>In-Transit Shipments</span>
            <Truck className="h-5 w-5 text-accent-gold" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-4xl font-extrabold text-white">{shipments.filter(s => s.status !== "delivered").length}</span>
            <span className="text-xs text-green-400 font-bold flex items-center">Active</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-primary-deep border border-accent-gold/20 space-y-4">
          <div className="flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-wider">
            <span>Waybills & Documents</span>
            <FileText className="h-5 w-5 text-accent-gold" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-4xl font-extrabold text-white">{documents.length}</span>
            <span className="text-xs text-amber-400 font-bold">{documents.filter(d => d.status === "under_review").length} Pending Review</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-primary-deep border border-accent-gold/20 space-y-4">
          <div className="flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-wider">
            <span>Active Quotes</span>
            <ClipboardList className="h-5 w-5 text-accent-gold" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-4xl font-extrabold text-white">{quotes.length}</span>
            <span className="text-xs text-accent-gold font-bold">Corridor Tenders</span>
          </div>
        </div>
      </div>

      {/* Live tracking list & Recent Documents */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side (8 cols) - Shipments tracking ledger */}
        <div className="lg:col-span-8 space-y-6 bg-primary-deep border border-accent-gold/20 rounded-2xl p-6">
          <div className="flex justify-between items-center pb-4 border-b border-accent-gold/10">
            <h3 className="font-extrabold text-lg text-white flex items-center space-x-2">
              <Truck className="h-5 w-5 text-accent-gold" />
              <span>Your Active Corridor Shipments</span>
            </h3>
            <Link href="/portal/trucking" className="text-xs text-accent-gold font-bold flex items-center space-x-1 hover:text-accent-bright">
              <span>All Shipments</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="space-y-4">
            {loading ? (
              <p className="text-gray-500 text-xs text-center py-6">Loading shipments...</p>
            ) : shipments.length > 0 ? (
              shipments.map((s) => (
                <div 
                  key={s.id} 
                  onClick={() => setSelectedShipment(s)}
                  className="p-4 bg-primary-black hover:bg-primary-black/80 border border-accent-gold/10 hover:border-accent-gold/30 rounded-xl cursor-pointer transition-all duration-150 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-accent-gold text-xs font-bold">{s.reference}</span>
                      <span className="text-gray-500 text-[10px]">•</span>
                      <span className="text-gray-300 text-xs font-semibold">{s.cargoType}</span>
                    </div>
                    <div className="text-[11px] text-gray-400 font-medium flex items-center space-x-1.5">
                      <span>{s.origin.split(',')[0]}</span>
                      <span>➔</span>
                      <span>{s.destination.split(',')[0]}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    <span className="text-[10px] text-gray-500">Est. Arrival: {s.estimatedArrival}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase border ${getShipmentStatusBadge(s.status)}`}>
                      {s.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-xs text-center py-6">No shipments registered under your customer account.</p>
            )}
          </div>
        </div>

        {/* Right Side (4 cols) - Document compliance tracker */}
        <div className="lg:col-span-4 space-y-6 bg-primary-deep border border-accent-gold/20 rounded-2xl p-6">
          <div className="flex justify-between items-center pb-4 border-b border-accent-gold/10">
            <h3 className="font-extrabold text-lg text-white flex items-center space-x-2">
              <FileText className="h-5 w-5 text-accent-gold" />
              <span>Compliance Documents</span>
            </h3>
            <Link href="/portal/documents" className="text-xs text-accent-gold font-bold flex items-center space-x-1 hover:text-accent-bright">
              <span>Vault</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="space-y-4">
            {loading ? (
              <p className="text-gray-500 text-xs text-center py-6">Loading documents...</p>
            ) : documents.length > 0 ? (
              documents.slice(0, 4).map((d) => (
                <div key={d.id} className="p-3 bg-primary-black border border-accent-gold/5 rounded-xl flex items-center justify-between gap-3">
                  <div className="space-y-0.5 min-w-0">
                    <span className="block text-xs font-bold text-gray-200 truncate">{d.fileName}</span>
                    <span className="block text-[10px] text-gray-500 font-semibold uppercase">{d.type} • {d.fileSize}</span>
                  </div>
                  
                  <span className={`px-2 py-0.5 rounded text-[8px] font-extrabold border ${getDocStatusBadge(d.status)}`}>
                    {d.status.replace('_', ' ')}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-xs text-center py-6">No compliance documents uploaded yet.</p>
            )}
          </div>
        </div>

      </div>

      {/* Quick Help & Contact Desk */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-primary-deep to-primary-black border border-accent-gold/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h4 className="text-base font-bold text-accent-gold flex items-center justify-center md:justify-start">
            <PhoneCall className="h-5 w-5 mr-2" />
            <span>Need Immediate Logistics Support?</span>
          </h4>
          <p className="text-xs text-gray-400 max-w-xl leading-relaxed">
            Our 24/7 dispatcher desk is operational. Submit a trouble ticket or contact operations regarding customs delays, vehicle rerouting, or emergency requests.
          </p>
        </div>
        <button 
          onClick={() => setShowSupportModal(true)}
          className="px-6 py-3.5 bg-accent-gold hover:bg-accent-bright text-primary-deep font-extrabold rounded-xl text-xs shadow-lg transition-transform transform hover:-translate-y-0.5 w-full md:w-auto text-center"
        >
          Open Support Ticket
        </button>
      </div>

      {/* Shipment Live Details Modal */}
      {selectedShipment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-primary-deep border border-accent-gold/20 rounded-2xl overflow-hidden shadow-2xl p-6 space-y-6 animate-fade-in-up">
            <div className="flex justify-between items-center border-b border-accent-gold/10 pb-4">
              <div>
                <span className="text-[10px] text-accent-gold uppercase font-bold tracking-widest font-mono">{selectedShipment.reference}</span>
                <h4 className="text-lg font-bold text-white mt-1">Shipment Transit History</h4>
              </div>
              <button 
                onClick={() => setSelectedShipment(null)}
                className="text-gray-400 hover:text-white text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs font-semibold text-gray-300">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-gray-500 uppercase tracking-wider text-[10px]">Origin</span>
                  <span className="text-gray-200 mt-1 block">{selectedShipment.origin}</span>
                </div>
                <div>
                  <span className="block text-gray-500 uppercase tracking-wider text-[10px]">Destination</span>
                  <span className="text-gray-200 mt-1 block">{selectedShipment.destination}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-gray-500 uppercase tracking-wider text-[10px]">Cargo</span>
                  <span className="text-gray-200 mt-1 block">{selectedShipment.cargoType} ({selectedShipment.weight})</span>
                </div>
                <div>
                  <span className="block text-gray-500 uppercase tracking-wider text-[10px]">Vehicle</span>
                  <span className="text-gray-200 mt-1 block">{selectedShipment.vehicle}</span>
                </div>
              </div>

              <div className="border-t border-accent-gold/10 pt-4 space-y-3">
                <span className="block text-gray-500 uppercase tracking-wider text-[10px]">Tracking Events</span>
                <div className="space-y-3.5 pl-2 relative border-l border-accent-gold/10 ml-2 pt-1">
                  {selectedShipment.trackingEvents.map((evt, idx) => (
                    <div key={idx} className="relative space-y-1">
                      <span className="absolute -left-[14px] top-1.5 h-2 w-2 rounded-full bg-accent-gold ring-4 ring-primary-deep"></span>
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="font-bold text-accent-gold uppercase">{evt.status.replace('_', ' ')}</span>
                        <span className="text-gray-500">{new Date(evt.timestamp).toLocaleString()}</span>
                      </div>
                      <p className="text-gray-400 font-medium text-[11px]">{evt.location} — {evt.notes}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Document Upload Modal */}
      {showDocUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-primary-deep border border-accent-gold/20 rounded-2xl overflow-hidden shadow-2xl p-6 space-y-5 animate-fade-in-up">
            <div className="flex justify-between items-center border-b border-accent-gold/10 pb-4">
              <h4 className="text-lg font-bold text-white flex items-center space-x-2">
                <FileText className="h-5 w-5 text-accent-gold" />
                <span>Upload Compliance Document</span>
              </h4>
              <button 
                onClick={() => setShowDocUploadModal(false)}
                className="text-gray-400 hover:text-white text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUploadDoc} className="space-y-4 text-xs font-semibold text-gray-300">
              <div className="space-y-1.5">
                <label className="block text-gray-400 uppercase tracking-wider text-[10px]">Document Type</label>
                <select
                  value={uploadedDoc.type}
                  onChange={(e) => setUploadedDoc({ ...uploadedDoc, type: e.target.value })}
                  className="w-full px-4 py-3 bg-primary-black border border-accent-gold/20 rounded-xl text-white focus:outline-none focus:border-accent-gold transition-colors"
                >
                  <option value="waybill">Waybill (POD)</option>
                  <option value="customs_declaration">Customs Declaration (SAD500)</option>
                  <option value="cargo_manifest">Cargo Manifest</option>
                  <option value="weight_certificate">Weight Certificate</option>
                  <option value="invoice">Commercial Invoice</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-gray-400 uppercase tracking-wider text-[10px]">Document File Name</label>
                <input
                  type="text"
                  required
                  value={uploadedDoc.fileName}
                  onChange={(e) => setUploadedDoc({ ...uploadedDoc, fileName: e.target.value })}
                  placeholder="e.g. SAD500-MartinsDrift-0630.pdf"
                  className="w-full px-4 py-3 bg-primary-black border border-accent-gold/20 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-accent-gold transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 gold-gradient text-primary-deep font-extrabold rounded-xl transition shadow-lg shadow-accent-gold/10 text-sm"
              >
                Submit Document for Verification
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Support Ticket Modal */}
      {showSupportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-primary-deep border border-accent-gold/20 rounded-2xl overflow-hidden shadow-2xl p-6 space-y-5 animate-fade-in-up">
            <div className="flex justify-between items-center border-b border-accent-gold/10 pb-4">
              <h4 className="text-lg font-bold text-white flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-accent-gold" />
                <span>Submit Operations Ticket</span>
              </h4>
              <button 
                onClick={() => setShowSupportModal(false)}
                className="text-gray-400 hover:text-white text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-4 text-xs font-semibold text-gray-300">
              <div className="space-y-1.5">
                <label className="block text-gray-400 uppercase tracking-wider text-[10px]">Support Category</label>
                <select
                  value={supportTicket.category}
                  onChange={(e) => setSupportTicket({ ...supportTicket, category: e.target.value })}
                  className="w-full px-4 py-3 bg-primary-black border border-accent-gold/20 rounded-xl text-white focus:outline-none focus:border-accent-gold transition-colors"
                >
                  <option value="shipment">Border Delay / Shipment Update</option>
                  <option value="document">Customs Compliance SAD500</option>
                  <option value="quote">Commercial Tariff Request</option>
                  <option value="general">Account / Technical Issue</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-gray-400 uppercase tracking-wider text-[10px]">Subject</label>
                <input
                  type="text"
                  required
                  value={supportTicket.subject}
                  onChange={(e) => setSupportTicket({ ...supportTicket, subject: e.target.value })}
                  placeholder="Brief summary of the issue"
                  className="w-full px-4 py-3 bg-primary-black border border-accent-gold/20 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-accent-gold transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-gray-400 uppercase tracking-wider text-[10px]">Message Details</label>
                <textarea
                  required
                  rows={4}
                  value={supportTicket.message}
                  onChange={(e) => setSupportTicket({ ...supportTicket, message: e.target.value })}
                  placeholder="Detail your request, referencing Waybill or GPS ID if applicable..."
                  className="w-full px-4 py-3 bg-primary-black border border-accent-gold/20 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-accent-gold transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 gold-gradient text-primary-deep font-extrabold rounded-xl transition shadow-lg shadow-accent-gold/10 text-sm"
              >
                Dispatch Ticket to Control Tower
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
