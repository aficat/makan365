import { useState, useRef } from 'react'
import { Camera, Upload, X, Sparkles, CheckCircle, Zap } from 'lucide-react'
import { detectTextFromImage } from '../utils/visionService'
import { parseNutritionData } from '../utils/nutritionParser'
import NutritionForm from './NutritionForm'

const CameraUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [isScanning, setIsScanning] = useState(false)
  const [extractedText, setExtractedText] = useState('')
  const [nutritionData, setNutritionData] = useState(null)
  const [showNutritionForm, setShowNutritionForm] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const fileInputRef = useRef(null)

  const handleImageSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target.result)
        processImage(file)
      }
      reader.readAsDataURL(file)
    }
  }

  const processImage = async (file) => {
    setIsScanning(true)
    setScanProgress(0)
    
    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setScanProgress(prev => Math.min(prev + 10, 90))
      }, 200)

      // Convert file to base64 for Vision API
      const base64 = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result.split(',')[1])
        reader.readAsDataURL(file)
      })

      // Extract text using Google Cloud Vision API
      const text = await detectTextFromImage(base64)
      setExtractedText(text)
      
      // Parse nutrition data from extracted text
      const nutrition = parseNutritionData(text)
      setNutritionData(nutrition)
      
      clearInterval(progressInterval)
      setScanProgress(100)
      
      // Show nutrition form after a short delay
      setTimeout(() => {
        setIsScanning(false)
        setShowNutritionForm(true)
      }, 500)
      
    } catch (error) {
      console.error('Error processing image:', error)
      clearInterval(progressInterval)
      setIsScanning(false)
      alert('Failed to process image. Please try again.')
    }
  }

  const handleRetake = () => {
    setSelectedImage(null)
    setExtractedText('')
    setNutritionData(null)
    setShowNutritionForm(false)
    setScanProgress(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleNutritionSubmit = (finalNutritionData) => {
    // Save to localStorage
    const logs = JSON.parse(localStorage.getItem('makan365_logs') || '[]')
    const newLog = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      image: selectedImage,
      extractedText,
      nutrition: finalNutritionData,
      nutriGrade: finalNutritionData.nutriGrade || 'Unknown'
    }
    
    logs.unshift(newLog)
    localStorage.setItem('makan365_logs', JSON.stringify(logs))
    
    // Reset form
    handleRetake()
  }

  const formatTimeAgo = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60))
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffHours < 1) return 'Just now'
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays}d ago`
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    })
  }

  if (showNutritionForm && nutritionData) {
    return (
      <NutritionForm
        nutritionData={nutritionData}
        extractedText={extractedText}
        onSubmit={handleNutritionSubmit}
        onCancel={handleRetake}
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 font-heading">Scan Food Label</h1>
        <p className="text-base sm:text-lg text-gray-600">Capture nutrition information instantly</p>
      </div>

      {/* Upload Area */}
      <div className="card">
        <div className="card-body">
          {!selectedImage ? (
            <div className="text-center py-12">
              <div className="mb-6">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary-100 to-primary-200 flex items-center justify-center">
                  <Camera size={32} className="text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Ready to scan?
                </h3>
                <p className="text-gray-600 mb-6">
                  Take a photo of a food label or nutrition facts panel
                </p>
              </div>

              <div className="space-y-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleImageSelect}
                  className="hidden"
                />
                
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="button button-primary w-full"
                >
                  <Camera size={20} />
                  Take Photo
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="button button-secondary w-full"
                >
                  <Upload size={20} />
                  Choose from Gallery
                </button>
              </div>
              <br></br>
              <div className="mt-8 p-4 bg-primary-50 rounded-xl border border-primary-200">
                <div className="flex items-start gap-3">
                  <Sparkles size={20} className="text-primary-600 mt-0.5 flex-shrink-0" />
                  <div className="text-left">
                    <h4 className="font-semibold text-primary-800 mb-2">
                      Pro Tips
                    </h4>
                    <ul className="text-sm text-primary-700 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-primary-600 font-bold">•</span>
                        <span>Ensure good lighting for better text recognition</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary-600 font-bold">•</span>
                        <span>Keep the label flat and avoid shadows</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary-600 font-bold">•</span>
                        <span>Focus on the nutrition facts panel</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Image Preview */}
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Selected food label"
                  className="w-full h-64 object-cover rounded-xl shadow-lg"
                />
                <button
                  onClick={handleRetake}
                  className="absolute top-4 right-4 p-2 bg-white bg-opacity-90 rounded-full shadow-lg hover:bg-opacity-100 transition-all duration-200"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>

              {/* Scanning Progress */}
              {isScanning && (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Zap size={20} className="text-primary-600 animate-pulse" />
                      <span className="font-semibold text-gray-800">Analyzing image...</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Extracting nutrition information using AI
                    </p>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${scanProgress}%` }}
                    ></div>
                  </div>
                  
                  <div className="text-center text-sm text-gray-600">
                    {scanProgress}% complete
                  </div>
                </div>
              )}

              {/* Results Preview */}
              {!isScanning && extractedText && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle size={20} />
                    <span className="font-semibold">Text extracted successfully!</span>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h4 className="font-semibold text-gray-800 mb-2">Extracted Text:</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {extractedText.substring(0, 200)}
                      {extractedText.length > 200 && '...'}
                    </p>
                  </div>

                  <button
                    onClick={() => setShowNutritionForm(true)}
                    className="button button-primary w-full"
                  >
                    <Sparkles size={20} />
                    Continue to Nutrition Form
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Recent Scans */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-bold text-gray-800">Recent Scans</h3>
        </div>
        <div className="card-body">
          {(() => {
            const logs = JSON.parse(localStorage.getItem('makan365_logs') || '[]')
            const recentLogs = logs.slice(0, 3) // Show last 3 scans
            
            if (recentLogs.length === 0) {
              return (
                <div className="text-center py-8 text-gray-500">
                  <Camera size={48} className="mx-auto mb-4 opacity-50" />
                  <p>No recent scans yet</p>
                  <p className="text-sm">Your scanned food labels will appear here</p>
                </div>
              )
            }
            
            return (
              <div className="space-y-2">
                {recentLogs.map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-semibold text-gray-800 truncate">
                          {log.nutrition?.foodName || 'Unknown Food'}
                        </h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          log.nutriGrade === 'A' ? 'bg-green-100 text-green-700' :
                          log.nutriGrade === 'B' ? 'bg-blue-100 text-blue-700' :
                          log.nutriGrade === 'C' ? 'bg-yellow-100 text-yellow-700' :
                          log.nutriGrade === 'D' ? 'bg-red-100 text-red-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          Grade {log.nutriGrade}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{log.nutrition?.calories || 0} calories</span>
                        <span>•</span>
                        <span>{new Date(log.timestamp).toLocaleDateString()}</span>
                        {log.nutrition?.protein && (
                          <>
                            <span>•</span>
                            <span>{log.nutrition.protein}g protein</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      {formatTimeAgo(log.timestamp)}
                    </div>
                  </div>
                ))}
                {logs.length > 3 && (
                  <div className="text-center pt-2">
                    <button className="text-primary-600 text-sm font-medium hover:text-primary-700">
                      View all {logs.length} scans
                    </button>
                  </div>
                )}
              </div>
            )
          })()}
        </div>
      </div>
    </div>
  )
}

export default CameraUpload