"use client";

import React from 'react';
import { PageHeader } from '@/components/admin/PageHeader';
import { MetricCard } from '@/components/admin/MetricCard';
import { DataTable } from '@/components/admin/DataTable';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { mockCompanies } from '@/lib/mockData';
import { Building, Building2, CheckSquare } from 'lucide-react';

export default function CompaniesAdminDashboard() {
  const columns = [
    { key: 'id', header: 'Company ID' },
    { key: 'name', header: 'Company Name' },
    { key: 'type', header: 'Client Type' },
    { key: 'activeShipments', header: 'Active Shipments' },
    { key: 'joined', header: 'Joined Date' },
    { 
      key: 'status', 
      header: 'Account Status',
      render: (row: any) => <StatusBadge status={row.status} />
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Company Management" 
        description="Onboard, approve, and manage client companies across the platform."
        actions={<button className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg font-bold text-sm">Register Company</button>}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard title="Total Registered Companies" value="156" trend="+4 this month" trendDirection="up" icon={<Building />} />
        <MetricCard title="Enterprise Clients" value="42" trend="Stable" trendDirection="neutral" icon={<Building2 />} />
        <MetricCard title="Pending Approvals" value="1" trend="Requires Action" trendDirection="down" icon={<CheckSquare />} />
      </div>

      <div className="pt-4">
        <h3 className="text-white font-semibold text-lg mb-4">Client Roster</h3>
        <DataTable columns={columns} data={mockCompanies} />
      </div>
    </div>
  );
}
