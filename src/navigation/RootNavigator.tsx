import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen, OnboardingScreen } from '@screens/onboarding';
import { LoginOptionsScreen, LoginScreen, SignUpScreen, EmailVerificationScreen } from '@screens/auth';
import { MenuDetailScreen, ReviewsScreen } from '@screens/home';
import { HotDealDetailScreen } from '@screens/hot-deal';
import { RewardsDetailScreen, RewardConfirmationScreen, RedeemSuccessScreen } from '@screens/rewards';
import { ConfirmationScreen, WellDoneScreen } from '@screens/reserve';
import { ScanFlowScreen } from '@screens/scan';
import { SettingsScreen } from '@screens/settings';
import MainTabs from '@navigation/MainTabs';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  LoginOptions: undefined;
  Login: undefined;
  SignUp: undefined;
  EmailVerification: { email: string };
  Main: { initialTab?: 'home' | 'hotDeal' | 'scan' | 'rewards' | 'reserve' } | undefined;
  Settings: undefined;
  MenuDetail: { menuId: string };
  Reviews: { menuId: string };
  HotDealDetail: { dealId: string };
  Scan: undefined;
  RewardsDetail: undefined;
  RewardConfirmation: { rewardId: string };
  RedeemSuccess: { redeemNumber: string };
  ReservationConfirmation: { guests: number; date: string; time: string };
  ReservationWellDone: undefined;
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
                  onLoginLater={() => navigation.replace('Main')}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Login">
              {({ navigation }) => (
                <LoginScreen
                  onBack={() => navigation.navigate('LoginOptions')}
                  onLoginSuccess={() => navigation.replace('Main')}
                  onSignUp={() => navigation.navigate('SignUp')}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="SignUp">
              {({ navigation }) => (
                <SignUpScreen
                  onBack={() => navigation.navigate('Login')}
                  onSignUpSuccess={(email) => navigation.replace('EmailVerification', { email })}
                  onSignIn={() => navigation.navigate('Login')}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="EmailVerification">
              {({ navigation, route }) => (
                <EmailVerificationScreen
                  email={route.params.email}
                  onVerified={() => navigation.replace('Main')}
                  onBack={() => navigation.replace('LoginOptions')}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Main">
              {({ navigation, route }) => (
                <MainTabs
                  onLoginPress={() => navigation.navigate('LoginOptions')}
                  navigation={navigation}
                  initialTab={route.params?.initialTab}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Settings">
              {({ navigation }) => (
                <SettingsScreen
                  navigation={navigation}
                  onBack={() => navigation.goBack()}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="MenuDetail">
              {({ navigation, route }) => (
                <MenuDetailScreen
                  onBack={() => navigation.goBack()}
                  onReserve={() => navigation.navigate('Main', { initialTab: 'reserve' })}
                  menuId={route.params.menuId}
                  navigation={navigation}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Reviews">
              {({ navigation }) => (
                <ReviewsScreen
                  onBack={() => navigation.goBack()}
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
            <Stack.Screen name="ReservationConfirmation">
              {({ navigation, route }) => (
                <ConfirmationScreen
                  onBack={() => navigation.goBack()}
                  onConfirm={() => {
                    navigation.navigate('ReservationWellDone');
                  }}
                  guests={route.params.guests}
                  date={new Date(route.params.date)}
                  time={new Date(route.params.time)}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="ReservationWellDone">
              {({ navigation }) => (
                <WellDoneScreen
                  onBack={() => navigation.goBack()}
                  onSetReminder={() => {
                    // TODO: Implement Set Reminder functionality
                    console.log('Set reminder pressed');
                  }}
                  onGoHome={() => {
                    navigation.navigate('Main', { initialTab: 'home' });
                  }}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Scan">
              {({ navigation }) => (
                <ScanFlowScreen
                  onBack={() => navigation.goBack()}
                  onComplete={() => {
                    console.log('Payment completed');
                    navigation.navigate('Main', { initialTab: 'home' });
                  }}
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
