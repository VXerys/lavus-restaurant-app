import React, { useMemo, useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AppText from '@components/common/AppText';
import { Colors } from '@theme/tokens';
import { scaleWidth, scaleHeight, scaleFontSize } from '@utils/responsive';

interface TimePickerProps {
  selectedTime: Date;
  onPeriodChange: (period: 'AM' | 'PM') => void;
  onHourChange: (hour: number) => void;
  onMinuteChange: (minute: number) => void;
}

const ITEM_HEIGHT = scaleHeight(40);
const VISIBLE_ITEMS = 3; // Show 3 items at a time (1 before, 1 selected, 1 after)

const TimePicker: React.FC<TimePickerProps> = ({
  selectedTime,
  onPeriodChange,
  onHourChange,
  onMinuteChange,
}) => {
  const hourScrollRef = useRef<ScrollView>(null);
  const minuteScrollRef = useRef<ScrollView>(null);

  // Generate hours (1-12 for both AM/PM)
  const hours = useMemo(() => Array.from({ length: 12 }, (_, i) => i + 1), []);
  const minutes = useMemo(() => Array.from({ length: 60 }, (_, i) => i), []);

  // Get current hour and minute from selectedTime
  const selectedHour = selectedTime.getHours() % 12 || 12;
  const selectedMinute = selectedTime.getMinutes();
  const selectedPeriod = selectedTime.getHours() >= 12 ? 'PM' : 'AM';

  // Scroll to selected item on mount and when selection changes
  useEffect(() => {
    const hourIndex = hours.indexOf(selectedHour);
    if (hourIndex !== -1 && hourScrollRef.current) {
      hourScrollRef.current.scrollTo({
        y: hourIndex * ITEM_HEIGHT,
        animated: true,
      });
    }
  }, [selectedHour, hours]);

  useEffect(() => {
    if (minuteScrollRef.current) {
      minuteScrollRef.current.scrollTo({
        y: selectedMinute * ITEM_HEIGHT,
        animated: true,
      });
    }
  }, [selectedMinute]);

  const renderTimeItem = (
    value: number,
    isSelected: boolean,
    onPress: () => void,
    isPadded: boolean = false
  ) => {
    return (
      <TouchableOpacity
        key={value}
        onPress={onPress}
        activeOpacity={0.7}
        style={styles.timeItemContainer}
      >
        <AppText
          weight={isSelected ? 'semiBold' : 'regular'}
          style={[
            styles.timeText,
            isSelected && styles.timeTextActive,
          ]}
        >
          {isPadded ? value.toString().padStart(2, '0') : value}
        </AppText>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <AppText weight="semiBold" style={styles.title}>
        Pick Your Time
      </AppText>

      <View style={styles.timePickerContainer}>
        {/* AM/PM Selector - Left Side */}
        <View style={styles.periodSelector}>
          <TouchableOpacity
            style={styles.periodButton}
            onPress={() => onPeriodChange('AM')}
            activeOpacity={0.7}
          >
            <AppText
              weight="semiBold"
              style={[
                styles.periodText,
                selectedPeriod === 'AM' && styles.periodTextActive,
              ]}
            >
              AM
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.periodButton}
            onPress={() => onPeriodChange('PM')}
            activeOpacity={0.7}
          >
            <AppText
              weight="semiBold"
              style={[
                styles.periodText,
                selectedPeriod === 'PM' && styles.periodTextActive,
              ]}
            >
              PM
            </AppText>
          </TouchableOpacity>
        </View>

        {/* Time Columns Container */}
        <View style={styles.timeColumnsContainer}>
          {/* Hour Selector */}
          <View style={styles.timeColumn}>
            <ScrollView
              ref={hourScrollRef}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.timeScrollContent}
              snapToInterval={ITEM_HEIGHT}
              decelerationRate="fast"
              scrollEventThrottle={16}
              nestedScrollEnabled={true}
              bounces={false}
            >
              {/* Add padding items for proper centering */}
              <View style={{ height: ITEM_HEIGHT }} />
              {hours.map((hour) =>
                renderTimeItem(
                  hour,
                  selectedHour === hour,
                  () => onHourChange(hour),
                  false
                )
              )}
              <View style={{ height: ITEM_HEIGHT }} />
            </ScrollView>
          </View>

          {/* Minute Selector */}
          <View style={styles.timeColumn}>
            <ScrollView
              ref={minuteScrollRef}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.timeScrollContent}
              snapToInterval={ITEM_HEIGHT}
              decelerationRate="fast"
              scrollEventThrottle={16}
              nestedScrollEnabled={true}
              bounces={false}
            >
              {/* Add padding items for proper centering */}
              <View style={{ height: ITEM_HEIGHT }} />
              {minutes.map((minute) =>
                renderTimeItem(
                  minute,
                  selectedMinute === minute,
                  () => onMinuteChange(minute),
                  true
                )
              )}
              <View style={{ height: ITEM_HEIGHT }} />
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: scaleHeight(5),
  },
  title: {
    fontSize: scaleFontSize(16),
    color: Colors.black,
    marginBottom: scaleHeight(5),
  },
  timePickerContainer: {
    flexDirection: 'row',
    height: scaleHeight(140),
    alignItems: 'center',
    justifyContent: 'center',
  },
  periodSelector: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: scaleHeight(8),
  },
  periodButton: {
    paddingVertical: 0,
    paddingHorizontal: 7,
  },
  periodText: {
    fontSize: scaleFontSize(14),
    color: '#D1D1D1',
  },
  periodTextActive: {
    fontSize: scaleFontSize(20),
    color: Colors.black,
  },
  timeColumnsContainer: {
    flexDirection: 'row',
    position: 'relative',
  },
  timeColumn: {
    width: scaleWidth(60),
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
    overflow: 'hidden',
  },
  timeScrollContent: {
    alignItems: 'center',
  },
  timeItemContainer: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    fontSize: scaleFontSize(16),
    color: '#D1D1D1',
  },
  timeTextActive: {
    fontSize: scaleFontSize(24),
    color: Colors.black,
  },
});

export default TimePicker;
