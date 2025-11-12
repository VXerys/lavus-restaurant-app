import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import AppText from '@components/common/AppText';
import { Colors, Spacing } from '@theme/tokens';
import { moderateScale, scaleFontSize } from '@utils/responsive';

interface ScanAnalyzingProps {
  isVisible: boolean;
  onComplete?: () => void;
}

const ScanAnalyzing: React.FC<ScanAnalyzingProps> = ({ isVisible, onComplete }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      // Fade in
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Pulse animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Progress animation
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(() => {
        // Complete after progress
        setTimeout(() => {
          onComplete?.();
        }, 500);
      });
    } else {
      opacityAnim.setValue(0);
      pulseAnim.setValue(1);
      progressAnim.setValue(0);
    }
  }, [isVisible, opacityAnim, pulseAnim, progressAnim, onComplete]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  if (!isVisible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: opacityAnim,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.content,
          {
            transform: [{ scale: pulseAnim }],
          },
        ]}
      >
        <AppText weight="semiBold" style={styles.title}>
          Analyzing QR Code...
        </AppText>
        
        <View style={styles.progressBar}>
          <Animated.View
            style={[
              styles.progressFill,
              {
                width: progressWidth,
              },
            ]}
          />
        </View>

        <AppText weight="regular" style={styles.subtitle}>
          Please wait a moment
        </AppText>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    backgroundColor: Colors.white,
    borderRadius: moderateScale(20),
    padding: moderateScale(Spacing.xl),
    width: moderateScale(280),
    alignItems: 'center',
  },
  title: {
    fontSize: scaleFontSize(18),
    color: Colors.black,
    marginBottom: moderateScale(Spacing.lg),
    textAlign: 'center',
  },
  progressBar: {
    width: '100%',
    height: moderateScale(6),
    backgroundColor: '#E8E8E8',
    borderRadius: moderateScale(3),
    overflow: 'hidden',
    marginBottom: moderateScale(Spacing.md),
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: moderateScale(3),
  },
  subtitle: {
    fontSize: scaleFontSize(14),
    color: Colors.muted,
    textAlign: 'center',
  },
});

export default ScanAnalyzing;
