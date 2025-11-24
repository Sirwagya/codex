# Supabase Contact Form Setup Guide

## Step 1: Set Up Supabase

1. Go to **https://supabase.com** and sign in/create account
2. Click **"New Project"**
3. Fill in project details and wait for setup

## Step 2: Create Database Table

1. In your Supabase dashboard, go to **"Table Editor"**
2. Click **"Create a new table"**
3. Name it: `contact_submissions`
4. Add these columns:
   - `id` - type: `uuid`, default: `gen_random_uuid()`, primary key ✓
   - `created_at` - type: `timestamp`, default: `now()`
   - `name` - type: `text`
   - `email` - type: `text`
   - `message` - type: `text`
5. Click **"Save"**

## Step 3: Get Your API Keys

1. Go to **Project Settings** (gear icon)
2. Click **"API"** in sidebar
3. Copy:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (long string)

## Step 4: Add to Your Project

1. Open the `.env` file in your project root
2. Paste your credentials:
   ```
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=your_long_anon_key_here
   ```
3. Save the file
4. **Restart your dev server**: Stop `npm run dev` and run it again

## Step 5: Test

1. Go to your contact form
2. Fill it out and submit
3. Check Supabase Table Editor to see your submission!

## Email is Now Updated

✅ Email: sirwxgya@gmail.com  
✅ Instagram: https://instagram.com/sirwagya  
✅ Twitter: https://twitter.com/sirwxgya  
✅ LinkedIn: https://linkedin.com/in/sirwxgya

## Important Notes

- The `.env` file is **gitignored** (won't be committed)
- Keep your API keys **private**
- Contact form submissions go to Supabase automatically
- You can view all submissions in Supabase Table Editor
