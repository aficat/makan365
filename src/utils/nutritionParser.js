// Nutrition data parser for Singapore Nutri-Grade system
// Extracts nutrition information from OCR text and applies MOH guidelines

export const parseNutritionData = (text) => {
  if (!text) {
    return getDefaultNutritionData()
  }

  const normalizedText = text.toLowerCase()
  
  // Extract nutrition values using regex patterns
  const nutrition = {
    calories: extractValue(normalizedText, ['calories', 'energy'], 'kcal') || 0,
    protein: extractValue(normalizedText, ['protein'], 'g') || 0,
    fat: extractValue(normalizedText, ['total fat', 'fat'], 'g') || 0,
    saturatedFat: extractValue(normalizedText, ['saturated fat', 'saturates'], 'g') || 0,
    carbs: extractValue(normalizedText, ['carbohydrate', 'carbs', 'total carbohydrate'], 'g') || 0,
    sugar: extractValue(normalizedText, ['sugars', 'sugar'], 'g') || 0,
    sodium: extractValue(normalizedText, ['sodium', 'salt'], 'mg') || 0,
    fiber: extractValue(normalizedText, ['fiber', 'fibre', 'dietary fiber'], 'g') || 0,
    cholesterol: extractValue(normalizedText, ['cholesterol'], 'mg') || 0
  }

  // Convert energy from kJ to kcal if needed
  if (nutrition.calories === 0) {
    const energyKj = extractValue(normalizedText, ['energy'], 'kj')
    if (energyKj) {
      nutrition.calories = Math.round(energyKj / 4.184) // Convert kJ to kcal
    }
  }

  // Convert salt to sodium if needed (salt * 400 = sodium in mg)
  if (nutrition.sodium === 0) {
    const salt = extractValue(normalizedText, ['salt'], 'g')
    if (salt) {
      nutrition.sodium = Math.round(salt * 400)
    }
  }

  return nutrition
}

const extractValue = (text, keywords, unit) => {
  for (const keyword of keywords) {
    // Look for patterns like "calories: 150" or "calories 150kcal" or "150 calories"
    const patterns = [
      new RegExp(`${keyword}\\s*:?\\s*(\\d+(?:\\.\\d+)?)\\s*${unit}`, 'i'),
      new RegExp(`(\\d+(?:\\.\\d+)?)\\s*${unit}\\s*${keyword}`, 'i'),
      new RegExp(`${keyword}\\s*:?\\s*(\\d+(?:\\.\\d+)?)`, 'i'),
      new RegExp(`(\\d+(?:\\.\\d+)?)\\s*${keyword}`, 'i')
    ]

    for (const pattern of patterns) {
      const match = text.match(pattern)
      if (match) {
        return parseFloat(match[1])
      }
    }
  }
  return null
}

const getDefaultNutritionData = () => ({
  calories: 0,
  protein: 0,
  fat: 0,
  saturatedFat: 0,
  carbs: 0,
  sugar: 0,
  sodium: 0,
  fiber: 0,
  cholesterol: 0
})

// Singapore Nutri-Grade calculation based on MOH guidelines
export const calculateNutriGrade = (nutrition) => {
  const { calories, sugar, saturatedFat, sodium } = nutrition
  
  // Convert to per 100g basis (assuming standard serving size)
  // This is a simplified calculation - in reality, you'd need serving size info
  const per100g = {
    sugar: sugar,
    saturatedFat: saturatedFat,
    sodium: sodium,
    calories: calories
  }

  let score = 0

  // Sugar scoring (per 100g)
  if (per100g.sugar <= 5) score += 2
  else if (per100g.sugar <= 10) score += 1

  // Saturated fat scoring (per 100g)
  if (per100g.saturatedFat <= 1.5) score += 2
  else if (per100g.saturatedFat <= 3) score += 1

  // Sodium scoring (per 100g)
  if (per100g.sodium <= 120) score += 2
  else if (per100g.sodium <= 300) score += 1

  // Calorie density bonus
  if (per100g.calories <= 100) score += 1

  // Determine Nutri-Grade
  if (score >= 6) return 'A'
  if (score >= 4) return 'B'
  if (score >= 2) return 'C'
  return 'D'
}

