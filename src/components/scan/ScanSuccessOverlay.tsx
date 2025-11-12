import React from 'react';
import { StyleSheet, Animated } from 'react-native';
import AppText from '@components/common/AppText';
import { Colors, Spacing } from '@theme/tokens';
import { scaleFontSize, moderateScale } from '@utils/responsive';

interface ScanSuccessOverlayProps {
  visible: boolean;
  fadeAnim: Animated.Value;
  scaleAnim: Animated.Value;
  checkmarkScale: Animated.Value;
  checkmarkRotate: Animated.Value;
}

const ScanSuccessOverlay: React.FC<ScanSuccessOverlayProps> = ({
  visible,
  fadeAnim,
  scaleAnim,
  checkmarkScale,
  checkmarkRotate,
}) => {
  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.overlay,
        {
          opacity: fadeAnim,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.card,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Animated.View
          style={[
            styles.checkmark,
            {
              transform: [
                { scale: checkmarkScale },
                {
                  rotate: checkmarkRotate.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['-10deg', '0deg'],
                  }),
                },
              ],
            },
          ]}
        >
          <AppText weight="semiBold" style={styles.checkmarkText}>
            ✓
          </AppText>
        </Animated.View>
        <AppText weight="serifTitle" style={styles.successTitle}>
          Scan Success!
        </AppText>
        <AppText weight="regular" style={styles.successSubtext}>
          QR Code has been verified successfully
        </AppText>
      </Animated.View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: moderateScale(24),
    paddingVertical: moderateScale(48),
    paddingHorizontal: moderateScale(40),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Spacing.xl,
    maxWidth: moderateScale(320),
    borderWidth: 1,
    borderColor: 'rgba(149, 174, 69, 0.2)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 16,
  },
  checkmark: {
    width: moderateScale(96),
    height: moderateScale(96),
    borderRadius: moderateScale(48),
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateScale(24),
    borderWidth: moderateScale(4),
    borderColor: 'rgba(149, 174, 69, 0.2)',
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  checkmarkText: {
    fontSize: scaleFontSize(52),
    color: Colors.white,
    fontWeight: '700',
    lineHeight: scaleFontSize(52),
  },
  successTitle: {
    fontSize: scaleFontSize(26),
    color: Colors.black,
    textAlign: 'center',
    marginBottom: moderateScale(8),
    letterSpacing: 0.3,
  },
  successSubtext: {
    fontSize: scaleFontSize(15),
    color: Colors.muted,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: scaleFontSize(22),
  },
});

export default ScanSuccessOverlay;
