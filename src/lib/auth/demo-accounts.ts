// ─────────────────────────────────────────────────
// DFS Group — Phase One Prototype Demo Accounts
// ─────────────────────────────────────────────────
// WARNING: These are demonstration credentials only.
// Replace with production auth (NextAuth.js / Supabase)
// in Phase Two. Never deploy to production with these.
// ─────────────────────────────────────────────────

import type { PortalUser, UserRole } from "@/types/models";

export interface DemoAccount {
  email: string;
  password: string;
  user: PortalUser;
}

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    email: "customer@demo.dfs.group",
    password: "Demo2026!",
    user: {
      id: "usr-cust-001",
      customerId: "cust-001",
      name: "Kago Mosimanyana",
      email: "customer@demo.dfs.group",
      role: "customer_user" as UserRole,
      status: "active",
      lastLogin: new Date().toISOString(),
      companyName: "Mmamashia Mining (Pty) Ltd",
      notificationPreferences: {
        shipmentUpdates: true,
        documentAlerts: true,
        quoteNotifications: true,
        borderStatuses: true,
        systemMessages: true,
      },
    },
  },
  {
    email: "admin@demo.dfs.group",
    password: "Admin2026!",
    user: {
      id: "usr-admin-001",
      customerId: "dfs-internal",
      name: "Tshepiso Kgomotso",
      email: "admin@demo.dfs.group",
      role: "dfs_admin" as UserRole,
      status: "active",
      lastLogin: new Date().toISOString(),
      companyName: "DFS Group",
      notificationPreferences: {
        shipmentUpdates: true,
        documentAlerts: true,
        quoteNotifications: true,
        borderStatuses: true,
        systemMessages: true,
      },
    },
  },
  {
    email: "ops@demo.dfs.group",
    password: "Ops2026!",
    user: {
      id: "usr-ops-001",
      customerId: "dfs-internal",
      name: "Lesego Pule",
      email: "ops@demo.dfs.group",
      role: "dfs_ops" as UserRole,
      status: "active",
      lastLogin: new Date().toISOString(),
      companyName: "DFS Group",
      notificationPreferences: {
        shipmentUpdates: true,
        documentAlerts: true,
        quoteNotifications: true,
        borderStatuses: true,
        systemMessages: true,
      },
    },
  },
];

export function authenticateDemo(
  email: string,
  password: string
): DemoAccount | null {
  const normalizedEmail = email.trim().toLowerCase();
  return (
    DEMO_ACCOUNTS.find(
      (a) => a.email === normalizedEmail && a.password === password
    ) ?? null
  );
}
