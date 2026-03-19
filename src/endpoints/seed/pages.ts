import type { Payload } from 'payload'

// Media IDs from uploaded photos
const MEDIA = {
  rinkFront: 35,
  rinkCenter: 23,
  rinkRightSide: 30,
  skateCounter: 32,
  skateCounter2: 28,
  jamSkates: 20,
  partyRoom1: 31,
  partyRoom2: 29,
  partyRoom3: 34,
  cafeMain: 22,
  cafeSeating: 21,
  cafePricing: 37,
  cafeEmployee: 26,
  floorHostBooth: 25,
  floorHostBoothAirHockey: 27,
  foosballAirHockey: 24,
  foosballAirHockey2: 33,
  restroomsSeating: 36,
}

// Reusable Lexical rich text helpers
const text = (content: string) => ({ type: 'text' as const, text: content, version: 1 })
const boldText = (content: string) => ({
  type: 'text' as const,
  text: content,
  format: 1,
  version: 1,
})
const paragraph = (children: object[]) => ({
  type: 'paragraph' as const,
  children,
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  textFormat: 0,
  version: 1,
})
const heading = (tag: 'h1' | 'h2' | 'h3', content: string) => ({
  type: 'heading' as const,
  tag,
  children: [text(content)],
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  version: 1,
})
const richTextRoot = (children: object[]) => ({
  root: {
    type: 'root' as const,
    children,
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
  },
})

// Real schedule data from old site
const SCHEDULE_DATA = [
  {
    day: 'Sunday',
    hours: '2:00 - 6:00 PM',
    title: 'Sunday Public Skating',
    description: 'Bring the whole family for an afternoon of skating fun.',
    price: '$10.16*',
    icon: 'users',
  },
  {
    day: 'Monday',
    hours: 'By Reservation',
    title: 'Private Parties',
    description: 'Available for private party bookings. Contact us to reserve.',
    price: 'Contact Us',
    icon: 'users',
  },
  {
    day: 'Tuesday',
    hours: 'By Reservation',
    title: 'Private Parties',
    description: 'Available for private party bookings. Contact us to reserve.',
    price: 'Contact Us',
    icon: 'users',
  },
  {
    day: 'Wednesday',
    hours: 'By Reservation',
    title: 'Private Parties',
    description: 'Available for private party bookings. Contact us to reserve.',
    price: 'Contact Us',
    icon: 'users',
  },
  {
    day: 'Thursday',
    hours: '6:00 - 9:00 PM',
    title: 'Throwback Thursday',
    description: 'An evening session with the best throwback jams.',
    price: '$7.34*',
    icon: 'music',
  },
  {
    day: 'Friday',
    hours: '6:00 - 10:30 PM',
    title: 'Friday Night Skate',
    description: 'The biggest night of the week! DJ, lights, and nonstop fun.',
    price: '$12.01*',
    highlight: true,
    icon: 'sparkles',
  },
  {
    day: 'Saturday',
    hours: '2:00 - 10:30 PM',
    title: 'All-Day Saturday',
    description: 'Our longest session — skate all day and into the night!',
    price: '$12.01',
    special: 'Lessons 1:30-2:00 PM ($15)',
    icon: 'star',
  },
]

