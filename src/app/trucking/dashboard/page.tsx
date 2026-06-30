"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Truck, Map, Activity, AlertTriangle, CheckCircle2,
  Clock, ArrowRight, MoreHorizontal, Radio, Zap,
  TrendingUp, Package, Navigation, Bell
} from 'lucide-react';

/* ── Fake live data ─────────────────────────────────────────── */
const activeShipments = [
  { id: 'DFS-ZA-1034', origin: 'Gaborone', destination: 'Johannesburg', driver: 'S. Ndlovu', speed: '88 km/h', eta: '3h 12m', status: 'En Route', location: 'A1 Highway, Lobatse' },
  { id: 'DFS-ZA-1033', origin: 'Francistown', destination: 'Walvis Bay', driver: 'J. Smith', speed: '72 km/h', eta: '8h 40m', status: 'Departed', location: 'A3 Corridor, Maun' },
  { id: 'DFS-ZA-1032', origin: 'Lusaka', destination: 'Gaborone', driver: 'M. Botha', speed: '0 km/h', eta: 'Arrived', status: 'Arr. Gaborone', location: 'Gaborone Depot' },
  { id: 'DFS-ZA-1031', origin: 'Harare', destination: 'Gaborone', driver: 'T. Mokoena', speed: '0 km/h', eta: 'Arrived', status: 'Arr. Gaborone', location: 'Gaborone Depot' },
];

const milestones = [
  { id: 'DFS-ZA-1034', destination: 'Johannesburg', status: 'In Transit', milestone: 2 },
  { id: 'DFS-ZA-1033', destination: 'Walvis Bay', status: 'Departed', milestone: 1 },
  { id: 'DFS-ZA-1032', destination: 'Gaborone', status: 'Arr. Gaborone', milestone: 4 },
  { id: 'DFS-ZA-1031', destination: 'Gaborone', status: 'Arr. Gaborone', milestone: 4 },
];

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

/* Milestone step bar */
function MilestoneStepper({ step }: { step: number }) {
  const steps = ['Depot', 'Border', 'Transit', 'Depot'];
  return (
    <div className="flex items-center gap-1 mt-1">
      {steps.map((s, i) => (
        <React.Fragment key={s}>
          <div className={`h-1.5 flex-1 rounded-full ${i < step ? 'bg-accent-gold' : 'bg-white/10'}`} />
          {i < steps.length - 1 && <div className="w-0" />}
        </React.Fragment>
      ))}
    </div>
  );
}

/* Mini bar chart for telemetry */
function SparkBar({ value, max, color }: { value: number; max: number; color: string }) {
  return (
    <div className="flex items-end gap-0.5 h-6">
      {Array.from({ length: 12 }).map((_, i) => {
        const h = Math.max(20, Math.random() * 100);
        return (
          <div
            key={i}
            className={`w-1 rounded-sm ${color}`}
            style={{ height: `${h}%`, opacity: i === 11 ? 1 : 0.4 + (i / 11) * 0.6 }}
          />
        );
      })}
    </div>
  );
}

