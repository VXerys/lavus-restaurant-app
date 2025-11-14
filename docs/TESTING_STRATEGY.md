# TESTING STRATEGY & QUALITY ASSURANCE FRAMEWORK

**Executive Summary:** Comprehensive testing strategy for the Lavus Restaurant App establishing systematic quality assurance practices across unit, integration, end-to-end, and performance testing layers. This document defines testing tools, coverage targets, automation approaches, and quality gates ensuring production-ready reliability and exceptional user experience.

**Last Updated:** 2025-11-12  
**Document Owner:** QA Lead / Development Team  
**Review Frequency:** Quarterly or when technology stack changes

---

## Strategic Testing Objectives

### Quality Assurance Vision

Our testing strategy is designed to achieve:

1. **Confidence in Deployment:** Enable frequent, low-risk releases through comprehensive automated test coverage
2. **Early Defect Detection:** Shift quality validation left in the development lifecycle, catching issues before code review
3. **Regression Prevention:** Protect existing functionality from unintended breakage through automated regression suites
4. **Performance Baseline:** Establish and maintain performance standards for user experience quality
5. **Accessibility Compliance:** Ensure inclusive design through systematic accessibility testing
6. **Continuous Quality Improvement:** Use test metrics to drive architectural and process improvements

### Testing Pyramid Philosophy

Our testing strategy follows the **Testing Pyramid** principle, emphasizing:

```
           /\
          /  \         E2E Tests (10-15%)
         /____\        - Critical user journeys
        /      \       - Cross-feature integration
       /        \      - Production environment validation
      /__________\
     /            \    Integration Tests (20-30%)
    /              \   - Component interactions
   /________________\  - API contract validation
  /                  \ - State management flows
 /____________________\
/                      \ Unit Tests (55-70%)
/________________________\ - Individual functions
                           - React components (isolated)
                           - Utility modules
                           - Business logic
```

**Rationale:**

- **Unit tests** are fast, isolated, and provide quick feedback during development
- **Integration tests** validate component collaboration without full system complexity
- **E2E tests** provide confidence but are slower and more brittle; used judiciously for critical paths

---

## Testing Layers & Technology Stack

### Comprehensive Testing Architecture

| Testing Layer             | Primary Tools                             | Scope & Focus                                                         | Execution Environment                |
| ------------------------- | ----------------------------------------- | --------------------------------------------------------------------- | ------------------------------------ |
| **Unit Testing**          | Jest + React Testing Library              | Individual components, hooks, utilities in isolation                  | Local development, CI pipeline       |
| **Integration Testing**   | Jest + Mock Service Worker (MSW)          | Component interactions, form submissions, API integration contracts   | Local development, CI pipeline       |
| **Component Testing**     | React Testing Library                     | UI component behavior, user interactions, accessibility               | Local development, CI pipeline       |
| **End-to-End Testing**    | Detox (React Native)                      | Complete user journeys, cross-screen flows, production-like scenarios | Emulators, real devices, CI pipeline |
| **Visual Regression**     | Percy / Chromatic (future)                | UI consistency, design system compliance, responsive layouts          | CI pipeline, pre-release             |
| **Performance Testing**   | React Native Performance Monitor, Flipper | Render performance, memory usage, API latency                         | Development, staging environment     |
| **Accessibility Testing** | eslint-plugin-jsx-a11y, Axe               | Screen reader compatibility, WCAG compliance, keyboard navigation     | Local development, CI pipeline       |
| **Manual Exploratory**    | Human testers                             | Edge cases, usability, real-world scenarios                           | Staging environment, pre-release     |

---

## Coverage Targets & Quality Gates

### Code Coverage Benchmarks

**Overall Project Coverage Goals:**

- **Initial Baseline:** ≥70% line coverage (achievable with moderate effort)
- **Steady-State Target:** ≥75-80% line coverage (sustainable long-term)
- **Branch Coverage:** ≥65% (ensures conditional logic paths tested)
- **Critical Modules:** ≥85-90% (payment, authentication, reservation flows)

**Coverage Measurement Strategy:**

```bash
# Generate coverage report
yarn test --coverage

# View detailed HTML report
open coverage/lcov-report/index.html

# CI enforcement (fail build if below threshold)
yarn test --coverage --coverageThreshold='{"global":{"lines":70,"branches":65}}'
```

