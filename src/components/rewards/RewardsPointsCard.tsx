import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppText from '../common/AppText';
import Button from '../common/Button';
import { Colors, Spacing } from '@theme/tokens';
import { scaleFontSize, moderateScale } from '@utils/responsive';

interface RewardsPointsCardProps {
  points: number;
  lastUpdated: string;
  onRedeemPress: () => void;
}

const RewardsPointsCard: React.FC<RewardsPointsCardProps> = ({
  points,
  lastUpdated,
  onRedeemPress,
}) => {
  return (
    <View style={styles.card}>
      {/* Last Updated Text */}
      <AppText weight="regular" style={styles.lastUpdated}>
        Points last updated on {lastUpdated}
      </AppText>

      {/* Points Display */}
      <AppText weight="regular" style={styles.pointsNumber}>
        {points}
      </AppText>

      <AppText weight="serifTitle" style={styles.pointsLabel}>
        Points to Redeem
      </AppText>

      {/* Redeem Button */}
      <View style={styles.buttonContainer}>
        <Button
          title="Redeem my points"
          onPress={onRedeemPress}
          variant="reward"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.black,
    borderRadius: moderateScale(20),
    paddingTop: moderateScale(26),
    paddingBottom: moderateScale(22),
    paddingHorizontal: moderateScale(18),
    alignItems: 'center',
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    // Android Shadow
    elevation: 10,
  },
  lastUpdated: {
    fontSize: scaleFontSize(10.5),
    color: Colors.white,
    marginBottom: moderateScale(10),
    fontWeight: '300',
    opacity: 0.85,
  },
  pointsNumber: {
    fontSize: scaleFontSize(140),
    color: Colors.white,
    lineHeight: scaleFontSize(140),
    marginBottom: 0,
    fontWeight: '700',
    letterSpacing: -3,
    // Text Shadow for depth effect
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowRadius: 8,
  },
  pointsLabel: {
    fontSize: scaleFontSize(20),
    color: Colors.white,
    marginTop: moderateScale(6),
    marginBottom: moderateScale(24),
    fontWeight: '400',
    letterSpacing: 0.3,
  },
  buttonContainer: {
    alignSelf: 'center',
  },
});

export default RewardsPointsCard;
