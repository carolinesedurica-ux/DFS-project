"use client";

import { useState } from "react";
import { FileText, Search, Plus, Download } from "lucide-react";

export default function ClearingDocumentsPage() {
  const [documents, setDocuments] = useState([
    { id: "doc-301", fileName: "SAD500-MartinsDrift-Copper.pdf", type: "Customs SAD500", size: "2.4 MB", status: "Approved" },
    { id: "doc-302", fileName: "Manifest-Dry-Ore-Link-889.pdf", type: "Cargo Manifest", size: "1.8 MB", status: "Under Review" },
    { id: "doc-303", fileName: "CommercialInvoice-Kalahari-2026.pdf", type: "Invoice", size: "1.1 MB", status: "Requires Correction" }
  ]);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newDoc, setNewDoc] = useState({ fileName: "", type: "Customs SAD500" });

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDoc.fileName) return;
    const added = {
      id: `doc-${Date.now()}`,
      fileName: newDoc.fileName,
      type: newDoc.type,
      size: "1.5 MB",
      status: "Under Review"
    };
    setDocuments([added, ...documents]);
    setShowUploadModal(false);
    setNewDoc({ fileName: "", type: "Customs SAD500" });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight flex items-center space-x-3">
            <FileText className="h-8 w-8 text-accent-gold" />
            <span>Customs Document Vault</span>
          </h2>
          <p className="text-gray-500 mt-2 font-medium">
            Upload SAD500 customs declarations, cargo manifests, and transits for verification.
          </p>
        </div>

        <button 
          onClick={() => setShowUploadModal(true)}
          className="flex items-center justify-center space-x-2 px-5 py-3 gold-gradient text-primary-deep font-extrabold rounded-xl text-sm transition shadow-lg shadow-accent-gold/10"
        >
          <Plus className="h-4.5 w-4.5 stroke-[3]" />
          <span>Upload Customs Doc</span>
        </button>
      </div>

      <div className="bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-semibold text-gray-500">
            <thead className="bg-gray-50 text-gray-400 uppercase tracking-widest text-[10px] border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">File details</th>
                <th className="px-6 py-4">Filing Type</th>
                <th className="px-6 py-4">Size</th>
                <th className="px-6 py-4">Customs Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {documents.map((d) => (
                <tr key={d.id} className="hover:bg-gray-50/50 text-slate-800">
                  <td className="px-6 py-4 font-bold">{d.fileName}</td>
                  <td className="px-6 py-4 text-primary-royal font-bold">{d.type}</td>
                  <td className="px-6 py-4 text-gray-500">{d.size}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded text-[9px] font-extrabold uppercase border ${
                      d.status === "Approved" 
                        ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                        : d.status === "Under Review"
                          ? "bg-amber-50 text-amber-600 border-amber-100 animate-pulse"
                          : "bg-red-50 text-red-600 border-red-100"
                    }`}>
                      {d.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <a 
                      href="#" 
                      onClick={(e) => { e.preventDefault(); alert("Downloading customs document stub..."); }}
                      className="text-primary-royal hover:underline font-bold"
                    >
                      Download
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-2xl p-6 space-y-5 animate-fade-in-up">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <h4 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
                <FileText className="h-5 w-5 text-primary-royal" />
                <span>Upload Customs Document</span>
              </h4>
              <button 
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-slate-800 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpload} className="space-y-4 text-xs font-semibold text-gray-600">
              <div className="space-y-1.5">
                <label className="block text-gray-400 uppercase tracking-wider text-[9px]">Document Type</label>
                <select
                  value={newDoc.type}
                  onChange={(e) => setNewDoc({ ...newDoc, type: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-primary-deep focus:outline-none focus:border-primary-royal transition-colors"
                >
                  <option value="Customs SAD500">Customs SAD500</option>
                  <option value="Cargo Manifest">Cargo Manifest</option>
                  <option value="Commercial Invoice">Commercial Invoice</option>
                  <option value="Transit Permit">Transit Permit</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-gray-400 uppercase tracking-wider text-[9px]">Document File Name</label>
                <input
                  type="text"
                  required
                  value={newDoc.fileName}
                  onChange={(e) => setNewDoc({ ...newDoc, fileName: e.target.value })}
                  placeholder="e.g. SAD500-MartinsDrift-Copper.pdf"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-primary-deep placeholder-gray-400 focus:outline-none focus:border-primary-royal transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 gold-gradient text-primary-deep font-extrabold rounded-xl transition shadow-lg shadow-accent-gold/10 text-sm"
              >
                Lodge File
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
