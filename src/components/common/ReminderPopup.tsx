import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';
import AppText from '@components/common/AppText';
import { Colors } from '@theme/tokens';
import { scaleWidth, moderateScale, scaleFontSize } from '@utils/responsive';

interface ReminderPopupProps {
  visible: boolean;
  title?: string;
  message?: string;
  onClose?: () => void;
}

const ReminderPopup: React.FC<ReminderPopupProps> = ({
  visible,
  title = 'Feature in progress',
  message = "The \"Set A Reminder\" feature is still under development. We're working on it — stay tuned!",
  onClose,
}) => {
  const [mounted, setMounted] = useState(visible);
  const scale = useRef(new Animated.Value(0.85)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setMounted(true);
      scale.setValue(0.85);
      opacity.setValue(0);
      Animated.parallel([
        Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 6 }),
        Animated.timing(opacity, { toValue: 1, duration: 220, useNativeDriver: true }),
      ]).start();
    } else if (mounted) {
      Animated.parallel([
        Animated.timing(opacity, { toValue: 0, duration: 180, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 0.95, duration: 180, useNativeDriver: true }),
      ]).start(() => setMounted(false));
    }
  }, [visible, mounted, opacity, scale]);

  if (!mounted) return null;

  return (
    <Animated.View style={[styles.overlay, { opacity }]}> 
      <Animated.View style={[styles.card, { transform: [{ scale }] }]}> 
        <AppText weight="semiBold" style={styles.title}>{title}</AppText>
        <AppText weight="regular" style={styles.message}>{message}</AppText>
        <Pressable onPress={onClose} style={styles.button}>
          <AppText weight="semiBold" style={styles.buttonText}>Got it</AppText>
        </Pressable>
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
    backgroundColor: 'rgba(0,0,0,0.36)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  card: {
    width: scaleWidth(320),
    padding: moderateScale(20),
    borderRadius: moderateScale(16),
    backgroundColor: Colors.white,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
  title: {
    fontSize: scaleFontSize(18),
    color: Colors.black,
    marginBottom: moderateScale(8),
  },
  message: {
    fontSize: scaleFontSize(14),
    color: Colors.muted,
    textAlign: 'center',
    marginBottom: moderateScale(14),
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(10),
  },
  buttonText: {
    color: Colors.white,
    fontSize: scaleFontSize(14),
  },
});

export default ReminderPopup;
