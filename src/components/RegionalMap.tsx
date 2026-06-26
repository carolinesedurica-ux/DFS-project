"use client";

import { useState } from "react";
import { MapPin, ArrowRight, Info, AlertTriangle } from "lucide-react";
import settings from "@/data/settings.json";

export default function RegionalMap() {
  const [showPlanned, setShowPlanned] = useState(true);
  const [hoveredHub, setHoveredHub] = useState<string | null>(null);

  const activeHubs = settings.offices;
  const plannedHubs = settings.expansion;

  // Coordinate mapping for SVG grid (width: 800, height: 600)
  // Botswana (Gaborone): -24.582, 25.961 -> (380, 360)
  // SA (Johannesburg): -26.204, 28.047 -> (430, 420)
  // Zambia (Lusaka): -15.387, 28.322 -> (440, 160)
  // Zimbabwe (Harare): -17.825, 31.053 -> (520, 220)
  //
  // Planned:
  // Namibia (Walvis Bay): -22.95, 14.50 -> (100, 320)
  // Mozambique (Beira): -19.83, 34.83 -> (630, 280)
  // Tanzania (Dar es Salaam): -6.79, 39.27 -> (750, 40)
  // SA (Durban): -29.85, 31.02 -> (520, 520)

  const hubsCoord: Record<string, { x: number; y: number; name: string; isPlanned: boolean }> = {
    gaborone: { x: 380, y: 360, name: "Gaborone", isPlanned: false },
    johannesburg: { x: 430, y: 420, name: "Johannesburg", isPlanned: false },
    lusaka: { x: 440, y: 160, name: "Lusaka", isPlanned: false },
    harare: { x: 520, y: 220, name: "Harare", isPlanned: false },
    "walvis bay": { x: 100, y: 320, name: "Walvis Bay", isPlanned: true },
    beira: { x: 630, y: 280, name: "Beira", isPlanned: true },
    "dar es salaam": { x: 750, y: 40, name: "Dar es Salaam", isPlanned: true },
    durban: { x: 520, y: 520, name: "Durban", isPlanned: true },
  };

  const activeRoutes = [
    { from: "johannesburg", to: "gaborone" },
    { from: "gaborone", to: "harare" },
    { from: "gaborone", to: "lusaka" },
    { from: "johannesburg", to: "harare" },
    { from: "harare", to: "lusaka" },
  ];

  const plannedRoutes = [
    { from: "gaborone", to: "walvis bay" },
    { from: "harare", to: "beira" },
    { from: "lusaka", to: "dar es salaam" },
    { from: "johannesburg", to: "durban" },
  ];

  return (
    <div className="bg-charcoal text-white rounded-xl p-6 lg:p-8 shadow-xl border border-white/10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h3 className="text-xl font-bold text-white">DFS Regional Transit Corridors</h3>
          <p className="text-sm text-white/60">Southern African Logistics Hubs & Expansion Network</p>
        </div>
        
        {/* Toggle Filter */}
        <div className="flex items-center space-x-2 bg-white/5 p-1 rounded-lg border border-white/10">
          <button
            onClick={() => setShowPlanned(false)}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              !showPlanned ? "bg-accent-gold text-primary-deep" : "text-white/80 hover:text-white"
            }`}
          >
            Confirmed Operations Only
          </button>
          <button
            onClick={() => setShowPlanned(true)}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              showPlanned ? "bg-accent-gold text-primary-deep" : "text-white/80 hover:text-white"
            }`}
          >
            Show Planned Corridors
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* SVG Map (Left / Center) */}
        <div className="lg:col-span-2 relative bg-white/[0.02] border border-white/5 rounded-lg overflow-hidden flex items-center justify-center p-4">
          <svg
            viewBox="0 0 800 580"
            className="w-full h-auto max-h-[480px] select-none"
            aria-label="Map of DFS Logistics network in Southern Africa"
          >
            {/* Background grids / map decorations */}
            <circle cx="400" cy="290" r="280" fill="none" stroke="rgba(220, 161, 29, 0.03)" strokeWidth="1" strokeDasharray="5,5" />
            <circle cx="400" cy="290" r="180" fill="none" stroke="rgba(220, 161, 29, 0.02)" strokeWidth="1" strokeDasharray="3,3" />

            {/* Active Corridor Paths */}
            {activeRoutes.map((route, index) => {
              const fromPoint = hubsCoord[route.from];
              const toPoint = hubsCoord[route.to];
              if (!fromPoint || !toPoint) return null;
              return (
                <path
                  key={`active-${index}`}
                  d={`M ${fromPoint.x} ${fromPoint.y} Q ${(fromPoint.x + toPoint.x)/2 + 20} ${(fromPoint.y + toPoint.y)/2 - 20} ${toPoint.x} ${toPoint.y}`}
                  fill="none"
                  stroke="#dca11d"
                  strokeWidth="2"
                  className="transition-all duration-300"
                  strokeDasharray={hoveredHub === route.from || hoveredHub === route.to ? "none" : "8, 4"}
                  opacity={hoveredHub && hoveredHub !== route.from && hoveredHub !== route.to ? 0.3 : 0.8}
                />
              );
            })}

            {/* Planned Corridor Paths */}
            {showPlanned &&
              plannedRoutes.map((route, index) => {
                const fromPoint = hubsCoord[route.from];
                const toPoint = hubsCoord[route.to];
                if (!fromPoint || !toPoint) return null;
                return (
                  <path
                    key={`planned-${index}`}
                    d={`M ${fromPoint.x} ${fromPoint.y} Q ${(fromPoint.x + toPoint.x)/2 - 10} ${(fromPoint.y + toPoint.y)/2 + 10} ${toPoint.x} ${toPoint.y}`}
                    fill="none"
                    stroke="#1d6ecb"
                    strokeWidth="1.5"
                    strokeDasharray="4, 4"
                    opacity={hoveredHub && hoveredHub !== route.from && hoveredHub !== route.to ? 0.2 : 0.5}
                  />
                );
              })}

            {/* Hub Nodes (Active) */}
            {activeHubs.map((hub) => {
              const node = hubsCoord[hub.id];
              if (!node) return null;
              const isHovered = hoveredHub === hub.id;
              return (
                <g
                  key={hub.id}
                  className="cursor-pointer group"
                  onMouseEnter={() => setHoveredHub(hub.id)}
                  onMouseLeave={() => setHoveredHub(null)}
                >
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isHovered ? 12 : 8}
                    fill="#331a44"
                    stroke="#dca11d"
                    strokeWidth="3"
                    className="transition-all duration-300"
                  />
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isHovered ? 24 : 16}
                    fill="none"
                    stroke="#dca11d"
                    strokeWidth="1.5"
                    className="animate-ping"
                    opacity={isHovered ? 0.4 : 0.15}
                  />
                  <text
                    x={node.x + 14}
                    y={node.y + 4}
                    fill="#ffffff"
                    fontSize="13"
                    fontWeight={isHovered ? "bold" : "600"}
                    className="transition-all filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                  >
                    {node.name}
                  </text>
                </g>
              );
            })}

            {/* Hub Nodes (Planned) */}
            {showPlanned &&
              plannedHubs.map((hub) => {
                const node = hubsCoord[hub.city.toLowerCase()];
                if (!node) return null;
                const isHovered = hoveredHub === hub.city.toLowerCase();
                return (
                  <g
                    key={hub.city}
                    className="cursor-pointer group"
                    onMouseEnter={() => setHoveredHub(hub.city.toLowerCase())}
                    onMouseLeave={() => setHoveredHub(null)}
                  >
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={isHovered ? 9 : 6}
                      fill="#0f172a"
                      stroke="#1d6ecb"
                      strokeWidth="2.5"
                      className="transition-all duration-300"
                    />
                    <text
                      x={node.x + 12}
                      y={node.y + 4}
                      fill="#94a3b8"
                      fontSize="11"
                      fontWeight={isHovered ? "bold" : "500"}
                      className="transition-all filter drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
                    >
                      {node.name}*
                    </text>
                  </g>
                );
              })}
          </svg>

          {/* Map Overlay Legends */}
          <div className="absolute bottom-4 left-4 bg-charcoal/80 backdrop-blur-sm border border-white/10 rounded px-3 py-2 text-xs flex flex-col gap-1.5">
            <div className="flex items-center space-x-2">
              <span className="h-3 w-3 rounded-full bg-accent-gold inline-block"></span>
              <span>Active Services Hub</span>
            </div>
            {showPlanned && (
              <div className="flex items-center space-x-2">
                <span className="h-3 w-3 rounded-full bg-tech-blue inline-block"></span>
                <span>Planned Expansion Hub*</span>
              </div>
            )}
          </div>
        </div>

        {/* Info Column (Right) */}
        <div className="flex flex-col justify-between">
          <div className="space-y-4">
            <h4 className="text-md font-bold text-accent-gold uppercase tracking-wider">
              {hoveredHub 
                ? `${hoveredHub.charAt(0).toUpperCase() + hoveredHub.slice(1)} Node`
                : "Select or Hover on a Hub"
              }
            </h4>

            {hoveredHub ? (
              <div className="space-y-4 animate-fade-in-up">
                {/* Active Hub Details */}
                {activeHubs.find((h) => h.id === hoveredHub) && (
                  <>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-3">
                      <div className="text-xs text-white/50">Office Classification</div>
                      <div className="text-sm font-semibold">{activeHubs.find((h) => h.id === hoveredHub)?.role}</div>
                      <div className="text-xs text-white/50">Services Handled</div>
                      <div className="flex flex-wrap gap-1.5">
                        {activeHubs.find((h) => h.id === hoveredHub)?.services.map((srv) => (
                          <span key={srv} className="bg-primary-deep/60 text-accent-gold border border-accent-gold/20 text-[10px] px-2 py-0.5 rounded font-medium">
                            {srv}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-sm text-white/80 leading-relaxed">
                      {hoveredHub === "gaborone" && "Centrally managing Southern African logistics. Coordinates border documentation, local distribution, and provides heavy bulk tipper dispatches."}
                      {hoveredHub === "johannesburg" && "High-volume connection linking South African mineral and manufacturing outputs to the regional corridors."}
                      {hoveredHub === "lusaka" && "Connecting trade along the north-bound routes to Zambia and Central African mining basins."}
                      {hoveredHub === "harare" && "Direct hub servicing the central Zimbabwe corridors, connecting dry-bulk imports and agricultural freight."}
                    </div>
                  </>
                )}

                {/* Planned Hub Details */}
                {plannedHubs.find((h) => h.city.toLowerCase() === hoveredHub) && (
                  <div className="space-y-4">
                    <div className="bg-tech-blue/10 border border-tech-blue/30 rounded-lg p-4 space-y-2">
                      <div className="text-xs text-tech-blue font-bold">Planned Expansion Target</div>
                      <div className="text-sm font-semibold">{plannedHubs.find((h) => h.city.toLowerCase() === hoveredHub)?.city} Portal</div>
                      <p className="text-xs text-white/60">
                        Subject to regulatory and corridor commercial approvals.
                      </p>
                    </div>
                    <p className="text-sm text-white/70 leading-relaxed">
                      {hoveredHub === "walvis bay" && "Strategic target for connecting Gaborone directly to the Namibian port of Walvis Bay via the Trans-Kalahari Corridor."}
                      {hoveredHub === "beira" && "Aims to establish direct corridor logistics linking Zimbabwean mining operations to the Mozambique harbor."}
                      {hoveredHub === "dar es salaam" && "Future northern corridor connection enabling deep-sea port routing from Tanzania for Zambian cargo."}
                      {hoveredHub === "durban" && "Connecting South African maritime imports directly with the Johannesburg road distribution networks."}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white/5 border border-white/10 rounded-lg p-6 text-center text-white/50 space-y-3">
                <Info className="h-8 w-8 text-accent-gold mx-auto" />
                <p className="text-xs">
                  Hover over the active nodes or routes on the map to see corridor details, services handled, and transit highlights.
                </p>
              </div>
            )}
          </div>

          {/* Planned Expansion Notice */}
          <div className="mt-8 border-t border-white/10 pt-6 space-y-3">
            <div className="flex items-start space-x-2 text-xs text-white/40">
              <AlertTriangle className="h-4 w-4 text-tech-blue flex-shrink-0 mt-0.5" />
              <span>
                *Planned corridor hubs (Walvis Bay, Beira, Dar es Salaam, Durban) represent our strategic regional roadmap. Subject to operational approvals.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
