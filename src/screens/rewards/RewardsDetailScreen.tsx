import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppText } from '@components';
import { NavigationIcons } from '@assets';
import { Colors, Spacing } from '@theme/tokens';
import { scaleFontSize, moderateScale } from '@utils/responsive';
import { rewards } from '@mocks/data/rewards';

type RootStackParamList = {
  RewardsDetail: undefined;
  // ... other screens
};

type Props = NativeStackScreenProps<RootStackParamList, 'RewardsDetail'>;

interface RewardCardProps {
  id: string;
  name: string;
  points: number;
  image: any;
  onPress: () => void;
}

const RewardCard: React.FC<RewardCardProps> = ({
  name,
  points,
  image,
  onPress,
}) => {
  return (
    <Pressable style={styles.rewardCard} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.rewardImage} />
      </View>
      <AppText weight="serifTitle" style={styles.rewardName}>
        {name}
      </AppText>
      <AppText weight="regular" style={styles.rewardPoints}>
        {points} points
      </AppText>
    </Pressable>
  );
};

const RewardsDetailScreen: React.FC<Props> = ({ navigation }) => {
  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleRewardPress = (rewardId: string) => {
    // Navigate to RewardConfirmation screen
    navigation.navigate('RewardConfirmation' as any, { rewardId });
  };

  const rewards100to300 = rewards.filter((r: any) => r.category === '100-300');
  const rewards300to400 = rewards.filter((r: any) => r.category === '300-400');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.innerContainer}>
        {/* Header */}
        <View style={styles.headerSection}>
          <Pressable style={styles.backButton} onPress={handleBackPress}>
            <Image 
              source={NavigationIcons.back} 
              style={styles.backIcon} 
            />
          </Pressable>
          <View style={styles.titleContainer}>
            <AppText weight="serifTitle" style={styles.titleLavu}>
              Lavu's
            </AppText>
            <AppText weight="serifTitle" style={styles.titleRedeem}>
              {' '}Redeem
            </AppText>
          </View>
        </View>

        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
        {/* 100-300 points section */}
        <View style={styles.section}>
          <AppText weight="semiBold" style={styles.sectionTitle}>
            100-300 points
          </AppText>
          <View style={styles.grid}>
            {rewards100to300.map((reward: any) => (
              <RewardCard
                key={reward.id}
                id={reward.id}
                name={reward.name}
                points={reward.points}
                image={reward.image}
                onPress={() => handleRewardPress(reward.id)}
              />
            ))}
          </View>
        </View>

        {/* 300-400 points section */}
        <View style={styles.section}>
          <AppText weight="semiBold" style={styles.sectionTitle}>
            300-400 points
          </AppText>
          <View style={styles.grid}>
            {rewards300to400.map((reward: any) => (
              <RewardCard
                key={reward.id}
                id={reward.id}
                name={reward.name}
                points={reward.points}
                image={reward.image}
                onPress={() => handleRewardPress(reward.id)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContent: {
    paddingBottom: moderateScale(100),
  },
  headerSection: {
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.lg,
    paddingTop: moderateScale(8),
    paddingBottom: moderateScale(12),
  },
  backButton: {
    width: moderateScale(32),
    height: moderateScale(32),
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: moderateScale(8),
  },
  backIcon: {
    width: moderateScale(24),
    height: moderateScale(24),
    resizeMode: 'contain',
    tintColor: Colors.black,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    paddingTop: moderateScale(8),
    paddingBottom: moderateScale(16),
  },
  titleLavu: {
    fontSize: scaleFontSize(36),
    color: Colors.primary,
    fontWeight: '200',
    lineHeight: scaleFontSize(44),
  },
  titleRedeem: {
    fontSize: scaleFontSize(36),
    color: Colors.black,
    fontWeight: '200',
    lineHeight: scaleFontSize(44),
  },
  section: {
    marginBottom: moderateScale(32),
    paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.white,
    paddingTop: moderateScale(4),
    paddingBottom: moderateScale(8),
  },
  sectionTitle: {
    fontSize: scaleFontSize(20),
    color: Colors.black,
    marginBottom: moderateScale(20),
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  rewardCard: {
    width: '48%',
    backgroundColor: Colors.white,
    borderRadius: moderateScale(16),
    padding: moderateScale(16),
    marginBottom: moderateScale(16),
    alignItems: 'center',
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    // Android Shadow
    elevation: 3,
  },
  imageContainer: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(50),
    overflow: 'hidden',
    marginBottom: moderateScale(12),
    backgroundColor: Colors.bg,
  },
  rewardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  rewardName: {
    fontSize: scaleFontSize(16),
    color: Colors.black,
    marginBottom: moderateScale(4),
    textAlign: 'center',
    fontWeight: '500',
  },
  rewardPoints: {
    fontSize: scaleFontSize(13),
    color: Colors.muted,
    fontWeight: '300',
  },
});

export default RewardsDetailScreen;
