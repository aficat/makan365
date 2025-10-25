import { useState, useRef } from 'react'
import { Camera, Upload, X } from 'lucide-react'
import { detectTextFromImage } from '../utils/visionService'
import { parseNutritionData } from '../utils/nutritionParser'
import NutritionForm from './NutritionForm'

const CameraUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [isScanning, setIsScanning] = useState(false)
  const [extractedText, setExtractedText] = useState('')
  const [nutritionData, setNutritionData] = useState(null)
  const [showNutritionForm, setShowNutritionForm] = useState(false)
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
    try {
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
      setShowNutritionForm(true)
    } catch (error) {
      console.error('Error processing image:', error)
      alert('Failed to process image. Please try again.')
    } finally {
      setIsScanning(false)
    }
  }

  const handleRetake = () => {
    setSelectedImage(null)
    setExtractedText('')
    setNutritionData(null)
    setShowNutritionForm(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSaveNutrition = (finalNutritionData) => {
    // Save to localStorage
    const logs = JSON.parse(localStorage.getItem('makan365_logs') || '[]')
    const newLog = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      image: selectedImage,
      extractedText,
      nutrition: finalNutritionData,
      nutriGrade: calculateNutriGrade(finalNutritionData)
    }
    logs.unshift(newLog)
    localStorage.setItem('makan365_logs', JSON.stringify(logs))
    
    // Reset form
    handleRetake()
    alert('Food logged successfully! 🎉')
  }

  const calculateNutriGrade = (nutrition) => {
    // Singapore Nutri-Grade calculation (simplified)
    const { calories, sugar, saturatedFat, sodium } = nutrition
    let score = 0
    
    // Sugar scoring (per 100g)
    if (sugar <= 5) score += 2
    else if (sugar <= 10) score += 1
    
    // Saturated fat scoring (per 100g)
    if (saturatedFat <= 1.5) score += 2
    else if (saturatedFat <= 3) score += 1
    
    // Sodium scoring (per 100g)
    if (sodium <= 120) score += 2
    else if (sodium <= 300) score += 1
    
    // Calorie density
    if (calories <= 100) score += 1
    
    if (score >= 6) return 'A'
    if (score >= 4) return 'B'
    if (score >= 2) return 'C'
    return 'D'
  }

  if (showNutritionForm && nutritionData) {
    return (
      <NutritionForm
        nutritionData={nutritionData}
        extractedText={extractedText}
        onSave={handleSaveNutrition}
        onCancel={handleRetake}
      />
    )
  }

  return (
    <div className="camera-upload">
      <div className="card">
        <h2>Scan Food Label</h2>
        <p>Take a photo of packaged food labels or upload from gallery</p>
        
        {selectedImage ? (
          <div className="image-preview">
            <img src={selectedImage} alt="Selected food" />
            <button className="btn btn-secondary" onClick={handleRetake}>
              <X size={20} />
              Retake Photo
            </button>
          </div>
        ) : (
          <div className="upload-options">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageSelect}
              style={{ display: 'none' }}
            />
            
            <button
              className="btn"
              onClick={() => fileInputRef.current?.click()}
              disabled={isScanning}
            >
              <Camera size={24} />
              {isScanning ? 'Scanning...' : 'Take Photo'}
            </button>
            
            <button
              className="btn btn-secondary"
              onClick={() => fileInputRef.current?.click()}
              disabled={isScanning}
            >
              <Upload size={24} />
              Upload from Gallery
            </button>
          </div>
        )}

        {isScanning && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Analyzing food label...</p>
          </div>
        )}
      </div>

      <div className="card">
        <h3>How it works</h3>
        <ol style={{ paddingLeft: '1.5rem', lineHeight: '1.6' }}>
          <li>Take a clear photo of the nutrition label</li>
          <li>Our AI extracts nutrition information</li>
          <li>Review and edit the detected values</li>
          <li>Get your Singapore Nutri-Grade rating</li>
          <li>Log your healthy food choice!</li>
        </ol>
      </div>
    </div>
  )
}

export default CameraUpload
