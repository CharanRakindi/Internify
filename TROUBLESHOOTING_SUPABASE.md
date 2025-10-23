# Troubleshooting: "Invalid supabaseUrl" Error

## Error Details
```
Uncaught Error: Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.
    at $b (index-DyYaNQhj.js:71:34184)
    at new J_ (index-DyYaNQhj.js:88:32075)
```

## Root Causes & Solutions

### 1. Environment Variables Not Set in Netlify ⚠️ **Most Common**

**Problem:** The Supabase environment variables are not configured in your Netlify deployment.

**Solution:**
1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Select your site (Internify)
3. Navigate to: **Site Settings** → **Build & Deploy** → **Environment**
4. Add these three variables:
   - `SUPABASE_URL`: `https://your-project-id.supabase.co`
   - `SUPABASE_ANON_KEY`: Your Supabase anonymous key
   - `GEMINI_API_KEY`: Your Google Gemini API key

5. **Trigger a new deploy** (critical!)
   - Go to **Deploys**
   - Click **Trigger deploy** → **Deploy site**

### 2. Environment Variables Set But Deploy Not Triggered

**Problem:** You added the environment variables but didn't trigger a new build.

**Solution:**
- The previous builds didn't have access to the environment variables
- You must trigger a new deploy after setting environment variables
- Click **Trigger deploy** in Netlify dashboard

### 3. Wrong Variable Names

**Problem:** Using incorrect variable names in environment variables.

**Correct Names to Use:**
- ✅ `SUPABASE_URL`
- ✅ `SUPABASE_ANON_KEY`
- ✅ `GEMINI_API_KEY`

**Incorrect (Don't use these):**
- ❌ `VITE_SUPABASE_URL` (this is for local .env only)
- ❌ `VITE_SUPABASE_ANON_KEY` (this is for local .env only)

### 4. Malformed Supabase URL

**Problem:** The URL is not in the correct format.

**Correct Format:**
- ✅ `https://your-project-id.supabase.co`
- ❌ `http://your-project-id.supabase.co` (must be HTTPS)
- ❌ `your-project-id.supabase.co` (missing https://)
- ❌ `https://supabase.co` (missing project ID)

**Where to Find Your URL:**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click **Settings** → **API**
4. Copy the "Project URL" (it will look like `https://xxxxx.supabase.co`)

### 5. Empty or Null Environment Variables

**Problem:** Environment variables are set but are empty or null.

**Debug Steps:**
1. Check the build logs in Netlify
   - Go to **Deploys** → Click the deployment → **Logs**
2. Look for environment variable values being injected
3. Verify all three variables appear in the logs

### 6. Incorrect Supabase Anonymous Key

**Problem:** The key is malformed or truncated.

**Where to Find Correct Key:**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click **Settings** → **API**
4. Under "Project API keys", copy the **`anon` / `public` key**
   - NOT the service_role key (that's for backend only)

**Format Check:**
- Should start with: `eyJ...` (JWT format)
- Should be a long string (usually 100+ characters)

## Verification Steps

### Step 1: Verify Environment Variables Are Set
```bash
# In Netlify site settings, you should see:
# SUPABASE_URL: https://xxxx.supabase.co
# SUPABASE_ANON_KEY: eyJ...
# GEMINI_API_KEY: AIza...
```

### Step 2: Trigger a New Deploy
1. Go to **Deploys** in Netlify
2. Click **Trigger deploy** → **Deploy site**
3. Wait for the build to complete
4. Check that build succeeded (green checkmark)

### Step 3: Check Browser Console
1. Open your deployed site
2. Press `F12` or `Cmd+Option+I` to open DevTools
3. Go to **Console** tab
4. Look for error messages
5. Expand the error to see details

### Step 4: Verify Variables Were Injected
1. Open DevTools → **Application** tab
2. Look at build output or check network requests
3. Variables should be embedded in the JavaScript bundle

## Local Development Testing

To verify your setup locally:

1. **Create `.env` file** (not committed to git):
```bash
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_GEMINI_API_KEY=your_gemini_key_here
```

2. **Run dev server:**
```bash
npm install
npm run dev
```

3. **Test in browser:**
- Visit `http://localhost:3000`
- Open DevTools → Console
- Should NOT see any Supabase errors
- Auth should be enabled

## Additional Debugging

### Check if Variables Are Actually Being Used
Look at the browser console and network tab:
- If you see `/netlify/functions/gemini-proxy` requests, that's good (backend API working)
- If you see errors about invalid URL, variables weren't injected

### Netlify Build Logs
1. Go to **Deploys** → Select your deployment
2. Click **Logs** tab
3. Search for:
   - `VITE_SUPABASE_URL`
   - `SUPABASE_URL`
   - `API_KEY`
4. Look for `injecting environment variables` messages

### Check Deployment Context
Make sure you're checking the right deployment context:
- **Production**: From main branch
- **Preview**: From pull requests
- **Branch deploy**: From specific branches

Each context can have different environment variable settings.

## Quick Checklist

- [ ] Logged into Netlify dashboard
- [ ] Navigated to your Internify site
- [ ] Went to Site Settings → Build & Deploy → Environment
- [ ] Added `SUPABASE_URL` with correct format (https://...)
- [ ] Added `SUPABASE_ANON_KEY` (full JWT token)
- [ ] Added `GEMINI_API_KEY`
- [ ] Clicked Save on environment variables
- [ ] Triggered a new deploy
- [ ] Build completed successfully (green checkmark)
- [ ] Cleared browser cache
- [ ] Checked browser console for errors
- [ ] No "Invalid supabaseUrl" error appears

## Still Having Issues?

1. **Double-check Supabase credentials:**
   - Go to supabase.com → your project → Settings → API
   - Copy-paste directly (don't type manually)

2. **Verify URL format:**
   - Must be: `https://xxxxx.supabase.co`
   - Check for typos or extra spaces

3. **Try a fresh build:**
   - Go to Netlify → Deploys → **Clear cache and redeploy**

4. **Check deployment logs:**
   - Netlify Deploys page → select deployment → Logs
   - Look for any error messages during build

5. **Test locally first:**
   - Create `.env` locally
   - Run `npm run dev`
   - If it works locally, issue is with Netlify env vars

## Related Documentation

- [Netlify Environment Variables](https://docs.netlify.com/configure-builds/environment-variables/)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode)
- [Supabase API Documentation](https://supabase.com/docs/reference/javascript/introduction)
- [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) - Full setup guide
