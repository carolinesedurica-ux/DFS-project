"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, Mail } from "lucide-react";
import settings from "@/data/settings.json";

export default function Footer() {
  const pathname = usePathname();
  const isPortal = pathname.startsWith("/portal") || pathname.startsWith("/admin");

  if (isPortal) return null;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-black text-white/70 border-t-2 border-accent-gold mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <Link href="/" className="flex-shrink-0">
            <div className="relative h-14 w-48">
              <Image
                src="/images/logos/dfsgrouplogo.png"
                alt="DFS Group"
                fill
                sizes="192px"
                className="object-contain object-left brightness-0 invert"
              />
            </div>
          </Link>

          {/* Contact inline */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-white/50">
            <a href={`tel:${settings.company.phone1.replace(/\s+/g, "")}`} className="flex items-center gap-1.5 hover:text-accent-gold transition-colors">
              <Phone className="h-3 w-3" />{settings.company.phone1}
            </a>
            <a href={`mailto:${settings.company.email}`} className="flex items-center gap-1.5 hover:text-accent-gold transition-colors">
              <Mail className="h-3 w-3" />{settings.company.email}
            </a>
            <span className="text-white/20">|</span>
            <span>Gaborone, Botswana</span>
          </div>

          {/* Copyright */}
          <p className="text-[10px] text-white/30 flex-shrink-0">
            &copy; {currentYear} {settings.company.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
