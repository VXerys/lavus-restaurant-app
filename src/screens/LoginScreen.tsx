import React, { useState } from 'react';
import { View, StyleSheet, Image, TextInput, Pressable, Animated, ScrollView } from 'react-native';
import AppText from '@components/AppText';
import Button from '@components/Button';
import { Images } from '@assets';
import { Colors, Spacing, Radius } from '@theme/tokens';
import { 
  screenWidth, 
  scaleFontSize, 
  moderateScale, 
  getButtonWidth,
  scaleHeight,
  isSmallDevice 
} from '@utils/responsive';

interface Props {
  onBack?: () => void;
  onGoogleLogin?: () => void;
  onLogin?: () => void;
  onSignUp?: () => void;
  onForgotPassword?: () => void;
}

const LoginScreen: React.FC<Props> = ({ onBack, onGoogleLogin, onLogin, onSignUp, onForgotPassword }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const scaleAnim = new Animated.Value(1);

  const handleBackPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.85,
      useNativeDriver: true,
    }).start();
  };

  const handleBackPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      {/* Black Header with Logo */}
      <View style={styles.header}>
        {/* Back Button */}
        <Pressable
          style={styles.backButton}
          onPress={onBack}
          onPressIn={handleBackPressIn}
          onPressOut={handleBackPressOut}
        >
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <AppText weight="semiBold" style={styles.backText}>‹</AppText>
          </Animated.View>
        </Pressable>

        {/* Logo */}
        <Image source={Images.logo} style={styles.logo} />
      </View>

      {/* White Content Container with Curve */}
      <ScrollView 
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.formContainer}>
          {/* Title */}
          <AppText weight="serifTitle" style={styles.title}>Login</AppText>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <AppText weight="regular" style={styles.inputLabel}>Email</AppText>
            <TextInput
              style={styles.input}
              placeholder="lavus@gmail.com"
              placeholderTextColor={Colors.muted}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <AppText weight="regular" style={styles.inputLabel}>Password</AppText>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor={Colors.muted}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          {/* Forgot Password */}
          <Pressable onPress={onForgotPassword} style={styles.forgotContainer}>
            <AppText weight="regular" style={styles.forgotText}>Forgot password?</AppText>
          </Pressable>

          {/* Google Login Button */}
          <Pressable style={styles.googleButton} onPress={onGoogleLogin}>
            <Image 
              source={{ uri: 'https://www.google.com/favicon.ico' }}
              style={styles.googleIcon}
            />
            <AppText weight="medium" style={styles.googleText}>Continue with Google</AppText>
          </Pressable>

          {/* Login Button */}
          <Button
            title="Login Now"
            variant="primary"
            width={getButtonWidth(0.85)}
            onPress={onLogin}
            style={styles.loginButton}
          />

          {/* Sign Up Link */}
          <View style={styles.signupContainer}>
            <AppText weight="regular" style={styles.signupText}>
              Don't have any account?{' '}
            </AppText>
            <Pressable onPress={onSignUp}>
              <AppText weight="semiBold" style={styles.signupLink}>Sign up</AppText>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  header: {
    height: isSmallDevice ? scaleHeight(220) : scaleHeight(260),
    minHeight: 220,
    maxHeight: 300,
    backgroundColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: moderateScale(Spacing.xl),
  },
  backButton: {
    position: 'absolute',
    top: moderateScale(Spacing.xl),
    left: moderateScale(Spacing.lg),
    width: moderateScale(44),
    height: moderateScale(44),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  backText: {
    fontSize: scaleFontSize(48),
    color: Colors.white,
    lineHeight: scaleFontSize(48),
  },
  logo: {
    width: isSmallDevice ? screenWidth * 0.35 : screenWidth * 0.4,
    height: isSmallDevice ? scaleHeight(150) : scaleHeight(180),
    maxWidth: 180,
    maxHeight: 220,
    resizeMode: 'contain',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: moderateScale(70),
    borderTopRightRadius: 0,
    marginTop: moderateScale(-20),
  },
  formContainer: {
    paddingHorizontal: moderateScale(Spacing.xl + Spacing.sm),
    paddingTop: moderateScale(Spacing.xxl),
    paddingBottom: moderateScale(Spacing.xxl * 2),
  },
  title: {
    fontSize: scaleFontSize(36),
    color: Colors.black,
    textAlign: 'center',
    marginBottom: moderateScale(Spacing.xxl),
  },
  inputContainer: {
    marginBottom: moderateScale(Spacing.lg),
  },
  inputLabel: {
    fontSize: scaleFontSize(16),
    color: Colors.black,
    marginBottom: moderateScale(Spacing.sm),
  },
  input: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: Radius.md,
    paddingVertical: moderateScale(Spacing.lg),
    paddingHorizontal: moderateScale(Spacing.lg),
    fontSize: scaleFontSize(16),
    color: Colors.text,
    fontFamily: 'OpenSans-Regular',
    minHeight: moderateScale(54),
  },
  forgotContainer: {
    alignItems: 'flex-end',
    marginBottom: moderateScale(Spacing.xl),
  },
  forgotText: {
    fontSize: scaleFontSize(14),
    color: Colors.black,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: '#E5E5E5',
    borderRadius: Radius.md,
    paddingVertical: moderateScale(Spacing.lg),
    marginBottom: moderateScale(Spacing.lg),
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
    minHeight: moderateScale(54),
  },
  googleIcon: {
    width: moderateScale(24),
    height: moderateScale(24),
    marginRight: moderateScale(Spacing.md),
  },
  googleText: {
    fontSize: scaleFontSize(16),
    color: Colors.text,
  },
  loginButton: {
    alignSelf: 'center',
    marginTop: moderateScale(Spacing.sm),
    marginBottom: moderateScale(Spacing.xl),
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupText: {
    fontSize: scaleFontSize(15),
    color: Colors.text,
  },
  signupLink: {
    fontSize: scaleFontSize(15),
    color: Colors.black,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
