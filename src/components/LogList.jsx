import { useState, useEffect } from 'react'
import { Trash2, Calendar, Clock, Star } from 'lucide-react'

const LogList = () => {
  const [logs, setLogs] = useState([])
  const [filter, setFilter] = useState('all') // all, today, week, month

  useEffect(() => {
    loadLogs()
  }, [])

  const loadLogs = () => {
    const storedLogs = JSON.parse(localStorage.getItem('makan365_logs') || '[]')
    setLogs(storedLogs)
  }

  const deleteLog = (id) => {
    if (window.confirm('Are you sure you want to delete this food log?')) {
      const updatedLogs = logs.filter(log => log.id !== id)
      setLogs(updatedLogs)
      localStorage.setItem('makan365_logs', JSON.stringify(updatedLogs))
    }
  }

  const getFilteredLogs = () => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)

    return logs.filter(log => {
      const logDate = new Date(log.timestamp)
      switch (filter) {
        case 'today':
          return logDate >= today
        case 'week':
          return logDate >= weekAgo
        case 'month':
          return logDate >= monthAgo
        default:
          return true
      }
    })
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

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return 'Today'
    if (diffDays === 2) return 'Yesterday'
    if (diffDays <= 7) return `${diffDays - 1} days ago`
    return date.toLocaleDateString()
  }

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const getStats = () => {
    const filteredLogs = getFilteredLogs()
    const nutriGradeCounts = filteredLogs.reduce((acc, log) => {
      acc[log.nutriGrade] = (acc[log.nutriGrade] || 0) + 1
      return acc
    }, {})
    
    const totalCalories = filteredLogs.reduce((sum, log) => sum + (log.nutrition.calories || 0), 0)
    const avgCalories = filteredLogs.length > 0 ? Math.round(totalCalories / filteredLogs.length) : 0
    
    return { nutriGradeCounts, totalCalories, avgCalories, totalLogs: filteredLogs.length }
  }

  const stats = getStats()
  const filteredLogs = getFilteredLogs()

  return (
    <div className="log-list">
      <div className="card">
        <h2>Food Logs</h2>
        
        {/* Filter Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          {[
            { key: 'all', label: 'All' },
            { key: 'today', label: 'Today' },
            { key: 'week', label: 'Week' },
            { key: 'month', label: 'Month' }
          ].map(filterOption => (
            <button
              key={filterOption.key}
              className={`btn ${filter === filterOption.key ? '' : 'btn-secondary'}`}
              onClick={() => setFilter(filterOption.key)}
              style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', minHeight: 'auto' }}
            >
              {filterOption.label}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
          gap: '1rem', 
          marginBottom: '1.5rem' 
        }}>
          <div style={{ textAlign: 'center', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4BF4B4' }}>
              {stats.totalLogs}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#666' }}>Total Logs</div>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4BF4B4' }}>
              {stats.avgCalories}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#666' }}>Avg Calories</div>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2ECC71' }}>
              {stats.nutriGradeCounts.A || 0}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#666' }}>Grade A</div>
          </div>
        </div>
      </div>

      {/* Logs List */}
      {filteredLogs.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
          <Calendar size={48} style={{ color: '#ccc', marginBottom: '1rem' }} />
          <h3>No food logs yet</h3>
          <p style={{ color: '#666' }}>
            Start by scanning a food label to log your first meal!
          </p>
        </div>
      ) : (
        filteredLogs.map(log => (
          <div key={log.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <Clock size={16} style={{ color: '#666' }} />
                  <span style={{ fontSize: '0.9rem', color: '#666' }}>
                    {formatDate(log.timestamp)} at {formatTime(log.timestamp)}
                  </span>
                </div>
                <div style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '20px',
                  background: getNutriGradeColor(log.nutriGrade) + '20',
                  color: getNutriGradeColor(log.nutriGrade),
                  fontWeight: 'bold',
                  fontSize: '0.9rem'
                }}>
                  <Star size={14} />
                  Nutri-Grade {log.nutriGrade}
                </div>
              </div>
              <button
                onClick={() => deleteLog(log.id)}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: '#e74c3c', 
                  cursor: 'pointer',
                  padding: '0.5rem',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Trash2 size={18} />
              </button>
            </div>

            {log.image && (
              <img 
                src={log.image} 
                alt="Food" 
                style={{ 
                  width: '100%', 
                  height: '200px', 
                  objectFit: 'cover', 
                  borderRadius: '8px', 
                  marginBottom: '1rem' 
                }} 
              />
            )}

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', 
              gap: '0.5rem',
              fontSize: '0.9rem'
            }}>
              <div style={{ textAlign: 'center', padding: '0.5rem', background: '#f8f9fa', borderRadius: '6px' }}>
                <div style={{ fontWeight: 'bold', color: '#2c3e50' }}>{log.nutrition.calories}</div>
                <div style={{ color: '#666' }}>Calories</div>
              </div>
              <div style={{ textAlign: 'center', padding: '0.5rem', background: '#f8f9fa', borderRadius: '6px' }}>
                <div style={{ fontWeight: 'bold', color: '#2c3e50' }}>{log.nutrition.protein}g</div>
                <div style={{ color: '#666' }}>Protein</div>
              </div>
              <div style={{ textAlign: 'center', padding: '0.5rem', background: '#f8f9fa', borderRadius: '6px' }}>
                <div style={{ fontWeight: 'bold', color: '#2c3e50' }}>{log.nutrition.carbs}g</div>
                <div style={{ color: '#666' }}>Carbs</div>
              </div>
              <div style={{ textAlign: 'center', padding: '0.5rem', background: '#f8f9fa', borderRadius: '6px' }}>
                <div style={{ fontWeight: 'bold', color: '#2c3e50' }}>{log.nutrition.fat}g</div>
                <div style={{ color: '#666' }}>Fat</div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default LogList
