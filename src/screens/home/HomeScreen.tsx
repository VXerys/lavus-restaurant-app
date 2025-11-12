import React, { useState, useMemo } from 'react';
import { View, StyleSheet, ScrollView, Pressable, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText, MenuCard } from '@components';
import { CategoryIcons, CategoryKey, SearchIcons } from '@assets';
import { Colors, Spacing, Radius } from '@theme/tokens';
import { getMenuItemsByCategory } from '@mocks/data/popularMenus';

interface Props {
  onLoginPress?: () => void;
  navigation?: any;
}

const FOOD_CATEGORIES = [
  { key: 'salad' as CategoryKey, label: 'Salad' },
  { key: 'drink' as CategoryKey, label: 'Drink' },
  { key: 'pizza' as CategoryKey, label: 'Pizza' },
  { key: 'dessert' as CategoryKey, label: 'Dessert' },
  { key: 'pasta' as CategoryKey, label: 'Pasta' },
] as const;

const HomeScreen: React.FC<Props> = ({ onLoginPress, navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('salad');
  const [searchQuery, setSearchQuery] = useState('');

  // Get menu items based on selected category
  const displayedMenuItems = useMemo(() => {
    // Type guard to ensure we only pass valid categories to getMenuItemsByCategory
    const validCategories: Array<'salad' | 'drink' | 'pizza' | 'dessert' | 'pasta'> = ['salad', 'drink', 'pizza', 'dessert', 'pasta'];
    if (validCategories.includes(selectedCategory as any)) {
      return getMenuItemsByCategory(selectedCategory as 'salad' | 'drink' | 'pizza' | 'dessert' | 'pasta');
    }
    // Default fallback to salad if category not found
    return getMenuItemsByCategory('salad');
  }, [selectedCategory]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* AppBar with Greeting and Login Button */}
        <View style={styles.appBar}>
          <View style={styles.greetingContainer}>
            <AppText weight="serifTitle" style={styles.greeting}>Good morning!</AppText>
            <View style={styles.underline} />
          </View>
          <Pressable
            style={styles.loginButton}
            onPress={onLoginPress}
          >
            <View style={styles.loginButtonInner}>
              <AppText weight="semiBold" style={styles.loginButtonText}>Login Now</AppText>
            </View>
          </Pressable>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Image source={SearchIcons.search} style={styles.searchIconImage} />
          <TextInput
            style={styles.searchInput}
            placeholder="What are you looking for?"
            placeholderTextColor={Colors.muted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Image source={SearchIcons.mic} style={styles.micIconImage} />
        </View>

        {/* Food Type Section */}
        <View style={styles.foodTypeSection}>
          <AppText weight="serifTitle" style={styles.sectionTitle}>Food type</AppText>
          
          <View style={styles.categoriesScrollWrapper}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesContainer}
            >
              {FOOD_CATEGORIES.map((category) => {
                const isSelected = selectedCategory === category.key;
                return (
                  <Pressable
                    key={category.key}
                    style={styles.categoryItem}
                    onPress={() => setSelectedCategory(category.key)}
                  >
                    <View style={[
                      styles.categoryIconContainer,
                      isSelected && styles.categoryIconContainerActive,
                    ]}>
                      <View style={styles.categoryIconCircle}>
                        <Image
                          source={isSelected ? CategoryIcons[category.key].active : CategoryIcons[category.key].inactive}
                          style={styles.categoryIcon}
                        />
                      </View>
                      <AppText
                        weight={isSelected ? 'semiBold' : 'regular'}
                        style={[
                          styles.categoryLabel,
                          isSelected && styles.categoryLabelActive,
                        ]}
                      >
                        {category.label}
                      </AppText>
                    </View>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </View>

        {/* Popular Section Header - Fixed */}
        <View style={styles.popularHeader}>
          <AppText weight="serifTitle" style={styles.popularTitle}>Popular</AppText>
        </View>

        {/* Content Area - Scrollable Popular Items */}
        <ScrollView
          style={styles.contentArea}
          contentContainerStyle={styles.contentAreaContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Popular Menu Items */}
          <View style={styles.popularContainer}>
            {displayedMenuItems.map((item) => (
              <MenuCard
                key={item.id}
                image={item.image}
                name={item.name}
                description={item.description}
                price={item.price}
                rating={item.rating}
                reviewCount={item.reviewCount}
                onPress={() => {
                  if (navigation) {
                    navigation.navigate('MenuDetail', { menuId: item.id });
                  } else {
                    console.log('Menu item pressed:', item.name);
                  }
                }}
              />
            ))}
          </View>
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
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
    backgroundColor: Colors.bg,
  },
  greetingContainer: {
    position: 'relative',
  },
  greeting: {
    fontSize: 24,
    color: Colors.black,
    marginBottom: 2,
  },
  underline: {
    position: 'absolute',
    bottom: -2,
    left: 0,
    width: '70%',
    height: 3,
    backgroundColor: Colors.primary,
  },
  loginButton: {
    backgroundColor: Colors.black,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: Radius.sm,
  },
  loginButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginButtonText: {
    fontSize: 13,
    color: Colors.primary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.md,
    marginBottom: Spacing.md,
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  searchIconImage: {
    width: 20,
    height: 20,
    marginRight: Spacing.sm,
    tintColor: Colors.muted,
    resizeMode: 'contain',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
    fontFamily: 'OpenSans-Regular',
    padding: 0,
  },
  micIconImage: {
    width: 20,
    height: 20,
    marginLeft: Spacing.sm,
    tintColor: Colors.muted,
    resizeMode: 'contain',
  },
  foodTypeSection: {
    marginTop: Spacing.md,
    marginBottom: Spacing.xs, // Increase spacing untuk ruang shadow
  },
  categoriesScrollWrapper: {
    overflow: 'visible', // Allow shadows to be visible outside bounds
  },
  sectionTitle: {
    fontSize: 20,
    color: Colors.black,
    marginLeft: Spacing.lg,
    marginBottom: Spacing.md,
  },
  categoriesContainer: {
    paddingLeft: Spacing.lg,
    paddingRight: Spacing.lg,
    paddingBottom: Spacing.lg, // Extra padding untuk shadow category icons yang lebih besar
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  categoryIconContainer: {
    width: 75,
    height: 130,
    backgroundColor: Colors.white,
    borderRadius: 60,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: Spacing.lg + Spacing.xs,
    paddingBottom: Spacing.lg,
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: { 

      width: 0, 
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    // Android Shadow
    elevation: 5,
  },
  categoryIconContainerActive: {
    backgroundColor: Colors.primary,
    // iOS Shadow - Stronger for active state
    shadowOffset: { 
      width: 0, 
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    // Android Shadow - Higher elevation
    elevation: 8,
  },
  categoryIconCircle: {
    width: 55,
    height: 55,
    borderRadius: 36.5,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
    // iOS Shadow - Subtle inner circle shadow
    shadowColor: '#000',
    shadowOffset: { 
      width: 0, 
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Android Shadow
    elevation: 3,
  },
  categoryIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    shadowColor: '#000',
    shadowOffset: { 
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryLabel: {
    fontSize: 15,
    color: Colors.black,
    textAlign: 'center',
  },
  categoryLabelActive: {
    color: Colors.white,
  },
  popularHeader: {
    backgroundColor: Colors.bg,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.sm,
  },
  popularTitle: {
    fontSize: 20,
    color: Colors.black,
  },
  contentArea: {
    flex: 1,
  },
  contentAreaContainer: {
    paddingBottom: Spacing.xl + Spacing.lg, // Extra padding for bottom tab bar
  },
  popularContainer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xl,
  },
});

export default HomeScreen;
