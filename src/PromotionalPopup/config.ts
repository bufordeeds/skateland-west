import type { GlobalConfig } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'
import { revalidatePopup } from './hooks/revalidatePopup'

export const PromotionalPopup: GlobalConfig = {
  slug: 'promotional-popup',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: false,
      label: 'Enable Popup',
      admin: {
        description: 'When enabled, the popup will appear once per visitor session.',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Popup Title',
    },
    {
      name: 'body',
      type: 'richText',
      editor: defaultLexical,
      label: 'Popup Content',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Popup Image',
      admin: {
        description: 'Optional image or flyer to display in the popup.',
      },
    },
    {
      name: 'ctaButton',
      type: 'group',
      label: 'Call to Action Button',
      admin: {
        description: 'Optional button displayed at the bottom of the popup.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Button Label',
        },
        {
          name: 'url',
          type: 'text',
          label: 'Button URL',
        },
        {
          name: 'newTab',
          type: 'checkbox',
          label: 'Open in new tab',
          defaultValue: false,
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidatePopup],
  },
}
