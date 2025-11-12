import React, { useMemo, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import AppText from '@components/common/AppText';
import { Colors, Radius, Spacing } from '@theme/tokens';
import { scaleWidth, scaleHeight, scaleFontSize } from '@utils/responsive';

interface DateItem {
  date: Date;
  day: string;
  dateNumber: number;
}

interface DatePickerProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  monthName: string;
  onMonthChange: (monthOffset: number) => void;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DatePicker: React.FC<DatePickerProps> = ({ 
  selectedDate, 
  onDateSelect, 
  monthName,
  onMonthChange: _onMonthChange 
}) => {
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  // Generate dates for selected month (showing ~14 days)
  const monthDates: DateItem[] = useMemo(() => {
    const dates: DateItem[] = [];
    const daysOfWeek = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
    const startDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
    
    // Generate all days in the month
    for (let i = 0; i < daysInMonth; i++) {
      const date = new Date(startDate);
      date.setDate(i + 1);
      dates.push({
        date: date,
        day: daysOfWeek[date.getDay()],
        dateNumber: date.getDate(),
      });
    }
    
    return dates;
  }, [selectedDate]);

  const isSameDay = (date1: Date, date2: Date) => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

  const handleMonthSelect = (monthIndex: number) => {
    const currentYear = selectedDate.getFullYear();
    const today = new Date();
    
    let targetYear = currentYear;
    
    // If selected month is before current month, assume next year
    if (monthIndex < today.getMonth() && currentYear === today.getFullYear()) {
      targetYear = currentYear + 1;
    }
    
    const newDate = new Date(targetYear, monthIndex, 1);
    onDateSelect(newDate);
    setShowMonthPicker(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppText weight="semiBold" style={styles.title}>
          Pick Your Date
        </AppText>
        <TouchableOpacity 
          onPress={() => setShowMonthPicker(true)}
          activeOpacity={0.7}
        >
          <AppText weight="regular" style={styles.monthText}>
            {monthName} ▼
          </AppText>
        </TouchableOpacity>
      </View>

      {/* Horizontal Scrollable Dates */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.datesScrollContent}
        snapToInterval={scaleWidth(52)}
        decelerationRate="fast"
      >
        {monthDates.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dateItem,
              isSameDay(selectedDate, item.date) && styles.dateItemSelected,
            ]}
            onPress={() => onDateSelect(item.date)}
            activeOpacity={0.7}
          >
            <AppText
              weight="semiBold"
              style={[
                styles.dateNumber,
                isSameDay(selectedDate, item.date) && styles.dateNumberSelected,
              ]}
            >
              {item.dateNumber}
            </AppText>
            <AppText
              weight="regular"
              style={[
                styles.dateDay,
                isSameDay(selectedDate, item.date) && styles.dateDaySelected,
              ]}
            >
              {item.day}
            </AppText>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Month Picker Modal */}
      <Modal
        visible={showMonthPicker}
        transparent
        animationType="fade"
        onRequestClose={() => setShowMonthPicker(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowMonthPicker(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <AppText weight="semiBold" style={styles.modalTitle}>
                Select Month
              </AppText>
              <TouchableOpacity onPress={() => setShowMonthPicker(false)}>
                <AppText weight="semiBold" style={styles.modalClose}>✕</AppText>
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.monthList}>
              {MONTHS.map((month, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.monthItem,
                    selectedDate.getMonth() === index && styles.monthItemSelected,
                  ]}
                  onPress={() => handleMonthSelect(index)}
                  activeOpacity={0.7}
                >
                  <AppText
                    weight={selectedDate.getMonth() === index ? 'semiBold' : 'regular'}
                    style={[
                      styles.monthItemText,
                      selectedDate.getMonth() === index && styles.monthItemTextSelected,
                    ]}
                  >
                    {month}
                  </AppText>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: scaleHeight(32),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scaleHeight(16),
  },
  title: {
    fontSize: scaleFontSize(16),
    color: Colors.black,
  },
  monthText: {
    fontSize: scaleFontSize(16),
    color: Colors.muted,
  },
  datesScrollContent: {
    paddingRight: scaleWidth(20),
    gap: scaleWidth(0),
  },
  dateItem: {
    width: scaleWidth(48),
    height: scaleHeight(72),
    borderRadius: Radius.pill,
    backgroundColor: Colors.dotInactive,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateItemSelected: {
    backgroundColor: Colors.black,
  },
  dateNumber: {
    fontSize: scaleFontSize(20),
    color: Colors.black,
    marginBottom: scaleHeight(4),
  },
  dateNumberSelected: {
    color: Colors.primary,
  },
  dateDay: {
    fontSize: scaleFontSize(11),
    color: Colors.muted,
    textTransform: 'uppercase',
  },
  dateDaySelected: {
    color: Colors.primary,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    width: scaleWidth(320),
    maxHeight: scaleHeight(500),
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dotInactive,
  },
  modalTitle: {
    fontSize: scaleFontSize(18),
    color: Colors.black,
  },
  modalClose: {
    fontSize: scaleFontSize(24),
    color: Colors.muted,
  },
  monthList: {
    maxHeight: scaleHeight(400),
  },
  monthItem: {
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dotInactive,
  },
  monthItemSelected: {
    backgroundColor: Colors.bg,
  },
  monthItemText: {
    fontSize: scaleFontSize(16),
    color: Colors.black,
  },
  monthItemTextSelected: {
    color: Colors.primary,
  },
});

export default DatePicker;
