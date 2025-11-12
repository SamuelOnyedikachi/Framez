# 🔧 Framez User Account Creation - Troubleshooting Guide

## Issue: "Not creating user account"

This guide will help diagnose and fix account creation issues.

---

## ⚠️ Most Likely Issues

### 1. **Supabase Database Not Set Up** (MOST COMMON)

**Symptoms:**
- Sign up appears to work but user not created
- No error message shown
- Account doesn't exist when trying to login

**Solution:**
```
You MUST create the database tables in Supabase first!

Steps:
1. Go to https://supabase.com
2. Login to your project
3. Go to SQL Editor
4. Copy & paste the entire schema from SUPABASE_SETUP.md
5. Click "Run"
6. Wait for confirmation
7. Verify in Table Editor that tables exist
```

### 2. **Email Confirmation Enabled**

**Symptoms:**
- Sign up works but redirects to login instead of feed
- "Please confirm your email" message

**Solution:**
```
Go to Supabase:
1. Authentication → Providers → Email
2. Turn OFF "Confirm email" (check "Email confirmation not required")
3. Save settings
4. Try signing up again
```

### 3. **Row Level Security Policies Missing**

**Symptoms:**
- Account created but can't access user profile
- "Permission denied" errors in console
- Posts don't show

**Solution:**
```
Go to Supabase SQL Editor and run:

CREATE POLICY "Users can read any profile"
ON users FOR SELECT
USING (true);

CREATE POLICY "Users can update own profile"
ON users FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);
```

### 4. **User Profile Trigger Not Created**

**Symptoms:**
- User created in auth.users but not in users table
- Profile shows no name/email
- "User profile not found" in logs

**Solution:**
```
Supabase → SQL Editor:

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (id, email, name, created_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', 'User'),
    NOW()
  );
  RETURN NEW;
END;
$$
LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

---

## 🔍 Step-by-Step Diagnosis

### Step 1: Verify .env File

```bash
# Check your .env has:
EXPO_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=xxxxx
```

✅ **If empty or missing**: Add credentials from Supabase dashboard

### Step 2: Check Supabase Project

1. Go to https://supabase.com
2. Login
3. Select your project
4. Go to **SQL Editor**
5. Run this query:

```sql
-- Check if users table exists
SELECT COUNT(*) FROM users;
```

❌ **If error "relation users does not exist"**: Create tables (see SUPABASE_SETUP.md)

✅ **If returns number**: Tables exist, continue to next step

### Step 3: Check Auth Settings

In Supabase dashboard:
1. Go to **Authentication** → **Providers** → **Email**
2. Check these settings:
   - ✅ Email confirmation: **DISABLED** (uncheck "Confirm email")
   - ✅ Secure email change: **Can leave as default**
   - ✅ Enable signup: **ENABLED** (should be checked)

### Step 4: Check Tables Exist

In Supabase dashboard:
1. Go to **Table Editor** (left sidebar)
2. Verify you see:
   - ✅ `users` table
   - ✅ `posts` table  
   - ✅ `comments` table
   - ✅ `likes` table
   - ✅ `saved_posts` table
   - ✅ `stories` table

❌ **If any missing**: Run SQL schema from SUPABASE_SETUP.md

### Step 5: Test Account Creation Manually

1. In Supabase, go to **Authentication** → **Users**
2. Click **"Add user"**
3. Create a test account:
   - Email: `manual@test.com`
   - Password: `TestPass123!`
   - Click **Generate password** if desired
4. Click **Create user**

✅ **If successful**: Manual creation works, issue is with app auth logic

❌ **If error**: Email settings or permissions issue

### Step 6: Check Browser Console for Errors

1. Open the app in web browser (Press 'w')
2. Press F12 to open Developer Tools
3. Go to **Console** tab
4. Try to sign up
5. Look for red error messages
6. Screenshot and analyze errors

### Step 7: Check Supabase Logs

In Supabase dashboard:
1. Go to **Database** → **Logs**
2. Look for error messages from your signup attempt
3. This reveals what's happening server-side

---

## 📋 Complete Database Setup Checklist

Before testing, ensure:

- [ ] Supabase project created
- [ ] `.env` file has URL and API key
- [ ] Tables created via SQL (SUPABASE_SETUP.md schema)
- [ ] Email confirmation is DISABLED
- [ ] RLS policies created for public access
- [ ] Trigger function created for user profile auto-creation
- [ ] `images` storage bucket created and public
- [ ] Storage policies allow public uploads

**Not done?** Follow SUPABASE_SETUP.md completely before testing

---

## 🔧 Quick Fix Summary

### If Account Not Creating:

1. **Check `.env` file has credentials**
   ```bash
   cat .env
   # Should show EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY
   ```

2. **Check Supabase tables exist**
   - Go to Supabase → Table Editor
   - See `users` table? If not → run SQL schema from SUPABASE_SETUP.md

3. **Disable email confirmation**
   - Supabase → Authentication → Email
   - Uncheck "Confirm email"
   - Save

4. **Ensure trigger exists**
   - Supabase → SQL Editor
   - Run trigger creation SQL from SUPABASE_SETUP.md

5. **Test with manual creation**
   - Supabase → Authentication → Users
   - Add user manually
   - Works? → Check app auth code
   - Doesn't work? → Check Supabase settings

---

## 🧪 Testing After Fixes

1. **Restart app**: `npm start` (press 'r' to reload)
2. **Clear cache** if needed:
   ```bash
   expo start --clear
   ```
3. **Try signing up**:
   - Email: test@example.com
   - Password: Test123!
   - Name: Test User
4. **Check results**:
   - Redirects to feed? ✅ Success!
   - Shows error? Check console
   - Stays on signup? Check browser logs (F12)

---

## 📞 Still Not Working?

Try these advanced steps:

### Check App Logs
```bash
# In terminal where app is running, look for:
# - "Auth initialization error"
# - "Sign up error"
# - Network-related errors
```

### Check Browser Console (F12)
```
Look for:
- "Cannot POST /auth/v1/signup" → Auth endpoint issue
- "relation 'users' does not exist" → Database missing
- "permission denied" → RLS policy issue
- Network errors → Connection issue
```

### Check Supabase Realtime

In Supabase dashboard:
1. Inspect → Network tab
2. Filter by "supabase"
3. Look for failed requests
4. Click to see details

### Enable Debug Mode

In your terminal:
```bash
# Restart with logging
npm start
# Then press 'j' to open debugger
# Look for network requests
```

---

## ✅ Verification Checklist

Once you think it's fixed, verify:

- [ ] Can sign up successfully
- [ ] User appears in Supabase → Authentication → Users
- [ ] User data appears in Supabase → users table
- [ ] App redirects to feed after signup
- [ ] Can create posts
- [ ] Posts appear in feed
- [ ] Profile shows user info
- [ ] Session persists after close/refresh

**All ✅ = Account creation fixed!**

---

## 🚀 Next Steps

1. Fix issues using steps above
2. Test signup → profile creation
3. Test post creation
4. Record demo video
5. Submit!

---

Still stuck? Check:
- SUPABASE_SETUP.md (database setup)
- README.md (setup instructions)
- TESTING_GUIDE.md (testing procedures)
