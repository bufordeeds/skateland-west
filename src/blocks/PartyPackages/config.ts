import type { Block } from 'payload'

export const PartyPackages: Block = {
  slug: 'partyPackages',
  interfaceName: 'PartyPackagesBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      defaultValue: 'Birthday Party Packages',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Section Subtitle',
      defaultValue: 'Choose the perfect package for your celebration. All packages include skate rentals and a dedicated party host.',
    },
    {
      name: 'packages',
      type: 'array',
      label: 'Packages',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'id',
          type: 'text',
          label: 'Package ID',
          required: true,
          admin: {
            placeholder: 'basic, popular, ultimate',
          },
        },
        {
          name: 'name',
          type: 'text',
          label: 'Package Name',
          required: true,
        },
        {
          type: 'row',
          fields: [
            {
              name: 'price',
              type: 'number',
              label: 'Price ($)',
              required: true,
              min: 0,
            },
            {
              name: 'duration',
              type: 'text',
              label: 'Duration',
              required: true,
              defaultValue: '2 hours',
            },
            {
              name: 'guests',
              type: 'number',
              label: 'Number of Guests',
              required: true,
              min: 1,
            },
          ],
        },
        {
          name: 'featured',
          type: 'checkbox',
          label: 'Featured Package',
          defaultValue: false,
        },
        {
          name: 'features',
          type: 'array',
          label: 'Features',
          fields: [
            {
              name: 'feature',
              type: 'text',
              label: 'Feature',
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'buttonText',
              type: 'text',
              label: 'Button Text',
              defaultValue: 'Select This Package',
            },
            {
              name: 'buttonUrl',
              type: 'text',
              label: 'Button URL',
              defaultValue: '/birthday-parties',
            },
          ],
        },
      ],
    },
  ],
  labels: {
    singular: 'Party Packages Section',
    plural: 'Party Packages Sections',
  },
}