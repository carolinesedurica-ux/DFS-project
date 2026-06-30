const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const client = new Client({
  user: 'postgres',
  password: 'Aliana@12S$',
  host: 'db.yidsfihagwttlmhfynmf.supabase.co',
  port: 5432,
  database: 'postgres',
  ssl: { rejectUnauthorized: false }
});

async function run() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL successfully.');
    
    const migrationPath = path.join(__dirname, 'supabase/migrations/0001_initial_schema.sql');
    const sql = fs.readFileSync(migrationPath, 'utf8');
    
    console.log('Executing migration schema...');
    await client.query(sql);
    console.log('Migration completed successfully.');
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    await client.end();
  }
}

run();