/* Status pill */
function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    'En Route': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    'Departed': 'bg-accent-gold/20 text-accent-gold border-accent-gold/30',
    'Arr. Gaborone': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'In Transit': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    'Maintenance': 'bg-red-500/20 text-red-400 border-red-500/30',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border font-mono ${map[status] ?? 'bg-white/10 text-white/50 border-white/10'}`}>
      {status}
    </span>
  );
}

/* Map dots for active routes */
const routeDots = [
  { left: '62%', top: '71%', label: 'DFS-1034', color: '#22c55e', pulse: true },
  { left: '45%', top: '35%', label: 'DFS-1033', color: '#f59e0b', pulse: true },
  { left: '63%', top: '69%', label: 'DFS-1032', color: '#60a5fa', pulse: false },
  { left: '74%', top: '28%', label: 'DFS-1031', color: '#60a5fa', pulse: false },
];

export default function TruckingDashboard() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0a1e] text-white font-sans p-4 lg:p-6 space-y-4">

      {/* ── TOP BAR ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-accent-gold flex items-center justify-center">
            <Zap className="h-4 w-4 text-primary-deep" />
          </div>
          <div>
            <h1 className="text-sm font-extrabold text-white tracking-tight">DFS-OS <span className="text-white/40 font-normal">|</span> <span className="text-white/70 font-semibold">Logistics Dashboard</span></h1>
            <p className="text-[10px] text-white/30 font-mono">{time} · Live feed</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
            <span className="text-[10px] font-bold text-emerald-400">2 Active Fleet</span>
          </div>
          <Link href="/trucking/quotes" className="bg-accent-gold text-primary-deep px-4 py-1.5 rounded-lg text-xs font-extrabold hover:brightness-110 transition-all">
            Book Load
          </Link>
        </div>
      </div>

      {/* ── ROW 1: Map + Activity ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Map panel */}
        <div className="lg:col-span-2 bg-[#1a0f35]/80 border border-white/5 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-accent-gold/20 text-accent-gold text-[10px] font-extrabold flex items-center justify-center">1</span>
              <span className="text-xs font-bold text-white">Active SADC Regional Highway Tracking</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/40 font-mono">Active Fleet in</span>
              <div className="bg-white/5 border border-white/10 px-2 py-1 rounded text-[10px] text-white/60 flex items-center gap-1">
                <Radio className="h-2.5 w-2.5 text-accent-gold" /> SADC ▾
              </div>
            </div>
          </div>

          {/* Map surface */}
          <div className="relative h-64 lg:h-80 bg-[#0d1b2a]">
            {/* Road lines */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 320" preserveAspectRatio="none">
              <path d="M100,160 Q200,120 300,160 Q400,200 500,140" stroke="#D9A520" strokeWidth="2" fill="none" strokeOpacity="0.6" strokeDasharray="8,4"/>
              <path d="M60,80 Q150,140 280,180 Q380,210 520,200" stroke="#D9A520" strokeWidth="1.5" fill="none" strokeOpacity="0.35" strokeDasharray="6,4"/>
              <path d="M200,30 Q250,120 300,160 Q340,190 380,280" stroke="#D9A520" strokeWidth="1.5" fill="none" strokeOpacity="0.4" strokeDasharray="6,4"/>
              <path d="M0,200 Q120,180 240,190 Q360,200 480,170 Q540,158 600,160" stroke="#60a5fa" strokeWidth="1" fill="none" strokeOpacity="0.25"/>
              {/* Country labels */}
              <text x="350" y="100" fill="rgba(255,255,255,0.25)" fontSize="14" fontWeight="700" fontFamily="sans-serif">Zimbabwe</text>
              <text x="220" y="190" fill="rgba(255,255,255,0.25)" fontSize="14" fontWeight="700" fontFamily="sans-serif">Botswana</text>
              <text x="420" y="260" fill="rgba(255,255,255,0.18)" fontSize="12" fontWeight="700" fontFamily="sans-serif">Johannesburg</text>
              <text x="60" y="200" fill="rgba(255,255,255,0.18)" fontSize="11" fontFamily="sans-serif">Walvis Bay</text>
              <text x="240" y="255" fill="rgba(255,255,255,0.25)" fontSize="12" fontFamily="sans-serif">Gaborone</text>
              <text x="100" y="100" fill="rgba(255,255,255,0.18)" fontSize="11" fontFamily="sans-serif">Windhoek</text>
              <text x="195" y="115" fill="rgba(255,255,255,0.18)" fontSize="11" fontFamily="sans-serif">Francistown</text>
              {/* Grid lines */}
              {[0,1,2,3,4].map(i => (
                <line key={i} x1="0" y1={i*80} x2="600" y2={i*80} stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
              ))}
              {[0,1,2,3,4,5,6].map(i => (
                <line key={i} x1={i*100} y1="0" x2={i*100} y2="320" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
              ))}
            </svg>

            {/* Truck dots */}
            {routeDots.map((dot) => (
              <div key={dot.label} className="absolute" style={{ left: dot.left, top: dot.top, transform: 'translate(-50%,-50%)' }}>
                {dot.pulse && <div className="absolute inset-0 rounded-full animate-ping" style={{ background: dot.color, opacity: 0.3, width: 20, height: 20, margin: -4 }} />}
                <div className="w-3 h-3 rounded-full border-2 border-white/80 z-10 relative" style={{ background: dot.color }} />
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-black/70 text-white text-[8px] font-mono px-1.5 py-0.5 rounded whitespace-nowrap">
                  {dot.label}
                </div>
              </div>
            ))}

            {/* Map source badge */}
            <div className="absolute bottom-2 right-2 text-[8px] text-white/20 font-mono">SADC Corridor · DFS Route Layer</div>
          </div>
        </div>

        {/* Activity panel */}
        <div className="bg-[#1a0f35]/80 border border-white/5 rounded-2xl flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-accent-gold/20 text-accent-gold text-[10px] font-extrabold flex items-center justify-center">2</span>
              <span className="text-xs font-bold text-white">SADC Regional Activity</span>
            </div>
            <MoreHorizontal className="h-4 w-4 text-white/30" />
          </div>

          <div className="p-4 space-y-4 flex-1">
            {/* Active shipments */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-white/50 font-bold uppercase tracking-wider">Active Shipments</span>
                <span className="text-[10px] bg-accent-gold/20 text-accent-gold font-bold px-2 py-0.5 rounded">Departed</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-white/30" />
                <span className="text-xs text-white/60">Active shipments</span>
                <span className="ml-auto text-xs font-bold text-white">2</span>
              </div>
            </div>

            {/* Routes */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-white/50 font-bold uppercase tracking-wider">Routes</span>
                <span className="text-[10px] text-white/30">▲</span>
              </div>
              <div className="space-y-2">
                {[
                  { route: 'Gaborone – Durban', sub: 'Gaborone – Durban', color: '#22c55e' },
                  { route: 'Francistown – Walvis Bay', sub: 'Gaborone – Walvis Bay', color: '#f59e0b' },
                  { route: 'Francistown – Walvis Bay', sub: 'Gaborone – Walvis Bay', color: '#94a3b8' },
                  { route: 'Gaborone – Durban', sub: 'Francistown – Walvis Bay', color: '#94a3b8' },
                ].map((r, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full mt-1 flex-shrink-0" style={{ background: r.color }} />
                    <div>
                      <p className="text-[11px] font-semibold text-white/80">{r.route}</p>
                      <p className="text-[9px] text-white/30">{r.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="border-t border-white/5 pt-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] text-white/50 font-bold uppercase tracking-wider">Notifications</span>
                <span className="text-[10px] text-white/30">▲</span>
              </div>
              <div className="flex items-center gap-2">
                <Bell className="h-3.5 w-3.5 text-white/30" />
                <span className="text-[11px] text-white/40">No new notifications</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── ROW 2: Fleet table + Milestones ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Fleet operations table */}
        <div className="bg-[#1a0f35]/80 border border-white/5 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-accent-gold/20 text-accent-gold text-[10px] font-extrabold flex items-center justify-center">4</span>
              <span className="text-xs font-bold text-white">Fleet Operations – Botswana</span>
            </div>
            <MoreHorizontal className="h-4 w-4 text-white/30" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/5">
                  {['Truck ID', 'Driver', 'Current Location', 'Status', 'Speed', 'ETA'].map(h => (
                    <th key={h} className="text-left text-[10px] font-bold text-white/30 px-4 py-2 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {activeShipments.slice(0,4).map((s) => (
                  <tr key={s.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-3 font-mono font-bold text-white/80">{s.id}</td>
                    <td className="px-4 py-3 text-white/60">{s.driver}</td>
                    <td className="px-4 py-3 text-white/50 max-w-[140px] truncate">{s.location}</td>
                    <td className="px-4 py-3"><StatusPill status={s.status} /></td>
                    <td className="px-4 py-3 font-mono text-white/60">{s.speed}</td>
                    <td className="px-4 py-3 font-mono text-white/60">{s.eta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-2 border-t border-white/5">
            <Link href="/trucking/shipments" className="text-[11px] text-accent-gold hover:underline flex items-center gap-1">
              View all shipments <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Shipment milestones */}
        <div className="bg-[#1a0f35]/80 border border-white/5 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-accent-gold/20 text-accent-gold text-[10px] font-extrabold flex items-center justify-center">3</span>
              <span className="text-xs font-bold text-white">Shipment Tracking Milestones</span>
            </div>
            <MoreHorizontal className="h-4 w-4 text-white/30" />
          </div>
          <div className="p-4 space-y-1">
            <div className="grid grid-cols-4 text-[9px] font-bold text-white/30 uppercase tracking-wider mb-3 px-2">
              <span>Shipment ID</span>
              <span>Destination</span>
              <span>Status</span>
              <span>Milestones</span>
            </div>
            {milestones.map((m) => (
              <div key={m.id} className="grid grid-cols-4 items-center gap-2 px-2 py-2 rounded-lg hover:bg-white/[0.03] transition-colors">
                <span className="text-[11px] font-mono font-bold text-white/70">{m.id}</span>
                <span className="text-[11px] text-white/50">{m.destination}</span>
                <StatusPill status={m.status} />
                <div className="space-y-1">
                  <MilestoneStepper step={m.milestone} />
                  <div className="flex justify-between text-[8px] text-white/20 font-mono">
                    <span>Depot</span><span>Border</span><span>Transit</span><span>Depot</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── ROW 3: Telemetry logs + Sparkline stats ── */}
      <div className="bg-[#1a0f35]/80 border border-white/5 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-accent-gold/20 text-accent-gold text-[10px] font-extrabold flex items-center justify-center">5</span>
            <span className="text-xs font-bold text-white">Truck Axle Telemetry Logs</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-white/30 bg-white/5 px-2 py-1 rounded font-mono">last 24h</span>
            <MoreHorizontal className="h-4 w-4 text-white/30" />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-white/5">

          {/* Log list */}
          <div className="col-span-1 overflow-y-auto max-h-48">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-white/5">
              <span className="text-[10px] font-bold text-white/50">BOT-FT-412</span>
              <span className="text-[10px] text-white/20">▾ Detailed</span>
            </div>
            {telemetryLogs.map((log, i) => (
              <div key={i} className={`flex items-start gap-3 px-4 py-2 border-b border-white/[0.03] hover:bg-white/[0.02] ${log.alert ? 'bg-red-500/5' : ''}`}>
                <span className="font-mono text-[9px] text-white/25 mt-0.5 flex-shrink-0">{log.time}</span>
                <div>
                  <span className="font-mono text-[10px] font-bold text-white/60">{log.truck}</span>
                  {log.alert && <AlertTriangle className="h-2.5 w-2.5 text-red-400 inline ml-1" />}
                  <p className="text-[10px] text-white/35">{log.log}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Axle load chart area */}
          <div className="col-span-2 p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white/60">Axle Load (kg)</span>
              <div className="flex items-center gap-3 text-[9px] font-mono text-white/30">
                {['Axle 1','Axle 2','Axle 3','Axle 4','Tire pressure'].map((l,i) => (
                  <span key={l} className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full inline-block" style={{background:['#22c55e','#f59e0b','#ef4444','#60a5fa','#a78bfa'][i]}}/>
                    {l}
                  </span>
                ))}
              </div>
            </div>

            {/* Simulated bar chart rows */}
            <div className="space-y-2">
              {['Axle 1','Axle 2','Axle 3 ⚠','Axle 4'].map((axle, i) => {
                const colors = ['bg-emerald-500','bg-amber-500','bg-red-500','bg-blue-400'];
                const vals = [1200, 980, 1800, 650];
                const pct = (vals[i] / 2000) * 100;
                return (
                  <div key={axle} className="flex items-center gap-3">
                    <span className="text-[9px] font-mono text-white/30 w-14 flex-shrink-0">{axle}</span>
                    <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${colors[i]}`} style={{width:`${pct}%`, opacity: i === 2 ? 1 : 0.7}} />
                    </div>
                    <span className="text-[9px] font-mono text-white/40 w-10 text-right">{vals[i]}kg</span>
                  </div>
                );
              })}
            </div>

            {/* Speed / fuel sparklines */}
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/5">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-bold text-white/40 uppercase tracking-wider">Speed (km/h)</span>
                  <span className="text-[9px] font-mono text-white/30">88 avg</span>
                </div>
                <SparkBar value={88} max={120} color="bg-emerald-500" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-bold text-white/40 uppercase tracking-wider">Tire Pressure</span>
                  <span className="text-[9px] font-mono text-white/30">nominal</span>
                </div>
                <SparkBar value={75} max={100} color="bg-blue-400" />
              </div>
            </div>

            {/* Alert banner */}
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              <AlertTriangle className="h-3.5 w-3.5 text-red-400 flex-shrink-0" />
              <span className="text-[10px] font-bold text-red-400">High Load Axle 3</span>
              <span className="text-[10px] text-red-400/60 ml-auto">BOT-FT-412 · monitoring</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
