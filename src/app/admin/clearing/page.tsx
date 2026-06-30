"use client";

import { useState, useEffect } from "react";
import { 
  Globe, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  FileText, 
  Search,
  Filter,
  Eye,
  Check
} from "lucide-react";
import { ClearingService, type MockCustomsCase } from "@/services/clearing";
import { DEMO_DOCUMENTS } from "@/data/demo/documents";

export default function ClearingAdminDashboard() {
  const [cases, setCases] = useState<MockCustomsCase[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await ClearingService.getCustomsCases();
        if (res.data) {
          setCases(res.data);
        }
        // Filter demo documents that are customs or need review
        setDocuments(DEMO_DOCUMENTS);
      } catch (err) {
        console.error("Failed to load clearing data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleApproveCase = (id: string) => {
    const updated = cases.map(c => c.id === id ? { ...c, status: "cleared" as const } : c);
    setCases(updated);
  };

  const handleHoldCase = (id: string) => {
    const updated = cases.map(c => c.id === id ? { ...c, status: "held" as const } : c);
    setCases(updated);
  };

  const handleVerifyDocument = (id: string, status: "approved" | "requires_correction") => {
    const updated = documents.map(d => d.id === id ? { ...d, status } : d);
    setDocuments(updated);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "cleared":
        return "bg-emerald-950/40 text-emerald-400 border-emerald-500/20";
      case "pending":
      case "open":
        return "bg-yellow-950/40 text-yellow-400 border-yellow-500/20";
      case "held":
        return "bg-red-950/40 text-red-400 border-red-500/20";
      default:
        return "bg-gray-800 text-gray-300 border-gray-700";
    }
  };

  const filteredCases = cases.filter(c => {
    const matchesSearch = 
      c.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.borderPost.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.cargoType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || c.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-black tracking-tight text-white flex items-center space-x-3">
          <Globe className="h-8 w-8 text-yellow-500" />
          <span>Customs & Clearing Portal</span>
        </h2>
        <p className="text-gray-400 mt-2 font-medium">
          Manage SADC customs clearance processes, review waybills & declarations, and coordinate border clearance.
        </p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Clearing Cases", val: cases.filter(c => c.status !== "cleared").length, icon: Clock, color: "text-blue-400 bg-blue-500/10 border-blue-500/10" },
          { label: "Cleared Cases (Total)", val: cases.filter(c => c.status === "cleared").length, icon: CheckCircle2, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/10" },
          { label: "Cases on Hold", val: cases.filter(c => c.status === "held").length, icon: AlertTriangle, color: "text-red-400 bg-red-500/10 border-red-500/10" },
          { label: "Pending Documents", val: documents.filter(d => d.status === "under_review" || d.status === "uploaded").length, icon: FileText, color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/10" },
        ].map((item, idx) => (
          <div key={idx} className={`p-5 rounded-2xl bg-gray-900 border ${item.color.split(' ')[2]} flex items-center justify-between`}>
            <div className="space-y-1">
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">{item.label}</span>
              <span className="block text-2xl font-extrabold tracking-tight text-white">{item.val}</span>
            </div>
            <div className={`p-3 rounded-xl ${item.color.split(' ')[1]} ${item.color.split(' ')[0]}`}>
              <item.icon className="h-5 w-5" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column (8 cols) - Customs cases table */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-6 border-b border-gray-800 bg-gray-900/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h3 className="font-bold text-lg text-white">Customs Cases Console</h3>
              
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search case, client..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-gray-950 border border-gray-800 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors"
                  />
                </div>
                
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 bg-gray-950 border border-gray-800 rounded-xl text-xs text-white focus:outline-none focus:border-yellow-500 transition-colors"
                >
                  <option value="all">All Cases</option>
                  <option value="open">Open</option>
                  <option value="pending">Pending</option>
                  <option value="cleared">Cleared</option>
                  <option value="held">Held</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-semibold text-gray-400">
                <thead className="bg-gray-950 text-gray-500 uppercase tracking-widest text-[10px] border-b border-gray-800">
                  <tr>
                    <th className="px-6 py-4">Case Details</th>
                    <th className="px-6 py-4">Client Company</th>
                    <th className="px-6 py-4">Border Post</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/50">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-10 text-center text-gray-500">Loading cases...</td>
                    </tr>
                  ) : filteredCases.length > 0 ? (
                    filteredCases.map((c, i) => (
                      <tr key={i} className="hover:bg-gray-800/10 transition-colors text-white">
                        <td className="px-6 py-4">
                          <div className="space-y-0.5">
                            <span className="block font-mono text-yellow-500 text-sm">{c.caseNumber}</span>
                            <span className="block text-[10px] text-gray-400 font-semibold">Cargo: {c.cargoType}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">{c.companyName}</td>
                        <td className="px-6 py-4 text-gray-300">{c.borderPost.split('(')[0]}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase border ${getStatusColor(c.status)}`}>
                            {c.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-1.5">
                            {c.status !== "cleared" && (
                              <button
                                onClick={() => handleApproveCase(c.id)}
                                className="p-1.5 bg-emerald-600/10 text-emerald-400 hover:bg-emerald-600 hover:text-white rounded-lg border border-emerald-500/20 transition-all"
                                title="Approve & Clear"
                              >
                                <Check className="h-4 w-4" />
                              </button>
                            )}
                            {c.status !== "held" && c.status !== "cleared" && (
                              <button
                                onClick={() => handleHoldCase(c.id)}
                                className="p-1.5 bg-red-600/10 text-red-400 hover:bg-red-600 hover:text-white rounded-lg border border-red-500/20 transition-all"
                                title="Put on Hold"
                              >
                                <XCircle className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-10 text-center text-gray-500">No cases match the query.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right column (4 cols) - Pending document checklist */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-6 border-b border-gray-800 bg-gray-900/50">
              <h3 className="font-bold text-lg text-white flex items-center space-x-2">
                <FileText className="h-5 w-5 text-yellow-500" />
                <span>Customs Files Queue</span>
              </h3>
            </div>

            <div className="p-6 space-y-4">
              {documents.filter(d => d.type === "customs_declaration" || d.status === "under_review").map((doc, idx) => (
                <div key={idx} className="p-4 bg-gray-950 border border-gray-800 rounded-xl space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="space-y-0.5">
                      <span className="block font-bold text-white text-xs truncate max-w-[150px]">{doc.fileName}</span>
                      <span className="block text-[10px] text-gray-500 uppercase font-bold tracking-wider">{doc.type.replace('_', ' ')}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[8px] font-extrabold uppercase ${
                      doc.status === "approved" ? "bg-emerald-950/40 text-emerald-400" : "bg-yellow-950/40 text-yellow-400"
                    }`}>
                      {doc.status}
                    </span>
                  </div>

                  {doc.reviewNotes && (
                    <div className="p-2.5 rounded bg-gray-900 text-[10px] text-yellow-500 font-semibold border border-yellow-500/10">
                      Note: {doc.reviewNotes}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[10px] text-gray-500 font-bold pt-1">
                    <span>Uploaded: {doc.uploadedBy}</span>
                    <span>{doc.fileSize}</span>
                  </div>

                  {doc.status !== "approved" && (
                    <div className="flex items-center space-x-2 pt-2">
                      <button
                        onClick={() => handleVerifyDocument(doc.id, "approved")}
                        className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[10px] transition"
                      >
                        Approve File
                      </button>
                      <button
                        onClick={() => handleVerifyDocument(doc.id, "requires_correction")}
                        className="flex-1 py-1.5 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg font-bold text-[10px] border border-red-500/15 transition"
                      >
                        Reject File
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
