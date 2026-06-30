"use client";

import { useState } from "react";
import { 
  BarChart, 
  TrendingUp, 
  DollarSign, 
  Scale, 
  Clock, 
  CheckCircle,
  FileText,
  Calendar
} from "lucide-react";

export default function AnalyticsAdminDashboard() {
  const [timeframe, setTimeframe] = useState("month");

  // Performance metrics mock data
  const performanceKpis = [
    { label: "Transit Time Compliance", val: "94.2%", target: "95.0%", status: "On Target", color: "text-emerald-400" },
    { label: "Border Dwell Time (Avg)", val: "3.4 hrs", target: "3.0 hrs", status: "Action Required", color: "text-yellow-400" },
    { label: "Fuel Efficiency Index", val: "2.1 km/L", target: "2.2 km/L", status: "Optimal", color: "text-emerald-400" },
    { label: "On-Time Delivery Rate", val: "97.8%", target: "98.0%", status: "On Target", color: "text-emerald-400" }
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-white flex items-center space-x-3">
            <BarChart className="h-8 w-8 text-yellow-500" />
            <span>Operations & Fleet Analytics</span>
          </h2>
          <p className="text-gray-400 mt-2 font-medium">
            Financial analytics, border dwell performance metrics, and SADC corridor volume statistics.
          </p>
        </div>

        {/* Timeframe Selector */}
        <div className="flex items-center space-x-2 bg-gray-900 border border-gray-800 p-1.5 rounded-xl self-start sm:self-auto">
          {["week", "month", "quarter"].map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition ${
                timeframe === t 
                  ? "bg-yellow-500 text-black shadow-md" 
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Monthly Gross Revenue", val: "$85,400", sub: "+12.4% vs last month", icon: DollarSign, color: "text-emerald-400 border-emerald-500/20" },
          { label: "Total Cargo Transported", val: "720 MT", sub: "38 loads dispatched", icon: Scale, color: "text-blue-400 border-blue-500/20" },
          { label: "Average Border Dwell", val: "3.4 hrs", sub: "-0.8 hrs vs Q1 avg", icon: Clock, color: "text-yellow-400 border-yellow-500/20" },
          { label: "Waybills Completed", val: "148", sub: "99.2% accuracy rate", icon: FileText, color: "text-purple-400 border-purple-500/20" },
        ].map((item, idx) => (
          <div key={idx} className={`p-6 rounded-2xl bg-gray-900 border ${item.color} space-y-4 shadow-xl`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.label}</span>
              <div className="p-2 rounded-xl bg-gray-950">
                <item.icon className="h-5 w-5 text-gray-300" />
              </div>
            </div>
            <div>
              <span className="block text-3xl font-black text-white tracking-tight">{item.val}</span>
              <span className="block text-[11px] text-gray-400 font-semibold mt-1">{item.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side (8 columns): Revenue Performance Chart */}
        <div className="lg:col-span-8 bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg text-white">Monthly Dispatch Revenues ($)</h3>
            <span className="text-xs font-semibold text-gray-400 flex items-center">
              <Calendar className="h-4 w-4 mr-1 text-yellow-500" />
              Jan - Jun 2026
            </span>
          </div>

          {/* Styled HTML Bar Chart */}
          <div className="h-[280px] flex items-end justify-between gap-3 pt-6 border-b border-gray-800 pb-2 relative">
            {/* Chart Grid Lines */}
            <div className="absolute inset-x-0 top-[20%] border-t border-gray-800/40 text-[9px] text-gray-500 font-bold uppercase tracking-wider pl-2">80K</div>
            <div className="absolute inset-x-0 top-[50%] border-t border-gray-800/40 text-[9px] text-gray-500 font-bold uppercase tracking-wider pl-2">50K</div>
            <div className="absolute inset-x-0 top-[80%] border-t border-gray-800/40 text-[9px] text-gray-500 font-bold uppercase tracking-wider pl-2">20K</div>

            {[
              { month: "Jan", val: 42, h: "h-[42%]", rev: "$42,000" },
              { month: "Feb", val: 56, h: "h-[56%]", rev: "$56,400" },
              { month: "Mar", val: 48, h: "h-[48%]", rev: "$48,100" },
              { month: "Apr", val: 68, h: "h-[68%]", rev: "$68,900" },
              { month: "May", val: 78, h: "h-[78%]", rev: "$78,200" },
              { month: "Jun", val: 85, h: "h-[85%]", rev: "$85,400" }
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center group relative z-10">
                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 bg-gray-950 border border-gray-800 px-2 py-1 rounded text-[9px] font-bold text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap shadow-xl">
                  {bar.rev}
                </div>
                {/* Bar */}
                <div className={`w-full max-w-[40px] bg-gradient-to-t from-yellow-600 to-yellow-500 rounded-t-xl ${bar.h} group-hover:from-yellow-500 group-hover:to-yellow-400 transition-all duration-300 shadow-lg shadow-yellow-500/10`}></div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-3">{bar.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side (4 columns): Border post delay list */}
        <div className="lg:col-span-4 bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl space-y-6">
          <h3 className="font-bold text-lg text-white">Logistics KPIs</h3>

          <div className="space-y-4">
            {performanceKpis.map((kpi, idx) => (
              <div key={idx} className="p-4 bg-gray-950 border border-gray-800 rounded-xl space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-gray-300">{kpi.label}</span>
                  <span className={`font-black ${kpi.color}`}>{kpi.val}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-bold text-gray-500">
                  <span>Target: {kpi.target}</span>
                  <span className="flex items-center uppercase tracking-wider text-[9px] text-gray-400">
                    <CheckCircle className="h-3 w-3 mr-1 text-emerald-400" />
                    {kpi.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
