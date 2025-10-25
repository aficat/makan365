// Local Singapore food database and mapping service
// Maps scanned foods to local hawker dishes and supermarket products

export const localFoodDatabase = {
  hawker: [
    {
      id: 'chicken_rice',
      name: 'Hainanese Chicken Rice',
      chineseName: '海南鸡饭',
      description: 'Singapore\'s national dish with steamed chicken and fragrant rice',
      cuisine: 'chinese',
      halal: false,
      vegetarian: false,
      nutriGrade: 'B',
      calories: 350,
      protein: 25,
      carbs: 30,
      fat: 12,
      sodium: 800,
      sugar: 2,
      saturatedFat: 3,
      commonLocations: ['Maxwell Food Centre', 'Tian Tian Chicken Rice', 'Boon Tong Kee'],
      priceRange: '$3-5',
      healthTips: ['Ask for less rice', 'Choose breast meat', 'Add more vegetables']
    },
    {
      id: 'laksa',
      name: 'Laksa',
      chineseName: '叻沙',
      description: 'Spicy coconut curry noodle soup with prawns and fish cake',
      cuisine: 'mixed',
      halal: true,
      vegetarian: false,
      nutriGrade: 'C',
      calories: 450,
      protein: 20,
      carbs: 40,
      fat: 18,
      sodium: 1200,
      sugar: 8,
      saturatedFat: 8,
      commonLocations: ['Janggut Laksa', 'Katong Laksa', 'Sungei Road Laksa'],
      priceRange: '$4-6',
      healthTips: ['Share with a friend', 'Ask for less coconut milk', 'Add more vegetables']
    },
    {
      id: 'char_kway_teow',
      name: 'Char Kway Teow',
      chineseName: '炒粿条',
      description: 'Stir-fried flat rice noodles with dark soy sauce, cockles, and Chinese sausage',
      cuisine: 'chinese',
      halal: false,
      vegetarian: false,
      nutriGrade: 'D',
      calories: 600,
      protein: 15,
      carbs: 70,
      fat: 25,
      sodium: 1500,
      sugar: 5,
      saturatedFat: 12,
      commonLocations: ['Hill Street Char Kway Teow', 'Outram Park Char Kway Teow'],
      priceRange: '$4-7',
      healthTips: ['Share portion', 'Ask for less oil', 'Add vegetables']
    },
    {
      id: 'fish_soup',
      name: 'Fish Soup',
      chineseName: '鱼汤',
      description: 'Clear fish soup with vegetables and rice',
      cuisine: 'chinese',
      halal: false,
      vegetarian: false,
      nutriGrade: 'A',
      calories: 200,
      protein: 30,
      carbs: 15,
      fat: 5,
      sodium: 400,
      sugar: 1,
      saturatedFat: 1,
      commonLocations: ['Maxwell Food Centre', 'Amoy Street Food Centre'],
      priceRange: '$4-6',
      healthTips: ['Excellent choice!', 'High protein, low fat', 'Great for weight management']
    },
    {
      id: 'roti_prata',
      name: 'Roti Prata',
      chineseName: '印度煎饼',
      description: 'Crispy flatbread served with curry',
      cuisine: 'indian',
      halal: true,
      vegetarian: true,
      nutriGrade: 'C',
      calories: 300,
      protein: 8,
      carbs: 35,
      fat: 15,
      sodium: 600,
      sugar: 2,
      saturatedFat: 6,
      commonLocations: ['Zam Zam Restaurant', 'Springleaf Prata Place'],
      priceRange: '$2-4',
      healthTips: ['Choose plain prata', 'Limit curry intake', 'Add vegetables']
    },
    {
      id: 'nasi_lemak',
      name: 'Nasi Lemak',
      chineseName: '椰浆饭',
      description: 'Fragrant coconut rice with fried chicken, ikan bilis, and sambal',
      cuisine: 'malay',
      halal: true,
      vegetarian: false,
      nutriGrade: 'C',
      calories: 500,
      protein: 20,
      carbs: 55,
      fat: 22,
      sodium: 1000,
      sugar: 3,
      saturatedFat: 10,
      commonLocations: ['Ponggol Nasi Lemak', 'Changi Village Nasi Lemak'],
      priceRange: '$3-5',
      healthTips: ['Ask for less rice', 'Choose grilled chicken', 'Add more vegetables']
    }
  ],
  supermarket: [
    {
      id: 'brown_rice',
      name: 'Brown Rice',
      description: 'Whole grain rice with higher fiber content',
      category: 'grains',
      halal: true,
      vegetarian: true,
      nutriGrade: 'A',
      calories: 110,
      protein: 2.6,
      carbs: 23,
      fat: 0.9,
      sodium: 5,
      sugar: 0.4,
      saturatedFat: 0.2,
      brands: ['Sunrice', 'Golden Phoenix', 'Tiger'],
      priceRange: '$2-4 per kg',
      healthBenefits: ['High fiber', 'Lower GI', 'Rich in B vitamins']
    },
    {
      id: 'oats',
      name: 'Rolled Oats',
      description: 'Whole grain oats for breakfast or baking',
      category: 'grains',
      halal: true,
      vegetarian: true,
      nutriGrade: 'A',
      calories: 68,
      protein: 2.4,
      carbs: 12,
      fat: 1.4,
      sodium: 1,
      sugar: 0.2,
      saturatedFat: 0.2,
      brands: ['Quaker', 'Bob\'s Red Mill', 'Nature\'s Path'],
      priceRange: '$3-6 per 500g',
      healthBenefits: ['High fiber', 'Heart healthy', 'Sustained energy']
    },
    {
      id: 'greek_yogurt',
      name: 'Greek Yogurt',
      description: 'High protein yogurt with probiotics',
      category: 'dairy',
      halal: true,
      vegetarian: true,
      nutriGrade: 'A',
      calories: 59,
      protein: 10,
      carbs: 3.6,
      fat: 0.4,
      sodium: 36,
      sugar: 3.6,
      saturatedFat: 0.1,
      brands: ['Chobani', 'Fage', 'Yoplait'],
      priceRange: '$4-7 per 500g',
      healthBenefits: ['High protein', 'Probiotics', 'Calcium rich']
    }
  ]
}

