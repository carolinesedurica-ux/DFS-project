"use client";

import { useState } from "react";
import { 
  Settings, 
  Sliders, 
  Database, 
  Bell, 
  ShieldCheck, 
  Save, 
  HelpCircle,
  ToggleLeft,
  ToggleRight
} from "lucide-react";

export default function SettingsAdminDashboard() {
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [config, setConfig] = useState({
    fuelSurcharge: "14.5",
    dwellLimit: "4.0",
    baseTariff: "24.50",
    geofenceStatus: true,
    emailAlerts: true,
    supabaseUrl: "https://dfs-operational-db.supabase.co",
    gpsInterval: "30"
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-black tracking-tight text-white flex items-center space-x-3">
          <Settings className="h-8 w-8 text-yellow-500" />
          <span>System Settings & Geofences</span>
        </h2>
        <p className="text-gray-400 mt-2 font-medium">
          Configure SADC corridor tariffs, geofence variables, database keys, and global notification flags.
        </p>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-xs font-semibold text-gray-300">
        
        {/* Left Side (8 columns): Settings Forms */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* General Operational settings */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-6 border-b border-gray-800 bg-gray-900/50 flex items-center space-x-3">
              <Sliders className="h-5 w-5 text-yellow-500" />
              <h3 className="font-bold text-base text-white">General Transit Variables</h3>
            </div>

            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-gray-400 uppercase tracking-wider text-[10px] flex items-center">
                  <span>Fuel Surcharge Multiplier (%)</span>
                  <span title="Applied dynamically to freight quotes"><HelpCircle className="h-3.5 w-3.5 ml-1 text-gray-500" /></span>
                </label>
                <input
                  type="text"
                  value={config.fuelSurcharge}
                  onChange={(e) => setConfig({ ...config, fuelSurcharge: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl text-white focus:outline-none focus:border-yellow-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-gray-400 uppercase tracking-wider text-[10px] flex items-center">
                  <span>Border Dwell Warning Limit (Hours)</span>
                  <span title="Triggers warning flag in Control Tower if exceeded"><HelpCircle className="h-3.5 w-3.5 ml-1 text-gray-500" /></span>
                </label>
                <input
                  type="text"
                  value={config.dwellLimit}
                  onChange={(e) => setConfig({ ...config, dwellLimit: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl text-white focus:outline-none focus:border-yellow-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-gray-400 uppercase tracking-wider text-[10px] flex items-center">
                  <span>SADC Tariff Base Rate (USD/MT)</span>
                  <span title="Standard shipping quote base tariff"><HelpCircle className="h-3.5 w-3.5 ml-1 text-gray-500" /></span>
                </label>
                <input
                  type="text"
                  value={config.baseTariff}
                  onChange={(e) => setConfig({ ...config, baseTariff: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl text-white focus:outline-none focus:border-yellow-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-gray-400 uppercase tracking-wider text-[10px] flex items-center">
                  <span>GPS Telemetry Fetch Interval (s)</span>
                  <span title="Polling rate for corridor GPS signal sync"><HelpCircle className="h-3.5 w-3.5 ml-1 text-gray-500" /></span>
                </label>
                <input
                  type="text"
                  value={config.gpsInterval}
                  onChange={(e) => setConfig({ ...config, gpsInterval: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl text-white focus:outline-none focus:border-yellow-500"
                />
              </div>
            </div>
          </div>

          {/* Database & Supabase Integrations */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-6 border-b border-gray-800 bg-gray-900/50 flex items-center space-x-3">
              <Database className="h-5 w-5 text-yellow-500" />
              <h3 className="font-bold text-base text-white">Database & Integrations</h3>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="block text-gray-400 uppercase tracking-wider text-[10px]">Supabase Project URL</label>
                <input
                  type="text"
                  value={config.supabaseUrl}
                  onChange={(e) => setConfig({ ...config, supabaseUrl: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl text-white focus:outline-none focus:border-yellow-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-gray-400 uppercase tracking-wider text-[10px]">Supabase Anon API Key</label>
                <input
                  type="password"
                  value="••••••••••••••••••••••••••••••••••••••••••••••••••••"
                  disabled
                  className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl text-gray-500 focus:outline-none cursor-not-allowed"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Right Side (4 columns): Toggle flags & Save action */}
        <div className="lg:col-span-4 space-y-6">
          {/* Status switches */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl space-y-5">
            <h3 className="font-bold text-base text-white flex items-center space-x-2">
              <Bell className="h-5 w-5 text-yellow-500" />
              <span>Notification Flags</span>
            </h3>

            <div className="space-y-4">
              {/* Geofence Status */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-950 border border-gray-800/40">
                <div>
                  <span className="block text-white">GPS Geofencing Alerts</span>
                  <span className="block text-[10px] text-gray-500">Track vehicle deviation</span>
                </div>
                <button
                  type="button"
                  onClick={() => setConfig({ ...config, geofenceStatus: !config.geofenceStatus })}
                  className="text-yellow-500 hover:text-yellow-400 transition"
                >
                  {config.geofenceStatus ? <ToggleRight className="h-8 w-8" /> : <ToggleLeft className="h-8 w-8 text-gray-600" />}
                </button>
              </div>

              {/* Email Alerts */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-950 border border-gray-800/40">
                <div>
                  <span className="block text-white">Email Dispatch Notifications</span>
                  <span className="block text-[10px] text-gray-500">Notify clients upon border entry</span>
                </div>
                <button
                  type="button"
                  onClick={() => setConfig({ ...config, emailAlerts: !config.emailAlerts })}
                  className="text-yellow-500 hover:text-yellow-400 transition"
                >
                  {config.emailAlerts ? <ToggleRight className="h-8 w-8" /> : <ToggleLeft className="h-8 w-8 text-gray-600" />}
                </button>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="space-y-4">
            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-2 py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-extrabold rounded-xl transition shadow-lg shadow-yellow-500/10 text-sm"
            >
              <Save className="h-4.5 w-4.5" />
              <span>Save System Settings</span>
            </button>

            {saveSuccess && (
              <div className="p-4 bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 rounded-xl text-center font-bold text-xs animate-fade-in-up flex items-center justify-center space-x-2">
                <ShieldCheck className="h-4 w-4" />
                <span>System configuration updated successfully!</span>
              </div>
            )}
          </div>
        </div>

      </form>
    </div>
  );
}
