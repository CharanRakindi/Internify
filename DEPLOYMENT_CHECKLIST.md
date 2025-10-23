# Netlify Deployment Checklist - Complete Guide

## Pre-Deployment: Gather Your Credentials

Before deploying to Netlify, you need to collect three pieces of information:

### 1. Get Supabase URL
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click **Settings** (gear icon) → **API**
4. Copy the **"Project URL"** 
   - Format: `https://xxxxx.supabase.co`
5. Save this value

### 2. Get Supabase Anon Key
1. In the same **Settings → API** page
2. Look for **"Project API keys"**
3. Copy the **`anon` / `public` key** (NOT the service_role key)
   - It starts with `eyJ...` (JWT format)
   - Should be 100+ characters long
4. Save this value

### 3. Get Google Gemini API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to **APIs & Services** → **Credentials**
4. Find your API key (or create one)
5. Copy the API key
   - Format: `AIza...`
6. Save this value

---

## Deployment Steps

### Step 1: Connect GitHub Repository to Netlify
1. Go to [Netlify](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Select **GitHub** as your Git provider
4. Authorize Netlify to access your GitHub account
5. Select the repository: **CharanRakindi/Internify**
6. Click **"Deploy site"**
   - (Deployment will fail on first attempt - that's normal, we need to add env vars first)

### Step 2: Add Environment Variables to Netlify ⚠️ CRITICAL
1. Go to your Netlify site dashboard
2. Click on **"Site Settings"**
3. Go to **Build & Deploy** → **Environment**
4. Click **"Edit variables"** or **"Add environment variable"**
5. Add the following three variables:

| Variable Name | Value | Example |
|---------------|-------|---------|
| `SUPABASE_URL` | Your Supabase URL | `https://bwjdnlfjexnnyeepkrnd.supabase.co` |
| `SUPABASE_ANON_KEY` | Your Supabase anon key | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| `GEMINI_API_KEY` | Your Google Gemini API key | `AIzaSyAn5KBhKoZCQfJK2EKdSAyNDDqo011uBY8` |

**IMPORTANT Guidelines:** 
- ✅ Use these EXACT variable names (case-sensitive)
- ❌ DO NOT use `VITE_` prefix in Netlify settings (only for local .env)
- ❌ DO NOT commit these to GitHub
- ✅ Netlify will automatically expose them during build
- ✅ Values will be embedded in the JavaScript bundle during build

### Step 3: Trigger a New Deploy ⚠️ CRITICAL
1. In Netlify dashboard, click **"Deploys"** tab
2. Click **"Trigger deploy"** → **"Deploy site"**
3. Wait for the build to complete (usually 1-2 minutes)
4. Check the build status:
   - ✅ Green checkmark = Success
   - ❌ Red X = Failed (check logs for errors)

### Step 4: Verify the Deployment
1. Wait for deploy to complete
2. Click the deployment to view the live site
3. Open the site URL
4. Open DevTools (F12 or Cmd+Option+I)
5. Check the **Console** tab for errors
6. Expected results:
   - ✅ If you see the internship form → Authentication is working!
   - ❌ If you see "Authentication is currently disabled" → env vars not set
   - ❌ If you see "Invalid supabaseUrl" → env var value is wrong

---

## 🔍 Build Logs & Debugging

If your build fails, check the logs:

1. Go to **Deploys** tab in Netlify
2. Click on the failed deployment
3. Click **"Logs"** button
4. Look for error messages

### Common Issues:

| Error | Cause | Solution |
|-------|-------|----------|
| `Cannot find module 'react'` | Dependencies didn't install | Check npm logs, retry deploy |
| `Environment variables not found` | Env vars not set in Netlify | Add them in Site Settings → Environment |
| `Invalid supabaseUrl` | Env var value is wrong | Verify URL format: `https://xxx.supabase.co` |
| `Authentication is currently disabled` | Env vars not being injected | Trigger a NEW deploy after adding env vars |

---

## How It Works (Technical)

1. You set env vars in **Netlify site settings** (UI)
2. During build, Netlify exposes them as `process.env.*`
3. `vite.config.ts` reads `process.env.*` during build time
4. Variables are embedded into the JavaScript bundle
5. Frontend can access them via `import.meta.env.VITE_*`
6. Supabase client initializes with the embedded variables

**Key Point:** Environment variables must be set BEFORE the build happens. You must trigger a NEW deploy after setting them.

---

## 📋 Pre-Deployment Checklist

- [x] Code cleanup complete
- [x] No TypeScript errors
- [x] Build succeeds locally
- [x] Supabase credentials gathered
- [x] Google Gemini API key gathered
- [x] Repository pushed to GitHub
- [ ] Netlify site created and connected
- [ ] Environment variables added to Netlify
- [ ] New deploy triggered in Netlify
- [ ] Deployment successful (green checkmark)
- [ ] Site accessible and working

---

## 🧪 Local Development Testing

To test locally before deploying:

1. Create `.env` file in project root (NOT committed to git):
```bash
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

2. Run dev server:
```bash
npm install
npm run dev
```

3. Visit http://localhost:3000

4. Test the functionality:
   - ✅ Form loads without errors
   - ✅ Can fill out the internship form
   - ✅ Can upload resume
   - ✅ Can get AI recommendations

5. If it works locally, it will work on Netlify

---

## ✅ After Successful Deployment

Your app is now live!

- 🌐 Visit your deployed site URL
- 🔐 Authentication is enabled
- 📋 Form should work completely
- 🤖 AI recommendations should generate
- 💾 Internships should be saveable
- ✨ Everything should work as expected!

---

## 📚 Additional Resources

- [TROUBLESHOOTING_SUPABASE.md](./TROUBLESHOOTING_SUPABASE.md) - Detailed debugging guide
- [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) - Setup details
- [Netlify Environment Variables Docs](https://docs.netlify.com/configure-builds/environment-variables/)
- [Vite Environment Variables Docs](https://vitejs.dev/guide/env-and-mode)

---

## 📞 Need Help?

If something goes wrong:

1. Check [TROUBLESHOOTING_SUPABASE.md](./TROUBLESHOOTING_SUPABASE.md)
2. Review Netlify build logs
3. Verify all three environment variables are set
4. Ensure you triggered a NEW deploy after setting env vars
5. Clear browser cache (Cmd+Shift+R or Ctrl+Shift+R)
6. Check browser console for errors (F12)
- [ ] Go to https://github.com/new
- [ ] Repository name: `internify` or similar
- [ ] Description: "AI Internship Recommender with Gemini API"
- [ ] Make it **PUBLIC** (for Netlify to access)
- [ ] Click "Create repository"

### Step 2: Configure Local Git
```bash
cd /Users/charan/Internify

# Initialize or verify git
git status

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/internify.git

# Verify
git remote -v
```
- [ ] Git initialized locally
- [ ] Remote URL added correctly
- [ ] Can connect to GitHub

### Step 3: Commit & Push Code
```bash
# Stage changes
git add .

# Check what will be committed
git status

# Commit
git commit -m "Initial commit: Production ready code with AI internship recommendations"

# Push to GitHub
git push -u origin main
```
- [ ] All files staged
- [ ] `.env` NOT in commit (check git status)
- [ ] Code pushed successfully
- [ ] Repository visible on GitHub

---

## Netlify Deployment Setup

### Step 1: Create Netlify Account
- [ ] Go to https://app.netlify.com/signup
- [ ] Sign up with GitHub
- [ ] Authorize Netlify
- [ ] Verify email

### Step 2: Connect GitHub Repository
In Netlify Dashboard:
- [ ] Click "Add new site"
- [ ] Select "Import an existing project"
- [ ] Choose GitHub provider
- [ ] Authorize if prompted
- [ ] Search for and select `internify` repository

### Step 3: Configure Build Settings
These should auto-detect, but verify:
- [ ] Build command: `npm run build`
- [ ] Publish directory: `dist`
- [ ] Functions directory: `netlify/functions`
- [ ] Environment: Production

### Step 4: Add Environment Variables
In Netlify Dashboard: `Site settings > Build & deploy > Environment`

Add these 3 variables:
```
GEMINI_API_KEY = [your key from aistudio.google.com]
SUPABASE_URL = [your url from supabase.co]
SUPABASE_ANON_KEY = [your anon key from supabase.co]
```

- [ ] GEMINI_API_KEY added
- [ ] SUPABASE_URL added
- [ ] SUPABASE_ANON_KEY added
- [ ] All values are correct
- [ ] All variables are encrypted

### Step 5: Trigger Deployment
- [ ] Click "Deploy" button
- [ ] Watch the build progress
- [ ] Wait for "Deploy successful" message
- [ ] Note your deployment URL

---

## Post-Deployment Testing

### Step 1: Site Accessibility
```
[ ] Visit your deployment URL
[ ] Site loads without errors
[ ] No 404 errors
[ ] No console errors (press F12)
```

### Step 2: Frontend Testing
```
[ ] Page layout renders correctly
[ ] Dark/Light mode toggle works
[ ] Header displays
[ ] Footer displays
[ ] Form elements render
```

### Step 3: Form Testing
```
[ ] Can fill in Full Name
[ ] Can fill in Email
[ ] Can fill in Field of Study
[ ] Can add Skills/Interests
[ ] Can upload Resume (PDF/DOC)
[ ] Submit button works
```

### Step 4: API Testing
```
[ ] Initial internships load (wait 10 seconds)
[ ] Form submits without errors
[ ] Get recommendations works
[ ] Results display with match scores
[ ] Save/Unsave works
```

### Step 5: Authentication Testing (if applicable)
```
[ ] Auth component loads
[ ] Can enter email/password
[ ] Sign up works
[ ] Sign in works
[ ] Sign out works
```

---

## Monitoring & Maintenance

### First 24 Hours
- [ ] Check Netlify logs for errors
- [ ] Monitor deployed site performance
- [ ] Test all functionality
- [ ] Verify API calls work

### Ongoing
- [ ] Set up error tracking (optional)
- [ ] Monitor Netlify builds
- [ ] Keep dependencies updated
- [ ] Rotate API keys every 3 months

---

## Troubleshooting

### Build Fails
```bash
# Solution:
cd /Users/charan/Internify
rm -rf node_modules package-lock.json
npm install
npm run build
git add .
git commit -m "Fix build"
git push
# Netlify will auto-rebuild
```

### Environment Variables Not Working
- Verify they're in Netlify Dashboard
- Check spelling exactly matches
- Redeploy or wait a few minutes
- Check Netlify Function logs

### White Screen
- Open DevTools (F12)
- Check Console for errors
- Check Network tab
- Check Netlify Function logs

### API Not Responding
- Verify API keys are correct
- Check Netlify Function logs
- Verify Supabase URL is correct
- Check Gemini API quota

---

## Final Verification

Before considering deployment complete:

```
✅ Build succeeds locally (npm run build)
✅ No errors in Netlify build log
✅ Site accessible at deployment URL
✅ Form works and submits
✅ Recommendations generate
✅ All 3 environment variables set
✅ No console errors (F12)
✅ No 404 or 500 errors
✅ Dark mode works
✅ Save/unsave works
✅ API calls complete successfully
```

---

## Performance Checklist

- [ ] Lighthouse score > 80
- [ ] Page load time < 3 seconds
- [ ] API response time < 5 seconds
- [ ] No memory leaks
- [ ] No console warnings

---

## Documentation Checklist

- [ ] README.md is up to date
- [ ] Deployment instructions are clear
- [ ] Environment variables are documented
- [ ] Contributing guidelines included (optional)
- [ ] Troubleshooting guide included

---

## Rollback Plan (if needed)

If something goes wrong:

```bash
# Revert last commit
git revert HEAD
git push

# Netlify will auto-redeploy previous version

# Or manually redeploy specific commit
git push origin commit-hash:main
```

---

## Success Indicators 🎉

When all of the following are true, you're done:

- ✅ GitHub repo is created and code is pushed
- ✅ Netlify site is created and connected
- ✅ Environment variables are set in Netlify
- ✅ First deployment is successful
- ✅ Site is accessible and working
- ✅ All tests pass
- ✅ No errors in logs

---

## Support Resources

- **Netlify Docs**: https://docs.netlify.com
- **Vite Docs**: https://vitejs.dev
- **React Docs**: https://react.dev
- **Supabase Docs**: https://supabase.com/docs
- **Google Gemini API**: https://ai.google.dev

---

## Estimated Timeline

- Pushing to GitHub: 5 minutes
- Netlify setup: 10 minutes
- First deployment: 5-10 minutes
- Testing: 10-15 minutes
- **Total: ~30-40 minutes**

---

## 🎉 YOU'RE DONE!

When you've completed all items above, your Internify app is fully deployed and ready to share with the world!

Deployment URL: `https://your-site-name.netlify.app`

**Congratulations on deploying your AI-powered internship recommender! 🚀**
