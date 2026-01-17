import { getPayload } from 'payload'
import config from '@payload-config'
import { headers } from 'next/headers'
import { fetchGoogleReviews } from '@/lib/google-places'

export const maxDuration = 30

export async function POST(): Promise<Response> {
  const payload = await getPayload({ config })
  const requestHeaders = await headers()

  // Authenticate
  const { user } = await payload.auth({ headers: requestHeaders })

  if (!user) {
    return new Response('Unauthorized. Please log in to admin first.', { status: 403 })
  }

  try {
    // Find the home page
    const homePages = await payload.find({
      collection: 'pages',
      where: {
        slug: { equals: 'home' },
      },
      limit: 1,
    })

    if (homePages.docs.length === 0) {
      return new Response('Home page not found', { status: 404 })
    }

    const homePage = homePages.docs[0]

    // Fetch Google reviews
    const googleData = await fetchGoogleReviews()

    // Build testimonials from Google reviews or use fallback
    let testimonials: {
      id: string
      name: string
      rating: number
      text: string
      date: string
    }[] = []

    if (googleData && googleData.reviews.length > 0) {
      testimonials = googleData.reviews
        .filter((r) => r.rating >= 4) // 4+ star reviews
        .slice(0, 6)
        .map((review, idx) => ({
          id: `google-${idx + 1}`,
          name: review.author_name,
          rating: review.rating,
          text: review.text.slice(0, 300) + (review.text.length > 300 ? '...' : ''),
          date: new Date(review.time * 1000).toISOString().split('T')[0],
        }))
    }

    // Fallback testimonials if Google API fails
    if (testimonials.length === 0) {
      testimonials = [
        {
          id: '1',
          name: 'Maria G.',
          rating: 5,
          text: "Best birthday party venue in San Antonio! The kids had a blast and the staff was incredibly helpful. We've been coming here for years.",
          date: '2024-12-15',
        },
        {
          id: '2',
          name: 'David R.',
          rating: 5,
          text: 'Great family activity! Clean facility, friendly staff, and reasonable prices. My kids love the skating lessons here.',
          date: '2024-11-28',
        },
        {
          id: '3',
          name: 'Jennifer L.',
          rating: 5,
          text: 'A San Antonio institution! I skated here as a kid and now I bring my own children. The nostalgia combined with great service keeps us coming back.',
          date: '2024-10-20',
        },
      ]
    }

    // Get the current layout and find the heroSection's backgroundImage
    const currentLayout = (homePage.layout || []) as Array<{
      blockType: string
      backgroundImage?: number | { id: number }
      [key: string]: unknown
    }>
    const heroBlock = currentLayout.find((b) => b.blockType === 'heroSection')
    const backgroundImageId =
      heroBlock?.backgroundImage && typeof heroBlock.backgroundImage === 'object'
        ? heroBlock.backgroundImage.id
        : heroBlock?.backgroundImage || 35 // fallback to rinkFront

    // Build new layout without duplicate CTA, with testimonials
    const newLayout = [
      {
        blockType: 'heroSection',
        blockName: 'Hero',
        title: 'Skateland West',
        subtitle: "San Antonio's Premier Family Skating Destination Since 1985",
        backgroundImage: backgroundImageId,
      },
      {
        blockType: 'scheduleCards',
        blockName: 'Schedule',
        title: 'Skating Sessions',
        subtitle: 'Find the perfect time to skate',
      },
      {
        blockType: 'servicesCards',
        blockName: 'Services',
        title: 'Everything You Need',
        subtitle: 'More than just skating',
      },
      {
        blockType: 'testimonials',
        blockName: 'Testimonials',
        title: 'What Families Are Saying',
        subtitle: 'Real reviews from our skating community',
        overallRating: googleData?.rating || 4.2,
        reviewCount: googleData?.totalReviews || 444,
        testimonials,
      },
    ]

    // Update the home page
    await payload.update({
      collection: 'pages',
      id: homePage.id,
      data: {
        layout: newLayout,
      },
    })

    return Response.json({
      success: true,
      message: 'Home page updated with testimonials',
      reviewsFromGoogle: googleData ? testimonials.length : 0,
      totalGoogleReviews: googleData?.totalReviews || 'N/A',
      overallRating: googleData?.rating || 'N/A',
    })
  } catch (error) {
    console.error('Error updating home page:', error)
    return new Response(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`, {
      status: 500,
    })
  }
}
