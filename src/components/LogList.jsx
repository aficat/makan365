import { useState, useEffect } from 'react'
import { BookOpen, Trash2, Eye, Calendar, Clock, Star, Filter, Search } from 'lucide-react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

const LogList = () => {
  const [logs, setLogs] = useState([])
  const [filteredLogs, setFilteredLogs] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterGrade, setFilterGrade] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  useEffect(() => {
    loadLogs()
  }, [])

  useEffect(() => {
    filterAndSortLogs()
  }, [logs, searchTerm, filterGrade, sortBy])

  const loadLogs = () => {
    let savedLogs = JSON.parse(localStorage.getItem('makan365_logs') || '[]')
    
    // Add mock data if no logs exist
    if (savedLogs.length === 0) {
      const mockLogs = [
        {
          id: '1',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
          image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&auto=format&q=80',
          extractedText: 'Nutrition Facts Serving Size: 1 bowl (300g) Calories: 450 Protein: 12g Fat: 8g Carbs: 75g Sugar: 15g Sodium: 120mg',
          nutrition: {
            foodName: 'Chicken Rice',
            calories: 450,
            protein: 12,
            fat: 8,
            carbs: 75,
            sugar: 15,
            sodium: 120,
            fiber: 2,
            saturatedFat: 2,
            transFat: 0,
            cholesterol: 45,
            nutriGrade: 'A'
          },
          nutriGrade: 'A'
        },
        {
          id: '2',
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
          image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop&auto=format&q=80',
          extractedText: 'Nutrition Facts Serving Size: 1 piece (150g) Calories: 320 Protein: 8g Fat: 15g Carbs: 35g Sugar: 25g Sodium: 280mg',
          nutrition: {
            foodName: 'Char Kway Teow',
            calories: 320,
            protein: 8,
            fat: 15,
            carbs: 35,
            sugar: 25,
            sodium: 280,
            fiber: 1,
            saturatedFat: 4,
            transFat: 0,
            cholesterol: 30,
            nutriGrade: 'C'
          },
          nutriGrade: 'C'
        },
        {
          id: '3',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
          image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400&h=300&fit=crop',
          extractedText: 'Nutrition Facts Serving Size: 1 burger (200g) Calories: 580 Protein: 25g Fat: 28g Carbs: 45g Sugar: 12g Sodium: 890mg',
          nutrition: {
            foodName: 'McDonald\'s Big Mac',
            calories: 580,
            protein: 25,
            fat: 28,
            carbs: 45,
            sugar: 12,
            sodium: 890,
            fiber: 3,
            saturatedFat: 8,
            transFat: 1,
            cholesterol: 80,
            nutriGrade: 'D'
          },
          nutriGrade: 'D'
        },
        {
          id: '4',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
          image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
          extractedText: 'Nutrition Facts Serving Size: 1 bowl (250g) Calories: 180 Protein: 6g Fat: 2g Carbs: 35g Sugar: 8g Sodium: 95mg',
          nutrition: {
            foodName: 'Mixed Vegetable Salad',
            calories: 180,
            protein: 6,
            fat: 2,
            carbs: 35,
            sugar: 8,
            sodium: 95,
            fiber: 8,
            saturatedFat: 0.5,
            transFat: 0,
            cholesterol: 0,
            nutriGrade: 'A'
          },
          nutriGrade: 'A'
        },
        {
          id: '5',
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
          image: 'https://images.unsplash.com/photo-1563379091339-03246963d4d0?w=400&h=300&fit=crop',
          extractedText: 'Nutrition Facts Serving Size: 1 plate (300g) Calories: 420 Protein: 15g Fat: 12g Carbs: 60g Sugar: 18g Sodium: 450mg',
          nutrition: {
            foodName: 'Nasi Lemak',
            calories: 420,
            protein: 15,
            fat: 12,
            carbs: 60,
            sugar: 18,
            sodium: 450,
            fiber: 3,
            saturatedFat: 3,
            transFat: 0,
            cholesterol: 25,
            nutriGrade: 'B'
          },
          nutriGrade: 'B'
        },
        {
          id: '6',
          timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
          image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop',
          extractedText: 'Nutrition Facts Serving Size: 1 bowl (280g) Calories: 380 Protein: 18g Fat: 6g Carbs: 55g Sugar: 10g Sodium: 200mg',
          nutrition: {
            foodName: 'Fish Soup Noodles',
            calories: 380,
            protein: 18,
            fat: 6,
            carbs: 55,
            sugar: 10,
            sodium: 200,
            fiber: 4,
            saturatedFat: 1.5,
            transFat: 0,
            cholesterol: 35,
            nutriGrade: 'A'
          },
          nutriGrade: 'A'
        }
      ]
      
      // Save mock data to localStorage
      localStorage.setItem('makan365_logs', JSON.stringify(mockLogs))
      savedLogs = mockLogs
    }
    
    setLogs(savedLogs)
  }

  const filterAndSortLogs = () => {
    let filtered = [...logs]

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(log => 
        log.extractedText?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.nutrition?.foodName?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by grade
    if (filterGrade !== 'all') {
      filtered = filtered.filter(log => log.nutriGrade === filterGrade)
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.timestamp) - new Date(a.timestamp)
        case 'oldest':
          return new Date(a.timestamp) - new Date(b.timestamp)
        case 'grade':
          const gradeOrder = { 'A': 1, 'B': 2, 'C': 3, 'D': 4, 'Unknown': 5 }
          return (gradeOrder[a.nutriGrade] || 5) - (gradeOrder[b.nutriGrade] || 5)
        default:
          return 0
      }
    })

    setFilteredLogs(filtered)
  }

  const deleteLog = (logId) => {
    if (window.confirm('Are you sure you want to delete this log?')) {
      const updatedLogs = logs.filter(log => log.id !== logId)
      setLogs(updatedLogs)
      localStorage.setItem('makan365_logs', JSON.stringify(updatedLogs))
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

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return 'Today'
    if (diffDays === 2) return 'Yesterday'
    if (diffDays <= 7) return `${diffDays - 1} days ago`
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    })
  }

  const getStats = () => {
    const totalLogs = logs.length
    const gradeALogs = logs.filter(log => log.nutriGrade === 'A').length
    const gradeAPercentage = totalLogs > 0 ? Math.round((gradeALogs / totalLogs) * 100) : 0
    const avgCalories = logs.length > 0 
      ? Math.round(logs.reduce((sum, log) => sum + (log.nutrition?.calories || 0), 0) / logs.length)
      : 0

    return { totalLogs, gradeALogs, gradeAPercentage, avgCalories }
  }

  const stats = getStats()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 font-heading">Food Log</h1>
        <p className="text-base sm:text-lg text-gray-600">Track your healthy eating journey</p>
      </div>

      {/* Daily Macro Summary - Macro App Style */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-xl font-bold text-gray-800 font-heading">Today's Summary</h2>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-2 gap-4">
            {/* Calories */}
            <div className="text-center p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">1,570</div>
              <div className="text-sm text-gray-600 mb-3">Calories</div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div className="bg-green-500 h-3 rounded-full transition-all duration-300" style={{ width: '83%' }}></div>
              </div>
              <div className="text-xs text-gray-500">1,570 / 1,900</div>
            </div>

            {/* Protein */}
            <div className="text-center p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">63g</div>
              <div className="text-sm text-gray-600 mb-3">Protein</div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div className="bg-blue-500 h-3 rounded-full transition-all duration-300" style={{ width: '85%' }}></div>
              </div>
              <div className="text-xs text-gray-500">63g / 74g</div>
            </div>

            {/* Carbs */}
            <div className="text-center p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">196g</div>
              <div className="text-sm text-gray-600 mb-3">Carbs</div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div className="bg-yellow-500 h-3 rounded-full transition-all duration-300" style={{ width: '78%' }}></div>
              </div>
              <div className="text-xs text-gray-500">196g / 251g</div>
            </div>

            {/* Fat */}
            <div className="text-center p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">27g</div>
              <div className="text-sm text-gray-600 mb-3">Fat</div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div className="bg-purple-500 h-3 rounded-full transition-all duration-300" style={{ width: '90%' }}></div>
              </div>
              <div className="text-xs text-gray-500">27g / 30g</div>
            </div>
          </div>
        </div>
      </div>

      {/* Meal Breakdown */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-xl font-bold text-gray-800 font-heading">Meal Breakdown</h2>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-orange-50 rounded-xl hover:shadow-md transition-shadow">
              <div className="text-2xl font-bold text-orange-600 mb-1">530</div>
              <div className="text-sm font-semibold text-orange-700">Breakfast</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-xl hover:shadow-md transition-shadow">
              <div className="text-2xl font-bold text-blue-600 mb-1">450</div>
              <div className="text-sm font-semibold text-blue-700">Lunch</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-xl hover:shadow-md transition-shadow">
              <div className="text-2xl font-bold text-purple-600 mb-1">340</div>
              <div className="text-sm font-semibold text-purple-700">Dinner</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl hover:shadow-md transition-shadow">
              <div className="text-2xl font-bold text-green-600 mb-1">250</div>
              <div className="text-sm font-semibold text-green-700">Snacks</div>
            </div>
          </div>
        </div>
      </div>

      {/* Macro Breakdown Chart */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-xl font-bold text-gray-800 font-heading">Macro Distribution</h2>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pie Chart */}
            <div className="flex flex-col items-center">
              <div className="w-64 h-64">
                <Pie 
                  data={{
                    labels: ['Carbohydrates', 'Protein', 'Fat', 'Other'],
                    datasets: [{
                      data: [50, 16, 15, 19],
                      backgroundColor: [
                        '#10b981', // green-500
                        '#3b82f6', // blue-500
                        '#eab308', // yellow-500
                        '#8b5cf6'  // purple-500
                      ],
                      borderWidth: 0,
                    }]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false
                      },
                      tooltip: {
                        callbacks: {
                          label: function(context) {
                            const labels = ['Carbs 196g', 'Protein 63g', 'Fat 27g', 'Other']
                            return labels[context.dataIndex] + ' (' + context.parsed + '%)'
                          }
                        }
                      }
                    }
                  }}
                />
              </div>
              <div className="text-center mt-2">
                <div className="text-lg font-bold text-gray-700">1,570</div>
                <div className="text-sm text-gray-500">calories</div>
              </div>
            </div>
            
            {/* Legend and Details */}
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Carbohydrates</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-800">196g</div>
                    <div className="text-xs text-gray-500">50%</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Protein</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-800">63g</div>
                    <div className="text-xs text-gray-500">16%</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Fat</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-800">27g</div>
                    <div className="text-xs text-gray-500">15%</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Other</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-800">-</div>
                    <div className="text-xs text-gray-500">19%</div>
                  </div>
                </div>
              </div>
              
              {/* Progress Bars */}
              <div className="space-y-2 pt-2 border-t border-gray-200">
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>Daily Goal Progress</span>
                  <span>83%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full" style={{ width: '83%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
                placeholder="Search food items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-10"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <select
                value={filterGrade}
                onChange={(e) => setFilterGrade(e.target.value)}
                className="form-input text-sm"
              >
                <option value="all">All Grades</option>
                <option value="A">Grade A</option>
                <option value="B">Grade B</option>
                <option value="C">Grade C</option>
                <option value="D">Grade D</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-input text-sm"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="grade">Best Grade First</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Logs Grid - Single Column Layout */}
      <div className="space-y-4">
        {filteredLogs.length === 0 ? (
          <div className="card">
            <div className="card-body text-center py-12">
              <BookOpen size={48} className="mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                {logs.length === 0 ? 'No logs yet' : 'No matching logs'}
              </h3>
              <p className="text-gray-500">
                {logs.length === 0 
                  ? 'Start scanning food labels to build your log!'
                  : 'Try adjusting your search or filter criteria.'
                }
              </p>
            </div>
          </div>
        ) : (
          filteredLogs.map((log) => (
            <div key={log.id} className="group card hover:shadow-xl transition-all duration-300 overflow-hidden">
              {/* Food Image Header */}
              <div className="relative h-32 overflow-hidden">
                <img
                  src={log.image}
                  alt="Food item"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                
                {/* Grade Badge */}
                <div className="absolute top-3 right-3">
                  <span className={`badge ${getGradeColor(log.nutriGrade)} text-xs font-semibold backdrop-blur-sm bg-white/90`}>
                    Grade {log.nutriGrade}
                  </span>
                </div>

                {/* Delete Button */}
                <div className="absolute top-3 left-3">
                  <button
                    onClick={() => deleteLog(log.id)}
                    className="p-2 bg-white/90 backdrop-blur-sm text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
                    title="Delete log"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-4">
                {/* Food Name and Date */}
                <div className="mb-4">
                  <h3 className="font-bold text-gray-800 font-heading mb-1 line-clamp-1">
                    {log.nutrition?.foodName || 'Unknown Food'}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar size={12} />
                    <span>{formatDate(log.timestamp)}</span>
                  </div>
                </div>

                {/* Macro Breakdown - Improved Layout */}
                {log.nutrition && (
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="text-center p-3 bg-green-50 rounded-xl border border-green-100">
                      <div className="text-xl font-bold text-green-600">
                        {log.nutrition.calories || 0}
                      </div>
                      <div className="text-xs text-green-700 font-medium">Calories</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-xl border border-blue-100">
                      <div className="text-xl font-bold text-blue-600">
                        {log.nutrition.protein || 0}g
                      </div>
                      <div className="text-xs text-blue-700 font-medium">Protein</div>
                    </div>
                    <div className="text-center p-3 bg-yellow-50 rounded-xl border border-yellow-100">
                      <div className="text-xl font-bold text-yellow-600">
                        {log.nutrition.carbs || 0}g
                      </div>
                      <div className="text-xs text-yellow-700 font-medium">Carbs</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-xl border border-purple-100">
                      <div className="text-xl font-bold text-purple-600">
                        {log.nutrition.fat || 0}g
                      </div>
                      <div className="text-xs text-purple-700 font-medium">Fat</div>
                    </div>
                  </div>
                )}

                {/* Additional Info */}
                {log.extractedText && (
                  <div className="p-3 bg-gray-50 rounded-lg text-xs text-gray-600">
                    <div className="flex items-center gap-1 mb-1">
                      <Eye size={12} />
                      <span className="font-medium">Extracted Text:</span>
                    </div>
                    <p className="line-clamp-2">
                      {log.extractedText.substring(0, 100)}
                      {log.extractedText.length > 100 && '...'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Load More Button */}
      {filteredLogs.length > 0 && (
        <div className="text-center">
          <button className="button button-outline">
            Load More Logs
          </button>
        </div>
      )}
    </div>
  )
}

export default LogList