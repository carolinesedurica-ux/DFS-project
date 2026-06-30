"use client";

import React from 'react';
import { PortalPageHeader } from '@/components/portals/PortalPageHeader';
import { PortalMetricCard } from '@/components/portals/PortalMetricCard';
import { PortalDataTable } from '@/components/portals/PortalDataTable';
import { PortalStatusBadge } from '@/components/portals/PortalStatusBadge';
import { mockUsers } from '@/lib/mockData';
import { Users, Shield, UserX } from 'lucide-react';

export default function UsersAdminDashboard() {
  const columns = [
    { key: 'id', header: 'User ID' },
    { key: 'name', header: 'Full Name' },
    { key: 'email', header: 'Email Address' },
    { 
      key: 'role', 
      header: 'Role',
      render: (row: any) => (
        <span className="px-2 py-1 bg-gray-100 rounded text-xs font-mono text-gray-700">{row.role}</span>
      )
    },
    { key: 'domain', header: 'Service Domain' },
    { 
      key: 'status', 
      header: 'Status',
      render: (row: any) => <PortalStatusBadge status={row.status} />
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <PortalPageHeader 
        title="User Management" 
        description="Manage all users, RBAC roles, and platform access control."
        actions={<button className="bg-primary-royal text-white px-4 py-2 rounded-lg font-bold text-sm">Invite User</button>}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PortalMetricCard title="Total Users" value="842" trend="+12 this month" trendDirection="up" icon={<Users className="h-6 w-6 text-primary-royal" />} />
        <PortalMetricCard title="Active Admins" value="14" trend="Stable" trendDirection="neutral" icon={<Shield className="h-6 w-6 text-primary-royal" />} />
        <PortalMetricCard title="Suspended Accounts" value="3" trend="-1 from last week" trendDirection="up" icon={<UserX className="h-6 w-6 text-red-500" />} />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-gray-900 font-semibold text-lg mb-4">System Users</h3>
        <PortalDataTable columns={columns} data={mockUsers} />
      </div>
    </div>
  );
}
