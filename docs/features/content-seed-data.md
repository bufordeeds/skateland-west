# Content Seed Data

**Status:** Implemented
**Commit:** `809bac3`

## Overview

Replaced all placeholder/generic content in the CMS seed data with real content from the old WordPress site (myskatelandwest.com). The content audit is at `docs/content-audit.md`.

## What Changed

### `src/lib/constants.ts`
- Email: `info@skatelandwest.com` → `skatelandwest74@gmail.com`
- Friday hours: `7:30 PM - 10:30 PM` → `6:00 PM - 10:30 PM`

### `src/endpoints/seed/pages.ts`

All 6 pages updated with real content:

| Page | Key Content Added |
|------|------------------|
| **Home** | 7-day schedule with real prices, 6 service cards (parties, events, lessons, skate sales, snack bar, arcade), testimonials |
| **Schedule** | Full schedule data, real admission prices ($7.34-$12.01), important policies (Cash Only, no refunds, skate sizes) |
| **Birthday Parties** | 2 public packages: Ultimate Skater ($185/10 guests), Glow Skater ($285/10 guests), party rules, food add-on pricing |
| **Private Events** | 2 private packages: Supreme Skater ($475/25 guests), Glow Private ($712.50/25 guests), deposit requirements, add-ons with minimums |
| **Learn to Skate** | Real lesson info ($15, Saturday 1:30-2pm), free skating perk (skate FREE 2-10:30pm after lessons) |
| **About** | Original welcome letter, actual snack bar menu items, skate sales info (Sure-Grip + Riedell) |

### Code Improvements
- Added Lexical rich text helpers (`text`, `boldText`, `paragraph`, `heading`, `richTextRoot`) to reduce boilerplate
- Shared `SCHEDULE_DATA` constant reused across Home and Schedule pages

## Seeding

Trigger via authenticated POST to `/next/seed-pages`:
```bash
curl -X POST https://skateland.buford.dev/next/seed-pages \
  -H "Authorization: Bearer $PAYLOAD_SECRET"
```

## Source Content

All content sourced from `docs/content-audit.md` (crawled 2026-03-18), which transcribed image-based flyers from the old WordPress site into structured text.
