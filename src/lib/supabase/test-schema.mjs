import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yidsfihagwttlmhfynmf.supabase.co';
const supabaseAnonKey = 'sb_publishable_4QwqM-obElPsgghW6r06ag_yfuIibbt';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function main() {
  console.log('Verifying Database Schema Tables...');
  const tables = [
    'companies', 
    'profiles', 
    'user_roles', 
    'quotes', 
    'invoices', 
    'payments', 
    'kb_documents', 
    'kb_document_chunks', 
    'ai_conversations', 
    'ai_messages'
  ];
  
  let successCount = 0;
  for (const t of tables) {
    const { error } = await supabase.from(t).select('*').limit(1);
    if (error) {
      console.error(`❌ Table ${t} query failed:`, error.message);
    } else {
      console.log(`✅ Table ${t} is available.`);
      successCount++;
    }
  }
  
  console.log(`Schema check complete. ${successCount}/${tables.length} tables verified.`);
}

main().catch(console.error);
