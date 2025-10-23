# Supabase Authentication Setup Guide

## Overview
This application uses Supabase for user authentication and backend services. The environment variables have been configured to properly expose Supabase credentials to both the frontend and Netlify serverless functions.

## Environment Variables Configuration

### Required Environment Variables

You need to set the following environment variables in your Netlify deployment:

1. **SUPABASE_URL** - Your Supabase project URL
   - Format: `https://<project-id>.supabase.co`
   - Where to find: Supabase Dashboard → Project Settings → API

2. **SUPABASE_ANON_KEY** - Your Supabase anonymous public key
   - Where to find: Supabase Dashboard → Project Settings → API → `anon` / `public` key

3. **GEMINI_API_KEY** - Your Google Gemini API key
   - Where to find: Google Cloud Console → APIs & Services → Credentials

### How Environment Variables Are Mapped

The `netlify.toml` file automatically maps these variables:

```toml
[build.environment]
  VITE_SUPABASE_URL = "$SUPABASE_URL"           # For frontend
  VITE_SUPABASE_ANON_KEY = "$SUPABASE_ANON_KEY" # For frontend
  VITE_GEMINI_API_KEY = "$GEMINI_API_KEY"       # For frontend
  API_KEY = "$GEMINI_API_KEY"                   # For Netlify functions
```

- **VITE_* prefix**: Variables that start with `VITE_` are exposed to the frontend during build
- **API_KEY**: Used by the serverless functions to call Google Gemini API

## Setting Up in Netlify

### Step 1: Connect Your Repository
1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Connect your GitHub repository (CharanRakindi/Internify)
4. Select the `main` branch

### Step 2: Configure Environment Variables
1. In Netlify dashboard, go to Site Settings
2. Navigate to **Build & Deploy** → **Environment**
3. Add the following environment variables:
   - `SUPABASE_URL`: Your Supabase URL
   - `SUPABASE_ANON_KEY`: Your Supabase anonymous key
   - `GEMINI_API_KEY`: Your Google Gemini API key

### Step 3: Deploy
1. Trigger a new deploy or wait for automatic deployment
2. The build should succeed with all environment variables properly configured

## Local Development

### Setup .env File
Create a `.env` file in the project root (this file is gitignored):

```bash
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### Running the Dev Server
```bash
npm install
npm run dev
```

The Vite dev server will automatically load variables from `.env`.

## Frontend Authentication Flow

The application uses Supabase's built-in authentication:

```typescript
// From App.tsx
import { supabase } from './services/supabaseClient';

// Initialize Supabase client with environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### Authentication Status
- If `supabase` is `null`: Authentication is disabled (missing credentials)
- If `supabase` is initialized: Authentication is fully enabled

### Session Management
The app automatically handles:
- Session persistence across page reloads
- Real-time authentication state changes
- Automatic session cleanup on logout

## Troubleshooting

### "Authentication is currently disabled" Message
This means the Supabase environment variables are not set. Check:
1. Environment variables are set in Netlify (Site Settings → Build & Deploy → Environment)
2. Deployment was triggered AFTER setting environment variables
3. Variable names are exact: `SUPABASE_URL`, `SUPABASE_ANON_KEY`

### Build Succeeds But Auth Doesn't Work
- Clear browser cache and localStorage
- Check browser console for errors
- Verify Supabase credentials in network requests (DevTools → Network → gemini-proxy)
- Ensure Supabase project has authentication enabled

### CORS Issues
The application uses a Netlify proxy function to avoid CORS issues:
- Frontend calls `/.netlify/functions/gemini-proxy`
- Function calls Google Gemini API with the API key securely
- This keeps the API key server-side only (not exposed to clients)

## Security Notes

✅ **What's Secure:**
- API keys are NOT committed to git (in `.gitignore`)
- Server-side API key handling in Netlify functions
- Supabase anonymous key is intentionally public (for frontend use)

⚠️ **Important:**
- Never commit `.env` files to git
- Rotate API keys if they are accidentally exposed
- Use separate API keys for development and production

## References

- [Supabase Documentation](https://supabase.com/docs)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode)
- [Netlify Environment Variables](https://docs.netlify.com/configure-builds/environment-variables/)
- [Google Gemini API](https://ai.google.dev/docs)
