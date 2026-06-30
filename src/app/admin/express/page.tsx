"use client";

import React from 'react';
import { PageHeader } from '@/components/admin/PageHeader';
import { MetricCard } from '@/components/admin/MetricCard';
import { DataTable } from '@/components/admin/DataTable';
import { StatusBadge } from '@/components/admin/StatusBadge';
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
      render: (row: any) => <StatusBadge status={row.status} />
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Express Courier Logistics" 
        description="Monitor parcel volume, courier delivery performance, and routing."
        actions={<button className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg font-bold text-sm">Log Parcel</button>}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard title="Parcels in Transit" value="1,240" trend="+120 today" trendDirection="up" icon={<Package />} />
        <MetricCard title="Delivery Success Rate" value="98.5%" trend="+0.2% this week" trendDirection="up" icon={<Truck />} />
        <MetricCard title="Failed Deliveries" value="6" trend="-2 from yesterday" trendDirection="down" icon={<AlertTriangle />} />
      </div>

      <div className="pt-4">
        <h3 className="text-white font-semibold text-lg mb-4">Live Parcels Feed</h3>
        <DataTable columns={columns} data={mockExpressParcels} />
      </div>
    </div>
  );
}
