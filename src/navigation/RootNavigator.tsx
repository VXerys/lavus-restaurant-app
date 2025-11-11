import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '@screens/SplashScreen';
import OnboardingScreen from '@screens/OnboardingScreen';
import LoginOptionsScreen from '@screens/LoginOptionsScreen';
import LoginScreen from '@screens/LoginScreen';
import SignUpScreen from '@screens/SignUpScreen';
import MainTabs from '@navigation/MainTabs';
import MenuDetailScreen from '@screens/MenuDetailScreen';
import HotDealDetailScreen from '@screens/HotDealDetailScreen';
import RewardsDetailScreen from '@screens/RewardsDetailScreen';
import RewardConfirmationScreen from '@screens/RewardConfirmationScreen';
import RedeemSuccessScreen from '@screens/RedeemSuccessScreen';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  LoginOptions: undefined;
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
  MenuDetail: { menuId: string };
  HotDealDetail: { dealId: string };
  RewardsDetail: undefined;
  RewardConfirmation: { rewardId: string };
  RedeemSuccess: { redeemNumber: string };
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
                <MainTabs
                  onLoginPress={() => navigation.navigate('LoginOptions')}
                  navigation={navigation}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="MenuDetail">
              {({ navigation, route }) => (
                <MenuDetailScreen
                  onBack={() => navigation.goBack()}
                  onReserve={() => {
                    // TODO: Navigate to reservation screen
                    console.log('Reserve pressed');
                  }}
                  menuId={route.params.menuId}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="HotDealDetail">
              {({ navigation, route }) => (
                <HotDealDetailScreen
                  onBack={() => navigation.goBack()}
                  dealId={route.params.dealId}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="RewardsDetail">
              {({ navigation }) => (
                <RewardsDetailScreen navigation={navigation} route={{ params: {} } as any} />
              )}
            </Stack.Screen>
            <Stack.Screen name="RewardConfirmation">
              {({ navigation, route }) => (
                <RewardConfirmationScreen 
                  navigation={navigation} 
                  route={route as any} 
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="RedeemSuccess">
              {({ navigation, route }) => (
                <RedeemSuccessScreen 
                  navigation={navigation} 
                  route={route as any} 
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
