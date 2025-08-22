import { Block } from 'payload'

export const ScheduleCards: Block = {
  slug: 'scheduleCards',
  interfaceName: 'ScheduleCardsBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      defaultValue: 'Weekly Schedule',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
      defaultValue: 'Every Day Brings a New Adventure',
    },
    {
      name: 'schedule',
      type: 'array',
      label: 'Schedule Days',
      minRows: 1,
      fields: [
        {
          name: 'day',
          type: 'select',
          label: 'Day',
          required: true,
          options: [
            { label: 'Monday', value: 'Monday' },
            { label: 'Tuesday', value: 'Tuesday' },
            { label: 'Wednesday', value: 'Wednesday' },
            { label: 'Thursday', value: 'Thursday' },
            { label: 'Friday', value: 'Friday' },
            { label: 'Saturday', value: 'Saturday' },
            { label: 'Sunday', value: 'Sunday' },
          ],
        },
        {
          name: 'hours',
          type: 'text',
          label: 'Hours',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Session Title',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          label: 'Description',
          required: true,
        },
        {
          name: 'price',
          type: 'text',
          label: 'Price',
          required: true,
        },
        {
          name: 'special',
          type: 'text',
          label: 'Special Offer',
        },
        {
          name: 'highlight',
          type: 'checkbox',
          label: 'Highlight this day',
          defaultValue: false,
        },
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          options: [
            { label: 'Star', value: 'star' },
            { label: 'Users', value: 'users' },
            { label: 'Music', value: 'music' },
            { label: 'Sparkles', value: 'sparkles' },
          ],
        },
      ],
    },
    {
      name: 'ctaText',
      type: 'text',
      label: 'CTA Button Text',
      defaultValue: 'View Full Schedule',
    },
    {
      name: 'ctaUrl',
      type: 'text',
      label: 'CTA Button URL',
      defaultValue: '/schedule',
    },
  ],
}