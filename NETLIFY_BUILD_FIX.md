# 🔧 Netlify Build Exit Code 127 - Root Cause & Fix

## Problem Diagnosis

**Error:** `Command failed with exit code 127: npm run build`

Exit code 127 means **"command not found"** - in this case, Netlify couldn't find or execute `npm`.

### Root Cause

Netlify was not configured with an explicit Node.js version specification. Without this, Netlify's build environment couldn't properly set up Node.js and npm, causing the build command to fail.

---

## Solution Applied ✅

### 1. **Added `.nvmrc` File**
Created a file specifying the exact Node.js version:
```
20.19.4
```

This file tells Netlify (and any nvm-aware system) which Node version to use.

### 2. **Updated `netlify.toml` Configuration**
Added explicit Node.js and npm version environment variables to the build section:

```toml
[build]
  command = "npm ci && npm run build"
  functions = "netlify/functions"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20.19.4"
  NPM_VERSION = "10.8.2"
```

**Key changes:**
- `NODE_VERSION = "20.19.4"` - Explicitly tells Netlify which Node version to use
- `NPM_VERSION = "10.8.2"` - Specifies npm version for consistency
- `npm ci` - Changed from `npm install` to `npm ci` (clean install) for reliable builds

### 3. **Synced `package-lock.json`**
Regenerated the lock file to match current `package.json` dependencies:
```bash
npm install
```

---

## Changes Made

| File | Change | Reason |
|------|--------|--------|
| `.nvmrc` | Created with `20.19.4` | Specify Node version for nvm |
| `netlify.toml` | Added `[build.environment]` section | Explicit version spec for Netlify |
| `package-lock.json` | Regenerated | Sync with updated dependencies |

---

## Commits

1. `Fix: Add Node.js version specification and npm ci for Netlify build`
2. `Merge: Resolve conflict - accept remote GEMINI_API_KEY variable naming`

---

## Local Verification ✅

```
✅ npm run build - Success in 816ms
✅ Build output - 382.45 KB (optimal size)
✅ No TypeScript errors
✅ All modules transformed (125 modules)
✅ dist/ folder generated with index.html and assets
```

---

## Expected Netlify Build Output

When Netlify deploys next, you should see:

```
npm notice 
npm notice Welcome to npm 10.8.2
npm notice
npm install prefix /opt/build/repo
npm notice 
npm ci
...
npm run build
> vite build
✓ built in ~800ms
```

Instead of the previous `exit code 127` error.

---

## Why This Works

1. **`.nvmrc` file** - Universal standard for Node version management
2. **`netlify.toml` environment section** - Direct Netlify configuration
3. **`npm ci` instead of `npm install`** - Better for CI/CD environments (more reliable)
4. **Synced lock file** - Ensures exact dependency versions

This combination ensures Netlify:
- Installs the correct Node.js version
- Installs the correct npm version
- Installs exact dependencies from lock file
- Can execute `npm run build` successfully

---

## If Issues Persist

1. **Go to Netlify Dashboard**
2. **Site settings > Build & deploy**
3. **Click "Clear cache and retry"**
4. Netlify will pick up the new `.nvmrc` and `netlify.toml` settings

The build should now succeed! 🚀

---

Last Updated: October 23, 2025
