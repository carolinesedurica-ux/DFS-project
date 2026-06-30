"use client";

import React from 'react';
import { PortalPageHeader } from '@/components/portals/PortalPageHeader';
import { PortalMetricCard } from '@/components/portals/PortalMetricCard';
import { PortalDataTable } from '@/components/portals/PortalDataTable';
import { PortalStatusBadge } from '@/components/portals/PortalStatusBadge';
import { TrackingMap } from '@/components/TrackingMap';
import { customerMockData } from '@/lib/mockData';
import Link from 'next/link';
import { Truck, FileText, CheckCircle, MapPin, AlertCircle, ArrowRight } from 'lucide-react';

export default function CustomerTruckingDashboard() {
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
        <span className={`text-xs font-semibold ${row.documents === 'Available' ? 'text-primary-royal' : 'text-gray-400'}`}>
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

  // Map markers for active shipments
  const activeMarkers = [
    { id: 'm1', lat: 62, lng: 71, label: 'DFS-ZA-1034 (Lobatse)', status: 'In Transit' },
    { id: 'm2', lat: 45, lng: 35, label: 'DFS-ZA-1033 (Maun)', status: 'In Transit' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <PortalPageHeader 
        title="My Trucking Dashboard" 
        description="Track your cross-border shipments, view live ETAs, and download PODs."
        actions={
          <Link href="/trucking/quotes" className="bg-primary-royal text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:bg-primary-deep transition-all">
            Book New Load
          </Link>
        }
      />

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PortalMetricCard title="Active Shipments" value="2" trend="On Schedule" trendDirection="neutral" icon={<Truck className="h-6 w-6 text-primary-royal" />} />
        <PortalMetricCard title="Pending Quotes" value="1" trend="Awaiting your approval" trendDirection="neutral" icon={<FileText className="h-6 w-6 text-primary-royal" />} />
        <PortalMetricCard title="Delivered (YTD)" value="14" trend="+3 vs last year" trendDirection="up" icon={<CheckCircle className="h-6 w-6 text-emerald-500" />} />
      </div>

      {/* Map Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="mb-4">
          <h3 className="text-gray-900 font-bold text-lg">Live Shipment Map</h3>
          <p className="text-xs text-gray-500">Live GPS tracking coordinates for your active corridor dispatches.</p>
        </div>
        <TrackingMap markers={activeMarkers} isDarkTheme={false} />
      </div>

      {/* Recent Shipments */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-gray-900 font-bold text-lg">My Recent Shipments</h3>
            <p className="text-xs text-gray-500">Track and review details of your latest consignments.</p>
          </div>
          <Link href="/trucking/shipments" className="text-primary-royal text-sm font-semibold hover:underline flex items-center gap-1">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <PortalDataTable columns={columns} data={customerMockData.truckingShipments} />
      </div>
    </div>
  );
}
