"use client";

import { useState } from "react";
import { Truck, Scale, ShieldCheck, Cpu } from "lucide-react";
import fleetData from "@/data/fleet.json";

export default function TruckingFleetPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black text-primary-deep tracking-tight flex items-center space-x-3">
          <Truck className="h-8 w-8 text-accent-gold" />
          <span>Active Heavy Haulage Fleet</span>
        </h2>
        <p className="text-gray-600 mt-2 font-medium">
          Detailed fleet specifications for side-tippers and flatdecks assigned to client operations.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {fleetData.map((item) => (
          <div key={item.id} className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
            <div className="space-y-4 md:max-w-xl">
              <div>
                <span className="text-[10px] text-accent-metallic uppercase font-extrabold tracking-widest">{item.category} Cargo Division</span>
                <h3 className="text-xl font-extrabold text-primary-deep mt-1">{item.unitName}</h3>
                <p className="text-xs text-gray-500 font-semibold mt-0.5">{item.trailerType}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {item.suitableCargo.map((cargo, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-gray-50 border border-gray-100 rounded-lg text-xs font-semibold text-gray-600">
                    {cargo}
                  </span>
                ))}
              </div>

              <p className="text-xs text-gray-500 font-medium">{item.operatingConditions}</p>
            </div>

            <div className="space-y-3 w-full md:w-64 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 text-xs text-gray-600">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-400">Loading Capacity</span>
                <span className="font-extrabold text-primary-royal flex items-center">
                  <Scale className="h-3.5 w-3.5 mr-1" />
                  {item.loadingCapacity}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-400">Active Fleet Units</span>
                <span className="font-extrabold text-primary-deep">{item.quantity} Units</span>
              </div>
              <hr className="border-gray-100" />
              <div className="flex items-start space-x-2">
                <Cpu className="h-4 w-4 text-accent-gold mt-0.5 flex-shrink-0" />
                <span className="text-[10.5px] leading-relaxed text-gray-500">{item.trackingCapability}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
