"use client";

import React, { useState, useEffect } from 'react';
import { PortalPageHeader } from '@/components/portals/PortalPageHeader';
import { PortalMetricCard } from '@/components/portals/PortalMetricCard';
import { PortalDataTable } from '@/components/portals/PortalDataTable';
import { PortalStatusBadge } from '@/components/portals/PortalStatusBadge';
import { TrackingMap } from '@/components/TrackingMap';
import { mockTruckingShipments } from '@/lib/mockData';
import { Truck, MapPin, AlertCircle, Clock, Zap, Radio, Bell, ArrowRight, Activity, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

/* -- Fake live telemetry logs ---------------------------------- */
const telemetryLogs = [
  { truck: 'BOT-FT-412', log: 'Axle load nominal — 24h avg', time: '02:14' },
  { truck: 'BOT-FT-415', log: 'Speed alert cleared — now compliant', time: '04:32' },
  { truck: 'BOT-FT-412', log: 'Border crossing — Ramokgwebana', time: '06:55' },
  { truck: 'BOT-FT-415', log: 'Fuel level 45% — scheduled stop ahead', time: '09:10' },
  { truck: 'BOT-FT-412', log: 'High axle load Axle 3 — monitoring', time: '11:28', alert: true },
  { truck: 'BOT-FT-415', log: 'ETA updated — 8h 40m remaining', time: '13:05' },
  { truck: 'BOT-FT-412', log: 'Real-time telemetry — normal', time: '15:44' },
  { truck: 'BOT-FT-415', log: 'Driver rest stop — 45 min', time: '17:20' },
];

/* Milestone stepper (light theme) */
function MilestoneStepper({ step }: { step: number }) {
  const steps = ['Depot', 'Border', 'Transit', 'Depot'];
  return (
    <div className="flex items-center gap-1 mt-1">
      {steps.map((s, i) => (
        <React.Fragment key={s}>
          <div className={`h-1.5 flex-1 rounded-full ${i < step ? 'bg-primary-royal' : 'bg-gray-100'}`} />
        </React.Fragment>
      ))}
    </div>
  );
}

export default function TruckingAdminDashboard() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  const columns = [
    { key: 'id', header: 'Shipment ID' },
    { key: 'company', header: 'Company' },
    { key: 'origin', header: 'Origin' },
    { key: 'destination', header: 'Destination' },
    { key: 'driver', header: 'Driver' },
    { key: 'date', header: 'Dispatch Date' },
    { 
      key: 'status', 
      header: 'Status',
      render: (row: any) => <PortalStatusBadge status={row.status} />
    },
  ];

  // Map markers for global tracking
  const markers = [
    { id: 'm1', lat: 62, lng: 71, label: 'TRK-1003 (Lobatse)', status: 'In Transit' },
    { id: 'm2', lat: 45, lng: 35, label: 'EXP-9922 (Maun)', status: 'In Transit' },
    { id: 'm3', lat: 55, lng: 50, label: 'CUS-5091 (Plumtree)', status: 'Cleared' },
    { id: 'm4', lat: 68, lng: 69, label: 'TRK-1001 (Francistown)', status: 'In Transit' },
    { id: 'm5', lat: 75, lng: 60, label: 'EXP-9921 (Gaborone)', status: 'Delivered' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <PortalPageHeader 
        title="Trucking Control Center" 
        description={`DFS Control Tower Corridor dispatches · Live: ${time}`}
        actions={
          <button className="bg-primary-royal text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:bg-primary-deep transition-all">
            New Shipment Dispatch
          </button>
        }
      />

      {/* Metric Cards (Clean Light Theme) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PortalMetricCard title="Active Shipments" value="24" trend="+3 from yesterday" trendDirection="up" icon={<Truck className="h-6 w-6 text-primary-royal" />} />
        <PortalMetricCard title="Delayed Shipments" value="2" trend="-1 from yesterday" trendDirection="down" icon={<AlertCircle className="h-6 w-6 text-red-500" />} />
        <PortalMetricCard title="Fleet Utilization" value="85%" trend="Optimal load density" trendDirection="neutral" icon={<MapPin className="h-6 w-6 text-primary-royal" />} />
      </div>

      {/* Live Map Panel */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-gray-900 font-bold text-lg">Active SADC Corridor Dispatches</h3>
            <p className="text-xs text-gray-500">Live GPS tracking and telemetry for all client operations.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-600 font-mono">System Live</span>
          </div>
        </div>
        <TrackingMap markers={markers} isDarkTheme={false} />
      </div>

      {/* Fleet Operations & Milestones Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Recent Shipments (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between">
          <div>
            <div className="mb-4">
              <h3 className="text-gray-900 font-bold text-lg">Live Shipments</h3>
              <p className="text-xs text-gray-500">Active dispatches along SADC routes.</p>
            </div>
            <PortalDataTable columns={columns} data={mockTruckingShipments} />
          </div>
        </div>

        {/* Right Side: Tracking Milestones & Activity (4 Cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
          <div>
            <h3 className="text-gray-900 font-bold text-lg">Dispatches Milestones</h3>
            <p className="text-xs text-gray-500">Milestone completion tracker.</p>
          </div>
          <div className="space-y-4">
            {[
              { id: 'DFS-ZA-1034', dest: 'Johannesburg', step: 2, status: 'In Transit' },
              { id: 'DFS-ZA-1033', dest: 'Walvis Bay', step: 1, status: 'Departed' },
              { id: 'DFS-ZA-1032', dest: 'Gaborone', step: 4, status: 'Arr. Gaborone' },
              { id: 'DFS-ZA-1031', dest: 'Gaborone', step: 4, status: 'Arr. Gaborone' },
            ].map(m => (
              <div key={m.id} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                <div className="flex justify-between items-center text-xs font-semibold mb-1">
                  <span className="text-primary-royal font-mono">{m.id}</span>
                  <span className="text-gray-600">{m.dest}</span>
                </div>
                <MilestoneStepper step={m.step} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Truck Axle Telemetry Logs Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="border-b border-gray-100 pb-4 mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-gray-900 font-bold text-lg">Truck Axle Telemetry Logs</h3>
            <p className="text-xs text-gray-500">Real-time axle loading and weight distribution sensor reports.</p>
          </div>
          <div className="text-xs text-gray-400 font-mono">Sensors active: 94/94</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Telemetry Logs feed */}
          <div className="lg:col-span-1 border border-gray-100 rounded-xl overflow-hidden divide-y divide-gray-100">
            <div className="bg-gray-50 px-4 py-2 text-xs font-bold text-gray-600 flex justify-between">
              <span>BOT-FT-412 dispatches</span>
              <span className="text-primary-royal cursor-pointer">Detailed log</span>
            </div>
            <div className="max-h-60 overflow-y-auto">
              {telemetryLogs.map((log, i) => (
                <div key={i} className={`p-3 text-xs flex gap-3 ${log.alert ? 'bg-red-50' : 'hover:bg-gray-50'}`}>
                  <span className="text-gray-400 font-mono flex-shrink-0">{log.time}</span>
                  <div>
                    <span className="font-bold text-gray-700">{log.truck}</span>
                    {log.alert && <span className="ml-1.5 inline-block text-[10px] font-bold text-red-600 bg-red-100 px-1 rounded">Axle 3 Overload</span>}
                    <p className="text-gray-500 mt-0.5">{log.log}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Axle loading indicator */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-700">Axle Weight Load (kg)</span>
              <div className="flex gap-4 text-[10px] font-semibold text-gray-500">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-emerald-500 rounded-full inline-block" />Axle 1</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-amber-500 rounded-full inline-block" />Axle 2</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-red-500 rounded-full inline-block" />Axle 3</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-sky-500 rounded-full inline-block" />Axle 4</span>
              </div>
            </div>

            {/* Load visual bars */}
            <div className="space-y-3 bg-gray-50 p-4 rounded-xl">
              {[
                { label: 'Axle 1 (Front)', weight: 1200, max: 2000, color: 'bg-emerald-500' },
                { label: 'Axle 2 (Drive)', weight: 1540, max: 2000, color: 'bg-amber-500' },
                { label: 'Axle 3 (Trailer 1) ⚠', weight: 1890, max: 2000, color: 'bg-red-500' },
                { label: 'Axle 4 (Trailer 2)', weight: 950, max: 2000, color: 'bg-sky-500' },
              ].map(axle => {
                const pct = (axle.weight / axle.max) * 100;
                return (
                  <div key={axle.label} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-gray-600">{axle.label}</span>
                      <span className="text-gray-800 font-mono">{axle.weight} kg / {axle.max} kg</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${axle.color}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Critical warning banner */}
            <div className="flex items-center gap-3 bg-red-50 border border-red-100 rounded-xl p-3.5 text-xs text-red-800">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
              <div>
                <strong className="font-bold block">Axle 3 Telemetry Alert: Overweight Limit Approaching</strong>
                <span className="text-red-700">BOT-FT-412 has triggered sensor thresholds. Operations control notified.</span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
