import { useState, useEffect, useRef } from 'react'
import { MapPin, Filter, Search, Star, Utensils, ShoppingCart } from 'lucide-react'

const FoodMap = () => {
  const [map, setMap] = useState(null)
  const [markers, setMarkers] = useState([])
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [userLocation, setUserLocation] = useState(null)
  const mapRef = useRef(null)

  // Singapore food locations (placeholder data)
  const foodLocations = [
    {
      id: 1,
      name: 'Maxwell Food Centre',
      type: 'hawker',
      cuisine: 'mixed',
      nutriGrade: 'A',
      rating: 4.5,
      lat: 1.2804,
      lng: 103.8446,
      description: 'Famous for Tian Tian Hainanese Chicken Rice',
      halal: false,
      vegetarian: false
    },
    {
      id: 2,
      name: 'Lau Pa Sat',
      type: 'hawker',
      cuisine: 'mixed',
      nutriGrade: 'B',
      rating: 4.2,
      lat: 1.2806,
      lng: 103.8503,
      description: 'Historic food centre with diverse options',
      halal: true,
      vegetarian: true
    },
    {
      id: 3,
      name: 'Cold Storage - Marina Bay',
      type: 'supermarket',
      cuisine: 'international',
      nutriGrade: 'A',
      rating: 4.0,
      lat: 1.2810,
      lng: 103.8570,
      description: 'Premium supermarket with healthy options',
      halal: true,
      vegetarian: true
    },
    {
      id: 4,
      name: 'Tekka Centre',
      type: 'hawker',
      cuisine: 'indian',
      nutriGrade: 'B',
      rating: 4.3,
      lat: 1.3048,
      lng: 103.8508,
      description: 'Best Indian food in Little India',
      halal: true,
      vegetarian: true
    },
    {
      id: 5,
      name: 'Chinatown Food Street',
      type: 'hawker',
      cuisine: 'chinese',
      nutriGrade: 'C',
      rating: 4.1,
      lat: 1.2833,
      lng: 103.8442,
      description: 'Traditional Chinese street food',
      halal: false,
      vegetarian: false
    },
    {
      id: 6,
      name: 'Geylang Serai Market',
      type: 'hawker',
      cuisine: 'malay',
      nutriGrade: 'A',
      rating: 4.4,
      lat: 1.3178,
      lng: 103.8950,
      description: 'Authentic Malay cuisine',
      halal: true,
      vegetarian: false
    }
  ]

  useEffect(() => {
    initMap()
    getCurrentLocation()
  }, [])

  const initMap = () => {
    // Initialize Google Maps (placeholder for now)
    // In a real implementation, you would use Google Maps API
    console.log('Map initialization placeholder')
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          console.error('Error getting location:', error)
          // Default to Singapore
          setUserLocation({ lat: 1.3521, lng: 103.8198 })
        }
      )
    } else {
      // Default to Singapore
      setUserLocation({ lat: 1.3521, lng: 103.8198 })
    }
  }

  const getFilteredLocations = () => {
    let filtered = foodLocations

    if (selectedFilter !== 'all') {
      filtered = filtered.filter(location => {
        switch (selectedFilter) {
          case 'hawker':
            return location.type === 'hawker'
          case 'supermarket':
            return location.type === 'supermarket'
          case 'halal':
            return location.halal
          case 'vegetarian':
            return location.vegetarian
          case 'grade-a':
            return location.nutriGrade === 'A'
          default:
            return true
        }
      })
    }

    if (searchQuery) {
      filtered = filtered.filter(location =>
        location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        location.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return filtered
  }

  const getNutriGradeColor = (grade) => {
    switch (grade) {
      case 'A': return '#2ECC71'
      case 'B': return '#F39C12'
      case 'C': return '#E74C3C'
      case 'D': return '#8E44AD'
      default: return '#95A5A6'
    }
  }

  const getCuisineIcon = (cuisine) => {
    switch (cuisine) {
      case 'chinese': return '🥢'
      case 'indian': return '🍛'
      case 'malay': return '🍜'
      case 'mixed': return '🍽️'
      case 'international': return '🌍'
      default: return '🍴'
    }
  }

  const filteredLocations = getFilteredLocations()

  return (
    <div className="food-map">
      <div className="card">
        <h2>Find Healthy Food Near You</h2>
        
        {/* Search Bar */}
        <div style={{ position: 'relative', marginBottom: '1rem' }}>
          <Search 
            size={20} 
            style={{ 
              position: 'absolute', 
              left: '1rem', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              color: '#666' 
            }} 
          />
          <input
            type="text"
            className="input"
            placeholder="Search for food places..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: '3rem' }}
          />
        </div>

        {/* Filter Buttons */}
        <div style={{ 
          display: 'flex', 
          gap: '0.5rem', 
          marginBottom: '1rem', 
          flexWrap: 'wrap',
          overflowX: 'auto',
          paddingBottom: '0.5rem'
        }}>
          {[
            { key: 'all', label: 'All', icon: '🍽️' },
            { key: 'hawker', label: 'Hawker', icon: '🏪' },
            { key: 'supermarket', label: 'Supermarket', icon: '🛒' },
            { key: 'halal', label: 'Halal', icon: '🕌' },
            { key: 'vegetarian', label: 'Vegetarian', icon: '🥬' },
            { key: 'grade-a', label: 'Grade A', icon: '⭐' }
          ].map(filter => (
            <button
              key={filter.key}
              className={`btn ${selectedFilter === filter.key ? '' : 'btn-secondary'}`}
              onClick={() => setSelectedFilter(filter.key)}
              style={{ 
                padding: '0.5rem 1rem', 
                fontSize: '0.9rem', 
                minHeight: 'auto',
                whiteSpace: 'nowrap'
              }}
            >
              <span style={{ marginRight: '0.25rem' }}>{filter.icon}</span>
              {filter.label}
            </button>
          ))}
        </div>

        {/* Map Placeholder */}
        <div style={{
          height: '300px',
          background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ textAlign: 'center', color: '#666' }}>
            <MapPin size={48} style={{ marginBottom: '1rem', color: '#4BF4B4' }} />
            <h3>Interactive Map</h3>
            <p style={{ fontSize: '0.9rem' }}>
              Google Maps integration coming soon!<br />
              Pinch to zoom, tap markers for details
            </p>
          </div>
          
          {/* Placeholder markers */}
          <div style={{
            position: 'absolute',
            top: '20%',
            left: '30%',
            width: '12px',
            height: '12px',
            background: '#2ECC71',
            borderRadius: '50%',
            border: '2px solid white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }} />
          <div style={{
            position: 'absolute',
            top: '60%',
            right: '25%',
            width: '12px',
            height: '12px',
            background: '#F39C12',
            borderRadius: '50%',
            border: '2px solid white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '30%',
            left: '60%',
            width: '12px',
            height: '12px',
            background: '#E74C3C',
            borderRadius: '50%',
            border: '2px solid white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }} />
        </div>

        {/* Location List */}
        <div>
          <h3>Nearby Places ({filteredLocations.length})</h3>
          {filteredLocations.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
              <Search size={48} style={{ color: '#ccc', marginBottom: '1rem' }} />
              <p>No places found matching your criteria</p>
            </div>
          ) : (
            filteredLocations.map(location => (
              <div key={location.id} className="card" style={{ marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: 0, marginBottom: '0.25rem' }}>
                      {getCuisineIcon(location.cuisine)} {location.name}
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
                      {location.description}
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{
                      padding: '0.25rem 0.5rem',
                      borderRadius: '12px',
                      background: getNutriGradeColor(location.nutriGrade) + '20',
                      color: getNutriGradeColor(location.nutriGrade),
                      fontWeight: 'bold',
                      fontSize: '0.8rem'
                    }}>
                      Grade {location.nutriGrade}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Star size={14} style={{ color: '#F39C12' }} />
                      <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>
                        {location.rating}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{
                    padding: '0.25rem 0.5rem',
                    background: '#f8f9fa',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    color: '#666'
                  }}>
                    {location.type === 'hawker' ? '🏪' : '🛒'} {location.type}
                  </span>
                  {location.halal && (
                    <span style={{
                      padding: '0.25rem 0.5rem',
                      background: '#e8f5e8',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      color: '#2ECC71'
                    }}>
                      🕌 Halal
                    </span>
                  )}
                  {location.vegetarian && (
                    <span style={{
                      padding: '0.25rem 0.5rem',
                      background: '#e8f5e8',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      color: '#2ECC71'
                    }}>
                      🥬 Vegetarian
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Future Features TODO */}
      <div className="card" style={{ background: '#f8f9fa', border: '2px dashed #ddd' }}>
        <h3>🚀 Coming Soon</h3>
        <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.6', color: '#666' }}>
          <li>Real-time Google Maps integration</li>
          <li>Directions to food places</li>
          <li>Live reviews and ratings</li>
          <li>Food recommendations based on your logs</li>
          <li>Barcode scanning for packaged foods</li>
          <li>Integration with Singapore's Healthy 365 app</li>
        </ul>
      </div>
    </div>
  )
}

export default FoodMap
