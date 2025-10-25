import { useState } from 'react'
import { Save, X, Edit3 } from 'lucide-react'

const NutritionForm = ({ nutritionData, extractedText, onSave, onCancel }) => {
  const [nutrition, setNutrition] = useState(nutritionData)
  const [isEditing, setIsEditing] = useState(false)

  const handleInputChange = (field, value) => {
    setNutrition(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }))
  }

  const calculateNutriGrade = (nutrition) => {
    const { calories, sugar, saturatedFat, sodium } = nutrition
    let score = 0
    
    // Sugar scoring (per 100g)
    if (sugar <= 5) score += 2
    else if (sugar <= 10) score += 1
    
    // Saturated fat scoring (per 100g)
    if (saturatedFat <= 1.5) score += 2
    else if (saturatedFat <= 3) score += 1
    
    // Sodium scoring (per 100g)
    if (sodium <= 120) score += 2
    else if (sodium <= 300) score += 1
    
    // Calorie density
    if (calories <= 100) score += 1
    
    if (score >= 6) return 'A'
    if (score >= 4) return 'B'
    if (score >= 2) return 'C'
    return 'D'
  }

  const nutriGrade = calculateNutriGrade(nutrition)
  const getNutriGradeColor = (grade) => {
    switch (grade) {
      case 'A': return '#2ECC71'
      case 'B': return '#F39C12'
      case 'C': return '#E74C3C'
      case 'D': return '#8E44AD'
      default: return '#95A5A6'
    }
  }

  const handleSave = () => {
    onSave(nutrition)
  }

  return (
    <div className="nutrition-form">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2>Nutrition Information</h2>
          <button
            className="btn btn-secondary"
            onClick={() => setIsEditing(!isEditing)}
            style={{ padding: '0.5rem', minHeight: 'auto' }}
          >
            <Edit3 size={16} />
          </button>
        </div>

        {extractedText && (
          <div style={{ marginBottom: '1rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
            <h4>Extracted Text:</h4>
            <p style={{ fontSize: '0.9rem', color: '#666', fontStyle: 'italic' }}>
              "{extractedText.substring(0, 200)}..."
            </p>
          </div>
        )}

        <div className="nutrition-grid">
          <div className="nutrition-item">
            <label>Calories (kcal)</label>
            <input
              type="number"
              className="input"
              value={nutrition.calories}
              onChange={(e) => handleInputChange('calories', e.target.value)}
              disabled={!isEditing}
            />
          </div>

          <div className="nutrition-item">
            <label>Protein (g)</label>
            <input
              type="number"
              step="0.1"
              className="input"
              value={nutrition.protein}
              onChange={(e) => handleInputChange('protein', e.target.value)}
              disabled={!isEditing}
            />
          </div>

          <div className="nutrition-item">
            <label>Total Fat (g)</label>
            <input
              type="number"
              step="0.1"
              className="input"
              value={nutrition.fat}
              onChange={(e) => handleInputChange('fat', e.target.value)}
              disabled={!isEditing}
            />
          </div>

          <div className="nutrition-item">
            <label>Saturated Fat (g)</label>
            <input
              type="number"
              step="0.1"
              className="input"
              value={nutrition.saturatedFat}
              onChange={(e) => handleInputChange('saturatedFat', e.target.value)}
              disabled={!isEditing}
            />
          </div>

          <div className="nutrition-item">
            <label>Carbohydrates (g)</label>
            <input
              type="number"
              step="0.1"
              className="input"
              value={nutrition.carbs}
              onChange={(e) => handleInputChange('carbs', e.target.value)}
              disabled={!isEditing}
            />
          </div>

          <div className="nutrition-item">
            <label>Sugar (g)</label>
            <input
              type="number"
              step="0.1"
              className="input"
              value={nutrition.sugar}
              onChange={(e) => handleInputChange('sugar', e.target.value)}
              disabled={!isEditing}
            />
          </div>

          <div className="nutrition-item">
            <label>Sodium (mg)</label>
            <input
              type="number"
              className="input"
              value={nutrition.sodium}
              onChange={(e) => handleInputChange('sodium', e.target.value)}
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className="nutri-grade-display" style={{ 
          marginTop: '1.5rem', 
          padding: '1rem', 
          background: getNutriGradeColor(nutriGrade) + '20',
          border: `2px solid ${getNutriGradeColor(nutriGrade)}`,
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: 0, color: getNutriGradeColor(nutriGrade) }}>
            Singapore Nutri-Grade: {nutriGrade}
          </h3>
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: '#666' }}>
            {nutriGrade === 'A' && 'Excellent choice! 🎉'}
            {nutriGrade === 'B' && 'Good choice! 👍'}
            {nutriGrade === 'C' && 'Moderate choice ⚠️'}
            {nutriGrade === 'D' && 'Consider healthier options 💡'}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          <button className="btn" onClick={handleSave}>
            <Save size={20} />
            Save Food Log
          </button>
          <button className="btn btn-secondary" onClick={onCancel}>
            <X size={20} />
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default NutritionForm
