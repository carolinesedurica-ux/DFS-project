"use client";

import React from 'react';
import { PageHeader } from '@/components/admin/PageHeader';
import { MetricCard } from '@/components/admin/MetricCard';
import { DataTable } from '@/components/admin/DataTable';
import { StatusBadge } from '@/components/admin/StatusBadge';
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
      render: (row: any) => <StatusBadge status={row.status} />
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Global Operations Tracking" 
        description="Real-time map view and global status updates across all active services."
        actions={<button className="bg-gray-800 text-white px-4 py-2 border border-gray-700 rounded-lg font-medium text-sm hover:bg-gray-700 transition-colors">Export Feed</button>}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard title="Active Units Tracked" value="1,306" trend="Stable" trendDirection="neutral" icon={<Map />} />
        <MetricCard title="System Exceptions" value="12" trend="+3 in last hour" trendDirection="down" icon={<Bell />} />
        <MetricCard title="Avg Update Latency" value="2.4s" trend="-0.1s" trendDirection="up" icon={<Activity />} />
      </div>

      <div className="pt-2">
        {/* Dark Theme map for Admin Portal */}
        <TrackingMap 
          isDarkTheme={true} 
          markers={[
            { id: 'm1', lat: 55, lng: 50, label: 'TRK-1003', status: 'Delayed' },
            { id: 'm2', lat: 30, lng: 70, label: 'EXP-9922', status: 'In Transit' },
            { id: 'm3', lat: 45, lng: 40, label: 'CUS-5091', status: 'Cleared' },
            { id: 'm4', lat: 60, lng: 45, label: 'TRK-1001', status: 'In Transit' },
            { id: 'm5', lat: 75, lng: 60, label: 'EXP-9921', status: 'Delivered' },
          ]} 
        />
      </div>

      <div className="pt-4">
        <h3 className="text-white font-semibold text-lg mb-4">Live Tracking Feed</h3>
        <DataTable columns={columns} data={mockTrackingEvents} />
      </div>
    </div>
  );
}
