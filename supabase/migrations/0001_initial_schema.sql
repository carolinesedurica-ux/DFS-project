-- 1. Core Tables

CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL -- 'super_admin', 'admin', 'company_admin', 'staff', 'driver', 'customer'
);

-- Extended profile linked to Supabase Auth users
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  company_id UUID REFERENCES companies(id),
  full_name TEXT,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
  domain TEXT -- e.g., 'trucking', 'clearing', 'express', 'all'
);

-- 2. Trucking Tables
CREATE TABLE shipments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id),
  origin TEXT,
  destination TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_number TEXT,
  type TEXT,
  status TEXT
);

CREATE TABLE drivers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES profiles(id),
  license_number TEXT
);

-- 3. Clearing Tables
CREATE TABLE customs_cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id),
  case_number TEXT,
  status TEXT DEFAULT 'open',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Express Tables
CREATE TABLE parcels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id),
  tracking_number TEXT,
  status TEXT DEFAULT 'transit',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE customs_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE parcels ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies (Examples for Shipments)
-- Super Admin sees all
CREATE POLICY "Super admin sees all shipments" ON shipments
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = auth.uid() AND r.name = 'super_admin'
    )
  );

-- Admin sees trucking if domain is trucking or all
CREATE POLICY "Admin sees domain shipments" ON shipments
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = auth.uid() AND r.name = 'admin' AND (ur.domain = 'trucking' OR ur.domain = 'all')
    )
  );

-- Customer sees their own company shipments
CREATE POLICY "Customer sees own company shipments" ON shipments
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.company_id = shipments.company_id
    )
  );

-- (Similar policies would be applied to clearing and express tables)

-- 6. Insert default roles
INSERT INTO roles (name) VALUES ('super_admin'), ('admin'), ('company_admin'), ('staff'), ('driver'), ('customer');
