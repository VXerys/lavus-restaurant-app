import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Pressable, Dimensions, Animated, ScrollView } from 'react-native';
import AppText from '@components/AppText';
import Button from '@components/Button';
import { Colors, Spacing, Radius } from '@theme/tokens';

const { height } = Dimensions.get('window');

interface Props {
  onBack?: () => void;
  onSignUp?: () => void;
  onSignIn?: () => void;
}

const SignUpScreen: React.FC<Props> = ({ onBack, onSignUp, onSignIn }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
      {/* Black Header */}
      <View style={styles.header}>
        {/* Back Button */}
        <Pressable
          style={styles.backButton}
          onPress={onBack}
          onPressIn={handleBackPressIn}
          onPressOut={handleBackPressOut}
        >
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <AppText style={styles.backButtonText}>‹</AppText>
          </Animated.View>
        </Pressable>

        {/* Sign Up Title */}
        <AppText weight="serifTitle" style={styles.title}>Sign Up</AppText>
      </View>

      {/* White Curved Container */}
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Full Name Input */}
        <View style={styles.inputContainer}>
          <AppText style={styles.label}>Full name</AppText>
          <TextInput
            style={styles.input}
            placeholder="Quang Nhan Vuong"
            placeholderTextColor={Colors.muted}
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
          />
        </View>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <AppText style={styles.label}>Email</AppText>
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
          <AppText style={styles.label}>Password</AppText>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor={Colors.muted}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {/* Confirm Password Input */}
        <View style={styles.inputContainer}>
          <AppText style={styles.label}>Confirm password</AppText>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor={Colors.muted}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>

        {/* Sign Up Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="Sign Up"
            variant="primary"
            size="large"
            onPress={onSignUp}
            width="100%"
          />
        </View>

        {/* Sign In Link */}
        <View style={styles.signInContainer}>
          <AppText style={styles.signInText}>Already have any account? </AppText>
          <Pressable onPress={onSignIn}>
            <AppText style={styles.signInLink}>Sign in</AppText>
          </Pressable>
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
    height: height * 0.24,
    backgroundColor: Colors.black,
    paddingTop: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: Spacing.xl,
    left: Spacing.lg,
    zIndex: 10,
    padding: Spacing.xs,
  },
  backButtonText: {
    fontSize: 48,
    color: Colors.white,
    fontWeight: 'bold',
    lineHeight: 48,
  },
  title: {
    fontSize: 40,
    color: Colors.primary,
    marginTop: Spacing.md,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 70,
    borderTopRightRadius: 0,
  },
  contentContainer: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.xxl * 2,
  },
  inputContainer: {
    marginBottom: Spacing.lg,
  },
  label: {
    fontSize: 16,
    color: Colors.black,
    marginBottom: Spacing.xs,
    fontWeight: '500',
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    fontSize: 16,
    color: Colors.black,
    backgroundColor: Colors.white,
  },
  buttonContainer: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  signInText: {
    fontSize: 14,
    color: Colors.black,
  },
  signInLink: {
    fontSize: 14,
    color: Colors.black,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default SignUpScreen;
