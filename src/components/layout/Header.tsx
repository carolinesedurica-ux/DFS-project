"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Mail, Truck, FileText, ChevronDown, User } from "lucide-react";
import settings from "@/data/settings.json";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Fleet", href: "/fleet" },
    { name: "Regional Network", href: "/network" },
    { name: "Technology", href: "/technology" },
    { name: "Sustainability", href: "/sustainability-safety" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const isHomepage = pathname === "/";

  return (
    <header className={`w-full sticky top-0 z-40 transition-all duration-300 ${
      scrolled 
        ? "bg-white text-charcoal shadow-[0_10px_30px_rgba(23,6,34,0.05)] border-b border-gray-100" 
        : isHomepage 
          ? "bg-transparent text-white" 
          : "bg-white text-charcoal border-b border-gray-100"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              {/* Premium Purple & Gold Logo emblem */}
              <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-primary-royal text-accent-bright font-extrabold text-xl shadow-md border border-accent-gold/30">
                D
              </div>
              <div>
                <span className={`text-xl font-extrabold tracking-tight transition-colors ${
                  scrolled || !isHomepage ? "text-primary-royal" : "text-white"
                }`}>
                  DFS <span className="text-accent-gold">Group</span>
                </span>
                <span className={`block text-[9px] uppercase tracking-widest -mt-1 font-bold ${
                  scrolled || !isHomepage ? "text-charcoal/50" : "text-white/60"
                }`}>
                  Regional Logistics
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Main Nav Links */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 text-sm font-semibold tracking-wide transition-all relative group ${
                  isActive(item.href)
                    ? scrolled || !isHomepage 
                      ? "text-primary-royal" 
                      : "text-accent-gold"
                    : scrolled || !isHomepage
                      ? "text-slate hover:text-primary-royal"
                      : "text-white/80 hover:text-white"
                }`}
              >
                <span>{item.name}</span>
                {/* Gold underline for active state */}
                {isActive(item.href) && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-accent-gold rounded"></span>
                )}
                {/* Soft hover line */}
                {!isActive(item.href) && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-accent-gold/40 rounded scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Right: Main CTAs */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/track"
              className="flex items-center space-x-1.5 px-4.5 py-2.5 bg-primary-royal hover:bg-primary-deep text-white rounded-xl text-xs font-bold shadow-sm transition-all"
            >
              <Truck className="h-4 w-4 text-accent-gold" />
              <span>Track Shipment</span>
            </Link>
            
            <Link
              href="/quote"
              className="flex items-center space-x-1.5 px-5 py-2.5 gold-gradient hover:opacity-95 text-primary-deep rounded-xl text-xs font-extrabold shadow-sm transition-all transform hover:-translate-y-0.5"
            >
              <FileText className="h-4 w-4" />
              <span>Request a Quote</span>
            </Link>
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-gold ${
                scrolled || !isHomepage ? "text-slate" : "text-white"
              }`}
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden animate-fade-in-up duration-200 fixed inset-0 top-20 bg-primary-deep/95 z-50 backdrop-blur-md overflow-y-auto">
          <div className="px-4 pt-4 pb-12 space-y-2 max-w-md mx-auto">
            
            {/* Quick Tracking Widget on Mobile */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
              <span className="block text-[10px] text-accent-gold font-bold uppercase tracking-wider mb-2">Instant Dispatch</span>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. DFS-102-BOT"
                  className="bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-white/40 font-mono w-full focus:outline-none focus:border-accent-gold"
                />
                <Link
                  href="/track"
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-accent-gold text-primary-deep px-3 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center flex-shrink-0"
                >
                  Track
                </Link>
              </div>
            </div>

            {/* Links List */}
            <nav className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3.5 rounded-xl text-base font-bold transition-all ${
                    isActive(item.href)
                      ? "text-primary-deep bg-accent-gold"
                      : "text-white/80 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Primary Actions */}
            <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
              <Link
                href="/quote"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center space-x-2 w-full py-3.5 gold-gradient text-primary-deep rounded-xl text-sm font-extrabold shadow-md"
              >
                <FileText className="h-5 w-5" />
                <span>Request a Quote</span>
              </Link>
              
              <Link
                href="/portal-preview"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center space-x-2 w-full py-3.5 bg-white/10 hover:bg-white/15 text-white rounded-xl text-sm font-bold border border-white/10"
              >
                <User className="h-5 w-5 text-accent-gold" />
                <span>Customer Dashboard</span>
              </Link>
            </div>

            {/* Mobile Footer Contacts */}
            <div className="pt-8 text-center text-xs text-white/50 space-y-1">
              <p>Dispatch Support: {settings.company.phone1}</p>
              <p>Email: {settings.company.email}</p>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}
