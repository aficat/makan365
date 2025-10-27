# 🧪 How to Run Tests for Makan365

## Quick Commands

### Run All Unit Tests (59 tests)
```bash
npm run test
```

### Run Unit Tests Once (without watch mode)
```bash
npm run test -- --run
```

### Run Tests with Visual UI
```bash
npm run test:ui
```

### Run E2E Tests (Playwright)
```bash
npm run test:e2e
```

### Run E2E Tests with Interactive UI
```bash
npm run test:e2e:ui
```

### Run ALL Tests (Unit + E2E)
```bash
npm run test:all
```

## Current Test Results

✅ **59 Unit Tests - ALL PASSING** 🎉

```
✓ App Component Tests: 8 tests
✓ CameraUpload Tests: 9 tests
✓ LogList Tests: 9 tests
✓ FoodMap Tests: 8 tests
✓ StreakTracker Tests: 13 tests
✓ NutritionForm Tests: 12 tests
```

## Test Coverage

All major features are tested:
- ✅ App navigation and tab switching
- ✅ Camera upload and file handling
- ✅ Food log search and filtering
- ✅ Streak tracking and achievements
- ✅ Food map search and filters
- ✅ Nutrition form validation

## Documentation

- **`TEST_GUIDE.md`** - Complete testing documentation
- **`QUICK_TEST_GUIDE.md`** - Quick reference guide

## Need Help?

Run a specific test file:
```bash
npm run test App.test.jsx
```

View test coverage:
```bash
npm run test:coverage
```
