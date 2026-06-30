import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';

export interface MockParcel {
  id: string;
  trackingNumber: string;
  senderName: string;
  receiverName: string;
  destination: string;
  status: 'transit' | 'delivered' | 'held' | 'out_for_delivery';
  weight: string;
  serviceType: 'Next Day Express' | 'Standard Delivery' | 'Priority Document';
  lastUpdated: string;
}

const DEFAULT_PARCELS: MockParcel[] = [
  {
    id: 'prc-001',
    trackingNumber: 'DFS-EXP-772923',
    senderName: 'Lobatse Clay Works',
    receiverName: 'Apex Builders Gaborone',
    destination: 'Gaborone, Botswana',
    status: 'out_for_delivery',
    weight: '4.5 kg',
    serviceType: 'Next Day Express',
    lastUpdated: '2026-06-30T07:30:00Z',
  },
  {
    id: 'prc-002',
    trackingNumber: 'DFS-EXP-908123',
    senderName: 'Botswana Medical Supplies',
    receiverName: 'Phakalane Medical Clinic',
    destination: 'Phakalane, Botswana',
    status: 'delivered',
    weight: '1.2 kg',
    serviceType: 'Priority Document',
    lastUpdated: '2026-06-29T15:00:00Z',
  },
  {
    id: 'prc-003',
    trackingNumber: 'DFS-EXP-112930',
    senderName: 'Kgalagadi Breweries',
    receiverName: 'Maun Distributing Hub',
    destination: 'Maun, Botswana',
    status: 'transit',
    weight: '12.0 kg',
    serviceType: 'Standard Delivery',
    lastUpdated: '2026-06-30T06:00:00Z',
  }
];

export const ExpressService = {
  async getParcels(companyId?: string) {
    if (isSupabaseConfigured) {
      try {
        let query = supabase.from('parcels').select('*');
        if (companyId) {
          query = query.eq('company_id', companyId);
        }
        const { data, error } = await query;
        if (!error && data) return { data, error: null };
      } catch (err) {
        console.error('Supabase error, falling back to mock:', err);
      }
    }
    
    // Fallback to mock parcels
    return { data: DEFAULT_PARCELS, error: null };
  }
};
