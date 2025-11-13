import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Pressable, Image, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText, MenuCard, InfoOverlay, UserAvatar } from '@components';
import { SearchModal } from '@components/home';
import { CategoryIcons, CategoryKey, SearchIcons, MenuImages } from '@assets';
import { Colors, Spacing, Radius } from '@theme/tokens';
import { fetchMenuItemsByCategory, MenuItemFirestore } from '@services/firestoreService';
import { getMenuItemsByCategory, saladMenuItems, drinkMenuItems, pizzaMenuItems, dessertMenuItems, pastaMenuItems } from '@mocks/data/popularMenus';
import { useAuth } from '../../contexts/AuthContext';

// Helper to get local image from imagePath
const getLocalImage = (imagePath?: string, category?: string, id?: string) => {
  if (!imagePath && !id) return require('@assets/images/MenuImages/placeholder.png');
  
  // Match with local assets based on category and id
  const allMenus = [
    ...saladMenuItems,
    ...drinkMenuItems,
    ...pizzaMenuItems,
    ...dessertMenuItems,
    ...pastaMenuItems,
  ];
  
  const localMenu = allMenus.find(m => m.id === id);
  return localMenu?.image || require('@assets/images/MenuImages/placeholder.png');
};

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

const HomeScreenWithFirestore: React.FC<Props> = ({ onLoginPress, navigation }) => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('salad');
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [voiceInfoVisible, setVoiceInfoVisible] = useState(false);
  
  // Firestore state
  const [menuItems, setMenuItems] = useState<MenuItemFirestore[]>([]);
  const [loading, setLoading] = useState(false);
  const [useFirestore, setUseFirestore] = useState(false); // Toggle between Firestore and mock data

  const handleVoiceSearch = () => {
    setVoiceInfoVisible(true);
  };

  const handleProfilePress = () => {
    if (navigation) {
      navigation.navigate('Settings');
    }
  };

  // Fetch menu items from Firestore
  useEffect(() => {
    if (!useFirestore) return;

    const loadMenuItems = async () => {
      setLoading(true);
      try {
        const data = await fetchMenuItemsByCategory(selectedCategory);
        setMenuItems(data);
      } catch (error) {
        console.error('Error loading menu items:', error);
        Alert.alert(
          'Error',
          'Failed to load menu items. Using offline data instead.',
          [
            {
              text: 'OK',
              onPress: () => setUseFirestore(false),
            },
          ]
        );
      } finally {
        setLoading(false);
      }
    };

    loadMenuItems();
  }, [selectedCategory, useFirestore]);

  // Get display menu items (Firestore or mock data)
  const displayedMenuItems = useFirestore 
    ? menuItems.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        rating: item.rating,
        reviewCount: item.reviewCount,
        // Use local image if imagePath exists, otherwise use imageUrl
        image: item.imagePath 
          ? getLocalImage(item.imagePath, item.category, item.id)
          : item.imageUrl 
            ? { uri: item.imageUrl } 
            : getLocalImage(undefined, item.category, item.id),
        category: item.category,
      }))
    : getMenuItemsByCategory(selectedCategory as 'salad' | 'drink' | 'pizza' | 'dessert' | 'pasta');

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* AppBar with Greeting and User Profile */}
        <View style={styles.appBar}>
          <View style={styles.greetingContainer}>
            <AppText weight="serifTitle" style={styles.greeting}>
              {user ? `Hello, ${user.displayName?.split(' ')[0] || 'User'}!` : 'Good morning!'}
            </AppText>
            <View style={styles.underline} />
          </View>
          {user ? (
            <UserAvatar
              displayName={user.displayName}
              photoURL={user.photoURL}
              size="medium"
              onPress={handleProfilePress}
            />
          ) : (
            <Pressable
              style={({ pressed }) => [
                styles.loginButton,
                pressed && styles.loginButtonPressed,
              ]}
              onPress={onLoginPress}
            >
              <View style={styles.loginButtonInner}>
                <AppText weight="semiBold" style={styles.loginButtonText}>Login Now</AppText>
              </View>
            </Pressable>
          )}
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Pressable 
            style={styles.searchBarPressable} 
            onPress={() => setSearchModalVisible(true)}
          >
            <Image source={SearchIcons.search} style={styles.searchIconImage} />
            <View style={styles.searchInput}>
              <AppText weight="regular" style={styles.searchPlaceholder}>
                What are you looking for?
              </AppText>
            </View>
          </Pressable>
          <Pressable onPress={handleVoiceSearch} style={styles.micButton}>
            <Image source={SearchIcons.mic} style={styles.micIconImage} />
          </Pressable>
        </View>

        {/* Data Source Toggle (Development Only) */}
        {__DEV__ && (
          <View style={styles.devToggleContainer}>
            <Pressable
              style={[styles.devToggle, useFirestore && styles.devToggleActive]}
              onPress={() => setUseFirestore(!useFirestore)}
            >
              <AppText weight="medium" style={styles.devToggleText}>
                {useFirestore ? '🔥 Firestore' : '📦 Mock Data'}
              </AppText>
            </Pressable>
          </View>
        )}

        {/* Category Tabs */}
        <View style={styles.categoryContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScroll}
          >
            {FOOD_CATEGORIES.map(({ key, label }) => {
              const isSelected = selectedCategory === key;
              const IconComponent = CategoryIcons[key];

              return (
                <Pressable
                  key={key}
                  style={[styles.categoryTab, isSelected && styles.categoryTabActive]}
                  onPress={() => setSelectedCategory(key)}
                >
                  <IconComponent
                    width={24}
                    height={24}
                    fill={isSelected ? Colors.white : Colors.muted}
                  />
                  <AppText
                    weight={isSelected ? 'semiBold' : 'regular'}
                    style={[styles.categoryLabel, isSelected && styles.categoryLabelActive]}
                  >
                    {label}
                  </AppText>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* Popular Menu Title */}
        <View style={styles.popularHeaderContainer}>
          <AppText weight="serifTitle" style={styles.popularTitle}>
            Popular Menu
          </AppText>
        </View>

        {/* Menu List with Loading State */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.menuListContainer}
          showsVerticalScrollIndicator={false}
        >
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.primary} />
              <AppText weight="regular" style={styles.loadingText}>
                Loading menu items...
              </AppText>
            </View>
          ) : displayedMenuItems.length === 0 ? (
            <View style={styles.emptyContainer}>
              <AppText weight="medium" style={styles.emptyText}>
                No menu items available
              </AppText>
              <AppText weight="regular" style={styles.emptySubtext}>
                {useFirestore 
                  ? 'Add items to Firestore database'
                  : 'Check your mock data configuration'}
              </AppText>
            </View>
          ) : (
            displayedMenuItems.map(item => (
              <MenuCard
                key={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                rating={item.rating}
                reviewCount={item.reviewCount}
                image={item.image}
                onPress={() => {
                  if (navigation) {
                    navigation.navigate('MenuDetail', { menuId: item.id });
                  }
                }}
              />
            ))
          )}
        </ScrollView>

        {/* Search Modal */}
        <SearchModal
          visible={searchModalVisible}
          onClose={() => setSearchModalVisible(false)}
          navigation={navigation}
        />

        {/* Voice Search Info Overlay */}
        <InfoOverlay
          visible={voiceInfoVisible}
          title="Voice Search"
          message="Voice search feature is coming soon! Stay tuned for updates."
          onClose={() => setVoiceInfoVisible(false)}
        />
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
  },
  greetingContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: 24,
    color: Colors.text,
  },
  underline: {
    width: 40,
    height: 3,
    backgroundColor: Colors.primary,
    marginTop: 4,
    borderRadius: 2,
  },
  loginButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.sm,
  },
  loginButtonPressed: {
    opacity: 0.8,
  },
  loginButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginButtonText: {
    color: Colors.white,
    fontSize: 14,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
  },
  searchBarPressable: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    gap: Spacing.sm,
  },
  searchIconImage: {
    width: 20,
    height: 20,
    tintColor: Colors.muted,
  },
  searchInput: {
    flex: 1,
  },
  searchPlaceholder: {
    fontSize: 14,
    color: Colors.muted,
  },
  micButton: {
    backgroundColor: Colors.white,
    width: 48,
    height: 48,
    borderRadius: Radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  micIconImage: {
    width: 20,
    height: 20,
    tintColor: Colors.primary,
  },
  devToggleContainer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.sm,
    alignItems: 'center',
  },
  devToggle: {
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.pill,
    borderWidth: 1,
    borderColor: Colors.dotInactive,
  },
  devToggleActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  devToggleText: {
    fontSize: 12,
    color: Colors.text,
  },
  categoryContainer: {
    paddingVertical: Spacing.sm,
  },
  categoryScroll: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  categoryTab: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.sm,
    backgroundColor: Colors.white,
    minWidth: 72,
  },
  categoryTabActive: {
    backgroundColor: Colors.primary,
  },
  categoryLabel: {
    fontSize: 12,
    color: Colors.muted,
    marginTop: 4,
  },
  categoryLabelActive: {
    color: Colors.white,
  },
  popularHeaderContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  popularTitle: {
    fontSize: 20,
    color: Colors.text,
  },
  scrollView: {
    flex: 1,
  },
  menuListContainer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl + Spacing.xl,
  },
  loadingContainer: {
    paddingVertical: Spacing.xxl,
    alignItems: 'center',
    gap: Spacing.md,
  },
  loadingText: {
    fontSize: 14,
    color: Colors.muted,
  },
  emptyContainer: {
    paddingVertical: Spacing.xxl,
    alignItems: 'center',
    gap: Spacing.xs,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.text,
  },
  emptySubtext: {
    fontSize: 12,
    color: Colors.muted,
    textAlign: 'center',
  },
});

export default HomeScreenWithFirestore;
