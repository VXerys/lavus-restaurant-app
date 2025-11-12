import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Pressable,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppText } from '@components';
import { RewardImages } from '@assets';
import { Colors, Spacing } from '@theme/tokens';
import { scaleFontSize, moderateScale } from '@utils/responsive';

type RootStackParamList = {
  RedeemSuccess: { redeemNumber: string };
  Home: undefined;
  // ... other screens
};

type Props = NativeStackScreenProps<RootStackParamList, 'RedeemSuccess'>;

const RedeemSuccessScreen: React.FC<Props> = ({ navigation, route }) => {
  const { redeemNumber } = route.params;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handleGoHome = () => {
    // Navigate back to Home (MainTabs)
    // Clear the navigation stack and go to Home
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' as any }],
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.content}>
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <Image 
            source={RewardImages.redeemCompleted} 
            style={styles.successIcon}
            resizeMode="contain"
          />
        </View>

        {/* Success Title */}
        <AppText weight="serifTitle" style={styles.title}>
          Redeem Completed!
        </AppText>

        {/* Redeem Number */}
        <AppText weight="regular" style={styles.redeemNumber}>
          Redeem number: #{redeemNumber}
        </AppText>

        {/* Message */}
        <AppText weight="serifTitle" style={styles.message}>
          Hope you have great moments with Lavu's restaurant!
        </AppText>

        {/* Go Home Button */}
        <View style={styles.buttonContainer}>
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <Pressable 
              style={styles.homeButton}
              onPress={handleGoHome}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
            >
              <AppText weight="regular" style={styles.homeButtonText}>
                Go Home
              </AppText>
            </Pressable>
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
  },
  iconContainer: {
    marginBottom: moderateScale(40),
  },
  successIcon: {
    width: moderateScale(180),
    height: moderateScale(180),
  },
  title: {
    fontSize: scaleFontSize(36),
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: moderateScale(16),
    fontWeight: '400',
  },
  redeemNumber: {
    fontSize: scaleFontSize(16),
    color: Colors.muted,
    textAlign: 'center',
    marginBottom: moderateScale(48),
    fontWeight: '300',
  },
  message: {
    fontSize: scaleFontSize(24),
    color: Colors.black,
    textAlign: 'center',
    lineHeight: scaleFontSize(32),
    marginBottom: moderateScale(80),
    paddingHorizontal: Spacing.md,
    fontWeight: '300',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: moderateScale(280),
  },
  homeButton: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.black,
    borderRadius: moderateScale(12),
    paddingVertical: moderateScale(16),
    paddingHorizontal: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeButtonText: {
    fontSize: scaleFontSize(18),
    color: Colors.black,
    fontWeight: '400',
  },
});

export default RedeemSuccessScreen;
