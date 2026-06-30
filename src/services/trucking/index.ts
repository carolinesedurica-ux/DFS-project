import { supabase } from '@/lib/supabase/client';

export const TruckingService = {
  async getShipments(companyId?: string) {
    let query = supabase.from('shipments').select('*');
    if (companyId) {
      query = query.eq('company_id', companyId);
    }
    return await query;
  },
  // Additional trucking-specific operations...
};
