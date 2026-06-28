// ─────────────────────────────────────────────────
// DFS Group — Role Definitions & Permissions
// ─────────────────────────────────────────────────

import type { UserRole } from "@/types/models";

export const ROLE_LABELS: Record<UserRole, string> = {
  customer_user: "Customer User",
  customer_admin: "Customer Administrator",
  dfs_ops: "DFS Operations",
  dfs_admin: "DFS Administrator",
  dfs_executive: "DFS Executive",
};

export type Permission =
  | "view_own_shipments"
  | "view_all_shipments"
  | "manage_shipments"
  | "view_own_documents"
  | "view_all_documents"
  | "upload_documents"
  | "manage_documents"
  | "request_quotes"
  | "view_own_quotes"
  | "view_all_quotes"
  | "manage_quotes"
  | "send_messages"
  | "view_own_messages"
  | "view_all_messages"
  | "manage_own_profile"
  | "manage_company_users"
  | "manage_all_users"
  | "approve_access"
  | "view_admin_dashboard"
  | "manage_system_settings"
  | "view_audit_logs"
  | "view_reports";

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  customer_user: [
    "view_own_shipments",
    "view_own_documents",
    "upload_documents",
    "request_quotes",
    "view_own_quotes",
    "send_messages",
    "view_own_messages",
    "manage_own_profile",
  ],
  customer_admin: [
    "view_own_shipments",
    "view_own_documents",
    "upload_documents",
    "request_quotes",
    "view_own_quotes",
    "send_messages",
    "view_own_messages",
    "manage_own_profile",
    "manage_company_users",
  ],
  dfs_ops: [
    "view_all_shipments",
    "manage_shipments",
    "view_all_documents",
    "upload_documents",
    "manage_documents",
    "view_all_quotes",
    "manage_quotes",
    "send_messages",
    "view_all_messages",
    "manage_own_profile",
  ],
  dfs_admin: [
    "view_all_shipments",
    "manage_shipments",
    "view_all_documents",
    "upload_documents",
    "manage_documents",
    "view_all_quotes",
    "manage_quotes",
    "send_messages",
    "view_all_messages",
    "manage_own_profile",
    "manage_all_users",
    "approve_access",
    "view_admin_dashboard",
    "manage_system_settings",
    "view_audit_logs",
    "view_reports",
  ],
  dfs_executive: [
    "view_all_shipments",
    "view_all_documents",
    "view_all_quotes",
    "view_all_messages",
    "view_admin_dashboard",
    "view_reports",
    "manage_own_profile",
  ],
};

export function hasPermission(role: UserRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export function isCustomerRole(role: UserRole): boolean {
  return role === "customer_user" || role === "customer_admin";
}

export function isDFSStaffRole(role: UserRole): boolean {
  return role === "dfs_ops" || role === "dfs_admin" || role === "dfs_executive";
}

export function canAccessPortal(role: UserRole): boolean {
  return isCustomerRole(role);
}

export function canAccessAdmin(role: UserRole): boolean {
  return isDFSStaffRole(role);
}
