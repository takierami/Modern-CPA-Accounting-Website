# Deployment Guide - Sterling & Associates CPA Website (Vercel)

This guide provides detailed instructions for deploying your CPA website to **Vercel** with Supabase backend.

## Prerequisites Checklist

Before deploying, ensure you have:

- [ ] Node.js 18+ installed locally
- [ ] A Supabase account ([Sign up](https://supabase.com))
- [ ] A Vercel account ([Sign up](https://vercel.com))
- [ ] Git repository (GitHub, GitLab, or Bitbucket)
- [ ] Supabase CLI installed (`npm install -g supabase`)

## Step 1: Set Up Supabase Backend

### 1.1 Create Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Click **"New Project"**
3. Fill in:
   - **Name**: Sterling CPA Website
   - **Database Password**: (save this securely)
   - **Region**: Choose closest to your users
4. Click **"Create new project"** and wait for it to initialize

### 1.2 Get Your Supabase Credentials

1. In your Supabase project dashboard, go to **Settings > API**
2. Copy these values (you'll need them later):
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **Project Reference ID** (e.g., `xxxxx`)
   - **anon/public key** (starts with `eyJ...`)
   - **service_role key** (starts with `eyJ...`) - Keep this secret!

### 1.3 Deploy the Edge Function

The backend server must be deployed as a Supabase Edge Function:

```bash
# 1. Login to Supabase
supabase login

# 2. Link to your project
supabase link --project-ref YOUR_PROJECT_REF

# 3. Deploy the edge function
supabase functions deploy make-server-d900d137

# 4. Set the required environment variables for the function
supabase secrets set SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
supabase secrets set SUPABASE_ANON_KEY=YOUR_ANON_KEY
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
```

### 1.4 Verify Edge Function

Test the deployed function:

```bash
curl https://YOUR_PROJECT_REF.supabase.co/functions/v1/make-server-d900d137/health
```

You should see: `{"status":"healthy","timestamp":"..."}`

## Step 2: Prepare Your Code Repository

### 2.1 Initialize Git Repository

If you haven't already:

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Sterling CPA website"

# Create repository on GitHub/GitLab/Bitbucket and push
git remote add origin YOUR_REPO_URL
git branch -M main
git push -u origin main
```

### 2.2 Verify Required Files

Ensure these files exist in your repository:
- `vercel.json` - Vercel configuration
- `.gitignore` - Prevents committing sensitive files
- `.env.example` - Template for environment variables
- `package.json` - Project dependencies
- `README.md` - Project documentation

## Step 3: Deploy to Vercel

### Method A: Deploy via Vercel Dashboard (Recommended for beginners)

1. **Login to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Sign in with GitHub, GitLab, or Bitbucket

2. **Import Your Project**
   - Click **"Add New..." > "Project"**
   - Select **"Import Git Repository"**
   - Authorize Vercel to access your repositories
   - Select your CPA website repository
   - Click **"Import"**

3. **Configure Project Settings**
   
   Vercel should auto-detect the framework. Verify these settings:
   - **Framework Preset**: Vite (or leave as "Other")
   - **Root Directory**: `./` (leave empty)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
   - **Node Version**: 18.x

4. **Add Environment Variables**
   
   Before deploying, expand **"Environment Variables"** and add:
   
   | Key | Value | Environment |
   |-----|-------|------------|
   | `VITE_SUPABASE_URL` | Your Supabase project URL | Production, Preview, Development |
   | `VITE_SUPABASE_ANON_KEY` | Your Supabase anon key | Production, Preview, Development |

   **Important**: Check all three environment boxes (Production, Preview, Development) for each variable.

5. **Deploy**
   - Click **"Deploy"**
   - Vercel will build and deploy your site (takes 1-2 minutes)
   - Once complete, you'll get a URL like `https://your-project.vercel.app`

### Method B: Deploy via Vercel CLI (For developers)

```bash
# 1. Install Vercel CLI globally
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy to preview (draft) first
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (choose your account/team)
# - Link to existing project? N
# - Project name? (accept default or enter custom)
# - In which directory is your code located? ./
# - Want to override settings? N

# 4. Set environment variables
vercel env add VITE_SUPABASE_URL
# Paste your Supabase URL when prompted
# Select: Production, Preview, Development (all three)

vercel env add VITE_SUPABASE_ANON_KEY
# Paste your Supabase anon key when prompted
# Select: Production, Preview, Development (all three)

# 5. Deploy to production
vercel --prod
```

### Method C: Automatic Git Deployments (Recommended)

Once connected via Method A or B, Vercel automatically:
- **Deploys to production** when you push to `main` branch
- **Creates preview deployments** for pull requests
- **Runs CI/CD checks** on every commit

```bash
# Make changes and push
git add .
git commit -m "Update design"
git push origin main

# Vercel automatically deploys to production
```

## Step 4: Configure Custom Domain (Optional)

### 4.1 Add Custom Domain in Vercel

1. In Vercel dashboard, go to your project
2. Click **"Settings"** > **"Domains"**
3. Click **"Add"** and enter your domain (e.g., `sterlingcpa.com`)
4. Click **"Add"**

### 4.2 Update DNS Records

Vercel will show you which DNS records to add. In your domain registrar:

**For apex domain (sterlingcpa.com):**
- Type: `A`
- Name: `@`
- Value: `76.76.21.21` (Vercel's IP)

**For www subdomain:**
- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com`

### 4.3 Wait for DNS Propagation

1. DNS propagation typically takes 1-24 hours
2. Vercel automatically provisions SSL certificate
3. HTTPS is automatically enabled
4. You'll see a green checkmark when domain is ready

## Step 5: Post-Deployment Verification

### 5.1 Test Core Functionality

Visit your deployed site and verify:

- [ ] Site loads without errors
- [ ] All sections render correctly (Hero, Services, Industries, Team, Contact)
- [ ] Navigation works smoothly
- [ ] Forms are accessible
- [ ] Images load properly
- [ ] Responsive design works on mobile

### 5.2 Test Form Functionality

**Consultation Form:**
1. Click "Schedule Consultation" button
2. Fill out Step 1 and navigate to Step 2
3. Close the form
4. Reopen - verify your data is saved
5. Complete all steps and submit
6. Verify success message appears

**Client Intake Form:**
1. Click "Start Client Intake" button
2. Fill out multiple steps
3. Test auto-save by refreshing the page
4. Complete and submit the form
5. Verify success confirmation

### 5.3 Check Backend Connection

Open browser DevTools (F12) > Console and verify:
- No CORS errors
- API calls to Supabase are successful
- Forms are saving data properly

Test the health endpoint:
```bash
curl https://YOUR_PROJECT_REF.supabase.co/functions/v1/make-server-d900d137/health
```

### 5.4 Test Preview Deployments

Create a test branch:
```bash
git checkout -b test-feature
# Make a small change
git commit -am "Test preview deployment"
git push origin test-feature
```

Vercel will create a preview URL for this branch. Test it before merging to main.

## Step 6: Monitoring and Analytics

### 6.1 Vercel Analytics

1. Go to your project in Vercel dashboard
2. Click **"Analytics"** tab
3. View real-time performance metrics:
   - Page views
   - Unique visitors
   - Top pages
   - Referrers
   - Devices

### 6.2 Web Vitals

Vercel automatically tracks Core Web Vitals:
- **LCP** (Largest Contentful Paint)
- **FID** (First Input Delay)
- **CLS** (Cumulative Layout Shift)

View these in: **Project > Analytics > Web Vitals**

### 6.3 Supabase Monitoring

1. Go to your Supabase dashboard
2. Check **Database > Logs** for any errors
3. Monitor **Edge Functions > Logs** for API errors
4. Check **Edge Functions > Metrics** for invocation stats

### 6.4 Deploy Notifications

Set up notifications in Vercel:
1. Go to **Project Settings > Notifications**
2. Connect Slack, Discord, or Email
3. Get notified for:
   - Deployment started
   - Deployment succeeded
   - Deployment failed
   - Domain configured

## Step 7: Performance Optimization

### 7.1 Enable Vercel Features

**Automatic Optimizations** (enabled by default):
- Image optimization (via `<Image>` component)
- Edge caching for static assets
- Gzip/Brotli compression
- HTTP/2 and HTTP/3 support

**Speed Insights**:
1. Go to **Project Settings > Speed Insights**
2. Enable Speed Insights
3. Add `@vercel/speed-insights` package (optional for more data)

### 7.2 Configure Caching

Headers are already configured in `vercel.json` for:
- Long-term caching on static assets (1 year)
- Security headers (CSP, X-Frame-Options, etc.)

### 7.3 Edge Network

Vercel automatically distributes your site globally across 100+ edge locations for fast access worldwide.

## Troubleshooting

### Issue: Build Fails on Vercel

**Solution:**
1. Check build logs in Vercel dashboard
2. Verify `package.json` has correct scripts:
   ```json
   {
     "scripts": {
       "dev": "vite",
       "build": "vite build",
       "preview": "vite preview"
     }
   }
   ```
3. Ensure Node version is 18+ in project settings
4. Check for missing dependencies: `npm install`

### Issue: Forms Not Saving Data

**Solution:**
1. Verify environment variables are set correctly in Vercel (Production & Preview)
2. Check that variables are prefixed with `VITE_`
3. Redeploy after adding environment variables
4. Check Supabase Edge Function is deployed and running
5. Open browser console and check for CORS errors

### Issue: 404 Errors on Page Refresh

**Solution:**
- This should be handled by `vercel.json` rewrites
- Verify `vercel.json` exists in repository root
- Check rewrites configuration:
  ```json
  {
    "rewrites": [
      { "source": "/(.*)", "destination": "/index.html" }
    ]
  }
  ```

### Issue: Environment Variables Not Working

**Solution:**
1. Ensure variables are prefixed with `VITE_` (required for Vite)
2. Variables must be added before build time
3. Redeploy project after adding variables
4. Check variable names match exactly (case-sensitive)
5. Verify variables are enabled for the right environment (Production/Preview)

### Issue: Images Not Loading

**Solution:**
1. Check browser console for 404 errors
2. Verify image URLs are accessible
3. Check Unsplash API isn't rate limited
4. Verify `ImageWithFallback` component is working
5. Check Vercel function logs for errors

### Issue: Deployment Takes Too Long

**Solution:**
1. Check for large `node_modules` - consider using `.vercelignore`
2. Optimize dependencies in `package.json`
3. Use Vercel's build cache (automatically enabled)
4. Check for infinite loops in build scripts

## Security Checklist

- [ ] `.env` files are in `.gitignore` (never commit secrets)
- [ ] Only `SUPABASE_ANON_KEY` is used in frontend (never use service_role key)
- [ ] HTTPS is automatically enforced by Vercel
- [ ] Environment variables are set in Vercel dashboard (not hardcoded)
- [ ] Security headers are configured in `vercel.json`
- [ ] Supabase Row Level Security is configured (if using database tables)

## Vercel Features

### Preview Deployments

Every push to a branch creates a unique preview URL:
- Test changes before merging to production
- Share with team/clients for feedback
- Automatic cleanup of old previews

### Serverless Functions (Optional)

If you need backend API routes:
1. Create `/api` folder in project root
2. Add serverless functions (e.g., `/api/hello.js`)
3. Automatically deployed with your app

### Edge Functions (Optional)

For ultra-low latency:
1. Create `/middleware.ts` for edge logic
2. Runs at the edge before requests reach your app
3. Useful for A/B testing, redirects, auth

## Costs

**Free Tier Limits (Vercel Hobby):**
- Unlimited deployments
- 100 GB bandwidth/month
- Automatic HTTPS
- Preview deployments
- Web Analytics
- 100 hours serverless function execution

**Supabase Free Tier:**
- 500 MB database space
- 1 GB file storage
- 2 GB bandwidth/month
- 500K Edge Function invocations

For most portfolio projects, free tiers are sufficient.

## Comparing Vercel vs Netlify

| Feature | Vercel | Netlify |
|---------|--------|---------|
| Build Speed | ⚡ Faster | ✓ Fast |
| Edge Network | 100+ locations | 100+ locations |
| Preview Deploys | ✓ Yes | ✓ Yes |
| Custom Domains | ✓ Unlimited | ✓ Unlimited |
| Serverless Functions | ✓ Yes | ✓ Yes |
| Analytics | ✓ Built-in | ✓ Paid add-on |
| Form Handling | Manual | ✓ Built-in |
| Split Testing | ✓ Yes | ✓ Yes |

**Choose Vercel if:**
- You want fastest build times
- You prefer Next.js or Vite projects
- You need edge functions
- You want built-in analytics

**Choose Netlify if:**
- You need built-in form handling
- You prefer more traditional hosting
- You want simpler configuration

## Next Steps

1. **Add Web Analytics** - Enable Vercel Analytics or Google Analytics
2. **Set Up Monitoring** - Add error tracking (Sentry, LogRocket)
3. **Configure SEO** - Add meta tags, sitemap, robots.txt
4. **Performance Testing** - Use Lighthouse, PageSpeed Insights
5. **Add CI/CD Tests** - Run tests before deployment

## Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Vercel Community**: https://github.com/vercel/vercel/discussions
- **Supabase Discord**: https://discord.supabase.com
- **Vercel Status**: https://vercel-status.com

---

**Congratulations!** Your CPA website is now live on Vercel and ready to showcase in your portfolio. 🎉

## Quick Reference Commands

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View deployment logs
vercel logs

# List all deployments
vercel list

# Pull environment variables
vercel env pull

# Remove a deployment
vercel remove [deployment-url]
```
