import { useState, useEffect } from 'react'
import { Trophy, Flame, Target, Award, Star, Calendar } from 'lucide-react'

const StreakTracker = () => {
  const [streaks, setStreaks] = useState({
    currentStreak: 0,
    longestStreak: 0,
    totalGradeA: 0,
    totalLogs: 0,
    weeklyGoal: 7,
    monthlyGoal: 30
  })
  const [badges, setBadges] = useState([])
  const [recentActivity, setRecentActivity] = useState([])

  useEffect(() => {
    loadStreakData()
  }, [])

  const loadStreakData = () => {
    const logs = JSON.parse(localStorage.getItem('makan365_logs') || '[]')
    const today = new Date()
    const todayStr = today.toISOString().split('T')[0]
    
    // Calculate current streak
    let currentStreak = 0
    let longestStreak = 0
    let tempStreak = 0
    let totalGradeA = 0
    let totalLogs = logs.length
    
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
    
    if (currentStreak >= 7) newBadges.push({ id: 'week_streak', name: 'Week Warrior', description: '7-day Grade A streak', icon: 'flame', earned: true })
    if (currentStreak >= 30) newBadges.push({ id: 'month_streak', name: 'Monthly Master', description: '30-day Grade A streak', icon: 'trophy', earned: true })
    if (longestStreak >= 100) newBadges.push({ id: 'century', name: 'Century Champion', description: '100-day Grade A streak', icon: 'award', earned: true })
    if (totalGradeA >= 50) newBadges.push({ id: 'hawker_hero', name: 'Hawker Hero', description: '50 Grade A meals logged', icon: 'star', earned: true })
    if (totalLogs >= 100) newBadges.push({ id: 'food_logger', name: 'Food Logger', description: '100 meals logged', icon: 'target', earned: true })
    if (totalGradeA >= 10 && totalLogs >= 20) newBadges.push({ id: 'nutri_expert', name: 'Nutri-Grade Expert', description: '10 Grade A meals in 20 logs', icon: 'award', earned: true })
    
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

  const getStreakColor = (streak) => {
    if (streak >= 30) return '#8E44AD'
    if (streak >= 7) return '#E74C3C'
    if (streak >= 3) return '#F39C12'
    return '#95A5A6'
  }

  const getBadgeIcon = (iconName) => {
    const iconProps = { size: 24 }
    switch (iconName) {
      case 'flame': return <Flame {...iconProps} />
      case 'trophy': return <Trophy {...iconProps} />
      case 'award': return <Award {...iconProps} />
      case 'star': return <Star {...iconProps} />
      case 'target': return <Target {...iconProps} />
      default: return <Trophy {...iconProps} />
    }
  }

  return (
    <div className="streak-tracker">
      {/* Current Streak */}
      <div className="card">
        <h2>Your Streaks</h2>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ 
            fontSize: '3rem', 
            fontWeight: 'bold', 
            color: getStreakColor(streaks.currentStreak),
            marginBottom: '0.5rem'
          }}>
            {streaks.currentStreak}
          </div>
          <div style={{ fontSize: '1.2rem', color: '#666', marginBottom: '0.5rem' }}>
            Day {streaks.currentStreak === 1 ? '' : 's'} Streak
          </div>
          <div style={{ fontSize: '0.9rem', color: '#999' }}>
            {streaks.currentStreak === 0 ? 'Start your healthy eating streak!' : 'Keep it up! 🔥'}
          </div>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
          gap: '1rem' 
        }}>
          <div style={{ textAlign: 'center', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4BF4B4' }}>
              {streaks.longestStreak}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#666' }}>Longest Streak</div>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2ECC71' }}>
              {streaks.totalGradeA}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#666' }}>Grade A Meals</div>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4BF4B4' }}>
              {streaks.totalLogs}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#666' }}>Total Logs</div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h3>Recent Activity</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          {recentActivity.map((day, index) => (
            <div key={day.date} style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ 
                fontSize: '0.8rem', 
                color: '#666', 
                marginBottom: '0.5rem' 
              }}>
                {day.dayName}
              </div>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: day.hasActivity ? 
                  (day.gradeACount > 0 ? '#2ECC71' : '#F39C12') : '#e9ecef',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '0.8rem'
              }}>
                {day.totalLogs}
              </div>
              <div style={{ 
                fontSize: '0.7rem', 
                color: '#999', 
                marginTop: '0.25rem' 
              }}>
                {day.gradeACount > 0 && `${day.gradeACount}A`}
              </div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: '0.8rem', color: '#666', textAlign: 'center' }}>
          <span style={{ color: '#2ECC71' }}>●</span> Grade A meals &nbsp;
          <span style={{ color: '#F39C12' }}>●</span> Other meals &nbsp;
          <span style={{ color: '#e9ecef' }}>●</span> No activity
        </div>
      </div>

      {/* Badges */}
      <div className="card">
        <h3>Achievements</h3>
        {badges.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
            <Trophy size={48} style={{ color: '#ccc', marginBottom: '1rem' }} />
            <p>Complete challenges to earn badges!</p>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
            gap: '1rem' 
          }}>
            {badges.map(badge => (
              <div key={badge.id} style={{
                padding: '1rem',
                background: 'linear-gradient(135deg, #4BF4B4 0%, #2ECC71 100%)',
                borderRadius: '12px',
                color: 'white',
                textAlign: 'center'
              }}>
                <div style={{ marginBottom: '0.5rem' }}>
                  {getBadgeIcon(badge.icon)}
                </div>
                <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
                  {badge.name}
                </div>
                <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>
                  {badge.description}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Goals */}
      <div className="card">
        <h3>Goals</h3>
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Weekly Goal: {Math.min(streaks.currentStreak, 7)}/7 days</span>
            <span style={{ color: '#4BF4B4' }}>
              {Math.min(streaks.currentStreak, 7) >= 7 ? '✅' : '⏳'}
            </span>
          </div>
          <div style={{ 
            width: '100%', 
            height: '8px', 
            background: '#e9ecef', 
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${Math.min((Math.min(streaks.currentStreak, 7) / 7) * 100, 100)}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #4BF4B4 0%, #2ECC71 100%)',
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>
        
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Monthly Goal: {Math.min(streaks.currentStreak, 30)}/30 days</span>
            <span style={{ color: '#4BF4B4' }}>
              {Math.min(streaks.currentStreak, 30) >= 30 ? '✅' : '⏳'}
            </span>
          </div>
          <div style={{ 
            width: '100%', 
            height: '8px', 
            background: '#e9ecef', 
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${Math.min((Math.min(streaks.currentStreak, 30) / 30) * 100, 100)}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #4BF4B4 0%, #2ECC71 100%)',
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default StreakTracker
