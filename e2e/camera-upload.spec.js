import { test, expect } from '@playwright/test'

test.describe('Camera Upload Feature', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display upload area with instructions', async ({ page }) => {
    await expect(page.getByText('Ready to scan?')).toBeVisible()
    await expect(page.getByText('Take a photo of a food label or nutrition facts panel')).toBeVisible()
  })

  test('should show "Take Photo" and "Choose from Gallery" buttons', async ({ page }) => {
    await expect(page.getByText('Take Photo')).toBeVisible()
    await expect(page.getByText('Choose from Gallery')).toBeVisible()
  })

  test('should display Pro Tips section', async ({ page }) => {
    await expect(page.getByText('Pro Tips')).toBeVisible()
    await expect(page.getByText('Ensure good lighting for better text recognition')).toBeVisible()
  })

  test('should display Recent Scans section', async ({ page }) => {
    await expect(page.getByText('Recent Scans')).toBeVisible()
  })

  test('should show "No recent scans yet" when empty', async ({ page }) => {
    // Clear localStorage for this test
    await page.evaluate(() => {
      localStorage.clear()
    })
    await page.reload()
    
    await expect(page.getByText('No recent scans yet')).toBeVisible()
    await expect(page.getByText('Your scanned food labels will appear here')).toBeVisible()
  })

  test('should handle file input click', async ({ page }) => {
    // Click the Take Photo button
    await page.getByText('Take Photo').click()
    
    // File input should be in the DOM (even if not visible)
    const fileInput = page.locator('input[type="file"]')
    await expect(fileInput).toBeAttached()
  })
})
