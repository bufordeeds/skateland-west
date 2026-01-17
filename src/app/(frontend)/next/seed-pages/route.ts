import { getPayload } from 'payload'
import { seedPages } from '@/endpoints/seed/pages'
import config from '@payload-config'
import { headers } from 'next/headers'

export const maxDuration = 60

export async function POST(_request: Request): Promise<Response> {
  const payload = await getPayload({ config })
  const requestHeaders = await headers()

  // Check for secret token (for automated seeding)
  const authHeader = requestHeaders.get('authorization')
  const secretToken = process.env.PAYLOAD_SECRET

  if (authHeader === `Bearer ${secretToken}`) {
    // Authorized via secret token
  } else {
    // Fall back to user auth
    const { user } = await payload.auth({ headers: requestHeaders })
    if (!user) {
      return new Response('Action forbidden. Please login to admin first or provide valid token.', { status: 403 })
    }
  }

  try {
    await seedPages(payload)
    return Response.json({ success: true, message: 'Pages seeded successfully!' })
  } catch (e) {
    payload.logger.error({ err: e, message: 'Error seeding pages' })
    return new Response(`Error seeding pages: ${e instanceof Error ? e.message : 'Unknown error'}`, { status: 500 })
  }
}
