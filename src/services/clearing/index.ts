import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';

export interface MockCustomsCase {
  id: string;
  companyName: string;
  caseNumber: string;
  borderPost: string;
  status: 'open' | 'cleared' | 'held' | 'pending';
  cargoType: string;
  submittedAt: string;
}

const DEFAULT_CUSTOMS_CASES: MockCustomsCase[] = [
  {
    id: 'case-001',
    companyName: 'Mmamashia Mining (Pty) Ltd',
    caseNumber: 'BO-BO-49293-26',
    borderPost: 'Martins Drift Border Post',
    status: 'pending',
    cargoType: 'Copper Concentrates',
    submittedAt: '2026-06-26T16:00:00Z',
  },
  {
    id: 'case-002',
    companyName: 'Mmamashia Mining (Pty) Ltd',
    caseNumber: 'BO-ZI-90218-26',
    borderPost: 'Ramokgwebana Border',
    status: 'cleared',
    cargoType: 'Bagged Cement Link',
    submittedAt: '2026-06-25T14:30:00Z',
  },
  {
    id: 'case-003',
    companyName: 'Kalahari Traders',
    caseNumber: 'BO-ZA-89102-26',
    borderPost: 'Kazungula Border Post',
    status: 'open',
    cargoType: 'Industrial Equipment',
    submittedAt: '2026-06-29T11:00:00Z',
  }
];

export const ClearingService = {
  async getCustomsCases(companyId?: string) {
    if (isSupabaseConfigured) {
      try {
        let query = supabase.from('customs_cases').select('*');
        if (companyId) {
          query = query.eq('company_id', companyId);
        }
        const { data, error } = await query;
        if (!error && data) return { data, error: null };
      } catch (err) {
        console.error('Supabase error, falling back to mock:', err);
      }
    }
    
    // Fallback to mock cases
    return { data: DEFAULT_CUSTOMS_CASES, error: null };
  }
};