**Module-Specific Coverage Requirements:**

| Module Category                    | Minimum Line Coverage | Minimum Branch Coverage | Rationale                                        |
| ---------------------------------- | --------------------- | ----------------------- | ------------------------------------------------ |
| **Authentication & Authorization** | 90%                   | 80%                     | Security-critical; failure impacts user trust    |
| **Payment & Checkout**             | 90%                   | 85%                     | Financial transactions; regulatory compliance    |
| **Reservation System**             | 85%                   | 75%                     | Core business value; high user impact            |
| **Menu Browsing & Search**         | 80%                   | 70%                     | Primary user journey; frequent usage             |
| **Profile Management**             | 75%                   | 65%                     | Standard functionality; moderate risk            |
| **Rewards & Loyalty**              | 80%                   | 70%                     | Business logic complexity; promotional integrity |
| **UI Components (Shared)**         | 80%                   | 70%                     | Reusability requires reliability                 |
| **Utility Functions**              | 95%                   | 90%                     | Pure functions; should be fully testable         |

### Quality Gates for Pull Requests

**Automated Checks (CI/CD Pipeline):**

- [ ] All unit tests pass (0 failures)
- [ ] Integration tests pass (0 failures)
- [ ] Code coverage meets minimum thresholds (70% lines, 65% branches)
- [ ] No decrease in overall coverage compared to target branch
- [ ] Linting passes (ESLint rules satisfied)
- [ ] Type checking passes (TypeScript compilation successful)
- [ ] No high/critical security vulnerabilities (npm audit)
- [ ] Build succeeds for both Android and iOS platforms

**Manual Review Checks:**

- [ ] E2E test scenarios documented for new features
- [ ] Accessibility testing completed for UI changes
- [ ] Edge cases and error scenarios covered in tests

---

## Unit Testing with Jest & React Testing Library

### Jest Configuration & Setup

#### Package Installation

**Required Dependencies:**

```bash
# Core testing libraries
yarn add --dev jest @testing-library/react-native @testing-library/jest-native

# Additional utilities
yarn add --dev @testing-library/react-hooks @testing-library/user-event

# Type definitions
yarn add --dev @types/jest
```

#### Jest Configuration File

Create `jest.config.js` in project root:

```javascript
module.exports = {
  preset: 'react-native',

  // Setup files to run before tests
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // Transform node_modules that need compilation
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-navigation|@react-navigation|@react-native-community|react-native-vector-icons)/)',
  ],

  // Path alias mapping (must match tsconfig.json)
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@screens/(.*)$': '<rootDir>/src/screens/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@store/(.*)$': '<rootDir>/src/store/$1',
    '^@theme/(.*)$': '<rootDir>/src/theme/$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@types/(.*)$': '<rootDir>/src/types/$1',

    // Mock static assets
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },

  // Coverage configuration
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.tsx',
    '!src/**/index.ts',
    '!src/assets/**',
  ],

  coverageThresholds: {
    global: {
      lines: 70,
      branches: 65,
      functions: 70,
      statements: 70,
    },
  },

  // Test match patterns
  testMatch: ['**/__tests__/**/*.test.{ts,tsx}', '**/*.test.{ts,tsx}'],

  // Module file extensions
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
};
```

#### Jest Setup File

Create `jest.setup.js`:

```javascript
import '@testing-library/jest-native/extend-expect';

// Mock React Native modules
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

// Mock react-native-vector-icons
jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');
jest.mock('react-native-vector-icons/FontAwesome', () => 'Icon');

// Suppress console warnings during tests (optional)
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};

// Set default timeout for async operations
jest.setTimeout(10000);
```

#### Package.json Scripts

Add to `package.json`:

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ci": "jest --ci --coverage --maxWorkers=2",
    "test:update-snapshots": "jest --updateSnapshot"
  }
}
```

---

### Unit Test Examples & Best Practices

#### Example 1: Testing UI Component (MenuCard)

**Component Under Test:** `src/components/menu/MenuCard.tsx`

```typescript
// __tests__/components/menu/MenuCard.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import MenuCard from '@components/menu/MenuCard';

