# Makan365 - Your Healthy 365 Food Companion

A mobile-first Progressive Web App (PWA) that helps Singaporeans make healthier food choices by scanning nutrition labels and tracking their eating habits with Singapore's Nutri-Grade system.

## Features

### 🍽️ Core Functionality
- **Camera Scanning**: Take photos of food labels or upload from gallery
- **OCR Text Detection**: Extract nutrition information using Google Cloud Vision API
- **Singapore Nutri-Grade**: Apply MOH nutrition guidelines for local food rating
- **Food Logging**: Track your meals with detailed nutrition breakdown
- **Streak Tracking**: Monitor your healthy eating habits with 365-day challenges

### 🗺️ Local Integration
- **Hawker Food Database**: Map scanned foods to local Singapore dishes
- **Cultural Filters**: Halal, Vegetarian, Chinese, Indian, Malay cuisine options
- **Food Map**: Find nearby healthy food options (Google Maps integration)
- **Healthy 365 Sync**: Integration with Singapore's official health app

### 📱 Mobile-First PWA
- **Offline Support**: Works without internet connection
- **Install Prompt**: Add to home screen like a native app
- **Touch Optimized**: Large tap targets and smooth scrolling
- **Responsive Design**: Perfect on all screen sizes

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Google Cloud Platform account (for Vision API)

### Installation

1. **Clone and install dependencies**
   ```bash
   git clone <repository-url>
   cd makan365
   npm install
   ```

2. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_VISION_API_KEY=your_google_vision_api_key
   VITE_MAPS_API_KEY=your_google_maps_api_key
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

## API Setup

### Google Cloud Vision API
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable the **Vision API** in the API Library
4. Create credentials (API Key) in the Credentials section
5. Restrict the API key to Vision API only for security
6. Add the key to your `.env` file

### Google Maps API (Optional)
1. Enable **Maps JavaScript API** and **Places API**
2. Create an API key with appropriate restrictions
3. Add the key to your `.env` file

## Project Structure

```
makan365/
├── src/
│   ├── components/          # React components
│   │   ├── CameraUpload.jsx    # Camera and image upload
│   │   ├── NutritionForm.jsx   # Nutrition data editing
│   │   ├── LogList.jsx         # Food log history
│   │   ├── StreakTracker.jsx   # Habit tracking
│   │   └── FoodMap.jsx         # Map integration
│   ├── utils/              # Utility services
│   │   ├── visionService.js    # Google Vision API
│   │   ├── nutritionParser.js  # Nutrition data parsing
│   │   ├── healthy365Sync.js   # Healthy 365 integration
│   │   ├── localFoodMapper.js  # Singapore food database
│   │   └── mapService.js       # Google Maps service
│   ├── App.jsx             # Main application
│   └── test/
│       └── setup.js        # Test environment setup
├── e2e/                    # E2E tests (Playwright)
├── vitest.config.js        # Vitest configuration
└── playwright.config.js    # Playwright configuration
```

## Key Features Explained

### Singapore Nutri-Grade System
The app implements Singapore's official Nutri-Grade system:
- **Grade A**: Excellent choice (low sugar, saturated fat, sodium)
- **Grade B**: Good choice (moderate levels)
- **Grade C**: Moderate choice (higher levels)
- **Grade D**: Consider alternatives (high levels)

### Local Food Database
Includes popular Singapore foods:
- Hawker dishes (Chicken Rice, Laksa, Char Kway Teow)
- Supermarket products (Brown Rice, Oats, Greek Yogurt)
- Cultural filters (Halal, Vegetarian, Chinese, Indian, Malay)

### PWA Features
- **Service Worker**: Caches app for offline use
- **Web App Manifest**: Makes it installable
- **Responsive Design**: Works on all devices
- **Touch Gestures**: Optimized for mobile interaction

## Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Building for Production
```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## Testing

The project includes comprehensive test coverage with **59 unit tests** and **5 E2E test suites**.

### 🧪 Quick Test Commands

```bash
# Run all unit tests
npm run test

# Run unit tests once (without watch mode)
npm run test -- --run

# Run tests with interactive UI
npm run test:ui

# Generate coverage report
npm run test:coverage

# Run E2E tests (Playwright)
npm run test:e2e

# Run E2E tests with interactive UI
npm run test:e2e:ui

# Run E2E tests in headed mode (see browser)
npm run test:e2e:headed

