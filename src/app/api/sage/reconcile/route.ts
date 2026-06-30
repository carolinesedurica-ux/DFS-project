import { NextResponse } from 'next/server';
import { SageService } from '@/services/sage';

export async function POST() {
  try {
    const result = await SageService.reconcileSyncs();
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
