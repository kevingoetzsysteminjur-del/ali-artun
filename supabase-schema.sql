-- ═══════════════════════════════════════════════════════════════
-- Plan A Immobilien & Finanzierung – Supabase Schema
-- Ausführen im Supabase SQL Editor (alles auf einmal)
-- ═══════════════════════════════════════════════════════════════


-- ── 1. TABELLEN ─────────────────────────────────────────────────

-- Profiles (erweitert auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id          UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name        TEXT,
  email       TEXT,
  telefon     TEXT,
  role        TEXT DEFAULT 'customer',   -- 'customer' | 'admin'
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Merkzettel (gespeicherte Immobilien pro User)
CREATE TABLE IF NOT EXISTS merkzettel (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id      UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  property_id  UUID NOT NULL,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Suchaufträge (User-seitig)
CREATE TABLE IF NOT EXISTS search_requests (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id       UUID REFERENCES profiles(id) ON DELETE SET NULL,
  property_type TEXT,
  listing_type  TEXT,
  region        TEXT,
  budget_min    NUMERIC(12,2),
  budget_max    NUMERIC(12,2),
  min_rooms     INTEGER,
  min_area      NUMERIC(10,2),
  email         TEXT,
  status        TEXT DEFAULT 'neu',   -- 'neu' | 'bearbeitet' | 'abgeschlossen'
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Kontaktanfragen (Kontaktformular)
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id    UUID REFERENCES profiles(id) ON DELETE SET NULL,
  name       TEXT,
  email      TEXT,
  phone      TEXT,
  subject    TEXT,
  message    TEXT,
  status     TEXT DEFAULT 'neu',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Wertermittlungsanfragen
CREATE TABLE IF NOT EXISTS wertermittlung_requests (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id         UUID REFERENCES profiles(id) ON DELETE SET NULL,
  name            TEXT,
  email           TEXT,
  telefon         TEXT,
  objektart       TEXT,
  wohnflaeche     NUMERIC(10,2),
  zimmer          INTEGER,
  baujahr         INTEGER,
  zustand         TEXT,
  plz             TEXT,
  ort             TEXT,
  extras          JSONB DEFAULT '[]',
  estimated_value TEXT,
  status          TEXT DEFAULT 'neu',
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Immobilien (Admin verwaltet)
CREATE TABLE IF NOT EXISTS properties (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title         TEXT NOT NULL,
  description   TEXT,
  price         NUMERIC(12,2),
  property_type TEXT,
  listing_type  TEXT DEFAULT 'sale',
  bedrooms      INTEGER,
  bathrooms     INTEGER,
  area_sqm      NUMERIC(10,2),
  year_built    INTEGER,
  address       TEXT,
  city          TEXT,
  plz           TEXT,
  images        JSONB DEFAULT '[]',
  status        TEXT DEFAULT 'active',  -- 'active' | 'sold' | 'draft'
  featured      BOOLEAN DEFAULT false,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Callback-Anfragen (Rückruf)
CREATE TABLE IF NOT EXISTS callback_requests (
  id             UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id        UUID REFERENCES profiles(id) ON DELETE SET NULL,
  salutation     TEXT,
  first_name     TEXT,
  last_name      TEXT,
  phone          TEXT,
  subject        TEXT,
  preferred_time TEXT,
  status         TEXT DEFAULT 'neu',
  created_at     TIMESTAMPTZ DEFAULT NOW()
);


-- ── 2. HILFSFUNKTION: Admin-Check ───────────────────────────────

CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;


-- ── 3. ROW LEVEL SECURITY AKTIVIEREN ────────────────────────────

ALTER TABLE profiles              ENABLE ROW LEVEL SECURITY;
ALTER TABLE merkzettel            ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_requests       ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries     ENABLE ROW LEVEL SECURITY;
ALTER TABLE wertermittlung_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties            ENABLE ROW LEVEL SECURITY;
ALTER TABLE callback_requests     ENABLE ROW LEVEL SECURITY;


-- ── 4. RLS POLICIES ─────────────────────────────────────────────

-- PROFILES
DROP POLICY IF EXISTS "profiles_select_own"  ON profiles;
DROP POLICY IF EXISTS "profiles_update_own"  ON profiles;
DROP POLICY IF EXISTS "profiles_admin_all"   ON profiles;

CREATE POLICY "profiles_select_own"  ON profiles FOR SELECT USING (auth.uid() = id OR is_admin());
CREATE POLICY "profiles_update_own"  ON profiles FOR UPDATE USING (auth.uid() = id OR is_admin());
CREATE POLICY "profiles_admin_all"   ON profiles FOR ALL    USING (is_admin());


-- MERKZETTEL
DROP POLICY IF EXISTS "merkzettel_own"       ON merkzettel;
DROP POLICY IF EXISTS "merkzettel_admin"     ON merkzettel;

CREATE POLICY "merkzettel_own"    ON merkzettel FOR ALL USING (auth.uid() = user_id OR is_admin());
CREATE POLICY "merkzettel_insert" ON merkzettel FOR INSERT WITH CHECK (auth.uid() = user_id);


-- SEARCH REQUESTS
DROP POLICY IF EXISTS "search_public_insert" ON search_requests;
DROP POLICY IF EXISTS "search_own_select"    ON search_requests;
DROP POLICY IF EXISTS "search_admin_all"     ON search_requests;

CREATE POLICY "search_public_insert" ON search_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "search_own_select"    ON search_requests FOR SELECT USING (auth.uid() = user_id OR is_admin());
CREATE POLICY "search_admin_all"     ON search_requests FOR ALL    USING (is_admin());


-- CONTACT INQUIRIES
DROP POLICY IF EXISTS "contact_public_insert" ON contact_inquiries;
DROP POLICY IF EXISTS "contact_own_select"    ON contact_inquiries;
DROP POLICY IF EXISTS "contact_admin_all"     ON contact_inquiries;

CREATE POLICY "contact_public_insert" ON contact_inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "contact_own_select"    ON contact_inquiries FOR SELECT USING (auth.uid() = user_id OR is_admin());
CREATE POLICY "contact_admin_all"     ON contact_inquiries FOR ALL    USING (is_admin());


-- WERTERMITTLUNG REQUESTS
DROP POLICY IF EXISTS "wert_public_insert" ON wertermittlung_requests;
DROP POLICY IF EXISTS "wert_own_select"    ON wertermittlung_requests;
DROP POLICY IF EXISTS "wert_admin_all"     ON wertermittlung_requests;

CREATE POLICY "wert_public_insert" ON wertermittlung_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "wert_own_select"    ON wertermittlung_requests FOR SELECT USING (auth.uid() = user_id OR is_admin());
CREATE POLICY "wert_admin_all"     ON wertermittlung_requests FOR ALL    USING (is_admin());


-- PROPERTIES
DROP POLICY IF EXISTS "props_public_read"  ON properties;
DROP POLICY IF EXISTS "props_admin_all"    ON properties;

CREATE POLICY "props_public_read" ON properties FOR SELECT USING (status = 'active' OR is_admin());
CREATE POLICY "props_admin_all"   ON properties FOR ALL    USING (is_admin());


-- CALLBACK REQUESTS
DROP POLICY IF EXISTS "callback_public_insert" ON callback_requests;
DROP POLICY IF EXISTS "callback_own_select"    ON callback_requests;
DROP POLICY IF EXISTS "callback_admin_all"     ON callback_requests;

CREATE POLICY "callback_public_insert" ON callback_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "callback_own_select"    ON callback_requests FOR SELECT USING (auth.uid() = user_id OR is_admin());
CREATE POLICY "callback_admin_all"     ON callback_requests FOR ALL    USING (is_admin());


-- ── 5. TRIGGER: Auto-Profil bei Registrierung ───────────────────

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', ''),
    'customer'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- ── 6. ADMIN-USER MANUELL SETZEN ────────────────────────────────
-- Nach dem ersten Login von Ali ausführen (UUID anpassen):
--
-- UPDATE profiles SET role = 'admin'
-- WHERE email = 'Info@plana-immobilien-finanzierung.com';


-- ── 7. UPDATED_AT TRIGGER (optional) ────────────────────────────

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_updated_at_profiles    ON profiles;
DROP TRIGGER IF EXISTS set_updated_at_properties  ON properties;

CREATE TRIGGER set_updated_at_profiles
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at();

CREATE TRIGGER set_updated_at_properties
  BEFORE UPDATE ON properties
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at();
