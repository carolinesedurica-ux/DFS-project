"use client";

import React, { useState } from 'react';
import { PortalPageHeader } from '@/components/portals/PortalPageHeader';
import { PortalDataTable } from '@/components/portals/PortalDataTable';
import { PortalStatusBadge } from '@/components/portals/PortalStatusBadge';

export default function TruckingQuotesPortal() {
  const [showModal, setShowModal] = useState(false);

  const columns = [
    { key: 'id', header: 'Quote Ref' },
    { key: 'route', header: 'Route' },
    { key: 'cargo', header: 'Cargo Specs' },
    { key: 'date', header: 'Requested On' },
    { key: 'amount', header: 'Estimated Rate' },
    { 
      key: 'status', 
      header: 'Status',
      render: (row: any) => <PortalStatusBadge status={row.status} />
    },
  ];

  const data = [
    { id: 'QT-2023-1001', route: 'Johannesburg -> Harare', cargo: '34MT Cement (Bagged)', date: '2023-11-20', amount: '$2,450.00', status: 'Pending' },
    { id: 'QT-2023-0942', route: 'Richards Bay -> Gaborone', cargo: '38MT Coal (Bulk)', date: '2023-11-05', amount: '$3,100.00', status: 'Approved' },
    { id: 'QT-2023-0811', route: 'Durban -> Lusaka', cargo: '30MT Fertilizer', date: '2023-10-15', amount: '$4,200.00', status: 'Rejected' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <PortalPageHeader 
        title="Freight Quotations" 
        description="Manage your pending, approved, and historical transport quotes."
        actions={
          <button 
            onClick={() => setShowModal(true)}
            className="bg-primary-royal text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:bg-primary-deep transition-all"
          >
            Request New Quote
          </button>
        }
      />

      <div className="pt-4">
        <PortalDataTable columns={columns} data={data} />
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold text-primary-deep mb-4">Request a Freight Quote</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Origin</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-royal focus:outline-none" placeholder="City, Country" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Destination</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-royal focus:outline-none" placeholder="City, Country" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Cargo Details (Type & Tonnage)</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-royal focus:outline-none" placeholder="e.g. 34MT Bagged Cement" />
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="w-full bg-primary-royal text-white py-3 rounded-xl font-bold text-sm mt-4 hover:bg-primary-deep transition-all"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
