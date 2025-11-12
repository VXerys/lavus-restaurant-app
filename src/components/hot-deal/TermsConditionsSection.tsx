import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppText from '../common/AppText';
import { Colors, Spacing, Radius } from '@theme/tokens';
import { scaleFontSize, moderateScale } from '@utils/responsive';

interface Term {
  text: string;
}

interface TermsConditionsSectionProps {
  terms?: Term[];
}

const defaultTerms: Term[] = [
  { text: 'This offer is valid for dine-in and takeaway orders only' },
  { text: 'Cannot be combined with other promotions or discounts' },
  { text: 'Subject to availability while stocks last' },
  { text: 'Management reserves the right to modify or cancel this offer at any time' },
];

const TermsConditionsSection: React.FC<TermsConditionsSectionProps> = ({ 
  terms = defaultTerms 
}) => {
  return (
    <View style={styles.section}>
      <AppText weight="serifTitle" style={styles.title}>
        Terms & Conditions
      </AppText>
      <View style={styles.termsList}>
        {terms.map((term, index) => (
          <View key={index} style={styles.termItem}>
            <View style={styles.bullet} />
            <AppText weight="regular" style={styles.termText}>
              {term.text}
            </AppText>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: scaleFontSize(22),
    color: Colors.black,
    marginBottom: Spacing.md,
    fontWeight: '600',
  },
  termsList: {
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
  termItem: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
    paddingRight: Spacing.sm,
  },
  bullet: {
    width: moderateScale(7),
    height: moderateScale(7),
    borderRadius: moderateScale(3.5),
    backgroundColor: Colors.primary,
    marginRight: Spacing.md,
    marginTop: moderateScale(7),
  },
  termText: {
    flex: 1,
    fontSize: scaleFontSize(15),
    color: '#555',
    lineHeight: scaleFontSize(24),
  },
});

export default TermsConditionsSection;
