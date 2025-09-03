# Skateland West CMS Content

This directory contains content for all the main pages that should be created in the Payload CMS admin panel.

## How to Use These Files

1. **Go to your Payload admin panel** at `http://localhost:3002/admin`
2. **Navigate to Collections > Pages**
3. **Create a new page** for each content file
4. **Copy the content** from each markdown file into the appropriate fields

## Page Setup Instructions

For each page (01-home.md through 08-contact.md):

### 1. Basic Page Information
- **Title:** Use the "Page Title" from the markdown file
- **Slug:** Use the "Slug" from the markdown file  
- **Meta Description:** Copy from the markdown file
- **Published:** Set to true
- **Parent:** Leave blank (these are top-level pages)

### 2. Layout Builder
Use the Layout Builder to add blocks. Each markdown file specifies:
- **Block Type** (e.g., HeroSection, Content, ServicesCards)
- **Content** for each field in that block
- **Order** (blocks are numbered in the order they should appear)

### 3. Block-by-Block Setup

**Hero Section Block:**
- Copy heading, subheading, description
- Set button text and links

**Content Block:**
- Copy the markdown content directly into the rich text editor
- Format as needed (headings, lists, etc.)

**Services Cards Block:**
- Add each service as a card
- Use the icons specified (or choose similar ones)
- Copy descriptions

**Party Packages Block:**
- Set up each package with pricing and features
- Mark popular packages as indicated

**Schedule Cards Block:**
- Create a card for each time slot
- Include day, time, description, and price

**Testimonials Block:**
- Add each testimonial with name, rating, and text

**CTA Section Block:**
- Copy heading, subheading, description
- Set button text and links

**Form Block (Contact page only):**
- Set up contact form with specified fields
- Configure email destination

## File List

1. **01-home.md** - Home page (slug: home)
2. **02-about.md** - About Us page (slug: about)
3. **03-birthday-parties.md** - Birthday Parties page (slug: birthday-parties)
4. **04-schedule.md** - Schedule & Hours page (slug: schedule)
5. **05-pricing.md** - Pricing page (slug: pricing)
6. **06-private-events.md** - Private Events page (slug: private-events)
7. **07-skating-lessons.md** - Skating Lessons page (slug: skating-lessons)
8. **08-contact.md** - Contact Us page (slug: contact)

## Navigation Setup

After creating all pages, update your Header global in Payload CMS to include:
- Home
- About
- Schedule
- Pricing
- Birthday Parties
- Private Events
- Skating Lessons
- Contact

## Important Notes

- **Phone Number:** Replace "210-555-0123" with your actual phone number
- **Email Addresses:** Replace placeholder emails with real ones
- **Address:** Update the address in the Contact page
- **Social Media:** Update social media handles with your actual accounts
- **Images:** Add relevant images to each page using Payload's Media collection
- **Hours:** Verify and adjust operating hours as needed
- **Pricing:** Confirm all pricing information is current

## Content Customization

Feel free to modify any content to match your specific:
- Pricing structure
- Operating hours  
- Services offered
- Contact information
- Facility details
- Special programs

The content provided is comprehensive but should be tailored to your actual business needs.