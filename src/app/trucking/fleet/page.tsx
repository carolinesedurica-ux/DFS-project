"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { PortalPageHeader } from '@/components/portals/PortalPageHeader';
import { PortalDataTable } from '@/components/portals/PortalDataTable';
import { PortalStatusBadge } from '@/components/portals/PortalStatusBadge';
import { X } from 'lucide-react';

const fleetGallery = [
  { src: '/images/dfs-fleet-scania-volvo-depot.jpg', caption: 'Scania & Volvo units at the DFS Group depot' },
  { src: '/images/dfs-scania-flatdeck-road.jpg', caption: 'DFS Scania on active SADC corridor run' },
  { src: '/images/dfs-fleet-side-tipper-lineup.jpg', caption: 'Side-tipper fleet with Scania & Volvo units' },
  { src: '/images/dfs-fleet-branding-event.jpg', caption: 'DFS Group fleet at a regional launch event' },
  { src: '/images/dfs-scania-flatdeck-open.jpg', caption: 'Scania DFS08 with flat-deck trailer' },
  { src: '/images/dfs-scania-sunset-depot.jpg', caption: 'DFS Scania fleet at dusk — full operational readiness' },
  { src: '/images/dfs-scania-lineup-blue-sky.jpg', caption: 'DFS Scania lineup under clear Botswana skies' },
  { src: '/images/dfs-volvo-fh-pair.jpg', caption: 'Volvo FH 440 units — NORS delivered fleet' },
  { src: '/images/dfs-fleet-five-scania-rain.jpg', caption: 'DFS fleet of 5 Scania units in the field' },
  { src: '/images/dfs-fleet-scania-overcast.jpg', caption: 'DFS Scania units ready for dispatch' },
  { src: '/images/dfs-volvo-depot-hangar.jpg', caption: 'Volvo FH DFS01 & DFS02 at depot hangar' },
];

export default function TruckingFleetPortal() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const columns = [
    { key: 'id', header: 'Unit ID' },
    { key: 'type', header: 'Configuration' },
    { key: 'registration', header: 'Registration' },
    { key: 'driver', header: 'Assigned Driver' },
    { key: 'lastService', header: 'Last Service' },
    { 
      key: 'status', 
      header: 'Status',
      render: (row: any) => <PortalStatusBadge status={row.status} />
    },
  ];

  const data = [
    { id: 'DFS-01', type: 'Volvo FH 440 (Side Tipper)', registration: 'B459BXT', driver: 'S. Ndlovu', lastService: '2023-10-15', status: 'In Transit' },
    { id: 'DFS-02', type: 'Volvo FH 440 (Side Tipper)', registration: 'B457BXT', driver: 'J. Smith', lastService: '2023-11-01', status: 'Available' },
    { id: 'DFS-03', type: 'Scania R460 (Side Tipper)', registration: 'B708BVK', driver: 'M. Botha', lastService: '2023-09-20', status: 'In Transit' },
    { id: 'DFS-06', type: 'Scania G460 (Flat Deck)', registration: 'B708BVN', driver: 'T. Mokoena', lastService: '2023-10-05', status: 'In Transit' },
    { id: 'DFS-08', type: 'Scania R460 (Flat Deck Link)', registration: 'B708BVN', driver: 'P. Sithole', lastService: '2023-10-28', status: 'Maintenance' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <PortalPageHeader 
        title="Dedicated Fleet" 
        description="View the DFS trucks and trailers currently assigned to your contract."
      />

      {/* Photo Gallery */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-gray-900 font-bold text-lg mb-4">Fleet Gallery</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {fleetGallery.map((img, i) => (
            <button
              key={i}
              onClick={() => setLightboxSrc(img.src)}
              className="relative overflow-hidden rounded-xl aspect-square group cursor-zoom-in"
            >
              <Image
                src={img.src}
                alt={img.caption}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end p-2">
                <p className="text-white text-[10px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity leading-tight line-clamp-2">{img.caption}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Fleet Table */}
      <div>
        <h3 className="text-gray-900 font-bold text-lg mb-4">Active Fleet Units</h3>
        <PortalDataTable columns={columns} data={data} />
      </div>

      {/* Lightbox */}
      {lightboxSrc && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setLightboxSrc(null)}
        >
          <button
            onClick={() => setLightboxSrc(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="relative w-full max-w-4xl aspect-[4/3]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={lightboxSrc}
              alt="Fleet photo enlarged"
              fill
              className="object-contain rounded-xl"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </div>
  );
}
