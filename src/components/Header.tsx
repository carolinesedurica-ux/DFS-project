"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Mail, Truck, Globe, FileText } from "lucide-react";
import settings from "@/data/settings.json";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Fleet", href: "/fleet" },
    { name: "Regional Network", href: "/network" },
    { name: "Technology", href: "/technology" },
    { name: "Sustainability & Safety", href: "/sustainability-safety" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="w-full flex flex-col z-50">
      {/* Utility Bar */}
      <div className="bg-primary-deep text-white text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center space-x-2 text-white/80">
            <Globe className="h-3.5 w-3.5 text-accent-gold" />
            <span>Cross-border transport & logistics solutions across Southern Africa.</span>
          </div>
          <div className="flex items-center space-x-6">
            <a href={`tel:${settings.company.phone1.replace(/\s+/g, "")}`} className="flex items-center space-x-1.5 hover:text-accent-gold transition-colors">
              <Phone className="h-3.5 w-3.5 text-accent-gold" />
              <span>{settings.company.phone1}</span>
            </a>
            <a href={`mailto:${settings.company.email}`} className="flex items-center space-x-1.5 hover:text-accent-gold transition-colors">
              <Mail className="h-3.5 w-3.5 text-accent-gold" />
              <span>{settings.company.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white text-charcoal shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3">
                {/* Simulated Premium Logo using design tokens */}
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary-deep text-accent-gold font-extrabold text-xl shadow-inner border border-accent-gold/20">
                  D
                </div>
                <div>
                  <span className="text-xl font-bold tracking-tight text-primary-deep">DFS <span className="text-accent-gold">Group</span></span>
                  <span className="block text-[9px] uppercase tracking-widest text-charcoal/60 -mt-1 font-semibold">Digital Logistics</span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-primary-deep font-semibold border-b-2 border-accent-gold rounded-none"
                      : "text-gray-600 hover:text-primary-deep hover:bg-gray-50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* CTAs */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link
                href="/track"
                className="flex items-center space-x-1.5 px-4 py-2 border border-primary-deep/20 text-primary-deep hover:border-primary-deep hover:bg-gray-50 rounded-md text-sm font-medium transition-all"
              >
                <Truck className="h-4 w-4" />
                <span>Track Cargo</span>
              </Link>
              <Link
                href="/quote"
                className="flex items-center space-x-1.5 px-5 py-2.5 bg-accent-gold text-primary-deep hover:bg-accent-hover rounded-md text-sm font-bold shadow-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <FileText className="h-4 w-4" />
                <span>Request a Quote</span>
              </Link>
            </div>

            {/* Mobile Hamburger Menu Toggle */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-primary-deep hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent-gold"
                aria-expanded={mobileMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden animate-fade-in-up duration-200">
            <div className="px-2 pt-2 pb-4 space-y-1 border-t border-gray-100 bg-white">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-md text-base font-semibold transition-colors ${
                    isActive(item.href)
                      ? "text-white bg-primary-deep"
                      : "text-gray-700 hover:text-primary-deep hover:bg-gray-50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 pb-2 border-t border-gray-100 px-4 flex flex-col gap-3">
                <Link
                  href="/track"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center space-x-2 w-full px-4 py-3 border border-primary-deep/20 text-primary-deep hover:bg-gray-50 rounded-md text-base font-semibold"
                >
                  <Truck className="h-5 w-5" />
                  <span>Track Cargo</span>
                </Link>
                <Link
                  href="/quote"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-accent-gold text-primary-deep hover:bg-accent-hover rounded-md text-base font-bold shadow-sm"
                >
                  <FileText className="h-5 w-5" />
                  <span>Request a Quote</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
