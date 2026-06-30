"use client";

import React from 'react';
import { PageHeader } from '@/components/admin/PageHeader';
import { MetricCard } from '@/components/admin/MetricCard';
import { DataTable } from '@/components/admin/DataTable';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { mockTruckingShipments } from '@/lib/mockData';
import { Truck, MapPin, AlertCircle } from 'lucide-react';

export default function TruckingAdminDashboard() {
  const columns = [
    { key: 'id', header: 'Shipment ID' },
    { key: 'company', header: 'Company' },
    { key: 'origin', header: 'Origin' },
    { key: 'destination', header: 'Destination' },
    { key: 'driver', header: 'Driver' },
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
        title="Trucking Control Center" 
        description="Monitor active shipments, fleet utilization, and driver assignments."
        actions={<button className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg font-bold text-sm">New Shipment</button>}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard title="Active Shipments" value="24" trend="+3 from yesterday" trendDirection="up" icon={<Truck />} />
        <MetricCard title="Delayed Shipments" value="2" trend="-1 from yesterday" trendDirection="down" icon={<AlertCircle />} />
        <MetricCard title="Fleet Utilization" value="85%" trend="Optimal" trendDirection="neutral" icon={<MapPin />} />
      </div>

      <div className="pt-4">
        <h3 className="text-white font-semibold text-lg mb-4">Recent Shipments</h3>
        <DataTable columns={columns} data={mockTruckingShipments} />
      </div>
    </div>
  );
}
