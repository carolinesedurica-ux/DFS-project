"use client";

import React from 'react';
import { PortalPageHeader } from '@/components/portals/PortalPageHeader';
import { PortalMetricCard } from '@/components/portals/PortalMetricCard';
import { PortalDataTable } from '@/components/portals/PortalDataTable';
import { PortalStatusBadge } from '@/components/portals/PortalStatusBadge';
import { customerMockData } from '@/lib/mockData';
import { PackageSearch, Clock, PackageCheck } from 'lucide-react';

export default function ExpressDashboard() {
  const columns = [
    { key: 'id', header: 'Tracking Number' },
    { key: 'destination', header: 'Destination' },
    { key: 'courier', header: 'Assigned Courier' },
    { key: 'date', header: 'Date Logged' },
    { key: 'signature', header: 'Proof of Delivery' },
    { 
      key: 'status', 
      header: 'Status',
      render: (row: any) => <PortalStatusBadge status={row.status} />
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <PortalPageHeader 
        title="Express Courier Dashboard" 
        description="Track your final-mile parcels and view proof of deliveries."
        actions={<button className="bg-primary-royal text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:bg-primary-deep transition-all">Schedule Collection</button>}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PortalMetricCard title="Parcels in Transit" value="1" trend="Out for delivery" trendDirection="neutral" icon={<PackageSearch className="h-6 w-6" />} />
        <PortalMetricCard title="Avg Delivery Time" value="1.2 Days" trend="Faster than network avg" trendDirection="up" icon={<Clock className="h-6 w-6" />} />
        <PortalMetricCard title="Total Delivered" value="104" trend="This Month" trendDirection="neutral" icon={<PackageCheck className="h-6 w-6" />} />
      </div>

      <div className="pt-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900 font-bold text-lg">My Recent Parcels</h3>
          <button className="text-primary-royal text-sm font-semibold hover:underline">View All</button>
        </div>
        <PortalDataTable columns={columns} data={customerMockData.expressParcels} />
      </div>
    </div>
  );
}
