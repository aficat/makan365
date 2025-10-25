import { useState } from 'react'
import { Camera, BookOpen, Trophy, MapPin } from 'lucide-react'
import CameraUpload from './components/CameraUpload'
import LogList from './components/LogList'
import StreakTracker from './components/StreakTracker'
import FoodMap from './components/FoodMap'
import './App.css'

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

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <h1>Makan365 – Your Healthy 365 Food Companion</h1>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {renderActiveTab()}
      </main>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <button 
          className={`nav-item ${activeTab === 'scan' ? 'active' : ''}`}
          onClick={() => setActiveTab('scan')}
        >
          <Camera size={24} />
          <span>Scan</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'log' ? 'active' : ''}`}
          onClick={() => setActiveTab('log')}
        >
          <BookOpen size={24} />
          <span>Log</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'streaks' ? 'active' : ''}`}
          onClick={() => setActiveTab('streaks')}
        >
          <Trophy size={24} />
          <span>Streaks</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'map' ? 'active' : ''}`}
          onClick={() => setActiveTab('map')}
        >
          <MapPin size={24} />
          <span>Map</span>
        </button>
      </nav>
    </div>
  )
}

export default App
