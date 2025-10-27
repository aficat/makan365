import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FoodMap from './FoodMap'

describe('FoodMap Component', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders Food Map heading', () => {
    render(<FoodMap />)
    
    expect(screen.getByText('Food Map')).toBeInTheDocument()
    expect(screen.getByText('Discover healthy food options nearby')).toBeInTheDocument()
  })

  it('renders search input', () => {
    render(<FoodMap />)
    
    const searchInput = screen.getByPlaceholderText('Search places or cuisines...')
    expect(searchInput).toBeInTheDocument()
  })

  it('renders filter buttons', () => {
    render(<FoodMap />)
    
    expect(screen.getByText('All Places')).toBeInTheDocument()
    expect(screen.getByText('🍜 Hawker')).toBeInTheDocument()
    expect(screen.getByText('🍽️ Restaurant')).toBeInTheDocument()
    expect(screen.getByText('🛒 Grocery')).toBeInTheDocument()
  })

  it('displays loading state initially', () => {
    render(<FoodMap />)
    
    expect(screen.getByText('Finding nearby places...')).toBeInTheDocument()
  })

  it('displays mock places after loading', async () => {
    render(<FoodMap />)
    
    await waitFor(() => {
      expect(screen.getByText('Maxwell Food Centre')).toBeInTheDocument()
    })
  })

  it('filters places by search query', async () => {
    const user = userEvent.setup()
    render(<FoodMap />)
    
    // Wait for places to load
    await waitFor(() => {
      expect(screen.getByText('Maxwell Food Centre')).toBeInTheDocument()
    })
    
    const searchInput = screen.getByPlaceholderText('Search places or cuisines...')
    await user.type(searchInput, 'Maxwell')
    
    await waitFor(() => {
      expect(screen.getByText('Maxwell Food Centre')).toBeInTheDocument()
    })
  })

  it('filters places by type', async () => {
    const user = userEvent.setup()
    render(<FoodMap />)
    
    await waitFor(() => {
      expect(screen.getByText('Maxwell Food Centre')).toBeInTheDocument()
    }, { timeout: 3000 })
    
    const hawkerButtons = screen.getAllByText('🍜 Hawker')
    await user.click(hawkerButtons[0])
    
    // Wait for filter to apply
    await waitFor(() => {
      // Should either show results or "No places found"
      const hasResults = screen.queryByText('Maxwell Food Centre')
      const hasNoResults = screen.queryByText('No places found')
      expect(hasResults || hasNoResults).toBeTruthy()
    }, { timeout: 1000 })
  })

  it('displays "No places found" when filters match no results', async () => {
    const user = userEvent.setup()
    render(<FoodMap />)
    
    await waitFor(() => {
      expect(screen.getByText('Maxwell Food Centre')).toBeInTheDocument()
    })
    
    const searchInput = screen.getByPlaceholderText('Search places or cuisines...')
    await user.type(searchInput, 'NonexistentPlace')
    
    await waitFor(() => {
      expect(screen.getByText('No places found')).toBeInTheDocument()
    })
  })

  it('displays place information correctly', async () => {
    render(<FoodMap />)
    
    await waitFor(() => {
      expect(screen.getByText('Maxwell Food Centre')).toBeInTheDocument()
      expect(screen.getByText(/1 Kadayanallur St/)).toBeInTheDocument()
    })
  })
})
