import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppText from '@components/AppText';
import RewardsPointsCard from '@components/RewardsPointsCard';
import MembershipProgressBar from '@components/MembershipProgressBar';
import { Colors, Spacing } from '@theme/tokens';
import { scaleFontSize } from '@utils/responsive';

interface RewardsScreenProps {
  navigation?: any;
}

const RewardsScreen: React.FC<RewardsScreenProps> = ({ navigation }) => {
  // Mock data - in real app, this would come from API/store
  // You can change this value to test different tiers:
  // 0-999: Tier 1 (0%, logo + star1)
  // 1000-1999: Tier 2 (50%, star1 + star2)
  // 2000+: Tier 3 (100%, star2 + star3)
  const [userPoints] = useState(0); // Change this to test: 0, 1000, 2000, etc.
  const [lastUpdated] = useState('07/18/20');

  const handleRedeemPress = () => {
    // Navigate to RewardsDetail screen
    if (navigation) {
      navigation.navigate('RewardsDetail');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Title */}
        <View style={styles.headerContainer}>
          <AppText weight="serifTitle" style={styles.title}>
            <AppText weight="serifTitle" style={styles.titleLavu}>Lavu's </AppText>
            <AppText weight="serifTitle" style={styles.titleRewards}>Rewards</AppText>
          </AppText>
        </View>

        {/* Points Card */}
        <RewardsPointsCard
          points={userPoints}
          lastUpdated={lastUpdated}
          onRedeemPress={handleRedeemPress}
        />

        {/* Membership Progress */}
        <MembershipProgressBar
          currentPoints={userPoints}
        />
      </ScrollView>
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
    paddingBottom: Spacing.xl + Spacing.lg,
  },
  headerContainer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xs,
    alignItems: 'center',
  },
  title: {
    fontSize: scaleFontSize(38),
    textAlign: 'center',
    lineHeight: scaleFontSize(46),
  },
  titleLavu: {
    color: Colors.primary,
    fontSize: scaleFontSize(38),
  },
  titleRewards: {
    color: Colors.black,
    fontSize: scaleFontSize(38),
  },
});

export default RewardsScreen;
