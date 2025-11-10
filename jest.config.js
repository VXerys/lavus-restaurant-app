module.exports = {
  preset: 'react-native',
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@screens/(.*)$': '<rootDir>/src/screens/$1',
    '^@navigation/(.*)$': '<rootDir>/src/navigation/$1',
  '^@theme$': '<rootDir>/src/theme/index.ts',
  '^@theme/(.*)$': '<rootDir>/src/theme/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@store/(.*)$': '<rootDir>/src/store/$1',
    '^@assets$': '<rootDir>/src/assets/index.ts',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@types$': '<rootDir>/src/types/index.ts',
    '^@types/(.*)$': '<rootDir>/src/types/$1'
  }
};
