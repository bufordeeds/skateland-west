import type { Block } from 'payload'

export const NewsletterSignup: Block = {
  slug: 'newsletterSignup',
  interfaceName: 'NewsletterSignupBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      required: true,
      defaultValue: 'Get on Our Mailing List!',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      defaultValue:
        'Sign up to receive coupons, specials, and updates from Skateland West.',
    },
    {
      name: 'buttonText',
      type: 'text',
      label: 'Button Text',
      defaultValue: 'Subscribe',
    },
    {
      name: 'successMessage',
      type: 'text',
      label: 'Success Message',
      defaultValue: "You're on the list! Watch your inbox for coupons and specials.",
    },
    {
      name: 'gradient',
      type: 'checkbox',
      label: 'Use Gradient Background',
      defaultValue: false,
    },
  ],
  labels: {
    singular: 'Newsletter Signup',
    plural: 'Newsletter Signups',
  },
}
