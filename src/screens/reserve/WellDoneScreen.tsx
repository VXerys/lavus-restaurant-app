import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Image, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppText from '@components/common/AppText';
import Button from '@components/common/Button';
import ReminderPopup from '@components/common/ReminderPopup';
import { Colors } from '@theme/tokens';
import { scaleWidth, scaleHeight, scaleFontSize, moderateScale } from '@utils/responsive';

interface WellDoneScreenProps {
  onSetReminder?: () => void;
  onGoHome?: () => void;
}

const WellDoneScreen: React.FC<WellDoneScreenProps> = ({
  onSetReminder: _onSetReminder,
  onGoHome,
}) => {
  // Animation values
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const checkmarkAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate box scale
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    }).start();

    // Animate checkmark with delay
    Animated.sequence([
      Animated.delay(300),
      Animated.spring(checkmarkAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scaleAnim, checkmarkAnim]);

  // Reminder popup state (rendered via separate component)
  const [reminderVisible, setReminderVisible] = useState(false);

  const showReminderPopup = () => {
    setReminderVisible(true);
    // Auto dismiss after 2.5s
    setTimeout(() => {
      setReminderVisible(false);
    }, 2500);
  };

  const hideReminderPopup = () => {
    setReminderVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>

        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('@assets/images/logo-restaurant.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Title */}
        <AppText weight="serifTitle" style={styles.title}>
          Well Done!
        </AppText>

        {/* Success Icon */}
        <View style={styles.successIconContainer}>
          <Animated.View 
            style={[
              styles.successIconBox,
              {
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <Animated.Text 
              style={[
                styles.checkmark,
                {
                  transform: [{ scale: checkmarkAnim }],
                  opacity: checkmarkAnim,
                },
              ]}
            >
              ✓
            </Animated.Text>
          </Animated.View>
        </View>

        {/* Message */}
        <AppText weight="regular" style={styles.message}>
          Hope you will have good time with Lavu's.{'\n'}
          Thank you for being a valued Lavu's{'\n'}
          customer!
        </AppText>

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <Button
            title="Set A Reminder"
            onPress={() => {
              // Show animated popup indicating feature is in progress
              showReminderPopup();
              // Optionally keep calling external handler if present
              // onSetReminder?.();
            }}
            variant="primary"
            width={scaleWidth(280)}
          />
          
          <View style={styles.buttonSpacing} />
          
          <Button
            title="Go home"
            onPress={onGoHome}
            variant="outline"
            width={scaleWidth(280)}
          />
        </View>
        </View>

      {/* Reminder Popup (extracted component) */}
      <ReminderPopup
        visible={reminderVisible}
        title="Feature in progress"
        message={"The \"Set A Reminder\" feature is still under development. We're working on it — stay tuned!"}
        onClose={hideReminderPopup}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
    paddingHorizontal: scaleWidth(20),
  },
  
  logoContainer: {
    alignItems: 'center',
    marginTop: scaleHeight(20),
    marginBottom: scaleHeight(32),
  },
  logo: {
    width: scaleWidth(120),
    height: scaleHeight(120),
  },
  title: {
    fontSize: scaleFontSize(40),
    color: Colors.black,
    textAlign: 'center',
    marginBottom: scaleHeight(40),
    lineHeight: scaleFontSize(48),
  },
  successIconContainer: {
    alignItems: 'center',
    marginBottom: scaleHeight(40),
  },
  successIconBox: {
    width: moderateScale(160),
    height: moderateScale(160),
    borderRadius: moderateScale(32),
    borderWidth: moderateScale(4),
    borderColor: Colors.primary,
    backgroundColor: Colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    fontSize: scaleFontSize(100),
    color: Colors.primary,
    fontWeight: '300',
    fontFamily: 'System',
  },
  message: {
    fontSize: scaleFontSize(18),
    color: Colors.black,
    textAlign: 'center',
    lineHeight: scaleFontSize(26),
    marginBottom: scaleHeight(50),
    fontFamily: 'System',
  },
  buttonsContainer: {
    alignItems: 'center',
    marginTop: scaleHeight(20),
    paddingBottom: scaleHeight(40),
  },
  buttonSpacing: {
    height: scaleHeight(16),
  },
  // reminder styles moved to ReminderPopup component
});

export default WellDoneScreen;
