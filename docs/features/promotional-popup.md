# Promotional Popup

**Status:** Implemented
**Commit:** `72beead`

## Overview

A dismissable promotional popup that appears once per visitor session. Managed entirely through the Payload CMS admin panel — no code changes needed to update content.

## Files

- `src/PromotionalPopup/config.ts` — Payload Global config
- `src/PromotionalPopup/hooks/revalidatePopup.ts` — cache revalidation hook
- `src/PromotionalPopup/Component.tsx` — server component (data fetching)
- `src/PromotionalPopup/PopupClient.tsx` — client component (Dialog UI)
- `src/components/ui/dialog.tsx` — shadcn Dialog (installed via CLI)

## CMS Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| enabled | checkbox | no | Master on/off toggle (default: off) |
| title | text | yes | Popup heading |
| body | richText | no | Main content (Lexical editor) |
| image | upload | no | Optional promotional flyer image |
| ctaButton.label | text | no | Button text |
| ctaButton.url | text | no | Button destination URL |
| ctaButton.newTab | checkbox | no | Open link in new tab |

## How It Works

1. Server component fetches the `promotional-popup` global via `getCachedGlobal`
2. If `enabled` is false, renders nothing
3. If enabled, renders `PopupClient` with the data as props
4. Client component checks `sessionStorage` for `popup-dismissed` key
5. If not dismissed, shows shadcn Dialog with title, optional image, rich text body, and CTA button
6. On dismiss, sets `sessionStorage.setItem('popup-dismissed', 'true')` — won't show again that session

## Usage

1. Go to `/admin/globals/promotional-popup`
2. Toggle "enabled" on
3. Set title, body content, optional image, optional CTA
4. Save — changes go live immediately (cache revalidated automatically)

## Example Use Cases

- Spring Break schedule announcement
- Holiday hours changes
- New party package promotions
- Seasonal discounts