describe('MenuCard Component', () => {
  // Test data fixture
  const mockMenuItem = {
    id: '1',
    title: 'Salmon Salad',
    description: 'Fresh Atlantic salmon with mixed greens',
    price: 39,
    rating: 4.5,
    imageUrl: 'https://example.com/salmon.jpg',
    category: 'Main Course',
  };

  const mockOnPress = jest.fn();

  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should display menu item title', () => {
      render(<MenuCard item={mockMenuItem} onPress={mockOnPress} />);

      expect(screen.getByText('Salmon Salad')).toBeTruthy();
    });

    it('should display formatted price', () => {
      render(<MenuCard item={mockMenuItem} onPress={mockOnPress} />);

      expect(screen.getByText('$39.00')).toBeTruthy();
    });

    it('should display rating with star icon', () => {
      render(<MenuCard item={mockMenuItem} onPress={mockOnPress} />);

      expect(screen.getByText('4.5')).toBeTruthy();
      expect(screen.getByTestId('rating-stars')).toBeTruthy();
    });

    it('should render menu item image', () => {
      render(<MenuCard item={mockMenuItem} onPress={mockOnPress} />);

      const image = screen.getByTestId('menu-item-image');
      expect(image.props.source).toEqual({ uri: mockMenuItem.imageUrl });
    });
  });

  describe('Interactions', () => {
    it('should call onPress when card is tapped', () => {
      render(<MenuCard item={mockMenuItem} onPress={mockOnPress} />);

      const card = screen.getByTestId('menu-card');
      fireEvent.press(card);

      expect(mockOnPress).toHaveBeenCalledTimes(1);
      expect(mockOnPress).toHaveBeenCalledWith(mockMenuItem);
    });

    it('should not crash when onPress is undefined', () => {
      render(<MenuCard item={mockMenuItem} />);

      const card = screen.getByTestId('menu-card');
      expect(() => fireEvent.press(card)).not.toThrow();
    });
  });

  describe('Edge Cases', () => {
    it('should handle missing description gracefully', () => {
      const itemWithoutDescription = {
        ...mockMenuItem,
        description: undefined,
      };

      render(<MenuCard item={itemWithoutDescription} onPress={mockOnPress} />);

      expect(screen.queryByTestId('menu-description')).toBeNull();
    });

    it('should display placeholder image when imageUrl is missing', () => {
      const itemWithoutImage = { ...mockMenuItem, imageUrl: undefined };

      render(<MenuCard item={itemWithoutImage} onPress={mockOnPress} />);

      const image = screen.getByTestId('menu-item-image');
      expect(image.props.source).toEqual(
        require('@assets/images/placeholder.png'),
      );
    });

    it('should format price correctly for whole numbers', () => {
      const itemWithWholePrice = { ...mockMenuItem, price: 25 };

      render(<MenuCard item={itemWithWholePrice} onPress={mockOnPress} />);

      expect(screen.getByText('$25.00')).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should have accessible label for screen readers', () => {
      render(<MenuCard item={mockMenuItem} onPress={mockOnPress} />);

      const card = screen.getByTestId('menu-card');
      expect(card.props.accessibilityLabel).toBe(
        'Salmon Salad, $39.00, rated 4.5 stars',
      );
    });

    it('should have accessible role and hint', () => {
      render(<MenuCard item={mockMenuItem} onPress={mockOnPress} />);

      const card = screen.getByTestId('menu-card');
      expect(card.props.accessibilityRole).toBe('button');
      expect(card.props.accessibilityHint).toBe(
        'Tap to view menu item details',
      );
    });
  });

  describe('Snapshot Testing', () => {
    it('should match snapshot', () => {
      const { toJSON } = render(
        <MenuCard item={mockMenuItem} onPress={mockOnPress} />,
      );

      expect(toJSON()).toMatchSnapshot();
    });
  });
});
```

---

#### Example 2: Testing Custom Hook (useFetchMenu)

**Hook Under Test:** `src/hooks/useFetchMenu.ts`

```typescript
// __tests__/hooks/useFetchMenu.test.ts
import { renderHook, waitFor } from '@testing-library/react-native';
import { useFetchMenu } from '@hooks/useFetchMenu';

// Mock global fetch
global.fetch = jest.fn();

