import { useState, useEffect } from 'react'
import { CheckCircle, Edit3, Save, X, AlertCircle, Sparkles, Zap } from 'lucide-react'

const NutritionForm = ({ nutritionData, extractedText, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    foodName: '',
    calories: '',
    protein: '',
    fat: '',
    carbs: '',
    sugar: '',
    sodium: '',
    fiber: '',
    saturatedFat: '',
    transFat: '',
    cholesterol: '',
    nutriGrade: 'Unknown'
  })
  const [isEditing, setIsEditing] = useState(false)
  const [validationErrors, setValidationErrors] = useState({})

  useEffect(() => {
    if (nutritionData) {
      setFormData({
        foodName: nutritionData.foodName || '',
        calories: nutritionData.calories || '',
        protein: nutritionData.protein || '',
        fat: nutritionData.fat || '',
        carbs: nutritionData.carbs || '',
        sugar: nutritionData.sugar || '',
        sodium: nutritionData.sodium || '',
        fiber: nutritionData.fiber || '',
        saturatedFat: nutritionData.saturatedFat || '',
        transFat: nutritionData.transFat || '',
        cholesterol: nutritionData.cholesterol || '',
        nutriGrade: nutritionData.nutriGrade || 'Unknown'
      })
    }
  }, [nutritionData])

  const calculateNutriGrade = (data) => {
    const calories = parseFloat(data.calories) || 0
    const sugar = parseFloat(data.sugar) || 0
    const saturatedFat = parseFloat(data.saturatedFat) || 0
    const sodium = parseFloat(data.sodium) || 0

    // Singapore Nutri-Grade calculation (simplified)
    let score = 0
    
    // Sugar scoring (per 100g)
    if (sugar <= 5) score += 0
    else if (sugar <= 10) score += 1
    else if (sugar <= 15) score += 2
    else if (sugar <= 20) score += 3
    else score += 4

    // Saturated fat scoring (per 100g)
    if (saturatedFat <= 1.5) score += 0
    else if (saturatedFat <= 3) score += 1
    else if (saturatedFat <= 4.5) score += 2
    else if (saturatedFat <= 6) score += 3
    else score += 4

    // Sodium scoring (per 100g)
    if (sodium <= 120) score += 0
    else if (sodium <= 240) score += 1
    else if (sodium <= 360) score += 2
    else if (sodium <= 480) score += 3
    else score += 4

    // Determine grade
    if (score <= 1) return 'A'
    if (score <= 2) return 'B'
    if (score <= 3) return 'C'
    return 'D'
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))

    // Clear validation error
    if (validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }

    // Auto-calculate Nutri-Grade
    if (['sugar', 'saturatedFat', 'sodium'].includes(field)) {
      const updatedData = { ...formData, [field]: value }
      const newGrade = calculateNutriGrade(updatedData)
      setFormData(prev => ({
        ...prev,
        nutriGrade: newGrade
      }))
    }
  }

  const validateForm = () => {
    const errors = {}
    
    if (!formData.foodName.trim()) {
      errors.foodName = 'Food name is required'
    }
    
    if (!formData.calories || isNaN(formData.calories) || formData.calories < 0) {
      errors.calories = 'Valid calories value is required'
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A': return 'text-green-600 bg-green-100 border-green-200'
      case 'B': return 'text-blue-600 bg-blue-100 border-blue-200'
      case 'C': return 'text-yellow-600 bg-yellow-100 border-yellow-200'
      case 'D': return 'text-red-600 bg-red-100 border-red-200'
      default: return 'text-gray-600 bg-gray-100 border-gray-200'
    }
  }

  const getGradeMessage = (grade) => {
    switch (grade) {
      case 'A': return 'Excellent choice! This is a healthy option.'
      case 'B': return 'Good choice! Consider this as a moderate option.'
      case 'C': return 'Fair choice. Consider healthier alternatives.'
      case 'D': return 'Consider healthier alternatives when possible.'
      default: return 'Unable to determine nutritional quality.'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 font-heading">Nutrition Form</h1>
        <p className="text-base sm:text-lg text-gray-600">Review and edit the extracted nutrition data</p>
      </div>

      {/* Extracted Text Preview */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold text-gray-800">Extracted Text</h3>
        </div>
        <div className="card-body">
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-700 leading-relaxed">
              {extractedText || 'No text extracted from image.'}
            </p>
          </div>
        </div>
      </div>

      {/* Nutrition Form */}
      <div className="card">
        <div className="card-header">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">Nutrition Information</h3>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="button button-secondary text-sm"
            >
              <Edit3 size={16} />
              {isEditing ? 'Done Editing' : 'Edit'}
            </button>
          </div>
        </div>

        <div className="card-body">
          <div className="space-y-6">
            {/* Food Name */}
            <div className="form-group">
              <label className="form-label">Food Name *</label>
              <input
                type="text"
                value={formData.foodName}
                onChange={(e) => handleInputChange('foodName', e.target.value)}
                className={`form-input ${validationErrors.foodName ? 'border-red-500' : ''}`}
                placeholder="Enter food name"
                disabled={!isEditing}
              />
              {validationErrors.foodName && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.foodName}</p>
              )}
            </div>

            {/* Basic Nutrition */}
            <div className="space-y-4">
              <div className="form-group">
                <label className="form-label">Calories *</label>
                <input
                  type="number"
                  value={formData.calories}
                  onChange={(e) => handleInputChange('calories', e.target.value)}
                  className={`form-input ${validationErrors.calories ? 'border-red-500' : ''}`}
                  placeholder="0"
                  disabled={!isEditing}
                />
                {validationErrors.calories && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.calories}</p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Protein (g)</label>
                <input
                  type="number"
                  value={formData.protein}
                  onChange={(e) => handleInputChange('protein', e.target.value)}
                  className="form-input"
                  placeholder="0"
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="form-group">
                <label className="form-label">Fat (g)</label>
                <input
                  type="number"
                  value={formData.fat}
                  onChange={(e) => handleInputChange('fat', e.target.value)}
                  className="form-input"
                  placeholder="0"
                  disabled={!isEditing}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Carbs (g)</label>
                <input
                  type="number"
                  value={formData.carbs}
                  onChange={(e) => handleInputChange('carbs', e.target.value)}
                  className="form-input"
                  placeholder="0"
                  disabled={!isEditing}
                />
              </div>
            </div>

            {/* Sugar and Sodium */}
            <div className="space-y-4">
              <div className="form-group">
                <label className="form-label">Sugar (g)</label>
                <input
                  type="number"
                  value={formData.sugar}
                  onChange={(e) => handleInputChange('sugar', e.target.value)}
                  className="form-input"
                  placeholder="0"
                  disabled={!isEditing}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Sodium (mg)</label>
                <input
                  type="number"
                  value={formData.sodium}
                  onChange={(e) => handleInputChange('sodium', e.target.value)}
                  className="form-input"
                  placeholder="0"
                  disabled={!isEditing}
                />
              </div>
            </div>

            {/* Additional Nutrients */}
            <div className="space-y-4">
              <div className="form-group">
                <label className="form-label">Fiber (g)</label>
                <input
                  type="number"
                  value={formData.fiber}
                  onChange={(e) => handleInputChange('fiber', e.target.value)}
                  className="form-input"
                  placeholder="0"
                  disabled={!isEditing}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Saturated Fat (g)</label>
                <input
                  type="number"
                  value={formData.saturatedFat}
                  onChange={(e) => handleInputChange('saturatedFat', e.target.value)}
                  className="form-input"
                  placeholder="0"
                  disabled={!isEditing}
                />
              </div>
            </div>

            {/* Nutri-Grade Display */}
            <div className="p-4 rounded-xl border-2 bg-gradient-to-r from-gray-50 to-gray-100">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-800">Singapore Nutri-Grade</h4>
                <div className="flex items-center gap-2">
                  <Zap size={16} className="text-primary-600" />
                  <span className="text-sm text-gray-600">Auto-calculated</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className={`px-4 py-2 rounded-lg border-2 font-bold text-lg ${getGradeColor(formData.nutriGrade)}`}>
                  Grade {formData.nutriGrade}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">
                    {getGradeMessage(formData.nutriGrade)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onCancel}
          className="button button-secondary flex-1"
        >
          <X size={16} />
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="button button-primary flex-1"
        >
          <CheckCircle size={16} />
          Save & Log
        </button>
      </div>
    </div>
  )
}

export default NutritionForm