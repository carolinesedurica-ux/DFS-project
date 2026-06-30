"use client";

import PortalSidebar from "@/components/portals/PortalSidebar";
import PortalHeader from "@/components/portals/PortalHeader";
import { Globe, FileText, ClipboardCheck, Headset, LayoutDashboard, Search } from "lucide-react";

const clearingNavItems = [
  { name: "Dashboard", href: "/clearing/dashboard", icon: LayoutDashboard },
  { name: "Imports", href: "/clearing/imports", icon: Globe },
  { name: "Exports", href: "/clearing/exports", icon: Globe },
  { name: "Documents", href: "/clearing/documents", icon: FileText },
  { name: "Tracking", href: "/clearing/tracking", icon: Search },
  { name: "Support", href: "/clearing/support", icon: Headset },
];

export default function ClearingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-slate-50 clearing-theme">
      <PortalSidebar portalName="DFS Clearing" items={clearingNavItems} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <PortalHeader portalName="DFS Clearing" />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
