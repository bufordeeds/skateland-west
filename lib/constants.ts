export const SITE_CONFIG = {
  name: "Skateland West",
  tagline: "San Antonio's Premier Family Skating Experience",
  description: "Creating magical memories for families since 1985",
  phone: "(210) 523-9664",
  email: "info@skatelandwest.com",
  address: {
    street: "7322 US-90",
    city: "San Antonio",
    state: "TX",
    zip: "78227"
  },
  hours: {
    monday: "Closed",
    tuesday: "Closed", 
    wednesday: "6:00 PM - 8:30 PM",
    thursday: "6:00 PM - 8:30 PM",
    friday: "7:00 PM - 11:00 PM",
    saturday: "1:00 PM - 11:00 PM",
    sunday: "1:00 PM - 5:00 PM"
  },
  social: {
    facebook: "https://facebook.com/skatelandwest",
    instagram: "https://instagram.com/skatelandwest",
    twitter: "https://twitter.com/skatelandwest"
  },
  googleMapsUrl: "https://maps.google.com/?cid=1076730678051856509",
  rating: 4.2,
  reviewCount: 444
} as const;

export const NAVIGATION_ITEMS = [
  { label: "Plan Visit", href: "/schedule" },
  { label: "Birthday Parties", href: "/birthday-parties" },
  { label: "Private Events", href: "/private-events" },
  { label: "Learn to Skate", href: "/learn-to-skate" },
  { label: "About", href: "/about" }
] as const;

export const PARTY_PACKAGES = [
  {
    id: "basic",
    name: "Basic Party",
    price: 199,
    duration: "2 hours",
    guests: 10,
    featured: false,
    features: [
      "2 hours of skating",
      "Party room access",
      "Basic refreshments",
      "Party host",
      "Skate rental included"
    ]
  },
  {
    id: "popular",
    name: "Popular Party",
    price: 299,
    duration: "3 hours",
    guests: 15,
    featured: true,
    features: [
      "3 hours of skating",
      "Decorated party room",
      "Pizza & drinks",
      "Dedicated party host",
      "Party favors",
      "Skate rental included",
      "Birthday announcement"
    ]
  },
  {
    id: "ultimate",
    name: "Ultimate Party",
    price: 449,
    duration: "4 hours",
    guests: 20,
    featured: false,
    features: [
      "4 hours of skating",
      "Premium party room",
      "Full meal package",
      "Party coordinator",
      "Professional photography",
      "Custom decorations",
      "Skate rental included",
      "Special lighting effects",
      "Party favors & goodie bags"
    ]
  }
] as const;

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    text: "My daughter's birthday party at Skateland West was absolutely perfect! The staff took care of everything, and all the kids had a blast.",
    date: "2024-07-15"
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    rating: 5,
    text: "We've been coming here for years. It's clean, safe, and the perfect place for family fun. The new lighting system is amazing!",
    date: "2024-06-22"
  },
  {
    id: 3,
    name: "Amanda Chen",
    rating: 5,
    text: "Booked a corporate team building event here and it exceeded all expectations. Great venue, helpful staff, and everyone had fun!",
    date: "2024-05-30"
  }
] as const;