# Run ALL tests (unit + E2E)
npm run test:all
```

### 📊 Current Test Status

✅ **59 Unit Tests - ALL PASSING**

```
✓ App Component: 8 tests
✓ CameraUpload: 9 tests
✓ LogList: 9 tests
✓ FoodMap: 8 tests
✓ StreakTracker: 13 tests
✓ NutritionForm: 12 tests
✓ E2E Test Suites: 5 suites ready
```

### What's Tested

**Unit Tests (Vitest + React Testing Library):**
- ✅ App header and navigation
- ✅ Tab switching and active state
- ✅ Camera upload and file handling
- ✅ Food log search, filter, and sort
- ✅ Food map search and filters
- ✅ Streak calculation and tracking
- ✅ Form validation and submission

**E2E Tests (Playwright):**
- ✅ App navigation and tab switching
- ✅ Camera upload flow
- ✅ Log list search and filtering
- ✅ Streaks tracking display
- ✅ Food map interactions

### Test File Structure

```
src/
├── App.test.jsx                    ✓ 8 tests
└── components/
    ├── CameraUpload.test.jsx       ✓ 9 tests
    ├── LogList.test.jsx            ✓ 9 tests
    ├── FoodMap.test.jsx            ✓ 8 tests
    ├── StreakTracker.test.jsx      ✓ 13 tests
    └── NutritionForm.test.jsx      ✓ 12 tests

e2e/
├── app.spec.js                     E2E tests
├── camera-upload.spec.js           E2E tests
├── log-list.spec.js                E2E tests
├── streaks.spec.js                 E2E tests
└── food-map.spec.js                E2E tests
```

### Writing New Tests

**Adding a Unit Test:**

1. Create a test file next to your component:
   ```javascript
   // src/components/MyComponent.test.jsx
   import { describe, it, expect } from 'vitest'
   import { render, screen } from '@testing-library/react'
   import MyComponent from './MyComponent'
   
   describe('MyComponent', () => {
     it('should render correctly', () => {
       render(<MyComponent />)
       expect(screen.getByText('Expected Text')).toBeInTheDocument()
     })
   })
   ```

2. Run the test:
   ```bash
   npm run test MyComponent.test.jsx
   ```

**Adding an E2E Test:**

1. Add a test file in the `e2e/` directory:
   ```javascript
   // e2e/my-feature.spec.js
   import { test, expect } from '@playwright/test'
   
   test.describe('My Feature', () => {
     test('should work correctly', async ({ page }) => {
       await page.goto('/')
       // Your test code here
     })
   })
   ```

2. Run the test:
   ```bash
   npm run test:e2e my-feature.spec.js
   ```

### Test Coverage

Generate a detailed coverage report:

```bash
npm run test:coverage
```

This creates an HTML coverage report in the `coverage/` directory. The project aims for >80% unit test coverage.

### Common Testing Issues

**Tests not running?**
```bash
npm install
npx playwright install chromium
```

**E2E tests timing out?**
Increase timeout in `playwright.config.js`:
```javascript
use: {
  timeout: 60000 // 60 seconds
}
```

### Best Practices

1. **Test user interactions**: Use `@testing-library/user-event` for realistic interactions
2. **Test accessibility**: Use semantic queries like `getByRole` and `getByLabelText`
3. **Keep tests isolated**: Each test should be independent
4. **Test what users see**: Focus on user-visible behavior
5. **Use meaningful names**: Test names should clearly describe what they're testing

## Deployment

### Firebase Hosting (Recommended)
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Build: `npm run build`
5. Deploy: `firebase deploy`

### Other Platforms
- **Vercel**: Connect your GitHub repo
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use GitHub Actions for deployment

## Future Enhancements

### Planned Features
- [ ] Barcode scanning for packaged foods
- [ ] AI-based meal recommendations
- [ ] Firestore database sync
- [ ] Social features and challenges
- [ ] Integration with fitness trackers
- [ ] Meal planning and recipes
- [ ] Restaurant menu integration

### Technical Improvements
- [ ] Real-time Google Maps integration
- [ ] Push notifications for meal reminders
- [ ] Advanced analytics and insights
- [ ] Multi-language support
- [ ] Accessibility improvements

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue on GitHub
- Email: support@makan365.sg
- Visit: https://makan365.sg

## Acknowledgments

- Singapore Ministry of Health for Nutri-Grade guidelines
- Google Cloud Vision API for OCR capabilities
- Singapore food community for local food data
- Open source contributors and libraries

---

**Made with ❤️ for Singapore's healthy eating journey**