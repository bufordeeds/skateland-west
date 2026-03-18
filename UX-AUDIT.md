# Skateland West — UX Audit

Audited 2026-03-17 against live site at `skateland.buford.dev`.
Pages reviewed: `/`, `/schedule`, `/birthday-parties`, `/private-events`, `/learn-to-skate`, `/about`, `/search`, `/privacy`, `/terms`.

---

## Critical — Fix before demo

### 1. Identical neon hero on every page
Every content page (schedule, birthday-parties, private-events, learn-to-skate, about) renders the same full `HeroSection` block — neon "SKATELAND WEST" sign, same stats row, same 3 CTA buttons (View Schedule, Book a Party, Skating Lessons). The hero takes up 85vh on every page, making all pages feel like the homepage.

**Recommendation:** Reserve the neon sign hero for the homepage only. Subpages should use a simpler hero — a compact banner with the page title, maybe a subtle background color or image, and a page-specific subtitle. This is a CMS change (set each page's hero type to `mediumImpact` or `none`) combined with making the `HeroSection` block only appear in the homepage layout.

**Files:** CMS admin (page hero settings), `src/blocks/HeroSection/Component.tsx`

### 2. Header logo should be left-aligned
The logo + "Skateland West" text is currently centered between left and right nav groups. Convention for local business sites is logo on the left.

**Recommendation:** Move the logo to the far left, combine all nav items to the right of it, and keep the "Book a Party" CTA on the far right.

**Files:** `src/Header/Component.client.tsx`, `src/Header/Nav/index.tsx`

### 3. Broken `/contact` links — 3 pages affected
The `/contact` route does not exist. CTA buttons link to it on:
- `/birthday-parties` → "Book Your Party" links to `/contact`
- `/private-events` → "Request a Quote" links to `/contact`
- `/learn-to-skate` → "Sign Up Now" links to `/contact`

**Fix options:**
- A) Create a `/contact` page in the CMS
- B) Update each CTA in the CMS to use `tel:2106732568` or a valid page
- C) Code fix: make `CTASection` fall back to the phone number when `primaryButton.url` points to a non-existent page

**Files:** CMS admin (CTA block config per page), or `src/blocks/CTASection/Component.tsx`

### 4. `/privacy` and `/terms` pages are 404
Footer links to both. Neither page exists in the CMS. Every page links to them.

**Fix:** Create placeholder pages in the CMS admin, or remove the footer links until content is ready.

**Files:** CMS admin, or `src/Footer/Component.tsx`

### 5. Page title duplication
Every page shows the site name twice: `Birthday Parties | Skateland West | Skateland West`. The `generateMeta` utility appends "| Skateland West" but the CMS meta title already includes it.

**Fix:** Update `generateMeta` to not append if the title already contains "Skateland West", or fix CMS meta titles to omit the suffix.

**Files:** `src/utilities/generateMeta.ts`

### 6. "Party Packages" section has heading but no cards
On `/birthday-parties`, shows "Party Packages — Choose the perfect package for your celebration" with no package cards underneath. The `PartyPackages` component doesn't guard against empty `packages` prop.

**Fix:** Add `if (!packages?.length) return null` guard (same pattern as ServicesCards fix), and populate package data in CMS.

**Files:** `src/blocks/PartyPackages/Component.tsx`, CMS admin

### 7. "Skating Sessions" section on homepage has no schedule cards
Shows heading "Skating Sessions" and "Find the perfect time to skate" subtitle, plus a "View Full Schedule" link, but no actual schedule day cards.

**Fix:** Either populate schedule data in the CMS, or guard the ScheduleCards component against empty `schedule` prop.

**Files:** `src/blocks/ScheduleCards/Component.tsx`, CMS admin

---

## Medium — Should fix

### 8. "All Parties Include" is a wall of text
On `/birthday-parties`, the included items render as a single paragraph with inline bullet characters: `• Private party room for 1.5 hours • Skating admission for all guests • Skate rental...` instead of a proper formatted list.

**Recommendation:** This is a CMS rich text issue — the content block should use an actual bulleted list, not bullet characters in a paragraph. Alternatively, build a dedicated "IncludesList" component.

### 9. "Open Today!" badge is hardcoded
Footer always shows "Open Today!" regardless of actual day/time. Misleading on closed days (Mon-Wed are "Private Parties Only").

**Fix:** Compute from `SITE_CONFIG.hours` and the current day. Show "Open Today!" only when actually open to the public, otherwise show "Private Parties Only" or "Closed Today".

