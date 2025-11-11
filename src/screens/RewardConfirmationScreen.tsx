import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  Pressable,
  Animated,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AppText from '@components/AppText';
import Button from '@components/Button';
import BottomTabBar from '@components/BottomTabBar';
import RedeemedSuccessOverlay from '@components/RedeemedSuccessOverlay';
import { NavigationIcons, Images } from '@assets';
import { Colors, Spacing } from '@theme/tokens';
import { scaleFontSize, moderateScale } from '@utils/responsive';
import { getRewardById } from '@mocks/data/rewards';
import { useClaimDealAnimation } from '@hooks/useClaimDealAnimation';

type RootStackParamList = {
  RewardConfirmation: { rewardId: string };
  // ... other screens
};

type Props = NativeStackScreenProps<RootStackParamList, 'RewardConfirmation'>;

const RewardConfirmationScreen: React.FC<Props> = ({ navigation, route }) => {
  const { rewardId } = route.params;
  const reward = getRewardById(rewardId);

  // Custom navigation handler for animation
  const handleNavigateBack = () => {
    // Navigate back to Rewards screen
    // Go back twice: RewardConfirmation -> RewardsDetail -> Home (Rewards Tab)
    setTimeout(() => {
      try {
        // First go back to RewardsDetail
        navigation.goBack();
        // Then after a short delay, go back to Home
        setTimeout(() => {
          navigation.goBack();
        }, 100);
      } catch (error) {
        console.log('Navigation error:', error);
      }
    }, 300); // Small delay to ensure animation completes
  };

  // Use custom hook for claim animation
  const {
    isClaiming,
    isClaimed,
    scaleAnim,
    fadeAnim,
    checkmarkScale,
    checkmarkRotate,
    handleClaimDeal,
  } = useClaimDealAnimation(handleNavigateBack);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleTabPress = () => {
    // Go back to Home (MainTabs) by going back twice
    try {
      navigation.goBack();
      setTimeout(() => {
        navigation.goBack();
      }, 100);
    } catch (error) {
      console.log('Tab press navigation error:', error);
    }
  };

  if (!reward) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <AppText weight="regular" style={styles.errorText}>
            Reward not found
          </AppText>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.screenContainer}>
      <SafeAreaView style={styles.container}>
        {/* Redeemed Success Overlay */}
        <RedeemedSuccessOverlay
          visible={isClaimed}
          fadeAnim={fadeAnim}
          checkmarkScale={checkmarkScale}
          checkmarkRotate={checkmarkRotate}
        />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Pressable style={styles.backButton} onPress={handleBackPress}>
              <Image source={NavigationIcons.back} style={styles.backIcon} />
            </Pressable>
            <AppText weight="regular" style={styles.headerTitle}>
              Redeem Confirmation
            </AppText>
          </View>

          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image source={Images.logo} style={styles.logo} />
          </View>

          {/* Title */}
          <AppText weight="semiBold" style={styles.title}>
            Your Redeem
          </AppText>

          {/* Reward Item Card */}
          <View style={styles.rewardItemCard}>
            <View style={styles.rewardItemLeft}>
              <View style={styles.rewardImageContainer}>
                <Image source={reward.image} style={styles.rewardImage} />
              </View>
              <View style={styles.rewardInfo}>
                <AppText weight="serifTitle" style={styles.rewardName}>
                  {reward.name}
                </AppText>
                <AppText weight="regular" style={styles.foodInfoLabel}>
                  Food Info
                </AppText>
              </View>
            </View>
            <View style={styles.rewardItemRight}>
              <AppText weight="regular" style={styles.quantityLabel}>
                x1
              </AppText>
              <AppText weight="semiBold" style={styles.pointsValue}>
                {reward.points}p
              </AppText>
            </View>
          </View>

          {/* Total Section */}
          <View style={styles.totalSection}>
            <AppText weight="semiBold" style={styles.totalLabel}>
              Total
            </AppText>
            <AppText weight="semiBold" style={styles.totalValue}>
              {reward.points}p
            </AppText>
          </View>

          {/* Redeem Button */}
          <View style={styles.buttonContainer}>
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <Button
                title="Redeem Now"
                onPress={handleClaimDeal}
                variant="primary"
                disabled={isClaiming}
              />
            </Animated.View>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Bottom Navigation Bar */}
      <BottomTabBar activeTab="rewards" onTabPress={handleTabPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContent: {
    paddingBottom: moderateScale(120),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: moderateScale(16),
    paddingBottom: moderateScale(16),
    backgroundColor: Colors.white,
  },
  backButton: {
    width: moderateScale(32),
    height: moderateScale(32),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  backIcon: {
    width: moderateScale(24),
    height: moderateScale(24),
    resizeMode: 'contain',
    tintColor: Colors.black,
  },
  headerTitle: {
    fontSize: scaleFontSize(16),
    color: Colors.muted,
    marginLeft: moderateScale(8),
    fontWeight: '400',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: moderateScale(24),
    marginBottom: moderateScale(32),
  },
  logo: {
    width: moderateScale(100),
    height: moderateScale(100),
    resizeMode: 'contain',
  },
  title: {
    fontSize: scaleFontSize(32),
    color: Colors.black,
    textAlign: 'center',
    marginBottom: moderateScale(30),
    fontWeight: 'bold',
  },
  rewardItemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.lg,
    marginBottom: moderateScale(32),
    padding: moderateScale(16),
    borderRadius: moderateScale(16),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  rewardItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rewardImageContainer: {
    width: moderateScale(64),
    height: moderateScale(64),
    borderRadius: moderateScale(32),
    overflow: 'hidden',
    backgroundColor: Colors.bg,
    marginRight: moderateScale(12),
  },
  rewardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  rewardInfo: {
    flex: 1,
  },
  rewardName: {
    fontSize: scaleFontSize(18),
    color: Colors.black,
    marginBottom: moderateScale(4),
    fontWeight: '500',
  },
  foodInfoLabel: {
    fontSize: scaleFontSize(13),
    color: Colors.muted,
    fontWeight: '300',
  },
  rewardItemRight: {
    alignItems: 'flex-end',
  },
  quantityLabel: {
    fontSize: scaleFontSize(16),
    color: Colors.black,
    marginBottom: moderateScale(4),
    fontWeight: '400',
  },
  pointsValue: {
    fontSize: scaleFontSize(20),
    color: Colors.black,
    fontWeight: '600',
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginHorizontal: Spacing.lg,
    marginBottom: moderateScale(180),
    paddingTop: moderateScale(1),
    gap: moderateScale(16),
  },
  totalLabel: {
    fontSize: scaleFontSize(18),
    color: Colors.black,
    fontWeight: '500',
  },
  totalValue: {
    fontSize: scaleFontSize(24),
    color: Colors.black,
    fontWeight: '700',
  },
  buttonContainer: {
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginTop: moderateScale(0),
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: scaleFontSize(16),
    color: Colors.muted,
  },
});

export default RewardConfirmationScreen;
