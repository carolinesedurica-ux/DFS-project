import { NextResponse } from 'next/server';
import { AIService } from '@/services/ai';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

function splitTextIntoChunks(text: string, size = 500, overlap = 80): string[] {
  const words = text.split(/\s+/);
  const chunks: string[] = [];
  let currentWords: string[] = [];
  
  for (const word of words) {
    currentWords.push(word);
    const currentLen = currentWords.join(' ').length;
    if (currentLen >= size) {
      chunks.push(currentWords.join(' '));
      currentWords = currentWords.slice(-Math.floor(overlap / 10) || -3);
    }
  }
  if (currentWords.length > 0) {
    chunks.push(currentWords.join(' '));
  }
  return chunks;
}

export async function GET(req: Request) {
  try {
    const { data: docs, error } = await supabase
      .from('kb_documents')
      .select('*, chunks:kb_document_chunks(count)')
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    // Format chunk count response
    const formatted = docs.map(d => ({
      ...d,
      chunkCount: d.chunks?.[0]?.count || 0
    }));

    return NextResponse.json(formatted);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, category, access_role = 'customer_user', company_id = null, content } = body;

    if (!name || !category || !content) {
      return NextResponse.json({ error: 'Missing required fields: name, category, or content.' }, { status: 400 });
    }

    // 1. Insert Document record
    const { data: doc, error: docErr } = await supabase
      .from('kb_documents')
      .insert({
        name,
        category,
        access_role,
        company_id: company_id || null,
        file_size: Buffer.byteLength(content),
        status: 'indexing'
      })
      .select('*')
      .single();

    if (docErr || !doc) throw new Error(docErr?.message || 'Document insertion failed');

    // 2. Chunk text
    const chunks = splitTextIntoChunks(content);
    
    // 3. Generate embeddings and insert chunks
    for (let i = 0; i < chunks.length; i++) {
      const chunkText = chunks[i];
      const embedding = await AIService.generateEmbedding(chunkText);
      
      await supabase.from('kb_document_chunks').insert({
        document_id: doc.id,
        content: chunkText,
        embedding: JSON.stringify(embedding),
        chunk_index: i
      });
    }

    // 4. Update status to indexed
    await supabase
      .from('kb_documents')
      .update({ status: 'indexed' })
      .eq('id', doc.id);

    return NextResponse.json({ success: true, document: doc, chunksCreated: chunks.length });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing document id parameter.' }, { status: 400 });
    }

    const { error } = await supabase
      .from('kb_documents')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
