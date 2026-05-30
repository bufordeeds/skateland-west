import type { SiteSetting } from '@/payload-types'

import { SITE_CONFIG } from './constants'

export const PRIVATE_PARTIES_LABEL = 'Private Parties Only'

export const DAY_ORDER = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
] as const

export type DayKey = (typeof DAY_ORDER)[number]

export type ResolvedDay = {
  key: DayKey
  label: string
  isOpen: boolean
  /** Display string: the time range when open, or the private-parties label when closed. */
  hours: string
}

export type ResolvedSiteSettings = {
  businessName: string
  bookingUrl: string
  phone: string
  email: string
  address: { street: string; city: string; state: string; zip: string }
  googleMapsUrl: string
  social: { facebook: string; instagram: string; x: string }
  hours: ResolvedDay[]
}

function resolveDay(
  key: DayKey,
  day: NonNullable<SiteSetting['hours']>[DayKey] | undefined,
): ResolvedDay {
  const fallback = SITE_CONFIG.hours[key]
  const fallbackIsOpen = fallback !== PRIVATE_PARTIES_LABEL

  const isOpen = day?.isOpen ?? fallbackIsOpen
  const hours = isOpen ? day?.hours || (fallbackIsOpen ? fallback : '') : PRIVATE_PARTIES_LABEL

  return {
    key,
    label: key.charAt(0).toUpperCase() + key.slice(1),
    isOpen,
    hours,
  }
}

/**
 * Merge the editable `site-settings` global with the hardcoded SITE_CONFIG so the
 * UI always has a value, even before the global is first saved or if a field is blank.
 */
export function resolveSiteSettings(settings?: SiteSetting | null): ResolvedSiteSettings {
  return {
    businessName: settings?.businessName || SITE_CONFIG.name,
    bookingUrl: settings?.bookingUrl || SITE_CONFIG.bookingUrl,
    phone: settings?.contact?.phone || SITE_CONFIG.phone,
    email: settings?.contact?.email || SITE_CONFIG.email,
    address: {
      street: settings?.address?.street || SITE_CONFIG.address.street,
      city: settings?.address?.city || SITE_CONFIG.address.city,
      state: settings?.address?.state || SITE_CONFIG.address.state,
      zip: settings?.address?.zip || SITE_CONFIG.address.zip,
    },
    googleMapsUrl: settings?.address?.googleMapsUrl || SITE_CONFIG.googleMapsUrl,
    social: {
      facebook: settings?.social?.facebook || SITE_CONFIG.social.facebook,
      instagram: settings?.social?.instagram || SITE_CONFIG.social.instagram,
      x: settings?.social?.x || SITE_CONFIG.social.x,
    },
    hours: DAY_ORDER.map((key) => resolveDay(key, settings?.hours?.[key])),
  }
}

export function getTodayHours(hours: ResolvedDay[]): ResolvedDay | undefined {
  const todayKey = new Date()
    .toLocaleDateString('en-US', { weekday: 'long' })
    .toLowerCase() as DayKey
  return hours.find((day) => day.key === todayKey)
}
