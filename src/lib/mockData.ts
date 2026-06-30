// This file provides temporary mock data to populate the Admin Dashboards
// until Supabase real data is fully integrated.

export const mockTruckingShipments = [
  { id: 'TRK-1001', company: 'Acme Corp', origin: 'Johannesburg', destination: 'Harare', status: 'In Transit', driver: 'Sipho Ndlovu', date: '2026-06-28' },
  { id: 'TRK-1002', company: 'Global Traders', origin: 'Durban', destination: 'Lusaka', status: 'Delivered', driver: 'John Doe', date: '2026-06-25' },
  { id: 'TRK-1003', company: 'Mining Supplies', origin: 'Cape Town', destination: 'Gaborone', status: 'Delayed', driver: 'Tshepo M.', date: '2026-06-30' },
  { id: 'TRK-1004', company: 'Acme Corp', origin: 'Pretoria', destination: 'Maputo', status: 'Pending', driver: 'Unassigned', date: '2026-07-01' },
];

export const mockClearingCases = [
  { id: 'CUS-5091', company: 'Tech Imports Ltd', port: 'Beitbridge', type: 'Import', status: 'Cleared', duty: '$4,200', date: '2026-06-29' },
  { id: 'CUS-5092', company: 'Agri Export Co', port: 'Chirundu', type: 'Export', status: 'Processing', duty: 'N/A', date: '2026-06-30' },
  { id: 'CUS-5093', company: 'Global Traders', port: 'Forbes', type: 'Import', status: 'Issue', duty: 'Pending', date: '2026-06-28' },
  { id: 'CUS-5094', company: 'Auto Spares', port: 'Beitbridge', type: 'Import', status: 'Open', duty: 'Calculating', date: '2026-06-30' },
];

export const mockExpressParcels = [
  { id: 'EXP-9921', company: 'E-commerce Inc', destination: 'Sandton', status: 'Delivered', courier: 'Mike D.', date: '2026-06-29' },
  { id: 'EXP-9922', company: 'Retail Hub', destination: 'Pretoria CBD', status: 'In Transit', courier: 'Sarah W.', date: '2026-06-30' },
  { id: 'EXP-9923', company: 'E-commerce Inc', destination: 'Centurion', status: 'Pending', courier: 'Unassigned', date: '2026-06-30' },
  { id: 'EXP-9924', company: 'Private Client', destination: 'Midrand', status: 'Failed', courier: 'Mike D.', date: '2026-06-28' },
];

export const mockUsers = [
  { id: 'usr-001', name: 'Admin Manager', email: 'admin@dfs.group', role: 'super_admin', domain: 'all', status: 'Active' },
  { id: 'usr-002', name: 'Trucking Ops', email: 'trucking@dfs.group', role: 'admin', domain: 'trucking', status: 'Active' },
  { id: 'usr-003', name: 'Jane Smith', email: 'jane@acmecorp.com', role: 'company_admin', domain: 'all', status: 'Active' },
  { id: 'usr-004', name: 'John Doe', email: 'driver1@dfs.group', role: 'driver', domain: 'trucking', status: 'Inactive' },
];

export const mockCompanies = [
  { id: 'comp-001', name: 'Acme Corp', type: 'Enterprise', activeShipments: 4, status: 'Active', joined: '2025-01-15' },
  { id: 'comp-002', name: 'Global Traders', type: 'Retail', activeShipments: 12, status: 'Active', joined: '2025-03-22' },
  { id: 'comp-003', name: 'Tech Imports Ltd', type: 'B2B', activeShipments: 1, status: 'Blocked', joined: '2026-02-10' },
];

export const mockTrackingEvents = [
  { id: 'ev-1', entity: 'TRK-1003', service: 'Trucking', location: 'Border Post', status: 'Delayed', time: '10 mins ago' },
  { id: 'ev-2', entity: 'EXP-9922', service: 'Express', location: 'Distribution Center', status: 'In Transit', time: '1 hour ago' },
  { id: 'ev-3', entity: 'CUS-5091', service: 'Clearing', location: 'Beitbridge', status: 'Cleared', time: '3 hours ago' },
  { id: 'ev-4', entity: 'TRK-1001', service: 'Trucking', location: 'N1 Highway', status: 'In Transit', time: '5 hours ago' },
  { id: 'ev-5', entity: 'EXP-9921', service: 'Express', location: 'Customer Address', status: 'Delivered', time: '1 day ago' },
];

// Customer Portal Specific Mock Data
export const customerMockData = {
  truckingShipments: [
    { id: 'TRK-1001', origin: 'Johannesburg', destination: 'Harare', status: 'In Transit', date: '2026-06-28', eta: '2026-06-30', documents: 'Available' },
    { id: 'TRK-1004', origin: 'Pretoria', destination: 'Maputo', status: 'Pending', date: '2026-07-01', eta: '2026-07-03', documents: 'Pending' },
  ],
  clearingCases: [
    { id: 'CUS-5091', port: 'Beitbridge', type: 'Import', status: 'Cleared', duty: '$4,200', date: '2026-06-29', documentStatus: 'Complete' },
  ],
  expressParcels: [
    { id: 'EXP-9921', destination: 'Sandton', status: 'Delivered', courier: 'Mike D.', date: '2026-06-29', signature: 'Signed by J. Doe' },
    { id: 'EXP-9923', destination: 'Centurion', status: 'Pending', courier: 'Unassigned', date: '2026-06-30', signature: 'Pending' },
  ]
};
