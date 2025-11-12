import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Image, Pressable, Animated, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppText from '@components/common/AppText';
import Button from '@components/common/Button';
import { NavigationIcons } from '@assets';
import { Colors } from '@theme/tokens';
import { scaleWidth, scaleHeight, scaleFontSize, moderateScale } from '@utils/responsive';

interface WellDoneScreenProps {
  onBack?: () => void;
  onSetReminder?: () => void;
  onGoHome?: () => void;
}

const WellDoneScreen: React.FC<WellDoneScreenProps> = ({
  onBack,
  onSetReminder,
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

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
        {/* Back Button */}
        <Pressable style={styles.backButton} onPress={onBack}>
          <Image source={NavigationIcons.back} style={styles.backIcon} />
        </Pressable>

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
            onPress={onSetReminder}
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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  scrollView: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
    paddingHorizontal: scaleWidth(20),
  },
  backButton: {
    width: moderateScale(44),
    height: moderateScale(44),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scaleHeight(8),
    marginLeft: scaleWidth(-8),
  },
  backIcon: {
    width: moderateScale(24),
    height: moderateScale(24),
    tintColor: Colors.black,
    resizeMode: 'contain',
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
});

export default WellDoneScreen;
