"use client";

import Link from 'next/link';
import { Menu, User } from 'lucide-react';

export default function PortalHeader({ portalName }: { portalName: string }) {
  return (
    <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
      <div className="flex items-center md:hidden">
        <button className="p-2 -ml-2 text-gray-500 hover:text-gray-700">
          <Menu className="h-6 w-6" />
        </button>
        <span className="ml-2 text-lg font-bold text-primary-deep">{portalName}</span>
      </div>
      <div className="hidden md:flex flex-1 items-center justify-end">
        <Link 
          href="/"
          className="text-sm font-semibold text-gray-500 hover:text-primary-royal transition-colors mr-6"
        >
          ← Back to DFS
        </Link>
        <button className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
          <User className="h-4 w-4" />
        </button>
      </div>
      <div className="flex md:hidden items-center">
        <button className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
          <User className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
