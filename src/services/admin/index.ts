import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';
import { DEMO_ACCOUNTS } from '@/lib/auth/demo-accounts';

// Define structure for access requests in local sandbox
export interface MockAccessRequest {
  id: string;
  fullName: string;
  companyName: string;
  position: string;
  email: string;
  phone: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

const DEFAULT_ACCESS_REQUESTS: MockAccessRequest[] = [
  {
    id: 'req-001',
    fullName: 'Neo Mokgweetsi',
    companyName: 'Kalahari Logistics Ltd',
    position: 'Supply Chain Manager',
    email: 'neo@kalaharilog.co.bw',
    phone: '+267 71 234 567',
    status: 'pending',
    submittedAt: '2026-06-29T10:30:00Z',
  },
  {
    id: 'req-002',
    fullName: 'Thabo Lesedi',
    companyName: 'Botswana Salt Distributors',
    position: 'Operations Director',
    email: 'thabo@botsalt.co.bw',
    phone: '+267 72 890 123',
    status: 'pending',
    submittedAt: '2026-06-30T08:15:00Z',
  },
  {
    id: 'req-003',
    fullName: 'Sarah Jenkins',
    companyName: 'Zambia Copper Corp',
    position: 'Logistics Coordinator',
    email: 's.jenkins@zamcopper.com',
    phone: '+260 97 111 2222',
    status: 'approved',
    submittedAt: '2026-06-25T14:20:00Z',
  }
];

export const AdminService = {
  async getAllUsers() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('profiles').select('*');
        if (!error && data) return { data, error: null };
      } catch (err) {
        console.error('Supabase error, falling back to mock:', err);
      }
    }
    
    // Fallback to mock users
    const mockUsers = DEMO_ACCOUNTS.map(acc => ({
      id: acc.user.id,
      full_name: acc.user.name,
      email: acc.user.email,
      company_name: acc.user.companyName,
      role: acc.user.role,
      status: acc.user.status,
      created_at: new Date().toISOString()
    }));
    return { data: mockUsers, error: null };
  },

  async getAccessRequests(): Promise<{ data: MockAccessRequest[]; error: null }> {
    if (typeof window === 'undefined') {
      return { data: DEFAULT_ACCESS_REQUESTS, error: null };
    }
    
    let requests = localStorage.getItem('dfs_access_requests');
    if (!requests) {
      localStorage.setItem('dfs_access_requests', JSON.stringify(DEFAULT_ACCESS_REQUESTS));
      return { data: DEFAULT_ACCESS_REQUESTS, error: null };
    }
    
    return { data: JSON.parse(requests), error: null };
  },

  async updateAccessRequestStatus(id: string, status: 'approved' | 'rejected') {
    if (typeof window === 'undefined') return { success: true };

    const { data } = await this.getAccessRequests();
    const updated = data.map(req => req.id === id ? { ...req, status } : req);
    localStorage.setItem('dfs_access_requests', JSON.stringify(updated));

    return { success: true };
  },

  async getGlobalAnalytics() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('shipments').select('status');
        if (!error && data) {
          return {
            shipments: data.length,
            revenue: data.length * 4200,
            activeCorridors: 4,
            borderDwells: 2
          };
        }
      } catch (err) {
        console.error('Supabase error, falling back to mock:', err);
      }
    }
    
    return { 
      shipments: 14, 
      revenue: 85400,
      activeCorridors: 4,
      borderDwells: 3
    };
  }
};
