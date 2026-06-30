import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
}

export function MetricCard({ title, value, trend, trendDirection, icon }: MetricCardProps) {
  const trendColor = 
    trendDirection === 'up' ? 'text-green-400' : 
    trendDirection === 'down' ? 'text-red-400' : 'text-gray-400';

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-sm flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
        {icon && <div className="text-gray-500">{icon}</div>}
      </div>
      <div className="text-3xl font-bold text-white mb-2">{value}</div>
      {trend && (
        <div className={`text-xs font-medium ${trendColor}`}>
          {trend}
        </div>
      )}
    </div>
  );
}
