# Email Campaign / Newsletter Signup

**Status:** Infrastructure complete, pending SES production access approval
**Depends on:** Listmonk (VPS), AWS SES (email delivery)

## Overview

Newsletter signup block for collecting subscriber emails, integrated with Listmonk (self-hosted email campaign manager) on the VPS. AWS SES handles actual email delivery.

## Architecture

```
[Skateland West App] → POST /api/newsletter-subscribe
                           ↓
                    [Listmonk API] (http://listmonk:9000 internal)
                           ↓
                    [AWS SES SMTP] (email-smtp.us-east-1.amazonaws.com)
                           ↓
                    [Subscriber's inbox]
```

## App Files

- `src/blocks/NewsletterSignup/config.ts` — Payload block config
- `src/blocks/NewsletterSignup/Component.tsx` — client component with inline form
- `src/app/(frontend)/api/newsletter-subscribe/route.ts` — API endpoint → Listmonk

## CMS Block Fields

| Field | Type | Default |
|-------|------|---------|
| heading | text | "Get on Our Mailing List!" |
| description | textarea | "Sign up to receive coupons, specials, and updates..." |
| buttonText | text | "Subscribe" |
| successMessage | text | "You're on the list!..." |
| gradient | checkbox | false |

## API Endpoint

**`POST /api/newsletter-subscribe`**

Request:
```json
{ "email": "user@example.com", "name": "Optional Name" }
```

Responses:
- `200` — `{ "success": true }`
- `400` — `{ "error": "Please provide a valid email address." }`
- `409` — `{ "error": "This email is already subscribed." }`
- `500` — `{ "error": "Newsletter service is not configured." }`

## Environment Variables

```bash
LISTMONK_URL=http://listmonk:9000       # Docker internal (production)
LISTMONK_URL=https://email.buford.dev   # Public URL (local dev)
LISTMONK_API_USER=api
LISTMONK_API_TOKEN=<token>              # stored in .env.ses (gitignored)
LISTMONK_LIST_ID=1
```

## VPS Setup (Done)

### Listmonk

Added to `/home/buford/docker-compose.yml`:
- Image: `listmonk/listmonk:latest`
- Port: `127.0.0.1:9090:9000` (MinIO already uses 9000)
- Networks: `web` + `internal`
- Database: `listmonk` in existing Postgres 16
- Config: `/home/buford/data/listmonk/config.toml` mounted into container
- Caddy: `email.buford.dev` → `listmonk:9000`
- Admin UI: https://email.buford.dev

API auth uses token header (not basic auth):
```
Authorization: token api:<token>
```

### AWS SES (Done)

- Region: `us-east-1`
- Sending domain: `buford.dev` (verified)
- From address: `Skateland West <hello@buford.dev>`
- SMTP: `email-smtp.us-east-1.amazonaws.com:587` (STARTTLS)
- IAM user: `ses-smtp-listmonk` with `ses:SendRawEmail` policy
- Status: **Sandbox** (production access requested, 24-48hr review)

DNS records added to Cloudflare (all DNS-only, not proxied):
- 3x CNAME — DKIM (`*._domainkey.buford.dev`)
- 1x MX — MAIL FROM (`noreply.buford.dev` → `feedback-smtp.us-east-1.amazonaws.com`)
- 1x TXT — SPF on `noreply.buford.dev`
- 1x TXT — SPF on `buford.dev` (updated to include both `icloud.com` and `amazonses.com`)
- 1x TXT — DMARC on `_dmarc.buford.dev` (`p=none` for now)

### Credentials

All credentials stored locally in `.env.ses` (gitignored):
- SES SMTP username/password
- Listmonk API user/token

### Changing the Sending Domain Later

When `myskatelandwest.com` is transferred to Cloudflare:
1. Verify the new domain in SES (add DKIM/SPF/DMARC records)
2. Update Listmonk "From" address in Settings
3. No app code changes needed

## Remaining Tasks

- [ ] SES production access approval (submitted, waiting 24-48hrs)
- [ ] Tighten DMARC from `p=none` to `p=quarantine` once sending is confirmed
- [ ] Connect Skateland West app's newsletter API route to Listmonk (update production env vars)
- [ ] Rename default list from "Default list" to "Skateland West Newsletter"

## Usage

1. Add "Newsletter Signup" block to any page in Payload CMS
2. Configure heading, description, button text
3. Visitors submit email → stored as subscriber in Listmonk
4. Create and send campaigns from Listmonk admin at `email.buford.dev`
