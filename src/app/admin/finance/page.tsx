"use client";

import React, { useState, useEffect } from 'react';
import { PortalPageHeader } from '@/components/portals/PortalPageHeader';
import { PortalMetricCard } from '@/components/portals/PortalMetricCard';
import { PortalDataTable } from '@/components/portals/PortalDataTable';
import { PortalStatusBadge } from '@/components/portals/PortalStatusBadge';
import { Coins, RefreshCw, Layers, CheckCircle2, AlertOctagon, ShieldAlert, BarChart3, Database } from 'lucide-react';
import { SageService } from '@/services/sage';

export default function AdminFinanceDashboard() {
  const [financeData, setFinanceData] = useState<any>(null);
  const [sageStatus, setSageStatus] = useState<any>(null);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [syncLogs, setSyncLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isReconciling, setIsReconciling] = useState(false);

  async function loadData() {
    try {
      const [invRes, sageRes] = await Promise.all([
        fetch('/api/invoices'),
        fetch('/api/sage/status')
      ]);
      
      const invData = await invRes.json();
      const sageData = await sageRes.json();
      
      setInvoices(invData || []);
      setSageStatus(sageData.status || null);
      setSyncLogs(sageData.recentLogs || []);
      
      // Calculate financial overview stats
      let todayRev = 0;
      let monthlyRev = 0;
      let outstanding = 0;
      let paidTotal = 0;
      
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      invData.forEach((inv: any) => {
        const total = Number(inv.amount) + Number(inv.tax_amount);
        const date = new Date(inv.created_at);
        if (date >= startOfDay) todayRev += total;
        if (date >= startOfMonth) monthlyRev += total;
        if (inv.status === 'paid') paidTotal += total;
        else outstanding += total;
      });

      const expenses = Math.round(monthlyRev * 0.62);
      
      setFinanceData({
        todayRevenue: todayRev,
        monthlyRevenue: monthlyRev,
        outstandingInvoices: outstanding,
        paidInvoices: paidTotal,
        expenses,
        profit: monthlyRev - expenses,
        taxSummary: {
          vatCollected: Math.round((monthlyRev / 1.14) * 0.14),
          taxRate: '14% BURS VAT',
          filingStatus: 'Filing Due: 2026-07-25'
        }
      });
    } catch (err) {
      console.error('Failed to load admin finance data:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const triggerReconciliation = async () => {
    setIsReconciling(true);
    try {
      const res = await fetch('/api/sage/reconcile', { method: 'POST' });
      const data = await res.json();
      alert(`Reconciliation complete! Processed: ${data.totalProcessed}, Success: ${data.successCount}, Failed: ${data.failedCount}`);
      await loadData();
    } catch (err: any) {
      alert(`Reconciliation error: ${err.message}`);
    } finally {
      setIsReconciling(false);
    }
  };

  const invoiceColumns = [
    { key: 'invoice_number', header: 'Invoice #' },
    { 
      key: 'companies', 
      header: 'Company Name',
      render: (row: any) => row.companies?.name || 'Unknown Client'
    },
    { 
      key: 'amount', 
      header: 'Total Due',
      render: (row: any) => `$${(Number(row.amount) + Number(row.tax_amount)).toFixed(2)}`
    },
    { 
      key: 'status', 
      header: 'Filing Status',
      render: (row: any) => <PortalStatusBadge status={row.status} />
    },
    { 
      key: 'sage_sync_status', 
      header: 'Sage Sync',
      render: (row: any) => (
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase ${
          row.sage_sync_status === 'synced' ? 'bg-green-50 text-green-700' :
          row.sage_sync_status === 'failed' ? 'bg-red-50 text-red-700 animate-pulse' : 'bg-gray-50 text-gray-500'
        }`}>
          {row.sage_sync_status}
        </span>
      )
    },
    { key: 'sage_id', header: 'Sage Reference' }
  ];

  const logColumns = [
    { 
      key: 'entity_type', 
      header: 'Entity Type',
      render: (row: any) => <span className="font-bold text-gray-700 capitalize">{row.entity_type}</span>
    },
    { key: 'action', header: 'Action' },
    { 
      key: 'created_at', 
      header: 'Log Timestamp',
      render: (row: any) => new Date(row.created_at).toLocaleString()
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (row: any) => (
        <span className={`inline-flex items-center space-x-1 font-bold text-xs ${row.status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {row.status === 'success' ? <CheckCircle2 className="h-3.5 w-3.5" /> : <AlertOctagon className="h-3.5 w-3.5" />}
          <span>{row.status.toUpperCase()}</span>
        </span>
      )
    },
    { 
      key: 'error_message', 
      header: 'Audit Note / Error',
      render: (row: any) => <span className="text-gray-500 max-w-[250px] truncate block">{row.error_message || 'OK'}</span>
    }
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4 text-white">
        <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
        <span className="text-sm font-medium text-gray-400">Loading Enterprise Ledger...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto text-gray-100">
      <PortalPageHeader 
        title="Finance Control Centre" 
        description="Monitor corporate revenues, inspect Sage synchronizations, and reconcile regional billing ledgers."
        actions={
          <button 
            onClick={triggerReconciliation}
            disabled={isReconciling}
            className="gold-gradient text-primary-deep px-5 py-2.5 rounded-xl font-extrabold text-sm shadow-md hover:scale-102 transition-transform flex items-center space-x-2 cursor-pointer"
          >
            {isReconciling ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            <span>Reconcile Sage Ledger</span>
          </button>
        }
      />

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <PortalMetricCard title="Today's Booked Revenue" value={`$${(financeData?.todayRevenue || 0).toFixed(2)}`} trend="Live dispatches" trendDirection="up" icon={<Coins className="h-5 w-5" />} />
        <PortalMetricCard title="Monthly Accrued Revenue" value={`$${(financeData?.monthlyRevenue || 0).toFixed(2)}`} trend="Accruing billing cycles" trendDirection="neutral" icon={<BarChart3 className="h-5 w-5" />} />
        <PortalMetricCard title="Awaiting Invoicing" value={`$${(financeData?.outstandingInvoices || 0).toFixed(2)}`} trend="Aged debt monitoring" trendDirection="down" icon={<ShieldAlert className="h-5 w-5" />} />
        <PortalMetricCard title="Burton VAT Collected" value={`$${(financeData?.taxSummary?.vatCollected || 0).toFixed(2)}`} trend="BURS VAT (14%)" trendDirection="neutral" icon={<Layers className="h-5 w-5" />} />
      </div>

      {/* Sage Connection Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-base text-yellow-500 uppercase tracking-wider">Sage Sync Engine</h3>
              <span className="bg-green-500/10 text-green-400 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Online</span>
            </div>
            
            <div className="space-y-3 text-xs leading-relaxed text-gray-300">
              <div className="flex justify-between border-b border-gray-800 pb-1.5">
                <span className="text-gray-500">Active API Mode</span>
                <span className="font-semibold text-white">{sageStatus?.mode}</span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-1.5">
                <span className="text-gray-500">Sync Health Rate</span>
                <span className="font-semibold text-green-400">{sageStatus?.syncHealthRate}%</span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-1.5">
                <span className="text-gray-500">Transactions Synced</span>
                <span className="font-semibold text-white">{sageStatus?.totalSynced}</span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-1.5">
                <span className="text-gray-500">Pending Retries</span>
                <span className="font-semibold text-yellow-500">{sageStatus?.pendingRetries}</span>
              </div>
              <div className="flex justify-between pb-1.5">
                <span className="text-gray-500">Sync Latency</span>
                <span className="font-semibold text-white">{sageStatus?.latencyMs} ms</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-800 mt-4">
            <button 
              onClick={() => alert('Testing Sage Client OAuth token handshake...')}
              className="w-full border border-gray-700 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center space-x-1 transition-colors cursor-pointer"
            >
              <Database className="h-3.5 w-3.5 text-yellow-500" />
              <span>Test Handshake</span>
            </button>
          </div>
        </div>

        {/* Sync Logs */}
        <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-sm overflow-hidden flex flex-col">
          <h3 className="font-bold text-base text-yellow-500 uppercase tracking-wider mb-4">Reconciliation Logs</h3>
          <div className="flex-1 overflow-x-auto">
            <PortalDataTable columns={logColumns} data={syncLogs} />
          </div>
        </div>
      </div>

      {/* Invoice Ledger */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-base text-yellow-500 uppercase tracking-wider mb-4">General Invoicing Ledger</h3>
        <PortalDataTable columns={invoiceColumns} data={invoices} />
      </div>
    </div>
  );
}
// Loader component fallback since Lucide isn't fully imported
import { Loader2 } from 'lucide-react';
