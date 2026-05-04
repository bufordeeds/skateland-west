import { getPayload } from 'payload'
import config from '../src/payload.config'

async function addNewsletterToHome() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    depth: 0,
    limit: 1,
  })
  if (docs.length === 0) {
    throw new Error('No page with slug="home" found')
  }
  const home = docs[0]
  const layout = Array.isArray(home.layout) ? [...home.layout] : []

  if (layout.some((b) => (b as { blockType?: string }).blockType === 'newsletterSignup')) {
    console.log('newsletterSignup block already present on home page; nothing to do.')
    process.exit(0)
  }

  layout.push({
    blockType: 'newsletterSignup',
    blockName: 'Newsletter',
    heading: 'Get on Our Mailing List!',
    description: 'Sign up to receive coupons, specials, and updates from Skateland West.',
    buttonText: 'Subscribe',
    successMessage: "You're on the list! Watch your inbox for coupons and specials.",
    gradient: false,
  })

  await payload.update({
    collection: 'pages',
    id: home.id,
    data: { layout },
    context: { disableRevalidate: true },
  })
  console.log(`Appended newsletterSignup block to home page (id=${home.id}). Layout length: ${layout.length}`)
  process.exit(0)
}

addNewsletterToHome().catch((err) => {
  console.error('Error adding newsletter to home:', err)
  process.exit(1)
})
