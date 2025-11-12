import React from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import AppText from '@components/common/AppText';
import { Colors, Spacing, Radius } from '@theme/tokens';
import { scaleFontSize, moderateScale } from '@utils/responsive';
import type { OrderItem } from '../../types';

interface DishCardProps {
  item: OrderItem;
  onPress?: () => void;
}

const DishCard: React.FC<DishCardProps> = ({ item, onPress }) => {
  const formatPrice = (price: number) => {
    return `$${price}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={item.image}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      
      <View style={styles.content}>
        <View style={styles.leftContent}>
          <AppText weight="serifTitle" style={styles.dishName}>
            {item.name}
          </AppText>
          <Pressable
            style={({ pressed }) => [
              styles.infoButton,
              pressed && styles.infoButtonPressed,
            ]}
            onPress={onPress}
          >
            <AppText weight="regular" style={styles.infoText}>
              Food Info
            </AppText>
          </Pressable>
        </View>
        
        <View style={styles.rightContent}>
          <AppText weight="regular" style={styles.quantityText}>
            x{item.quantity}
          </AppText>
          <View style={styles.priceSpacing} />
          <AppText weight="serifTitle" style={styles.price}>
            {formatPrice(item.price * item.quantity)}
          </AppText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: moderateScale(Radius.lg),
    padding: moderateScale(Spacing.lg),
    marginBottom: moderateScale(Spacing.md),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: moderateScale(1),
    },
    shadowOpacity: 0.08,
    shadowRadius: moderateScale(4),
    elevation: 2,
  },
  imageContainer: {
    width: moderateScale(72),
    height: moderateScale(72),
    borderRadius: moderateScale(12),
    overflow: 'hidden',
    backgroundColor: Colors.bg,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    marginLeft: moderateScale(Spacing.md),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContent: {
    flex: 1,
    justifyContent: 'center',
  },
  dishName: {
    fontSize: scaleFontSize(20),
    color: Colors.black,
    marginBottom: moderateScale(4),
    lineHeight: scaleFontSize(25),
    fontWeight: '600',

  },
  infoButton: {
    alignSelf: 'flex-start',
  },
  infoButtonPressed: {
    opacity: 0.6,
  },
  infoText: {
    fontSize: scaleFontSize(14),
    color: Colors.muted,
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginLeft: moderateScale(Spacing.md),
  },
  quantityText: {
    fontSize: scaleFontSize(14),
    color: Colors.black,
  },
  priceSpacing: {
    width: moderateScale(Spacing.md),
  },
  price: {
    fontSize: scaleFontSize(25),
    color: Colors.black,
    lineHeight: scaleFontSize(25),
  },
});

export default DishCard;
