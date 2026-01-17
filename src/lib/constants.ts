export const SITE_CONFIG = {
  name: "Skateland West",
  tagline: "San Antonio's Premier Family Skating Experience",
  description: "Creating magical memories for families since 1985",
  phone: "(210) 673-2568",
  fax: "(210) 675-0274",
  email: "info@skatelandwest.com",
  address: {
    street: "2327 S.W. Loop 410",
    city: "San Antonio",
    state: "TX",
    zip: "78227"
  },
  hours: {
    sunday: "2:00 PM - 6:00 PM",
    monday: "Private Parties Only",
    tuesday: "Private Parties Only",
    wednesday: "Private Parties Only",
    thursday: "6:00 PM - 9:00 PM",
    friday: "7:30 PM - 10:30 PM",
    saturday: "1:30 PM - 10:30 PM"
  },
  social: {
    facebook: "https://www.facebook.com/myskatelandwest/",
    instagram: "https://www.instagram.com/skateland_west/",
    twitter: "https://twitter.com/skatelandwest"
  },
  googleMapsUrl: "https://www.google.com/maps/place/Skateland+West/@29.4073877,-98.6532231,17z/data=!4m6!3m5!1s0x865c5b50ed0616bf:0x4767b14115ede262!8m2!3d29.4073831!4d-98.6506482!16s%2Fg%2F1ts_70fk",
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