export type RoleName = 'super_admin' | 'admin' | 'company_admin' | 'staff' | 'driver' | 'customer';
export type Domain = 'trucking' | 'clearing' | 'express' | 'tracking' | 'analytics' | 'all';

export interface UserRole {
  role: RoleName;
  domain?: Domain;
}

export function canAccessDashboard(userRoles: UserRole[], targetDashboard: Domain): boolean {
  for (const ur of userRoles) {
    if (ur.role === 'super_admin') return true;
    if (ur.role === 'admin' && (ur.domain === targetDashboard || ur.domain === 'all')) return true;
  }
  return false;
}
