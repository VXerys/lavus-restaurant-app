import React from 'react';
import { View, StyleSheet, Animated, Image } from 'react-native';
import { Colors, Spacing } from '@theme/tokens';
import { moderateScale } from '@utils/responsive';

interface ScanningFrameProps {
  scanLinePosition: Animated.Value;
  cornerOpacity: Animated.Value;
  cornerScale: Animated.Value;
  qrImage?: any;
}

const ScanningFrame: React.FC<ScanningFrameProps> = ({
  scanLinePosition,
  cornerOpacity,
  cornerScale,
  qrImage,
}) => {
  const scanLineTranslateY = scanLinePosition.interpolate({
    inputRange: [0, 1],
    outputRange: [0, moderateScale(320)],
  });

  return (
    <View style={styles.container}>
      {/* QR Code Image */}
      {qrImage && (
        <Image
          source={qrImage}
          style={styles.qrImage}
          resizeMode="contain"
        />
      )}

      {/* Animated Corners */}
      <Animated.View
        style={[
          styles.corner,
          styles.topLeft,
          {
            opacity: cornerOpacity,
            transform: [{ scale: cornerScale }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.corner,
          styles.topRight,
          {
            opacity: cornerOpacity,
            transform: [{ scale: cornerScale }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.corner,
          styles.bottomLeft,
          {
            opacity: cornerOpacity,
            transform: [{ scale: cornerScale }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.corner,
          styles.bottomRight,
          {
            opacity: cornerOpacity,
            transform: [{ scale: cornerScale }],
          },
        ]}
      />

      {/* Scanning Line */}
      <Animated.View
        style={[
          styles.scanLine,
          {
            transform: [{ translateY: scanLineTranslateY }],
          },
        ]}
      >
        <View style={styles.scanLineGlow} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    position: 'relative',
  },
  qrImage: {
    width: '85%',
    height: '85%',
  },
  corner: {
    position: 'absolute',
    width: moderateScale(60),
    height: moderateScale(60),
    borderColor: Colors.primary,
    borderWidth: moderateScale(4),
  },
  topLeft: {
    top: moderateScale(Spacing.lg),
    left: moderateScale(Spacing.lg),
    borderBottomWidth: 0,
    borderRightWidth: 0,
  },
  topRight: {
    top: moderateScale(Spacing.lg),
    right: moderateScale(Spacing.lg),
    borderBottomWidth: 0,
    borderLeftWidth: 0,
  },
  bottomLeft: {
    bottom: moderateScale(Spacing.lg),
    left: moderateScale(Spacing.lg),
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  bottomRight: {
    bottom: moderateScale(Spacing.lg),
    right: moderateScale(Spacing.lg),
    borderTopWidth: 0,
    borderLeftWidth: 0,
  },
  scanLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: moderateScale(3),
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: moderateScale(12),
    elevation: 5,
  },
  scanLineGlow: {
    flex: 1,
    backgroundColor: Colors.primary,
    opacity: 0.6,
    height: moderateScale(8),
    marginTop: moderateScale(-2.5),
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: moderateScale(16),
  },
});

export default ScanningFrame;
