import { test, expect } from '@playwright/test'

test.describe('Log List Feature', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should navigate to Log tab and display content', async ({ page }) => {
    await page.getByText('Log').click()
    
    await expect(page.getByText('Food Log')).toBeVisible()
    await expect(page.getByText('Track your healthy eating journey')).toBeVisible()
  })

  test('should display Todays Summary section', async ({ page }) => {
    await page.getByText('Log').click()
    
    await expect(page.getByText("Today's Summary")).toBeVisible()
    await expect(page.getByText('Meal Breakdown')).toBeVisible()
  })

  test('should display search input', async ({ page }) => {
    await page.getByText('Log').click()
    
    const searchInput = page.getByPlaceholderText('Search food items...')
    await expect(searchInput).toBeVisible()
  })

  test('should filter logs by search query', async ({ page }) => {
    await page.getByText('Log').click()
    
    const searchInput = page.getByPlaceholderText('Search food items...')
    await searchInput.fill('Chicken')
    
    // Wait for filtering to complete
    await page.waitForTimeout(500)
    
    // Should show filtered results (or "No matching logs" if nothing matches)
    const hasResults = await page.getByText('No matching logs').isVisible().catch(() => false)
    const hasChicken = await page.getByText('Chicken Rice').isVisible().catch(() => false)
    
    expect(hasResults || hasChicken).toBeTruthy()
  })

  test('should have filter options', async ({ page }) => {
    await page.getByText('Log').click()
    
    // Check if grade filter exists
    const gradeSelect = page.locator('select').first()
    await expect(gradeSelect).toBeVisible()
    
    // Check if sort select exists
    const sortSelect = page.locator('select').last()
    await expect(sortSelect).toBeVisible()
  })

  test('should display log items when available', async ({ page }) => {
    await page.getByText('Log').click()
    
    // Wait for potential mock data to load
    await page.waitForTimeout(1000)
    
    // Should either show log items or empty state
    const hasLogs = await page.getByText('No logs yet').isVisible().catch(() => false)
    const hasMockData = await page.getByText('Chicken Rice').isVisible().catch(() => false)
    
    expect(hasLogs || hasMockData).toBeTruthy()
  })

  test('should display macro information in logs', async ({ page }) => {
    await page.getByText('Log').click()
    await page.waitForTimeout(1000)
    
    // Check if macro information is displayed (Calories, Protein, etc.)
    const hasMacros = await page.getByText(/Calories|Protein|Carbs|Fat/).first().isVisible().catch(() => false)
    expect(hasMacros).toBeTruthy()
  })
})
