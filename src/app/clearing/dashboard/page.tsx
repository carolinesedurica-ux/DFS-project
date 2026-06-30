"use client";

import React from 'react';
import { PortalPageHeader } from '@/components/portals/PortalPageHeader';
import { PortalMetricCard } from '@/components/portals/PortalMetricCard';
import { PortalDataTable } from '@/components/portals/PortalDataTable';
import { PortalStatusBadge } from '@/components/portals/PortalStatusBadge';
import { customerMockData } from '@/lib/mockData';
import { ShieldCheck, FileSearch, CreditCard } from 'lucide-react';

export default function ClearingDashboard() {
  const columns = [
    { key: 'id', header: 'Case Number' },
    { key: 'port', header: 'Border Post' },
    { key: 'type', header: 'Clearance Type' },
    { key: 'duty', header: 'Duties Owed' },
    { key: 'date', header: 'Submission Date' },
    { 
      key: 'documentStatus', 
      header: 'Documents',
      render: (row: any) => (
        <span className={`text-xs font-medium ${row.documentStatus === 'Complete' ? 'text-green-600' : 'text-yellow-600'}`}>
          {row.documentStatus}
        </span>
      )
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (row: any) => <PortalStatusBadge status={row.status} />
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <PortalPageHeader 
        title="Customs Clearing Dashboard" 
        description="Monitor your border clearances, upload declarations, and pay duties."
        actions={<button className="bg-primary-royal text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:bg-primary-deep transition-all">Upload Documents</button>}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PortalMetricCard title="Open Cases" value="1" trend="Processing at border" trendDirection="neutral" icon={<FileSearch className="h-6 w-6" />} />
        <PortalMetricCard title="Duties Due" value="$0.00" trend="All accounts settled" trendDirection="up" icon={<CreditCard className="h-6 w-6" />} />
        <PortalMetricCard title="Cleared (YTD)" value="28" trend="100% Compliance" trendDirection="neutral" icon={<ShieldCheck className="h-6 w-6" />} />
      </div>

      <div className="pt-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900 font-bold text-lg">My Customs Cases</h3>
          <button className="text-primary-royal text-sm font-semibold hover:underline">View All</button>
        </div>
        <PortalDataTable columns={columns} data={customerMockData.clearingCases} />
      </div>
    </div>
  );
}
