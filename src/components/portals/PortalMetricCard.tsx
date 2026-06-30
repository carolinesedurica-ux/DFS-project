import React from 'react';

interface PortalMetricCardProps {
  title: string;
  value: string | number;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
}

export function PortalMetricCard({ title, value, trend, trendDirection, icon }: PortalMetricCardProps) {
  const trendColor = 
    trendDirection === 'up' ? 'text-green-600' : 
    trendDirection === 'down' ? 'text-red-600' : 'text-gray-500';

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        {icon && <div className="text-primary-royal bg-primary-royal/5 p-2 rounded-lg">{icon}</div>}
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
      {trend && (
        <div className={`text-xs font-medium ${trendColor}`}>
          {trend}
        </div>
      )}
    </div>
  );
}