**Files:** `src/Footer/Component.tsx`, `src/lib/constants.ts`

### 10. Years stat is wrong
Hero shows "38 Years Strong" but 2026 - 1985 = 41. The `HeroSection` default prop is `yearsInBusiness = 39` and the CMS overrides it to 38. Both are wrong.

**Fix:** Either compute dynamically (`new Date().getFullYear() - 1985`) or update the CMS value to 41.

**Files:** `src/blocks/HeroSection/Component.tsx` or CMS admin

### 11. Search page shows "No results found" on load
Visiting `/search` immediately displays "No results found" before the user types anything. Feels broken.

**Recommendation:** Show a prompt like "Start typing to search..." or hide the results area until a query is entered.

**Files:** `src/search/Component.tsx` (or wherever the search page renders)

### 12. No active nav indicator
The current page is not highlighted in the navigation. When on `/schedule`, the "Plan Visit" link looks the same as all other links.

**Recommendation:** Compare `pathname` to each nav item's `href` and apply an active class (e.g., `text-cyan-300` or an underline).

**Files:** `src/Header/Nav/index.tsx`

### 13. Content pages have sparse/thin content
Schedule, birthday-parties, private-events, and learn-to-skate pages have very short content sections. Lists render as inline text with bullet characters rather than proper `<ul>/<li>` markup. The content feels placeholder-level.

**Recommendation:** Flesh out page content in the CMS. Use rich text lists instead of inline bullet characters. Consider adding images or photos to break up text.

### 14. Same background images in every hero carousel
All pages share the same 20-image rotating background. Each page should ideally have page-specific hero imagery (skating lessons photos for learn-to-skate, party photos for birthday-parties, etc.).

**Fix:** CMS admin — upload page-specific hero images for each page.

---

## Low — Nice to have

### 15. Footer CTA is always "Book Your Party"
The gradient CTA banner in the footer always shows "Book Your Party" and "Call Us Now" regardless of page context. On the schedule page, a more relevant CTA might be "Plan Your Visit".

**Recommendation:** Make this configurable per-page in CMS, or use a contextual default based on the current page.

### 16. Mobile: phone number not visible above the fold
The info bar with the phone number is `hidden lg:block`. On mobile, users have to scroll to the footer to find the phone number. For a local business, the phone should be prominent.

**Recommendation:** Add a sticky "Call Now" button on mobile, or show the phone number in the mobile header.

### 17. Twitter → X rebrand
Footer social link still says "Twitter" with the bird icon. Consider updating to "X" with the X logo.

**Files:** `src/Footer/Component.tsx`, possibly icon swap

### 18. Theme selector in footer
The theme toggle ("Auto/Light/Dark") is visible in the footer bottom bar. For a public-facing business site, users probably don't need this. Consider removing or hiding behind a setting.

**Files:** `src/Footer/Component.tsx`

### 19. Stats may be aspirational
"10K Parties Hosted" and "50K Happy Families" feel like placeholder numbers. If these aren't verifiable, consider using more modest or real numbers, or removing the stats from subpages.

### 20. Homepage ScheduleCards block vs. Schedule page
The homepage has a ScheduleCards block that links to `/schedule`, but the schedule page itself just shows the same neon hero + a content block with pricing text. There's no visual schedule on either page. Consider adding the ScheduleCards data to both, or at least to the schedule page.

---

## Summary by page

| Page | Issues |
|------|--------|
| `/` (homepage) | #1 hero is fine here, #7 empty schedule cards, #10 wrong year |
| `/schedule` | #1 same hero, #3 no broken links (good), #12 no active nav |
| `/birthday-parties` | #1 same hero, #3 broken /contact link, #6 empty packages, #8 wall of text |
| `/private-events` | #1 same hero, #3 broken /contact link, #13 thin content |
| `/learn-to-skate` | #1 same hero, #3 broken /contact link, #13 thin content |
| `/about` | #1 same hero, no broken links (good), decent content |
| `/search` | #11 "No results" on load |
| `/privacy` | #4 page is 404 |
| `/terms` | #4 page is 404 |
| All pages | #2 logo alignment, #5 title duplication, #9 "Open Today" hardcoded, #12 no active nav, #14 same hero images |

---

## Notes

### Party Booking System
Skateland West uses PCS Party for online party bookings: `https://skatelandwest.pcsparty.com/bookings/index.asp`. All "Book a Party" CTAs across the site link to this external system. If we want to build and manage a custom booking system in-house (integrated into Payload CMS), that would be a separately scoped and charged feature.
