"use client";

import React from 'react';
import { PageHeader } from '@/components/admin/PageHeader';
import { MetricCard } from '@/components/admin/MetricCard';
import { BarChart, DollarSign, TrendingUp } from 'lucide-react';

export default function AnalyticsAdminDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Global Analytics" 
        description="High-level aggregated statistics and operational bottlenecks across the DFS Ecosystem."
        actions={<button className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg font-bold text-sm">Download PDF</button>}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard title="Total Monthly Revenue" value="$4.2M" trend="+12% vs last month" trendDirection="up" icon={<DollarSign />} />
        <MetricCard title="Total Shipments (MTD)" value="14,290" trend="+4% vs last month" trendDirection="up" icon={<BarChart />} />
        <MetricCard title="Overall Efficiency" value="94.2%" trend="Optimal" trendDirection="neutral" icon={<TrendingUp />} />
      </div>

      <div className="pt-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 h-80 flex items-center justify-center">
            <p className="text-gray-500 text-sm">Revenue by Service (Chart Placeholder)</p>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 h-80 flex items-center justify-center">
            <p className="text-gray-500 text-sm">Performance Bottlenecks (Map Placeholder)</p>
        </div>
      </div>
    </div>
  );
}
