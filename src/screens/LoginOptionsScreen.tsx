import React from 'react';
import { View, Image, StyleSheet, Dimensions, Pressable, Animated } from 'react-native';
import { Images } from '@assets';
import Button from '@components/Button';
import AppText from '@components/AppText';
import { Colors, Spacing } from '@theme/tokens';

const { width } = Dimensions.get('window');

interface Props {
  onLoginNow?: () => void;
  onLoginLater?: () => void;
  onBack?: () => void;
}

const LoginOptionsScreen: React.FC<Props> = ({ onLoginNow, onLoginLater, onBack }) => {
  const scaleAnim = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.85,
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

  return (
    <View style={styles.container}>
      {/* Back Button with Animation */}
      <Pressable
        style={styles.backButton}
        onPress={onBack}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <AppText weight="semiBold" style={styles.backText}>‹</AppText>
        </Animated.View>
      </Pressable>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image source={Images.logo} style={styles.logo} />
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          title="Login Now"
          variant="primary"
          width={width * 0.8}
          onPress={onLoginNow}
        />
        <Button
          title="Login Later"
          variant="outline"
          width={width * 0.8}
          onPress={onLoginLater}
          style={styles.buttonSpacing}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.xl,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.xl,
    marginLeft: Spacing.sm,
  },
  backText: {
    fontSize: 48,
    color: Colors.black,
    lineHeight: 48,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 250,
    resizeMode: 'contain',
  },
  buttonContainer: {
    alignItems: 'center',
    paddingBottom: Spacing.xxl * 2,
    gap: Spacing.lg,
  },
  buttonSpacing: {
    marginTop: 0,
  },
});

export default LoginOptionsScreen;
