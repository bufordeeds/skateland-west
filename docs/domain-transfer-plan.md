# Domain Transfer Plan — myskatelandwest.com

## Current Setup

- **Domain:** myskatelandwest.com
- **Registrar/Host:** Turbify (formerly Yahoo Small Business)
- **Current site:** WordPress, managed by Turbify
- **Email:** Uses `skatelandwest74@gmail.com` (not Turbify email — no `@myskatelandwest.com` addresses)
- **Contact email on new site:** skatelandwest74@gmail.com

## Target Setup

- **Registrar:** Cloudflare Registrar (~$9.77/year at-cost)
- **DNS:** Cloudflare (free plan, same as buford.dev)
- **Hosting:** Hetzner VPS (178.156.177.102) via Docker Compose
- **Web server:** Caddy reverse proxy → Next.js/Payload CMS container
- **Domain:** myskatelandwest.com + www.myskatelandwest.com

## Pre-Transfer Checklist

- [ ] Confirm with client: no `@myskatelandwest.com` email addresses exist at Turbify
- [ ] Audit old WordPress site content (see content-audit.md)
- [ ] Get Turbify account credentials from client (or have them do the unlock/auth code steps)
- [ ] Document all current DNS records at Turbify (A, CNAME, MX, TXT)
- [ ] Set up Cloudflare account/zone for myskatelandwest.com
- [ ] Configure matching DNS records in Cloudflare before transfer
- [ ] Add Caddy config for myskatelandwest.com → Next.js container
- [ ] Test new site is working at a temp URL before cutover

## Transfer Steps

### 1. Unlock domain at Turbify
- Log into Turbify account
- Go to Domain Summary → Locking status → set to "Unlocked"

### 2. Get authorization code (EPP code)
- Domain Settings → Authorization Code → View → copy and save

### 3. Initiate transfer at Cloudflare
- Cloudflare dashboard → Domain Registration → Transfer
- Enter `myskatelandwest.com` and the EPP auth code
- Pay for 1-year renewal (~$10)

### 4. Approve transfer
- Turbify sends approval email to domain registrant contact
- Click the approval link (check spam if not received)
- **Do NOT change any DNS settings during the 5-7 day transfer window**

### 5. After transfer completes
- Update nameservers to Cloudflare's (if not already)
- Set A record → 178.156.177.102
- Set CNAME `www` → myskatelandwest.com
- Verify SSL is working (Cloudflare edge + Caddy auto-HTTPS)

## DNS Records to Configure

```
Type  Name                    Content              Proxy
A     myskatelandwest.com     178.156.177.102      Yes
CNAME www                     myskatelandwest.com   Yes
```

No MX records needed (email is Gmail, not domain-based).

## Caddy Config Addition

```caddy
myskatelandwest.com, www.myskatelandwest.com {
    reverse_proxy skateland-west:3000
}
```

## Timeline

| Phase | Duration | Notes |
|-------|----------|-------|
| Prep (DNS, Caddy, testing) | 1-2 days | Do before initiating transfer |
| Domain transfer | 5-7 days | Hands-off waiting period |
| DNS cutover | 0-48 hours | Propagation time after pointing to VPS |
| Monitoring | 7 days | Watch for issues, keep old site accessible |

**Expected downtime:** Near zero with proper planning.

## Risks & Mitigations

- **Email disruption:** Low risk — they use Gmail, not Turbify email
- **Transfer rejection:** Ensure domain is unlocked, not expired, and not transferred in last 60 days
- **DNS propagation delays:** Lower TTL to 300s before cutover; monitor with `dig` and DNS checker tools
- **Old site access:** Keep Turbify hosting active until new site is confirmed working (don't cancel Turbify until fully migrated)

## Cost Comparison

| Item | Turbify (current) | Cloudflare (target) |
|------|-------------------|---------------------|
| Domain renewal | Unknown (reports of $165-528/yr for bundled services) | $9.77/year |
| Hosting | Included in bundle | Included on existing VPS |
| DNS | Included | Free |

## Notes

- Client wants to keep the `www.myskatelandwest.com` domain
- Old WordPress site should remain accessible during transition for content reference
- Once migrated, cancel Turbify services to stop recurring charges
