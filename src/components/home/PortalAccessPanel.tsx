import Link from "next/link";
import { Lock, UserPlus, ShieldCheck, Monitor } from "lucide-react";

export default function PortalAccessPanel() {
  return (
    <div className="bg-white border border-border-dfs rounded-2xl shadow-[0_18px_50px_rgba(23,6,34,0.08)] p-6 sm:p-8 max-w-4xl mx-auto -mt-16 sm:-mt-24 relative z-20">
      <div className="space-y-5">
        {/* Panel Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <h3 className="text-lg font-extrabold text-primary-royal tracking-tight flex items-center space-x-2">
            <Monitor className="h-5 w-5 text-accent-gold" />
            <span>Manage Your Logistics Online</span>
          </h3>
        </div>

        <p className="text-sm text-grey leading-relaxed max-w-2xl">
          Existing DFS customers can sign in to access shipment visibility,
          logistics documents, quotes and account communication through our
          secure digital portal.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/portal/sign-in"
            className="flex items-center justify-center space-x-2 px-8 py-3.5 bg-primary-royal hover:bg-primary-deep text-white font-extrabold rounded-xl text-sm transition-all shadow-md border border-accent-gold/30 flex-grow sm:flex-grow-0"
          >
            <Lock className="h-4.5 w-4.5 text-accent-gold" />
            <span>Customer Sign In</span>
          </Link>

          <Link
            href="/portal/request-access"
            className="flex items-center justify-center space-x-2 px-8 py-3.5 border border-primary-royal/20 hover:border-primary-royal hover:bg-primary-light/30 text-primary-royal font-bold rounded-xl text-sm transition-all flex-grow sm:flex-grow-0"
          >
            <UserPlus className="h-4.5 w-4.5 text-accent-gold" />
            <span>Request Portal Access</span>
          </Link>
        </div>

        {/* Security statement */}
        <div className="flex items-center space-x-1.5 text-[11px] text-grey">
          <ShieldCheck className="h-3.5 w-3.5 text-accent-gold flex-shrink-0" />
          <span>
            Portal access is available to approved DFS customers. Data
            is encrypted and protected under POPIA compliance.
          </span>
        </div>
      </div>
    </div>
  );
}
