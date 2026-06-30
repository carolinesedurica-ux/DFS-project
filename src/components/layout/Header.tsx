"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, FileText, Lock } from "lucide-react";
import settings from "@/data/settings.json";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Fleet", href: "/fleet" },
    { name: "Network", href: "/network" },
    { name: "Sustainability", href: "/sustainability-safety" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const isHomepage = pathname === "/";
  const isPortal = pathname.startsWith("/portal") || pathname.startsWith("/admin");
  if (isPortal) return null;

  const isDivisionPage =
    pathname.startsWith("/trucking") ||
    pathname.startsWith("/clearing") ||
    pathname.startsWith("/express");

  return (
    <header
      className={`w-full sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-[0_4px_30px_rgba(23,6,34,0.08)] border-b border-gray-100"
          : isHomepage || isDivisionPage
          ? "bg-transparent"
          : "bg-white border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-1 flex-shrink-0">
            <div className="relative h-14 w-36 sm:h-16 sm:w-44">
              <Image
                src="/images/logos/dfsgrouplogo.jpeg"
                alt="DFS Group Logo"
                fill
                sizes="(max-width: 640px) 144px, 176px"
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Nav */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 text-sm font-semibold tracking-wide transition-all relative group ${
                  isActive(item.href)
                    ? scrolled || (!isHomepage && !isDivisionPage)
                      ? "text-primary-royal"
                      : "text-accent-gold"
                    : scrolled || (!isHomepage && !isDivisionPage)
                    ? "text-slate hover:text-primary-royal"
                    : "text-white/80 hover:text-white"
                }`}
              >
                <span>{item.name}</span>
                {isActive(item.href) && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-accent-gold rounded" />
                )}
                {!isActive(item.href) && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-accent-gold/40 rounded scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                )}
              </Link>
            ))}
          </nav>

          {/* CTAs */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              href="/quote"
              className="flex items-center space-x-1.5 px-5 py-2.5 gold-gradient hover:opacity-95 text-primary-deep rounded-xl text-xs font-extrabold shadow-sm transition-all transform hover:-translate-y-0.5"
            >
              <FileText className="h-4 w-4" />
              <span>Request a Quote</span>
            </Link>
            <Link
              href="/portal/sign-in"
              className="flex items-center space-x-1.5 px-4 py-2.5 bg-primary-royal hover:bg-primary-deep text-white rounded-xl text-xs font-bold shadow-sm transition-all border border-accent-gold/30"
            >
              <Lock className="h-3.5 w-3.5 text-accent-gold" />
              <span>Customer Portal</span>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`inline-flex lg:hidden items-center justify-center p-2 rounded-xl ${
              scrolled || (!isHomepage && !isDivisionPage)
                ? "text-slate"
                : "text-white"
            }`}
          >
            <span className="sr-only">Open menu</span>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-primary-deep/96 z-50 backdrop-blur-md overflow-y-auto">
          <div className="px-4 pt-4 pb-12 space-y-2 max-w-md mx-auto">
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
            <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
              <Link href="/quote" onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center space-x-2 w-full py-3.5 gold-gradient text-primary-deep rounded-xl text-sm font-extrabold shadow-md">
                <FileText className="h-5 w-5" />
                <span>Request a Quote</span>
              </Link>
              <Link href="/portal/sign-in" onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center space-x-2 w-full py-3.5 bg-primary-royal text-white rounded-xl text-sm font-bold border border-accent-gold/30">
                <Lock className="h-5 w-5 text-accent-gold" />
                <span>Customer Portal</span>
              </Link>
            </div>
            <div className="pt-8 text-center text-xs text-white/50 space-y-1">
              <p>{settings.company.phone1}</p>
              <p>{settings.company.email}</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
