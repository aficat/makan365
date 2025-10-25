// Google Cloud Vision API service
// Note: This is a client-side implementation for demo purposes
// In production, you should call your backend API which handles the Vision API

export const detectTextFromImage = async (base64Image) => {
  const apiKey = import.meta.env.VITE_VISION_API_KEY
  
  if (!apiKey) {
    console.warn('VITE_VISION_API_KEY not found. Using mock data.')
    return getMockTextData()
  }

  try {
    const response = await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requests: [
            {
              image: {
                content: base64Image
              },
              features: [
                {
                  type: 'TEXT_DETECTION',
                  maxResults: 1
                }
              ]
            }
          ]
        })
      }
    )

    if (!response.ok) {
      throw new Error(`Vision API error: ${response.status}`)
    }

    const data = await response.json()
    
    if (data.responses && data.responses[0] && data.responses[0].textAnnotations) {
      return data.responses[0].textAnnotations[0].description
    }
    
    throw new Error('No text detected in image')
  } catch (error) {
    console.error('Vision API error:', error)
    // Fallback to mock data for demo purposes
    return getMockTextData()
  }
}

// Mock data for demo purposes when API key is not available
const getMockTextData = () => {
  const mockTexts = [
    `Nutrition Facts
Serving Size 1 cup (240ml)
Servings Per Container 2

Amount Per Serving
Calories 150
Total Fat 8g 12%
Saturated Fat 5g 25%
Trans Fat 0g
Cholesterol 30mg 10%
Sodium 200mg 8%
Total Carbohydrate 12g 4%
Dietary Fiber 0g 0%
Sugars 12g
Protein 8g

Vitamin A 10% • Vitamin C 4%
Calcium 30% • Iron 0%`,

    `Nutrition Information
Per 100g
Energy: 450kJ / 107kcal
Fat: 3.2g
of which saturates: 1.8g
Carbohydrate: 18.5g
of which sugars: 4.2g
Protein: 3.1g
Salt: 0.6g`,

    `Nutrition Facts
Serving Size: 1 piece (85g)
Calories: 220
Total Fat: 12g
Saturated Fat: 2g
Cholesterol: 0mg
Sodium: 150mg
Total Carbohydrate: 25g
Dietary Fiber: 3g
Sugars: 8g
Protein: 6g`,

    `Nutritional Information
Per serving (50g)
Energy: 890kJ / 213kcal
Protein: 4.5g
Carbohydrates: 45g
of which sugars: 12g
Fat: 2.1g
of which saturates: 0.8g
Fibre: 2.5g
Sodium: 0.3g`
  ]

  // Return a random mock text
  return mockTexts[Math.floor(Math.random() * mockTexts.length)]
}

// Helper function to validate API key format
export const validateApiKey = (apiKey) => {
  if (!apiKey) return false
  // Basic validation for Google API key format
  return apiKey.length > 20 && apiKey.includes('AIza')
}

// Setup instructions for Google Cloud Vision API
export const getSetupInstructions = () => {
  return {
    title: 'Google Cloud Vision API Setup',
    steps: [
      'Go to Google Cloud Console (console.cloud.google.com)',
      'Create a new project or select existing one',
      'Enable the Vision API in the API Library',
      'Create credentials (API Key) in the Credentials section',
      'Restrict the API key to Vision API only for security',
      'Add the API key to your .env file as VITE_VISION_API_KEY',
      'Deploy your app and test the image scanning feature'
    ],
    note: 'The Vision API has free tier limits. Check pricing for production use.'
  }
}
