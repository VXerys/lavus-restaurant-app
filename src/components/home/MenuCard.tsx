import React from 'react';
import { View, StyleSheet, Image, Pressable, ImageSourcePropType } from 'react-native';
import AppText from '../common/AppText';
import { Colors, Spacing } from '@theme/tokens';
import { RatingIcons } from '@assets';

interface MenuCardProps {
  image: ImageSourcePropType;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  onPress?: () => void;
}

const MenuCard: React.FC<MenuCardProps> = ({
  image,
  name,
  description,
  price,
  rating,
  reviewCount,
  onPress,
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
      onPress={onPress}
    >
      {/* Image Circle */}
      <View style={styles.imageContainer}>
        <View style={styles.imageCircle}>
          <Image source={image} style={styles.image} />
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Title and Price Row */}
        <View style={styles.titleRow}>
          <AppText weight="serifTitle" style={styles.name}>{name}</AppText>
          <AppText weight="serifTitle" style={styles.price}>{price}$</AppText>
        </View>

        {/* Description */}
        <AppText weight="regular" style={styles.description}>
          {description}
        </AppText>

        {/* Rating */}
        <View style={styles.ratingContainer}>
          <View style={styles.starContainer}>
            <Image source={RatingIcons.star} style={styles.starIcon} />
            <AppText weight="medium" style={styles.ratingText}>
              {rating.toFixed(1)}
            </AppText>
          </View>
          <AppText weight="regular" style={styles.reviewCount}>
            ({reviewCount})
          </AppText>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 20,
    marginBottom: Spacing.md,
    padding: Spacing.md,
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    // Android Shadow
    elevation: 4,
  },
  cardPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  imageCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    // iOS Shadow for depth
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    // Android Shadow
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  name: {
    fontSize: 20,
    color: Colors.black,
    flex: 1,
    marginRight: Spacing.sm,
  },
  price: {
    fontSize: 20,
    color: Colors.black,
  },
  description: {
    fontSize: 13,
    color: Colors.muted,
    marginBottom: Spacing.sm,
    lineHeight: 18,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Spacing.xs,
  },
  starIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
    resizeMode: 'contain',
  },
  ratingText: {
    fontSize: 13,
    color: Colors.black,
  },
  reviewCount: {
    fontSize: 13,
    color: Colors.muted,
  },
});

export default MenuCard;
