import React from 'react';
import { View, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppText from '@components/common/AppText';
import Button from '@components/common/Button';
import { NavigationIcons, RatingIcons } from '@assets';
import { Colors, Spacing } from '@theme/tokens';
import { 
  screenWidth, 
  scaleFontSize, 
  moderateScale, 
  getButtonWidth,
  scaleHeight,
  isSmallDevice 
} from '@utils/responsive';
import { getMenuDetail } from '@mocks/data/menuDetails';

interface MenuDetailScreenProps {
  onBack?: () => void;
  onReserve?: () => void;
  menuId?: string;
}

const MenuDetailScreen: React.FC<MenuDetailScreenProps> = ({ 
  onBack, 
  onReserve,
  menuId = 'salad-1',
}) => {
  // Get menu data from mock with proper error handling
  const menuData = getMenuDetail(menuId);
  
  // Fallback if menu not found
  if (!menuData) {
    console.warn(`Menu with ID "${menuId}" not found. Falling back to default.`);
  }
  
  const displayData = menuData || {
    id: 'salad-1',
    name: 'Salmon Salad',
    image: require('@assets/images/menu/Salad-1.png'),
    rating: 4.8,
    reviewCount: 350,
    calories: 200,
    category: 'salad' as const,
    description: 'Fresh Norwegian salmon grilled to perfection, served on a bed of crispy mixed greens, cherry tomatoes, cucumber, and red onion. Topped with our signature lemon herb dressing and garnished with toasted sesame seeds. This protein-rich dish is perfect for a healthy lunch or light dinner.',
  };
  
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* Header with Back Button */}
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={onBack}>
            <Image source={NavigationIcons.back} style={styles.backIcon} />
          </Pressable>
          <AppText weight="regular" style={styles.headerTitle}>Food info</AppText>
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Food Image */}
          <View style={styles.imageContainer}>
            <Image source={displayData.image} style={styles.foodImage} />
          </View>

          {/* Food Info Section */}
          <View style={styles.infoSection}>
            {/* Food Name */}
            <AppText weight="serifTitle" style={styles.foodName}>
              {displayData.name}
            </AppText>

            {/* Rating and Calories Row */}
            <View style={styles.metaRow}>
              {/* Rating */}
              <View style={styles.ratingContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Image 
                    key={star}
                    source={RatingIcons.star} 
                    style={[
                      styles.starIcon,
                      star > Math.floor(displayData.rating) && styles.starIconDimmed
                    ]} 
                  />
                ))}
                <Pressable>
                  <AppText weight="regular" style={styles.reviewText}>
                    {displayData.reviewCount} reviews ›
                  </AppText>
                </Pressable>
              </View>

              {/* Calories */}
              <View style={styles.caloriesContainer}>
                <AppText weight="regular" style={styles.caloriesEmoji}>🔥</AppText>
                <AppText weight="regular" style={styles.caloriesText}>
                  {displayData.calories} Calories
                </AppText>
              </View>
            </View>

            {/* Description */}
            <AppText weight="regular" style={styles.description}>
              {displayData.description}
            </AppText>
          </View>
        </ScrollView>

        {/* Reserve Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="Reserve now"
            variant="primary"
            width={getButtonWidth(0.88)}
            onPress={onReserve}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(Spacing.lg),
    paddingVertical: moderateScale(Spacing.md),
    position: 'relative',
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: moderateScale(Spacing.xxl),
  },
  imageContainer: {
    width: screenWidth,
    height: isSmallDevice ? scaleHeight(280) : scaleHeight(340),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.bg,
    paddingVertical: moderateScale(Spacing.xl),
  },
  foodImage: {
    width: screenWidth * 0.85,
    height: '100%',
    resizeMode: 'contain',
  },
  infoSection: {
    paddingHorizontal: moderateScale(Spacing.xl),
    paddingTop: moderateScale(Spacing.lg),
  },
  foodName: {
    fontSize: scaleFontSize(40),
    color: Colors.black,
    marginBottom: moderateScale(Spacing.md),
    lineHeight: scaleFontSize(48),
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: moderateScale(Spacing.lg),
    flexWrap: 'wrap',
    gap: moderateScale(Spacing.sm),
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(4),
  },
  starIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain',
  },
  starIconDimmed: {
    opacity: 0.3,
  },
  reviewText: {
    fontSize: scaleFontSize(14),
    color: Colors.black,
    marginLeft: moderateScale(Spacing.xs),
  },
  caloriesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(Spacing.xs),
  },
  caloriesEmoji: {
    fontSize: scaleFontSize(18),
  },
  caloriesText: {
    fontSize: scaleFontSize(16),
    color: Colors.black,
  },
  description: {
    fontSize: scaleFontSize(15),
    color: Colors.muted,
    lineHeight: scaleFontSize(24),
    textAlign: 'left',
  },
  buttonContainer: {
    paddingHorizontal: moderateScale(Spacing.xl),
    paddingVertical: moderateScale(Spacing.lg),
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    alignItems: 'center',
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: { 
      width: 0, 
      height: -2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    // Android Shadow
    elevation: 4,
  },
});

export default MenuDetailScreen;
