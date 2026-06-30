"use client";

import PortalSidebar from "@/components/portals/PortalSidebar";
import PortalHeader from "@/components/portals/PortalHeader";
import ProtectedRoute from "@/lib/auth/ProtectedRoute";
import { Truck, Map, Box, FileText, Headset, LayoutDashboard, Coins } from "lucide-react";

const truckingNavItems = [
  { name: "Dashboard", href: "/trucking/dashboard", icon: LayoutDashboard },
  { name: "Fleet", href: "/trucking/fleet", icon: Truck },
  { name: "Tracking", href: "/trucking/tracking", icon: Map },
  { name: "Shipments", href: "/trucking/shipments", icon: Box },
  { name: "Quotes", href: "/trucking/quotes", icon: FileText },
  { name: "Finance", href: "/trucking/finance", icon: Coins },
  { name: "Support", href: "/trucking/support", icon: Headset },
];

export default function TruckingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute requireAdmin={false}>
      <div className="flex h-screen bg-gray-50 trucking-theme">
        <PortalSidebar portalName="DFS Trucking" items={truckingNavItems} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <PortalHeader portalName="DFS Trucking" />
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
