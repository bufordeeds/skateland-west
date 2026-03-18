import { test, expect } from '@playwright/test'

test.describe('Responsive - Mobile', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('header shows hamburger menu on mobile', async ({ page }) => {
    await page.goto('/')

    // Desktop nav should be hidden
    await expect(page.getByRole('navigation').first()).toBeHidden()

    // Hamburger button should be visible
    const menuButton = page.getByRole('button').filter({ has: page.locator('svg') }).first()
    await expect(menuButton).toBeVisible()
  })

  test('no horizontal overflow on homepage', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth
    })

    expect(hasOverflow).toBe(false)
  })

  test('no horizontal overflow on content pages', async ({ page }) => {
    const paths = ['/schedule', '/birthday-parties', '/private-events', '/learn-to-skate', '/about']

    for (const path of paths) {
      await page.goto(path)
      await page.waitForLoadState('networkidle')

      const hasOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth
      })

      expect(hasOverflow, `Horizontal overflow on ${path}`).toBe(false)
    }
  })

  test('hero CTA buttons stack vertically on mobile', async ({ page }) => {
    await page.goto('/')

    const viewSchedule = page.getByRole('link', { name: 'VIEW SCHEDULE' })
    const bookParty = page.getByRole('link', { name: 'BOOK A PARTY' })

    const scheduleBox = await viewSchedule.boundingBox()
    const partyBox = await bookParty.boundingBox()

    // On mobile, buttons should stack (party button should be below schedule button)
    if (scheduleBox && partyBox) {
      expect(partyBox.y).toBeGreaterThan(scheduleBox.y)
    }
  })

  test('footer is visible on mobile', async ({ page }) => {
    await page.goto('/')
    const footer = page.getByRole('contentinfo')
    await footer.scrollIntoViewIfNeeded()
    await expect(footer.getByText('(210) 673-2568')).toBeVisible()
  })
})

test.describe('Responsive - Desktop', () => {
  test.use({ viewport: { width: 1440, height: 900 } })

  test('header shows full navigation on desktop', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByRole('navigation').first()).toBeVisible()
    await expect(page.getByRole('link', { name: 'Plan Visit' }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: 'About' }).first()).toBeVisible()
  })

  test('info bar is visible on desktop', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('(210) 673-2568').first()).toBeVisible()
    await expect(page.getByText('Open Today: Check Schedule')).toBeVisible()
  })
})
