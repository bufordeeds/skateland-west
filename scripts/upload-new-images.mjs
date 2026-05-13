#!/usr/bin/env node
// One-off: upload every file in ../new-images to the production Payload
// Media collection with hand-crafted alt text. After upload, the photos
// appear in the admin Media picker — wiring them into Pages is a separate,
// CMS-side operation.
//
// Auth: Payload's `/api/media` is gated by the `authenticated` access
// rule, so we need a session token. Two ways to supply it:
//
//   1. PAYLOAD_TOKEN env var (preferred for scripted runs)
//   2. CLI arg: `node upload-new-images.mjs <token>`
//
// Get the token by logging into https://myskatelandwest.com/admin in your
// browser, opening DevTools → Application → Cookies → copy the value of
// the `payload-token` cookie. Tokens expire (default 2h) — if you see
// 401s, log in again and re-grab.
//
// Idempotency: this script does NOT dedupe. Re-running will upload the
// same files a second time (Payload will create new Media records with
// suffixed filenames like `arcade-air-hockey-1.jpeg`). Run once.

import { readdir, readFile, stat } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join, extname, basename } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const IMAGES_DIR = join(__dirname, '..', 'new-images')
const API_BASE = process.env.PAYLOAD_API_BASE || 'https://myskatelandwest.com'

const TOKEN = process.env.PAYLOAD_TOKEN || process.argv[2]
if (!TOKEN) {
  console.error('Need a Payload session token.')
  console.error('Either: PAYLOAD_TOKEN=<jwt> node scripts/upload-new-images.mjs')
  console.error('Or:     node scripts/upload-new-images.mjs <jwt>')
  console.error('')
  console.error('Get the token from /admin in browser: DevTools → Application → Cookies → payload-token')
  process.exit(1)
}

// Hand-crafted alt text per file. Keep keys in sync with new-images/ contents.
const ALT_BY_FILENAME = {
  'arcade-air-hockey.jpeg':
    'Glowing neon-green air hockey table under a bright overhead spotlight in the arcade',
  'arcade-game-area-overview.jpeg':
    'Arcade area with foosball and air hockey tables, neon lighting, and confetti-pattern carpet',
  'arcade-lounge-blacklight.jpeg':
    'Arcade lounge with stone archway, high-top tables, and neon-confetti carpet under blacklight',
  'birthday-party-room-blacklight.jpeg':
    'Birthday party room with neon "Happy Birthday" mural, balloons, and blacklight decor',
  'cafe-2327-food-counter.jpeg':
    'Café 2327 snack counter with hot dog rotisserie, nacho machine, and chip baskets under blue lighting',
  'cafe-2327-seating-area.jpeg':
    'Café 2327 dining area with picnic-style tables and the snack counter in the background',
  'cafe-2327-staff-counter.jpeg':
    'Staff member in a purple Skateland West tee working the Café 2327 register',
  'cafe-pepperoni-pizzas.jpeg':
    'Four prepped pepperoni pizzas on trays at Café 2327, ready for the oven',
  'dj-booth-setup.jpeg':
    'DJ booth overlooking the rink with a laptop, microphone, and song-request binder',
  'neon-mural-above-seating.jpeg':
    'Neon Skateland West roller-skate mural glowing above a row of patterned bench seating',
  'rental-skate-closeup.jpeg':
    'Side view of black rental skates with bright pink wheels in front of a wall of cubbied skates',
  'rental-skates-pink.jpeg':
    'Two pairs of black rental skates with pink laces and pink wheels, displayed on carpet',
  'rink-blue-lights-wide.jpeg':
    'Wide view of the empty roller-skating rink lit deep blue, with disco ball and overhead spotlights',
  'rink-panorama-teal-magenta.jpeg':
    'Panoramic view of the rink lit teal on the left, magenta on the right, with the café cutout window in the back wall',
  'rink-purple-disco-lights.jpeg':
    'Empty rink floor under purple disco lighting with a mirrored disco ball reflecting starlight',
  'rink-purple-lights-railing.jpeg':
    'Purple-lit rink seen from outside the rail, with the ornate iron railing in the foreground',
  'skateland-west-neon-mural-banner.png':
    'Banner crop of the Skateland West neon roller-skate mural in pink, green, and purple',
  'skateland-west-neon-mural-wall.jpeg':
    'Skateland West neon roller-skate mural painted on a black wall in vivid pink, green, and purple',
  'staff-dj-booth.jpeg':
    'Smiling staff member in a red Skateland West tee holding a microphone at the DJ booth',
  'staff-portrait-yellow-tee.jpeg':
    'Smiling staff member in a yellow Skateland West tee with an "I ♥ Skating" lanyard at the counter',
  'staff-rink-floor-pose.jpeg':
    'Smiling staff member in glasses and a red Skateland West tee posing in a jam-skate stretch on the rink floor',
}

const MIME_BY_EXT = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
}

async function uploadOne(filePath, filename, alt) {
  const buf = await readFile(filePath)
  const mime = MIME_BY_EXT[extname(filename).toLowerCase()]
  if (!mime) throw new Error(`unsupported extension for ${filename}`)

  const fd = new FormData()
  fd.append('file', new Blob([buf], { type: mime }), filename)
  // Payload's multipart upload endpoint ignores sibling form fields for the
  // document data — it expects a `_payload` part containing a JSON-encoded
  // string with all non-file fields. Without this envelope, alt/caption/etc.
  // end up null and you have to PATCH them in afterwards. (Learned the
  // hard way on the 2026-05-12 MOS-5 batch.)
  fd.append('_payload', JSON.stringify({ alt }))

  const res = await fetch(`${API_BASE}/api/media`, {
    method: 'POST',
    headers: {
      Authorization: `JWT ${TOKEN}`,
      // Don't set Content-Type — fetch sets it with the multipart boundary
    },
    body: fd,
  })

  const text = await res.text()
  let body
  try {
    body = JSON.parse(text)
  } catch {
    body = { raw: text.slice(0, 200) }
  }

  if (!res.ok) {
    throw new Error(
      `HTTP ${res.status}: ${body.errors?.[0]?.message || body.message || JSON.stringify(body).slice(0, 200)}`,
    )
  }

  return body.doc || body
}

const entries = (await readdir(IMAGES_DIR))
  .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
  .sort()

console.log(`Found ${entries.length} files in ${IMAGES_DIR}`)
console.log(`Target: ${API_BASE}/api/media`)
console.log('')

let ok = 0
let fail = 0
for (const filename of entries) {
  const alt = ALT_BY_FILENAME[filename]
  if (!alt) {
    console.warn(`⚠  ${filename}: no alt text mapped — skipping`)
    fail++
    continue
  }
  const filePath = join(IMAGES_DIR, filename)
  const size = (await stat(filePath)).size
  try {
    const doc = await uploadOne(filePath, filename, alt)
    console.log(`✓ ${filename}  (${(size / 1024).toFixed(0)} KB)  id=${doc.id}`)
    ok++
  } catch (err) {
    console.error(`✗ ${filename}: ${err.message}`)
    fail++
  }
}

console.log('')
console.log(`Done. ${ok} uploaded, ${fail} failed/skipped.`)
process.exit(fail > 0 ? 1 : 0)
