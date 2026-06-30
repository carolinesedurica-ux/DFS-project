"use client";

import PortalSidebar from "@/components/portals/PortalSidebar";
import PortalHeader from "@/components/portals/PortalHeader";
import { Package, Clock, List, Headset, LayoutDashboard } from "lucide-react";

const expressNavItems = [
  { name: "Dashboard", href: "/express/dashboard", icon: LayoutDashboard },
  { name: "Book Delivery", href: "/express/book", icon: Package },
  { name: "Track Parcel", href: "/express/track", icon: Clock },
  { name: "Rates", href: "/express/rates", icon: List },
  { name: "History", href: "/express/history", icon: FileText },
  { name: "Support", href: "/express/support", icon: Headset },
];

// Fallback for FileText since it's used but not imported
import { FileText } from "lucide-react";

export default function ExpressLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-zinc-50 express-theme">
      <PortalSidebar portalName="DFS Express" items={expressNavItems} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <PortalHeader portalName="DFS Express" />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
