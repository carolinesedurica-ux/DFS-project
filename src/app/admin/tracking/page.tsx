"use client";

import React from 'react';
import { PortalPageHeader } from '@/components/portals/PortalPageHeader';
import { PortalMetricCard } from '@/components/portals/PortalMetricCard';
import { PortalDataTable } from '@/components/portals/PortalDataTable';
import { PortalStatusBadge } from '@/components/portals/PortalStatusBadge';
import { TrackingMap } from '@/components/TrackingMap';
import { mockTrackingEvents } from '@/lib/mockData';
import { Map, Activity, Bell } from 'lucide-react';

export default function TrackingAdminDashboard() {
  const columns = [
    { key: 'entity', header: 'Reference ID' },
    { key: 'service', header: 'Service' },
    { key: 'location', header: 'Last Location' },
    { key: 'time', header: 'Time' },
    { 
      key: 'status', 
      header: 'Status',
      render: (row: any) => <PortalStatusBadge status={row.status} />
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <PortalPageHeader 
        title="Global Operations Tracking" 
        description="Real-time map view and global status updates across all active services."
        actions={<button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors">Export Feed</button>}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PortalMetricCard title="Active Units Tracked" value="1,306" trend="Stable" trendDirection="neutral" icon={<Map className="h-6 w-6 text-primary-royal" />} />
        <PortalMetricCard title="System Exceptions" value="12" trend="+3 in last hour" trendDirection="down" icon={<Bell className="h-6 w-6 text-red-500" />} />
        <PortalMetricCard title="Avg Update Latency" value="2.4s" trend="-0.1s" trendDirection="up" icon={<Activity className="h-6 w-6 text-primary-royal" />} />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="mb-4">
          <h3 className="text-gray-900 font-semibold text-lg">Global Dispatches Map</h3>
          <p className="text-xs text-gray-500 font-mono">Live GPS feed from all active operations</p>
        </div>
        <TrackingMap 
          isDarkTheme={false} 
          markers={[
            { id: 'm1', lat: 55, lng: 50, label: 'TRK-1003', status: 'Delayed' },
            { id: 'm2', lat: 30, lng: 70, label: 'EXP-9922', status: 'In Transit' },
            { id: 'm3', lat: 45, lng: 40, label: 'CUS-5091', status: 'Cleared' },
            { id: 'm4', lat: 60, lng: 45, label: 'TRK-1001', status: 'In Transit' },
            { id: 'm5', lat: 75, lng: 60, label: 'EXP-9921', status: 'Delivered' },
          ]} 
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-gray-900 font-semibold text-lg mb-4">Live Tracking Feed</h3>
        <PortalDataTable columns={columns} data={mockTrackingEvents} />
      </div>
    </div>
  );
}