describe('useFetchMenu Hook', () => {
  const mockMenuData = [
    { id: '1', title: 'Salmon Salad', price: 39 },
    { id: '2', title: 'Grilled Chicken', price: 28 },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Successful Data Fetching', () => {
    it('should fetch menu data successfully', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockMenuData,
      });

      const { result } = renderHook(() => useFetchMenu());

      // Initial loading state
      expect(result.current.loading).toBe(true);
      expect(result.current.data).toEqual([]);
      expect(result.current.error).toBeNull();

      // Wait for fetch to complete
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      // Verify final state
      expect(result.current.data).toEqual(mockMenuData);
      expect(result.current.error).toBeNull();
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('should call API with correct endpoint', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

      renderHook(() => useFetchMenu());

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          expect.stringContaining('/api/menu'),
          expect.any(Object),
        );
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle network errors gracefully', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(
        new Error('Network request failed'),
      );

      const { result } = renderHook(() => useFetchMenu());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.error).toBe('Network request failed');
      expect(result.current.data).toEqual([]);
    });

    it('should handle HTTP error responses', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      });

      const { result } = renderHook(() => useFetchMenu());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.error).toContain('500');
      expect(result.current.data).toEqual([]);
    });
  });

  describe('Refetch Functionality', () => {
    it('should refetch data when refetch is called', async () => {
      (global.fetch as jest.Mock)
        .mockResolvedValueOnce({ ok: true, json: async () => mockMenuData })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => [mockMenuData[0]],
        });

      const { result } = renderHook(() => useFetchMenu());

      await waitFor(() => expect(result.current.loading).toBe(false));
      expect(result.current.data).toHaveLength(2);

      // Trigger refetch
      result.current.refetch();

      await waitFor(() => {
        expect(result.current.data).toHaveLength(1);
      });

      expect(global.fetch).toHaveBeenCalledTimes(2);
    });
  });
});
```

---

#### Example 3: Testing Utility Function (formatCurrency)

**Utility Under Test:** `src/utils/formatCurrency.ts`

```typescript
// __tests__/utils/formatCurrency.test.ts
import { formatCurrency } from '@utils/formatCurrency';

describe('formatCurrency Utility', () => {
  describe('Standard Formatting', () => {
    it('should format integer prices correctly', () => {
      expect(formatCurrency(25)).toBe('$25.00');
      expect(formatCurrency(100)).toBe('$100.00');
    });

    it('should format decimal prices correctly', () => {
      expect(formatCurrency(25.5)).toBe('$25.50');
      expect(formatCurrency(39.99)).toBe('$39.99');
    });

    it('should handle zero correctly', () => {
      expect(formatCurrency(0)).toBe('$0.00');
    });
  });

  describe('Edge Cases', () => {
    it('should round to two decimal places', () => {
      expect(formatCurrency(25.999)).toBe('$26.00');
      expect(formatCurrency(39.994)).toBe('$39.99');
    });

    it('should handle negative values', () => {
      expect(formatCurrency(-15)).toBe('-$15.00');
    });

    it('should handle very large numbers', () => {
      expect(formatCurrency(1000000)).toBe('$1,000,000.00');
    });

    it('should handle very small numbers', () => {
      expect(formatCurrency(0.01)).toBe('$0.01');
      expect(formatCurrency(0.001)).toBe('$0.00');
    });
  });

  describe('Custom Currency Support', () => {
    it('should support Euro currency', () => {
      expect(formatCurrency(25, 'EUR')).toBe('€25.00');
    });

    it('should support GBP currency', () => {
      expect(formatCurrency(39, 'GBP')).toBe('£39.00');
    });
  });

  describe('Input Validation', () => {
    it('should throw error for non-numeric input', () => {
      expect(() => formatCurrency('invalid' as any)).toThrow();
      expect(() => formatCurrency(NaN)).toThrow();
    });

    it('should throw error for null/undefined', () => {
      expect(() => formatCurrency(null as any)).toThrow();
      expect(() => formatCurrency(undefined as any)).toThrow();
    });
  });
});
```

---

### Testing Best Practices

#### Arrange-Act-Assert Pattern

Structure tests using AAA pattern for clarity:

```typescript
it('should update cart total when item is added', () => {
  // Arrange: Set up test data and initial state
  const initialCart = { items: [], total: 0 };
  const newItem = { id: '1', price: 25 };

  // Act: Perform the action being tested
  const updatedCart = addItemToCart(initialCart, newItem);

  // Assert: Verify the expected outcome
  expect(updatedCart.total).toBe(25);
  expect(updatedCart.items).toHaveLength(1);
});
```

#### Test Naming Conventions

Use descriptive test names following the pattern: "should [expected behavior] when [condition]"

✅ **Good:**

- `should display error message when API call fails`
- `should disable submit button when form is invalid`
- `should navigate to detail screen when menu card is tapped`

❌ **Poor:**

- `test 1`
- `it works`
- `check button`

#### Mock Management

Keep mocks organized and reusable:

```typescript
// Create mock factory functions
const createMockMenuItem = (overrides = {}) => ({
  id: '1',
  title: 'Default Item',
  price: 20,
  ...overrides,
});

