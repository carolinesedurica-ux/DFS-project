"use client";

// ─────────────────────────────────────────────────
// DFS Group — Authentication Context Provider
// Phase One: sessionStorage-based prototype auth.
// Phase Two: Replace with NextAuth.js or Supabase Auth.
// ─────────────────────────────────────────────────

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { PortalUser } from "@/types/models";
import { authenticateDemo } from "./demo-accounts";

const SESSION_KEY = "dfs_auth_session";
const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes

export type AuthState =
  | "idle"
  | "loading"
  | "authenticated"
  | "unauthenticated"
  | "error"
  | "locked"
  | "maintenance";

interface AuthSession {
  user: PortalUser;
  loginTime: number;
  expiresAt: number;
}

interface AuthContextType {
  user: PortalUser | null;
  authState: AuthState;
  login: (email: string, password: string) => Promise<LoginResult>;
  logout: () => void;
  isAuthenticated: boolean;
}

export type LoginResult =
  | { success: true; user: PortalUser }
  | {
      success: false;
      error:
        | "invalid_credentials"
        | "account_locked"
        | "account_not_approved"
        | "network_error"
        | "maintenance";
    };

const AuthContext = createContext<AuthContextType>({
  user: null,
  authState: "idle",
  login: async () => ({
    success: false as const,
    error: "network_error" as const,
  }),
  logout: () => {},
  isAuthenticated: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<PortalUser | null>(null);
  const [authState, setAuthState] = useState<AuthState>("idle");

  // Restore session on mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(SESSION_KEY);
      if (stored) {
        const session: AuthSession = JSON.parse(stored);
        if (Date.now() < session.expiresAt) {
          setUser(session.user);
          setAuthState("authenticated");
        } else {
          sessionStorage.removeItem(SESSION_KEY);
          setAuthState("unauthenticated");
        }
      } else {
        setAuthState("unauthenticated");
      }
    } catch {
      setAuthState("unauthenticated");
    }
  }, []);

  // Session timeout checker
  useEffect(() => {
    if (authState !== "authenticated") return;

    const interval = setInterval(() => {
      const stored = sessionStorage.getItem(SESSION_KEY);
      if (stored) {
        const session: AuthSession = JSON.parse(stored);
        if (Date.now() >= session.expiresAt) {
          setUser(null);
          setAuthState("unauthenticated");
          sessionStorage.removeItem(SESSION_KEY);
        }
      }
    }, 60_000); // Check every minute

    return () => clearInterval(interval);
  }, [authState]);

  const login = useCallback(
    async (email: string, password: string): Promise<LoginResult> => {
      setAuthState("loading");

      // Simulate network delay for realism
      await new Promise((r) => setTimeout(r, 800));

      const account = authenticateDemo(email, password);

      if (!account) {
        setAuthState("unauthenticated");
        return { success: false, error: "invalid_credentials" };
      }

      if (account.user.status === "suspended") {
        setAuthState("unauthenticated");
        return { success: false, error: "account_locked" };
      }

      if (account.user.status === "pending") {
        setAuthState("unauthenticated");
        return { success: false, error: "account_not_approved" };
      }

      const session: AuthSession = {
        user: account.user,
        loginTime: Date.now(),
        expiresAt: Date.now() + SESSION_TIMEOUT_MS,
      };

      sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
      setUser(account.user);
      setAuthState("authenticated");

      return { success: true, user: account.user };
    },
    []
  );

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setUser(null);
    setAuthState("unauthenticated");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        authState,
        login,
        logout,
        isAuthenticated: authState === "authenticated" && user !== null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
