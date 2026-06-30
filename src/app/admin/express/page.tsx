"use client";

import React from 'react';
import { PortalPageHeader } from '@/components/portals/PortalPageHeader';
import { PortalMetricCard } from '@/components/portals/PortalMetricCard';
import { PortalDataTable } from '@/components/portals/PortalDataTable';
import { PortalStatusBadge } from '@/components/portals/PortalStatusBadge';
import { mockExpressParcels } from '@/lib/mockData';
import { Package, Truck, AlertTriangle } from 'lucide-react';

export default function ExpressAdminDashboard() {
  const columns = [
    { key: 'id', header: 'Tracking Number' },
    { key: 'company', header: 'Client / Company' },
    { key: 'destination', header: 'Destination' },
    { key: 'courier', header: 'Assigned Courier' },
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
        title="Express Courier Logistics" 
        description="Monitor parcel volume, courier delivery performance, and routing."
        actions={<button className="bg-primary-royal text-white px-4 py-2 rounded-lg font-bold text-sm">Log Parcel</button>}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PortalMetricCard title="Parcels in Transit" value="1,240" trend="+120 today" trendDirection="up" icon={<Package className="h-6 w-6 text-primary-royal" />} />
        <PortalMetricCard title="Delivery Success Rate" value="98.5%" trend="+0.2% this week" trendDirection="up" icon={<Truck className="h-6 w-6 text-primary-royal" />} />
        <PortalMetricCard title="Failed Deliveries" value="6" trend="-2 from yesterday" trendDirection="down" icon={<AlertTriangle className="h-6 w-6 text-red-500" />} />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-gray-900 font-semibold text-lg mb-4">Live Parcels Feed</h3>
        <PortalDataTable columns={columns} data={mockExpressParcels} />
      </div>
    </div>
  );
}
