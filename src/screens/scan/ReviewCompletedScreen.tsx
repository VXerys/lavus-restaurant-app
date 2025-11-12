import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppText from '@components/common/AppText';
import Button from '@components/common/Button';
import { Colors, Spacing } from '@theme/tokens';
import {
  scaleFontSize,
  moderateScale,
  getButtonWidth,
} from '@utils/responsive';

interface ReviewCompletedScreenProps {
  onGoHome?: () => void;
}

const ReviewCompletedScreen: React.FC<ReviewCompletedScreenProps> = ({
  onGoHome,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    // Animation sequence when screen loads
    Animated.parallel([
      // Fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      // Scale up with bounce
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
      // Slide up
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim, slideAnim]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.container}>
        {/* Logo with animation */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Image
            source={require('@assets/images/scan/pay-completed.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>

        {/* Success Title */}
        <Animated.View
          style={[
            styles.titleContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <AppText weight="serifTitle" style={styles.title}>
            Review Completed!
          </AppText>
        </Animated.View>

        {/* Message */}
        <Animated.View
          style={[
            styles.messageContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <AppText weight="serifTitle" style={styles.message}>
            Hope you are happy with your purchase!{'\n'}
            Thank you for being a valued Lavu's{'\n'}
            customer!
          </AppText>
        </Animated.View>

        {/* Spacer to push button to bottom */}
        <View style={styles.spacer} />

        {/* Go Home Button */}
        <Animated.View
          style={[
            styles.buttonContainer,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <Button
            title="Go Home"
            variant="outline"
            width={getButtonWidth(0.5)}
            onPress={onGoHome}
          />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: moderateScale(Spacing.xl),
    paddingTop: moderateScale(Spacing.xl),
    paddingBottom: moderateScale(Spacing.lg),
    alignItems: 'center',
  },
  logoContainer: {
    marginTop: moderateScale(Spacing.xxl),
    marginBottom: moderateScale(Spacing.lg),
  },
  logo: {
    width: moderateScale(150),
    height: moderateScale(150),
  },
  titleContainer: {
    marginTop: moderateScale(Spacing.md),
    marginBottom: moderateScale(Spacing.md),
  },
  title: {
    fontSize: scaleFontSize(26),
    color: Colors.primary,
    textAlign: 'center',
    lineHeight: scaleFontSize(32),
  },
  messageContainer: {
    marginTop: moderateScale(Spacing.md),
    paddingHorizontal: moderateScale(Spacing.md),
  },
  message: {
    fontSize: scaleFontSize(16),
    color: Colors.black,
    textAlign: 'center',
    lineHeight: scaleFontSize(24),
  },
  spacer: {
    height: moderateScale(250),
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: moderateScale(Spacing.xxl),
    marginBottom: moderateScale(Spacing.xl),
  },
});

export default ReviewCompletedScreen;
