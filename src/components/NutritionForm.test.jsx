import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NutritionForm from './NutritionForm'

describe('NutritionForm Component', () => {
  const mockNutritionData = {
    foodName: 'Test Food',
    calories: 100,
    protein: 10,
    fat: 5,
    carbs: 20,
    sugar: 5,
    sodium: 120,
    fiber: 2,
    saturatedFat: 1,
    transFat: 0,
    cholesterol: 10,
    nutriGrade: 'A'
  }

  const mockExtractedText = 'Sample nutrition text'

  const defaultProps = {
    nutritionData: mockNutritionData,
    extractedText: mockExtractedText,
    onSubmit: vi.fn(),
    onCancel: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders Nutrition Form heading', () => {
    render(<NutritionForm {...defaultProps} />)
    
    expect(screen.getByText('Nutrition Form')).toBeInTheDocument()
    expect(screen.getByText('Review and edit the extracted nutrition data')).toBeInTheDocument()
  })

  it('displays extracted text', () => {
    render(<NutritionForm {...defaultProps} />)
    
    expect(screen.getByText('Extracted Text')).toBeInTheDocument()
    expect(screen.getByText(mockExtractedText)).toBeInTheDocument()
  })

  it('renders Nutrition Information section', () => {
    render(<NutritionForm {...defaultProps} />)
    
    expect(screen.getByText('Nutrition Information')).toBeInTheDocument()
  })

  it('renders all input fields', () => {
    render(<NutritionForm {...defaultProps} />)
    
    expect(screen.getByText('Food Name *')).toBeInTheDocument()
    expect(screen.getByText('Calories *')).toBeInTheDocument()
    expect(screen.getByText('Protein (g)')).toBeInTheDocument()
    expect(screen.getByText('Fat (g)')).toBeInTheDocument()
    expect(screen.getByText('Carbs (g)')).toBeInTheDocument()
    expect(screen.getByText('Sugar (g)')).toBeInTheDocument()
    expect(screen.getByText('Sodium (mg)')).toBeInTheDocument()
  })

  it('populates form with nutrition data', () => {
    render(<NutritionForm {...defaultProps} />)
    
    expect(screen.getByDisplayValue('Test Food')).toBeInTheDocument()
    expect(screen.getByDisplayValue('100')).toBeInTheDocument()
    expect(screen.getByDisplayValue('10')).toBeInTheDocument()
  })

  it('displays Nutri-Grade information', () => {
    render(<NutritionForm {...defaultProps} />)
    
    expect(screen.getByText('Singapore Nutri-Grade')).toBeInTheDocument()
    expect(screen.getByText(/Grade A/)).toBeInTheDocument()
  })

  it('renders Edit button', () => {
    render(<NutritionForm {...defaultProps} />)
    
    const editButton = screen.getByText('Edit')
    expect(editButton).toBeInTheDocument()
  })

  it('renders Cancel and Save buttons', () => {
    render(<NutritionForm {...defaultProps} />)
    
    expect(screen.getByText('Cancel')).toBeInTheDocument()
    expect(screen.getByText('Save & Log')).toBeInTheDocument()
  })

  it('calls onCancel when Cancel button is clicked', async () => {
    const user = userEvent.setup()
    render(<NutritionForm {...defaultProps} />)
    
    const cancelButton = screen.getByText('Cancel')
    await user.click(cancelButton)
    
    expect(defaultProps.onCancel).toHaveBeenCalledTimes(1)
  })

  it('enables editing when Edit button is clicked', async () => {
    const user = userEvent.setup()
    render(<NutritionForm {...defaultProps} />)
    
    const editButton = screen.getByText('Edit')
    await user.click(editButton)
    
    expect(screen.getByText('Done Editing')).toBeInTheDocument()
  })

  it('allows editing form fields', async () => {
    const user = userEvent.setup()
    render(<NutritionForm {...defaultProps} />)
    
    // Enable editing
    const editButton = screen.getByText('Edit')
    await user.click(editButton)
    
    // Get the food name input and modify it
    const foodNameInput = screen.getByDisplayValue('Test Food')
    await user.click(foodNameInput)
    await user.type(foodNameInput, ' Updated')
    
    // Verify the value was updated
    expect(screen.getByDisplayValue('Test Food Updated')).toBeInTheDocument()
  })
})
