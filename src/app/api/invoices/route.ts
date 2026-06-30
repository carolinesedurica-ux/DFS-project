import { NextResponse } from 'next/server';
import { SageService } from '@/services/sage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const companyId = searchParams.get('companyId');
    
    let query = supabase.from('invoices').select('*, companies(*)').order('created_at', { ascending: false });
    if (companyId) {
      query = query.eq('company_id', companyId);
    }
    
    const { data: invoices, error } = await query;
    if (error) throw error;
    
    return NextResponse.json(invoices || []);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { company_id, shipment_id, invoice_number, amount, tax_amount, due_date } = body;

    if (!company_id || !invoice_number || !amount || !due_date) {
      return NextResponse.json({ error: 'Missing required fields for invoice creation.' }, { status: 400 });
    }

    // 1. Insert Invoice
    const { data: invoice, error: invErr } = await supabase
      .from('invoices')
      .insert({
        company_id,
        shipment_id: shipment_id || null,
        invoice_number,
        amount,
        tax_amount: tax_amount || (Number(amount) * 0.14), // Default 14% BURS VAT
        due_date,
        status: 'sent',
        sage_sync_status: 'pending'
      })
      .select('*')
      .single();

    if (invErr || !invoice) throw new Error(invErr?.message || 'Invoice creation failed');

    // 2. Trigger Sage Sync asynchronously (non-blocking)
    // We let the API return immediately, while syncing in background, standard Next.js behavior
    SageService.syncInvoice(invoice.id).catch(err => {
      console.error(`Background Sage sync failed for invoice ${invoice.id}:`, err.message);
    });

    return NextResponse.json({ success: true, invoice });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