// Use in tests
const customItem = createMockMenuItem({ title: 'Custom Item', price: 30 });
```

#### Isolation & Independence

Ensure tests don't depend on each other:

```typescript
describe('UserProfile', () => {
  // Reset state before each test
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset any global state
  });

  it('test 1', () => {
    /* ... */
  });
  it('test 2', () => {
    /* ... */
  }); // Should not depend on test 1
});
```

---

    await act(async () => {});
    expect(result.current.data.length).toBe(1);

});
});

````

## Integrasi Form Reservasi
Test memvalidasi tampilan error ketika jumlah tamu kosong atau tanggal tidak dipilih.

## E2E Dengan Detox (Ringkas)
### Instalasi
```bash
yarn add --dev detox
````

Tambahkan di `package.json`:

```json
{
  "scripts": {
    "e2e:build": "detox build -c android.emu.debug",
    "e2e:test": "detox test -c android.emu.debug"
  }
}
```

Konfigurasi `.detoxrc.json` (contoh sederhana):

```json
{
  "configurations": {
    "android.emu.debug": {
      "type": "android.emulator",
      "device": { "avdName": "Pixel_6_API_34" },
      "app": {
        "binaryPath": "android/app/build/outputs/apk/debug/app-debug.apk",
        "build": "npx react-native build-android"
      }
    }
  }
}
```

Contoh test E2E:

```javascript
// e2e/reservationFlow.test.js
describe('Reservation Flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });
  it('melakukan reservasi sederhana', async () => {
    await element(by.id('reserve-tab')).tap();
    await element(by.id('date-25')).tap();
    await element(by.id('time-18:30')).tap();
    await element(by.id('guest-plus')).multiTap(2); // 2 guests
    await element(by.id('confirm-button')).tap();
    await expect(element(by.text('Confirmation'))).toBeVisible();
  });
});
```

## Strategi Mocking

- Gunakan `jest.fn()` untuk network sederhana.
- Abstraksikan fetch di service agar mudah di-mock.

## Pipeline CI (Contoh GitHub Actions)

`.github/workflows/ci.yml` snippet:

```yaml
name: CI
on: [pull_request]
jobs:
  build-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v4
        with:
          node-version: '<<NODE_LTS_VERSION>>'
      - name: Install deps
        run: yarn install --frozen-lockfile
      - name: Lint
        run: yarn lint
      - name: Type check
        run: yarn typecheck
      - name: Unit tests
        run: yarn test --coverage
```

## Prioritas Penulisan Test (Urutan)

1. Util & hooks murni logic.
2. Komponen UI dengan kondisi (loading/error/empty).
3. Flow kritis (checkout, reservasi) integrasi.
4. Edge case (jaringan gagal, data kosong).

## Anti-Pattern

| Pola Buruk                                    | Dampak            |
| --------------------------------------------- | ----------------- |
| Snapshot berlebihan (seluruh screen kompleks) | Sulit maintenance |
| Mock terlalu dalam (sampai semua library)     | Hilang nilai test |
| Test bergantung urutan global                 | Flaky             |

## Evaluasi Berkala

Per sprint: review file paling sering berubah tanpa test -> tambah test.

## Cara Mengganti Placeholder

`<<NODE_LTS_VERSION>>` ganti dengan versi Node (misal 20). Jika ada `<<API_BASE_URL>>` di service test, isi sesuai environment.

## Related Docs

- `DEFINITION_OF_DONE.md`
- `PATH_ALIASES_SETUP.md`
- `DEVELOPMENT_CHECKLIST.md`
- `QUICK_REFERENCE.md`
