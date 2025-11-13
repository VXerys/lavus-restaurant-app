/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from '@navigation/RootNavigator';
import { AuthProvider } from './src/contexts/AuthContext';
import { configureGoogleSignIn } from './src/services/authService';
import { uploadSampleData } from './src/utils/uploadFirestoreData';
import { testFirestoreConnection } from './src/utils/testFirestore';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    // Initialize Google Sign-In
    configureGoogleSignIn();
    
    // 🧪 STEP 1: Test Firestore Connection First
    // Uncomment this to test your Firestore setup:
    // testFirestoreConnection();
    
    // 🔥 STEP 2: Upload sample data (RUN ONCE!)
    // After test passes, comment test above and uncomment this:
    uploadSampleData();
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
