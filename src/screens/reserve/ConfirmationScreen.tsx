import React from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppText from '@components/common/AppText';
import Button from '@components/common/Button';
import { NavigationIcons } from '@assets';
import { Colors } from '@theme/tokens';
import { scaleWidth, scaleHeight, scaleFontSize, moderateScale } from '@utils/responsive';

interface ConfirmationScreenProps {
  onBack?: () => void;
  onConfirm?: () => void;
  guests: number;
  date: Date;
  time: Date;
}

const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({
  onBack,
  onConfirm,
  guests,
  date,
  time,
}) => {
  // Format date to "Aug 30" format
  const formatDate = (dateObj: Date): string => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[dateObj.getMonth()];
    const day = dateObj.getDate();
    return `${month} ${day}`;
  };

  // Format time to "18:30" format
  const formatTime = (timeObj: Date): string => {
    const hours = timeObj.getHours().toString().padStart(2, '0');
    const minutes = timeObj.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
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
          Confirmation
        </AppText>

        {/* Subtitle */}
        <AppText weight="regular" style={styles.subtitle}>
          This is your reservation overview.
        </AppText>

        {/* Reservation Details */}
        <View style={styles.detailsContainer}>
          {/* Guests */}
          <View style={styles.detailItem}>
            <AppText weight="regular" style={styles.detailLabel}>
              Guests
            </AppText>
            <AppText weight="semiBold" style={styles.detailValue}>
              {guests}
            </AppText>
          </View>

          {/* Day */}
          <View style={styles.detailItem}>
            <AppText weight="regular" style={styles.detailLabel}>
              Day
            </AppText>
            <AppText weight="semiBold" style={styles.detailValue}>
              {formatDate(date)}
            </AppText>
          </View>

          {/* Time */}
          <View style={styles.detailItem}>
            <AppText weight="regular" style={styles.detailLabel}>
              Time
            </AppText>
            <AppText weight="semiBold" style={styles.detailValue}>
              {formatTime(time)}
            </AppText>
          </View>
        </View>

        {/* Confirm Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="Confirm Reservation"
            onPress={onConfirm}
            variant="primary"
            width={scaleWidth(320)}
          />
        </View>
      </View>
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
  backButton: {
    width: moderateScale(44 ),
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
    marginBottom: scaleHeight(12),
    lineHeight: scaleFontSize(48),
  },
  subtitle: {
    fontSize: scaleFontSize(16),
    color: Colors.black,
    textAlign: 'center',
    marginBottom: scaleHeight(48),
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    marginBottom: scaleHeight(60),
    paddingHorizontal: scaleWidth(10),
  },
  detailItem: {
    alignItems: 'center',
    flex: 1,
  },
  detailLabel: {
    fontSize: scaleFontSize(18),
    color: Colors.black,
    marginBottom: scaleHeight(7),
  },
  detailValue: {
    fontSize: scaleFontSize(24),
    color: Colors.black,
  },
  buttonContainer: {

    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: scaleHeight(40),
  },
});

export default ConfirmationScreen;
