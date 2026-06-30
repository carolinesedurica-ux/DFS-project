"use client";

import React from 'react';
import { PortalPageHeader } from '@/components/portals/PortalPageHeader';
import { PortalMetricCard } from '@/components/portals/PortalMetricCard';
import { PortalDataTable } from '@/components/portals/PortalDataTable';
import { PortalStatusBadge } from '@/components/portals/PortalStatusBadge';
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
      render: (row: any) => <PortalStatusBadge status={row.status} />
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <PortalPageHeader 
        title="Company Management" 
        description="Onboard, approve, and manage client companies across the platform."
        actions={<button className="bg-primary-royal text-white px-4 py-2 rounded-lg font-bold text-sm">Register Company</button>}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PortalMetricCard title="Total Registered Companies" value="156" trend="+4 this month" trendDirection="up" icon={<Building className="h-6 w-6 text-primary-royal" />} />
        <PortalMetricCard title="Enterprise Clients" value="42" trend="Stable" trendDirection="neutral" icon={<Building2 className="h-6 w-6 text-primary-royal" />} />
        <PortalMetricCard title="Pending Approvals" value="1" trend="Requires Action" trendDirection="down" icon={<CheckSquare className="h-6 w-6 text-amber-500" />} />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-gray-900 font-semibold text-lg mb-4">Client Roster</h3>
        <PortalDataTable columns={columns} data={mockCompanies} />
      </div>
    </div>
  );
}
