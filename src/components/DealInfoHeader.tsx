import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppText from './AppText';
import { Colors, Spacing, Radius } from '@theme/tokens';
import { scaleFontSize, moderateScale } from '@utils/responsive';

interface DealInfoHeaderProps {
  label?: string;
  title: string;
  discount?: number;
  validUntil?: string;
  description?: string;
}

const DealInfoHeader: React.FC<DealInfoHeaderProps> = ({
  label,
  title,
  discount,
  validUntil,
  description,
}) => {
  return (
    <View>
      {/* Category Label */}
      {label && (
        <AppText weight="regular" style={styles.categoryLabel}>
          {label}
        </AppText>
      )}

      {/* Deal Title */}
      <AppText weight="serifTitle" style={styles.dealTitle}>
        {title}
      </AppText>

      {/* Discount Badge */}
      {discount && (
        <View style={styles.discountBadge}>
          <AppText weight="semiBold" style={styles.discountText}>
            {discount}% OFF
          </AppText>
        </View>
      )}

      {/* Valid Until */}
      {validUntil && (
        <View style={styles.validityContainer}>
          <AppText weight="regular" style={styles.validityLabel}>
            Valid until:
          </AppText>
          <AppText weight="semiBold" style={styles.validityDate}>
            {new Date(validUntil).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </AppText>
        </View>
      )}

      {/* Description */}
      {description && (
        <AppText weight="regular" style={styles.description}>
          {description}
        </AppText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  categoryLabel: {
    fontSize: scaleFontSize(10),
    color: Colors.primary,
    letterSpacing: 2,
    marginBottom: Spacing.xs - 2,
    fontWeight: '700',
  },
  dealTitle: {
    fontSize: scaleFontSize(32),
    color: Colors.black,
    lineHeight: scaleFontSize(40),
    marginBottom: Spacing.md,
  },
  discountBadge: {
    backgroundColor: '#FF6B6B',
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(24),
    alignSelf: 'flex-start',
    marginBottom: Spacing.lg,
    shadowColor: '#FF6B6B',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  discountText: {
    fontSize: scaleFontSize(16),
    color: Colors.white,
    letterSpacing: 1,
    fontWeight: '700',
  },
  validityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    paddingVertical: moderateScale(12),
    paddingHorizontal: Spacing.lg,
    backgroundColor: '#FFFBEA',
    borderRadius: Radius.md,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  validityLabel: {
    fontSize: scaleFontSize(13),
    color: '#666',
    marginRight: Spacing.xs,
    fontWeight: '500',
  },
  validityDate: {
    fontSize: scaleFontSize(13),
    color: Colors.black,
    fontWeight: '700',
  },
  description: {
    fontSize: scaleFontSize(16),
    color: '#444',
    lineHeight: scaleFontSize(26),
    marginBottom: Spacing.xl + Spacing.sm,
  },
});

export default DealInfoHeader;
