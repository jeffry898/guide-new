# 🧠 GUIDR EMPIRE — Complete System Knowledgebase

---

## 📌 Executive Overview
**GUIDR EMPIRE** (`https://guidr-empire.pages.dev`) is a world-class **AI Survival Protocol Marketplace & Lead Conversion Engine** built by **GeniuzLab**. It empowers white-collar professionals across the **USA, UK, Europe, and Sri Lanka** to protect their careers against autonomous AI displacement by deploying specialized AI prompts, free tool workflows, and agency automation systems.

---

## ⚙️ Technology Stack & Architecture

- **Framework**: Next.js 15 (App Router, React 19, TypeScript)
- **Deployment Platform**: Cloudflare Pages (`@cloudflare/next-on-pages` Edge Runtime adapter)
- **Database & Auth**: Supabase (PostgreSQL, Service Role Admin, SSR Client)
- **AI Generation**: Gemini 2.0 Flash (`@google/genai` API)
- **Payments**: Stripe Checkout API
- **Emails**: Resend API
- **Styling**: Tailwind CSS v4, Motion (Framer Motion), Lucide Icons, Recharts

---

## 🎨 Design System & Color Psychology

- 🌌 **Midnight Obsidian (`#060A14`, `#0A0F1E`)**: Conveys military-grade security, stealth software, and high authority.
- 👑 **GeniuzLab Imperial Gold (`#C9A84C`, `#E6C875`)**: Signals high-ticket prestige and gold standard survival.
- 🚨 **Displacement Crimson (`#DC2626`, `#EF4444`)**: Triggers psychological urgency, risk alerts, and action drivers.
- 📜 **Editorial Cream White (`#F8F6F0`)**: High-contrast, crystal-clear typography matching world-class print publications (The Economist / FT).

---

## 📊 Complete Supported Professions (20 Sectors)

| Slug | Profession Name | Price | Automation Risk | 8K Cover Image |
|------|-----------------|-------|-----------------|----------------|
| `hair-salon` | Hair Salon Owner | £47 | 54% | `/images/guides/hair-salon.jpg` |
| `teacher` | Teacher | £29 | 27% | `/images/guides/teacher.jpg` |
| `photographer` | Photographer | £39 | 38% | `/images/guides/photographer.jpg` |
| `freelance-designer` | Freelance Designer | £39 | 35% | `/images/guides/freelance-designer.jpg` |
| `restaurant-owner` | Restaurant Owner | £69 | 73% | `/images/guides/restaurant-owner.jpg` |
| `accountant` | Accountant | £99 | 94% | `/images/guides/accountant.jpg` |
| `real-estate-agent` | Real Estate Agent | £59 | 86% | `/images/guides/real-estate-agent.jpg` |
| `dentist` | Dentist | £89 | 31% | `/images/guides/dentist.jpg` |
| `personal-trainer` | Personal Trainer | £29 | 35% | `/images/guides/personal-trainer.jpg` |
| `hotel-owner` | Hotel Owner | £129 | 68% | `/images/guides/hotel-owner.jpg` |
| `florist` | Florist | £39 | 61% | `/images/guides/florist.jpg` |
| `lawyer` | Lawyer | £149 | 23% | `/images/guides/lawyer.jpg` |
| `nurse` | Nurse | £29 | 29% | `/images/guides/nurse.jpg` |
| `plumber` | Plumber | £49 | 65% | `/images/guides/plumber.jpg` |
| `electrician` | Electrician | £49 | 63% | `/images/guides/electrician.jpg` |
| `marketing-manager` | Marketing Manager | £69 | 61% | `/images/guides/marketing-manager.jpg` |
| `virtual-assistant` | Virtual Assistant | £29 | 70% | `/images/guides/virtual-assistant.jpg` |
| `copywriter` | Copywriter | £49 | 55% | `/images/guides/copywriter.jpg` |
| `social-media-manager` | Social Media Manager | £49 | 58% | `/images/guides/social-media-manager.jpg` |
| `chef` | Chef | £49 | 43% | `/images/guides/chef.jpg` |

---

## 🗄️ Database Schemas (Supabase)

### 1. `professions` Table
```sql
CREATE TABLE professions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  price NUMERIC NOT NULL,
  automation_risk INT NOT NULL,
  industry_data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 2. `purchases` Table
```sql
CREATE TABLE purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_session_id TEXT UNIQUE NOT NULL,
  user_email TEXT NOT NULL,
  profession_slug TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 3. `guides` Table
```sql
CREATE TABLE guides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email TEXT NOT NULL,
  profession_slug TEXT NOT NULL,
  onboarding_hash TEXT UNIQUE NOT NULL,
  content JSONB NOT NULL,
  served_count INT DEFAULT 1,
  stripe_session_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 4. `report_leads` Table
```sql
CREATE TABLE report_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  profession_slug TEXT NOT NULL,
  answers JSONB NOT NULL,
  token TEXT UNIQUE NOT NULL,
  email_sequence_step INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 🔑 Environment Variables Checklist

Set these in **Cloudflare Pages → Settings → Environment Variables**:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Anon Public Key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Service Role Secret Key |
| `GEMINI_API_KEY` | Google Gemini API Key |
| `STRIPE_SECRET_KEY` | Stripe Secret API Key (`sk_live_...` or `sk_test_...`) |
| `STRIPE_WEBHOOK_SECRET` | Stripe Webhook Signing Secret |
| `RESEND_API_KEY` | Resend Email API Key |
| `APP_URL` | `https://guidr-empire.pages.dev` |

---

## 🚢 CI/CD Deployment Workflow

Whenever changes are made to the codebase:
1. Run local build check: `npx next build`
2. Execute PowerShell GitHub REST API push script:
   `powershell -ExecutionPolicy Bypass -File "C:\Users\nuwan\.gemini\antigravity\brain\56958070-d2ff-4f55-8046-40a4aacebfbc\scratch\push_to_github.ps1"`
3. Cloudflare Pages auto-triggers deployment via `npx @cloudflare/next-on-pages`.
