import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Skateland West/)
  })

  test('hero section renders with neon sign', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'SKATELAND', level: 1 })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'WEST', level: 2 })).toBeVisible()
    await expect(page.getByText("San Antonio's Premier Family Skating Experience")).toBeVisible()
  })

  test('hero stats are visible', async ({ page }) => {
    await expect(page.getByText('Years Strong')).toBeVisible()
    await expect(page.getByText('Parties Hosted')).toBeVisible()
    await expect(page.getByText('Happy Families')).toBeVisible()
    await expect(page.getByText('444 Reviews')).toBeVisible()
  })

  test('hero CTA buttons are visible and linked', async ({ page }) => {
    const viewSchedule = page.getByRole('link', { name: 'VIEW SCHEDULE' })
    await viewSchedule.scrollIntoViewIfNeeded()

    await expect(viewSchedule).toBeVisible()
    await expect(viewSchedule).toHaveAttribute('href', '/schedule')

    const bookParty = page.getByRole('link', { name: 'BOOK A PARTY', exact: true })
    await expect(bookParty).toBeVisible()
    await expect(bookParty).toHaveAttribute('href', '/birthday-parties')

    const lessons = page.getByRole('link', { name: 'SKATING LESSONS' })
    await expect(lessons).toBeVisible()
    await expect(lessons).toHaveAttribute('href', '/learn-to-skate')
  })

  test('testimonials section renders', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /what families are saying/i })).toBeVisible()
    await expect(page.getByText('Maria G.')).toBeVisible()
    await expect(page.getByText('David R.')).toBeVisible()
    await expect(page.getByText('Jennifer L.')).toBeVisible()
  })

  test('footer renders with contact info', async ({ page }) => {
    const footer = page.getByRole('contentinfo')
    await expect(footer.getByText('(210) 673-2568')).toBeVisible()
    await expect(footer.getByText(/2327 S\.W\. Loop 410/)).toBeVisible()
    await expect(footer.getByText('info@skatelandwest.com')).toBeVisible()
  })

  test('footer renders with hours', async ({ page }) => {
    const footer = page.getByRole('contentinfo')
    await expect(footer.getByText(/sunday/i)).toBeVisible()
    await expect(footer.getByText(/saturday/i)).toBeVisible()
  })

  test('footer social links are present', async ({ page }) => {
    const footer = page.getByRole('contentinfo')
    await expect(footer.getByRole('link', { name: /facebook/i })).toBeVisible()
    await expect(footer.getByRole('link', { name: /instagram/i })).toBeVisible()
  })
})
