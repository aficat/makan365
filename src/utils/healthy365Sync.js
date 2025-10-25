// Singapore Healthy 365 app integration service
// This is a placeholder for future integration with the official Healthy 365 API

export const syncWithHealthy365 = async (nutritionData, mealType = 'lunch') => {
  // TODO: Implement actual Healthy 365 API integration
  // This would require:
  // 1. OAuth authentication with Healthy 365
  // 2. API endpoints for logging meals
  // 3. Data mapping between our format and Healthy 365 format
  
  console.log('Syncing with Healthy 365:', { nutritionData, mealType })
  
  // Mock response for now
  return {
    success: true,
    message: 'Successfully synced with Healthy 365!',
    healthy365Id: 'mock_' + Date.now(),
    points: calculateHealthy365Points(nutritionData)
  }
}

const calculateHealthy365Points = (nutrition) => {
  // Healthy 365 points calculation based on nutrition quality
  const nutriGrade = calculateNutriGrade(nutrition)
  
  const pointsMap = {
    'A': 10,
    'B': 7,
    'C': 4,
    'D': 1
  }
  
  return pointsMap[nutriGrade] || 0
}

const calculateNutriGrade = (nutrition) => {
  // Simplified Nutri-Grade calculation
  const { calories, sugar, saturatedFat, sodium } = nutrition
  let score = 0
  
  if (sugar <= 5) score += 2
  else if (sugar <= 10) score += 1
  
  if (saturatedFat <= 1.5) score += 2
  else if (saturatedFat <= 3) score += 1
  
  if (sodium <= 120) score += 2
  else if (sodium <= 300) score += 1
  
  if (calories <= 100) score += 1
  
  if (score >= 6) return 'A'
  if (score >= 4) return 'B'
  if (score >= 2) return 'C'
  return 'D'
}

export const getHealthy365Challenges = () => {
  return [
    {
      id: 'nutri_grade_week',
      name: 'Nutri-Grade A Week',
      description: 'Log 7 Grade A meals in a week',
      reward: '50 Healthy 365 points',
      progress: 0,
      target: 7,
      active: true
    },
    {
      id: 'hawker_hero',
      name: 'Hawker Hero',
      description: 'Try 10 different hawker dishes',
      reward: '100 Healthy 365 points',
      progress: 0,
      target: 10,
      active: true
    },
    {
      id: 'vegetable_master',
      name: 'Vegetable Master',
      description: 'Log 20 vegetable-rich meals',
      reward: '75 Healthy 365 points',
      progress: 0,
      target: 20,
      active: true
    },
    {
      id: 'water_champion',
      name: 'Water Champion',
      description: 'Log 7 days of adequate water intake',
      reward: '25 Healthy 365 points',
      progress: 0,
      target: 7,
      active: true
    }
  ]
}

export const getHealthy365Stats = () => {
  // Mock stats - in real implementation, this would come from Healthy 365 API
  return {
    totalPoints: 1250,
    currentStreak: 12,
    challengesCompleted: 3,
    mealsLogged: 45,
    gradeAMeals: 28,
    weeklyGoal: 7,
    weeklyProgress: 5
  }
}

export const setupHealthy365Integration = () => {
  return {
    title: 'Healthy 365 Integration Setup',
    description: 'Connect Makan365 with Singapore\'s official Healthy 365 app',
    steps: [
      'Download the Healthy 365 app from App Store or Google Play',
      'Create an account or log in with Singpass',
      'Enable data sharing permissions in Healthy 365 settings',
      'Authorize Makan365 to sync your food logs',
      'Start earning Healthy 365 points for your healthy choices!'
    ],
    benefits: [
      'Earn Healthy 365 points for healthy meals',
      'Participate in national health challenges',
      'Track your progress with official health metrics',
      'Access exclusive health rewards and discounts'
    ],
    note: 'This integration is currently in development and will be available soon.'
  }
}
