"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, CheckCircle2, Loader2 } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitted(true);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-grey p-6">
      <div className="max-w-md w-full space-y-8">
        <div className="flex items-center space-x-3">
          <Link href="/portal/sign-in" className="text-grey hover:text-primary-royal transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-extrabold text-primary-deep tracking-tight">Reset Password</h1>
        </div>

        {submitted ? (
          <div className="bg-white rounded-2xl border border-border-dfs shadow-sm p-8 text-center space-y-6">
            <div className="h-16 w-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-extrabold text-primary-deep">Reset Link Sent</h2>
              <p className="text-sm text-grey leading-relaxed">
                If an account exists for <strong className="text-charcoal">{email}</strong>, you will receive a password reset link shortly. Please check your inbox and spam folder.
              </p>
            </div>
            <Link href="/portal/sign-in" className="block w-full py-3 bg-primary-royal hover:bg-primary-deep text-white font-bold rounded-xl text-sm transition-all text-center">
              Return to Sign In
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-border-dfs shadow-sm p-6 sm:p-8 space-y-6">
            <p className="text-sm text-grey leading-relaxed">
              Enter the email address associated with your DFS portal account. We will send you instructions to reset your password.
            </p>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label htmlFor="reset-email" className="block text-xs font-bold text-charcoal uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  id="reset-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@company.com"
                  className="w-full px-4 py-3 bg-white border border-border-dfs rounded-xl text-sm text-charcoal placeholder-grey focus:outline-none focus:ring-2 focus:ring-primary-royal focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center space-x-2 py-3.5 bg-primary-royal hover:bg-primary-deep text-white font-extrabold rounded-xl text-sm transition-all shadow-md disabled:opacity-60"
              >
                {isSubmitting ? (
                  <><Loader2 className="h-5 w-5 animate-spin" /><span>Sending...</span></>
                ) : (
                  <><Mail className="h-4.5 w-4.5 text-accent-gold" /><span>Send Reset Link</span></>
                )}
              </button>
            </form>
            <div className="text-center">
              <Link href="/contact?subject=support" className="text-xs text-grey hover:text-primary-royal transition-colors font-medium">
                Need help? Contact DFS support
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
