"use client";

import React from 'react';
import { PageHeader } from '@/components/admin/PageHeader';
import { Save, Server, Shield, CreditCard } from 'lucide-react';

export default function SettingsAdminDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="System Settings" 
        description="Configure platform-wide settings, API connections, and service pricing."
        actions={<button className="bg-yellow-500 text-gray-900 px-6 py-2 rounded-lg font-bold text-sm flex items-center gap-2"><Save className="h-4 w-4" /> Save Changes</button>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
        
        {/* Supabase Connection */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-sm col-span-1 lg:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <Server className="h-6 w-6 text-yellow-500" />
            <h3 className="text-white font-semibold text-lg">Database Configuration</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Supabase Project URL</label>
              <input type="text" disabled value={process.env.NEXT_PUBLIC_SUPABASE_URL || 'Not Configured'} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-gray-300 opacity-50 cursor-not-allowed" />
              <p className="text-xs text-gray-500 mt-1">Configured via environment variables.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Row Level Security</label>
              <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
                <Shield className="h-4 w-4" /> Enabled on all primary tables
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Configuration */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-sm col-span-1 lg:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <CreditCard className="h-6 w-6 text-yellow-500" />
            <h3 className="text-white font-semibold text-lg">Base Pricing</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Trucking Base Rate (per km)</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input type="number" defaultValue={1.45} className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-8 pr-4 py-2 text-white focus:outline-none focus:border-yellow-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Express Base Rate (per kg)</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input type="number" defaultValue={3.20} className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-8 pr-4 py-2 text-white focus:outline-none focus:border-yellow-500" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
