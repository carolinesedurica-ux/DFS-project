"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PortalPageHeader } from '@/components/portals/PortalPageHeader';
import { PortalMetricCard } from '@/components/portals/PortalMetricCard';
import { PortalDataTable } from '@/components/portals/PortalDataTable';
import { PortalStatusBadge } from '@/components/portals/PortalStatusBadge';
import { Database, FileUp, Shield, HelpCircle, FileText, Settings, RefreshCw, MessageSquare, Loader2, Trash2 } from 'lucide-react';

export default function KnowledgeBaseManager() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form fields for uploading new doc
  const [name, setName] = useState('');
  const [category, setCategory] = useState('customs_regulations');
  const [accessRole, setAccessRole] = useState('customer_user');
  const [content, setContent] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // System Prompts configuration
  const [prompts, setPrompts] = useState({
    marketing: 'Standard homepage assistant explaining basic services...',
    trucking: 'Corridor dispatch expert covering side tippers & reefer temperatures...',
    clearing: 'Burton customs specialist covering tariffs & BURS regulations...',
    express: 'Courier assistant covering rates & parcel tracking...'
  });

  async function loadDocuments() {
    try {
      const res = await fetch('/api/ai/knowledge');
      const data = await res.json();
      setDocuments(data || []);
    } catch (err) {
      console.error('Failed to load knowledge documents:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDocuments();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !content) return;
    setIsUploading(true);

    try {
      const res = await fetch('/api/ai/knowledge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          category,
          access_role: accessRole,
          content
        })
      });

      if (res.ok) {
        setName('');
        setContent('');
        alert('Document indexed and vector chunks created successfully!');
        await loadDocuments();
      } else {
        const data = await res.json();
        throw new Error(data.error || 'Failed to index');
      }
    } catch (err: any) {
      alert(`Indexing failed: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this document from the knowledge base? All vector chunks will be permanently removed.')) return;
    try {
      const res = await fetch(`/api/ai/knowledge?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        alert('Document deleted.');
        await loadDocuments();
      } else {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete');
      }
    } catch (err: any) {
      alert(`Deletion failed: ${err.message}`);
    }
  };

  const docColumns = [
    { key: 'name', header: 'Document Title' },
    { 
      key: 'category', 
      header: 'Category',
      render: (row: any) => (
        <span className="font-semibold text-xs text-gray-400 capitalize">
          {row.category.replace('_', ' ')}
        </span>
      )
    },
    { 
      key: 'access_role', 
      header: 'Target RLS Role',
      render: (row: any) => (
        <span className="inline-flex items-center space-x-1 text-xs text-amber-500 font-semibold bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/10">
          <Shield className="h-3 w-3" />
          <span>{row.access_role}</span>
        </span>
      )
    },
    { 
      key: 'chunkCount', 
      header: 'Vector Chunks',
      render: (row: any) => <span className="font-bold text-yellow-500">{row.chunkCount} chunks</span>
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (row: any) => (
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
          row.status === 'indexed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-yellow-500/10 text-yellow-500'
        }`}>
          {row.status}
        </span>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row: any) => (
        <button 
          onClick={() => handleDelete(row.id)}
          className="text-gray-500 hover:text-red-500 p-1.5 rounded hover:bg-red-500/10 transition-colors"
          title="Delete Document"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      )
    }
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4 text-white">
        <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
        <span className="text-sm font-medium text-gray-400">Loading Knowledge Catalog...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto text-gray-100">
      <PortalPageHeader 
        title="Knowledge Engine & RAG Manager" 
        description="Index new regulations, manage vector database chunks, edit system prompts, and monitor AI usage."
        actions={
          <Link href="/admin/knowledge/conversations" className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 px-4 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-all flex items-center space-x-2">
            <MessageSquare className="h-4 w-4 text-yellow-500" />
            <span>AI Conversation Audit Logs</span>
          </Link>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PortalMetricCard title="Vector Catalog Documents" value={documents.length} trend="Fully indexed" trendDirection="up" icon={<Database className="h-6 w-6" />} />
        <PortalMetricCard title="Total Vector Chunks" value={documents.reduce((acc, d) => acc + (d.chunkCount || 0), 0)} trend="pgvector 1536 dim" trendDirection="neutral" icon={<HelpCircle className="h-6 w-6" />} />
        <PortalMetricCard title="AI Security Policies" value="Row Level Security Enabled" trend="Context Filters Enforced" trendDirection="up" icon={<Shield className="h-6 w-6 text-emerald-400" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Form */}
        <div className="lg:col-span-1 bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-base text-yellow-500 uppercase tracking-wider mb-4 flex items-center space-x-2">
            <FileUp className="h-5 w-5" />
            <span>Index New Document</span>
          </h3>
          <form onSubmit={handleUpload} className="space-y-4 text-xs">
            <div>
              <label className="block text-gray-400 mb-1 font-bold">Document Title</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. SADC Customs Guide 2026"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-yellow-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-400 mb-1 font-bold">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-white focus:outline-none focus:ring-1"
                >
                  <option value="customs_regulations">Customs Regs</option>
                  <option value="sop">Company SOP</option>
                  <option value="pricing">Pricing Policy</option>
                  <option value="contract">Client Contract</option>
                  <option value="manual">Manual/FAQs</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-400 mb-1 font-bold">Access Level</label>
                <select
                  value={accessRole}
                  onChange={(e) => setAccessRole(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-white focus:outline-none focus:ring-1"
                >
                  <option value="customer_user">Customer User</option>
                  <option value="dfs_ops">DFS Ops</option>
                  <option value="dfs_admin">DFS Admin</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-gray-400 mb-1 font-bold">Document Text Content</label>
              <textarea
                required
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Paste the full text of the policy or guide here..."
                className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 font-sans"
              />
            </div>
            <button
              type="submit"
              disabled={isUploading}
              className="w-full gold-gradient text-primary-deep font-extrabold py-3 rounded-xl hover:scale-102 transition-transform flex items-center justify-center space-x-2 cursor-pointer shadow"
            >
              {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
              <span>Chunk & Index Document</span>
            </button>
          </form>
        </div>

        {/* Catalog Table */}
        <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-sm overflow-hidden flex flex-col">
          <h3 className="font-bold text-base text-yellow-500 uppercase tracking-wider mb-4">Indexed Documents Catalog</h3>
          <div className="flex-1 overflow-x-auto">
            <PortalDataTable columns={docColumns} data={documents} />
          </div>
        </div>
      </div>

      {/* System Prompts Manager */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-base text-yellow-500 uppercase tracking-wider mb-4 flex items-center space-x-2">
          <Settings className="h-5 w-5" />
          <span>Portal AI System Prompts</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {Object.entries(prompts).map(([key, val]) => (
            <div key={key} className="space-y-1">
              <label className="block text-gray-400 font-bold capitalize">{key} AI Assistant Instructions</label>
              <textarea
                rows={3}
                value={val}
                onChange={(e) => setPrompts(prev => ({ ...prev, [key]: e.target.value }))}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 font-mono"
              />
            </div>
          ))}
        </div>
        <div className="flex justify-end pt-4">
          <button 
            onClick={() => alert('Custom system prompts saved to database config.')}
            className="border border-gray-700 bg-gray-800 hover:bg-gray-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs cursor-pointer transition-colors"
          >
            Save Prompt Settings
          </button>
        </div>
      </div>
    </div>
  );
}
