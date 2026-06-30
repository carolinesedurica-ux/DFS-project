import { supabase } from '@/lib/supabase/client';

export const ExpressService = {
  async getParcels(companyId?: string) {
    let query = supabase.from('parcels').select('*');
    if (companyId) {
      query = query.eq('company_id', companyId);
    }
    return await query;
  },
  // Additional express-specific operations...
};
