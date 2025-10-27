import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import StreakTracker from './StreakTracker'

describe('StreakTracker Component', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders Daily Goals heading', () => {
    render(<StreakTracker />)
    
    expect(screen.getByText('Daily Goals')).toBeInTheDocument()
  })

  it('renders Healthy Eating Streak heading', () => {
    render(<StreakTracker />)
    
    expect(screen.getByText('Healthy Eating Streak')).toBeInTheDocument()
  })

  it('renders Quick Stats section', () => {
    render(<StreakTracker />)
    
    expect(screen.getByText('Quick Stats')).toBeInTheDocument()
  })

  it('renders Recent Activity section', () => {
    render(<StreakTracker />)
    
    expect(screen.getByText('Recent Activity')).toBeInTheDocument()
  })

  it('renders Achievements section', () => {
    render(<StreakTracker />)
    
    expect(screen.getByText('Achievements')).toBeInTheDocument()
  })

  it('renders Today\'s Mission section', () => {
    render(<StreakTracker />)
    
    expect(screen.getByText("Today's Mission")).toBeInTheDocument()
  })

  it('renders Goals section', () => {
    render(<StreakTracker />)
    
    expect(screen.getByText('Goals')).toBeInTheDocument()
  })

  it('displays streak information from localStorage', async () => {
    const mockLogs = [
      {
        id: '1',
        timestamp: new Date().toISOString(),
        nutriGrade: 'A'
      },
      {
        id: '2',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        nutriGrade: 'A'
      }
    ]
    localStorage.setItem('makan365_logs', JSON.stringify(mockLogs))
    
    render(<StreakTracker />)
    
    await waitFor(() => {
      expect(screen.getByText('Day Streak')).toBeInTheDocument()
    })
  })

  it('displays weekly goal progress', () => {
    render(<StreakTracker />)
    
    expect(screen.getByText('Weekly Goal')).toBeInTheDocument()
    const daysElements = screen.getAllByText(/days/)
    expect(daysElements.length).toBeGreaterThan(0)
  })

  it('displays monthly goal progress', () => {
    render(<StreakTracker />)
    
    expect(screen.getByText('Monthly Goal')).toBeInTheDocument()
    const daysElements = screen.getAllByText(/days/)
    expect(daysElements.length).toBeGreaterThan(0)
  })

  it('renders badges section', () => {
    render(<StreakTracker />)
    
    // Should show mock badges
    expect(screen.getByText('Achievements')).toBeInTheDocument()
  })

  it('displays recent activity grid', () => {
    render(<StreakTracker />)
    
    // The activity grid should be present
    const activityGrid = document.querySelector('.grid')
    expect(activityGrid).toBeInTheDocument()
  })

  it('displays calorie, protein, carbs, and fat goals', () => {
    render(<StreakTracker />)
    
    expect(screen.getByText('Calorie Budget')).toBeInTheDocument()
    const proteinText = screen.getAllByText('Protein')
    expect(proteinText.length).toBeGreaterThan(0)
    const carbsText = screen.getAllByText('Carbs')
    expect(carbsText.length).toBeGreaterThan(0)
    const fatText = screen.getAllByText('Fat')
    expect(fatText.length).toBeGreaterThan(0)
  })
})
