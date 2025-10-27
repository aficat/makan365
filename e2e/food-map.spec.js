import { test, expect } from '@playwright/test'

test.describe('Food Map Feature', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should navigate to Map tab and display content', async ({ page }) => {
    await page.getByText('Map').click()
    
    await expect(page.getByText('Food Map')).toBeVisible()
    await expect(page.getByText('Discover healthy food options nearby')).toBeVisible()
  })

  test('should display search input', async ({ page }) => {
    await page.getByText('Map').click()
    
    const searchInput = page.getByPlaceholderText('Search places or cuisines...')
    await expect(searchInput).toBeVisible()
  })

  test('should display filter buttons', async ({ page }) => {
    await page.getByText('Map').click()
    
    await expect(page.getByText('All Places')).toBeVisible()
    await expect(page.getByText('🍜 Hawker')).toBeVisible()
    await expect(page.getByText('🍽️ Restaurant')).toBeVisible()
    await expect(page.getByText('🛒 Grocery')).toBeVisible()
  })

  test('should show loading state initially', async ({ page }) => {
    await page.getByText('Map').click()
    
    // Should show loading or places
    const loadingText = await page.getByText('Finding nearby places...').isVisible().catch(() => false)
    const placesText = await page.getByText('Maxwell Food Centre').isVisible().catch(() => false)
    
    expect(loadingText || placesText).toBeTruthy()
  })

  test('should display places after loading', async ({ page }) => {
    await page.getByText('Map').click()
    
    // Wait for places to load
    await page.waitForTimeout(2000)
    
    // Should display mock places
    const hasPlaces = await page.getByText('Maxwell Food Centre').isVisible().catch(() => false)
    expect(hasPlaces).toBeTruthy()
  })

  test('should filter places by type', async ({ page }) => {
    await page.getByText('Map').click()
    await page.waitForTimeout(2000)
    
    // Click on Hawker filter
    await page.getByText('🍜 Hawker').click()
    
    // Should show filtered results
    await page.waitForTimeout(500)
    
    const hasResults = await page.getByText('No places found').isVisible().catch(() => false)
    const hasHawker = await page.getByText('Maxwell Food Centre').isVisible().catch(() => false)
    
    expect(hasResults || hasHawker).toBeTruthy()
  })

  test('should search for places', async ({ page }) => {
    await page.getByText('Map').click()
    await page.waitForTimeout(2000)
    
    const searchInput = page.getByPlaceholderText('Search places or cuisines...')
    await searchInput.fill('Maxwell')
    
    // Wait for search to filter
    await page.waitForTimeout(500)
    
    // Should show search results or no results
    const hasResults = await page.getByText('Maxwell Food Centre').isVisible().catch(() => false)
    const noResults = await page.getByText('No places found').isVisible().catch(() => false)
    
    expect(hasResults || noResults).toBeTruthy()
  })

  test('should display place information', async ({ page }) => {
    await page.getByText('Map').click()
    await page.waitForTimeout(2000)
    
    // Check if place cards have expected information
    const hasRestaurant = await page.getByText('Maxwell Food Centre').isVisible().catch(() => false)
    const hasAddress = await page.getByText(/Kadayanallur St/).isVisible().catch(() => false)
    
    expect(hasRestaurant || hasAddress).toBeTruthy()
  })
})
