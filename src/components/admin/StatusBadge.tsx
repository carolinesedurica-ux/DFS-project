import React from 'react';

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const normalized = status.toLowerCase();
  
  let bgColor = 'bg-gray-500/10';
  let textColor = 'text-gray-400';
  let dotColor = 'bg-gray-400';

  if (['delivered', 'completed', 'active', 'cleared'].includes(normalized)) {
    bgColor = 'bg-green-500/10';
    textColor = 'text-green-400';
    dotColor = 'bg-green-400';
  } else if (['pending', 'in transit', 'transit', 'open', 'processing'].includes(normalized)) {
    bgColor = 'bg-yellow-500/10';
    textColor = 'text-yellow-400';
    dotColor = 'bg-yellow-400';
  } else if (['delayed', 'failed', 'issue', 'blocked', 'inactive'].includes(normalized)) {
    bgColor = 'bg-red-500/10';
    textColor = 'text-red-400';
    dotColor = 'bg-red-400';
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />
      <span className="capitalize">{status}</span>
    </span>
  );
}