export const findSimilarLocalFood = (nutritionData, preferences = {}) => {
  const { cuisine, halal, vegetarian, maxCalories = 1000 } = preferences
  
  let candidates = [...localFoodDatabase.hawker, ...localFoodDatabase.supermarket]
  
  // Filter by preferences
  if (cuisine) {
    candidates = candidates.filter(food => food.cuisine === cuisine)
  }
  
  if (halal) {
    candidates = candidates.filter(food => food.halal)
  }
  
  if (vegetarian) {
    candidates = candidates.filter(food => food.vegetarian)
  }
  
  // Filter by calorie range
  candidates = candidates.filter(food => food.calories <= maxCalories)
  
  // Calculate similarity score based on nutrition profile
  const scoredCandidates = candidates.map(food => ({
    ...food,
    similarityScore: calculateSimilarityScore(nutritionData, food)
  }))
  
  // Sort by similarity score and return top matches
  return scoredCandidates
    .sort((a, b) => b.similarityScore - a.similarityScore)
    .slice(0, 5)
}

const calculateSimilarityScore = (nutrition1, nutrition2) => {
  const weights = {
    calories: 0.3,
    protein: 0.2,
    carbs: 0.2,
    fat: 0.15,
    sodium: 0.1,
    sugar: 0.05
  }
  
  let score = 0
  let totalWeight = 0
  
  Object.keys(weights).forEach(key => {
    if (nutrition1[key] && nutrition2[key]) {
      const diff = Math.abs(nutrition1[key] - nutrition2[key]) / Math.max(nutrition1[key], nutrition2[key])
      score += (1 - diff) * weights[key]
      totalWeight += weights[key]
    }
  })
  
  return totalWeight > 0 ? score / totalWeight : 0
}

export const getFoodRecommendations = (userLogs = []) => {
  // Analyze user's eating patterns and recommend local foods
  const recentLogs = userLogs.slice(0, 10) // Last 10 logs
  const gradeALogs = recentLogs.filter(log => log.nutriGrade === 'A')
  const gradeDLogs = recentLogs.filter(log => log.nutriGrade === 'D')
  
  const recommendations = []
  
  // If user has many Grade D foods, recommend healthier alternatives
  if (gradeDLogs.length > gradeALogs.length) {
    recommendations.push({
      type: 'healthier_alternatives',
      title: 'Try These Healthier Options',
      foods: localFoodDatabase.hawker.filter(food => food.nutriGrade === 'A'),
      reason: 'You\'ve been having some less healthy choices. Try these Grade A local foods!'
    })
  }
  
  // Recommend based on cuisine preferences
  const cuisineCounts = recentLogs.reduce((acc, log) => {
    const cuisine = log.cuisine || 'mixed'
    acc[cuisine] = (acc[cuisine] || 0) + 1
    return acc
  }, {})
  
  const topCuisine = Object.keys(cuisineCounts).reduce((a, b) => 
    cuisineCounts[a] > cuisineCounts[b] ? a : b, 'mixed'
  )
  
  if (topCuisine !== 'mixed') {
    recommendations.push({
      type: 'cuisine_exploration',
      title: `Explore More ${topCuisine.charAt(0).toUpperCase() + topCuisine.slice(1)} Cuisine`,
      foods: localFoodDatabase.hawker.filter(food => food.cuisine === topCuisine),
      reason: `You seem to enjoy ${topCuisine} food. Here are more options to try!`
    })
  }
  
  return recommendations
}

export const getCulturalFoodFilters = () => {
  return {
    halal: {
      name: 'Halal',
      description: 'Food prepared according to Islamic dietary laws',
      icon: '🕌',
      foods: localFoodDatabase.hawker.filter(food => food.halal)
    },
    vegetarian: {
      name: 'Vegetarian',
      description: 'No meat or animal products',
      icon: '🥬',
      foods: localFoodDatabase.hawker.filter(food => food.vegetarian)
    },
    chinese: {
      name: 'Chinese Cuisine',
      description: 'Traditional Chinese cooking methods and ingredients',
      icon: '🥢',
      foods: localFoodDatabase.hawker.filter(food => food.cuisine === 'chinese')
    },
    indian: {
      name: 'Indian Cuisine',
      description: 'Traditional Indian spices and cooking methods',
      icon: '🍛',
      foods: localFoodDatabase.hawker.filter(food => food.cuisine === 'indian')
    },
    malay: {
      name: 'Malay Cuisine',
      description: 'Traditional Malay and Nusantara cooking',
      icon: '🍜',
      foods: localFoodDatabase.hawker.filter(food => food.cuisine === 'malay')
    }
  }
}

export const getFoodLocationInfo = (foodId) => {
  const allFoods = [...localFoodDatabase.hawker, ...localFoodDatabase.supermarket]
  const food = allFoods.find(f => f.id === foodId)
  
  if (!food) return null
  
  return {
    ...food,
    nearbyLocations: food.commonLocations || [],
    priceRange: food.priceRange,
    healthTips: food.healthTips || [],
    culturalInfo: {
      chineseName: food.chineseName,
      cuisine: food.cuisine,
      halal: food.halal,
      vegetarian: food.vegetarian
    }
  }
}
