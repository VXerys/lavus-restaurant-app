import React from 'react';
import { View, Image, StyleSheet, Pressable, Animated } from 'react-native';
import { Images, NavigationIcons } from '@assets';
import Button from '@components/Button';
import { Colors, Spacing } from '@theme/tokens';
import { 
  screenWidth, 
  moderateScale, 
  getButtonWidth,
  scaleHeight,
  isSmallDevice 
} from '@utils/responsive';

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
          <Image source={NavigationIcons.back} style={styles.backIcon} />
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
          width={getButtonWidth(0.85)}
          onPress={onLoginNow}
        />
        <Button
          title="Login Later"
          variant="outline"
          width={getButtonWidth(0.85)}
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
    paddingHorizontal: moderateScale(Spacing.xl),
  },
  backButton: {
    width: moderateScale(15),
    height: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: moderateScale(Spacing.xl),
    marginLeft: moderateScale(Spacing.sm),
  },
  backIcon: {
    width: moderateScale(24),
    height: moderateScale(24),
    tintColor: Colors.black,
    resizeMode: 'contain',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: moderateScale(Spacing.xl),
  },
  logo: {
    width: isSmallDevice ? screenWidth * 0.5 : screenWidth * 0.55,
    height: isSmallDevice ? scaleHeight(200) : scaleHeight(250),
    maxWidth: 250,
    maxHeight: 300,
    resizeMode: 'contain',
  },
  buttonContainer: {
    alignItems: 'center',
    paddingBottom: moderateScale(Spacing.xxl * 2),
    gap: moderateScale(Spacing.lg),
  },
  buttonSpacing: {
    marginTop: 0,
  },
});

export default LoginOptionsScreen;
