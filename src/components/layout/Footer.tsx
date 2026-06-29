"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, Mail, MapPin, ShieldCheck } from "lucide-react";
import settings from "@/data/settings.json";

export default function Footer() {
  const pathname = usePathname();
  const isPortal = pathname.startsWith("/portal") || pathname.startsWith("/admin");

  // Don't show public footer inside portal/admin routes
  if (isPortal) return null;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-black text-white/90 relative overflow-hidden border-t-2 border-accent-gold mt-auto">
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Top Segment: Logo & Corporate Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-white/5 pb-12 mb-12">
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block">
              <div className="relative h-14 w-44">
                <Image
                  src="/images/logos/dfs-group-logo.svg"
                  alt="DFS Group Logo"
                  fill
                  sizes="176px"
                  className="object-contain object-left brightness-0 invert"
                />
              </div>
            </Link>
            <p className="text-xs sm:text-sm text-white/60 leading-relaxed max-w-sm">
              Connecting Southern African commerce with high-capacity road
              transport, cross-border clearance, and digital supply chain
              visibility.
            </p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {/* Quick Links */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-bold text-accent-gold uppercase tracking-wider">
                Quick Links
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/quote" className="text-white/60 hover:text-accent-bright transition-colors">
                    Request a Quote
                  </Link>
                </li>
                <li>
                  <Link href="/portal/sign-in" className="text-white/60 hover:text-accent-bright transition-colors">
                    Customer Sign In
                  </Link>
                </li>
                <li>
                  <Link href="/portal/request-access" className="text-white/60 hover:text-accent-bright transition-colors">
                    Request Portal Access
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-white/60 hover:text-accent-bright transition-colors">
                    Contact Office
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-bold text-accent-gold uppercase tracking-wider">
                Services
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/services#bulk-cargo" className="text-white/60 hover:text-accent-bright transition-colors">
                    Bulk Cargo
                  </Link>
                </li>
                <li>
                  <Link href="/services#bagged-cargo" className="text-white/60 hover:text-accent-bright transition-colors">
                    Bagged Cargo
                  </Link>
                </li>
                <li>
                  <Link href="/services#cross-border-freight" className="text-white/60 hover:text-accent-bright transition-colors">
                    Cross-Border
                  </Link>
                </li>
                <li>
                  <Link href="/services#customs-clearing" className="text-white/60 hover:text-accent-bright transition-colors">
                    Customs Clearing
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-bold text-accent-gold uppercase tracking-wider">
                Company
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/about" className="text-white/60 hover:text-accent-bright transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/about#leadership" className="text-white/60 hover:text-accent-bright transition-colors">
                    Leadership
                  </Link>
                </li>
                <li>
                  <Link href="/fleet" className="text-white/60 hover:text-accent-bright transition-colors">
                    Fleet Catalogue
                  </Link>
                </li>
                <li>
                  <Link href="/sustainability-safety" className="text-white/60 hover:text-accent-bright transition-colors">
                    Sustainability
                  </Link>
                </li>
              </ul>
            </div>

            {/* SADC Hubs */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-bold text-accent-gold uppercase tracking-wider">
                SADC Network
              </h4>
              <ul className="space-y-2 text-xs text-white/60 font-semibold">
                <li>Botswana (Gaborone)</li>
                <li>South Africa (JHB)</li>
                <li>Zambia (Lusaka)</li>
                <li>Zimbabwe (Harare)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Middle Segment: Headquarters Address Block */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-xs text-white/70 border-b border-white/5 pb-12 mb-12">
          <div className="flex items-start space-x-2.5">
            <MapPin className="h-5 w-5 text-accent-gold flex-shrink-0 mt-0.5" />
            <div>
              <strong className="block text-white mb-0.5">Head Office</strong>
              <span>
                {settings.company.headquarters.address},<br />
                {settings.company.headquarters.city},{" "}
                {settings.company.headquarters.country}
              </span>
            </div>
          </div>

          <div className="flex items-start space-x-2.5">
            <Phone className="h-4.5 w-4.5 text-accent-gold flex-shrink-0 mt-0.5" />
            <div>
              <strong className="block text-white mb-0.5">Direct Line</strong>
              <a
                href={`tel:${settings.company.phone1.replace(/\s+/g, "")}`}
                className="hover:text-accent-bright block"
              >
                {settings.company.phone1}
              </a>
              <a
                href={`tel:${settings.company.phone2.replace(/\s+/g, "")}`}
                className="hover:text-accent-bright block"
              >
                {settings.company.phone2}
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-2.5">
            <Mail className="h-4.5 w-4.5 text-accent-gold flex-shrink-0 mt-0.5" />
            <div>
              <strong className="block text-white mb-0.5">Email Registry</strong>
              <a
                href={`mailto:${settings.company.email}`}
                className="hover:text-accent-bright block"
              >
                {settings.company.email}
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-2.5">
            <ShieldCheck className="h-4.5 w-4.5 text-accent-gold flex-shrink-0 mt-0.5" />
            <div>
              <strong className="block text-white mb-0.5">Data Privacy</strong>
              <span>
                POPIA & Botswana Data Protection compliant secure archives.
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Segment: Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-white/40">
          <div className="text-center md:text-left space-y-1">
            <p>
              &copy; {currentYear} {settings.company.name}. All rights reserved.
            </p>
            <p className="max-w-2xl leading-normal text-[9px] text-white/30">
              Disclaimer: Regional road freight services are performed under DFS
              Group Standard Trading Conditions. Customs rulings, tariff
              valuations, and border clearances are subject to review by local
              customs and revenue authorities.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-white/50 font-medium">
            <span className="hover:text-accent-gold cursor-pointer transition-colors">
              Terms of Website Use
            </span>
            <span className="hover:text-accent-gold cursor-pointer transition-colors">
              Privacy & Cookies Policy
            </span>
            <span className="hover:text-accent-gold cursor-pointer transition-colors">
              Vendor Guidelines
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
