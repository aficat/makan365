import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App Component', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders the app header with title and subtitle', () => {
    render(<App />)
    
    expect(screen.getByText('Makan365')).toBeInTheDocument()
    expect(screen.getByText('Your Healthy 365 Food Companion')).toBeInTheDocument()
  })

  it('renders navigation tabs', () => {
    render(<App />)
    
    expect(screen.getByText('Scan')).toBeInTheDocument()
    expect(screen.getByText('Log')).toBeInTheDocument()
    expect(screen.getByText('Streaks')).toBeInTheDocument()
    expect(screen.getByText('Map')).toBeInTheDocument()
  })

  it('defaults to Scan tab on initial render', () => {
    render(<App />)
    
    expect(screen.getByText('Scan Food Label')).toBeInTheDocument()
  })

  it('switches to Log tab when clicked', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    const logTab = screen.getByText('Log')
    await user.click(logTab)
    
    expect(screen.getByText('Food Log')).toBeInTheDocument()
  })

  it('switches to Streaks tab when clicked', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    const streaksTab = screen.getByText('Streaks')
    await user.click(streaksTab)
    
    expect(screen.getByText('Healthy Eating Streak')).toBeInTheDocument()
  })

  it('switches to Map tab when clicked', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    const mapTab = screen.getByText('Map')
    await user.click(mapTab)
    
    expect(screen.getByText('Food Map')).toBeInTheDocument()
  })

  it('returns to Scan tab when clicked again', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    // Navigate away first
    const logTab = screen.getByText('Log')
    await user.click(logTab)
    
    // Navigate back
    const scanTab = screen.getByText('Scan')
    await user.click(scanTab)
    
    expect(screen.getByText('Scan Food Label')).toBeInTheDocument()
  })

  it('shows active state on current tab', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    const logTab = screen.getByText('Log')
    await user.click(logTab)
    
    // The active tab should have the 'active' class
    const activeTab = document.querySelector('.nav-item.active')
    expect(activeTab).toBeTruthy()
    expect(activeTab).toHaveTextContent('Log')
  })
})
