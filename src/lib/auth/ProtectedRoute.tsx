"use client";

// ─────────────────────────────────────────────────
// DFS Group — Protected Route Wrapper
// Redirects unauthenticated users to sign-in.
// Checks role-based access for portal vs admin.
// ─────────────────────────────────────────────────

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";
import { canAccessPortal, canAccessAdmin } from "./roles";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({
  children,
  requireAdmin = false,
}: ProtectedRouteProps) {
  const { user, authState, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authState === "idle" || authState === "loading") return;

    if (!isAuthenticated || !user) {
      router.replace(requireAdmin ? "/admin/login" : "/portal/sign-in");
      return;
    }

    if (requireAdmin && !canAccessAdmin(user.role)) {
      router.replace("/admin/login");
      return;
    }

    if (!requireAdmin && !canAccessPortal(user.role)) {
      router.replace("/portal/sign-in");
      return;
    }
  }, [authState, isAuthenticated, user, requireAdmin, router]);

  // Loading state
  if (authState === "idle" || authState === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-grey">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary-royal" />
          <span className="text-sm text-grey font-semibold">
            Verifying session...
          </span>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated || !user) {
    return null;
  }

  // Role check failed
  if (requireAdmin && !canAccessAdmin(user.role)) {
    return null;
  }

  return <>{children}</>;
}
