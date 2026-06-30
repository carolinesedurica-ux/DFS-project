"use client";

import React, { useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';

interface TrackingMapProps {
  markers?: { id: string; lat: number; lng: number; label: string; status: string }[];
  isDarkTheme?: boolean;
}

export function TrackingMap({ markers = [], isDarkTheme = false }: TrackingMapProps) {
  // We'll use a stylized SVG map to simulate live tracking
  // Using a simplified projection for Southern Africa coordinates
  
  const [hoveredMarker, setHoveredMarker] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    const s = status.toLowerCase();
    if (['delivered', 'cleared'].includes(s)) return isDarkTheme ? '#4ade80' : '#16a34a'; // green
    if (['in transit', 'transit'].includes(s)) return isDarkTheme ? '#facc15' : '#ca8a04'; // yellow
    if (['delayed', 'issue'].includes(s)) return isDarkTheme ? '#f87171' : '#dc2626'; // red
    return isDarkTheme ? '#9ca3af' : '#6b7280'; // gray
  };

  const bgClass = isDarkTheme ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200";
  const textClass = isDarkTheme ? "text-white" : "text-gray-900";
  const subTextClass = isDarkTheme ? "text-gray-400" : "text-gray-500";

  return (
    <div className={`relative w-full rounded-xl border shadow-sm overflow-hidden flex flex-col ${bgClass}`}>
      <div className={`px-6 py-4 border-b flex justify-between items-center ${isDarkTheme ? 'border-gray-700' : 'border-gray-100'}`}>
        <div className="flex items-center gap-2">
          <Navigation className={`h-5 w-5 ${isDarkTheme ? 'text-yellow-500' : 'text-primary-royal'}`} />
          <h3 className={`font-semibold ${textClass}`}>Live Asset Tracking Map</h3>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium">
           <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500"></span><span className={subTextClass}>Delivered</span></div>
           <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-yellow-500"></span><span className={subTextClass}>In Transit</span></div>
           <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500"></span><span className={subTextClass}>Delayed</span></div>
        </div>
      </div>
      <div className={`relative w-full h-96 flex items-center justify-center overflow-hidden ${isDarkTheme ? 'bg-[#1a2332]' : 'bg-blue-50'}`}>
        {/* Placeholder Map SVG Grid for Visual Effect */}
        <svg width="100%" height="100%" className="absolute inset-0 opacity-20">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke={isDarkTheme ? "#ffffff" : "#000000"} strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          {/* Faint continent outline shape placeholder */}
          <path d="M 300 50 Q 500 150 600 350 Q 500 450 350 400 Q 200 350 300 50 Z" fill="none" stroke={isDarkTheme ? "#4ade80" : "#16a34a"} strokeWidth="2" strokeDasharray="10 10" opacity={isDarkTheme ? "0.3" : "0.5"} />
        </svg>

        {/* Render Markers */}
        {markers.map(marker => (
          <div
            key={marker.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-125 hover:z-10"
            style={{ left: `${marker.lng}%`, top: `${marker.lat}%` }}
            onMouseEnter={() => setHoveredMarker(marker.id)}
            onMouseLeave={() => setHoveredMarker(null)}
          >
            <div className="relative">
              <MapPin 
                className="h-6 w-6 filter drop-shadow-md" 
                style={{ color: getStatusColor(marker.status) }} 
                fill={getStatusColor(marker.status)}
                fillOpacity={0.2}
              />
              <span className="absolute top-1 left-1.5 w-3 h-3 rounded-full animate-ping opacity-75" style={{ backgroundColor: getStatusColor(marker.status) }}></span>
            </div>
            
            {/* Tooltip */}
            {hoveredMarker === marker.id && (
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white text-gray-900 text-xs rounded shadow-lg px-3 py-2 z-20 w-48 border border-gray-200">
                <div className="font-bold border-b border-gray-100 pb-1 mb-1">{marker.label}</div>
                <div className="flex justify-between items-center text-gray-600">
                  <span>Status:</span>
                  <span className="font-semibold capitalize">{marker.status}</span>
                </div>
              </div>
            )}
          </div>
        ))}
        
        {markers.length === 0 && (
          <div className="text-white/50 text-sm font-medium z-10 bg-black/40 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10">
            Connecting to GPS Network...
          </div>
        )}
      </div>
    </div>
  );
}
