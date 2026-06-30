"use client";

import React from 'react';
import { PortalPageHeader } from '@/components/portals/PortalPageHeader';
import { PortalMetricCard } from '@/components/portals/PortalMetricCard';
import { PortalDataTable } from '@/components/portals/PortalDataTable';
import { PortalStatusBadge } from '@/components/portals/PortalStatusBadge';
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
      render: (row: any) => <PortalStatusBadge status={row.status} />
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <PortalPageHeader 
        title="Clearing & Forwarding" 
        description="Manage customs cases, borders, duties, and compliance."
        actions={<button className="bg-primary-royal text-white px-4 py-2 rounded-lg font-bold text-sm">Create Case</button>}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PortalMetricCard title="Open Cases" value="42" trend="+5 this week" trendDirection="up" icon={<FileText className="h-6 w-6 text-primary-royal" />} />
        <PortalMetricCard title="Avg Clearance Time" value="4.2 Hrs" trend="-0.5 Hrs" trendDirection="up" icon={<Clock className="h-6 w-6 text-primary-royal" />} />
        <PortalMetricCard title="Cleared Today" value="18" trend="Steady" trendDirection="neutral" icon={<CheckCircle className="h-6 w-6 text-emerald-500" />} />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-gray-900 font-semibold text-lg mb-4">Active Customs Cases</h3>
        <PortalDataTable columns={columns} data={mockClearingCases} />
      </div>
    </div>
  );
}
