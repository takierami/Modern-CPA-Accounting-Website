# Deployment Guide - Sterling & Associates CPA Website

This guide provides detailed instructions for deploying your CPA website to Netlify with Supabase backend.

## Prerequisites Checklist

Before deploying, ensure you have:

- [ ] Node.js 18+ installed locally
- [ ] A Supabase account ([Sign up](https://supabase.com))
- [ ] A Netlify account ([Sign up](https://netlify.com))
- [ ] Git repository (GitHub, GitLab, or Bitbucket)
- [ ] Supabase CLI installed (\`npm install -g supabase\`)

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
   - **Project URL** (e.g., \`https://xxxxx.supabase.co\`)
   - **Project Reference ID** (e.g., \`xxxxx\`)
   - **anon/public key** (starts with \`eyJ...\`)
   - **service_role key** (starts with \`eyJ...\`) - Keep this secret!

### 1.3 Deploy the Edge Function

The backend server must be deployed as a Supabase Edge Function:

\`\`\`bash
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
\`\`\`

### 1.4 Verify Edge Function

Test the deployed function:

\`\`\`bash
curl https://YOUR_PROJECT_REF.supabase.co/functions/v1/make-server-d900d137/health
\`\`\`

You should see: \`{"status":"healthy","timestamp":"..."}\`

## Step 2: Prepare Your Code Repository

### 2.1 Initialize Git Repository

If you haven't already:

\`\`\`bash
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
\`\`\`

### 2.2 Verify Required Files

Ensure these files exist in your repository:
- \`netlify.toml\` - Netlify configuration
- \`.gitignore\` - Prevents committing sensitive files
- \`.env.example\` - Template for environment variables
- \`package.json\` - Project dependencies
- \`README.md\` - Project documentation

## Step 3: Deploy to Netlify

### Method A: Deploy via Netlify UI (Recommended for beginners)

1. **Login to Netlify**
   - Go to [Netlify](https://app.netlify.com)
   - Sign in or create an account

2. **Import Your Project**
   - Click **"Add new site"** > **"Import an existing project"**
   - Choose your Git provider (GitHub/GitLab/Bitbucket)
   - Authorize Netlify to access your repositories
   - Select your CPA website repository

3. **Configure Build Settings**
   
   Netlify should auto-detect settings from \`netlify.toml\`:
   - **Base directory**: (leave empty)
   - **Build command**: \`npm run build\`
   - **Publish directory**: \`dist\`
   - **Node version**: 18

4. **Add Environment Variables**
   
   Before deploying, click **"Show advanced"** > **"New variable"** and add:
   
   | Key | Value | Example |
   |-----|-------|---------|
   | \`VITE_SUPABASE_URL\` | Your Supabase project URL | \`https://xxxxx.supabase.co\` |
   | \`VITE_SUPABASE_ANON_KEY\` | Your Supabase anon key | \`eyJhbGc...\` |

5. **Deploy Site**
   - Click **"Deploy site"**
   - Netlify will build and deploy your site (takes 2-3 minutes)
   - Once complete, you'll get a URL like \`https://random-name-123456.netlify.app\`

### Method B: Deploy via Netlify CLI (For developers)

\`\`\`bash
# 1. Install Netlify CLI globally
npm install -g netlify-cli

# 2. Login to Netlify
netlify login

# 3. Initialize the site
netlify init

# Follow the prompts:
# - Create & configure a new site
# - Choose your team
# - Enter a site name (or accept generated name)
# - Build command: npm run build
# - Publish directory: dist

# 4. Set environment variables
netlify env:set VITE_SUPABASE_URL "https://YOUR_PROJECT_REF.supabase.co"
netlify env:set VITE_SUPABASE_ANON_KEY "YOUR_ANON_KEY"

# 5. Deploy to production
netlify deploy --prod

# Alternative: Deploy to draft URL first to test
netlify deploy
# If everything looks good, deploy to production
netlify deploy --prod
\`\`\`

## Step 4: Configure Custom Domain (Optional)

### 4.1 Add Custom Domain in Netlify

1. In Netlify dashboard, go to **Site settings > Domain management**
2. Click **"Add custom domain"**
3. Enter your domain (e.g., \`sterlingcpa.com\`)
4. Click **"Verify"** then **"Add domain"**

### 4.2 Update DNS Records

In your domain registrar (GoDaddy, Namecheap, etc.):

**For apex domain (sterlingcpa.com):**
- Type: \`A\`
- Name: \`@\`
- Value: \`75.2.60.5\` (Netlify's load balancer)

**For www subdomain:**
- Type: \`CNAME\`
- Name: \`www\`
- Value: \`your-site-name.netlify.app\`

### 4.3 Enable HTTPS

1. Wait for DNS to propagate (can take up to 24 hours)
2. In Netlify, go to **Site settings > Domain management > HTTPS**
3. Click **"Verify DNS configuration"**
4. Once verified, Netlify will automatically provision SSL certificate
5. Enable **"Force HTTPS"** to redirect all HTTP traffic

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
\`\`\`bash
curl https://YOUR_PROJECT_REF.supabase.co/functions/v1/make-server-d900d137/health
\`\`\`

## Step 6: Monitoring and Maintenance

### 6.1 Set Up Monitoring

**Netlify Analytics:**
1. Go to **Site settings > Analytics**
2. Enable analytics to track visitors

**Supabase Monitoring:**
1. Go to your Supabase dashboard
2. Check **Database > Logs** for any errors
3. Monitor **Edge Functions > Logs** for API errors

### 6.2 Enable Deploy Notifications

1. In Netlify, go to **Site settings > Build & deploy > Deploy notifications**
2. Add notifications for:
   - Deploy succeeded
   - Deploy failed
   - Deploy started

### 6.3 Continuous Deployment

Netlify automatically deploys when you push to your main branch:

\`\`\`bash
# Make changes to your code
git add .
git commit -m "Update team photos"
git push origin main

# Netlify will automatically build and deploy
\`\`\`

## Troubleshooting

### Issue: Build Fails on Netlify

**Solution:**
1. Check build logs in Netlify dashboard
2. Verify \`package.json\` has correct scripts
3. Ensure Node version is 18+ in build settings
4. Check for missing dependencies

### Issue: Forms Not Saving Data

**Solution:**
1. Verify environment variables are set correctly in Netlify
2. Check Supabase Edge Function is deployed and running
3. Open browser console and check for CORS errors
4. Verify Supabase credentials are correct

### Issue: 404 Errors on Page Refresh

**Solution:**
- This should be handled by \`netlify.toml\` redirects
- Verify \`netlify.toml\` exists in your repository
- Check Netlify dashboard > **Site settings > Build & deploy > Post processing** > Ensure "Asset optimization" isn't breaking redirects

### Issue: Images Not Loading

**Solution:**
1. Check browser console for 404 errors
2. Verify image URLs are accessible
3. Check Unsplash API isn't rate limited
4. Verify \`ImageWithFallback\` component is working

### Issue: Environment Variables Not Working

**Solution:**
1. Ensure variables are prefixed with \`VITE_\` (required for Vite)
2. Rebuild and redeploy after adding new variables
3. Check variable names match exactly (case-sensitive)
4. Clear browser cache

## Security Checklist

- [ ] \`.env\` files are in \`.gitignore\` (never commit secrets)
- [ ] Only \`SUPABASE_ANON_KEY\` is used in frontend (never use service_role key)
- [ ] HTTPS is enforced on custom domain
- [ ] Environment variables are set in Netlify (not hardcoded)
- [ ] Supabase Row Level Security is configured (if using database tables)

## Performance Optimization

### Enable Netlify Features

1. **Asset Optimization**
   - Go to **Site settings > Build & deploy > Post processing**
   - Enable "Bundle CSS" and "Minify JS"

2. **Prerendering**
   - Already configured in \`netlify.toml\`
   - Improves SEO and initial load time

3. **CDN Caching**
   - Automatically enabled for static assets
   - Configured in \`netlify.toml\` headers

## Costs

**Free Tier Limits:**

**Netlify:**
- 100 GB bandwidth/month
- 300 build minutes/month
- Automatic HTTPS
- Continuous deployment

**Supabase:**
- 500 MB database space
- 1 GB file storage
- 2 GB bandwidth/month
- 500K Edge Function invocations

For most portfolio projects, free tiers are sufficient.

## Next Steps

1. **Add Google Analytics** - Track visitor behavior
2. **Set Up Contact Email** - Forward form submissions to email
3. **Configure SEO** - Add meta tags, sitemap, robots.txt
4. **Add Monitoring** - Set up error tracking (Sentry, LogRocket)
5. **Performance Testing** - Use Lighthouse, PageSpeed Insights

## Support Resources

- **Netlify Docs**: https://docs.netlify.com
- **Supabase Docs**: https://supabase.com/docs
- **Netlify Community**: https://answers.netlify.com
- **Supabase Discord**: https://discord.supabase.com

---

**Congratulations!** Your CPA website is now live and ready to showcase in your portfolio. 🎉
