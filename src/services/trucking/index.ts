import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';
import { DEMO_SHIPMENTS } from '@/data/demo/shipments';

export const TruckingService = {
  async getShipments(companyId?: string) {
    if (isSupabaseConfigured) {
      try {
        let query = supabase.from('shipments').select('*');
        if (companyId) {
          query = query.eq('company_id', companyId);
        }
        const { data, error } = await query;
        if (!error && data) return { data, error: null };
      } catch (err) {
        console.error('Supabase error, falling back to mock:', err);
      }
    }
    
    // Fallback to mock shipments
    const data = companyId 
      ? DEMO_SHIPMENTS.filter(s => s.customerId === companyId) 
      : DEMO_SHIPMENTS;
    return { data, error: null };
  }
};
