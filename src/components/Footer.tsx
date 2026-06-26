import Link from "next/link";
import { Phone, Mail, MapPin, Shield, Heart } from "lucide-react";
import settings from "@/data/settings.json";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-white/90 border-t-4 border-accent-gold mt-auto">
      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Company Mission */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-white text-primary-deep font-extrabold text-xl shadow-md border border-accent-gold">
                D
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white">DFS <span className="text-accent-gold">Group</span></span>
                <span className="block text-[9px] uppercase tracking-widest text-white/50 -mt-1 font-semibold">Digital Logistics</span>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Transforming transportation and logistics across Southern Africa by delivering seamless, environmentally responsible, and technologically advanced solutions.
            </p>
            <div className="flex items-center space-x-2 text-xs text-white/60">
              <Shield className="h-4 w-4 text-accent-gold flex-shrink-0" />
              <span>Botswana Data Protection aware operations.</span>
            </div>
          </div>

          {/* Quick Corporate Links */}
          <div className="space-y-4">
            <h3 className="text-md font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-accent-gold transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-accent-gold transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-accent-gold transition-colors">Our Services</Link></li>
              <li><Link href="/fleet" className="hover:text-accent-gold transition-colors">Fleet Showcase</Link></li>
              <li><Link href="/network" className="hover:text-accent-gold transition-colors">Regional Network</Link></li>
              <li><Link href="/sustainability-safety" className="hover:text-accent-gold transition-colors">Sustainability & Safety</Link></li>
            </ul>
          </div>

          {/* Digital OS Prototypes */}
          <div className="space-y-4">
            <h3 className="text-md font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">DFS-OS Prototypes</h3>
            <p className="text-xs text-white/50 leading-relaxed">
              Explore the interfaces that will power our future digital operating system.
            </p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/track" className="hover:text-accent-gold transition-colors">Shipment Tracker Demo</Link></li>
              <li><Link href="/quote" className="hover:text-accent-gold transition-colors">Multi-step Quote Request</Link></li>
              <li><Link href="/portal-preview" className="hover:text-accent-gold transition-colors font-medium text-accent-gold/80 hover:text-accent-gold">Customer Portal Preview</Link></li>
              <li><Link href="/admin-preview" className="hover:text-accent-gold transition-colors font-medium text-accent-gold/80 hover:text-accent-gold">Admin Dashboard Preview</Link></li>
              <li><Link href="/technology" className="hover:text-accent-gold transition-colors">Our Technology Vision</Link></li>
            </ul>
          </div>

          {/* Contact & Headquarters info */}
          <div className="space-y-4">
            <h3 className="text-md font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">Head Office</h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start space-x-2.5">
                <MapPin className="h-5 w-5 text-accent-gold flex-shrink-0 mt-0.5" />
                <span className="text-white/80 leading-snug">
                  {settings.company.headquarters.address},<br />
                  {settings.company.headquarters.city}, {settings.company.headquarters.country}
                </span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="h-4 w-4 text-accent-gold flex-shrink-0" />
                <a href={`tel:${settings.company.phone1.replace(/\s+/g, "")}`} className="hover:text-accent-gold transition-colors">
                  {settings.company.phone1}
                </a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="h-4 w-4 text-accent-gold flex-shrink-0" />
                <a href={`tel:${settings.company.phone2.replace(/\s+/g, "")}`} className="hover:text-accent-gold transition-colors">
                  {settings.company.phone2}
                </a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="h-4 w-4 text-accent-gold flex-shrink-0" />
                <a href={`mailto:${settings.company.email}`} className="hover:text-accent-gold transition-colors">
                  {settings.company.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="bg-charcoal/95 border-t border-white/10 text-white/50 text-xs py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left space-y-1.5">
            <p>&copy; {currentYear} {settings.company.name}. All rights reserved.</p>
            <p className="max-w-xl text-[10px] text-white/40 leading-normal">
              Disclaimer: All transport activities are governed by DFS Standard Trading Conditions. Customs clearance information provided on this platform is for guidance and does not replace formal regulatory declarations.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <span className="hover:text-accent-gold cursor-pointer transition-colors">Terms of Use</span>
            <span className="hover:text-accent-gold cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-accent-gold cursor-pointer transition-colors">Cookie Notice</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
