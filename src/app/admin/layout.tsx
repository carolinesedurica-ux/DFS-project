"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Truck, Globe, Package, Map, BarChart, Users, Building, Settings, User, LogOut } from 'lucide-react';
import ProtectedRoute from '@/lib/auth/ProtectedRoute';
import { useAuth } from '@/lib/auth/AuthContext';

const adminNavItems = [
  { name: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Trucking", href: "/admin/trucking", icon: Truck },
  { name: "Clearing", href: "/admin/clearing", icon: Globe },
  { name: "Express", href: "/admin/express", icon: Package },
  { name: "Global Tracking", href: "/admin/tracking", icon: Map },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Companies", href: "/admin/companies", icon: Building },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute requireAdmin={true}>
      <div className="flex h-screen bg-primary-black text-white font-sans antialiased">
        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0 border-r border-accent-gold/20 bg-primary-deep min-h-screen flex flex-col hidden md:flex">
          <div className="h-16 flex items-center px-6 border-b border-accent-gold/20 bg-primary-deep">
            <h1 className="text-lg font-extrabold text-accent-gold tracking-wider uppercase flex items-center space-x-2">
              <span className="bg-accent-gold text-primary-deep px-1.5 py-0.5 rounded font-black">DFS</span>
              <span>Control Tower</span>
            </h1>
          </div>
          
          <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
            {adminNavItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
                    isActive 
                      ? "gold-gradient text-primary-deep shadow-lg shadow-accent-gold/20" 
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className={`h-5 w-5 ${isActive ? "text-primary-deep" : "text-gray-400"}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-accent-gold/20 bg-primary-deep/50">
            <button
              onClick={logout}
              className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Log Out</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="h-16 border-b border-accent-gold/20 bg-primary-deep flex items-center justify-between px-6 sticky top-0 z-30">
            <div className="flex items-center space-x-3 text-sm text-gray-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>System Status: <strong className="text-emerald-400">Operational</strong></span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <span className="block text-sm font-bold text-white">{user?.name || "DFS Staff"}</span>
                <span className="block text-xs text-gray-400 font-semibold uppercase tracking-wider">{user?.role?.replace('_', ' ')}</span>
              </div>
              <div className="h-9 w-9 rounded-xl bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center text-accent-gold font-bold">
                {user?.name ? user.name.split(' ').map(n => n[0]).join('') : "DS"}
              </div>
            </div>
          </header>

          {/* Page body */}
          <main className="flex-1 overflow-y-auto bg-primary-black p-6 sm:p-8">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
