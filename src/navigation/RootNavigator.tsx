import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '@screens/SplashScreen';
import OnboardingScreen from '@screens/OnboardingScreen';
import LoginOptionsScreen from '@screens/LoginOptionsScreen';
import LoginScreen from '@screens/LoginScreen';
import SignUpScreen from '@screens/SignUpScreen';
import HomeScreen from '@screens/HomeScreen';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  LoginOptions: undefined;
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {showSplash ? (
          <Stack.Screen name="Splash">
            {() => <SplashScreen onDone={() => setShowSplash(false)} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Onboarding">
              {({ navigation }) => (
                <OnboardingScreen onDone={() => navigation.replace('LoginOptions')} />
              )}
            </Stack.Screen>
            <Stack.Screen name="LoginOptions">
              {({ navigation }) => (
                <LoginOptionsScreen
                  onBack={() => navigation.navigate('Onboarding')}
                  onLoginNow={() => navigation.replace('Login')}
                  onLoginLater={() => navigation.replace('Home')}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Login">
              {({ navigation }) => (
                <LoginScreen
                  onBack={() => navigation.navigate('LoginOptions')}
                  onGoogleLogin={() => {
                    // TODO: Implement Google Login
                    console.log('Google Login pressed');
                  }}
                  onLogin={() => navigation.replace('Home')}
                  onSignUp={() => navigation.navigate('SignUp')}
                  onForgotPassword={() => {
                    // TODO: Navigate to Forgot Password screen
                    console.log('Forgot password pressed');
                  }}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="SignUp">
              {({ navigation }) => (
                <SignUpScreen
                  onBack={() => navigation.navigate('Login')}
                  onSignUp={() => navigation.replace('Home')}
                  onSignIn={() => navigation.navigate('Login')}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Home">
              {({ navigation }) => (
                <HomeScreen
                  onLoginPress={() => navigation.navigate('LoginOptions')}
                />
              )}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
