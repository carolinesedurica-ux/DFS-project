import { supabase } from '@/lib/supabase/client';

export const AdminService = {
  async getAllUsers() {
    return await supabase.from('profiles').select('*');
  },
  async getGlobalAnalytics() {
    // Analytics logic here
    return { shipments: 120, revenue: 50000 };
  }
};
