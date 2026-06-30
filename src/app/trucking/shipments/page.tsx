"use client";

import React from 'react';
import { PortalPageHeader } from '@/components/portals/PortalPageHeader';
import { PortalDataTable } from '@/components/portals/PortalDataTable';
import { PortalStatusBadge } from '@/components/portals/PortalStatusBadge';
import { customerMockData } from '@/lib/mockData';

export default function TruckingShipmentsPortal() {
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
        <button 
          className={`text-xs font-semibold hover:underline ${row.documents === 'Available' ? 'text-primary-royal' : 'text-gray-400 cursor-not-allowed'}`}
          disabled={row.documents !== 'Available'}
        >
          {row.documents === 'Available' ? 'Download POD' : 'Pending'}
        </button>
      )
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (row: any) => <PortalStatusBadge status={row.status} />
    },
  ];

  // We add a few more mock shipments for the full table view
  const extendedShipments = [
    ...customerMockData.truckingShipments,
    { id: 'SHP-9923', origin: 'Ndola, ZM', destination: 'Johannesburg, ZA', status: 'Delivered', date: '2023-10-15', eta: '2023-10-18', documents: 'Available' },
    { id: 'SHP-9924', origin: 'Gaborone, BW', destination: 'Pretoria, ZA', status: 'Delivered', date: '2023-10-10', eta: '2023-10-11', documents: 'Available' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <PortalPageHeader 
        title="All Shipments" 
        description="View your active and historical road freight shipments."
        actions={<button className="border border-gray-200 bg-white text-gray-700 px-4 py-2 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all">Export to Excel</button>}
      />

      <div className="pt-4">
        <PortalDataTable columns={columns} data={extendedShipments} />
      </div>
    </div>
  );
}
