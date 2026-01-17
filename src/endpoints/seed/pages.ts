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
        richText: {
          root: {
            type: 'root',
            children: [
              {
                type: 'heading',
                tag: 'h1',
                children: [{ type: 'text', text: 'Welcome to Skateland West', version: 1 }],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
        media: MEDIA.rinkFront,
      },
      layout: [
        {
          blockType: 'heroSection',
          blockName: 'Hero',
          title: 'Skateland West',
          subtitle: "San Antonio's Premier Family Skating Destination Since 1985",
          backgroundImage: MEDIA.rinkFront,
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
          blockType: 'cta',
          blockName: 'CTA',
          richText: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'heading',
                  tag: 'h2',
                  children: [{ type: 'text', text: 'Ready to Roll?', version: 1 }],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  version: 1,
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Book your next skating session or plan an unforgettable birthday party!',
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  textFormat: 0,
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
          },
          links: [
            {
              link: {
                type: 'custom',
                label: 'View Schedule',
                url: '/schedule',
                appearance: 'default',
              },
            },
            {
              link: {
                type: 'custom',
                label: 'Book a Party',
                url: '/birthday-parties',
                appearance: 'outline',
              },
            },
          ],
        },
      ],
      meta: {
        title: 'Skateland West | San Antonio Roller Skating Rink',
        description:
          "San Antonio's premier family roller skating destination since 1985. Public sessions, birthday parties, private events, and learn-to-skate lessons.",
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
        richText: {
          root: {
            type: 'root',
            children: [
              {
                type: 'heading',
                tag: 'h1',
                children: [{ type: 'text', text: 'Plan Your Visit', version: 1 }],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
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
        },
        {
          blockType: 'content',
          blockName: 'Admission Info',
          columns: [
            {
              size: 'half',
              richText: {
                root: {
                  type: 'root',
                  children: [
                    {
                      type: 'heading',
                      tag: 'h2',
                      children: [{ type: 'text', text: 'Admission Prices', version: 1 }],
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                      version: 1,
                    },
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          text: 'General Admission: $8.00\nSkate Rental: $4.00\nSpeed Skates: $6.00',
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                      textFormat: 0,
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  version: 1,
                },
              },
            },
            {
              size: 'half',
              richText: {
                root: {
                  type: 'root',
                  children: [
                    {
                      type: 'heading',
                      tag: 'h2',
                      children: [{ type: 'text', text: 'What to Bring', version: 1 }],
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                      version: 1,
                    },
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          text: 'Comfortable clothes and socks. We provide skates in all sizes, or bring your own!',
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                      textFormat: 0,
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  version: 1,
                },
              },
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
          'Plan your visit to Skateland West. Check our skating session times, admission prices, and special events.',
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
        richText: {
          root: {
            type: 'root',
            children: [
              {
                type: 'heading',
                tag: 'h1',
                children: [{ type: 'text', text: 'Birthday Parties', version: 1 }],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
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
          blockName: 'Packages',
          title: 'Party Packages',
          subtitle: 'Choose the perfect package for your celebration',
        },
        {
          blockType: 'mediaBlock',
          blockName: 'Party Room Photos',
          media: MEDIA.partyRoom1,
        },
        {
          blockType: 'content',
          blockName: 'Party Info',
          columns: [
            {
              size: 'full',
              richText: {
                root: {
                  type: 'root',
                  children: [
                    {
                      type: 'heading',
                      tag: 'h2',
                      children: [{ type: 'text', text: 'All Parties Include', version: 1 }],
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                      version: 1,
                    },
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          text: '• Private party room for 1.5 hours\n• Skating admission for all guests\n• Skate rental for all guests\n• Paper goods (plates, napkins, cups)\n• Dedicated party host\n• Ice cream cake\n• Pizza and drinks',
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                      textFormat: 0,
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  version: 1,
                },
              },
            },
          ],
        },
        {
          blockType: 'ctaSection',
          blockName: 'Book Now',
          title: 'Ready to Book?',
          description: 'Call us to reserve your party date!',
          gradient: true,
          primaryButton: {
            label: 'Book Your Party',
            url: '/contact',
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
          'Host an unforgettable birthday party at Skateland West! Party packages include skating, private room, pizza, cake, and more.',
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
        richText: {
          root: {
            type: 'root',
            children: [
              {
                type: 'heading',
                tag: 'h1',
                children: [{ type: 'text', text: 'Private Events', version: 1 }],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
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
          blockType: 'content',
          blockName: 'Event Info',
          columns: [
            {
              size: 'half',
              richText: {
                root: {
                  type: 'root',
                  children: [
                    {
                      type: 'heading',
                      tag: 'h2',
                      children: [{ type: 'text', text: 'Perfect For', version: 1 }],
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                      version: 1,
                    },
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          text: '• Corporate team building\n• Church groups\n• School fundraisers\n• Scout troops\n• Family reunions\n• Quinceañeras\n• Lock-ins',
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                      textFormat: 0,
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  version: 1,
                },
              },
            },
            {
              size: 'half',
              richText: {
                root: {
                  type: 'root',
                  children: [
                    {
                      type: 'heading',
                      tag: 'h2',
                      children: [{ type: 'text', text: 'What We Offer', version: 1 }],
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                      version: 1,
                    },
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          text: '• Exclusive use of the entire facility\n• Professional DJ and sound system\n• Full snack bar service\n• Arcade games available\n• Flexible scheduling\n• Custom catering options',
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                      textFormat: 0,
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  version: 1,
                },
              },
            },
          ],
        },
        {
          blockType: 'mediaBlock',
          blockName: 'Facility Photo',
          media: MEDIA.floorHostBoothAirHockey,
        },
        {
          blockType: 'ctaSection',
          blockName: 'Contact',
          title: 'Plan Your Event',
          description: 'Contact us to discuss your event needs and get a custom quote.',
          gradient: true,
          primaryButton: {
            label: 'Request a Quote',
            url: '/contact',
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
          'Rent Skateland West for your private event. Perfect for corporate events, church groups, school fundraisers, and special celebrations.',
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
        richText: {
          root: {
            type: 'root',
            children: [
              {
                type: 'heading',
                tag: 'h1',
                children: [{ type: 'text', text: 'Learn to Skate', version: 1 }],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
      },
      layout: [
        {
          blockType: 'heroSection',
          blockName: 'Hero',
          title: 'Learn to Skate',
          subtitle: 'From first-timers to advanced skaters, we have lessons for everyone',
          backgroundImage: MEDIA.jamSkates,
        },
        {
          blockType: 'content',
          blockName: 'Lesson Info',
          columns: [
            {
              size: 'half',
              richText: {
                root: {
                  type: 'root',
                  children: [
                    {
                      type: 'heading',
                      tag: 'h2',
                      children: [{ type: 'text', text: 'Beginner Lessons', version: 1 }],
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                      version: 1,
                    },
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          text: 'Perfect for first-time skaters of all ages. Learn the basics:\n\n• How to stand and balance\n• Forward skating\n• How to stop safely\n• Turning techniques\n• Falling and getting up safely',
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                      textFormat: 0,
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  version: 1,
                },
              },
            },
            {
              size: 'half',
              richText: {
                root: {
                  type: 'root',
                  children: [
                    {
                      type: 'heading',
                      tag: 'h2',
                      children: [{ type: 'text', text: 'Intermediate & Advanced', version: 1 }],
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                      version: 1,
                    },
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          text: 'Take your skills to the next level:\n\n• Crossovers and advanced turns\n• Backward skating\n• Speed techniques\n• Dance moves\n• Jam skating basics',
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                      textFormat: 0,
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  version: 1,
                },
              },
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
          title: 'Ready to Learn?',
          description: 'Call us to schedule your lesson or ask about group rates.',
          gradient: true,
          primaryButton: {
            label: 'Sign Up Now',
            url: '/contact',
            icon: 'calendar',
          },
          secondaryButton: {
            label: 'Call to Schedule',
            phone: '(210) 673-2568',
            icon: 'phone',
          },
        },
      ],
      meta: {
        title: 'Learn to Skate',
        description:
          'Learn to roller skate at Skateland West! Lessons for beginners, intermediate, and advanced skaters of all ages.',
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
        richText: {
          root: {
            type: 'root',
            children: [
              {
                type: 'heading',
                tag: 'h1',
                children: [{ type: 'text', text: 'About Skateland West', version: 1 }],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
      },
      layout: [
        {
          blockType: 'heroSection',
          blockName: 'Hero',
          title: 'About Skateland West',
          subtitle: 'Creating family memories since 1985',
          backgroundImage: MEDIA.skateCounter2,
        },
        {
          blockType: 'content',
          blockName: 'Our Story',
          columns: [
            {
              size: 'full',
              richText: {
                root: {
                  type: 'root',
                  children: [
                    {
                      type: 'heading',
                      tag: 'h2',
                      children: [{ type: 'text', text: 'Our Story', version: 1 }],
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                      version: 1,
                    },
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          text: "For nearly four decades, Skateland West has been San Antonio's go-to destination for family fun and skating excitement. Since opening our doors in 1985, we've hosted countless birthday parties, helped thousands of people learn to skate, and created millions of memories for families across the city.",
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                      textFormat: 0,
                      version: 1,
                    },
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          text: "Our commitment to providing a safe, clean, and fun environment has made us a beloved institution in the San Antonio community. Whether you're a first-time skater or a seasoned pro, you'll find a welcoming atmosphere at Skateland West.",
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                      textFormat: 0,
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  version: 1,
                },
              },
            },
          ],
        },
        {
          blockType: 'content',
          blockName: 'Facilities',
          columns: [
            {
              size: 'oneThird',
              richText: {
                root: {
                  type: 'root',
                  children: [
                    {
                      type: 'heading',
                      tag: 'h3',
                      children: [{ type: 'text', text: 'The Rink', version: 1 }],
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                      version: 1,
                    },
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          text: 'Our 16,000 sq ft maple wood skating floor is one of the finest in Texas, providing the perfect surface for skaters of all skill levels.',
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                      textFormat: 0,
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  version: 1,
                },
              },
            },
            {
              size: 'oneThird',
              richText: {
                root: {
                  type: 'root',
                  children: [
                    {
                      type: 'heading',
                      tag: 'h3',
                      children: [{ type: 'text', text: 'Cafe 2327', version: 1 }],
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                      version: 1,
                    },
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          text: 'Our snack bar offers pizza, nachos, hot dogs, candy, and drinks to keep you fueled for more skating fun.',
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                      textFormat: 0,
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  version: 1,
                },
              },
            },
            {
              size: 'oneThird',
              richText: {
                root: {
                  type: 'root',
                  children: [
                    {
                      type: 'heading',
                      tag: 'h3',
                      children: [{ type: 'text', text: 'Arcade', version: 1 }],
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                      version: 1,
                    },
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          text: 'Take a break from skating and enjoy our arcade games including air hockey, foosball, and video games.',
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      format: '',
                      indent: 0,
                      textFormat: 0,
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  version: 1,
                },
              },
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
          description: "We're located on SW Loop 410, just minutes from anywhere in San Antonio.",
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
          "Learn about Skateland West, San Antonio's premier family skating destination since 1985. Discover our story, facilities, and commitment to family fun.",
        image: MEDIA.skateCounter2,
      },
    },
  })

  payload.logger.info('Pages seeded successfully!')
}
