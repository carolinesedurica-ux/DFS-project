"use client";

import { useState } from "react";
import Link from "next/link";
import { UserPlus, CheckCircle2, ArrowLeft, Loader2 } from "lucide-react";

export default function RequestAccess() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState("");
  const [form, setForm] = useState({
    fullName: "", companyName: "", position: "", email: "", phone: "",
    existingCustomer: "", accountReference: "", serviceUsed: "", reason: "", consent: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    const ref = `DFS-ACC-${Date.now().toString(36).toUpperCase()}`;
    setReference(ref);
    setSubmitted(true);
    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-grey p-6">
        <div className="max-w-md w-full bg-white rounded-2xl border border-border-dfs shadow-sm p-8 text-center space-y-6">
          <div className="h-16 w-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-extrabold text-primary-deep">Access Request Submitted</h2>
            <p className="text-sm text-grey leading-relaxed">
              Your portal-access request has been submitted. The DFS team will verify your customer account before access is activated.
            </p>
          </div>
          <div className="bg-light-grey rounded-xl p-4 text-xs">
            <span className="block text-grey font-bold uppercase tracking-wider text-[10px]">Request Reference</span>
            <span className="block text-lg font-mono font-bold text-primary-deep mt-1">{reference}</span>
          </div>
          <div className="flex flex-col gap-3">
            <Link href="/portal/sign-in" className="w-full py-3 bg-primary-royal hover:bg-primary-deep text-white font-bold rounded-xl text-sm transition-all text-center">
              Return to Sign In
            </Link>
            <Link href="/" className="text-xs text-grey hover:text-primary-royal transition-colors font-medium">
              Back to DFS Group Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const inputClass = "w-full px-4 py-3 bg-white border border-border-dfs rounded-xl text-sm text-charcoal placeholder-grey focus:outline-none focus:ring-2 focus:ring-primary-royal focus:border-transparent transition-all";
  const labelClass = "block text-xs font-bold text-charcoal uppercase tracking-wider mb-1.5";

  return (
    <div className="min-h-screen bg-light-grey py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex items-center space-x-3">
          <Link href="/portal/sign-in" className="text-grey hover:text-primary-royal transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-primary-deep tracking-tight">Request Portal Access</h1>
            <p className="text-sm text-grey mt-1">Complete the form below to request access to the DFS Customer Portal.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-border-dfs shadow-sm p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="fullName" className={labelClass}>Full Name *</label>
              <input id="fullName" name="fullName" value={form.fullName} onChange={handleChange} required placeholder="Your full name" className={inputClass} />
            </div>
            <div>
              <label htmlFor="companyName" className={labelClass}>Company Name *</label>
              <input id="companyName" name="companyName" value={form.companyName} onChange={handleChange} required placeholder="Company name" className={inputClass} />
            </div>
            <div>
              <label htmlFor="position" className={labelClass}>Position</label>
              <input id="position" name="position" value={form.position} onChange={handleChange} placeholder="Your role" className={inputClass} />
            </div>
            <div>
              <label htmlFor="email" className={labelClass}>Email Address *</label>
              <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@company.com" className={inputClass} />
            </div>
            <div>
              <label htmlFor="phone" className={labelClass}>Phone Number *</label>
              <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} required placeholder="+267 xx xxx xxx" className={inputClass} />
            </div>
            <div>
              <label htmlFor="existingCustomer" className={labelClass}>Existing DFS Customer? *</label>
              <select id="existingCustomer" name="existingCustomer" value={form.existingCustomer} onChange={handleChange} required className={inputClass}>
                <option value="">Select</option>
                <option value="yes">Yes, existing customer</option>
                <option value="no">No, new enquiry</option>
              </select>
            </div>
            <div>
              <label htmlFor="accountReference" className={labelClass}>Account / Reference Number</label>
              <input id="accountReference" name="accountReference" value={form.accountReference} onChange={handleChange} placeholder="e.g. DFS-CUST-001" className={inputClass} />
            </div>
            <div>
              <label htmlFor="serviceUsed" className={labelClass}>Service Used</label>
              <select id="serviceUsed" name="serviceUsed" value={form.serviceUsed} onChange={handleChange} className={inputClass}>
                <option value="">Select service</option>
                <option value="bulk">Bulk Cargo</option>
                <option value="bagged">Bagged Cargo</option>
                <option value="cross-border">Cross-Border Freight</option>
                <option value="customs">Customs Clearing</option>
                <option value="multiple">Multiple Services</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="reason" className={labelClass}>Reason for Access *</label>
            <textarea id="reason" name="reason" value={form.reason} onChange={handleChange} required rows={3} placeholder="Briefly describe why you need portal access" className={inputClass + " resize-none"} />
          </div>

          <label className="flex items-start space-x-3 cursor-pointer">
            <input type="checkbox" name="consent" checked={form.consent} onChange={handleChange} required className="mt-1 h-4 w-4 rounded border-border-dfs text-primary-royal focus:ring-primary-royal" />
            <span className="text-xs text-grey leading-relaxed">
              I consent to DFS Group processing my personal information for the purpose of verifying my customer account and activating portal access. Data will be handled in accordance with the DFS Privacy Policy.
            </span>
          </label>

          <button type="submit" disabled={isSubmitting || !form.consent} className="w-full flex items-center justify-center space-x-2 py-3.5 bg-primary-royal hover:bg-primary-deep text-white font-extrabold rounded-xl text-sm transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
            {isSubmitting ? (
              <><Loader2 className="h-5 w-5 animate-spin" /><span>Submitting...</span></>
            ) : (
              <><UserPlus className="h-4.5 w-4.5 text-accent-gold" /><span>Submit Access Request</span></>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
