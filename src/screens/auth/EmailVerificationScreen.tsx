import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText, Button } from '@components';
import { Images } from '@assets';
import { Colors, Spacing, Radius } from '@theme/tokens';
import { moderateScale, scaleFontSize, getButtonWidth } from '@utils/responsive';
import { resendVerificationEmail, checkEmailVerified, signOut } from '../../services/authService';

interface Props {
  email: string;
  onVerified?: () => void;
  onBack?: () => void;
}

const EmailVerificationScreen: React.FC<Props> = ({ email, onVerified, onBack }) => {
  const [isChecking, setIsChecking] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    // Auto check verification every 3 seconds
    const interval = setInterval(async () => {
      const verified = await checkEmailVerified();
      if (verified && onVerified) {
        onVerified();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [onVerified]);

  useEffect(() => {
    // Countdown timer for resend button
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setResendDisabled(false);
    }
  }, [countdown]);

  const handleCheckVerification = async () => {
    setIsChecking(true);
    try {
      const verified = await checkEmailVerified();
      if (verified) {
        if (onVerified) {
          onVerified();
        }
      } else {
        Alert.alert('Not Verified Yet', 'Please check your inbox and click the verification link.');
      }
    } catch (error: any) {
      Alert.alert('Error', 'Error checking verification: ' + error.message);
    } finally {
      setIsChecking(false);
    }
  };

  const handleResendEmail = async () => {
    setResendLoading(true);
    try {
      await resendVerificationEmail();
      Alert.alert('Email Sent', 'Verification email sent! Please check your inbox.');
      setResendDisabled(true);
      setCountdown(60); // 60 seconds cooldown
    } catch (error: any) {
      Alert.alert('Error', 'Failed to resend email: ' + error.message);
    } finally {
      setResendLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      if (onBack) {
        onBack();
      }
    } catch (error: any) {
      Alert.alert('Error', 'Error signing out: ' + error.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image source={Images.logo} style={styles.logo} />
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Icon */}
          <View style={styles.iconContainer}>
            <AppText style={styles.icon}>📧</AppText>
          </View>

          {/* Title */}
          <AppText weight="serifTitle" style={styles.title}>
            Verify Your Email
          </AppText>

          {/* Description */}
          <AppText weight="regular" style={styles.description}>
            We've sent a verification link to
          </AppText>
          <AppText weight="semiBold" style={styles.email}>
            {email}
          </AppText>
          <AppText weight="regular" style={styles.description}>
            Please check your inbox and click the link to verify your account.
          </AppText>

          {/* Instructions */}
          <View style={styles.instructionsContainer}>
            <AppText weight="regular" style={styles.instructionText}>
              • Check your spam folder if you don't see the email
            </AppText>
            <AppText weight="regular" style={styles.instructionText}>
              • The link will expire in 24 hours
            </AppText>
            <AppText weight="regular" style={styles.instructionText}>
              • Click "I've Verified" after clicking the link
            </AppText>
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <Button
              title={isChecking ? "Checking..." : "I've Verified"}
              variant="primary"
              width={getButtonWidth(0.85)}
              onPress={handleCheckVerification}
              disabled={isChecking}
            />

            <Button
              title={resendDisabled ? `Resend in ${countdown}s` : resendLoading ? "Sending..." : "Resend Email"}
              variant="outline"
              width={getButtonWidth(0.85)}
              onPress={handleResendEmail}
              disabled={resendLoading || resendDisabled}
              style={styles.resendButton}
            />
          </View>

          {/* Sign Out Link */}
          <Pressable onPress={handleSignOut} style={styles.signOutContainer}>
            <AppText weight="regular" style={styles.signOutText}>
              Wrong email? Sign out
            </AppText>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  logoContainer: {
    alignItems: 'center',
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.md,
  },
  logo: {
    width: moderateScale(120),
    height: moderateScale(120),
    resizeMode: 'contain',
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    alignItems: 'center',
  },
  iconContainer: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(50),
    backgroundColor: Colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  icon: {
    fontSize: scaleFontSize(50),
  },
  title: {
    fontSize: scaleFontSize(28),
    color: Colors.black,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  description: {
    fontSize: scaleFontSize(15),
    color: Colors.muted,
    textAlign: 'center',
    lineHeight: scaleFontSize(22),
  },
  email: {
    fontSize: scaleFontSize(16),
    color: Colors.black,
    textAlign: 'center',
    marginVertical: Spacing.sm,
  },
  instructionsContainer: {
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    padding: Spacing.lg,
    marginTop: Spacing.xl,
    marginBottom: Spacing.xl,
    width: '100%',
  },
  instructionText: {
    fontSize: scaleFontSize(14),
    color: Colors.text,
    lineHeight: scaleFontSize(24),
    marginBottom: Spacing.xs,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    gap: Spacing.md,
  },
  resendButton: {
    marginTop: Spacing.sm,
  },
  signOutContainer: {
    marginTop: Spacing.xl,
    padding: Spacing.sm,
  },
  signOutText: {
    fontSize: scaleFontSize(14),
    color: Colors.muted,
    textDecorationLine: 'underline',
  },
});

export default EmailVerificationScreen;
