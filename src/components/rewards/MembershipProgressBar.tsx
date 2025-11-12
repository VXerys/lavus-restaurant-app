import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import AppText from '../common/AppText';
import { RewardImages } from '@assets';
import { Colors, Spacing } from '@theme/tokens';
import { scaleFontSize, moderateScale } from '@utils/responsive';

interface MembershipProgressBarProps {
  currentPoints: number;
  requiredPoints?: number; // Made optional since we calculate it internally
  nextTier?: string; // Made optional since we calculate it internally
}

const MembershipProgressBar: React.FC<MembershipProgressBarProps> = ({
  currentPoints,
}) => {
  
  // Determine tier based on current points
  // Tier 1: 0-999 points (0%)
  // Tier 2: 1000-1999 points (50%)
  // Tier 3: 2000+ points (100%)
  const getCurrentTier = () => {
    if (currentPoints >= 2000) return 3;
    if (currentPoints >= 1000) return 2;
    return 1;
  };

  const getProgressPercentage = () => {
    if (currentPoints >= 2000) return 100; // Tier 3 - 100%
    if (currentPoints >= 1000) return 50;  // Tier 2 - 50%
    return 0; // Tier 1 - 0%
  };

  const currentTier = getCurrentTier();
  const progressPercentage = getProgressPercentage();

  // Determine which bar image to use based on progress
  const getBarImage = () => {
    if (progressPercentage === 0) return RewardImages.barPercent0;
    if (progressPercentage === 50) return RewardImages.barPercent50;
    return RewardImages.barPercent100; // 100%
  };

  // Determine which star images to use based on tier
  const getLeftLogoImage = () => {
    if (currentTier === 3) return RewardImages.star2; // Tier 3
    if (currentTier === 2) return RewardImages.star1; // Tier 2
    return RewardImages.logo; // Tier 1 (no star)
  };

  const getRightLogoImage = () => {
    if (currentTier === 3) return RewardImages.star3; // Tier 3
    if (currentTier === 2) return RewardImages.star2; // Tier 2
    return RewardImages.star1; // Tier 1
  };

  // Calculate required points for next tier
  const getRequiredPointsForNextTier = () => {
    if (currentTier === 3) return 2000; // Already at max tier
    if (currentTier === 2) return 2000; // Need 2000 for tier 3
    return 1000; // Need 1000 for tier 2
  };

  const getRemainingPointsForNextTier = () => {
    const required = getRequiredPointsForNextTier();
    return Math.max(0, required - currentPoints);
  };

  const displayRemainingPoints = getRemainingPointsForNextTier();
  const displayRequiredPoints = getRequiredPointsForNextTier();
  const nextTierNumber = currentTier === 3 ? 3 : currentTier + 1;

  return (
    <View style={styles.container}>
      {/* Text Above Progress Bar */}
      <AppText weight="regular" style={styles.earnText}>
        {currentTier === 3 
          ? `Congratulations! You are a ${currentTier}-star member` 
          : `Earn ${displayRemainingPoints} more points to reach ${nextTierNumber}-star member`
        }
      </AppText>

      {/* Progress Bar Container */}
      <View style={styles.progressContainer}>
        {/* Left Logo Icon - Changes based on tier */}
        <Image source={getLeftLogoImage()} style={styles.leftLogoIcon} />

        {/* Progress Bar */}
        <View style={styles.progressBarWrapper}>
          <Image 
            source={getBarImage()} 
            style={styles.progressBar}
            resizeMode="contain"
          />
          {/* Points Text in Center - No Container */}
          <AppText weight="regular" style={styles.pointsText}>
            {displayRequiredPoints}
          </AppText>
        </View>

        {/* Right Star Icon - Changes based on tier */}
        <Image source={getRightLogoImage()} style={styles.rightStarIcon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    marginTop: moderateScale(28),
    marginBottom: moderateScale(20),
  },
  earnText: {
    fontSize: scaleFontSize(15),
    color: Colors.black,
    textAlign: 'center',
    marginBottom: moderateScale(20),
    fontWeight: '400',
    lineHeight: scaleFontSize(19),
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: moderateScale(8),
  },
  leftLogoIcon: {
    width: moderateScale(80),
    height: moderateScale(66),
    resizeMode: 'contain',
  },
  rightStarIcon: {
    width: moderateScale(80),
    height: moderateScale(73),
    resizeMode: 'contain',
  },
  progressBarWrapper: {
    flex: 1,
    marginHorizontal: moderateScale(8),
    position: 'relative',
    height: moderateScale(60),
    justifyContent: 'center',
  },
  progressBar: {
    width: '100%',
    height: moderateScale(60),
  },
  pointsText: {
    position: 'absolute',
    fontSize: scaleFontSize(15),
    color: Colors.black,
    fontWeight: '400',
    textAlign: 'center',
    alignSelf: 'center',
  },
});

export default MembershipProgressBar;
