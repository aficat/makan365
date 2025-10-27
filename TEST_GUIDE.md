# Testing Guide for Makan365

This guide explains how to run the test suites for the Makan365 application.

## Overview

The project includes three types of tests:
1. **Unit Tests** - Using Vitest and React Testing Library
2. **Component Tests** - Testing individual React components
3. **E2E Tests** - Using Playwright for end-to-end testing

## Prerequisites

All dependencies have been installed. If you need to reinstall:

```bash
npm install
npx playwright install chromium
```

## Running Tests

### 1. Run All Unit Tests

Run all unit and component tests:

```bash
npm run test
```

### 2. Run Tests in Watch Mode

Run tests in watch mode (automatically re-runs when files change):

```bash
npm run test
```
(Vitest runs in watch mode by default in development)

### 3. Run Tests with UI

Open the Vitest UI for an interactive testing experience:

```bash
npm run test:ui
```

This opens a browser window where you can:
- See test results in real-time
- Run individual tests
- Filter tests by name
- View test coverage

### 4. Generate Test Coverage Report

Generate a detailed coverage report:

```bash
npm run test:coverage
```

This creates an HTML coverage report in the `coverage` directory. Open `coverage/index.html` in your browser to view it.

### 5. Run E2E Tests (Playwright)

Run all end-to-end tests:

```bash
npm run test:e2e
```

### 6. Run E2E Tests with UI

Run Playwright with its interactive UI:

```bash
npm run test:e2e:ui
```

### 7. Run E2E Tests in Headed Mode

Run E2E tests with visible browser:

```bash
npm run test:e2e:headed
```

### 8. Run All Tests

Run both unit tests and E2E tests:

```bash
npm run test:all
```

## Test Files Structure

```
makan365/
├── src/
│   ├── App.test.jsx                    # App component tests
│   └── components/
│       ├── CameraUpload.test.jsx       # Camera upload tests
│       ├── LogList.test.jsx            # Log list tests
│       ├── FoodMap.test.jsx            # Food map tests
│       ├── StreakTracker.test.jsx      # Streak tracker tests
│       └── NutritionForm.test.jsx      # Nutrition form tests
├── e2e/
│   ├── app.spec.js                     # E2E app tests
│   ├── camera-upload.spec.js           # E2E camera tests
│   ├── log-list.spec.js                # E2E log list tests
│   ├── streaks.spec.js                 # E2E streaks tests
│   └── food-map.spec.js                # E2E map tests
├── vitest.config.js                    # Vitest configuration
└── playwright.config.js                # Playwright configuration
```

## What Each Test Suite Covers

### Unit Tests (Vitest + React Testing Library)

#### App Component (`App.test.jsx`)
- ✅ App header and navigation tabs rendering
- ✅ Tab switching functionality
- ✅ Active tab highlighting
- ✅ Default tab selection

#### CameraUpload Component (`CameraUpload.test.jsx`)
- ✅ Upload area rendering
- ✅ File input handling
- ✅ Image preview functionality
- ✅ Recent scans display
- ✅ Mock vision service integration

#### LogList Component (`LogList.test.jsx`)
- ✅ Food log display
- ✅ Search functionality
- ✅ Filter by grade
- ✅ Sort by date/grade
- ✅ Empty state handling

#### FoodMap Component (`FoodMap.test.jsx`)
- ✅ Map and places display
- ✅ Search and filtering
- ✅ Filter by place type
- ✅ Loading states

#### StreakTracker Component (`StreakTracker.test.jsx`)
- ✅ Streak calculation
- ✅ Stats display
- ✅ Badges and achievements
- ✅ Activity tracking

#### NutritionForm Component (`NutritionForm.test.jsx`)
- ✅ Form fields rendering
- ✅ Data population
- ✅ Form validation
- ✅ Submit/cancel handling

### E2E Tests (Playwright)

#### App Tests (`app.spec.js`)
- ✅ App loading
- ✅ Navigation between tabs
- ✅ Tab state management
- ✅ Active tab indicators

#### Camera Upload Tests (`camera-upload.spec.js`)
- ✅ Upload interface
- ✅ File handling
- ✅ Recent scans display

#### Log List Tests (`log-list.spec.js`)
- ✅ Log display
- ✅ Search and filtering
- ✅ Sort functionality

#### Streaks Tests (`streaks.spec.js`)
- ✅ Streak tracking UI
- ✅ Stats display
- ✅ Goals and achievements

#### Food Map Tests (`food-map.spec.js`)
- ✅ Map interface
- ✅ Places display
- ✅ Search and filters

## Writing New Tests

### Adding a Unit Test

1. Create a new test file next to your component:
   ```javascript
   // MyComponent.test.jsx
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

### Adding an E2E Test

1. Add a new test file in the `e2e/` directory:
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

## Common Issues and Solutions

### Issue: Tests not running

**Solution**: Make sure all dependencies are installed:
```bash
npm install
npx playwright install chromium
```

### Issue: E2E tests timing out

**Solution**: Increase the timeout in `playwright.config.js`:
```javascript
use: {
  timeout: 60000 // 60 seconds
}
```

### Issue: localStorage not working in tests

**Solution**: Tests use a mocked localStorage. See `src/test/setup.js` for implementation.

## Continuous Integration

To run tests in CI:

```bash
# Run unit tests
npm run test -- --run

# Run E2E tests (headless mode)
npm run test:e2e

# Generate coverage report
npm run test:coverage
```

## Best Practices

1. **Test user interactions**: Use `@testing-library/user-event` for realistic user interactions
2. **Test accessibility**: Use semantic queries like `getByRole` and `getByLabelText`
3. **Keep tests isolated**: Each test should be independent and not rely on others
4. **Test what users see**: Focus on user-visible behavior, not implementation details
5. **Use meaningful names**: Test names should describe what they're testing

## Additional Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## Test Coverage Goals

The project aims for:
- **Unit Test Coverage**: >80% of components
- **E2E Test Coverage**: All critical user flows

Run coverage report to see current status:
```bash
npm run test:coverage
```
