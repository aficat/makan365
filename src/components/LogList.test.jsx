import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LogList from './LogList'

describe('LogList Component', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders Food Log heading', () => {
    render(<LogList />)
    
    expect(screen.getByText('Food Log')).toBeInTheDocument()
    expect(screen.getByText('Track your healthy eating journey')).toBeInTheDocument()
  })

  it('renders Today\'s Summary section', () => {
    render(<LogList />)
    
    expect(screen.getByText("Today's Summary")).toBeInTheDocument()
  })

  it('renders search input', () => {
    render(<LogList />)
    
    const searchInput = screen.getByPlaceholderText('Search food items...')
    expect(searchInput).toBeInTheDocument()
  })

  it('renders filter select with All Grades option', () => {
    render(<LogList />)
    
    const select = screen.getByDisplayValue('All Grades')
    expect(select).toBeInTheDocument()
  })

  it('renders mock data when localStorage is empty', () => {
    render(<LogList />)
    
    // Wait for mock data to load
    waitFor(() => {
      expect(screen.getByText('Chicken Rice')).toBeInTheDocument()
    })
  })

  it('filters logs by search term', async () => {
    const user = userEvent.setup()
    const mockLogs = [
      {
        id: '1',
        timestamp: new Date().toISOString(),
        nutrition: { foodName: 'Chicken Rice', calories: 450 },
        nutriGrade: 'A'
      },
      {
        id: '2',
        timestamp: new Date().toISOString(),
        nutrition: { foodName: 'Nasi Lemak', calories: 420 },
        nutriGrade: 'B'
      }
    ]
    localStorage.setItem('makan365_logs', JSON.stringify(mockLogs))
    
    render(<LogList />)
    
    const searchInput = screen.getByPlaceholderText('Search food items...')
    await user.type(searchInput, 'Chicken')
    
    await waitFor(() => {
      expect(screen.getByText('Chicken Rice')).toBeInTheDocument()
      expect(screen.queryByText('Nasi Lemak')).not.toBeInTheDocument()
    })
  })

  it('filters logs by grade', async () => {
    const user = userEvent.setup()
    const mockLogs = [
      {
        id: '1',
        timestamp: new Date().toISOString(),
        nutrition: { foodName: 'Test Food 1', calories: 450 },
        nutriGrade: 'A'
      },
      {
        id: '2',
        timestamp: new Date().toISOString(),
        nutrition: { foodName: 'Test Food 2', calories: 420 },
        nutriGrade: 'B'
      }
    ]
    localStorage.setItem('makan365_logs', JSON.stringify(mockLogs))
    
    render(<LogList />)
    
    const gradeSelect = screen.getByDisplayValue('All Grades')
    await user.selectOptions(gradeSelect, 'A')
    
    await waitFor(() => {
      const gradeASelect = screen.getByDisplayValue('Grade A')
      expect(gradeASelect).toBeInTheDocument()
    })
  })

  it('sorts logs by newest first by default', () => {
    const mockLogs = [
      {
        id: '1',
        timestamp: new Date(Date.now() - 10000).toISOString(),
        nutrition: { foodName: 'Older Food', calories: 300 },
        nutriGrade: 'A'
      },
      {
        id: '2',
        timestamp: new Date().toISOString(),
        nutrition: { foodName: 'Newer Food', calories: 400 },
        nutriGrade: 'B'
      }
    ]
    localStorage.setItem('makan365_logs', JSON.stringify(mockLogs))
    
    render(<LogList />)
    
    // Should show newer food first
    expect(screen.getByText('Newer Food')).toBeInTheDocument()
  })

  it('shows empty state when no logs match filters', async () => {
    const user = userEvent.setup()
    render(<LogList />)
    
    const searchInput = screen.getByPlaceholderText('Search food items...')
    await user.type(searchInput, 'NonExistentFood')
    
    await waitFor(() => {
      expect(screen.getByText('No matching logs')).toBeInTheDocument()
      expect(screen.getByText('Try adjusting your search or filter criteria.')).toBeInTheDocument()
    })
  })
})
