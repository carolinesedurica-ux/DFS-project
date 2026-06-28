"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Mail, MapPin, Shield, Lock } from "lucide-react";
import settings from "@/data/settings.json";

export default function UtilityBar() {
  const pathname = usePathname();
  const isPortal = pathname.startsWith("/portal") || pathname.startsWith("/admin");

  // Don't show utility bar inside portal/admin routes
  if (isPortal) return null;

  return (
    <div className="bg-primary-deep text-white text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-white/5 relative z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        {/* Left: Location & Alert */}
        <div className="flex items-center space-x-4 text-white/80">
          <div className="flex items-center space-x-1">
            <MapPin className="h-3 w-3 text-accent-gold" />
            <span>Botswana HQ</span>
          </div>
          <span className="h-3 w-px bg-white/20 hidden sm:inline"></span>
          <div className="flex items-center space-x-1.5 animate-pulse text-accent-bright/95">
            <Shield className="h-3.5 w-3.5" />
            <span>SADC Border Channels: Active</span>
          </div>
        </div>

        {/* Right: Quick Contacts & Portal link */}
        <div className="flex items-center space-x-6">
          <a
            href={`tel:${settings.company.phone1.replace(/\s+/g, "")}`}
            className="hidden md:flex items-center space-x-1.5 text-white/80 hover:text-accent-bright transition-colors"
          >
            <Phone className="h-3 w-3 text-accent-gold" />
            <span>{settings.company.phone1}</span>
          </a>
          <a
            href={`mailto:${settings.company.email}`}
            className="hidden md:flex items-center space-x-1.5 text-white/80 hover:text-accent-bright transition-colors"
          >
            <Mail className="h-3 w-3 text-accent-gold" />
            <span>{settings.company.email}</span>
          </a>
          <span className="h-3 w-px bg-white/20 hidden md:inline"></span>
          <Link
            href="/portal/sign-in"
            className="flex items-center space-x-1.5 bg-accent-gold hover:bg-accent-bright text-primary-deep px-2.5 py-0.5 rounded font-bold transition-colors text-[10.5px]"
          >
            <Lock className="h-3 w-3" />
            <span>Customer Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
