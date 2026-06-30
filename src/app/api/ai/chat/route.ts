import { NextResponse } from 'next/server';
import { AIService } from '@/services/ai';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

function mapUserId(id: string): string {
  if (id === 'usr-cust-001') return 'cccccccc-cccc-cccc-cccc-cccccccccccc';
  if (id === 'usr-admin-001') return 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
  if (id === 'usr-ops-001') return 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
  return id; // if already uuid
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, portal, userContext: mockUserContext, conversationId } = body;
    
    let user = mockUserContext;
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Attempt to get real authenticated user from Supabase headers
    const authHeader = req.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const { data: { user: authUser }, error } = await supabase.auth.getUser(token);
      if (authUser) {
        const { data: profile } = await supabase.from('profiles').select('*, companies(*)').eq('id', authUser.id).single();
        const { data: userRole } = await supabase.from('user_roles').select('*, roles(*)').eq('user_id', authUser.id).single();
        user = {
          id: authUser.id,
          email: authUser.email,
          name: profile?.full_name || authUser.email,
          role: userRole?.roles?.name || 'customer_user',
          companyId: profile?.company_id || null,
          companyName: profile?.companies?.name || null
        };
      }
    }

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized user context.' }, { status: 401 });
    }

    const mappedId = mapUserId(user.id);

    // Run AI chat completion
    const response = await AIService.chatCompletion(messages, portal, {
      ...user,
      id: mappedId
    });

    let currentConvId = conversationId;
    try {
      if (!currentConvId && mappedId) {
        // Create new conversation record
        const { data: conv, error: convErr } = await supabase
          .from('ai_conversations')
          .insert({
            user_id: mappedId,
            portal
          })
          .select('id')
          .single();

        if (conv) currentConvId = conv.id;
        if (convErr) console.warn('Failed to create ai_conversation:', convErr.message);
      }

      if (currentConvId) {
        // Save user message
        const lastMsg = messages[messages.length - 1];
        await supabase.from('ai_messages').insert({
          conversation_id: currentConvId,
          role: 'user',
          content: lastMsg.content
        });
        
        // Save assistant response
        await supabase.from('ai_messages').insert({
          conversation_id: currentConvId,
          role: 'assistant',
          content: response.answer,
          retrieved_chunks: response.retrievedChunks
        });
      }
    } catch (saveErr: any) {
      console.warn('Failed to log AI conversation to DB:', saveErr.message);
    }

    return NextResponse.json({ 
      answer: response.answer, 
      conversationId: currentConvId,
      retrievedChunks: response.retrievedChunks 
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
