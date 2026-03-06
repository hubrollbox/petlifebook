

## Analysis: PetLifeBook — Current State vs Vision

### What's Already Built (Phase 1 ~70% done)
- Auth system with signup/login
- Pet profile creation (memorial for free, living pets for premium)
- Pet profile page with timeline, gallery, messages tabs
- StarrySky 3D homepage with deceased pets as stars
- Dashboard with pet listing and recent memories
- Plans page (free vs premium)
- Shop page (mock data, prices in R$ instead of €)
- Professional dashboard for breeders
- Storage bucket for media uploads

### What's Missing to Complete Phase 1
1. **Adding memories to timeline** — the UI exists to display memories but there's no form to create them from the pet profile page
2. **Shop prices in wrong currency** — shows R$ (Brazilian) instead of € (Portuguese market)
3. **Species field not saved** — the `species` field is in the form but the insert query doesn't include it
4. **Sharing functionality** — "Compartilhar" button exists but does nothing
5. **PDF export** — button exists but no implementation

### Strategic Opinion

The vision document is solid and well-structured. The phased approach is correct. Here's my recommended priority:

**Immediate (solidify Phase 1):**
1. Add memory creation form on pet profile (the core "timeline" experience)
2. Fix currency and localization (€, Portuguese locale consistently)
3. Fix species field persistence
4. Implement basic sharing (Web Share API / copy link)

**Short-term (monetization foundation):**
5. Integrate Stripe for premium subscriptions (€4.99/month)
6. Connect Plans page buttons to actual checkout
7. Memorial digital as one-time purchase option (€15-25)

**Medium-term (Phase 2 — social):**
8. Likes on memories (already have `likes_count` in DB)
9. Comments system (new table needed)
10. "Abraços virtuais" — simple reaction system
11. Public feed of highlighted memories

**Later (Phase 3-4):**
- Gamification, physical products marketplace, cremation partnerships

### Proposed Implementation Plan — Next Sprint

Focus on completing Phase 1 properly before adding new features:

**1. Memory Creation Form**
- Add a "Nova Memória" button on PetProfile page (visible only to owner)
- Dialog/sheet with title, content, date, photo upload fields
- Save to `memories` table with media upload to `pet-media` bucket

**2. Fix Localization Issues**
- Shop.tsx: Change all R$ prices to € prices
- Ensure all dates use pt-PT locale consistently
- Update product descriptions to European Portuguese

**3. Fix Species Field**
- Add `species` to the insert query in CreateProfile.tsx

**4. Basic Share Functionality**
- Implement Web Share API on PetProfile "Compartilhar" button
- Fallback: copy profile URL to clipboard

**5. Stripe Integration for Premium**
- Connect Stripe via Lovable connector
- Create checkout session edge function
- Wire Plans page buttons to actual payment flow
- Handle subscription webhooks to update `subscriptions` table

### Technical Notes
- No new tables needed for Phase 1 completion — all tables exist
- Memory creation uses existing `memories` table and `pet-media` bucket
- Stripe integration requires a Supabase edge function for checkout sessions
- The `species` fix is a one-line change in CreateProfile.tsx

