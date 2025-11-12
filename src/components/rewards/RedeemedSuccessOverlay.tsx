import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import AppText from '../common/AppText';
import { Colors } from '@theme/tokens';
import { scaleFontSize, moderateScale } from '@utils/responsive';

interface RedeemedSuccessOverlayProps {
  visible: boolean;
  fadeAnim: Animated.Value;
  checkmarkScale: Animated.Value;
  checkmarkRotate: Animated.Value;
}

const RedeemedSuccessOverlay: React.FC<RedeemedSuccessOverlayProps> = ({
  visible,
  fadeAnim,
  checkmarkScale,
  checkmarkRotate,
}) => {
  if (!visible) return null;

  // Interpolate rotation value to string format
  const rotation = checkmarkRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={[
        styles.overlay,
        {
          opacity: fadeAnim,
        },
      ]}
    >
      <View style={styles.content}>
        {/* Animated Checkmark Circle */}
        <Animated.View
          style={[
            styles.checkmarkContainer,
            {
              transform: [
                { scale: checkmarkScale },
                { rotate: rotation },
              ],
            },
          ]}
        >
          <View style={styles.checkmark}>
            <AppText weight="semiBold" style={styles.checkmarkText}>
              ✓
            </AppText>
          </View>
        </Animated.View>

        {/* Success Message */}
        <AppText weight="semiBold" style={styles.successTitle}>
          Redeemed Successfully!
        </AppText>
        <AppText weight="regular" style={styles.successMessage}>
          Your reward has been redeemed
        </AppText>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: moderateScale(40),
  },
  checkmarkContainer: {
    marginBottom: moderateScale(24),
  },
  checkmark: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(50),
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
  checkmarkText: {
    fontSize: scaleFontSize(56),
    color: Colors.white,
    fontWeight: '700',
    marginTop: moderateScale(-4),
  },
  successTitle: {
    fontSize: scaleFontSize(28),
    color: Colors.white,
    marginBottom: moderateScale(12),
    textAlign: 'center',
    fontWeight: '700',
  },
  successMessage: {
    fontSize: scaleFontSize(16),
    color: Colors.white,
    opacity: 0.9,
    textAlign: 'center',
    fontWeight: '400',
  },
});

export default RedeemedSuccessOverlay;
