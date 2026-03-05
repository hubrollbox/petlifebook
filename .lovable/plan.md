

## Plan: Create All Database Tables, Functions, and RLS Policies

### Current State
The Supabase database is **completely empty** — no tables, no functions, no policies exist. The frontend code expects 6 tables: `profiles`, `pets`, `memories`, `subscriptions`, `litters`, `health_records`, plus helper functions.

There is also a security finding: the `profiles` table email exposure needs to be addressed.

### Migration SQL

A single migration will create everything:

**Tables:**
1. `profiles` — user profiles (id references auth.users, user_type, display_name, email, avatar_url, business_name, website, location, contact_email)
2. `pets` — pet profiles (owner_id, name, breed, birth_date, death_date, description, story, profile_image_url, is_deceased, is_premium, status, litter_id, location)
3. `memories` — pet memories (pet_id, user_id, title, content, memory_date, media_url, media_type, likes_count, comments_count)
4. `subscriptions` — user subscriptions (user_id, plan_type, status, start_date, end_date)
5. `litters` — breeding litters (breeder_id, sire_id, dam_id, birth_date, name)
6. `health_records` — pet health records (pet_id, record_type, record_date, notes)

**View:**
- `pet_stats` — aggregate statistics view

**Security Definer Functions:**
- `is_premium_user(uuid)` — checks if user has active premium subscription
- `count_user_pets(uuid)` — counts user's pets
- `is_pet_owner(uuid, uuid)` — checks pet ownership

**Trigger:**
- Auto-create profile on user signup via `handle_new_user()` trigger on `auth.users`

**RLS Policies (all tables have RLS enabled):**

- `profiles`: 
  - SELECT: authenticated users can read own profile; public can read non-email fields (fixes security finding)
  - INSERT/UPDATE: own profile only

- `pets`:
  - SELECT: public read for deceased pets (stars on homepage); owners read all their pets
  - INSERT: owners only, with plan restrictions (free = only deceased, max 3 pets)
  - UPDATE: owners only, free users can't change is_deceased to false
  - DELETE: owners only

- `memories`:
  - SELECT: public for deceased pets; owners for all
  - INSERT/UPDATE/DELETE: owner only

- `subscriptions`:
  - SELECT/INSERT/UPDATE: own subscriptions only

- `litters`:
  - All operations: breeder only

- `health_records`:
  - All operations: pet owner only

### Security Fix
The profiles SELECT policy will NOT expose emails publicly. Public access will only return non-sensitive fields (id, display_name, avatar_url). Email is only visible to the profile owner.

### No Frontend Changes
This plan only creates the database schema. The existing frontend code already references these tables correctly.

