import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:Aliana@12S$@db.yidsfihagwttlmhfynmf.supabase.co:5432/postgres';
const openAiKey = process.env.OPENAI_API_KEY;

const sampleDocs = [
  {
    name: 'SOP-001: Refrigerated Cargo Handling',
    category: 'sop',
    access_role: 'dfs_ops',
    content: `Standard Operating Procedure (SOP) for Refrigerated Cargo (Cold Chain) at DFS Group.
1. Pre-Trip Inspection: Ensure the refrigeration unit (reefer) is calibrated and running at the set point for at least 30 minutes before loading cargo. Set temperature: -18°C for frozen meat/seafood, +4°C for fresh produce.
2. Loading Procedures: Cargo must be pre-cooled to the required temperature. Do not block the air distribution system (T-bar floor). Leave a 10cm gap at the top and 20cm at the rear doors for air circulation.
3. In-Transit Monitoring: Drivers must check the reefer display at every corridor border post and recorded every 4 hours. Set alerts for deviation exceeding +/- 2°C.
4. Emergency Action: In case of refrigeration failure, driver must immediately notify DFS Dispatch (ops@dfs.group) and proceed to the nearest authorized repair hub in Lobatse, Gaborone, or Johannesburg. Do not open reefer doors.`
  },
  {
    name: 'Botswana Customs & Import Regulations 2026',
    category: 'customs_regulations',
    access_role: 'customer_user',
    content: `Botswana Unified Revenue Service (BURS) Customs Import Procedures.
1. Required Documentation: All commercial imports into Botswana require:
   - Commercial Invoice (must specify terms of sale, shipper, consignee, description of goods, unit price, total value)
   - Packing List (itemized weights, packages, dimensions)
   - Bill of Lading / Road Consignment Note (Waybill)
   - Certificate of Origin (for SADC/SACU tariff preferences)
   - Import Permit (for regulated goods: agricultural products, meat, chemicals, machinery)
2. Tariffs and Duties: VAT of 14% is applicable on all imported goods (calculated on the Customs Value plus duty). Duties range from 0% (SADC origin) up to 30% for non-SADC automotive and luxury items.
3. Border Posts: Primary SADC corridors operate through Ramokgwebana (Zimbabwe border), Pioneer Gate / Lobatse (South Africa border), and Kazungula (Zambia border). Clearing agents must submit declarations electronically via ASYCUDA World prior to truck arrival.`
  },
  {
    name: 'DFS Corporate Rate Card & Pricing Policy',
    category: 'pricing',
    access_role: 'dfs_admin',
    content: `DFS Group Freight Rate Card & Pricing Guidelines - Southern Africa Corridors.
1. Bulk Cargo (Side-Tipper):
   - Johannesburg to Gaborone: $1,250 per load (max 38 MT)
   - Johannesburg to Harare: $3,100 per load (max 38 MT)
   - Durban to Lusaka: $5,200 per load (max 38 MT)
2. Bagged Cargo (Flatdeck):
   - Johannesburg to Gaborone: $1,100 per load (max 36 MT)
   - Johannesburg to Lusaka: $4,800 per load (max 36 MT)
3. Border Clearance Fees: Standard clearing charge is $150 per border declaration. Includes basic customs presentation. Additional documentation (e.g. Health Permits) charged at $50 per permit.
4. Demurrage: 24 hours free for loading/unloading. Thereafter, demurrage is charged at $250 per day.`
  }
];

