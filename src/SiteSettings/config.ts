import type { Field, GlobalConfig } from 'payload'

import { revalidateSiteSettings } from './hooks/revalidateSiteSettings'

const dayField = (
  name: string,
  label: string,
  defaults: { isOpen: boolean; hours: string },
): Field => ({
  name,
  type: 'group',
  label,
  fields: [
    {
      name: 'isOpen',
      type: 'checkbox',
      label: 'Open to the public',
      defaultValue: defaults.isOpen,
      admin: {
        description: 'Leave unchecked to show "Private Parties Only".',
      },
    },
    {
      name: 'hours',
      type: 'text',
      label: 'Hours',
      defaultValue: defaults.hours,
      admin: {
        placeholder: 'e.g. 6:00 PM - 10:30 PM',
        condition: (_data, siblingData) => Boolean(siblingData?.isOpen),
      },
    },
  ],
})

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Settings',
  },
  fields: [
    {
      name: 'businessName',
      type: 'text',
      label: 'Business Name',
      defaultValue: 'Skateland West',
    },
    {
      name: 'bookingUrl',
      type: 'text',
      label: 'Booking URL',
      defaultValue: 'https://skatelandwest.pcsparty.com/bookings/index.asp',
      admin: {
        description: 'Destination for the "Book a Party" buttons.',
      },
    },
    {
      name: 'contact',
      type: 'group',
      label: 'Contact',
      fields: [
        {
          name: 'phone',
          type: 'text',
          defaultValue: '(210) 673-2568',
        },
        {
          name: 'email',
          type: 'text',
          defaultValue: 'skatelandwest74@gmail.com',
        },
      ],
    },
    {
      name: 'address',
      type: 'group',
      label: 'Address',
      fields: [
        {
          name: 'street',
          type: 'text',
          defaultValue: '2327 S.W. Loop 410',
        },
        {
          type: 'row',
          fields: [
            {
              name: 'city',
              type: 'text',
              defaultValue: 'San Antonio',
              admin: { width: '50%' },
            },
            {
              name: 'state',
              type: 'text',
              defaultValue: 'TX',
              admin: { width: '25%' },
            },
            {
              name: 'zip',
              type: 'text',
              label: 'ZIP',
              defaultValue: '78227',
              admin: { width: '25%' },
            },
          ],
        },
        {
          name: 'googleMapsUrl',
          type: 'text',
          label: 'Google Maps URL',
          defaultValue:
            'https://www.google.com/maps/place/Skateland+West/@29.4073877,-98.6532231,17z/data=!4m6!3m5!1s0x865c5b50ed0616bf:0x4767b14115ede262!8m2!3d29.4073831!4d-98.6506482!16s%2Fg%2F1ts_70fk',
        },
      ],
    },
    {
      name: 'social',
      type: 'group',
      label: 'Social Links',
      fields: [
        {
          name: 'facebook',
          type: 'text',
          defaultValue: 'https://www.facebook.com/myskatelandwest/',
        },
        {
          name: 'instagram',
          type: 'text',
          defaultValue: 'https://www.instagram.com/skateland_west/',
        },
        {
          name: 'x',
          type: 'text',
          label: 'X (Twitter)',
          defaultValue: 'https://x.com/Skateland_West',
        },
      ],
    },
    {
      name: 'hours',
      type: 'group',
      label: 'Hours of Operation',
      admin: {
        description:
          'Set each day. Uncheck "Open to the public" for days that are private parties only.',
      },
      fields: [
        dayField('sunday', 'Sunday', { isOpen: true, hours: '2:00 PM - 6:00 PM' }),
        dayField('monday', 'Monday', { isOpen: false, hours: '' }),
        dayField('tuesday', 'Tuesday', { isOpen: false, hours: '' }),
        dayField('wednesday', 'Wednesday', { isOpen: false, hours: '' }),
        dayField('thursday', 'Thursday', { isOpen: true, hours: '6:00 PM - 9:00 PM' }),
        dayField('friday', 'Friday', { isOpen: true, hours: '6:00 PM - 10:30 PM' }),
        dayField('saturday', 'Saturday', { isOpen: true, hours: '1:30 PM - 10:30 PM' }),
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateSiteSettings],
  },
}
