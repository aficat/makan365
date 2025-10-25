import { useState, useEffect } from 'react'
import { MapPin, Navigation, Star, Clock, Phone, ExternalLink, Filter, Search, Heart, Zap } from 'lucide-react'

const FoodMap = () => {
  const [userLocation, setUserLocation] = useState(null)
  const [nearbyPlaces, setNearbyPlaces] = useState([])
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getUserLocation()
    loadNearbyPlaces()
  }, [])

  const getUserLocation = () => {
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
          // Default to Singapore coordinates
          setUserLocation({
            lat: 1.3521,
            lng: 103.8198
          })
        }
      )
    } else {
      // Default to Singapore coordinates
      setUserLocation({
        lat: 1.3521,
        lng: 103.8198
      })
    }
  }

  const loadNearbyPlaces = () => {
    setIsLoading(true)
    
    // Simulate API call with mock data
    setTimeout(() => {
      const mockPlaces = [
        {
          id: 1,
          name: 'Maxwell Food Centre',
          type: 'hawker',
          rating: 4.2,
          distance: 0.3,
          address: '1 Kadayanallur St, Singapore 069184',
          phone: '+65 6225 5632',
          hours: '6:00 AM - 10:00 PM',
          priceRange: '$',
          healthyOptions: ['Chicken Rice', 'Fish Soup', 'Vegetable Curry'],
          nutriGrade: 'A',
          image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop',
          coordinates: { lat: 1.2804, lng: 103.8440 }
        },
        {
          id: 2,
          name: 'Tiong Bahru Market',
          type: 'hawker',
          rating: 4.5,
          distance: 0.8,
          address: '30 Seng Poh Rd, Singapore 168898',
          phone: '+65 6222 9600',
          hours: '6:00 AM - 11:00 PM',
          priceRange: '$',
          healthyOptions: ['Yong Tau Foo', 'Fish Ball Noodles', 'Vegetarian Rice'],
          nutriGrade: 'A',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
          coordinates: { lat: 1.2867, lng: 103.8326 }
        },
        {
          id: 3,
          name: 'Salad Stop',
          type: 'restaurant',
          rating: 4.0,
          distance: 0.5,
          address: '123 Orchard Rd, Singapore 238863',
          phone: '+65 6733 1122',
          hours: '8:00 AM - 9:00 PM',
          priceRange: '$$',
          healthyOptions: ['Custom Salads', 'Smoothie Bowls', 'Fresh Juices'],
          nutriGrade: 'A',
          image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
          coordinates: { lat: 1.3048, lng: 103.8318 }
        },
        {
          id: 4,
          name: 'Subway',
          type: 'fastfood',
          rating: 3.8,
          distance: 0.2,
          address: '456 Marina Bay Sands, Singapore 018956',
          phone: '+65 6688 8868',
          hours: '7:00 AM - 11:00 PM',
          priceRange: '$$',
          healthyOptions: ['Veggie Delite', 'Turkey Breast', 'Chicken Teriyaki'],
          nutriGrade: 'B',
          image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop',
          coordinates: { lat: 1.2833, lng: 103.8607 }
        },
        {
          id: 5,
          name: 'McDonald\'s',
          type: 'fastfood',
          rating: 3.5,
          distance: 0.6,
          address: '789 Bugis St, Singapore 188015',
          phone: '+65 6336 2000',
          hours: '24 Hours',
          priceRange: '$',
          healthyOptions: ['McWrap', 'Salad', 'Apple Slices'],
          nutriGrade: 'C',
          image: 'https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?w=400&h=300&fit=crop',
          coordinates: { lat: 1.3003, lng: 103.8558 }
        },
        {
          id: 6,
          name: 'Cold Storage',
          type: 'grocery',
          rating: 4.1,
          distance: 0.4,
          address: '321 Orchard Rd, Singapore 238865',
          phone: '+65 6737 9944',
          hours: '8:00 AM - 10:00 PM',
          priceRange: '$$',
          healthyOptions: ['Organic Vegetables', 'Fresh Fruits', 'Whole Grains'],
          nutriGrade: 'A',
          image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
          coordinates: { lat: 1.3048, lng: 103.8318 }
        }
      ]
      
      setNearbyPlaces(mockPlaces)
      setIsLoading(false)
    }, 1000)
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'hawker': return '🍜'
      case 'restaurant': return '🍽️'
      case 'fastfood': return '🍔'
      case 'grocery': return '🛒'
      default: return '📍'
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'hawker': return 'text-orange-600 bg-orange-100'
      case 'restaurant': return 'text-blue-600 bg-blue-100'
      case 'fastfood': return 'text-red-600 bg-red-100'
      case 'grocery': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A': return 'text-green-600 bg-green-100'
      case 'B': return 'text-blue-600 bg-blue-100'
      case 'C': return 'text-yellow-600 bg-yellow-100'
      case 'D': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const filteredPlaces = nearbyPlaces.filter(place => {
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         place.address.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterType === 'all' || place.type === filterType
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 font-heading">Food Map</h1>
        <p className="text-base sm:text-lg text-gray-600">Discover healthy food options nearby</p>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="card-body">
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search places or cuisines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input pl-10"
              />
            </div>

            {/* Filter Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setFilterType('all')}
                className={`button ${filterType === 'all' ? 'button-primary' : 'button-secondary'} text-xs sm:text-sm`}
              >
                All Places
              </button>
              <button
                onClick={() => setFilterType('hawker')}
                className={`button ${filterType === 'hawker' ? 'button-primary' : 'button-secondary'} text-xs sm:text-sm`}
              >
                🍜 Hawker
              </button>
              <button
                onClick={() => setFilterType('restaurant')}
                className={`button ${filterType === 'restaurant' ? 'button-primary' : 'button-secondary'} text-xs sm:text-sm`}
              >
                🍽️ Restaurant
              </button>
              <button
                onClick={() => setFilterType('grocery')}
                className={`button ${filterType === 'grocery' ? 'button-primary' : 'button-secondary'} text-xs sm:text-sm`}
              >
                🛒 Grocery
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="card">
        <div className="card-body p-0">
          <div className="relative h-64 bg-gradient-to-br from-green-100 to-green-200 rounded-t-xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={48} className="text-green-600 mx-auto mb-2" />
                <p className="text-green-700 font-semibold">Interactive Map</p>
                <p className="text-green-600 text-sm">Tap on markers to see details</p>
              </div>
            </div>
            
            {/* Mock Map Markers */}
            <div className="absolute top-4 left-4 w-3 h-3 bg-primary-500 rounded-full animate-pulse"></div>
            <div className="absolute top-8 right-8 w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
            <div className="absolute bottom-8 left-8 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="absolute bottom-4 right-4 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-b-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Navigation size={16} className="text-gray-500" />
                <span className="text-sm text-gray-600">Your Location</span>
              </div>
              <button className="button button-outline text-sm">
                <ExternalLink size={14} />
                Open in Maps
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Places Grid - Single Column Layout */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="card">
            <div className="card-body text-center py-12">
              <div className="flex justify-center items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-primary-500 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-3 h-3 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <p className="text-gray-600">Finding nearby places...</p>
            </div>
          </div>
        ) : filteredPlaces.length === 0 ? (
          <div className="card">
            <div className="card-body text-center py-12">
              <MapPin size={48} className="mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                No places found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          </div>
        ) : (
          filteredPlaces.map((place) => (
            <div key={place.id} className="group card hover:shadow-xl transition-all duration-300 overflow-hidden">
              {/* Hero Image Section */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                  <div className="flex gap-2">
                    <span className={`badge ${getTypeColor(place.type)} text-xs font-semibold backdrop-blur-sm bg-white/90`}>
                      {getTypeIcon(place.type)} {place.type.charAt(0).toUpperCase() + place.type.slice(1)}
                    </span>
                    <span className={`badge ${getGradeColor(place.nutriGrade)} text-xs font-semibold backdrop-blur-sm bg-white/90`}>
                      Grade {place.nutriGrade}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                    <Star size={12} className="text-yellow-500 fill-current" />
                    <span className="text-xs font-semibold text-gray-700">{place.rating}</span>
                  </div>
                </div>

                {/* Bottom Info */}
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-xs font-semibold text-gray-700">{place.distance}km away</span>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-xs font-semibold text-gray-700">{place.priceRange}</span>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                {/* Restaurant Name and Location */}
                <div className="mb-4">
                  <h3 className="font-bold text-lg text-gray-800 font-heading mb-1 line-clamp-1">
                    {place.name}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <MapPin size={14} className="text-gray-400 flex-shrink-0" />
                    <span className="line-clamp-1">{place.address}</span>
                  </div>
                </div>

                {/* Healthy Options */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart size={14} className="text-green-500" />
                    <span className="text-sm font-semibold text-gray-700">Healthy Options</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {place.healthyOptions.slice(0, 3).map((option, index) => (
                      <span key={index} className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full border border-green-200 font-medium">
                        {option}
                      </span>
                    ))}
                    {place.healthyOptions.length > 3 && (
                      <span className="text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                        +{place.healthyOptions.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-2 gap-3 mb-4 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <Clock size={12} className="flex-shrink-0" />
                    <span className="truncate">{place.hours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={12} className="flex-shrink-0" />
                    <span className="truncate">{place.phone}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 button button-outline text-sm font-semibold py-2.5 hover:bg-gray-50">
                    <Navigation size={14} className="mr-2" />
                    Directions
                  </button>
                  <button className="flex-1 button button-primary text-sm font-semibold py-2.5">
                    <Zap size={14} className="mr-2" />
                    Scan Menu
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Load More */}
      {filteredPlaces.length > 0 && (
        <div className="text-center">
          <button className="button button-outline">
            Load More Places
          </button>
        </div>
      )}
    </div>
  )
}

export default FoodMap