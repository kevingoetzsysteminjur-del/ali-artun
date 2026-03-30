-- Plan A Immobilien & Finanzierung – Supabase Schema
-- Ausführen im Supabase SQL Editor

-- Profiles (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name TEXT,
  email TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact inquiries (Kontaktformular)
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  email TEXT,
  phone TEXT,
  subject TEXT,
  message TEXT,
  status TEXT DEFAULT 'neu',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Properties (Immobilien)
CREATE TABLE IF NOT EXISTS properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT,
  description TEXT,
  price NUMERIC(12,2),
  property_type TEXT,
  listing_type TEXT DEFAULT 'sale',
  bedrooms INTEGER,
  bathrooms INTEGER,
  area_sqm NUMERIC(10,2),
  year_built INTEGER,
  address TEXT,
  images JSONB DEFAULT '[]',
  status TEXT DEFAULT 'active',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Search requests (Suchaufträge)
CREATE TABLE IF NOT EXISTS search_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_type TEXT,
  listing_type TEXT,
  region TEXT,
  budget_min NUMERIC(12,2),
  budget_max NUMERIC(12,2),
  min_rooms INTEGER,
  min_area NUMERIC(10,2),
  email TEXT,
  status TEXT DEFAULT 'neu',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Callback requests (Rückruf-Anfragen)
CREATE TABLE IF NOT EXISTS callback_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  salutation TEXT,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  subject TEXT,
  preferred_time TEXT,
  status TEXT DEFAULT 'neu',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE callback_requests ENABLE ROW LEVEL SECURITY;

-- Profiles
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Contact inquiries: public insert, authenticated read/update
CREATE POLICY "Anyone can insert contact inquiry" ON contact_inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated can read contact inquiries" ON contact_inquiries FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can update contact inquiries" ON contact_inquiries FOR UPDATE USING (auth.role() = 'authenticated');

-- Properties: public read active, authenticated manage all
CREATE POLICY "Anyone can view active properties" ON properties FOR SELECT USING (status = 'active' OR auth.role() = 'authenticated');
CREATE POLICY "Authenticated can manage properties" ON properties FOR ALL USING (auth.role() = 'authenticated');

-- Search requests: public insert, authenticated read/update
CREATE POLICY "Anyone can insert search request" ON search_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated can read search requests" ON search_requests FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can update search requests" ON search_requests FOR UPDATE USING (auth.role() = 'authenticated');

-- Callback requests: public insert, authenticated read/update
CREATE POLICY "Anyone can insert callback request" ON callback_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated can read callback requests" ON callback_requests FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can update callback requests" ON callback_requests FOR UPDATE USING (auth.role() = 'authenticated');

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
