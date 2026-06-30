"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Lock, Eye, EyeOff, Loader2, AlertCircle, ShieldCheck, Truck, Database, Activity } from "lucide-react";
import { useAuth, type LoginResult } from "@/lib/auth/AuthContext";
import { canAccessAdmin } from "@/lib/auth/roles";

export default function AdminSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login, logout } = useAuth();
  const router = useRouter();

  const errorMessages: Record<string, string> = {
    invalid_credentials: "Invalid email or password. Please check your credentials and try again.",
    account_locked: "This administrator account has been deactivated. Please contact IT support.",
    network_error: "Unable to connect. Please check your network status.",
    maintenance: "The system is currently undergoing scheduled maintenance.",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const result: LoginResult = await login(email, password);

    if (result.success) {
      // Only allow admin roles on admin portal
      if (!canAccessAdmin(result.user.role)) {
        logout();
        setError("Customer accounts are not permitted on the Admin Control Tower. Please use the Customer Portal.");
        setIsLoading(false);
      } else {
        router.push("/admin/trucking");
      }
    } else {
      setError(errorMessages[result.error] || "An unexpected error occurred.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-950 text-white">
      {/* Left Side — Control Tower Visual (desktop only) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900 border-r border-gray-800">
        <Image
          src="/images/dfs-fleet-side-tipper-lineup.jpg"
          alt="DFS Group heavy duty dispatches lineup."
          fill
          sizes="50vw"
          className="object-cover opacity-10"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950/90 via-gray-900/40 to-gray-950/95"></div>

        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16 space-y-8">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-yellow-500 text-gray-950 font-extrabold text-2xl shadow-lg shadow-yellow-500/10">
              D
            </div>
            <div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                DFS <span className="text-yellow-500 font-bold">OS</span>
              </span>
              <span className="block text-[10px] uppercase tracking-widest text-gray-500 -mt-1 font-bold">
                Control Tower Portal
              </span>
            </div>
          </Link>

          <div className="space-y-4 max-w-sm">
            <h2 className="text-3xl font-extrabold tracking-tight leading-tight">
              Operations, dispatches, and <span className="text-yellow-500">corridor tracking</span>.
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Login to access SADC corridor dispatches, customs clearing systems, express tracking hubs, and telemetry reports.
            </p>
          </div>

          {/* Core admin features list */}
          <div className="space-y-4 pt-4 border-t border-gray-800 max-w-sm">
            <div className="flex items-center space-x-3 text-gray-300">
              <Truck className="h-5 w-5 text-yellow-500" />
              <span className="text-xs">Fleet & Dispatch Control</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300">
              <Database className="h-5 w-5 text-yellow-500" />
              <span className="text-xs">Customs Clearing Records</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300">
              <Activity className="h-5 w-5 text-yellow-500" />
              <span className="text-xs">Real-time Telemetry Monitoring</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side — Sign In Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              DFS Control Tower Login
            </h1>
            <p className="text-sm text-gray-400">
              Authorized admin and operations dispatches personnel access only.
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="flex items-start space-x-3 bg-red-950/50 border border-red-900/50 text-red-400 p-4 rounded-xl text-sm">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-xs font-bold text-gray-400 uppercase tracking-wider"
              >
                Staff Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="staff@dfs.group"
                required
                autoComplete="email"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="block text-xs font-bold text-gray-400 uppercase tracking-wider"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  autoComplete="current-password"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
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

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-2 py-3.5 bg-yellow-500 hover:bg-yellow-600 text-gray-950 font-extrabold rounded-xl text-sm transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin text-gray-950" />
                  <span>Verifying credentials...</span>
                </>
              ) : (
                <>
                  <Lock className="h-4.5 w-4.5 text-gray-950" />
                  <span>Control Tower Login</span>
                </>
              )}
            </button>
          </form>

          {/* Demo Admin/Ops Credentials (Phase One Only) */}
          <div className="bg-amber-950/20 border border-amber-900/35 rounded-xl p-4 text-xs text-amber-400 space-y-2">
            <span className="font-bold uppercase block text-[10px] tracking-wider">
              Control Tower Demo Credentials
            </span>
            <div className="space-y-1.5 font-mono text-[11px] divide-y divide-amber-900/20">
              <div className="pb-1.5">
                <p><strong>Admin Role:</strong></p>
                <p>User: admin@demo.dfs.group</p>
                <p>Pass: Admin2026!</p>
              </div>
              <div className="pt-1.5">
                <p><strong>Operations Role:</strong></p>
                <p>User: ops@demo.dfs.group</p>
                <p>Pass: Ops2026!</p>
              </div>
            </div>
            <div className="pt-2 border-t border-amber-900/20 text-[10px]">
              Customer dispatches? <Link href="/portal/sign-in" className="font-bold underline hover:text-amber-300">Go to Customer Portal Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
