"use client";

import React from 'react';
import { PageHeader } from '@/components/admin/PageHeader';
import { MetricCard } from '@/components/admin/MetricCard';
import { DataTable } from '@/components/admin/DataTable';
import { StatusBadge } from '@/components/admin/StatusBadge';
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
        <span className="px-2 py-1 bg-gray-700 rounded text-xs font-mono text-gray-300">{row.role}</span>
      )
    },
    { key: 'domain', header: 'Service Domain' },
    { 
      key: 'status', 
      header: 'Status',
      render: (row: any) => <StatusBadge status={row.status} />
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="User Management" 
        description="Manage all users, RBAC roles, and platform access control."
        actions={<button className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg font-bold text-sm">Invite User</button>}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard title="Total Users" value="842" trend="+12 this month" trendDirection="up" icon={<Users />} />
        <MetricCard title="Active Admins" value="14" trend="Stable" trendDirection="neutral" icon={<Shield />} />
        <MetricCard title="Suspended Accounts" value="3" trend="-1 from last week" trendDirection="up" icon={<UserX />} />
      </div>

      <div className="pt-4">
        <h3 className="text-white font-semibold text-lg mb-4">System Users</h3>
        <DataTable columns={columns} data={mockUsers} />
      </div>
    </div>
  );
}
