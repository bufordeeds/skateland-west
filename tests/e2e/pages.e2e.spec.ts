import { test, expect } from '@playwright/test'

const pages = [
  { path: '/schedule', heading: /plan your visit/i },
  { path: '/birthday-parties', heading: /birthday parties/i },
  { path: '/private-events', heading: /private events/i },
  { path: '/learn-to-skate', heading: /learn to skate/i },
  { path: '/about', heading: /about skateland west/i },
]

test.describe('Content Pages', () => {
  for (const { path, heading } of pages) {
    test(`${path} loads with correct heading`, async ({ page }) => {
      const response = await page.goto(path)
      expect(response?.status()).toBeLessThan(400)
      await expect(page.getByRole('heading', { name: heading }).first()).toBeVisible()
    })
  }

  for (const { path } of pages) {
    test(`${path} has no broken images`, async ({ page }) => {
      await page.goto(path)
      await page.waitForLoadState('networkidle')
      // Give lazy images extra time to load
      await page.waitForTimeout(1000)

      const brokenImages = await page.evaluate(() => {
        const images = Array.from(document.querySelectorAll('img'))
        return images
          .filter((img) => {
            // Skip lazy-loaded images not yet in viewport, SVG placeholders, and data URIs
            if (!img.src || img.src.startsWith('data:')) return false
            if (img.loading === 'lazy' && !img.complete) return false
            return img.complete && img.naturalWidth === 0
          })
          .map((img) => img.src)
      })

      expect(brokenImages).toEqual([])
    })
  }

  for (const { path } of pages) {
    test(`${path} has no console errors`, async ({ page }) => {
      const errors: string[] = []
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          errors.push(msg.text())
        }
      })

      await page.goto(path)
      await page.waitForLoadState('networkidle')

      // Filter out known non-critical errors (e.g. favicon)
      const criticalErrors = errors.filter(
        (e) => !e.includes('favicon') && !e.includes('DevTools'),
      )
      expect(criticalErrors).toEqual([])
    })
  }

  test('no internal links point to /contact (page does not exist)', async ({ page }) => {
    for (const { path } of pages) {
      await page.goto(path)
      const contactLinks = await page.locator('a[href="/contact"]').count()
      expect(contactLinks, `Found /contact link on ${path}`).toBe(0)
    }
  })
})

test.describe('404 Page', () => {
  test('non-existent page shows 404', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist')
    expect(response?.status()).toBe(404)
  })
})
