"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Truck, Globe, Package, Map, BarChart, Users, Building, Settings, User } from 'lucide-react';

const adminNavItems = [
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

  return (
    <div className="flex h-screen bg-gray-900 text-white font-sans antialiased">
      <aside className="w-64 flex-shrink-0 border-r border-gray-800 bg-gray-900 min-h-screen flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-gray-800 bg-gray-900">
          <h1 className="text-xl font-bold text-yellow-500 tracking-wider uppercase">DFS Control Tower</h1>
        </div>
        <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
          {adminNavItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? "bg-yellow-500/10 text-yellow-500" 
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-yellow-500" : "text-gray-500"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-gray-800 bg-gray-900 flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="text-sm text-gray-400">
            System Status: <span className="text-green-400 font-bold">Operational</span>
          </div>
          <div className="flex items-center space-x-4">
             <span className="text-sm font-semibold">Super Admin View</span>
             <button className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-gray-700 transition-colors">
               <User className="h-4 w-4" />
             </button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-[#0f1115] p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
