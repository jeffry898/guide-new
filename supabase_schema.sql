-- Professions Table
CREATE TABLE IF NOT EXISTS public.professions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  price numeric NOT NULL,
  automation_risk integer NOT NULL,
  industry_data jsonb NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- Purchases Table
CREATE TABLE IF NOT EXISTS public.purchases (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  stripe_session_id text UNIQUE NOT NULL,
  user_email text NOT NULL,
  profession_slug text NOT NULL,
  amount numeric NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamp with time zone DEFAULT now()
);

-- Guides Table
CREATE TABLE IF NOT EXISTS public.guides (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email text NOT NULL,
  profession_slug text NOT NULL,
  content jsonb NOT NULL,
  onboarding_hash text UNIQUE NOT NULL,
  stripe_session_id text,
  created_at timestamp with time zone DEFAULT now()
);

-- Report Leads Table
CREATE TABLE IF NOT EXISTS public.report_leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL,
  profession_slug text NOT NULL,
  answers jsonb NOT NULL,
  token text UNIQUE NOT NULL,
  email_sequence_step integer DEFAULT 1,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.professions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.report_leads ENABLE ROW LEVEL SECURITY;

-- Allow public read for guides by hash
DROP POLICY IF EXISTS "Public read guides by hash" ON public.guides;
CREATE POLICY "Public read guides by hash" ON public.guides FOR SELECT USING (true);

-- Allow public read for professions
DROP POLICY IF EXISTS "Public read professions" ON public.professions;
CREATE POLICY "Public read professions" ON public.professions FOR SELECT USING (true);

-- Allow system writes (service role handles this, but for completeness if using anon for parts)
-- The getSupabaseAdmin() uses service role, so RLS doesn't block it by default if configured correctly.