async function generateEmbedding(text) {
  if (!openAiKey) {
    // Generate dummy 1536-dim vector filled with small random floats if no API key is provided
    return Array.from({ length: 1536 }, () => (Math.random() - 0.5) * 0.1);
  }

  try {
    const response = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openAiKey}`
      },
      body: JSON.stringify({
        input: text,
        model: 'text-embedding-3-small'
      })
    });
    const result = await response.json();
    if (result.data && result.data[0]) {
      return result.data[0].embedding;
    }
    throw new Error(result.error?.message || 'Unknown embedding error');
  } catch (err) {
    console.warn('Failed to fetch OpenAI embedding, falling back to dummy vector:', err.message);
    return Array.from({ length: 1536 }, () => (Math.random() - 0.5) * 0.1);
  }
}

async function main() {
  console.log('Connecting to database...');
  const client = new pg.Client({ connectionString });
  await client.connect();

  try {
    console.log('Running migration: 0002_finance_ai_schema.sql...');
    const migrationPath = path.join(__dirname, '../../../supabase/migrations/0002_finance_ai_schema.sql');
    const migrationSql = fs.readFileSync(migrationPath, 'utf8');
    await client.query(migrationSql);
    console.log('Migration applied successfully.');

    // Seed Roles (double check)
    console.log('Seeding default roles...');
    const defaultRoles = ['super_admin', 'admin', 'company_admin', 'staff', 'driver', 'customer'];
    for (const r of defaultRoles) {
      await client.query('INSERT INTO roles (name) VALUES ($1) ON CONFLICT (name) DO NOTHING', [r]);
    }

    // Seed Companies
    console.log('Seeding companies...');
    const companies = [
      { id: '11111111-1111-1111-1111-111111111111', name: 'DFS Group' },
      { id: '22222222-2222-2222-2222-222222222222', name: 'Mmamashia Mining (Pty) Ltd' },
      { id: '33333333-3333-3333-3333-333333333333', name: 'Acme Corp' },
      { id: '44444444-4444-4444-4444-444444444444', name: 'Global Traders' }
    ];
    for (const c of companies) {
      await client.query('INSERT INTO companies (id, name) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name', [c.id, c.name]);
    }

    // Seed Auth Users (with bcrypt hash for 'Demo2026!', 'Admin2026!', 'Ops2026!' using extensions.crypt)
    console.log('Seeding auth users...');
    const users = [
      {
        id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        email: 'admin@demo.dfs.group',
        pass: 'Admin2026!',
        name: 'Tshepiso Kgomotso',
        role: 'dfs_admin',
        company: '11111111-1111-1111-1111-111111111111'
      },
      {
        id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        email: 'ops@demo.dfs.group',
        pass: 'Ops2026!',
        name: 'Lesego Pule',
        role: 'dfs_ops',
        company: '11111111-1111-1111-1111-111111111111'
      },
      {
        id: 'cccccccc-cccc-cccc-cccc-cccccccccccc',
        email: 'customer@demo.dfs.group',
        pass: 'Demo2026!',
        name: 'Kago Mosimanyana',
        role: 'customer_user',
        company: '22222222-2222-2222-2222-222222222222'
      }
    ];

    for (const u of users) {
      // Insert into auth.users (requires pgcrypto extension or crypt function)
      // Supabase auth schema is in "auth"
      await client.query(`
        INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, role, aud, created_at, updated_at)
        VALUES (
          $1, $2, extensions.crypt($3, extensions.gen_salt('bf', 10)), now(), 
          jsonb_build_object('provider', 'email', 'providers', array_to_json(array['email'])),
          jsonb_build_object('name', $4::text),
          'authenticated', 'authenticated', now(), now()
        )
        ON CONFLICT (id) DO NOTHING
      `, [u.id, u.email, u.pass, u.name]);

      // Seed Profile
      await client.query(`
        INSERT INTO profiles (id, company_id, full_name, email, created_at)
        VALUES ($1, $2, $3, $4, now())
        ON CONFLICT (id) DO UPDATE SET company_id = EXCLUDED.company_id, full_name = EXCLUDED.full_name, email = EXCLUDED.email
      `, [u.id, u.company, u.name, u.email]);

      // Seed User Roles
      const roleName = u.role === 'dfs_admin' ? 'super_admin' : (u.role === 'dfs_ops' ? 'staff' : 'customer');
      const roleRes = await client.query('SELECT id FROM roles WHERE name = $1', [roleName]);
      const roleId = roleRes.rows[0]?.id;

      await client.query(`
        INSERT INTO user_roles (user_id, role_id, domain)
        VALUES ($1, $2, 'all')
        ON CONFLICT DO NOTHING
      `, [u.id, roleId]);
    }

    // Seed Shipments
    console.log('Seeding shipments...');
    const shipments = [
      { id: '55555555-5555-5555-5555-555555555555', company: '22222222-2222-2222-2222-222222222222', origin: 'Johannesburg', dest: 'Gaborone', status: 'in_transit' },
      { id: '66666666-6666-6666-6666-666666666666', company: '22222222-2222-2222-2222-222222222222', origin: 'Durban', dest: 'Harare', status: 'delivered' },
      { id: '77777777-7777-7777-7777-777777777777', company: '33333333-3333-3333-3333-333333333333', origin: 'Cape Town', dest: 'Lusaka', status: 'delayed' }
    ];
    for (const s of shipments) {
      await client.query(`
        INSERT INTO shipments (id, company_id, origin, destination, status, created_at)
        VALUES ($1, $2, $3, $4, $5, now())
        ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status
      `, [s.id, s.company, s.origin, s.dest, s.status]);
    }

    // Seed Invoices
    console.log('Seeding invoices...');
    const invoices = [
      { id: '88888888-8888-8888-8888-888888888888', company: '22222222-2222-2222-2222-222222222222', shipment: '55555555-5555-5555-5555-555555555555', number: 'INV-2026-001', amount: 1250.00, tax: 175.00, status: 'sent', due: '2026-07-15' },
      { id: '99999999-9999-9999-9999-999999999999', company: '22222222-2222-2222-2222-222222222222', shipment: '66666666-6666-6666-6666-666666666666', number: 'INV-2026-002', amount: 3100.00, tax: 434.00, status: 'paid', due: '2026-06-30' },
      { id: 'aaaaaaaa-1111-1111-1111-aaaaaaaaaaaa', company: '33333333-3333-3333-3333-333333333333', shipment: '77777777-7777-7777-7777-777777777777', number: 'INV-2026-003', amount: 5200.00, tax: 728.00, status: 'overdue', due: '2026-05-01' }
    ];
    for (const inv of invoices) {
      await client.query(`
        INSERT INTO invoices (id, company_id, shipment_id, invoice_number, amount, tax_amount, status, due_date, sage_sync_status, sage_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'synced', $9)
        ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status, sage_sync_status = 'synced'
      `, [inv.id, inv.company, inv.shipment, inv.number, inv.amount, inv.tax, inv.status, inv.due, `sage-inv-${inv.number}`]);
    }

    // Seed Payments
    console.log('Seeding payments...');
    await client.query(`
      INSERT INTO payments (invoice_id, amount, payment_method, transaction_reference, payment_date, sage_sync_status, sage_id)
      VALUES ($1, $2, $3, $4, $5, 'synced', $6)
      ON CONFLICT DO NOTHING
    `, ['99999999-9999-9999-9999-999999999999', 3534.00, 'eft', 'TXN-9821820', '2026-06-25', 'sage-pay-INV-2026-002']);

    // Seed Knowledge Base Documents & Chunks (RAG)
    console.log('Seeding knowledge base...');
    for (const doc of sampleDocs) {
      // Check if document exists
      const checkRes = await client.query('SELECT id FROM kb_documents WHERE name = $1', [doc.name]);
      let docId;
      if (checkRes.rows.length > 0) {
        docId = checkRes.rows[0].id;
        // Clean up old chunks
        await client.query('DELETE FROM kb_document_chunks WHERE document_id = $1', [docId]);
      } else {
        const insertRes = await client.query(`
          INSERT INTO kb_documents (name, category, status, access_role, file_size)
          VALUES ($1, $2, 'indexed', $3, $4)
          RETURNING id
        `, [doc.name, doc.category, doc.access_role, Buffer.byteLength(doc.content)]);
        docId = insertRes.rows[0].id;
      }

      // Generate embedding and insert chunk
      console.log(`Generating embedding for: ${doc.name}...`);
      const embedding = await generateEmbedding(doc.content);
      
      // Store chunk (just 1 chunk per document for seed simplicity)
      await client.query(`
        INSERT INTO kb_document_chunks (document_id, content, embedding, chunk_index)
        VALUES ($1, $2, $3, 0)
      `, [docId, doc.content, JSON.stringify(embedding)]);
    }

    console.log('Seeding completed successfully!');
  } catch (err) {
    console.error('Error during seeding:', err);
  } finally {
    await client.end();
  }
}

main().catch(console.error);
