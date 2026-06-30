"use client";

import React from 'react';
import { PortalPageHeader } from '@/components/portals/PortalPageHeader';
import { PortalDataTable } from '@/components/portals/PortalDataTable';
import { PortalStatusBadge } from '@/components/portals/PortalStatusBadge';
import { TrackingMap } from '@/components/TrackingMap';

export default function TruckingTrackingPortal() {
  const activeTrackers = [
    { id: 'TRK-1001', lat: 60, lng: 45, label: 'Run: JHB to HRE', status: 'In Transit' },
    { id: 'TRK-1004', lat: 30, lng: 35, label: 'Run: PTA to MAP', status: 'Pending' },
  ];

  const columns = [
    { key: 'id', header: 'Reference ID' },
    { key: 'label', header: 'Run Details' },
    { key: 'lastPing', header: 'Last GPS Ping' },
    { 
      key: 'status', 
      header: 'Status',
      render: (row: any) => <PortalStatusBadge status={row.status} />
    },
  ];

  const tableData = [
    { id: 'TRK-1001', label: 'Run: JHB to HRE', lastPing: '2 mins ago (N1 Highway)', status: 'In Transit' },
    { id: 'TRK-1004', label: 'Run: PTA to MAP', lastPing: '1 hr ago (Pretoria Depot)', status: 'Pending' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <PortalPageHeader 
        title="Live Fleet Tracking" 
        description="Monitor the real-time position of your active loads."
      />

      {/* Light Theme map for Customer Portal */}
      <TrackingMap markers={activeTrackers} isDarkTheme={false} />

      <div className="pt-4">
        <h3 className="text-gray-900 font-bold text-lg mb-4">Active GPS Units</h3>
        <PortalDataTable columns={columns} data={tableData} />
      </div>
    </div>
  );
}
