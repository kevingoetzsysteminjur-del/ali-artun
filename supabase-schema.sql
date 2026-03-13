-- ============================================================
-- Plan A Immobilien – Supabase Schema
-- Run this in your Supabase SQL editor
-- ============================================================

-- ── Profiles ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'name',
    NEW.raw_user_meta_data->>'phone'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ── Inquiries ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'contact', -- 'contact' | 'bewertung' | 'finanzierung'
  status TEXT DEFAULT 'neu', -- 'neu' | 'in_bearbeitung' | 'erledigt'
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Anyone can create an inquiry
CREATE POLICY "Anyone can create inquiry"
  ON public.inquiries FOR INSERT
  WITH CHECK (true);

-- Users can view their own inquiries
CREATE POLICY "Users can view own inquiries"
  ON public.inquiries FOR SELECT
  USING (auth.uid() = user_id OR auth.jwt()->>'email' = 'ali@plana-immobilien.de');

-- Admin can update inquiries
CREATE POLICY "Admin can update inquiries"
  ON public.inquiries FOR UPDATE
  USING (auth.jwt()->>'email' = 'ali@plana-immobilien.de');

-- Admin can delete inquiries
CREATE POLICY "Admin can delete inquiries"
  ON public.inquiries FOR DELETE
  USING (auth.jwt()->>'email' = 'ali@plana-immobilien.de');

-- ── Partner Applications ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.partner_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  location TEXT,
  experience BOOLEAN DEFAULT false,
  motivation TEXT,
  status TEXT DEFAULT 'neu', -- 'neu' | 'angenommen' | 'abgelehnt'
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.partner_applications ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a partner application
CREATE POLICY "Anyone can create partner application"
  ON public.partner_applications FOR INSERT
  WITH CHECK (true);

-- Admin can view all partner applications
CREATE POLICY "Admin can view partner applications"
  ON public.partner_applications FOR SELECT
  USING (auth.jwt()->>'email' = 'ali@plana-immobilien.de');

-- Admin can update partner applications
CREATE POLICY "Admin can update partner applications"
  ON public.partner_applications FOR UPDATE
  USING (auth.jwt()->>'email' = 'ali@plana-immobilien.de');

-- ── Site Images ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.site_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  storage_path TEXT NOT NULL,
  public_url TEXT NOT NULL,
  section TEXT NOT NULL, -- 'hero' | 'ueber-mich' | 'objekte' | 'galerie' | 'referenzen'
  label TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.site_images ENABLE ROW LEVEL SECURITY;

-- Anyone can view site images
CREATE POLICY "Anyone can view site images"
  ON public.site_images FOR SELECT
  USING (true);

-- Admin can manage site images
CREATE POLICY "Admin can insert site images"
  ON public.site_images FOR INSERT
  WITH CHECK (auth.jwt()->>'email' = 'ali@plana-immobilien.de');

CREATE POLICY "Admin can delete site images"
  ON public.site_images FOR DELETE
  USING (auth.jwt()->>'email' = 'ali@plana-immobilien.de');

-- ── Site Content ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.site_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section TEXT NOT NULL, -- 'hero' | 'ueber-ali' | 'leistungen' | 'prozess' | 'kontakt'
  lang TEXT NOT NULL, -- 'de' | 'en' | 'tr'
  content TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(section, lang)
);

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Anyone can view site content
CREATE POLICY "Anyone can view site content"
  ON public.site_content FOR SELECT
  USING (true);

-- Admin can manage site content
CREATE POLICY "Admin can upsert site content"
  ON public.site_content FOR ALL
  USING (auth.jwt()->>'email' = 'ali@plana-immobilien.de')
  WITH CHECK (auth.jwt()->>'email' = 'ali@plana-immobilien.de');

-- ── Storage Bucket ───────────────────────────────────────────
-- Run in Supabase dashboard → Storage → Create bucket named "images" (public)
-- Or via SQL:
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow admin to upload
CREATE POLICY "Admin can upload images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'images'
    AND auth.jwt()->>'email' = 'ali@plana-immobilien.de'
  );

-- Allow admin to delete images
CREATE POLICY "Admin can delete images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'images'
    AND auth.jwt()->>'email' = 'ali@plana-immobilien.de'
  );

-- Allow public read of images
CREATE POLICY "Public can view images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'images');
