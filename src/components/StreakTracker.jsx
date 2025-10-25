import { useState, useEffect } from 'react'
import { Trophy, Flame, Target, Award, Star, Calendar, Zap, Heart, Crown, BookOpen } from 'lucide-react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js'
import { Pie, Bar } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

const StreakTracker = () => {
  const [streaks, setStreaks] = useState({
    currentStreak: 0,
    longestStreak: 0,
    totalGradeA: 0,
    totalLogs: 0,
    totalDays: 0,
    weeklyGoal: 7,
    monthlyGoal: 30
  })
  const [badges, setBadges] = useState([])
  const [recentActivity, setRecentActivity] = useState([])

  useEffect(() => {
    loadStreakData()
  }, [])

  const loadStreakData = () => {
    let logs = JSON.parse(localStorage.getItem('makan365_logs') || '[]')
    const today = new Date()
    const todayStr = today.toISOString().split('T')[0]
    
    // If no logs, use mock data for demonstration
    if (logs.length === 0) {
      logs = [
        {
          id: '1',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          nutriGrade: 'A'
        },
        {
          id: '2',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          nutriGrade: 'A'
        },
        {
          id: '3',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          nutriGrade: 'B'
        },
        {
          id: '4',
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          nutriGrade: 'A'
        },
        {
          id: '5',
          timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
          nutriGrade: 'A'
        },
        {
          id: '6',
          timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          nutriGrade: 'A'
        },
        {
          id: '7',
          timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
          nutriGrade: 'A'
        },
        {
          id: '8',
          timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          nutriGrade: 'A'
        },
        {
          id: '9',
          timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
          nutriGrade: 'A'
        },
        {
          id: '10',
          timestamp: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
          nutriGrade: 'A'
        },
        {
          id: '11',
          timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          nutriGrade: 'A'
        },
        {
          id: '12',
          timestamp: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(),
          nutriGrade: 'A'
        },
        {
          id: '13',
          timestamp: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
          nutriGrade: 'A'
        },
        {
          id: '14',
          timestamp: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString(),
          nutriGrade: 'A'
        },
        {
          id: '15',
          timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
          nutriGrade: 'A'
        }
      ]
    }
    
    // Calculate current streak
    let currentStreak = 0
    let longestStreak = 0
    let tempStreak = 0
    let totalGradeA = 0
    let totalLogs = logs.length
    let totalDays = 0
    
    // Sort logs by date (newest first)
    const sortedLogs = logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    
    // Group logs by date
    const logsByDate = {}
    sortedLogs.forEach(log => {
      const date = log.timestamp.split('T')[0]
      if (!logsByDate[date]) {
        logsByDate[date] = []
      }
      logsByDate[date].push(log)
    })
    
    // Calculate streaks
    const dates = Object.keys(logsByDate).sort((a, b) => new Date(b) - new Date(a))
    let hasLoggedToday = false
    
    for (let i = 0; i < dates.length; i++) {
      const date = dates[i]
      const dayLogs = logsByDate[date]
      const hasGradeA = dayLogs.some(log => log.nutriGrade === 'A')
      
      // Count total days with any logs (not just Grade A)
      if (dayLogs.length > 0) {
        totalDays++
      }
      
      if (hasGradeA) {
        totalGradeA++
        if (i === 0) {
          currentStreak++
          hasLoggedToday = true
        } else {
          const prevDate = new Date(dates[i-1])
          const currentDate = new Date(date)
          const diffDays = Math.floor((prevDate - currentDate) / (1000 * 60 * 60 * 24))
          
          if (diffDays === 1) {
            currentStreak++
          } else {
            break
          }
        }
        tempStreak++
        longestStreak = Math.max(longestStreak, tempStreak)
      } else {
        tempStreak = 0
      }
    }
    
    // If no logs today, reset current streak
    if (!hasLoggedToday && currentStreak > 0) {
      currentStreak = 0
    }
    
    setStreaks({
      currentStreak,
      longestStreak,
      totalGradeA,
      totalLogs,
      totalDays,
      weeklyGoal: 7,
      monthlyGoal: 30
    })
    
    // Calculate badges
    calculateBadges(currentStreak, longestStreak, totalGradeA, totalLogs)
    
    // Calculate recent activity
    calculateRecentActivity(logsByDate)
  }

  const calculateBadges = (currentStreak, longestStreak, totalGradeA, totalLogs) => {
    const newBadges = []
    
    // Mock badges for demonstration
    newBadges.push(
      { id: 'first_scan', name: 'First Scan', description: 'Scanned your first meal', icon: Target, color: 'blue', earned: true },
      { id: 'week_streak', name: 'Week Warrior', description: '7-day Grade A streak', icon: Flame, color: 'orange', earned: true },
      { id: 'hawker_hero', name: 'Hawker Hero', description: '10 Grade A meals logged', icon: Star, color: 'green', earned: true },
      { id: 'food_logger', name: 'Food Logger', description: '15 meals logged', icon: BookOpen, color: 'purple', earned: true },
      { id: 'nutri_expert', name: 'Nutri-Grade Expert', description: '5 Grade A meals in 10 logs', icon: Award, color: 'cyan', earned: true },
      { id: 'healthy_choice', name: 'Healthy Choice', description: 'Made 3 healthy choices today', icon: Heart, color: 'pink', earned: true }
    )
    
    // Add conditional badges based on actual data
    if (currentStreak >= 7) newBadges.push({ id: 'week_streak_real', name: 'Week Warrior', description: '7-day Grade A streak', icon: Flame, color: 'orange', earned: true })
    if (currentStreak >= 30) newBadges.push({ id: 'month_streak', name: 'Monthly Master', description: '30-day Grade A streak', icon: Crown, color: 'purple', earned: true })
    if (longestStreak >= 100) newBadges.push({ id: 'century', name: 'Century Champion', description: '100-day Grade A streak', icon: Award, color: 'yellow', earned: true })
    if (totalGradeA >= 50) newBadges.push({ id: 'hawker_hero_real', name: 'Hawker Hero', description: '50 Grade A meals logged', icon: Star, color: 'green', earned: true })
    if (totalLogs >= 100) newBadges.push({ id: 'food_logger_real', name: 'Food Logger', description: '100 meals logged', icon: Target, color: 'blue', earned: true })
    if (totalGradeA >= 10 && totalLogs >= 20) newBadges.push({ id: 'nutri_expert_real', name: 'Nutri-Grade Expert', description: '10 Grade A meals in 20 logs', icon: Award, color: 'cyan', earned: true })
    
    setBadges(newBadges)
  }

  const calculateRecentActivity = (logsByDate) => {
    const today = new Date()
    const last7Days = []
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      const dayLogs = logsByDate[dateStr] || []
      const gradeACount = dayLogs.filter(log => log.nutriGrade === 'A').length
      
      last7Days.unshift({
        date: dateStr,
        dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
        totalLogs: dayLogs.length,
        gradeACount,
        hasActivity: dayLogs.length > 0
      })
    }
    
    setRecentActivity(last7Days)
  }

  const getStreakMessage = (streak) => {
    if (streak === 0) return 'Start your healthy eating streak!'
    if (streak < 3) return 'Great start! Keep going! 💪'
    if (streak < 7) return 'You\'re building momentum! 🔥'
    if (streak < 30) return 'Amazing consistency! 🌟'
    return 'You\'re a streak legend! 👑'
  }

  return (
    <div className="space-y-6">
      {/* Daily Goals Card - Responsive Grid */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-xl font-bold text-gray-800 font-heading">Daily Goals</h2>
        </div>
        <div className="card-body">
          {/* 2x2 grid for macro data */}
          <div className="grid grid-cols-2 gap-4">
            {/* Calorie Goal */}
            <div className="text-center p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">1,900</div>
              <div className="text-sm text-gray-600 mb-3">Calorie Budget</div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div className="bg-green-500 h-3 rounded-full transition-all duration-300" style={{ width: '92%' }}></div>
              </div>
              <div className="text-xs text-gray-500">1,750 / 1,900</div>
            </div>

            {/* Protein Goal */}
            <div className="text-center p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">74g</div>
              <div className="text-sm text-gray-600 mb-3">Protein</div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div className="bg-blue-500 h-3 rounded-full transition-all duration-300" style={{ width: '85%' }}></div>
              </div>
              <div className="text-xs text-gray-500">63g / 74g</div>
            </div>

            {/* Carbs Goal */}
            <div className="text-center p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">251g</div>
              <div className="text-sm text-gray-600 mb-3">Carbs</div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div className="bg-yellow-500 h-3 rounded-full transition-all duration-300" style={{ width: '78%' }}></div>
              </div>
              <div className="text-xs text-gray-500">196g / 251g</div>
            </div>

            {/* Fat Goal */}
            <div className="text-center p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">30g</div>
              <div className="text-sm text-gray-600 mb-3">Fat</div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div className="bg-purple-500 h-3 rounded-full transition-all duration-300" style={{ width: '90%' }}></div>
              </div>
              <div className="text-xs text-gray-500">27g / 30g</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Single Column Layout */}
      <div className="space-y-6">
        {/* Streak & Progress - Full width on all devices */}
        <div>
          <div className="card">
            <div className="card-header">
              <h2 className="text-xl font-bold text-gray-800 font-heading">Healthy Eating Streak</h2>
            </div>
            <div className="card-body">
              {/* Stats Row - 2x2 Grid Layout */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-mint-50 rounded-xl hover:shadow-md transition-shadow">
                  <div className="text-3xl sm:text-4xl font-bold text-mint-500 font-heading">{streaks.currentStreak}</div>
                  <div className="text-sm text-gray-600">Day Streak</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl hover:shadow-md transition-shadow">
                  <div className="text-2xl sm:text-3xl font-bold text-cute-purple">{streaks.currentStreak * 10}</div>
                  <div className="text-sm text-gray-600">XP Points</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-xl hover:shadow-md transition-shadow">
                  <div className="text-2xl sm:text-3xl font-bold text-cute-yellow">Level {Math.floor(streaks.currentStreak / 7) + 1}</div>
                  <div className="text-sm text-gray-600">Current Level</div>
                </div>
                <div className="text-center p-4 bg-primary-50 rounded-xl hover:shadow-md transition-shadow">
                  <div className="text-2xl sm:text-3xl font-bold text-primary-600">{Math.round((streaks.currentStreak / 30) * 100)}%</div>
                  <div className="text-sm text-gray-600">Goal Progress</div>
                </div>
              </div>
              
              {/* Macro Breakdown Chart */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Today's Macro Breakdown</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Pie Chart */}
                  <div className="flex justify-center">
                    <div className="w-48 h-48">
                      <Pie 
                        data={{
                          labels: ['Carbs', 'Protein', 'Fat', 'Other'],
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
                  </div>
                  
                  {/* Legend */}
                  <div className="space-y-3 flex flex-col justify-center">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-700">Carbohydrates</div>
                        <div className="text-xs text-gray-500">196g (50%)</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-700">Protein</div>
                        <div className="text-xs text-gray-500">63g (16%)</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-700">Fat</div>
                        <div className="text-xs text-gray-500">27g (15%)</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-700">Other</div>
                        <div className="text-xs text-gray-500">19%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Weekly Activity Chart */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">7-Day Activity</h3>
                <div className="h-32">
                  <Bar 
                    data={{
                      labels: recentActivity.map(day => day.dayName),
                      datasets: [{
                        label: 'Grade A Meals',
                        data: recentActivity.map(day => day.gradeACount),
                        backgroundColor: recentActivity.map(day => 
                          day.hasActivity 
                            ? day.gradeACount > 0 
                              ? '#10b981' // green-500
                              : '#f59e0b' // amber-500
                            : '#e5e7eb' // gray-200
                        ),
                        borderRadius: 4,
                        borderSkipped: false,
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
                              const day = recentActivity[context.dataIndex]
                              if (!day.hasActivity) return 'No activity'
                              return `${day.gradeACount} Grade A meal${day.gradeACount !== 1 ? 's' : ''}`
                            }
                          }
                        }
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          max: 5,
                          ticks: {
                            stepSize: 1
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats - Full width on all devices */}
        <div>
          <div className="card">
            <div className="card-header">
              <h2 className="text-lg font-bold text-gray-800 font-heading">Quick Stats</h2>
            </div>
            <div className="card-body">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-primary-50 rounded-xl hover:shadow-md transition-shadow">
                  <div className="text-2xl font-bold text-primary-600 mb-1">{streaks.longestStreak}</div>
                  <div className="text-sm font-semibold text-primary-700">Longest Streak</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl hover:shadow-md transition-shadow">
                  <div className="text-2xl font-bold text-green-600 mb-1">{streaks.totalDays}</div>
                  <div className="text-sm font-semibold text-green-700">Total Days</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-xl hover:shadow-md transition-shadow">
                  <div className="text-2xl font-bold text-yellow-600 mb-1">{badges.length}</div>
                  <div className="text-sm font-semibold text-yellow-700">Badges Earned</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Recent Activity */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-xl font-bold text-gray-800 font-heading">Recent Activity</h2>
        </div>

        <div className="card-body">
          <div className="grid grid-cols-7 gap-2 mb-4">
            {recentActivity.map((day, index) => (
              <div key={day.date} className="flex flex-col items-center gap-2">
                <div className="text-xs text-gray-500 font-medium">
                  {day.dayName}
                </div>
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg ${
                    day.hasActivity
                      ? day.gradeACount > 0
                        ? 'bg-green-400'
                        : 'bg-orange-400'
                      : 'bg-gray-200'
                  }`}
                  title={`${day.totalLogs} logs, ${day.gradeACount} Grade A`}
                >
                  {day.totalLogs}
                </div>
                {day.gradeACount > 0 && (
                  <span className="bg-green-100 text-green-800 text-xs px-1 py-0.5 sm:px-2 sm:py-1 rounded-full">
                    {day.gradeACount}A
                  </span>
                )}
              </div>
            ))}
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span>Grade A meals</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-orange-400" />
              <span>Other meals</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-gray-200" />
              <span>No activity</span>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-xl font-bold text-gray-800 font-heading">Achievements</h2>
        </div>

        <div className="card-body">
          {badges.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-8">
              <div className="p-4 rounded-full bg-gray-100 text-gray-400">
                <Trophy size={48} />
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-700 mb-2">
                  No badges yet
                </div>
                <div className="text-gray-500">
                  Complete challenges to earn your first badge!
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {badges.map((badge, index) => {
                const Icon = badge.icon
                const colorClasses = {
                  orange: 'from-orange-500 to-orange-600',
                  purple: 'from-purple-500 to-purple-600',
                  yellow: 'from-yellow-500 to-yellow-600',
                  green: 'from-green-500 to-green-600',
                  blue: 'from-blue-500 to-blue-600',
                  cyan: 'from-cyan-500 to-cyan-600'
                }
                return (
                  <div
                    key={badge.id}
                    className={`bg-gradient-to-br ${colorClasses[badge.color] || 'from-gray-500 to-gray-600'} text-white rounded-xl p-4 min-w-[200px] shadow-lg hover:transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300`}
                  >
                    <div className="flex flex-col items-center text-center gap-3">
                      <div className="p-3 rounded-full bg-white bg-opacity-20 backdrop-blur-sm">
                        <Icon size={32} />
                      </div>
                      <div>
                        <div className="font-bold text-lg">
                          {badge.name}
                        </div>
                        <div className="text-sm opacity-90">
                          {badge.description}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Daily Mission */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-xl font-bold text-gray-800 font-heading">Today's Mission</h2>
        </div>
        <div className="card-body">
          <div className="bg-gradient-to-r from-cute-pink to-cute-orange p-4 rounded-xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg font-heading">Save $5 on food today</h3>
                <p className="text-sm opacity-90">Choose Grade A meals to complete this mission</p>
              </div>
              <button className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-semibold">
                Skip
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Goals */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-xl font-bold text-gray-800 font-heading">Goals</h2>
        </div>

        <div className="card-body">
          <div className="space-y-6">
            {/* Weekly Goal */}
            <div className="w-full">
              <div className="flex justify-between items-center mb-2">
                <div className="font-semibold text-gray-700">
                  Weekly Goal
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm text-gray-600">
                    {Math.min(streaks.currentStreak, 7)}/7 days
                  </div>
                  {Math.min(streaks.currentStreak, 7) >= 7 ? (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">✅</span>
                  ) : (
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">⏳</span>
                  )}
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(Math.min(streaks.currentStreak, 7) / 7) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Monthly Goal */}
            <div className="w-full">
              <div className="flex justify-between items-center mb-2">
                <div className="font-semibold text-gray-700">
                  Monthly Goal
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm text-gray-600">
                    {Math.min(streaks.currentStreak, 30)}/30 days
                  </div>
                  {Math.min(streaks.currentStreak, 30) >= 30 ? (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">✅</span>
                  ) : (
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">⏳</span>
                  )}
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(Math.min(streaks.currentStreak, 30) / 30) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StreakTracker