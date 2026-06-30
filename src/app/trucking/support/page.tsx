"use client";

import { useState } from "react";
import { ShieldAlert, Plus, HelpCircle, Phone } from "lucide-react";

export default function TruckingSupportPage() {
  const [tickets, setTickets] = useState([
    { id: "tkt-001", subject: "Martins Drift Border Post dwell time escalation", status: "in_progress", date: "2026-06-29" },
    { id: "tkt-002", subject: "Requesting replacement straps for Flatdeck B 902 ABF", status: "resolved", date: "2026-06-20" }
  ]);

  const [subject, setSubject] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject) return;
    const newTkt = {
      id: `tkt-${Date.now()}`,
      subject,
      status: "open",
      date: new Date().toISOString().split('T')[0]
    };
    setTickets([newTkt, ...tickets]);
    setSubject("");
    alert("Ticket created! DFS dispatch operations desk has been notified.");
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black text-primary-deep tracking-tight flex items-center space-x-3">
          <ShieldAlert className="h-8 w-8 text-accent-gold" />
          <span>Freight Support Desk</span>
        </h2>
        <p className="text-gray-600 mt-2 font-medium">
          Create help tickets for active dispatches or contact the 24/7 SADC driver coordinator.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Log ticket (5 columns) */}
        <div className="lg:col-span-5 bg-white border border-gray-100 shadow-sm rounded-2xl p-6 space-y-4">
          <h3 className="font-extrabold text-primary-deep text-lg border-b border-gray-100 pb-3">Open Operations Case</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold text-gray-600">
            <div className="space-y-1.5">
              <label className="block text-gray-400 uppercase tracking-wider text-[9px]">Topic / Subject</label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Customs clearance delays at Ramokgwebana"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-primary-deep placeholder-gray-400 focus:outline-none focus:border-accent-gold transition-colors"
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-3.5 gold-gradient text-primary-deep font-extrabold rounded-xl transition shadow-lg shadow-accent-gold/10 text-sm"
            >
              Log Ticket
            </button>
          </form>
        </div>

        {/* Existing tickets (7 columns) */}
        <div className="lg:col-span-7 bg-white border border-gray-100 shadow-sm rounded-2xl p-6 space-y-4">
          <h3 className="font-extrabold text-primary-deep text-lg border-b border-gray-100 pb-3">Active Trouble Cases</h3>
          
          <div className="space-y-4">
            {tickets.map((t) => (
              <div key={t.id} className="p-4 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-between gap-4">
                <div>
                  <span className="font-bold text-primary-deep block text-sm">{t.subject}</span>
                  <span className="text-[10px] text-gray-400 font-bold block mt-0.5">ID: {t.id} • Opened {t.date}</span>
                </div>
                <span className={`px-2.5 py-0.5 rounded text-[9px] font-extrabold uppercase border ${
                  t.status === "resolved" 
                    ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                    : t.status === "in_progress" 
                      ? "bg-blue-50 text-blue-600 border-blue-100" 
                      : "bg-purple-50 text-purple-600 border-purple-100"
                }`}>
                  {t.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
