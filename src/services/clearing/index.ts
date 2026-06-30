import { supabase } from '@/lib/supabase/client';

export const ClearingService = {
  async getCustomsCases(companyId?: string) {
    let query = supabase.from('customs_cases').select('*');
    if (companyId) {
      query = query.eq('company_id', companyId);
    }
    return await query;
  },
  // Additional clearing-specific operations...
};
