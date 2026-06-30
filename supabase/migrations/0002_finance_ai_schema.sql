-- Enable Vector Extension for RAG
CREATE EXTENSION IF NOT EXISTS vector;

-- 1. Quotes Table
CREATE TABLE IF NOT EXISTS quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  origin TEXT NOT NULL,
  destination TEXT NOT NULL,
  cargo_details TEXT,
  cargo_type TEXT,
  equipment_requirement TEXT,
  status TEXT DEFAULT 'submitted', -- 'draft', 'submitted', 'under_review', 'quoted', 'accepted', 'declined', 'expired'
  amount NUMERIC,
  validity_date TIMESTAMPTZ,
  weight TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Invoices Table
CREATE TABLE IF NOT EXISTS invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  shipment_id UUID REFERENCES shipments(id) ON DELETE SET NULL,
  invoice_number TEXT UNIQUE NOT NULL,
  amount NUMERIC NOT NULL,
  tax_amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'draft', -- 'draft', 'sent', 'paid', 'overdue'
  due_date TIMESTAMPTZ NOT NULL,
  sage_id TEXT,
  sage_sync_status TEXT DEFAULT 'pending', -- 'pending', 'synced', 'failed', 'retry'
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Payments Table
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID REFERENCES invoices(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL,
  payment_method TEXT NOT NULL, -- 'eft', 'cash', 'card', 'bank_transfer'
  transaction_reference TEXT,
  payment_date TIMESTAMPTZ DEFAULT now(),
  sage_id TEXT,
  sage_sync_status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Credit Notes Table
CREATE TABLE IF NOT EXISTS credit_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID REFERENCES invoices(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL,
  reason TEXT,
  sage_id TEXT,
  sage_sync_status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Sage Sync Logs Table
CREATE TABLE IF NOT EXISTS sage_sync_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type TEXT NOT NULL, -- 'customer', 'invoice', 'payment', 'credit_note'
  entity_id UUID NOT NULL,
  action TEXT NOT NULL, -- 'create', 'update', 'void'
  status TEXT NOT NULL, -- 'success', 'failed', 'retry'
  error_message TEXT,
  request_payload JSONB,
  response_payload JSONB,
  retry_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Sage Mappings Table
CREATE TABLE IF NOT EXISTS sage_mappings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  supabase_id UUID NOT NULL,
  sage_id TEXT NOT NULL,
  entity_type TEXT NOT NULL, -- 'company', 'customer', 'invoice', 'payment'
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(supabase_id, entity_type),
  UNIQUE(sage_id, entity_type)
);

-- 7. Knowledge Base Documents Table
CREATE TABLE IF NOT EXISTS kb_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- 'customs_regulations', 'sop', 'pricing', 'contract', 'manual'
  file_path TEXT,
  tags TEXT[],
  file_size BIGINT,
  status TEXT DEFAULT 'indexing', -- 'indexing', 'indexed', 'failed'
  access_role TEXT DEFAULT 'customer_user', -- 'customer_user', 'customer_admin', 'dfs_ops', 'dfs_admin', 'super_admin'
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE, -- if customer-specific
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 8. Knowledge Base Document Chunks Table (pgvector)
CREATE TABLE IF NOT EXISTS kb_document_chunks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID REFERENCES kb_documents(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  embedding vector(1536),
  chunk_index INT NOT NULL
);

-- 9. AI Conversations Table
CREATE TABLE IF NOT EXISTS ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  portal TEXT NOT NULL, -- 'marketing', 'trucking', 'clearing', 'express', 'admin', 'super_admin'
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 10. AI Messages Table
CREATE TABLE IF NOT EXISTS ai_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES ai_conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL, -- 'user', 'assistant', 'system'
  content TEXT NOT NULL,
  retrieved_chunks JSONB, -- list of chunk references used for RAG
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE sage_sync_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE sage_mappings ENABLE ROW LEVEL SECURITY;
ALTER TABLE kb_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE kb_document_chunks ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_messages ENABLE ROW LEVEL SECURITY;

-- Create pgvector index (HNSW for cosine similarity search)
CREATE INDEX IF NOT EXISTS kb_document_chunks_embedding_idx 
ON kb_document_chunks 
USING hnsw (embedding vector_cosine_ops);

-- Similarity Search Function
CREATE OR REPLACE FUNCTION match_document_chunks(
  query_embedding vector(1536),
  match_threshold float,
  match_count int,
  filter_category text DEFAULT NULL,
  filter_company_id uuid DEFAULT NULL,
  filter_role text DEFAULT 'customer_user'
)
RETURNS TABLE (
  id uuid,
  document_id uuid,
  content text,
  similarity float,
  document_name text,
  category text,
  access_role text,
  company_id uuid
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    c.id,
    c.document_id,
    c.content,
    1 - (c.embedding <=> query_embedding) AS similarity,
    d.name AS document_name,
    d.category,
    d.access_role,
    d.company_id
  FROM kb_document_chunks c
  JOIN kb_documents d ON c.document_id = d.id
  WHERE (1 - (c.embedding <=> query_embedding)) > match_threshold
    AND (filter_category IS NULL OR d.category = filter_category)
    AND (d.company_id IS NULL OR d.company_id = filter_company_id)
    AND (
      d.access_role IS NULL 
      OR filter_role = 'super_admin' 
      OR filter_role = 'dfs_admin'
      OR (filter_role = 'dfs_ops' AND d.access_role IN ('dfs_ops', 'customer_admin', 'customer_user'))
      OR (filter_role = 'customer_admin' AND d.access_role IN ('customer_admin', 'customer_user'))
      OR (filter_role = 'customer_user' AND d.access_role = 'customer_user')
    )
  ORDER BY c.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- RLS Policies

-- Invoices Policies
DROP POLICY IF EXISTS "Super admin/admin sees all invoices" ON invoices;
CREATE POLICY "Super admin/admin sees all invoices" ON invoices
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = auth.uid() AND r.name IN ('super_admin', 'admin')
    )
  );