// Get Nutri-Grade explanation
export const getNutriGradeExplanation = (grade) => {
  const explanations = {
    'A': {
      color: '#2ECC71',
      description: 'Excellent choice! This food has low sugar, saturated fat, and sodium content.',
      recommendation: 'Keep choosing Grade A foods for optimal health!'
    },
    'B': {
      color: '#F39C12',
      description: 'Good choice! This food has moderate levels of sugar, saturated fat, or sodium.',
      recommendation: 'A healthy option, but consider Grade A alternatives when possible.'
    },
    'C': {
      color: '#E74C3C',
      description: 'Moderate choice. This food has higher levels of sugar, saturated fat, or sodium.',
      recommendation: 'Enjoy occasionally and look for healthier alternatives.'
    },
    'D': {
      color: '#8E44AD',
      description: 'Consider healthier options. This food has high levels of sugar, saturated fat, or sodium.',
      recommendation: 'Try to limit consumption and choose Grade A or B alternatives.'
    }
  }

  return explanations[grade] || explanations['D']
}

// Singapore-specific food recommendations
export const getFoodRecommendations = (currentGrade) => {
  const recommendations = {
    'A': [
      'Fresh fruits and vegetables',
      'Lean proteins (fish, chicken breast)',
      'Whole grains (brown rice, quinoa)',
      'Nuts and seeds (unsalted)',
      'Water and unsweetened beverages'
    ],
    'B': [
      'Try reducing added sugar',
      'Choose leaner cuts of meat',
      'Opt for whole grain options',
      'Add more vegetables to your meals'
    ],
    'C': [
      'Consider healthier cooking methods',
      'Reduce portion sizes',
      'Look for low-sodium alternatives',
      'Add more fiber-rich foods'
    ],
    'D': [
      'Try healthier alternatives',
      'Read nutrition labels carefully',
      'Choose fresh over processed foods',
      'Consider homemade versions'
    ]
  }

  return recommendations[currentGrade] || recommendations['D']
}

// Cultural dietary filters
export const getCulturalFilters = () => {
  return {
    halal: {
      name: 'Halal',
      description: 'Food prepared according to Islamic dietary laws',
      icon: '🕌'
    },
    vegetarian: {
      name: 'Vegetarian',
      description: 'No meat or animal products',
      icon: '🥬'
    },
    vegan: {
      name: 'Vegan',
      description: 'No animal products including dairy and eggs',
      icon: '🌱'
    },
    chinese: {
      name: 'Chinese Cuisine',
      description: 'Traditional Chinese cooking methods and ingredients',
      icon: '🥢'
    },
    indian: {
      name: 'Indian Cuisine',
      description: 'Traditional Indian spices and cooking methods',
      icon: '🍛'
    },
    malay: {
      name: 'Malay Cuisine',
      description: 'Traditional Malay and Nusantara cooking',
      icon: '🍜'
    }
  }
}

// Local food database mapping
export const mapToLocalFood = (nutrition, location = 'singapore') => {
  const localFoods = {
    singapore: [
      {
        name: 'Hainanese Chicken Rice',
        type: 'hawker',
        nutriGrade: 'B',
        calories: 350,
        protein: 25,
        carbs: 30,
        fat: 12,
        description: 'Singapore\'s national dish with steamed chicken and fragrant rice'
      },
      {
        name: 'Laksa',
        type: 'hawker',
        nutriGrade: 'C',
        calories: 450,
        protein: 20,
        carbs: 40,
        fat: 18,
        description: 'Spicy coconut curry noodle soup'
      },
      {
        name: 'Char Kway Teow',
        type: 'hawker',
        nutriGrade: 'D',
        calories: 600,
        protein: 15,
        carbs: 70,
        fat: 25,
        description: 'Stir-fried flat rice noodles with dark soy sauce'
      },
      {
        name: 'Fish Soup',
        type: 'hawker',
        nutriGrade: 'A',
        calories: 200,
        protein: 30,
        carbs: 15,
        fat: 5,
        description: 'Clear fish soup with vegetables and rice'
      }
    ]
  }

  // Find similar local foods based on nutrition profile
  const similarFoods = localFoods[location]?.filter(food => {
    const calorieDiff = Math.abs(food.calories - nutrition.calories) / nutrition.calories
    return calorieDiff < 0.3 // Within 30% calorie range
  }) || []

  return similarFoods
}
