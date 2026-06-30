import { NextResponse } from 'next/server';
import { AIService } from '@/services/ai';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fileName, fileData, documentType } = body;

    if (!fileName || !fileData || !documentType) {
      return NextResponse.json({ error: 'Missing required fields: fileName, fileData, or documentType.' }, { status: 400 });
    }

    const report = await AIService.verifyDocument(fileName, fileData, documentType);
    return NextResponse.json(report);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
