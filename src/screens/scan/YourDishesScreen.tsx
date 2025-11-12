import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppText from '@components/common/AppText';
import Button from '@components/common/Button';
import DishCard from '@components/scan/DishCard';
import { NavigationIcons } from '@assets';
import { Colors, Spacing } from '@theme/tokens';
import {
  scaleFontSize,
  moderateScale,
  getButtonWidth,
} from '@utils/responsive';
import type { OrderItem } from '../../types';

interface YourDishesScreenProps {
  onBack?: () => void;
  onPayNow?: () => void;
}

const YourDishesScreen: React.FC<YourDishesScreenProps> = ({
  onBack,
  onPayNow,
}) => {
  // Mock data - sesuai dengan desain
  const orderItems: OrderItem[] = [
    {
      id: '1',
      name: 'Salmon Salad',
      description: 'Fresh salmon with mixed greens',
      price: 39,
      quantity: 1,
      image: require('@assets/images/menu/Salad-1.png'),
    },
    {
      id: '2',
      name: 'Macaroni Pasta',
      description: 'Creamy macaroni pasta',
      price: 49,
      quantity: 1,
      image: require('@assets/images/menu/Pasta-1.png'),
    },
    {
      id: '3',
      name: 'Fried Ice',
      description: 'Unique fried ice cream dessert',
      price: 19,
      quantity: 1,
      image: require('@assets/images/menu/Dessert-1.png'),
    },
  ];

  const calculateTotal = () => {
    return orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleDishPress = (item: OrderItem) => {
    // TODO: Navigate to dish detail or show info
    console.log('Dish pressed:', item.name);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.container}>
        {/* Header with Back Button */}
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

        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('@assets/images/logo-restaurant.png')}
            style={styles.logo}
          />
        </View>

        {/* Title */}
        <View style={styles.titleContainer}>
          <AppText weight="serifTitle" style={styles.title}>
            Your Dishes
          </AppText>
        </View>

        {/* Dishes List */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {orderItems.map((item) => (
            <DishCard
              key={item.id}
              item={item}
              onPress={() => handleDishPress(item)}
            />
          ))}

          {/* Total Section */}
          <View style={styles.totalContainer}>
            <View style={styles.totalContent}>
              <AppText weight="regular" style={styles.totalLabel}>
                Total
              </AppText>
              <View style={styles.totalSpacing} />
              <AppText weight="serifTitle" style={styles.totalAmount}>
                ${calculateTotal()}
              </AppText>
            </View>
          </View>
        </ScrollView>

        {/* Pay Now Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="Pay Now"
            variant="primary"
            width={getButtonWidth(0.5)}
            onPress={onPayNow}
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
  logoContainer: {
    alignItems: 'center',
    marginTop: moderateScale(Spacing.xs),
    marginBottom: moderateScale(Spacing.sm),
  },
  logo: {
    width: moderateScale(120),
    height: moderateScale(120),
    resizeMode: 'contain',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: moderateScale(Spacing.md),
  },
  title: {
    fontSize: scaleFontSize(30),
    color: Colors.black,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: moderateScale(Spacing.lg),
    paddingTop: moderateScale(Spacing.xs),
    paddingBottom: moderateScale(Spacing.sm),
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: moderateScale(Spacing.lg),
    marginBottom: moderateScale(Spacing.md),
    paddingTop: moderateScale(Spacing.sm),
  },
  totalContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: scaleFontSize(18),
    color: Colors.black,
    fontWeight: '400',
  },
  totalSpacing: {
    width: moderateScale(Spacing.lg),
  },
  totalAmount: {
    fontSize: scaleFontSize(25),
    color: Colors.black,
    fontWeight: '400',
  },
  buttonContainer: {
    alignItems: 'center',
    paddingHorizontal: moderateScale(Spacing.xl),
    paddingTop: moderateScale(Spacing.md),
    paddingBottom: moderateScale(Spacing.xxl),
    backgroundColor: Colors.white,
  },
});

export default YourDishesScreen;
