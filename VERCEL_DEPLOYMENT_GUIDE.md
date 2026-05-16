# 🚀 Vercel Deployment Guide

## Step-by-Step Deployment Instructions

### Step 1: Go to Vercel Dashboard
1. Open your browser and go to: **https://vercel.com/new**
2. Sign in with your account

---

### Step 2: Import GitHub Repository
1. Click **"Import Project"** or **"Add New Project"**
2. Select **"Import Git Repository"**
3. If prompted, connect your GitHub account
4. Find and select: **`Vansh-Verma18/peblo-ai-workspace`**
5. Click **"Import"**

---

### Step 3: Configure Project Settings

#### Framework Preset
- Should auto-detect as **Next.js** ✅
- If not, select **Next.js** from dropdown

#### Root Directory
- Leave as **`./`** (root)

#### Build Settings
- **Build Command:** `prisma generate && next build`
- **Output Directory:** `.next` (default)
- **Install Command:** `npm install` (default)

---

### Step 4: Add Environment Variables

Click **"Environment Variables"** and add these:

#### 1. DATABASE_URL
**For now, use a placeholder (we'll set up Vercel Postgres after):**
```
postgresql://placeholder:placeholder@localhost:5432/placeholder
```

#### 2. NEXTAUTH_URL
```
https://your-app-name.vercel.app
```
*(Replace with your actual Vercel URL after deployment)*

#### 3. NEXTAUTH_SECRET
```
peblo-secret-key-change-in-production-2024
```
*(Or generate a new one with: `openssl rand -base64 32`)*

#### 4. OPENROUTER_API_KEY
```
sk-or-v1-your-openrouter-api-key-here
```
*(Use your actual OpenRouter API key)*

**Important:** Make sure all variables are set for **Production**, **Preview**, and **Development**

---

### Step 5: Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes for build to complete
3. You'll get a deployment URL like: `https://peblo-ai-workspace.vercel.app`

---

### Step 6: Set Up Vercel Postgres (Database)

#### Option A: Vercel Postgres (Recommended)

1. Go to your project dashboard on Vercel
2. Click **"Storage"** tab
3. Click **"Create Database"**
4. Select **"Postgres"**
5. Choose **"Hobby"** plan (Free)
6. Click **"Create"**
7. Vercel will automatically add `DATABASE_URL` to your environment variables
8. Go to **"Settings"** → **"Environment Variables"**
9. Find `DATABASE_URL` and make sure it's set for all environments

#### Option B: External PostgreSQL (Neon - Free)

If Vercel Postgres doesn't work:

1. Go to: **https://neon.tech/**
2. Sign up for free account
3. Create a new project
4. Copy the connection string
5. Go back to Vercel → **Settings** → **Environment Variables**
6. Update `DATABASE_URL` with your Neon connection string:
   ```
   postgresql://username:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
   ```

---

### Step 7: Run Database Migrations

After setting up the database:

1. Go to Vercel project dashboard
2. Click **"Deployments"** tab
3. Click **"..."** on the latest deployment
4. Click **"Redeploy"**
5. Check **"Use existing Build Cache"** = NO
6. Click **"Redeploy"**

This will run `prisma generate` and set up your database schema.

---

### Step 8: Update NEXTAUTH_URL

1. Copy your Vercel deployment URL (e.g., `https://peblo-ai-workspace.vercel.app`)
2. Go to **Settings** → **Environment Variables**
3. Find `NEXTAUTH_URL`
4. Update it to your actual Vercel URL
5. Click **"Save"**
6. Redeploy again

---

### Step 9: Test Your Deployment

1. Visit your Vercel URL
2. Try to register a new account
3. Create a note
4. Test AI features
5. Test public sharing

---

### Step 10: Update README with Live Demo Link

Once everything works, update your README.md:

```markdown
## 🌐 Live Demo

**[View Live Application](https://peblo-ai-workspace.vercel.app)**

Try it out without any setup! No installation required.

**Test Credentials:**
- Create your own account or use the demo
```

Then commit and push:
```bash
git add README.md
git commit -m "docs: add live demo link"
git push
```

---

## 🔧 Troubleshooting

### Build Fails with Prisma Error
**Solution:** Make sure `DATABASE_URL` is set in environment variables

### "Invalid credentials" on login
**Solution:** Check that `NEXTAUTH_SECRET` and `NEXTAUTH_URL` are set correctly

### AI features not working
**Solution:** Verify `OPENROUTER_API_KEY` is set correctly

### Database connection error
**Solution:** 
1. Check `DATABASE_URL` format
2. Make sure database is created
3. Try redeploying

---

## 📊 Expected Result

After successful deployment:

✅ Live URL: `https://your-app.vercel.app`
✅ GitHub auto-deploys on push
✅ All features working
✅ Database connected
✅ AI features working

---

## 🎯 Quick Checklist

- [ ] Import GitHub repo to Vercel
- [ ] Add all 4 environment variables
- [ ] Deploy project
- [ ] Set up Vercel Postgres (or Neon)
- [ ] Update DATABASE_URL
- [ ] Redeploy
- [ ] Update NEXTAUTH_URL with actual URL
- [ ] Redeploy again
- [ ] Test all features
- [ ] Update README with live demo link
- [ ] Push to GitHub

---

## 💡 Tips

1. **Use Vercel Postgres** - Easiest option, no external setup
2. **Check deployment logs** - If build fails, check logs for errors
3. **Environment variables** - Make sure all are set for Production
4. **Redeploy after changes** - Always redeploy after updating env vars

---

## 🚀 Alternative: Deploy via Vercel Dashboard (Easiest)

If CLI doesn't work, use the web interface:

1. Go to: https://vercel.com/new
2. Import your GitHub repo
3. Follow steps 3-10 above

This is actually easier and more visual!

---

**Good luck with deployment! 🎉**

