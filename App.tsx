/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useEffect } from 'react';
import { StatusBar, useColorScheme, LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from '@navigation/RootNavigator';
import { AuthProvider } from './src/contexts/AuthContext';
import { configureGoogleSignIn } from './src/services/authService';

// Ignore Firebase v8 deprecation warnings
LogBox.ignoreLogs(['v8 method is deprecated']);

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    // Initialize Google Sign-In
    configureGoogleSignIn();
    
    // 🧪 STEP 1: Test Firestore Connection First
    // Uncomment this to test your Firestore setup:
    
    // 🔥 STEP 2: Upload sample data (RUN ONCE!)
    // After test passes, comment test above and uncomment this:
  }, []);

  return (
    <AuthProvider>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <AppContent />
      </SafeAreaProvider>
    </AuthProvider>
  );
}

function AppContent() {
  return <RootNavigator />;
}

// no styles needed here

export default App;
