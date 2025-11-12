import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
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

interface PaymentCompletedScreenProps {
  paymentNumber?: string;
  onReviewNow?: () => void;
  onGoHome?: () => void;
}

const PaymentCompletedScreen: React.FC<PaymentCompletedScreenProps> = ({
  paymentNumber = '#9876543',
  onReviewNow,
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
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Icon with Animation */}
        <Animated.View 
          style={[
            styles.iconContainer,
            {
              opacity: fadeAnim,
              transform: [
                { scale: scaleAnim },
                { translateY: slideAnim },
              ],
            },
          ]}
        >
          <Image
            source={require('@assets/images/scan/pay-completed.png')}
            style={styles.icon}
            resizeMode="contain"
          />
        </Animated.View>

        {/* Title */}
        <View style={styles.titleContainer}>
          <AppText weight="serifTitle" style={styles.title}>
            Payment Completed!
          </AppText>
        </View>

        {/* Payment Number */}
        <View style={styles.paymentNumberContainer}>
          <AppText weight="regular" style={styles.paymentNumber}>
            Payment number: {paymentNumber}
          </AppText>
        </View>

        {/* Message */}
        <View style={styles.messageContainer}>
          <AppText weight="serifTitle" style={styles.messageText}>
            Hope you are happy with your purchase!{'\n'}
            Thank you for being a valued Lavu's{'\n'}
            customer!
          </AppText>
        </View>

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <Button
            title="Review Now"
            variant="primary"
            width={getButtonWidth(0.65)}
            onPress={onReviewNow}
          />
          <View style={styles.buttonSpacing} />
          <Button
            title="Go Home"
            variant="outline"
            width={getButtonWidth(0.65)}
            onPress={onGoHome}
          />
        </View>
      </ScrollView>
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
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: moderateScale(Spacing.xl),
    paddingTop: moderateScale(Spacing.xxl),
    paddingBottom: moderateScale(Spacing.xl),
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: moderateScale(Spacing.xl),
    alignItems: 'center',
  },
  icon: {
    width: moderateScale(140),
    height: moderateScale(140),
  },
  titleContainer: {
    marginBottom: moderateScale(Spacing.sm),
  },
  title: {
    fontSize: scaleFontSize(28),
    color: Colors.primary,
    textAlign: 'center',
  },
  paymentNumberContainer: {
    marginBottom: moderateScale(Spacing.xxl),
  },
  paymentNumber: {
    fontSize: scaleFontSize(14),
    color: Colors.muted,
    textAlign: 'center',
  },
  messageContainer: {
    marginBottom: moderateScale(Spacing.xxl),
    paddingHorizontal: moderateScale(Spacing.sm),
  },
  messageText: {
    fontSize: scaleFontSize(18),
    color: Colors.black,
    textAlign: 'center',
    lineHeight: scaleFontSize(27),
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: moderateScale(Spacing.lg),
  },
  buttonSpacing: {
    height: moderateScale(Spacing.md),
  },
});

export default PaymentCompletedScreen;
