"use client";

import { useState, useEffect } from "react";
import { Globe, Search, HelpCircle } from "lucide-react";
import { ClearingService, type MockCustomsCase } from "@/services/clearing";

export default function ClearingImportsPage() {
  const [cases, setCases] = useState<MockCustomsCase[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function loadCases() {
      const res = await ClearingService.getCustomsCases();
      if (res.data) {
        // filter import cases (e.g. copper, cement coming into Botswana/SA)
        setCases(res.data);
      }
    }
    loadCases();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "cleared":
        return "text-emerald-600 bg-emerald-50 border-emerald-100";
      case "pending":
        return "text-purple-600 bg-purple-50 border-purple-100 animate-pulse";
      case "open":
        return "text-blue-600 bg-blue-50 border-blue-100";
      default:
        return "text-gray-600 bg-gray-50 border-gray-100";
    }
  };

  const filtered = cases.filter(c => 
    c.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.cargoType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.borderPost.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black text-slate-800 tracking-tight flex items-center space-x-3">
          <Globe className="h-8 w-8 text-primary-royal" />
          <span>Import Clearing Declarations</span>
        </h2>
        <p className="text-gray-500 mt-2 font-medium">
          Monitor incoming cargo SAD500 declarations, border entry clearance, and compliance reviews.
        </p>
      </div>

      <div className="relative w-full">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search imports by SAD500 reference, border post, cargo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-150 rounded-xl text-sm text-slate-800 placeholder-gray-400 focus:outline-none focus:border-primary-royal transition-colors shadow-sm"
        />
      </div>

      <div className="bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-semibold text-gray-500">
            <thead className="bg-gray-50 text-gray-400 uppercase tracking-widest text-[10px] border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Customs File ID</th>
                <th className="px-6 py-4">Border Post Point</th>
                <th className="px-6 py-4">Import cargo</th>
                <th className="px-6 py-4">Filing Date</th>
                <th className="px-6 py-4">Clearance Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50/50 text-slate-800">
                  <td className="px-6 py-4 font-mono font-bold text-primary-royal">{c.caseNumber}</td>
                  <td className="px-6 py-4 text-gray-600 font-semibold">{c.borderPost}</td>
                  <td className="px-6 py-4 font-bold">{c.cargoType}</td>
                  <td className="px-6 py-4 text-gray-400 font-medium">{new Date(c.submittedAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase border ${getStatusColor(c.status)}`}>
                      {c.status}
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
