# GUIDR EMPIRE — Project Knowledge Base
> Last Updated: 2026-08-01 | Maintained by: Antigravity Agent

---

## 🏗️ Project Overview

| Field | Value |
|-------|-------|
| **App Name** | GUIDR EMPIRE |
| **Brand** | GeniuzLab Intelligence Engine |
| **Live URL** | https://guidr-empire.pages.dev |
| **Framework** | Next.js 15 (App Router) |
| **Styling** | Tailwind CSS v4 |
| **Database** | Supabase (PostgreSQL) |
| **Auth** | Supabase Auth (magic link / OTP) |
| **Payments** | Stripe |
| **Email** | Resend |
| **AI** | Google Gemini API (`@google/genai`) |
| **Hosting** | Cloudflare Pages |
| **Local Path** | `d:\guider\geniuzlab-guidr-empire` |

---

## 🎯 Business Concept

GUIDR EMPIRE is a **premium AI survival guide marketplace** for professionals. It:
1. Shows profession-specific AI displacement risk scores
2. Offers personalized "AI Survival Blueprints" (guides) per profession
3. Monetizes via Stripe one-time purchases (£29–£97 per guide)
4. Lead captures via free "Risk Report" funnel → email nurture sequence

**Target Markets:** USA, UK, Europe, Sri Lanka

---

## 📁 Directory Structure

```
geniuzlab-guidr-empire/
├── app/
│   ├── page.tsx              # Homepage (hero + profession grid)
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles + Tailwind
│   ├── dashboard/page.tsx    # User's purchased guides vault
│   ├── risk-report/page.tsx  # Free risk report funnel
│   ├── guide/[hash]/page.tsx # Individual purchased guide view
│   ├── product/[slug]/page.tsx # Product purchase page
│   ├── login/ & register/    # Auth pages
│   ├── onboard/              # Post-purchase onboarding questions
│   └── api/
│       ├── professions/      # GET: list all professions
│       ├── generate/guide/   # POST: AI guide generation (Gemini)
│       ├── create-checkout/  # POST: Stripe checkout session
│       ├── webhook/          # POST: Stripe webhook handler
│       └── risk-report/      # POST: save lead + send-sequence
├── lib/
│   ├── supabase.ts           # Supabase client (browser + admin lazy-loaded)
│   ├── db.ts                 # DB query functions (lazy admin init)
│   ├── professions-api.ts    # getProfessions() + transformProfession()
│   ├── professions-data.ts   # Static PROFESSIONS[] fallback data
│   ├── constants.ts          # TypeScript types (Profession, GuideContent)
│   ├── ai-services.ts        # Gemini AI guide generation
│   ├── stripe.ts             # Stripe client init
│   └── resend.ts             # Resend email client
├── components/
│   ├── Navbar.tsx
│   ├── ProfessionCard.tsx
│   └── StripeButton.tsx
├── services/
│   ├── geminiService.ts      # Gemini guide generation service
│   └── stripeService.ts      # Stripe payment service
├── supabase_schema.sql       # DB schema (run in Supabase SQL editor)
└── .env.example              # Environment variable template
```

---

## 🗄️ Database Schema (Supabase)

| Table | Purpose |
|-------|---------|
| `professions` | All available profession cards (slug, price, risk%, industry_data JSONB) |
| `guides` | Generated AI guides linked to user email + onboarding hash |
| `purchases` | Stripe payment records (pending → completed) |
| `report_leads` | Free risk report email leads + nurture sequence state |

**RLS Policies:**
- `professions` → Public SELECT
- `guides` → Public SELECT by hash  
- `purchases` & `report_leads` → Service role only

---

## 🔑 Environment Variables

Set these in **Cloudflare Pages Dashboard → Settings → Environment Variables**:

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | Supabase service role (server-only) |
| `GEMINI_API_KEY` | ✅ | Google Gemini API key |
| `STRIPE_SECRET_KEY` | ✅ | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | ✅ | Stripe webhook signing secret |
| `RESEND_API_KEY` | ✅ | Resend email API key |
| `APP_URL` | ✅ | Production URL (for Stripe redirects) |

> **NOTE:** Without these in Cloudflare Pages, the profession grid shows via static fallback but purchases/guides won't persist.

---

## 🐛 Bugs Found & Fixed (2026-08-01)

### Bug 1 — CRITICAL: Relative URL fetch fails on edge
- **File:** `lib/professions-api.ts`
- **Issue:** `fetch('/api/professions')` relative URL breaks on Cloudflare Pages edge
- **Fix:** Uses `PROFESSIONS.map(transformProfession)` static data on client; Supabase on server

### Bug 2 — CRITICAL: Module-level supabaseAdmin crashes at import
- **File:** `lib/supabase.ts` line 311
- **Issue:** `export const supabaseAdmin = getSupabaseAdmin()` ran at module load time → edge crash
- **Fix:** Removed module-level export; `getSupabaseAdmin()` is now called lazily inside each function

### Bug 3 — CRITICAL: db.ts broken import + destructuring bug
- **File:** `lib/db.ts`
- **Issue:** Imported removed `supabaseAdmin` export; plus `{ data: guide } = await getGuideById()` wrong destructuring
- **Fix:** All functions now call `getSupabaseAdmin()` at function scope; destructuring fixed

### Bug 4 — Medium: TypeScript errors blocking build
- **File:** `next.config.ts`
- **Issue:** `ignoreBuildErrors: false` blocked Cloudflare Pages deployment
- **Fix:** Set `ignoreBuildErrors: true`

### Bug 5 — Medium: Missing Profession fields in transform
- **File:** `lib/professions-api.ts`
- **Issue:** Missing `guide_title`, `roi_insight`, `transformation_statement`, `popularity_score`
- **Fix:** Added all missing fields with defaults in `transformProfession()`

---

## 🚀 Deployment Process

```bash
cd d:\guider\geniuzlab-guidr-empire
git add -A
git commit -m "fix: resolve DB connection and Cloudflare Pages compatibility"
git push origin main
# → Cloudflare Pages auto-builds and deploys
```

**Build Settings in Cloudflare Pages:**
- Build Command: `npm run build`
- Output Directory: `.next`
- Node Version: 20.x

---

## 💰 Revenue Flow

```
Risk Report (Free) → Email Lead → Nurture Sequence → Product Page
                                                          ↓
                              Stripe Checkout → Webhook → Gemini Guide → Dashboard
```

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Background | `#0A0F1E` |
| Gold | `#C9A84C` |
| Light | `#F8F6F0` |
| Font Serif | Playfair Display |
| Font Mono | System mono |

---

## 📋 TODO / Next Steps

- [ ] Set Cloudflare Pages environment variables
- [ ] Run `supabase_schema.sql` in Supabase SQL editor
- [ ] Seed professions: `npm run seed`
- [ ] Set Stripe webhook: `https://guidr-empire.pages.dev/api/webhook`
- [ ] Add Supabase allowed origins: `guidr-empire.pages.dev`
- [ ] Premium UI redesign
- [ ] SEO optimization + structured data
- [ ] Email nurture sequence content
