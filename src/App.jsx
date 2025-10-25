import { useState } from 'react'
import { Camera, BookOpen, Trophy, MapPin, Sparkles } from 'lucide-react'
import CameraUpload from './components/CameraUpload'
import LogList from './components/LogList'
import StreakTracker from './components/StreakTracker'
import FoodMap from './components/FoodMap'

function App() {
  const [activeTab, setActiveTab] = useState('scan')

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'scan':
        return <CameraUpload />
      case 'log':
        return <LogList />
      case 'streaks':
        return <StreakTracker />
      case 'map':
        return <FoodMap />
      default:
        return <CameraUpload />
    }
  }

  const navItems = [
    { id: 'scan', icon: Camera, label: 'Scan', color: 'primary' },
    { id: 'log', icon: BookOpen, label: 'Log', color: 'blue' },
    { id: 'streaks', icon: Trophy, label: 'Streaks', color: 'orange' },
    { id: 'map', icon: MapPin, label: 'Map', color: 'green' },
  ]

  const bgGradient = 'linear(to-br, primary-400, primary-600)'

  return (
    <div className="app">
      {/* Animated background elements */}
      <div className="background-pattern" />

      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo-icon">
              <Sparkles size={24} />
            </div>
            <div className="logo-text">
              <h1 className="logo-title">Makan365</h1>
              <p className="logo-subtitle">Your Healthy 365 Food Companion</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          <div className="content-wrapper">
            {renderActiveTab()}
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <div className="nav-items">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id

            return (
              <div
                key={item.id}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <div className={`nav-icon ${isActive ? 'active' : ''}`}>
                  <Icon size={20} />
                </div>
                <span className="nav-label">{item.label}</span>
              </div>
            )
          })}
        </div>
      </nav>
    </div>
  )
}

export default App
