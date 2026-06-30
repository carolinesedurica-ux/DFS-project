"use client";

import { useState, useEffect } from "react";
import { FileText, Search, Plus, Download, ShieldCheck, HelpCircle, FileX } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthContext";
import { DEMO_DOCUMENTS } from "@/data/demo/documents";
import type { ShipmentDocument } from "@/types/models";

export default function PortalDocumentsPage() {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<ShipmentDocument[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadedDoc, setUploadedDoc] = useState({
    type: "waybill",
    fileName: "",
    fileSize: "1.5 MB",
  });

  useEffect(() => {
    if (user) {
      const filtered = DEMO_DOCUMENTS.filter(d => d.customerId === user.customerId);
      setDocuments(filtered);
    }
  }, [user]);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const newDoc: ShipmentDocument = {
      id: `doc-${Date.now()}`,
      customerId: user.customerId,
      shipmentId: null,
      type: uploadedDoc.type as any,
      fileName: uploadedDoc.fileName || "customs-file.pdf",
      fileRef: "#",
      status: "uploaded",
      uploadedBy: user.name,
      uploadedAt: new Date().toISOString(),
      reviewNotes: "Pending administrative review.",
      fileSize: uploadedDoc.fileSize
    };

    setDocuments([newDoc, ...documents]);
    setShowUploadModal(false);
    setUploadedDoc({ type: "waybill", fileName: "", fileSize: "1.5 MB" });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-emerald-950/40 text-emerald-400 border-emerald-500/20";
      case "under_review":
        return "bg-amber-950/40 text-amber-400 border-amber-500/20";
      case "requires_correction":
        return "bg-red-950/40 text-red-400 border-red-500/20";
      default:
        return "bg-gray-800 text-gray-300 border-gray-700";
    }
  };

  const filteredDocs = documents.filter(d => {
    const matchesSearch = d.fileName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          d.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || d.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight flex items-center space-x-3">
            <FileText className="h-8 w-8 text-accent-gold" />
            <span>Document Vault</span>
          </h2>
          <p className="text-gray-400 mt-2 font-medium">
            Access commercial invoices, SAD500 customs clearances, weight certificates, and signed Waybills.
          </p>
        </div>

        <button 
          onClick={() => setShowUploadModal(true)}
          className="flex items-center justify-center space-x-2 px-5 py-3 gold-gradient text-primary-deep font-extrabold rounded-xl text-sm transition shadow-lg shadow-accent-gold/10"
        >
          <Plus className="h-4.5 w-4.5 stroke-[3]" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row items-center gap-4 bg-primary-deep border border-accent-gold/20 p-4 rounded-2xl">
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search documents by name, uploaded by..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-primary-black border border-accent-gold/20 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent-gold transition-colors"
          />
        </div>
        
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="w-full md:w-48 px-4 py-3 bg-primary-black border border-accent-gold/20 rounded-xl text-sm text-white focus:outline-none focus:border-accent-gold transition-colors"
        >
          <option value="all">All Document Types</option>
          <option value="waybill">Waybill</option>
          <option value="customs_declaration">Customs SAD500</option>
          <option value="cargo_manifest">Cargo Manifest</option>
          <option value="invoice">Commercial Invoice</option>
          <option value="weight_certificate">Weight Certificate</option>
        </select>
      </div>

      {/* Document Grid */}
      <div className="bg-primary-deep border border-accent-gold/20 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-semibold text-gray-400">
            <thead className="bg-primary-black text-gray-500 uppercase tracking-widest text-[10px] border-b border-accent-gold/10">
              <tr>
                <th className="px-6 py-4">Document Details</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Uploaded By</th>
                <th className="px-6 py-4">Verification Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-accent-gold/5">
              {filteredDocs.length > 0 ? (
                filteredDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-primary-black/20 text-white">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-8 w-8 text-accent-gold/50 flex-shrink-0" />
                        <div>
                          <span className="block font-bold text-gray-100">{doc.fileName}</span>
                          <span className="block text-[10px] text-gray-500 mt-0.5">{doc.fileSize} • Uploaded {new Date(doc.uploadedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono uppercase tracking-wider text-[10px] text-accent-gold">{doc.type.replace('_', ' ')}</td>
                    <td className="px-6 py-4 text-gray-300">{doc.uploadedBy}</td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <span className={`inline-block px-2.5 py-0.5 rounded text-[9px] font-extrabold uppercase border ${getStatusColor(doc.status)}`}>
                          {doc.status.replace('_', ' ')}
                        </span>
                        {doc.reviewNotes && (
                          <span className="block text-[9.5px] text-gray-500 font-medium max-w-xs">{doc.reviewNotes}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); alert("Downloading document stub... file successfully verified."); }}
                        className="inline-flex items-center space-x-1.5 text-xs text-accent-gold hover:text-accent-bright font-bold"
                      >
                        <Download className="h-4 w-4" />
                        <span>Download</span>
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500 font-medium">
                    No documents uploaded matching the filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Document Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-primary-deep border border-accent-gold/20 rounded-2xl overflow-hidden shadow-2xl p-6 space-y-5 animate-fade-in-up">
            <div className="flex justify-between items-center border-b border-accent-gold/10 pb-4">
              <h4 className="text-lg font-bold text-white flex items-center space-x-2">
                <FileText className="h-5 w-5 text-accent-gold" />
                <span>Upload Compliance Document</span>
              </h4>
              <button 
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-white text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpload} className="space-y-4 text-xs font-semibold text-gray-300">
              <div className="space-y-1.5">
                <label className="block text-gray-400 uppercase tracking-wider text-[10px]">Document Type</label>
                <select
                  value={uploadedDoc.type}
                  onChange={(e) => setUploadedDoc({ ...uploadedDoc, type: e.target.value })}
                  className="w-full px-4 py-3 bg-primary-black border border-accent-gold/20 rounded-xl text-white focus:outline-none focus:border-accent-gold transition-colors"
                >
                  <option value="waybill">Waybill (POD)</option>
                  <option value="customs_declaration">Customs SAD500</option>
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
                  placeholder="e.g. SAD500-Zim-Inbound-99.pdf"
                  className="w-full px-4 py-3 bg-primary-black border border-accent-gold/20 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-accent-gold transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 gold-gradient text-primary-deep font-extrabold rounded-xl transition shadow-lg shadow-accent-gold/10 text-sm"
              >
                Confirm Upload
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