export const seedPages = async (payload: Payload): Promise<void> => {
  payload.logger.info('Seeding pages...')

  // Create Home page
  await payload.create({
    collection: 'pages',
    data: {
      title: 'Home',
      slug: 'home',
      _status: 'published',
      hero: {
        type: 'highImpact',
        richText: richTextRoot([heading('h1', 'Welcome to Skateland West')]),
        media: MEDIA.rinkFront,
      },
      layout: [
        {
          blockType: 'heroSection',
          blockName: 'Hero',
          title: 'Skateland West',
          subtitle: "San Antonio's #1 Roller Skating Rink Since 1985",
          backgroundImage: MEDIA.rinkFront,
        },
        {
          blockType: 'scheduleCards',
          blockName: 'Schedule',
          title: 'Skating Sessions',
          subtitle: 'Find the perfect time to skate',
          schedule: SCHEDULE_DATA,
          ctaText: 'View Full Schedule',
          ctaUrl: '/schedule',
        },
        {
          blockType: 'servicesCards',
          blockName: 'Services',
          title: 'Everything You Need',
          subtitle: 'More than just skating',
          cards: [
            {
              icon: '🎂',
              title: 'Birthday Parties',
              description:
                'Celebrate with a skating party! Multiple packages available for public and private events.',
              features: [
                { feature: 'Public packages from $185' },
                { feature: 'Private rink rental available' },
                { feature: 'Glow party upgrades' },
                { feature: 'Online booking' },
              ],
              buttonText: 'View Packages',
              buttonUrl: '/birthday-parties',
              color: 'primary',
            },
            {
              icon: '🎉',
              title: 'Private Events',
              description:
                'Rent the entire rink for your group. Perfect for corporate events, church groups, and special occasions.',
              features: [
                { feature: 'Exclusive use of entire facility' },
                { feature: 'Professional DJ & sound system' },
                { feature: 'Custom catering options' },
              ],
              buttonText: 'Plan Your Event',
              buttonUrl: '/private-events',
              color: 'secondary',
            },
            {
              icon: '⛸️',
              title: 'Learn to Skate',
              description:
                'Lessons every Saturday from 1:30-2:00 PM for all ages and abilities.',
              features: [
                { feature: '$15 per person' },
                { feature: 'Beginner to advanced' },
                { feature: 'FREE skating after lessons' },
              ],
              buttonText: 'Learn More',
              buttonUrl: '/learn-to-skate',
              color: 'accent',
            },
            {
              icon: '👟',
              title: 'Skate Sales',
              description:
                'We stock Sure-Grip and Riedell skates. Other brands available upon request.',
              features: [
                { feature: 'Sure-Grip Skate Co.' },
                { feature: 'Riedell Skates' },
                { feature: 'Custom orders available' },
              ],
              buttonText: 'Visit Pro Shop',
              buttonUrl: '/about',
              color: 'primary',
            },
            {
              icon: '🍕',
              title: 'Snack Bar',
              description:
                'Fuel up with our full snack bar! Slushies, pizza, hot dogs, nachos, and more.',
              features: [
                { feature: 'Personal sized pizza' },
                { feature: 'ALL BEEF hot dogs' },
                { feature: 'Ricos Nachos & Pretzels' },
                { feature: 'Pepsi products & Slushies' },
              ],
              buttonText: 'Visit Us',
              buttonUrl: '/about',
              color: 'secondary',
            },
            {
              icon: '🕹️',
              title: 'Arcade & Games',
              description:
                'Take a break from skating and enjoy our arcade with air hockey, foosball, and video games.',
              features: [
                { feature: 'Air hockey tables' },
                { feature: 'Foosball' },
                { feature: 'Video games' },
                { feature: 'Redemption tickets' },
              ],
              buttonText: 'Learn More',
              buttonUrl: '/about',
              color: 'accent',
            },
          ],
        },
        {
          blockType: 'testimonials',
          blockName: 'Testimonials',
          title: 'What Families Are Saying',
          subtitle: 'Real reviews from our skating community',
          overallRating: 4.2,
          reviewCount: 444,
          testimonials: [
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
          ],
        },
        {
          blockType: 'newsletterSignup',
          blockName: 'Newsletter',
          heading: 'Get on Our Mailing List!',
          description:
            'Sign up to receive coupons, specials, and updates from Skateland West.',
          buttonText: 'Subscribe',
          successMessage:
            "You're on the list! Watch your inbox for coupons and specials.",
          gradient: false,
        },
      ],
      meta: {
        title: 'Skateland West | San Antonio Roller Skating Rink',
        description:
          "San Antonio's #1 roller skating rink since 1985. Public sessions, birthday parties, private events, and learn-to-skate lessons. The best music, prices, and experience in Texas!",
        image: MEDIA.rinkFront,
      },
    },
  })

  // Create Schedule page
  await payload.create({
    collection: 'pages',
    data: {
      title: 'Schedule & Hours',
      slug: 'schedule',
      _status: 'published',
      hero: {
        type: 'lowImpact',
        richText: richTextRoot([heading('h1', 'Plan Your Visit')]),
      },
      layout: [
        {
          blockType: 'heroSection',
          blockName: 'Hero',
          title: 'Plan Your Visit',
          subtitle: 'Check our schedule and admission prices',
          backgroundImage: MEDIA.rinkCenter,
        },
        {
          blockType: 'scheduleCards',
          blockName: 'Schedule',
          title: 'Public Skating Sessions',
          subtitle: 'Join us for open skating fun',
          schedule: SCHEDULE_DATA,
        },
        {
          blockType: 'content',
          blockName: 'Admission Info',
          columns: [
            {
              size: 'half',
              richText: richTextRoot([
                heading('h2', 'Admission Prices'),
                paragraph([boldText('Sunday:'), text(' $10.16*')]),
                paragraph([boldText('Thursday:'), text(' $7.34*')]),
                paragraph([boldText('Friday:'), text(' $12.01*')]),
                paragraph([boldText('Saturday:'), text(' $12.01')]),
                paragraph([boldText('Skate Lessons (Saturday 1:30-2:00 PM):'), text(' $15.00')]),
                paragraph([boldText('Non-Skating Parents:'), text(' $5.00 (must enter with child)')]),
                paragraph([text('*Plus State Sales Tax')]),
              ]),
            },
            {
              size: 'half',
              richText: richTextRoot([
                heading('h2', 'Important Policies'),
                paragraph([boldText('Payment: Cash Only!')]),
                paragraph([text('No refunds on admission.')]),
                paragraph([
                  text(
                    'Skate rental sizes: Juvenile 7 to Adult 15. Bring your own skates — all regular roller skates and inline skates welcome (must be safe and clean).',
                  ),
                ]),
                paragraph([
                  text(
                    'No heely-type skates, hover boards, skateboards, or other non-approved equipment.',
                  ),
                ]),
                paragraph([text('Prices and times subject to change without notice.')]),
              ]),
            },
          ],
        },
        {
          blockType: 'ctaSection',
          blockName: 'CTA',
          title: 'Questions?',
          description: 'Give us a call or stop by!',
          gradient: true,
          primaryButton: {
            label: 'Get Directions',
            url: 'https://www.google.com/maps/place/Skateland+West/@29.4073877,-98.6532231,17z',
            icon: 'calendar',
          },
          secondaryButton: {
            label: 'Call Now',
            phone: '(210) 673-2568',
            icon: 'phone',
          },
        },
      ],
      meta: {
        title: 'Schedule & Hours',
        description:
          'Plan your visit to Skateland West. Public skating sessions, admission prices, and policies. Open Thursday-Sunday with lessons on Saturday.',
        image: MEDIA.rinkCenter,
      },
    },
  })

  // Create Birthday Parties page
  await payload.create({
    collection: 'pages',
    data: {
      title: 'Birthday Parties',
      slug: 'birthday-parties',
      _status: 'published',
      hero: {
        type: 'lowImpact',
        richText: richTextRoot([heading('h1', 'Birthday Parties')]),
      },
      layout: [
        {
          blockType: 'heroSection',
          blockName: 'Hero',
          title: 'Birthday Parties',
          subtitle: 'Create unforgettable memories with a skating party!',
          backgroundImage: MEDIA.partyRoom3,
        },
        {
          blockType: 'partyPackages',
          blockName: 'Public Packages',
          title: 'Public Birthday Party Packages',
          subtitle:
            'Celebrate during a public skating session. All packages include skate rental and a dedicated party experience.',
          packages: [
            {
              id: 'ultimate',
              name: 'Ultimate Skater Package',
              price: 185,
              duration: '2+ hours skating',
              guests: 10,
              featured: false,
              features: [
                { feature: 'Admission & Skate Rental for 10' },
                { feature: '2+ hours of Roller Skating' },
                { feature: 'Birthday Song Played' },
                { feature: 'Invitations' },
                { feature: '10 Soft Drinks' },
                { feature: '10 Ice Creams' },
                { feature: '500 Redemption Tickets for Honoree' },
                { feature: 'Free Skating Pass for Honoree' },
                { feature: 'Discount Coupon for each Guest' },
                { feature: 'Each additional skater: $18.50' },
              ],
              buttonText: 'Book This Package',
              buttonUrl: 'https://skatelandwest.pcsparty.com/bookings/index.asp',
            },
            {
              id: 'glow',
              name: 'Glow Skater Package',
              price: 285,
              duration: '90 min room + 2hr skating',
              guests: 10,
              featured: true,
              features: [
                { feature: 'Admission & Skate Rental for 10' },
                { feature: 'Glow Party Room for 90 minutes' },
                { feature: '2+ hours of Roller Skating' },
                { feature: 'Birthday Song Played' },
                { feature: 'Invitations' },
                { feature: '10 Soft Drinks in Flashing Cups' },
                { feature: '10 Ice Creams' },
                { feature: '500 Redemption Tickets for Honoree' },
                { feature: '10 Glow Necklaces & Flashing Pacifiers' },
                { feature: 'Free Skating Pass for Honoree' },
                { feature: 'Discount Coupon for each Guest' },
                { feature: 'Each additional skater: $28.50' },
              ],
              buttonText: 'Book This Package',
              buttonUrl: 'https://skatelandwest.pcsparty.com/bookings/index.asp',
            },
          ],
        },
        {
          blockType: 'mediaBlock',
          blockName: 'Party Room Photos',
          media: MEDIA.partyRoom1,
        },
        {
          blockType: 'content',
          blockName: 'Party Rules & Add-ons',
          columns: [
            {
              size: 'half',
              richText: richTextRoot([
                heading('h2', 'Party Rules'),
                paragraph([text('No Outside Food or Drinks Allowed')]),
                paragraph([text('No Parties on Thursday, Friday or Saturday Nights')]),
                paragraph([text('Packages cannot be altered')]),
                paragraph([text('All Prices Plus State Sales Tax')]),
                paragraph([boldText('$100.00 Cash Deposit (Non-Refundable)')]),
              ]),
            },
            {
              size: 'half',
              richText: richTextRoot([
                heading('h2', 'Customize It — Add-ons'),
                paragraph([text('12" Pizza: $15.00')]),
                paragraph([text('Hotdogs: $3.50 each')]),
                paragraph([text('Pitcher of Soda (refill cups): $8.00')]),
                paragraph([text('Additional 16oz Soft Drink: $3.00')]),
                paragraph([text('Additional Ice Cream: $2.00 each')]),
                paragraph([text('Bag of Chips: $1.50 each')]),
                paragraph([
                  boldText(
                    'Place customized food orders at least 5 DAYS prior to scheduled party time. Sales Tax added to all Customized Items.',
                  ),
                ]),
              ]),
            },
          ],
        },
        {
          blockType: 'ctaSection',
          blockName: 'Book Now',
          title: 'Ready to Book?',
          description: 'Book online or call us to reserve your party date!',
          gradient: true,
          primaryButton: {
            label: 'Book Online',
            url: 'https://skatelandwest.pcsparty.com/bookings/index.asp',
            icon: 'calendar',
          },
          secondaryButton: {
            label: 'Call to Book',
            phone: '(210) 673-2568',
            icon: 'phone',
          },
        },
      ],
      meta: {
        title: 'Birthday Parties',
        description:
          'Host an unforgettable birthday party at Skateland West! Ultimate Skater Package from $185 or Glow Skater Package from $285. Includes skating, drinks, ice cream, and more.',
        image: MEDIA.partyRoom3,
      },
    },
  })

  // Create Private Events page
  await payload.create({
    collection: 'pages',
    data: {
      title: 'Private Events',
      slug: 'private-events',
      _status: 'published',
      hero: {
        type: 'lowImpact',
        richText: richTextRoot([heading('h1', 'Private Events')]),
      },
      layout: [
        {
          blockType: 'heroSection',
          blockName: 'Hero',
          title: 'Private Events',
          subtitle: 'Rent the entire rink for your special occasion',
          backgroundImage: MEDIA.rinkRightSide,
        },
        {
          blockType: 'partyPackages',
          blockName: 'Private Packages',
          title: 'Private Party Packages',
          subtitle:
            'Get the entire rink to yourselves. Perfect for birthdays, corporate events, church groups, and special celebrations.',
          packages: [
            {
              id: 'supreme',
              name: 'Supreme Skater Private Party',
              price: 475,
              duration: '2 hours (entire rink)',
              guests: 25,
              featured: false,
              features: [
                { feature: 'Admission & Skate Rental for 25' },
                { feature: 'Entire Rink Reserved for 2 Hours' },
                { feature: 'Birthday Song Played' },
                { feature: "Honoree's Name Announced" },
                { feature: 'Invitations' },
                { feature: '25 Soft Drinks & 25 Ice Cream' },
                { feature: '25 Plates, Forks & Napkins' },
                { feature: '500 Redemption Tickets for Honoree' },
                { feature: 'Free Skating Pass for Honoree' },
                { feature: 'Discount Pass for each Guest' },
                { feature: 'Each additional skater: $19.00' },
              ],
              buttonText: 'Book This Package',
              buttonUrl: 'https://skatelandwest.pcsparty.com/bookings/index.asp',
            },
            {
              id: 'glow-private',
              name: 'Glow Private Party',
              price: 712.5,
              duration: '2 hours (black light)',
              guests: 25,
              featured: true,
              features: [
                { feature: 'Admission & Skate Rental for 25' },
                { feature: '2 Hours of Black Light Skating' },
                { feature: 'Birthday Song Played' },
                { feature: "Honoree's Name Announced" },
                { feature: 'Invitations' },
                { feature: '25 Drinks in Flashing Cups' },
                { feature: '25 Ice Creams' },
                { feature: '25 Plates, Forks & Napkins' },
                { feature: '500 Redemption Tickets for Honoree' },
                { feature: '25 Glow Necklaces & 25 Flashing Pacifiers' },
                { feature: 'Free Skating Pass for Honoree' },
                { feature: 'Discount Coupon for each Guest' },
                { feature: 'Each additional skater: $28.50' },
              ],
              buttonText: 'Book This Package',
              buttonUrl: 'https://skatelandwest.pcsparty.com/bookings/index.asp',
            },
          ],
        },
        {
          blockType: 'mediaBlock',
          blockName: 'Facility Photo',
          media: MEDIA.floorHostBoothAirHockey,
        },
        {
          blockType: 'content',
          blockName: 'Private Party Rules & Add-ons',
          columns: [
            {
              size: 'half',
              richText: richTextRoot([
                heading('h2', 'Private Party Rules'),
                paragraph([text('No Outside Food or Drinks Allowed')]),
                paragraph([text('Private Parties scheduled based on availability')]),
                paragraph([text('All Prices Plus State Sales Tax')]),
                paragraph([boldText('$200.00 Cash Deposit (Non-Refundable)')]),
              ]),
            },
            {
              size: 'half',
              richText: richTextRoot([
                heading('h2', 'Customize It — Add-ons'),
                paragraph([text('12" Pizza: $15.00 (Minimum of 4)')]),
                paragraph([text('Hotdogs: $3.50 each (Minimum of 25)')]),
                paragraph([text('Pitcher of Soda (refill cups): $8.00')]),
                paragraph([text('Additional 16oz Soft Drink: $3.00')]),
                paragraph([text('Additional Ice Cream: $2.00 each')]),
                paragraph([text('Bag of Chips: $1.50 each')]),
                paragraph([
                  boldText(
                    'Place customized food orders at least 5 DAYS prior to scheduled party time. Sales Tax added to all Customized Items.',
                  ),
                ]),
              ]),
            },
          ],
        },
        {
          blockType: 'ctaSection',
          blockName: 'Contact',
          title: 'Plan Your Private Event',
          description: 'Contact us to check availability and reserve your date.',
          gradient: true,
          primaryButton: {
            label: 'Book Online',
            url: 'https://skatelandwest.pcsparty.com/bookings/index.asp',
            icon: 'calendar',
          },
          secondaryButton: {
            label: 'Call Us',
            phone: '(210) 673-2568',
            icon: 'phone',
          },
        },
      ],
      meta: {
        title: 'Private Events',
        description:
          'Rent Skateland West for your private event. Supreme Skater from $475, Glow Private from $712.50. Entire rink reserved for your group.',
        image: MEDIA.rinkRightSide,
      },
    },
  })

  // Create Learn to Skate page
  await payload.create({
    collection: 'pages',
    data: {
      title: 'Learn to Skate',
      slug: 'learn-to-skate',
      _status: 'published',
      hero: {
        type: 'lowImpact',
        richText: richTextRoot([heading('h1', 'Learn to Skate')]),
      },
      layout: [
        {
          blockType: 'heroSection',
          blockName: 'Hero',
          title: 'Learn to Skate',
          subtitle: 'Lessons every Saturday for all ages and abilities',
          backgroundImage: MEDIA.jamSkates,
        },
        {
          blockType: 'content',
          blockName: 'Lesson Info',
          columns: [
            {
              size: 'half',
              richText: richTextRoot([
                heading('h2', 'Skate Lessons'),
                paragraph([
                  text('Skateland West offers skate lessons every Saturday from '),
                  boldText('1:30-2:00 PM'),
                  text(', for only '),
                  boldText('$15.00 per person'),
                  text('.'),
                ]),
                paragraph([
                  text(
                    'Lessons are great for any age and ability. We teach basic beginner skating in addition to the most advanced and newest skills.',
                  ),
                ]),
              ]),
            },
            {
              size: 'half',
              richText: richTextRoot([
                heading('h2', 'Free Skating Perk'),
                paragraph([
                  text(
                    "If you come to participate in Skateland West's lessons, you have the opportunity to skate during the Saturday ",
                  ),
                  boldText('2:00-10:30 PM'),
                  text(' skate session '),
                  boldText('FREE OF CHARGE'),
                  text('!'),
                ]),
                paragraph([
                  text(
                    "That's over 8 hours of skating for just $15 — the best deal at Skateland West!",
                  ),
                ]),
              ]),
            },
          ],
        },
        {
          blockType: 'mediaBlock',
          blockName: 'Skates Photo',
          media: MEDIA.skateCounter,
        },
        {
          blockType: 'ctaSection',
          blockName: 'Sign Up',
          title: 'Join Us This Saturday!',
          description:
            'Lessons are every Saturday at 1:30 PM. No reservation needed — just show up and skate!',
          gradient: true,
          primaryButton: {
            label: 'View Schedule',
            url: '/schedule',
            icon: 'calendar',
          },
          secondaryButton: {
            label: 'Call for Info',
            phone: '(210) 673-2568',
            icon: 'phone',
          },
        },
      ],
      meta: {
        title: 'Learn to Skate',
        description:
          'Learn to roller skate at Skateland West! Lessons every Saturday 1:30-2:00 PM for $15. All ages and abilities. Skate FREE the rest of the day after your lesson!',
        image: MEDIA.jamSkates,
      },
    },
  })

  // Create About page
  await payload.create({
    collection: 'pages',
    data: {
      title: 'About Us',
      slug: 'about',
      _status: 'published',
      hero: {
        type: 'lowImpact',
        richText: richTextRoot([heading('h1', 'About Skateland West')]),
      },
      layout: [
        {
          blockType: 'heroSection',
          blockName: 'Hero',
          title: 'About Skateland West',
          subtitle: "San Antonio's #1 Roller Skating Rink",
          backgroundImage: MEDIA.skateCounter2,
        },
        {
          blockType: 'content',
          blockName: 'Welcome',
          columns: [
            {
              size: 'full',
              richText: richTextRoot([
                heading('h2', 'Welcome to Skateland West'),
                paragraph([
                  text(
                    'We are the #1 Roller Skating Rink in San Antonio! We have the "Best" Music, the "Best" Prices and the "Best" Customers in the great state of Texas.',
                  ),
                ]),
                paragraph([
                  text(
                    'Skateland West\'s goal is to provide you the "Best" Roller Skating Experience. We want you to leave satisfied, happy and wanting more Roller Skating Fun.',
                  ),
                ]),
                paragraph([
                  text(
                    "Skateland West offers a variety of public skating sessions to meet your specific needs. We play all kinds of music from Shake Rattle and Roll (50's) to Funkytown (Disco), Back in Black (Rock), Hard Knock Life (Hip Hop), All My Life (R&B) & a little Country.",
                  ),
                ]),
                paragraph([text('Hope to see you skating here soon!')]),
              ]),
            },
          ],
        },
        {
          blockType: 'content',
          blockName: 'Facilities',
          columns: [
            {
              size: 'oneThird',
              richText: richTextRoot([
                heading('h3', 'The Rink'),
                paragraph([
                  text(
                    'Our 16,000 sq ft maple wood skating floor is one of the finest in Texas, providing the perfect surface for skaters of all skill levels.',
                  ),
                ]),
              ]),
            },
            {
              size: 'oneThird',
              richText: richTextRoot([
                heading('h3', 'Snack Bar'),
                paragraph([
                  text(
                    'Fuel up at our full snack bar! We serve Slushies, Personal Sized Pizza, ALL BEEF Hot Dogs, Pretzels, and Ricos Nachos. Pepsi products available.',
                  ),
                ]),
              ]),
            },
            {
              size: 'oneThird',
              richText: richTextRoot([
                heading('h3', 'Arcade'),
                paragraph([
                  text(
                    'Take a break from skating and enjoy our arcade games including air hockey, foosball, and video games. Earn redemption tickets for prizes!',
                  ),
                ]),
              ]),
            },
          ],
        },
        {
          blockType: 'content',
          blockName: 'Skate Sales',
          columns: [
            {
              size: 'full',
              richText: richTextRoot([
                heading('h2', 'We Sell Skates'),
                paragraph([
                  text('Skateland West stocks '),
                  boldText('Sure-Grip'),
                  text(' and '),
                  boldText('Riedell'),
                  text(
                    ' skates. Other brands of skates available upon request. Stop in today so we can help you pick out the perfect pair of skates for you!',
                  ),
                ]),
              ]),
            },
          ],
        },
        {
          blockType: 'mediaBlock',
          blockName: 'Cafe Photo',
          media: MEDIA.cafeMain,
        },
        {
          blockType: 'ctaSection',
          blockName: 'Visit',
          title: 'Come See Us!',
          description: "We're located at 2327 S.W. Loop 410, San Antonio, TX 78227.",
          gradient: true,
          primaryButton: {
            label: 'Get Directions',
            url: 'https://www.google.com/maps/place/Skateland+West/@29.4073877,-98.6532231,17z',
            icon: 'calendar',
          },
          secondaryButton: {
            label: 'Call Us',
            phone: '(210) 673-2568',
            icon: 'phone',
          },
        },
      ],
      meta: {
        title: 'About Us',
        description:
          "Learn about Skateland West, San Antonio's #1 roller skating rink since 1985. The best music, prices, and skating experience in Texas!",
        image: MEDIA.skateCounter2,
      },
    },
  })

  payload.logger.info('Pages seeded successfully!')
}
