import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppText from '../common/AppText';
import { Colors, Spacing, Radius } from '@theme/tokens';
import { scaleFontSize, moderateScale } from '@utils/responsive';

interface Step {
  number: number;
  text: string;
}

interface HowToRedeemSectionProps {
  steps?: Step[];
}

const defaultSteps: Step[] = [
  { number: 1, text: "Visit any Lavu's Restaurant location" },
  { number: 2, text: 'Show this deal to your server before ordering' },
  { number: 3, text: 'Enjoy your special discount or offer!' },
];

const HowToRedeemSection: React.FC<HowToRedeemSectionProps> = ({ 
  steps = defaultSteps 
}) => {
  return (
    <View style={styles.section}>
      <AppText weight="serifTitle" style={styles.title}>
        How to Redeem
      </AppText>
      <View style={styles.stepsList}>
        {steps.map((step) => (
          <View key={step.number} style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <AppText weight="semiBold" style={styles.stepNumberText}>
                {step.number}
              </AppText>
            </View>
            <AppText weight="regular" style={styles.stepText}>
              {step.text}
            </AppText>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: Spacing.xl + Spacing.lg,
  },
  title: {
    fontSize: scaleFontSize(22),
    color: Colors.black,
    marginBottom: Spacing.md,
    fontWeight: '600',
  },
  stepsList: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.lg,
  },
  stepNumber: {
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: moderateScale(18),
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  stepNumberText: {
    fontSize: scaleFontSize(18),
    color: Colors.white,
    fontWeight: '700',
  },
  stepText: {
    flex: 1,
    fontSize: scaleFontSize(15),
    color: '#555',
    lineHeight: scaleFontSize(24),
    paddingTop: moderateScale(6),
  },
});

export default HowToRedeemSection;
