"use client";

import React from 'react';
import { PageHeader } from '@/components/admin/PageHeader';
import { MetricCard } from '@/components/admin/MetricCard';
import { DataTable } from '@/components/admin/DataTable';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { mockClearingCases } from '@/lib/mockData';
import { FileText, Clock, CheckCircle } from 'lucide-react';

export default function ClearingAdminDashboard() {
  const columns = [
    { key: 'id', header: 'Case Number' },
    { key: 'company', header: 'Company' },
    { key: 'port', header: 'Border Post' },
    { key: 'type', header: 'Type' },
    { key: 'duty', header: 'Duty Amount' },
    { key: 'date', header: 'Date' },
    { 
      key: 'status', 
      header: 'Status',
      render: (row: any) => <StatusBadge status={row.status} />
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Clearing & Forwarding" 
        description="Manage customs cases, borders, duties, and compliance."
        actions={<button className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg font-bold text-sm">Create Case</button>}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard title="Open Cases" value="42" trend="+5 this week" trendDirection="up" icon={<FileText />} />
        <MetricCard title="Avg Clearance Time" value="4.2 Hrs" trend="-0.5 Hrs" trendDirection="up" icon={<Clock />} />
        <MetricCard title="Cleared Today" value="18" trend="Steady" trendDirection="neutral" icon={<CheckCircle />} />
      </div>

      <div className="pt-4">
        <h3 className="text-white font-semibold text-lg mb-4">Active Customs Cases</h3>
        <DataTable columns={columns} data={mockClearingCases} />
      </div>
    </div>
  );
}
