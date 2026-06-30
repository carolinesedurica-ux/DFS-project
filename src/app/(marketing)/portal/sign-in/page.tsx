"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Lock, Eye, EyeOff, Loader2, AlertCircle, ShieldCheck, Truck, FileText, MessageSquare } from "lucide-react";
import { useAuth, type LoginResult } from "@/lib/auth/AuthContext";
import { canAccessAdmin } from "@/lib/auth/roles";

export default function PortalSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const errorMessages: Record<string, string> = {
    invalid_credentials: "Invalid email or password. Please check your credentials and try again.",
    account_locked: "This account has been locked. Please contact DFS support for assistance.",
    account_not_approved: "Your account is pending approval. The DFS team will contact you once access is activated.",
    network_error: "Unable to connect. Please check your internet connection and try again.",
    maintenance: "The portal is currently undergoing scheduled maintenance. Please try again later.",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const result: LoginResult = await login(email, password);

    if (result.success) {
      // Route based on role
      if (canAccessAdmin(result.user.role)) {
        router.push("/admin/dashboard");
      } else {
        router.push("/dashboard");
      }
    } else {
      setError(errorMessages[result.error] || "An unexpected error occurred.");
      setIsLoading(false);
    }
  };

  const benefits = [
    { icon: Truck, text: "Real-time shipment tracking across SADC corridors" },
    { icon: FileText, text: "Secure document management and downloads" },
    { icon: MessageSquare, text: "Direct communication with DFS operations" },
    { icon: ShieldCheck, text: "Enterprise-grade security and data protection" },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Side — Hero Visual (desktop only) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-primary-deep">
        <Image
          src="/images/dfs-cross-border-road-freight.jpg"
          alt="DFS Group logistics truck at a Southern African border corridor."
          fill
          sizes="50vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-deep/90 via-primary-deep/70 to-primary-black/90"></div>

        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16 space-y-8">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-white text-primary-royal font-extrabold text-2xl shadow-lg border border-accent-gold">
              D
            </div>
            <div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                DFS <span className="text-accent-gold">Group</span>
              </span>
              <span className="block text-[10px] uppercase tracking-widest text-white/50 -mt-1 font-bold">
                Customer Portal
              </span>
            </div>
          </Link>

          <div className="space-y-4 max-w-md">
            <h2 className="text-3xl xl:text-4xl font-extrabold text-white tracking-tight leading-tight font-display">
              Your Logistics,{" "}
              <span className="text-accent-gold">One Dashboard</span>
            </h2>
            <p className="text-sm text-white/70 leading-relaxed">
              Access your shipments, documents, quotations and communications
              from one secure digital environment. Built for Southern African
              logistics.
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-4 pt-4">
            {benefits.map((b, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-lg bg-accent-gold/10 text-accent-gold flex items-center justify-center flex-shrink-0 border border-accent-gold/20">
                  <b.icon className="h-4 w-4" />
                </div>
                <span className="text-sm text-white/80">{b.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side — Sign In Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-light-grey p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center space-x-3 mb-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-primary-royal text-accent-bright font-extrabold text-lg shadow-md border border-accent-gold/30">
                D
              </div>
              <span className="text-lg font-extrabold tracking-tight text-primary-royal">
                DFS <span className="text-accent-gold">Group</span>
              </span>
            </Link>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-primary-deep tracking-tight">
              Welcome to the DFS Customer Portal
            </h1>
            <p className="text-sm text-grey">
              Sign in to view your shipments, documents, quotations and
              logistics updates.
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="flex items-start space-x-3 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm animate-fade-in-up">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-xs font-bold text-charcoal uppercase tracking-wider"
              >
                Email or Customer ID
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                autoComplete="email"
                className="w-full px-4 py-3 bg-white border border-border-dfs rounded-xl text-sm text-charcoal placeholder-grey focus:outline-none focus:ring-2 focus:ring-primary-royal focus:border-transparent transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="block text-xs font-bold text-charcoal uppercase tracking-wider"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  className="w-full px-4 py-3 bg-white border border-border-dfs rounded-xl text-sm text-charcoal placeholder-grey focus:outline-none focus:ring-2 focus:ring-primary-royal focus:border-transparent transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-grey hover:text-charcoal transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-border-dfs text-primary-royal focus:ring-primary-royal"
                />
                <span className="text-xs text-grey font-medium">
                  Remember me
                </span>
              </label>
              <Link
                href="/portal/forgot-password"
                className="text-xs font-bold text-primary-royal hover:text-accent-gold transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-2 py-3.5 bg-primary-royal hover:bg-primary-deep text-white font-extrabold rounded-xl text-sm transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed border border-accent-gold/30"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <Lock className="h-4.5 w-4.5 text-accent-gold" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials Hint (Phase One Only) */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-800 space-y-2">
            <span className="font-bold uppercase block text-[10px] tracking-wider">
              Phase One Demo Accounts
            </span>
            <div className="space-y-1 font-mono text-[11px]">
              <p>
                <strong>Customer:</strong> customer@demo.dfs.group / Demo2026!
              </p>
              <p>
                <strong>Admin:</strong> admin@demo.dfs.group / Admin2026!
              </p>
              <p>
                <strong>Operations:</strong> ops@demo.dfs.group / Ops2026!
              </p>
            </div>
          </div>

          {/* Secondary Links */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-2 text-xs text-grey">
            <Link
              href="/portal/request-access"
              className="font-bold text-primary-royal hover:text-accent-gold transition-colors"
            >
              Request Portal Access
            </Link>
            <Link
              href="/contact?subject=support"
              className="hover:text-charcoal transition-colors"
            >
              Contact Support
            </Link>
          </div>

          <p className="text-[10px] text-grey/60 text-center pt-4">
            Portal access is available to approved DFS customers only. By
            signing in, you agree to the DFS Group Terms of Use and Privacy
            Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
