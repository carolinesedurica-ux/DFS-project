"use client";

import React, { useState } from 'react';
import { Upload, AlertTriangle, CheckCircle, XCircle, FileText, Loader2, ArrowRight, Download, RefreshCw, Bot } from 'lucide-react';
import type { VerificationResult } from '@/services/ai';

export function DocumentVerifier() {
  const [file, setFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState('commercial_invoice');
  const [loadingStep, setLoadingStep] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [report, setReport] = useState<VerificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const steps = [
    'Parsing file structural layout...',
    'Performing optical character extraction (OCR)...',
    'Auditing shipper and consignee matching...',
    'Cross-referencing cargo weights against packing lists...',
    'Checking customs HS code format compliance...',
    'Analyzing signature and official stamp presence...',
    'Compiling final verification report...'
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const runVerification = async () => {
    if (!file) return;
    setIsUploading(true);
    setError(null);

    // Animate scanning steps
    for (let i = 0; i < steps.length; i++) {
      setLoadingStep(steps[i]);
      await new Promise(r => setTimeout(r, 600));
    }

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64Data = reader.result as string;
        try {
          const res = await fetch('/api/ai/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              fileName: file.name,
              fileData: base64Data,
              documentType
            })
          });

          const data = await res.json();
          if (res.ok) {
            setReport(data);
          } else {
            throw new Error(data.error || 'Server error verifying document.');
          }
        } catch (err: any) {
          setError(err.message);
        } finally {
          setIsUploading(false);
        }
      };
    } catch (err: any) {
      setError(err.message);
      setIsUploading(false);
    }
  };

  const reset = () => {
    setFile(null);
    setReport(null);
    setError(null);
  };

  const getScoreColor = (score: number) => {
    if (score >= 95) return 'text-emerald-500 border-emerald-500 bg-emerald-50';
    if (score >= 80) return 'text-amber-500 border-amber-500 bg-amber-50';
    return 'text-red-500 border-red-500 bg-red-50';
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-6 max-w-4xl mx-auto">
      {!report && !isUploading && (
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-gray-900 font-bold text-xl">Document Compliance Audit</h3>
            <p className="text-sm text-gray-500">Upload cargo documents to verify inconsistencies, missing stamps, weight mismatches, and format compliance before submission.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Document Category</label>
              <select
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-royal/20 text-gray-900"
              >
                <option value="commercial_invoice">Commercial Invoice</option>
                <option value="packing_list">Packing List</option>
                <option value="bill_of_lading">Bill of Lading / Waybill</option>
                <option value="certificate_of_origin">Certificate of Origin</option>
                <option value="customs_declaration">Customs Declaration (BURS)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Selected File</label>
              <div className="flex items-center space-x-2 bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-sm h-12">
                <FileText className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600 truncate flex-1">{file ? file.name : 'No file chosen'}</span>
              </div>
            </div>
          </div>

          {/* Dropzone */}
          <div className="border-2 border-dashed border-gray-200 hover:border-primary-royal rounded-2xl p-10 transition-colors flex flex-col items-center justify-center space-y-4 bg-gray-50/50 cursor-pointer relative">
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.png,.jpg,.jpeg"
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <div className="p-4 bg-white rounded-full shadow-sm text-primary-royal">
              <Upload className="h-6 w-6" />
            </div>
            <div className="text-center space-y-1">
              <p className="text-sm font-bold text-gray-800">Drag & Drop document or Click to Browse</p>
              <p className="text-xs text-gray-500">Supports PDF, PNG, JPG, JPEG (Max 10MB)</p>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-4 rounded-xl flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex justify-end pt-2">
            <button
              onClick={runVerification}
              disabled={!file}
              className={`px-6 py-3 rounded-xl font-bold text-sm shadow-sm transition-all flex items-center space-x-2 ${
                file 
                  ? 'bg-primary-royal text-white hover:bg-primary-deep cursor-pointer' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <span>Audit Document</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Scanning loading state */}
      {isUploading && (
        <div className="py-12 flex flex-col items-center justify-center space-y-6">
          <div className="relative flex items-center justify-center">
            <div className="absolute h-24 w-24 rounded-full border-4 border-primary-royal/10 border-t-primary-royal animate-spin" />
            <Bot className="h-10 w-10 text-primary-royal animate-bounce" />
          </div>
          <div className="text-center space-y-2 max-w-sm">
            <h4 className="text-gray-900 font-bold text-lg">AI Auditor Running</h4>
            <p className="text-xs text-gray-400 animate-pulse font-medium">{loadingStep}</p>
          </div>
        </div>
      )}

      {/* Results View */}
      {report && (
        <div className="space-y-8 animate-fade-in-up">
          {/* Header Summary */}
          <div className="flex flex-col md:flex-row items-center md:justify-between gap-6 border-b border-gray-100 pb-6">
            <div className="space-y-1.5 text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Verification Status</span>
                {report.status === 'PASSED' ? (
                  <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase">Passed</span>
                ) : (
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase ${report.status === 'FAILED' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'}`}>{report.status}</span>
                )}
              </div>
              <h3 className="text-gray-900 font-bold text-xl truncate max-w-md">{file?.name}</h3>
              <p className="text-xs text-gray-500 font-medium">Audited: {new Date().toLocaleString()}</p>
            </div>

            {/* Score Ring */}
            <div className={`flex items-center space-x-4 border-2 rounded-2xl p-4 shadow-sm ${getScoreColor(report.confidenceScore)}`}>
              <div className="text-center">
                <span className="block text-2xl font-extrabold">{report.confidenceScore}%</span>
                <span className="block text-[9px] uppercase tracking-wider font-bold opacity-80">Compliance Score</span>
              </div>
              <div>
                {report.confidenceScore >= 95 ? (
                  <CheckCircle className="h-10 w-10" />
                ) : report.confidenceScore >= 80 ? (
                  <AlertTriangle className="h-10 w-10" />
                ) : (
                  <XCircle className="h-10 w-10" />
                )}
              </div>
            </div>
          </div>

          {/* Extracted Data & Discrepancies Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Extracted Fields */}
            <div className="bg-gray-50/50 border border-gray-100 rounded-2xl p-5 space-y-4">
              <h4 className="text-gray-800 font-bold text-sm border-b border-gray-200 pb-2">Extracted Fields</h4>
              <div className="space-y-3 text-xs leading-relaxed">
                {[
                  { label: 'Shipper/Exporter', value: report.extractedData.shipper },
                  { label: 'Consignee/Importer', value: report.extractedData.consignee },
                  { label: 'Reference Code', value: report.extractedData.referenceNumber },
                  { label: 'Gross Weight', value: report.extractedData.grossWeight },
                  { label: 'Net Weight', value: report.extractedData.netWeight },
                  { label: 'Total Cargo Value', value: report.extractedData.value ? `${report.extractedData.currency || '$'} ${report.extractedData.value}` : null },
                  { label: 'HS Codes', value: report.extractedData.hsCodes?.join(', ') },
                  { label: 'Signature Verified', value: report.extractedData.signatures ? 'Yes (Signed/Stamped)' : 'No Signature Detected' },
                  { label: 'Doc Date', value: report.extractedData.date }
                ].map((item, idx) => item.value ? (
                  <div key={idx} className="flex justify-between border-b border-gray-100 pb-1.5">
                    <span className="text-gray-500 font-medium">{item.label}</span>
                    <span className="text-gray-900 font-semibold text-right max-w-[200px] truncate">{item.value}</span>
                  </div>
                ) : null)}
              </div>
            </div>

            {/* Discrepancies List */}
            <div className="space-y-4">
              <h4 className="text-gray-800 font-bold text-sm border-b border-gray-100 pb-2">Audit Findings ({report.discrepancies.length})</h4>
              {report.discrepancies.length === 0 ? (
                <div className="bg-emerald-50/50 border border-emerald-100 text-emerald-800 p-5 rounded-2xl flex items-center space-x-3 text-xs leading-relaxed">
                  <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  <div>
                    <p className="font-bold">No issues found!</p>
                    <p className="text-gray-500 font-medium">Document conforms to standard SADC Customs declarations. No discrepancies detected.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {report.discrepancies.map((d, idx) => (
                    <div 
                      key={idx} 
                      className={`p-4 rounded-xl border flex items-start space-x-3 text-xs ${
                        d.severity === 'high' 
                          ? 'bg-red-50 border-red-100 text-red-800' 
                          : d.severity === 'medium'
                            ? 'bg-amber-50 border-amber-100 text-amber-800'
                            : 'bg-blue-50 border-blue-100 text-blue-800'
                      }`}
                    >
                      <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                      <div className="space-y-1">
                        <span className="inline-block bg-white/70 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider">{d.severity}</span>
                        <p className="font-bold capitalize">{d.field}</p>
                        <p className="opacity-90 leading-relaxed font-medium">{d.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Actions & Disclaimer */}
          <div className="border-t border-gray-100 pt-6 space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <button
                onClick={reset}
                className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center justify-center space-x-2 transition-colors cursor-pointer"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Verify Another Document</span>
              </button>
              <button
                onClick={() => alert('Downloading PDF Audit Report...')}
                className="bg-primary-royal hover:bg-primary-deep text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-sm transition-colors cursor-pointer"
              >
                <Download className="h-4 w-4" />
                <span>Export Verification Report</span>
              </button>
            </div>

            <p className="text-[10px] text-gray-400 font-medium leading-normal text-center max-w-2xl mx-auto">
              <strong>Disclaimer:</strong> This compliance report was generated automatically via DFS Artificial Intelligence. Final customs clearing and border processing decisions require physical documentation checks, BURS system verification, and manual approval from certified customs agents.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
export default DocumentVerifier;
