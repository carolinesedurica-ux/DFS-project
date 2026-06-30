"use client";

import React from 'react';
import { PortalPageHeader } from '@/components/portals/PortalPageHeader';
import { PortalMetricCard } from '@/components/portals/PortalMetricCard';
import { PortalDataTable } from '@/components/portals/PortalDataTable';
import { PortalStatusBadge } from '@/components/portals/PortalStatusBadge';
import { customerMockData } from '@/lib/mockData';
import Link from 'next/link';
import { Truck, FileText, CheckCircle } from 'lucide-react';

export default function TruckingDashboard() {
  const columns = [
    { key: 'id', header: 'Reference ID' },
    { key: 'origin', header: 'Origin' },
    { key: 'destination', header: 'Destination' },
    { key: 'date', header: 'Dispatch Date' },
    { key: 'eta', header: 'Est. Arrival' },
    { 
      key: 'documents', 
      header: 'Documents',
      render: (row: any) => (
        <span className={`text-xs font-medium ${row.documents === 'Available' ? 'text-primary-royal' : 'text-gray-400'}`}>
          {row.documents}
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
        title="My Trucking Dashboard" 
        description="Track your cross-border shipments, view live ETAs, and download PODs."
        actions={<Link href="/trucking/quotes" className="bg-primary-royal text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:bg-primary-deep transition-all">Book New Load</Link>}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PortalMetricCard title="Active Shipments" value="2" trend="On Schedule" trendDirection="neutral" icon={<Truck className="h-6 w-6" />} />
        <PortalMetricCard title="Pending Quotes" value="1" trend="Awaiting your approval" trendDirection="neutral" icon={<FileText className="h-6 w-6" />} />
        <PortalMetricCard title="Delivered (YTD)" value="14" trend="+3 vs last year" trendDirection="up" icon={<CheckCircle className="h-6 w-6" />} />
      </div>

      <div className="pt-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900 font-bold text-lg">My Recent Shipments</h3>
          <Link href="/trucking/shipments" className="text-primary-royal text-sm font-semibold hover:underline">View All</Link>
        </div>
        <PortalDataTable columns={columns} data={customerMockData.truckingShipments} />
      </div>
    </div>
  );
}
