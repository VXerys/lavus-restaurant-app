import React, { useEffect, useRef, useCallback } from 'react';
import { View, StyleSheet, Animated, Pressable } from 'react-native';
import AppText from './AppText';
import { Colors, Spacing } from '@theme/tokens';
import { scaleFontSize, moderateScale } from '@utils/responsive';

interface InfoOverlayProps {
  visible: boolean;
  icon?: string;
  title: string;
  message: string;
  onClose?: () => void;
}

const InfoOverlay: React.FC<InfoOverlayProps> = ({
  visible,
  icon = 'ℹ️',
  title,
  message,
  onClose,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const handleClose = useCallback(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose?.();
    });
  }, [fadeAnim, scaleAnim, onClose]);

  useEffect(() => {
    if (visible) {
      // Reset animations
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.5);
      rotateAnim.setValue(0);

      // Animate in
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 6,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.spring(rotateAnim, {
          toValue: 1,
          friction: 8,
          tension: 80,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto close after 2.5 seconds
      const timer = setTimeout(() => {
        handleClose();
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [visible, fadeAnim, scaleAnim, rotateAnim, handleClose]);

  if (!visible) return null;

  const rotateInterpolation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['-10deg', '0deg'],
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
      <Pressable style={styles.backdrop} onPress={handleClose} />
      <Animated.View
        style={[
          styles.card,
          {
            transform: [
              { scale: scaleAnim },
              { rotate: rotateInterpolation },
            ],
          },
        ]}
      >
        <View style={styles.iconContainer}>
          <AppText weight="semiBold" style={styles.iconText}>
            {icon}
          </AppText>
        </View>
        <AppText weight="semiBold" style={styles.title}>
          {title}
        </AppText>
        <AppText weight="regular" style={styles.message}>
          {message}
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
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
  iconContainer: {
    width: moderateScale(96),
    height: moderateScale(96),
    borderRadius: moderateScale(48),
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
  iconText: {
    fontSize: scaleFontSize(48),
    lineHeight: scaleFontSize(56),
  },
  title: {
    fontSize: scaleFontSize(22),
    color: Colors.black,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  message: {
    fontSize: scaleFontSize(15),
    color: Colors.muted,
    textAlign: 'center',
    lineHeight: scaleFontSize(22),
  },
});

export default InfoOverlay;
