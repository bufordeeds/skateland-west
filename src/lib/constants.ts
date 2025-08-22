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
} as const

export const NAVIGATION_ITEMS = [
  { label: "Plan Visit", href: "/schedule" },
  { label: "Birthday Parties", href: "/birthday-parties" },
  { label: "Private Events", href: "/private-events" },
  { label: "Learn to Skate", href: "/learn-to-skate" },
  { label: "About", href: "/about" }
] as const