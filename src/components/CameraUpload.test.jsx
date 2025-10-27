import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CameraUpload from './CameraUpload'

// Mock the utilities
vi.mock('../utils/visionService', () => ({
  detectTextFromImage: vi.fn().mockResolvedValue('Sample nutrition facts text')
}))

vi.mock('../utils/nutritionParser', () => ({
  parseNutritionData: vi.fn().mockReturnValue({
    foodName: 'Test Food',
    calories: 100,
    protein: 10,
    carbs: 20
  })
}))

describe('CameraUpload Component', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders the upload area initially', () => {
    render(<CameraUpload />)
    
    expect(screen.getByText('Ready to scan?')).toBeInTheDocument()
    expect(screen.getByText('Take a photo of a food label or nutrition facts panel')).toBeInTheDocument()
  })

  it('renders Take Photo button', () => {
    render(<CameraUpload />)
    
    const takePhotoButton = screen.getByText('Take Photo')
    expect(takePhotoButton).toBeInTheDocument()
  })

  it('renders Choose from Gallery button', () => {
    render(<CameraUpload />)
    
    const chooseButton = screen.getByText('Choose from Gallery')
    expect(chooseButton).toBeInTheDocument()
  })

  it('renders Pro Tips section', () => {
    render(<CameraUpload />)
    
    expect(screen.getByText('Pro Tips')).toBeInTheDocument()
    expect(screen.getByText('Ensure good lighting for better text recognition')).toBeInTheDocument()
  })

  it('renders Recent Scans section', () => {
    render(<CameraUpload />)
    
    expect(screen.getByText('Recent Scans')).toBeInTheDocument()
  })

  it('displays "No recent scans yet" when localStorage is empty', () => {
    render(<CameraUpload />)
    
    expect(screen.getByText('No recent scans yet')).toBeInTheDocument()
    expect(screen.getByText('Your scanned food labels will appear here')).toBeInTheDocument()
  })

  it('displays recent scans from localStorage', () => {
    const mockLogs = [
      {
        id: '1',
        timestamp: new Date().toISOString(),
        nutrition: { foodName: 'Chicken Rice', calories: 450 },
        nutriGrade: 'A'
      }
    ]
    localStorage.setItem('makan365_logs', JSON.stringify(mockLogs))
    
    render(<CameraUpload />)
    
    expect(screen.getByText('Chicken Rice')).toBeInTheDocument()
    expect(screen.getByText('Grade A')).toBeInTheDocument()
  })

  it('trigger file input when Take Photo button is clicked', async () => {
    const user = userEvent.setup()
    render(<CameraUpload />)
    
    const button = screen.getByText('Take Photo')
    await user.click(button)
    
    // File input should be in the document (hidden)
    const fileInput = document.querySelector('input[type="file"]')
    expect(fileInput).toBeInTheDocument()
  })

  it('shows image preview after file selection', async () => {
    const user = userEvent.setup()
    render(<CameraUpload />)
    
    const file = new File(['test'], 'test.png', { type: 'image/png' })
    const fileInput = document.querySelector('input[type="file"]')
    
    await user.upload(fileInput, file)
    
    // After upload, the preview section should appear
    await waitFor(() => {
      const previewImage = document.querySelector('img')
      expect(previewImage).toBeInTheDocument()
    })
  })
})
