"use client";

import React from 'react';
import { PortalPageHeader } from '@/components/portals/PortalPageHeader';
import { Phone, Mail, MessageSquare, Clock } from 'lucide-react';

export default function TruckingSupportPortal() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <PortalPageHeader 
        title="Customer Support" 
        description="Get in touch with your dedicated DFS Operations Manager."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
        {/* Contact Info */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Dedicated Account Manager</h3>
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-primary-royal shrink-0">
                  <span className="font-bold">MK</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Michael Kruger</p>
                  <p className="text-xs text-gray-500">SADC Operations Lead</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Phone className="w-4 h-4 text-primary-royal" />
                <span>+27 11 555 0192</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Mail className="w-4 h-4 text-primary-royal" />
                <span>michael.kruger@dfs.group</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Clock className="w-4 h-4 text-primary-royal" />
                <span>Mon-Fri, 08:00 - 17:00 SAST</span>
              </div>
            </div>
          </div>

          <div className="bg-primary-deep text-white rounded-2xl p-6 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
               <Phone className="w-24 h-24" />
             </div>
             <h3 className="text-lg font-bold mb-2">24/7 Control Room</h3>
             <p className="text-sm text-white/70 mb-4">For after-hours critical routing emergencies only.</p>
             <p className="text-xl font-extrabold text-accent-gold">+27 86 100 2424</p>
          </div>
        </div>

        {/* Message Form */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="w-5 h-5 text-primary-royal" />
              <h3 className="text-lg font-bold text-gray-900">Send a Message</h3>
            </div>
            
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Subject</label>
                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-royal focus:outline-none bg-white">
                  <option>General Enquiry</option>
                  <option>Shipment Delay</option>
                  <option>Document Request (POD)</option>
                  <option>Invoice Query</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Message</label>
                <textarea 
                  rows={5} 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-royal focus:outline-none resize-none" 
                  placeholder="How can we help you today?"
                ></textarea>
              </div>
              <div className="pt-2">
                <button className="bg-primary-royal text-white px-6 py-3 rounded-xl font-bold text-sm shadow-sm hover:bg-primary-deep transition-all">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
