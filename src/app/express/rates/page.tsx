"use client";

import { useState } from "react";
import { Scale, HelpCircle } from "lucide-react";

export default function ExpressRatesPage() {
  const [weight, setWeight] = useState("");
  const [service, setService] = useState("Next Day Express");
  const [calculatedRate, setCalculatedRate] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedWeight = parseFloat(weight);
    if (isNaN(parsedWeight) || parsedWeight <= 0) return;

    let baseRate = 80; // BWP base
    let ratePerKg = 15;

    if (service === "Priority Document") {
      baseRate = 120;
      ratePerKg = 25;
    } else if (service === "Next Day Express") {
      baseRate = 100;
      ratePerKg = 20;
    }

    const total = baseRate + parsedWeight * ratePerKg;
    setCalculatedRate(`BWP ${total.toFixed(2)}`);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center space-x-3">
          <Scale className="h-8 w-8 text-primary-royal" />
          <span>Volumetric Rate Calculator</span>
        </h2>
        <p className="text-gray-500 mt-2 font-medium">
          Calculate estimated local courier tariffs based on volumetric weight and transit speed.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Rate Form (5 columns) */}
        <div className="lg:col-span-5 bg-white border border-gray-100 shadow-sm rounded-2xl p-6 space-y-4">
          <h3 className="font-extrabold text-gray-900 text-lg border-b border-gray-100 pb-3">Tariff Estimator</h3>
          
          <form onSubmit={handleCalculate} className="space-y-4 text-xs font-semibold text-gray-600">
            <div className="space-y-1.5">
              <label className="block text-gray-400 uppercase tracking-wider text-[9px]">Total Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                required
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="e.g. 5.5"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-primary-deep placeholder-gray-400 focus:outline-none focus:border-primary-royal transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-gray-400 uppercase tracking-wider text-[9px]">Service Tier</label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-primary-deep focus:outline-none focus:border-primary-royal transition-colors"
              >
                <option value="Next Day Express">Next Day Express (Gaborone ➔ Francistown 24h)</option>
                <option value="Standard Delivery">Standard Delivery (2-3 days)</option>
                <option value="Priority Document">Priority Document (Secure Overnight)</option>
              </select>
            </div>
            
            <button
              type="submit"
              className="w-full py-3.5 bg-primary-royal hover:bg-primary-deep text-white font-extrabold rounded-xl transition shadow-lg text-sm"
            >
              Calculate Tariff
            </button>
          </form>

          {calculatedRate && (
            <div className="bg-gray-50 p-4 border border-gray-100 rounded-xl flex items-center justify-between mt-4">
              <div>
                <span className="text-gray-400 block text-[9px] uppercase font-bold">Estimated courier rate</span>
                <span className="text-lg font-black text-primary-deep tracking-tight mt-0.5">
                  {calculatedRate}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Info Box (7 columns) */}
        <div className="lg:col-span-7 bg-white border border-gray-100 shadow-sm rounded-2xl p-6 space-y-4">
          <h3 className="font-extrabold text-gray-900 text-lg border-b border-gray-100 pb-3 flex items-center">
            <HelpCircle className="h-5 w-5 text-primary-royal mr-2" />
            <span>How rates are computed</span>
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed font-medium">
            DFS Courier Express rates are calculated using the greater of actual physical weight or volumetric weight. Volumetric weight is computed using the formula:
          </p>
          <div className="bg-gray-50 p-4 rounded-xl text-center border border-gray-100 font-mono text-xs font-bold text-primary-royal">
            Length (cm) × Width (cm) × Height (cm) ÷ 5000 = Volumetric Weight (kg)
          </div>
          <p className="text-xs text-gray-400 leading-relaxed font-medium">
            Tariffs include cargo transit insurance under standard trading conditions. Cross-border courier rates require separate custom duties assessments.
          </p>
        </div>

      </div>
    </div>
  );
}
