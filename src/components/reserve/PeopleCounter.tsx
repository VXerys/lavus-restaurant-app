import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AppText from '@components/common/AppText';
import { Colors, Spacing, Radius } from '@theme/tokens';
import { scaleWidth, scaleHeight, scaleFontSize } from '@utils/responsive';

// Table images mapping
const TABLE_IMAGES = {
  1: require('@assets/images/reserve/Meja1.png'),
  2: require('@assets/images/reserve/Meja2.png'),
  3: require('@assets/images/reserve/Meja3.png'),
  4: require('@assets/images/reserve/Meja4.png'),
  5: require('@assets/images/reserve/Meja5.png'),
  6: require('@assets/images/reserve/Meja6.png'),
  7: require('@assets/images/reserve/Meja7.png'),
  8: require('@assets/images/reserve/Meja8.png'),
};

interface PeopleCounterProps {
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
  maxCount?: number;
}

const PeopleCounter: React.FC<PeopleCounterProps> = ({
  count,
  onIncrement,
  onDecrement,
  maxCount = 8,
}) => {
  return (
    <View style={styles.container}>
      {/* Title and Counter - Left Side */}
      <View style={styles.leftSection}>
        <AppText weight="semiBold" style={styles.title}>
          How many people?
        </AppText>

        <View style={styles.counterContainer}>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={onDecrement}
            activeOpacity={0.7}
            disabled={count === 0}
          >
            <AppText weight="semiBold" style={styles.counterButtonText}>
              −
            </AppText>
          </TouchableOpacity>

          <View style={styles.counterDisplay}>
            <AppText weight="semiBold" style={styles.counterText}>
              {count}
            </AppText>
          </View>

          <TouchableOpacity
            style={styles.counterButton}
            onPress={onIncrement}
            activeOpacity={0.7}
            disabled={count >= maxCount}
          >
            <AppText weight="semiBold" style={styles.counterButtonText}>
              +
            </AppText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Table Visualization - Bottom Right */}
      {count > 0 && (
        <View style={styles.tableVisualization}>
          <Image
            source={TABLE_IMAGES[count as keyof typeof TABLE_IMAGES]}
            style={styles.tableImage}
            resizeMode="contain"
          />
          <View style={styles.peopleIndicator}>
            <AppText weight="semiBold" style={styles.peopleIndicatorText}>
              {count} person{count > 1 ? 's' : ''}
            </AppText>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: scaleHeight(32),
    position: 'relative',
    minHeight: scaleHeight(180),
  },
  leftSection: {
    alignItems: 'flex-start',
  },
  title: {
    fontSize: scaleFontSize(16),
    color: Colors.black,
    marginBottom: scaleHeight(16),
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleWidth(16),
  },
  counterButton: {
    width: scaleWidth(38),
    height: scaleWidth(38),
    borderRadius: Radius.md,
    backgroundColor: Colors.dotInactive,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterButtonText: {
    fontSize: scaleFontSize(28),
    color: Colors.black,
    lineHeight: scaleFontSize(28),
  },
  counterDisplay: {
    width: scaleWidth(45),
    height: scaleWidth(38),
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  counterText: {
    fontSize: scaleFontSize(22),
    color: Colors.black,
  },
  tableVisualization: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableImage: {
    width: scaleWidth(140),
    height: scaleHeight(140),
  },
  peopleIndicator: {
    position: 'absolute',
    backgroundColor: Colors.black,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  peopleIndicatorText: {
    fontSize: scaleFontSize(12),
    color: Colors.white,
  },
});

export default PeopleCounter;
