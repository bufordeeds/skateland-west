import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('logo links to homepage', async ({ page }) => {
    await page.goto('/about')
    await page.getByRole('link', { name: /skateland west/i }).first().click()
    await expect(page).toHaveURL('/')
  })

  test('all desktop nav links navigate to correct pages', async ({ page }) => {
    test.skip(!!test.info().project.name.includes('mobile'), 'Desktop-only test')
    await page.goto('/')

    const navLinks = [
      { name: 'Plan Visit', url: '/schedule' },
      { name: 'Birthday Parties', url: '/birthday-parties' },
      { name: 'Private Events', url: '/private-events' },
      { name: 'Learn to Skate', url: '/learn-to-skate' },
      { name: 'About', url: '/about' },
    ]

    for (const { name, url } of navLinks) {
      const link = page.getByRole('navigation').getByRole('link', { name }).first()
      await expect(link).toHaveAttribute('href', url)
    }
  })

  test('book a party CTA links to birthday parties', async ({ page }) => {
    await page.goto('/')
    const cta = page.getByRole('link', { name: /book a party/i }).first()
    await expect(cta).toHaveAttribute('href', '/birthday-parties')
  })

  test('search page loads', async ({ page }) => {
    await page.goto('/search')
    await expect(page.getByRole('heading', { name: /search/i })).toBeVisible()
  })
})

test.describe('Mobile Navigation', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('hamburger menu opens and shows all links', async ({ page }) => {
    await page.goto('/')

    const menuButton = page.getByRole('button').filter({ has: page.locator('svg') }).first()
    await menuButton.click()

    await expect(page.getByRole('link', { name: 'Plan Visit' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Birthday Parties' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Private Events' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Learn to Skate' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'About' })).toBeVisible()
  })

  test('mobile menu link navigates and closes menu', async ({ page }) => {
    await page.goto('/')

    const menuButton = page.getByRole('button').filter({ has: page.locator('svg') }).first()
    await menuButton.click()

    await page.getByRole('link', { name: 'About' }).click()
    await expect(page).toHaveURL('/about')
  })
})
