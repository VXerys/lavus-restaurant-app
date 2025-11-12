import React from 'react';
import { View, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppText from '@components/common/AppText';
import { NavigationIcons, RatingIcons } from '@assets';
import { Colors, Spacing } from '@theme/tokens';
import { scaleFontSize, moderateScale } from '@utils/responsive';

interface Review {
  id: string;
  userName: string;
  rating: number;
  daysAgo: number;
  comment: string;
}

interface ReviewsScreenProps {
  onBack?: () => void;
  menuId?: string;
}

const ReviewsScreen: React.FC<ReviewsScreenProps> = ({ onBack }) => {
  // Mock reviews data - in production, this would come from API
  const reviews: Review[] = [
    {
      id: '1',
      userName: 'Wade Warren',
      rating: 5,
      daysAgo: 7,
      comment: 'I would recommend this for all of my friends!',
    },
    {
      id: '2',
      userName: 'Cameron Williamson',
      rating: 4,
      daysAgo: 3,
      comment: 'I love it so much!',
    },
    {
      id: '3',
      userName: 'Courtney Henry',
      rating: 4,
      daysAgo: 1,
      comment: 'Great restaurant and great dishes.',
    },
    {
      id: '4',
      userName: 'Jenny Wilson',
      rating: 5,
      daysAgo: 10,
      comment: 'I will recommend this for all of my friends.',
    },
    {
      id: '5',
      userName: 'Eleanor Pena',
      rating: 5,
      daysAgo: 2,
      comment: 'A very good experience!',
    },
    {
      id: '6',
      userName: 'Jacob Jones',
      rating: 5,
      daysAgo: 5,
      comment: 'It just good.',
    },
  ];

  const renderStars = (rating: number) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Image
            key={star}
            source={RatingIcons.star}
            style={[
              styles.starIcon,
              star > rating && styles.starIconDimmed,
            ]}
          />
        ))}
      </View>
    );
  };

  const formatDaysAgo = (days: number) => {
    if (days === 1) return '1 day ago';
    return `${days} days ago`;
  };

  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return parts[0][0] + parts[1][0];
    }
    return name[0];
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable 
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.backButtonPressed,
            ]} 
            onPress={onBack}
          >
            <Image source={NavigationIcons.back} style={styles.backIcon} />
          </Pressable>
        </View>

        {/* Title */}
        <View style={styles.titleContainer}>
          <AppText weight="serifTitle" style={styles.title}>
            Latest customer review
          </AppText>
        </View>

        {/* Reviews List */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {reviews.map((review) => (
            <Pressable
              key={review.id}
              style={({ pressed }) => [
                styles.reviewCard,
                pressed && styles.reviewCardPressed,
              ]}
            >
              <View style={styles.reviewHeader}>
                <View style={styles.userInfo}>
                  <View style={styles.avatar}>
                    <AppText weight="semiBold" style={styles.avatarText}>
                      {getInitials(review.userName)}
                    </AppText>
                  </View>
                  <View style={styles.userDetails}>
                    <AppText weight="semiBold" style={styles.userName}>
                      {review.userName}
                    </AppText>
                    <AppText weight="regular" style={styles.timeAgo}>
                      {formatDaysAgo(review.daysAgo)}
                    </AppText>
                  </View>
                </View>
                {renderStars(review.rating)}
              </View>
              <AppText weight="regular" style={styles.comment}>
                {review.comment}
              </AppText>
            </Pressable>
          ))}
        </ScrollView>
      </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(Spacing.lg),
    paddingVertical: moderateScale(Spacing.md),
    position: 'relative',
    backgroundColor: Colors.bg,
  },
  backButton: {
    width: moderateScale(44),
    height: moderateScale(44),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: moderateScale(Spacing.sm),
    zIndex: 10,
  },
  backButtonPressed: {
    opacity: 0.6,
    transform: [{ scale: 0.95 }],
  },
  backIcon: {
    width: moderateScale(24),
    height: moderateScale(24),
    tintColor: Colors.black,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: scaleFontSize(16),
    color: Colors.muted,
    flex: 1,
    textAlign: 'center',
  },
  titleContainer: {
    paddingHorizontal: moderateScale(Spacing.xl),
    paddingTop: moderateScale(Spacing.md),
    paddingBottom: moderateScale(Spacing.lg),
    backgroundColor: Colors.bg,
  },
  title: {
    fontSize: scaleFontSize(36),
    color: Colors.black,
    lineHeight: scaleFontSize(44),
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: moderateScale(Spacing.lg),
    paddingBottom: moderateScale(Spacing.xxl),
  },
  reviewCard: {
    backgroundColor: Colors.white,
    borderRadius: moderateScale(16),
    padding: moderateScale(16),
    marginBottom: moderateScale(16),
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
  reviewCardPressed: {
    backgroundColor: '#f8f8f8',
    opacity: 0.95,
    transform: [{ scale: 0.99 }],
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: moderateScale(12),
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: moderateScale(48),
    height: moderateScale(48),
    borderRadius: moderateScale(24),
    marginRight: moderateScale(12),
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: scaleFontSize(18),
    color: Colors.white,
    fontWeight: '600',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: scaleFontSize(16),
    color: Colors.black,
    marginBottom: moderateScale(4),
  },
  timeAgo: {
    fontSize: scaleFontSize(12),
    color: Colors.muted,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: moderateScale(3),
    marginLeft: moderateScale(8),
  },
  starIcon: {
    width: moderateScale(14),
    height: moderateScale(14),
    resizeMode: 'contain',
  },
  starIconDimmed: {
    opacity: 0.3,
  },
  comment: {
    fontSize: scaleFontSize(14),
    color: Colors.black,
    lineHeight: scaleFontSize(20),
  },
});

export default ReviewsScreen;
