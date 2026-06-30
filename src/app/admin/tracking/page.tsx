"use client";

import { useState, useEffect } from "react";
import { 
  Map, 
  Compass, 
  Navigation, 
  Activity, 
  AlertTriangle, 
  ShieldCheck, 
  Search,
  Radio,
  Truck,
  Clock
} from "lucide-react";
import { DEMO_SHIPMENTS } from "@/data/demo/shipments";

export default function TrackingAdminDashboard() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);

  useEffect(() => {
    // Derive active tracking list from demo shipments
    const activeVehicles = DEMO_SHIPMENTS.map((s, i) => {
      const isOverweight = s.id === "shp-001"; // Make shp-001 look like the overweight Volvo FH
      return {
        id: s.id,
        reg: s.vehicle.match(/Reg: (.*?)\)/)?.[1] || `B 10${i} ABC`,
        vehicleName: s.vehicle.split("(")[0].trim(),
        driver: s.driverRef,
        cargo: s.cargoType,
        route: `${s.origin.split(',')[0]} ➔ ${s.destination.split(',')[0]}`,
        status: s.status === "delivered" ? "Parked" : s.status === "border_processing" ? "Border Queue" : "In Transit",
        speed: s.status === "delivered" ? "0 km/h" : s.status === "border_processing" ? "3 km/h" : "78 km/h",
        fuel: s.status === "delivered" ? "15%" : s.status === "border_processing" ? "45%" : "82%",
        heading: s.status === "delivered" ? "North" : "South-West",
        lat: s.status === "delivered" ? -21.17 : s.status === "border_processing" ? -22.99 : -25.74,
        lng: s.status === "delivered" ? 27.51 : s.status === "border_processing" ? 27.27 : 28.19,
        isOverweight
      };
    });
    setVehicles(activeVehicles);
    if (activeVehicles.length > 0) {
      setSelectedVehicle(activeVehicles[0]);
    }
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Border Queue":
        return "text-yellow-400";
      case "Parked":
        return "text-gray-400";
      default:
        return "text-emerald-400";
    }
  };

  const filteredVehicles = vehicles.filter(v => {
    return (
      v.reg.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.vehicleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.route.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-black tracking-tight text-white flex items-center space-x-3">
          <Map className="h-8 w-8 text-yellow-500 animate-pulse" />
          <span>Global GPS Corridor Telemetry</span>
        </h2>
        <p className="text-gray-400 mt-2 font-medium">
          Real-time fleet tracking, geofence monitors, and border queues telemetry for SADC transit routes.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Fleet Vehicles Online", val: vehicles.length, icon: Radio, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/10" },
          { label: "Corridor Transits", val: vehicles.filter(v => v.status === "In Transit").length, icon: Navigation, color: "text-blue-400 bg-blue-500/10 border-blue-500/10" },
          { label: "Border Queue Dwell", val: vehicles.filter(v => v.status === "Border Queue").length, icon: Clock, color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/10" },
          { label: "Geofence Violations", val: "1", icon: AlertTriangle, color: "text-red-400 bg-red-500/10 border-red-500/10 animate-pulse" },
        ].map((item, idx) => (
          <div key={idx} className={`p-5 rounded-2xl bg-gray-900 border ${item.color.split(' ')[2]} flex items-center justify-between`}>
            <div className="space-y-1">
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">{item.label}</span>
              <span className="block text-2xl font-extrabold tracking-tight text-white">{item.val}</span>
            </div>
            <div className={`p-3 rounded-xl ${item.color.split(' ')[1]} ${item.color.split(' ')[0]}`}>
              <item.icon className="h-5 w-5" />
            </div>
          </div>
        ))}
      </div>

      {/* Telemetry Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side (4 columns): Vehicle Tracker List */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl flex flex-col h-[550px]">
            <div className="p-5 border-b border-gray-800 bg-gray-900/50 space-y-3">
              <h3 className="font-bold text-base text-white">Active Transits</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search vehicle reg..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-gray-950 border border-gray-800 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-gray-800/60">
              {filteredVehicles.map((v, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedVehicle(v)}
                  className={`w-full text-left p-4 flex items-start space-x-3 transition-colors ${
                    selectedVehicle?.id === v.id ? "bg-gray-800/40" : "hover:bg-gray-800/20"
                  }`}
                >
                  <div className={`p-2.5 rounded-xl bg-gray-950 border ${
                    selectedVehicle?.id === v.id ? "border-yellow-500/30 text-yellow-500" : "border-gray-800 text-gray-400"
                  }`}>
                    <Truck className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-extrabold text-sm text-white block truncate">{v.reg}</span>
                      <span className={`text-[10px] font-bold ${getStatusColor(v.status)}`}>{v.status}</span>
                    </div>
                    <span className="block text-[11px] text-gray-400 truncate">{v.vehicleName}</span>
                    <span className="block text-[10px] text-gray-500 truncate">{v.route}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side (8 columns): GPS Visualization Map & Dashboard Details */}
        <div className="lg:col-span-8 space-y-6">
          {/* Mock GPS Map */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl relative overflow-hidden h-[380px] flex items-center justify-center">
            {/* Background Map Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] opacity-20"></div>

            {/* SADC Transit Corridors Vector Illustration */}
            <svg className="w-full h-full max-h-[300px] opacity-60 absolute" viewBox="0 0 500 300">
              {/* Johannesburg to Gaborone Corridor */}
              <path d="M 400 240 Q 250 200 150 120" fill="none" stroke="#eab308" strokeWidth="2" strokeDasharray="6 4" className="animate-[dash_10s_linear_infinite]" />
              {/* Gaborone to Francistown to Kasungula Corridor */}
              <path d="M 150 120 L 180 40" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="6 4" />
              
              {/* Hub Nodes */}
              <circle cx="400" cy="240" r="8" fill="#eab308" />
              <text x="415" y="244" fill="#9ca3af" fontSize="10" fontWeight="bold">JOHANNESBURG DEPOT</text>

              <circle cx="150" cy="120" r="8" fill="#3b82f6" />
              <text x="80" y="115" fill="#9ca3af" fontSize="10" fontWeight="bold">GABORONE HQ</text>

              <circle cx="180" cy="40" r="8" fill="#10b981" />
              <text x="195" y="44" fill="#9ca3af" fontSize="10" fontWeight="bold">FRANCISTOWN HUB</text>

              {/* Selected Vehicle Position indicator */}
              {selectedVehicle && (
                <g>
                  {/* Pulsing geofence circle */}
                  <circle 
                    cx={selectedVehicle.id === "shp-001" ? 220 : selectedVehicle.id === "shp-002" ? 165 : 300} 
                    cy={selectedVehicle.id === "shp-001" ? 175 : selectedVehicle.id === "shp-002" ? 80 : 200} 
                    r="16" 
                    fill="none" 
                    stroke={selectedVehicle.isOverweight ? "#ef4444" : "#eab308"} 
                    strokeWidth="1.5" 
                    className="animate-ping"
                  />
                  <circle 
                    cx={selectedVehicle.id === "shp-001" ? 220 : selectedVehicle.id === "shp-002" ? 165 : 300} 
                    cy={selectedVehicle.id === "shp-001" ? 175 : selectedVehicle.id === "shp-002" ? 80 : 200} 
                    r="6" 
                    fill={selectedVehicle.isOverweight ? "#ef4444" : "#eab308"} 
                  />
                </g>
              )}
            </svg>

            {/* Geofence HUD */}
            <div className="absolute bottom-4 left-4 bg-gray-950/80 backdrop-blur border border-gray-800 p-3 rounded-xl text-[10px] space-y-1 font-bold">
              <span className="text-gray-400 block uppercase tracking-wider">Active Geofences</span>
              <div className="flex items-center space-x-1 text-emerald-400">
                <ShieldCheck className="h-3 w-3" />
                <span>Gaborone HQ Corridor (Protected)</span>
              </div>
              <div className="flex items-center space-x-1 text-yellow-400">
                <ShieldCheck className="h-3 w-3" />
                <span>Martins Drift Border Zone (Monitored)</span>
              </div>
            </div>
            
            <div className="absolute top-4 right-4 bg-gray-950/80 backdrop-blur border border-gray-800 px-3 py-1.5 rounded-full text-[10px] font-bold text-gray-400 flex items-center space-x-1">
              <Compass className="h-3.5 w-3.5 text-yellow-500 animate-spin" />
              <span>Compass GPS Sync: ACTIVE</span>
            </div>
          </div>

          {/* Selected Vehicle Detailed Stats */}
          {selectedVehicle && (
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl space-y-5">
              <div className="flex justify-between items-start border-b border-gray-800 pb-4">
                <div>
                  <h4 className="text-lg font-bold text-white flex items-center space-x-2">
                    <span>{selectedVehicle.vehicleName}</span>
                    <span className="text-yellow-500 font-mono text-sm">[{selectedVehicle.reg}]</span>
                  </h4>
                  <p className="text-xs text-gray-400 font-semibold mt-1">Route: {selectedVehicle.route}</p>
                </div>
                
                <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase border ${
                  selectedVehicle.isOverweight 
                    ? "bg-red-950/40 text-red-400 border-red-500/20 animate-pulse" 
                    : "bg-emerald-950/40 text-emerald-400 border-emerald-500/20"
                }`}>
                  {selectedVehicle.isOverweight ? "Overweight Alert" : "Load Compliant"}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="p-3 bg-gray-950 border border-gray-800/40 rounded-xl space-y-1">
                  <span className="block text-gray-500 font-bold uppercase tracking-wider text-[9px]">Speed</span>
                  <span className="block font-extrabold text-white">{selectedVehicle.speed}</span>
                </div>
                <div className="p-3 bg-gray-950 border border-gray-800/40 rounded-xl space-y-1">
                  <span className="block text-gray-500 font-bold uppercase tracking-wider text-[9px]">Heading Direction</span>
                  <span className="block font-extrabold text-white">{selectedVehicle.heading}</span>
                </div>
                <div className="p-3 bg-gray-950 border border-gray-800/40 rounded-xl space-y-1">
                  <span className="block text-gray-500 font-bold uppercase tracking-wider text-[9px]">Fuel Level</span>
                  <span className="block font-extrabold text-white">{selectedVehicle.fuel}</span>
                </div>
                <div className="p-3 bg-gray-950 border border-gray-800/40 rounded-xl space-y-1">
                  <span className="block text-gray-500 font-bold uppercase tracking-wider text-[9px]">Coordinates</span>
                  <span className="block font-mono font-extrabold text-white">{selectedVehicle.lat.toFixed(2)}, {selectedVehicle.lng.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