DROP POLICY IF EXISTS "Customer sees own company invoices" ON invoices;
CREATE POLICY "Customer sees own company invoices" ON invoices
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.company_id = invoices.company_id
    )
  );

-- Payments Policies
DROP POLICY IF EXISTS "Super admin/admin sees all payments" ON payments;
CREATE POLICY "Super admin/admin sees all payments" ON payments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = auth.uid() AND r.name IN ('super_admin', 'admin')
    )
  );

DROP POLICY IF EXISTS "Customer sees own company payments" ON payments;
CREATE POLICY "Customer sees own company payments" ON payments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM invoices i
      JOIN profiles p ON i.company_id = p.company_id
      WHERE p.id = auth.uid() AND i.id = payments.invoice_id
    )
  );

-- Quotes Policies
DROP POLICY IF EXISTS "Super admin/admin/staff sees all quotes" ON quotes;
CREATE POLICY "Super admin/admin/staff sees all quotes" ON quotes
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = auth.uid() AND r.name IN ('super_admin', 'admin', 'staff')
    )
  );

DROP POLICY IF EXISTS "Customer sees/inserts own company quotes" ON quotes;
CREATE POLICY "Customer sees/inserts own company quotes" ON quotes
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.company_id = quotes.company_id
    )
  );

-- Knowledge Base Documents Policies
DROP POLICY IF EXISTS "Super admin/admin manages all kb docs" ON kb_documents;
CREATE POLICY "Super admin/admin manages all kb docs" ON kb_documents
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = auth.uid() AND r.name IN ('super_admin', 'admin')
    )
  );

DROP POLICY IF EXISTS "Users see permitted kb docs" ON kb_documents;
CREATE POLICY "Users see permitted kb docs" ON kb_documents
  FOR SELECT USING (
    (company_id IS NULL OR EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.company_id = kb_documents.company_id
    ))
    AND (
      access_role IS NULL
      OR EXISTS (
        SELECT 1 FROM user_roles ur
        JOIN roles r ON ur.role_id = r.id
        WHERE ur.user_id = auth.uid() AND (
          r.name = 'super_admin' OR r.name = 'admin'
          OR (r.name = 'staff' AND kb_documents.access_role IN ('dfs_ops', 'customer_admin', 'customer_user'))
          OR (r.name = 'company_admin' AND kb_documents.access_role IN ('customer_admin', 'customer_user'))
          OR (r.name = 'customer' AND kb_documents.access_role = 'customer_user')
        )
      )
    )
  );

-- AI Conversations Policies
DROP POLICY IF EXISTS "Users can manage own conversations" ON ai_conversations;
CREATE POLICY "Users can manage own conversations" ON ai_conversations
  FOR ALL USING (user_id = auth.uid());

-- AI Messages Policies
DROP POLICY IF EXISTS "Users can manage own conversation messages" ON ai_messages;
CREATE POLICY "Users can manage own conversation messages" ON ai_messages
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM ai_conversations c
      WHERE c.id = ai_messages.conversation_id AND c.user_id = auth.uid()
    )
  );
