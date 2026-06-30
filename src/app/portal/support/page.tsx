"use client";

import { useState, useEffect } from "react";
import { ShieldAlert, Search, Plus, HelpCircle, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthContext";
import { DEMO_SHIPMENTS } from "@/data/demo/shipments";
import type { SupportTicket } from "@/types/models";

export default function PortalSupportPage() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTicket, setNewTicket] = useState({
    category: "shipment",
    subject: "",
    message: ""
  });

  const defaultTickets = [
    { id: "tkt-001", subject: "SAD500 border delay Martins Drift", category: "customs", status: "in_progress", createdAt: "2026-06-29T14:30:00Z" },
    { id: "tkt-002", subject: "Packing list weight edit for DFS-304-ZAM", category: "document", status: "resolved", createdAt: "2026-06-25T15:10:00Z" },
  ];

  useEffect(() => {
    setTickets(defaultTickets);
  }, []);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const created = {
      id: `tkt-${Date.now()}`,
      subject: newTicket.subject,
      category: newTicket.category,
      status: "open",
      createdAt: new Date().toISOString()
    };
    setTickets([created, ...tickets]);
    setShowCreateModal(false);
    setNewTicket({ category: "shipment", subject: "", message: "" });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "bg-emerald-950/40 text-emerald-400 border-emerald-500/20";
      case "in_progress":
        return "bg-blue-950/40 text-blue-400 border-blue-500/20";
      case "open":
        return "bg-purple-950/40 text-purple-400 border-purple-500/20";
      default:
        return "bg-gray-800 text-gray-300 border-gray-700";
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight flex items-center space-x-3">
            <ShieldAlert className="h-8 w-8 text-accent-gold" />
            <span>Help Desk Tickets</span>
          </h2>
          <p className="text-gray-400 mt-2 font-medium">
            Submit a trouble ticket to our operations team or view your pending support cases.
          </p>
        </div>

        <button 
          onClick={() => setShowCreateModal(true)}
          className="flex items-center justify-center space-x-2 px-5 py-3 gold-gradient text-primary-deep font-extrabold rounded-xl text-sm transition shadow-lg shadow-accent-gold/10"
        >
          <Plus className="h-4.5 w-4.5 stroke-[3]" />
          <span>New Ticket</span>
        </button>
      </div>

      {/* Ticket List */}
      <div className="bg-primary-deep border border-accent-gold/20 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-semibold text-gray-400">
            <thead className="bg-primary-black text-gray-500 uppercase tracking-widest text-[10px] border-b border-accent-gold/10">
              <tr>
                <th className="px-6 py-4">Ticket details</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Submitted At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-accent-gold/5">
              {tickets.length > 0 ? (
                tickets.map((t) => (
                  <tr key={t.id} className="hover:bg-primary-black/20 text-white">
                    <td className="px-6 py-4">
                      <div>
                        <span className="block font-bold text-gray-100">{t.subject}</span>
                        <span className="block text-[10px] text-gray-500 mt-0.5">ID: {t.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono uppercase tracking-wider text-[10px] text-accent-gold">{t.category}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded text-[9px] font-extrabold uppercase border ${getStatusColor(t.status)}`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 font-medium">
                      {new Date(t.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500 font-medium">
                    No support tickets submitted yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="p-6 rounded-2xl bg-primary-deep border border-accent-gold/15 space-y-2">
          <h4 className="font-bold text-white flex items-center">
            <HelpCircle className="h-4.5 w-4.5 mr-2 text-accent-gold" />
            <span>How do I correct a customs document?</span>
          </h4>
          <p className="text-xs text-gray-400 leading-relaxed font-medium">
            Navigate to the Document Vault and select the document marked 'Requires Correction'. Click the upload revision button to submit the updated SAD500 file directly to our clearance agents.
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-primary-deep border border-accent-gold/15 space-y-2">
          <h4 className="font-bold text-white flex items-center">
            <HelpCircle className="h-4.5 w-4.5 mr-2 text-accent-gold" />
            <span>What are the border queue statuses?</span>
          </h4>
          <p className="text-xs text-gray-400 leading-relaxed font-medium">
            Border wait times are monitored by GPS corridor density sensors. Check active dwell times in Martins Drift, Beitbridge, and Ramokgwebana checkpoints directly from your client dashboard.
          </p>
        </div>
      </div>

      {/* Support Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-primary-deep border border-accent-gold/20 rounded-2xl overflow-hidden shadow-2xl p-6 space-y-5 animate-fade-in-up">
            <div className="flex justify-between items-center border-b border-accent-gold/10 pb-4">
              <h4 className="text-lg font-bold text-white flex items-center space-x-2">
                <ShieldAlert className="h-5 w-5 text-accent-gold" />
                <span>Submit Trouble Ticket</span>
              </h4>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-white text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs font-semibold text-gray-300">
              <div className="space-y-1.5">
                <label className="block text-gray-400 uppercase tracking-wider text-[10px]">Ticket Category</label>
                <select
                  value={newTicket.category}
                  onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
                  className="w-full px-4 py-3 bg-primary-black border border-accent-gold/20 rounded-xl text-white focus:outline-none focus:border-accent-gold transition-colors"
                >
                  <option value="shipment">Border Delay / Shipment Update</option>
                  <option value="customs">Customs Clearance SAD500</option>
                  <option value="document">Commercial Invoices / Documents</option>
                  <option value="general">Account / Technical Issue</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-gray-400 uppercase tracking-wider text-[10px]">Subject</label>
                <input
                  type="text"
                  required
                  value={newTicket.subject}
                  onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                  placeholder="Summary of request"
                  className="w-full px-4 py-3 bg-primary-black border border-accent-gold/20 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-accent-gold transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-gray-400 uppercase tracking-wider text-[10px]">Message Details</label>
                <textarea
                  required
                  rows={4}
                  value={newTicket.message}
                  onChange={(e) => setNewTicket({ ...newTicket, message: e.target.value })}
                  placeholder="Detail your request..."
                  className="w-full px-4 py-3 bg-primary-black border border-accent-gold/20 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-accent-gold transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 gold-gradient text-primary-deep font-extrabold rounded-xl transition shadow-lg shadow-accent-gold/10 text-sm"
              >
                Submit Ticket
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
