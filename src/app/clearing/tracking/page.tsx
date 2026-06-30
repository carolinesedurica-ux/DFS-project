"use client";

import { useState } from "react";
import { Globe, Search, Clock } from "lucide-react";

export default function ClearingTrackingPage() {
  const borderQueues = [
    { border: "Martins Drift Border Post (South Africa ➔ Botswana)", status: "High Delay", dwell: "6h wait time", color: "bg-red-50 text-red-600 border-red-100" },
    { border: "Ramokgwebana Border (Botswana ➔ Zimbabwe)", status: "Normal Wait", dwell: "1h wait time", color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
    { border: "Kazungula Border Post (Botswana ➔ Zambia)", status: "Normal Wait", dwell: "2h wait time", color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
    { border: "Beitbridge Border Post (South Africa ➔ Zimbabwe)", status: "Moderate Delay", dwell: "4h wait time", color: "bg-amber-50 text-amber-600 border-amber-100" }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black text-slate-800 tracking-tight flex items-center space-x-3">
          <Globe className="h-8 w-8 text-primary-royal" />
          <span>SADC Border wait status</span>
        </h2>
        <p className="text-gray-500 mt-2 font-medium">
          Monitor real-time customs dwell times and transit congestion index at Southern African border posts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {borderQueues.map((q, idx) => (
          <div key={idx} className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 flex justify-between items-center gap-4">
            <div className="space-y-1.5">
              <span className="block font-bold text-slate-800 text-sm">{q.border}</span>
              <span className="block text-xs text-gray-400 font-semibold flex items-center">
                <Clock className="h-3.5 w-3.5 mr-1" />
                {q.dwell}
              </span>
            </div>
            <span className={`px-2.5 py-0.5 rounded text-[9px] font-extrabold uppercase border ${q.color}`}>
              {q.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
