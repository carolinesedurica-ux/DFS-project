"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { FileText, Download, CheckCircle, Clock, AlertTriangle, ArrowRight, CreditCard, Receipt, Loader2 } from 'lucide-react';
import { PortalPageHeader } from '@/components/portals/PortalPageHeader';
import { PortalMetricCard } from '@/components/portals/PortalMetricCard';
import { PortalDataTable } from '@/components/portals/PortalDataTable';
import { PortalStatusBadge } from '@/components/portals/PortalStatusBadge';

export function CustomerFinanceView() {
  const { user } = useAuth();
  const [invoices, setInvoices] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Map mock customer IDs to seeded company UUID for data matching
  const companyId = user?.customerId === 'cust-001' 
    ? '22222222-2222-2222-2222-222222222222' 
    : user?.companyName;

  useEffect(() => {
    async function loadFinanceData() {
      if (!companyId) {
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`/api/invoices?companyId=${companyId}`);
        const data = await response.json();
        setInvoices(data);
        
        // Mock payments history for the customer portal
        setPayments([
          { id: 'PAY-8921820', invoice: 'INV-2026-002', amount: '$3,534.00', method: 'EFT Transfer', date: '2026-06-25', status: 'Completed' }
        ]);
      } catch (err) {
        console.error('Failed to load client invoices:', err);
      } finally {
        setLoading(false);
      }
    }

    loadFinanceData();
  }, [companyId]);

  // Calculate stats
  let totalOutstanding = 0;
  let totalPaid = 3534; // from mock payments
  
  invoices.forEach(inv => {
    const total = Number(inv.amount) + Number(inv.tax_amount);
    if (inv.status !== 'paid') {
      totalOutstanding += total;
    }
  });

  const columns = [
    { key: 'invoice_number', header: 'Invoice Number' },
    { 
      key: 'created_at', 
      header: 'Issue Date',
      render: (row: any) => new Date(row.created_at).toLocaleDateString()
    },
    { 
      key: 'due_date', 
      header: 'Due Date',
      render: (row: any) => new Date(row.due_date).toLocaleDateString()
    },
    { 
      key: 'amount', 
      header: 'Amount',
      render: (row: any) => `$${Number(row.amount).toFixed(2)}`
    },
    { 
      key: 'tax_amount', 
      header: 'Tax (14% VAT)',
      render: (row: any) => `$${Number(row.tax_amount).toFixed(2)}`
    },
    {
      key: 'total',
      header: 'Total Due',
      render: (row: any) => `$${(Number(row.amount) + Number(row.tax_amount)).toFixed(2)}`
    },
    { 
      key: 'status', 
      header: 'Payment Status',
      render: (row: any) => <PortalStatusBadge status={row.status} />
    },
    {
      key: 'actions',
      header: 'Action',
      render: (row: any) => (
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => alert(`Downloading PDF for ${row.invoice_number}...`)}
            className="text-gray-500 hover:text-primary-royal p-1.5 rounded hover:bg-gray-100 transition-colors"
            title="Download PDF Invoice"
          >
            <Download className="h-4 w-4" />
          </button>
          {row.status !== 'paid' && (
            <button 
              onClick={() => alert(`Redirecting to payment gateway for ${row.invoice_number}...`)}
              className="text-xs bg-primary-royal text-white font-bold px-2 py-1 rounded hover:bg-primary-deep"
            >
              Pay Now
            </button>
          )}
        </div>
      )
    }
  ];

  const paymentColumns = [
    { key: 'id', header: 'Receipt Reference' },
    { key: 'invoice', header: 'Applied Invoice' },
    { key: 'amount', header: 'Amount Paid' },
    { key: 'method', header: 'Payment Method' },
    { key: 'date', header: 'Processing Date' },
    { 
      key: 'status', 
      header: 'Status',
      render: (row: any) => (
        <span className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-600">
          <CheckCircle className="h-3 w-3" />
          <span>{row.status}</span>
        </span>
      )
    }
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary-royal" />
        <span className="text-sm font-semibold text-gray-500">Loading account financials...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <PortalPageHeader 
        title="Billing & Statements" 
        description="Monitor your outstanding balances, view Sage synchronized invoices, and make secure payments."
        actions={
          <button 
            onClick={() => alert('Opening statement PDF generator...')}
            className="border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-bold px-4 py-2.5 rounded-xl text-sm shadow-sm transition-all"
          >
            Generate Statement
          </button>
        }
      />

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PortalMetricCard 
          title="Outstanding Balance" 
          value={`$${totalOutstanding.toFixed(2)}`} 
          trend={totalOutstanding > 0 ? "Filing Overdue Alert" : "Account Clear"} 
          trendDirection={totalOutstanding > 0 ? "down" : "up"} 
          icon={<Clock className="h-6 w-6 text-primary-royal" />} 
        />
        <PortalMetricCard 
          title="Paid (Year-to-Date)" 
          value={`$${totalPaid.toFixed(2)}`} 
          trend="Sage Confirmed" 
          trendDirection="up" 
          icon={<CheckCircle className="h-6 w-6 text-emerald-500" />} 
        />
        <PortalMetricCard 
          title="Unapplied Credit Notes" 
          value="$0.00" 
          trend="None available" 
          trendDirection="neutral" 
          icon={<Receipt className="h-6 w-6 text-gray-400" />} 
        />
      </div>

      {/* Invoices List */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <FileText className="h-5 w-5 text-primary-royal" />
          <h3 className="text-gray-900 font-bold text-lg">Invoice Ledger</h3>
        </div>
        <PortalDataTable columns={columns} data={invoices} />
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <Receipt className="h-5 w-5 text-emerald-500" />
          <h3 className="text-gray-900 font-bold text-lg">Recent Receipts & Payments</h3>
        </div>
        <PortalDataTable columns={paymentColumns} data={payments} />
      </div>
    </div>
  );
}
export default CustomerFinanceView;
