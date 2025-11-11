import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable, TextInput, Image, SafeAreaView } from 'react-native';
import AppText from '@components/AppText';
import { CategoryIcons, CategoryKey, SearchIcons } from '@assets';
import { Colors, Spacing, Radius } from '@theme/tokens';

interface Props {
  onLoginPress?: () => void;
}

const FOOD_CATEGORIES = [
  { key: 'salad' as CategoryKey, label: 'Salad' },
  { key: 'drink' as CategoryKey, label: 'Drink' },
  { key: 'pizza' as CategoryKey, label: 'Pizza' },
  { key: 'dessert' as CategoryKey, label: 'Dessert' },
  { key: 'pasta' as CategoryKey, label: 'Pasta' },
];

const HomeScreen: React.FC<Props> = ({ onLoginPress }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('salad');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
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

        {/* Content Area - Placeholder for Popular Items */}
        <ScrollView
          style={styles.contentArea}
          showsVerticalScrollIndicator={false}
        >
          <AppText weight="serifTitle" style={styles.sectionTitle}>Popular</AppText>
          {/* Popular items will be added here */}
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
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.sm,
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
  },
  foodTypeSection: {
    marginBottom: Spacing.md,
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
    width: 42,
    height: 42,
    resizeMode: 'contain',
  },
  categoryLabel: {
    fontSize: 15,
    color: Colors.black,
    textAlign: 'center',
  },
  categoryLabelActive: {
    color: Colors.white,
  },
  contentArea: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
});

export default HomeScreen;
