// Google Maps integration service for food location mapping
// This is a placeholder for future Google Maps API integration

export const initMap = (mapElement, center = { lat: 1.3521, lng: 103.8198 }) => {
  // TODO: Implement actual Google Maps initialization
  // This would require:
  // 1. Google Maps API key
  // 2. Maps JavaScript API
  // 3. Places API for food locations
  
  console.log('Initializing map at:', center)
  
  return {
    map: null, // Placeholder for actual map instance
    markers: [],
    infoWindows: []
  }
}

export const addFoodMarkers = (map, foodLocations) => {
  // TODO: Add actual markers to the map
  // This would create markers for each food location with:
  // - Custom icons based on food type and Nutri-Grade
  // - Info windows with food details
  // - Click handlers for navigation
  
  console.log('Adding food markers:', foodLocations)
  
  return foodLocations.map(location => ({
    id: location.id,
    position: { lat: location.lat, lng: location.lng },
    title: location.name,
    type: location.type,
    nutriGrade: location.nutriGrade,
    marker: null // Placeholder for actual marker
  }))
}

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'))
      return
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      },
      (error) => {
        console.error('Geolocation error:', error)
        // Default to Singapore
        resolve({ lat: 1.3521, lng: 103.8198 })
      }
    )
  })
}

export const searchNearbyFood = async (location, radius = 1000, filters = {}) => {
  // TODO: Implement Places API search
  // This would search for food places near the given location
  
  console.log('Searching nearby food:', { location, radius, filters })
  
  // Mock data for now
  const mockResults = [
    {
      id: 'mock_1',
      name: 'Maxwell Food Centre',
      type: 'hawker',
      nutriGrade: 'A',
      rating: 4.5,
      lat: 1.2804,
      lng: 103.8446,
      distance: 0.5,
      description: 'Famous for Tian Tian Hainanese Chicken Rice'
    },
    {
      id: 'mock_2',
      name: 'Lau Pa Sat',
      type: 'hawker',
      nutriGrade: 'B',
      rating: 4.2,
      lat: 1.2806,
      lng: 103.8503,
      distance: 0.8,
      description: 'Historic food centre with diverse options'
    }
  ]
  
  return mockResults
}

export const getDirections = (from, to) => {
  // TODO: Implement directions API
  // This would provide walking/driving directions to food locations
  
  console.log('Getting directions from', from, 'to', to)
  
  return {
    distance: '0.5 km',
    duration: '6 min walk',
    steps: [
      'Head north on South Bridge Road',
      'Turn right onto Maxwell Road',
      'Destination will be on the left'
    ]
  }
}

export const getMapSetupInstructions = () => {
  return {
    title: 'Google Maps Integration Setup',
    description: 'Enable interactive maps and location services',
    steps: [
      'Go to Google Cloud Console (console.cloud.google.com)',
      'Enable the Maps JavaScript API',
      'Enable the Places API for food location search',
      'Create an API key with appropriate restrictions',
      'Add the API key to your .env file as VITE_MAPS_API_KEY',
      'Deploy and test the map functionality'
    ],
    features: [
      'Interactive map with food location markers',
      'Real-time location detection',
      'Nearby food search with filters',
      'Walking directions to food places',
      'Custom markers for different food types and Nutri-Grades'
    ],
    note: 'Maps API has usage limits and billing. Check pricing for production use.'
  }
}

export const createCustomMarker = (foodLocation) => {
  // Create custom marker based on food type and Nutri-Grade
  const getMarkerColor = (nutriGrade) => {
    switch (nutriGrade) {
      case 'A': return '#2ECC71' // Green
      case 'B': return '#F39C12' // Orange
      case 'C': return '#E74C3C' // Red
      case 'D': return '#8E44AD' // Purple
      default: return '#95A5A6' // Gray
    }
  }
  
  const getMarkerIcon = (type) => {
    switch (type) {
      case 'hawker': return '🏪'
      case 'supermarket': return '🛒'
      case 'restaurant': return '🍽️'
      default: return '📍'
    }
  }
  
  return {
    color: getMarkerColor(foodLocation.nutriGrade),
    icon: getMarkerIcon(foodLocation.type),
    size: 'normal',
    label: foodLocation.nutriGrade
  }
}

export const filterMapMarkers = (markers, filters) => {
  return markers.filter(marker => {
    if (filters.nutriGrade && marker.nutriGrade !== filters.nutriGrade) {
      return false
    }
    
    if (filters.type && marker.type !== filters.type) {
      return false
    }
    
    if (filters.halal && !marker.halal) {
      return false
    }
    
    if (filters.vegetarian && !marker.vegetarian) {
      return false
    }
    
    return true
  })
}

export const getMapBounds = (locations) => {
  if (!locations || locations.length === 0) {
    return {
      north: 1.5,
      south: 1.0,
      east: 104.0,
      west: 103.5
    }
  }
  
  const lats = locations.map(loc => loc.lat)
  const lngs = locations.map(loc => loc.lng)
  
  return {
    north: Math.max(...lats) + 0.01,
    south: Math.min(...lats) - 0.01,
    east: Math.max(...lngs) + 0.01,
    west: Math.min(...lngs) - 0.01
  }
}
