import { test, expect } from '@playwright/test'

test.describe('Streaks Feature', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should navigate to Streaks tab and display content', async ({ page }) => {
    await page.getByText('Streaks').click()
    
    await expect(page.getByText('Healthy Eating Streak')).toBeVisible()
    await expect(page.getByText('Daily Goals')).toBeVisible()
  })

  test('should display streak statistics', async ({ page }) => {
    await page.getByText('Streaks').click()
    
    // Check if streak-related stats are displayed
    await expect(page.getByText('Day Streak')).toBeVisible()
    await expect(page.getByText('XP Points')).toBeVisible()
    await expect(page.getByText('Current Level')).toBeVisible()
  })

  test('should display Quick Stats section', async ({ page }) => {
    await page.getByText('Streaks').click()
    
    await expect(page.getByText('Quick Stats')).toBeVisible()
  })

  test('should display Recent Activity section', async ({ page }) => {
    await page.getByText('Streaks').click()
    
    await expect(page.getByText('Recent Activity')).toBeVisible()
    
    // Should show activity grid
    const activityGrid = page.locator('.grid').first()
    await expect(activityGrid).toBeVisible()
  })

  test('should display Achievements section', async ({ page }) => {
    await page.getByText('Streaks').click()
    
    await expect(page.getByText('Achievements')).toBeVisible()
  })

  test('should display Todays Mission section', async ({ page }) => {
    await page.getByText('Streaks').click()
    
    await expect(page.getByText("Today's Mission")).toBeVisible()
  })

  test('should display Goals section', async ({ page }) => {
    await page.getByText('Streaks').click()
    
    await expect(page.getByText('Goals')).toBeVisible()
    await expect(page.getByText('Weekly Goal')).toBeVisible()
    await expect(page.getByText('Monthly Goal')).toBeVisible()
  })

  test('should display progress bars', async ({ page }) => {
    await page.getByText('Streaks').click()
    
    // Check if progress bars are displayed
    const progressBars = page.locator('.bg-primary-500, .bg-green-500, .bg-blue-500').first()
    await expect(progressBars).toBeAttached()
  })
})
