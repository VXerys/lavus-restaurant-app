import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Colors } from '@theme/tokens';
import { moderateScale } from '@utils/responsive';

interface ScanFrameProps {
  isScanning: boolean;
}

const ScanFrame: React.FC<ScanFrameProps> = ({ isScanning }) => {
  const scanLineAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isScanning) {
      // Continuous scanning animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(scanLineAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(scanLineAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      scanLineAnim.setValue(0);
    }
  }, [isScanning, scanLineAnim]);

  const scanLineTranslateY = scanLineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, moderateScale(280)],
  });

  return (
    <View style={styles.container}>
      {/* Corner Frame */}
      <View style={styles.frame}>
        {/* Top Left */}
        <View style={[styles.corner, styles.topLeft]} />
        {/* Top Right */}
        <View style={[styles.corner, styles.topRight]} />
        {/* Bottom Left */}
        <View style={[styles.corner, styles.bottomLeft]} />
        {/* Bottom Right */}
        <View style={[styles.corner, styles.bottomRight]} />
      </View>

      {/* Scanning Line */}
      {isScanning && (
        <Animated.View
          style={[
            styles.scanLine,
            {
              transform: [{ translateY: scanLineTranslateY }],
            },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: moderateScale(300),
    height: moderateScale(300),
    position: 'relative',
  },
  frame: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: moderateScale(60),
    height: moderateScale(60),
    borderColor: Colors.primary,
    borderWidth: moderateScale(4),
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: moderateScale(8),
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopRightRadius: moderateScale(8),
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomLeftRadius: moderateScale(8),
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomRightRadius: moderateScale(8),
  },
  scanLine: {
    position: 'absolute',
    top: moderateScale(10),
    left: moderateScale(10),
    right: moderateScale(10),
    height: moderateScale(2),
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
});

export default ScanFrame;
