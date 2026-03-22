import type { Block } from 'payload'

export const ServicesCards: Block = {
  slug: 'servicesCards',
  interfaceName: 'ServicesCardsBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Section Subtitle',
    },
    {
      name: 'cards',
      type: 'array',
      label: 'Service Cards',
      minRows: 1,
      maxRows: 8,
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          required: true,
          defaultValue: 'party-popper',
          options: [
            { label: 'Cake (Birthday)', value: 'cake' },
            { label: 'Party Popper (Events)', value: 'party-popper' },
            { label: 'Snowflake (Skating)', value: 'snowflake' },
            { label: 'Shopping Bag (Sales)', value: 'shopping-bag' },
            { label: 'Utensils (Food)', value: 'utensils-crossed' },
            { label: 'Gamepad (Arcade)', value: 'gamepad' },
          ],
        },
        {
          name: 'title',
          type: 'text',
          label: 'Card Title',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          label: 'Card Description',
          required: true,
        },
        {
          name: 'features',
          type: 'array',
          label: 'Features List',
          fields: [
            {
              name: 'feature',
              type: 'text',
              label: 'Feature',
            },
          ],
        },
        {
          name: 'buttonText',
          type: 'text',
          label: 'Button Text',
          defaultValue: 'Learn More',
        },
        {
          name: 'buttonUrl',
          type: 'text',
          label: 'Button URL',
          defaultValue: '#',
        },
        {
          name: 'color',
          type: 'select',
          label: 'Icon Background Color',
          defaultValue: 'primary',
          options: [
            {
              label: 'Primary',
              value: 'primary',
            },
            {
              label: 'Secondary',
              value: 'secondary',
            },
            {
              label: 'Accent',
              value: 'accent',
            },
          ],
        },
      ],
    },
  ],
  labels: {
    singular: 'Services Cards Section',
    plural: 'Services Cards Sections',
  },
}