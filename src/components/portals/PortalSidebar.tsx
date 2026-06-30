"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface PortalNavItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

interface PortalSidebarProps {
  portalName: string;
  items: PortalNavItem[];
}

export default function PortalSidebar({ portalName, items }: PortalSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 border-r border-gray-200 bg-white min-h-screen flex-col hidden md:flex">
      <div className="h-16 flex items-center px-6 border-b border-gray-200 bg-white">
        <h1 className="text-xl font-extrabold text-primary-deep tracking-tight">{portalName}</h1>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {items.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                isActive 
                  ? "bg-primary-royal/10 text-primary-royal" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? "text-primary-royal" : "text-gray-400"}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-gray-200">
        <Link 
          href="/" 
          className="flex items-center space-x-2 text-sm font-bold text-gray-500 hover:text-primary-royal transition-colors"
        >
          <span>← Back to DFS</span>
        </Link>
      </div>
    </aside>
  );
}
