import React from 'react';

interface PortalStatusBadgeProps {
  status: string;
}

export function PortalStatusBadge({ status }: PortalStatusBadgeProps) {
  const normalized = status.toLowerCase();
  
  let bgColor = 'bg-gray-100';
  let textColor = 'text-gray-600';
  let dotColor = 'bg-gray-500';

  if (['delivered', 'completed', 'active', 'cleared'].includes(normalized)) {
    bgColor = 'bg-green-100';
    textColor = 'text-green-700';
    dotColor = 'bg-green-600';
  } else if (['pending', 'in transit', 'transit', 'open', 'processing'].includes(normalized)) {
    bgColor = 'bg-yellow-100';
    textColor = 'text-yellow-700';
    dotColor = 'bg-yellow-600';
  } else if (['delayed', 'failed', 'issue', 'blocked', 'inactive'].includes(normalized)) {
    bgColor = 'bg-red-100';
    textColor = 'text-red-700';
    dotColor = 'bg-red-600';
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border border-white/50 shadow-sm ${bgColor} ${textColor}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />
      <span className="capitalize">{status}</span>
    </span>
  );
}
