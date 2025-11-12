import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppText from '@components/common/AppText';
import Button from '@components/common/Button';
import InfoModal from '@components/common/InfoModal';
import { DatePicker, TimePicker, PeopleCounter } from '@components/reserve';
import { useReservation } from '@hooks/useReservation';
import { Colors } from '@theme/tokens';
import { scaleWidth, scaleHeight, scaleFontSize } from '@utils/responsive';

interface ReserveScreenProps {
  navigation?: any;
}

const ReserveScreen: React.FC<ReserveScreenProps> = ({ navigation }) => {
  const {
    selectedDate,
    selectedTime,
    peopleCount,
    setSelectedDate,
    handleMonthChange,
    handlePeriodChange,
    handleHourChange,
    handleMinuteChange,
    incrementPeople,
    decrementPeople,
    monthName,
  } = useReservation();

  // Modal states
  const [showPeopleModal, setShowPeopleModal] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);

  const handleReservation = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDateOnly = new Date(selectedDate);
    selectedDateOnly.setHours(0, 0, 0, 0);

    // Validate: Check if user has selected a valid future date
    if (selectedDateOnly < today) {
      setShowDateModal(true);
      return;
    }

    // Validate: Check if user has selected number of people
    if (peopleCount === 0) {
      setShowPeopleModal(true);
      return;
    }

    // Navigate to confirmation screen
    if (navigation) {
      navigation.navigate('ReservationConfirmation', {
        guests: peopleCount,
        date: selectedDate,
        time: selectedTime,
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
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
          When do you want to{'\n'}enjoy your dishs?
        </AppText>

        {/* Date Picker Section */}
        <DatePicker
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
          monthName={monthName}
          onMonthChange={handleMonthChange}
        />

        {/* Time Picker Section */}
        <TimePicker
          selectedTime={selectedTime}
          onPeriodChange={handlePeriodChange}
          onHourChange={handleHourChange}
          onMinuteChange={handleMinuteChange}
        />

        {/* People Counter Section */}
        <PeopleCounter
          count={peopleCount}
          onIncrement={incrementPeople}
          onDecrement={decrementPeople}
          maxCount={8}
        />

        {/* Reserve Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="Reserve"
            onPress={handleReservation}
            variant="primary"
            width={scaleWidth(150)}
          />
        </View>
      </ScrollView>

      {/* Info Modals */}
      <InfoModal
        visible={showDateModal}
        onClose={() => setShowDateModal(false)}
        title="Select a Date"
        message="Please choose a reservation date. Tap on the month name to select a different month, then pick your preferred date."
        icon="📅"
        buttonText="Got it"
      />

      <InfoModal
        visible={showPeopleModal}
        onClose={() => setShowPeopleModal(false)}
        title="Select Number of Guests"
        message="Please select how many people will be dining. Use the + button to add guests (minimum 1 person, maximum 8 people)."
        icon="👥"
        buttonText="Got it"
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
  },
  scrollContent: {
    paddingHorizontal: scaleWidth(20),
    paddingBottom: scaleHeight(40),
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: scaleHeight(16),
    marginBottom: scaleHeight(15),
  },
  logo: {
    width: scaleWidth(100),
    height: scaleHeight(100),
  },
  title: {
    fontSize: scaleFontSize(24),
    color: Colors.black,
    textAlign: 'center',
    marginBottom: scaleHeight(28),
    lineHeight: scaleFontSize(34),
  },
  buttonContainer: {
    marginTop: scaleHeight(16),
    marginBottom: scaleHeight(18),
    alignItems: 'center',
  },
});

export default ReserveScreen;

