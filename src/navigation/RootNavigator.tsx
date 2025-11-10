import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '@screens/SplashScreen';
import OnboardingScreen from '@screens/OnboardingScreen';
import { View } from 'react-native';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  HomePlaceholder: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomePlaceholder = () => <View />; // will be replaced later

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
                <OnboardingScreen onDone={() => navigation.replace('HomePlaceholder')} />
              )}
            </Stack.Screen>
            <Stack.Screen name="HomePlaceholder" component={HomePlaceholder} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
