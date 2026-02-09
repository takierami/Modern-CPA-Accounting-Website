# Vercel Deployment Guide - Sterling & Associates CPA Website

## Overview

This project is configured for deployment on **Vercel** with a **Supabase** backend. The application uses:
- **Frontend**: Vite + React + TypeScript
- **Backend**: Vercel Serverless Functions (in `/api` directory)
- **Database**: Supabase (PostgreSQL)
- **Forms**: Consultation and Client Intake forms with auto-save

## Quick Start

### 1. Prerequisites

- Node.js 18+ installed
- Vercel account ([Sign up](https://vercel.com))
- Supabase account ([Sign up](https://supabase.com))
- Git repository (GitHub, GitLab, or Bitbucket)

### 2. Supabase Setup

#### Create Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Click **"New Project"**
3. Fill in project details and create

#### Get Credentials

From your Supabase project dashboard (**Settings > API**):
- **Project URL**: `https://xxxxx.supabase.co`
- **Anon/Public Key**: `eyJ...` (starts with eyJ)

#### Create Database Tables

Run these SQL commands in the Supabase SQL Editor:

```sql
-- Consultation submissions table
CREATE TABLE consultations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  form_id TEXT NOT NULL,
  data JSONB NOT NULL,
  status TEXT DEFAULT 'submitted',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Consultation drafts table (for auto-save)
CREATE TABLE consultation_drafts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  form_id TEXT UNIQUE NOT NULL,
  current_step INTEGER,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Client intake submissions table
CREATE TABLE client_intakes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  data JSONB NOT NULL,
  status TEXT DEFAULT 'submitted',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_consultations_created ON consultations(created_at DESC);
CREATE INDEX idx_consultation_drafts_form_id ON consultation_drafts(form_id);
CREATE INDEX idx_client_intakes_created ON client_intakes(created_at DESC);
```

### 3. Deploy to Vercel

#### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Import Project**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click **"Add New..." > "Project"**
   - Import your Git repository

2. **Configure Project**
   - **Framework Preset**: Vite
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

3. **Add Environment Variables**
   
   Click **"Environment Variables"** and add:
   
   | Variable | Value | Environment |
   |----------|-------|-------------|
   | `VITE_SUPABASE_URL` | Your Supabase URL | Production, Preview, Development |
   | `VITE_SUPABASE_ANON_KEY` | Your Supabase anon key | Production, Preview, Development |
   | `SUPABASE_URL` | Your Supabase URL | Production, Preview, Development |
   | `SUPABASE_ANON_KEY` | Your Supabase anon key | Production, Preview, Development |

   **Important**: Check all three environment boxes for each variable.

4. **Deploy**
   - Click **"Deploy"**
   - Wait 1-2 minutes for build to complete
   - Your site will be live at `https://your-project.vercel.app`

#### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Set environment variables
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
vercel env add SUPABASE_URL
vercel env add SUPABASE_ANON_KEY

# Deploy to production
vercel --prod
```

### 4. Verify Deployment

Visit your deployed site and test:

- ✅ Site loads without errors
- ✅ All sections render (Hero, Services, Industries, Team, Contact)
- ✅ Navigation works
- ✅ Forms are accessible
- ✅ Consultation form auto-save works
- ✅ Form submissions succeed

## Project Structure

```
.
├── api/                          # Vercel Serverless Functions
│   ├── consultation/
│   │   ├── [id].ts              # GET/DELETE draft by ID
│   │   ├── save.ts              # POST save draft
│   │   └── submit.ts            # POST submit consultation
│   └── intake/
│       └── submit.ts            # POST submit intake form
├── src/
│   ├── components/              # React components
│   │   ├── ConsultationForm.tsx # Multi-step consultation form
│   │   ├── ClientIntakeForm.tsx # Multi-step intake form
│   │   └── ...
│   ├── utils/
│   │   └── supabase-client.ts   # Supabase client setup
│   └── ...
├── vercel.json                  # Vercel configuration
├── package.json
└── vite.config.ts
```

## API Endpoints

All API endpoints are serverless functions deployed to Vercel:

### Consultation Endpoints

- **POST** `/api/consultation/submit` - Submit consultation form
- **POST** `/api/consultation/save` - Save draft (auto-save)
- **GET** `/api/consultation/:id` - Get saved draft
- **DELETE** `/api/consultation/:id` - Delete draft after submission

### Intake Endpoint

- **POST** `/api/intake/submit` - Submit client intake form

## Environment Variables

### Frontend (VITE_ prefix)

- `VITE_SUPABASE_URL` - Supabase project URL (used in browser)
- `VITE_SUPABASE_ANON_KEY` - Supabase anon key (used in browser)

### Backend (API functions)

- `SUPABASE_URL` - Supabase project URL (used in serverless functions)
- `SUPABASE_ANON_KEY` - Supabase anon key (used in serverless functions)

## Custom Domain Setup

1. **Add Domain in Vercel**
   - Go to **Project Settings > Domains**
   - Click **"Add"**
   - Enter your domain (e.g., `sterlingcpa.com`)

2. **Update DNS Records**
   
   In your domain registrar:
   
   **For apex domain:**
   - Type: `A`
   - Name: `@`
   - Value: `76.76.21.21`
   
   **For www subdomain:**
   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com`

3. **Wait for DNS propagation** (1-24 hours)
4. Vercel automatically provisions SSL certificate

## Troubleshooting

### Build Fails

**Check:**
- Node version is 18+ in Vercel project settings
- All dependencies are in `package.json`
- Build logs in Vercel dashboard for specific errors

### Forms Not Working

**Check:**
1. Environment variables are set correctly (both `VITE_` and non-prefixed versions)
2. Supabase tables are created
3. Browser console for API errors
4. Network tab for failed requests

### CORS Errors

The API routes are on the same domain as the frontend, so CORS shouldn't be an issue. If you see CORS errors:
- Verify API routes are deployed (check `/api/consultation/submit` in browser)
- Check Vercel function logs

### Environment Variables Not Working

**Solution:**
1. Ensure variables are added before deployment
2. Redeploy after adding variables
3. Check variable names match exactly (case-sensitive)
4. Verify both `VITE_` and non-prefixed versions are set

## Monitoring

### Vercel Analytics

1. Go to **Project > Analytics**
2. View real-time metrics:
   - Page views
   - Unique visitors
   - Top pages
   - Performance metrics

### Vercel Function Logs

1. Go to **Project > Functions**
2. Click on a function to view logs
3. Monitor for errors or performance issues

### Supabase Monitoring

1. Go to Supabase Dashboard
2. Check **Database > Logs** for errors
3. Monitor **Database > Table Editor** to view submissions

## Performance

Vercel automatically provides:
- ✅ Global CDN (100+ edge locations)
- ✅ Automatic HTTPS
- ✅ Image optimization
- ✅ Gzip/Brotli compression
- ✅ HTTP/2 and HTTP/3
- ✅ Edge caching for static assets

## Security

- ✅ HTTPS enforced automatically
- ✅ Environment variables stored securely
- ✅ Only anon key exposed to frontend (safe)
- ✅ Security headers configured in `vercel.json`
- ✅ No service role key in frontend code

## Costs

### Vercel Free Tier
- Unlimited deployments
- 100 GB bandwidth/month
- Automatic HTTPS
- Preview deployments
- 100 hours serverless function execution

### Supabase Free Tier
- 500 MB database space
- 1 GB file storage
- 2 GB bandwidth/month
- 500K Edge Function invocations

**For most projects, free tiers are sufficient.**

## Continuous Deployment

Vercel automatically deploys when you push to your repository:

```bash
# Make changes
git add .
git commit -m "Update design"
git push origin main

# Vercel automatically builds and deploys
```

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Vercel Community**: https://github.com/vercel/vercel/discussions
- **Supabase Discord**: https://discord.supabase.com

---

**Your CPA website is now ready for deployment on Vercel!** 🚀
