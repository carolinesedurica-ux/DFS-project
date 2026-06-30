import React from 'react';

interface PortalPageHeaderProps {
  title: string;
  description: string;
  actions?: React.ReactNode;
}

export function PortalPageHeader({ title, description, actions }: PortalPageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">{title}</h2>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>
      {actions && (
        <div className="flex items-center gap-3">
          {actions}
        </div>
      )}
    </div>
  );
}
