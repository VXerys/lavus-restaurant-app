import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Pressable,
  TextInput,
  Image,
  ScrollView,
  Animated,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppText from '@components/common/AppText';
import InfoOverlay from '@components/common/InfoOverlay';
import MenuCard from '@components/home/MenuCard';
import { SearchIcons } from '@assets';
import { Colors, Spacing, Radius } from '@theme/tokens';
import { scaleFontSize, moderateScale } from '@utils/responsive';
import {
  getAllMenuItems,
  PopularMenuItem,
} from '@mocks/data/popularMenus';

interface SearchModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectItem: (itemId: string) => void;
}

// Trending keywords
const TRENDING_KEYWORDS = [
  'Salmon Salad',
  'Shrimp Salad',
  'Rotini Pasta',
  'Maccaroni Pasta',
  'Ikes Berry Smoothie',
  'Fried Ice',
  'Ice Cream',
  'Voucher 10%',
  'Customer Benifits',
];

const SearchModal: React.FC<SearchModalProps> = ({ visible, onClose, onSelectItem }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<PopularMenuItem[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [voiceInfoVisible, setVoiceInfoVisible] = useState(false);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    if (visible) {
      // Reset animations
      fadeAnim.setValue(0);
      slideAnim.setValue(50);
      
      // Animate in
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, fadeAnim, slideAnim]);

  // Search function
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const allItems = getAllMenuItems();
      const query = searchQuery.toLowerCase();
      
      const filtered = allItems.filter((item) => {
        return (
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
        );
      });
      
      setSearchResults(filtered);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [searchQuery]);

  const handleClose = () => {
    Keyboard.dismiss();
    setSearchQuery('');
    setShowResults(false);
    onClose();
  };

  const handleTrendingClick = (keyword: string) => {
    setSearchQuery(keyword);
  };

  const handleSelectItem = (itemId: string) => {
    handleClose();
    onSelectItem(itemId);
  };

  const handleVoiceSearch = () => {
    setVoiceInfoVisible(true);
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={handleClose}
      statusBarTranslucent
    >
      <SafeAreaView style={styles.modalContainer} edges={['top']}>
        <Animated.View
          style={[
            styles.modalContent,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Search Header */}
          <View style={styles.searchHeader}>
            <View style={styles.searchInputContainer}>
              <Image source={SearchIcons.search} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="What are you looking for?"
                placeholderTextColor={Colors.muted}
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus
                returnKeyType="search"
              />
              <Pressable onPress={handleVoiceSearch}>
                <Image source={SearchIcons.mic} style={styles.micIcon} />
              </Pressable>
            </View>
            
            <Pressable onPress={handleClose} style={styles.cancelButton}>
              <AppText weight="regular" style={styles.cancelText}>
                Cancel
              </AppText>
            </Pressable>
          </View>

          {/* Content */}
          <ScrollView
            style={styles.contentContainer}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {!showResults ? (
              // Trending Section
              <View style={styles.trendingSection}>
                <AppText weight="semiBold" style={styles.trendingTitle}>
                  Trending
                </AppText>
                <View style={styles.trendingContainer}>
                  {TRENDING_KEYWORDS.map((keyword, index) => (
                    <Pressable
                      key={index}
                      style={({ pressed }) => [
                        styles.trendingChip,
                        pressed && styles.trendingChipPressed,
                      ]}
                      onPress={() => handleTrendingClick(keyword)}
                    >
                      <AppText weight="regular" style={styles.trendingChipText}>
                        {keyword}
                      </AppText>
                    </Pressable>
                  ))}
                </View>
              </View>
            ) : (
              // Search Results
              <View style={styles.resultsSection}>
                <AppText weight="semiBold" style={styles.resultsTitle}>
                  {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
                </AppText>
                
                {searchResults.length > 0 ? (
                  <View style={styles.resultsContainer}>
                    {searchResults.map((item) => (
                      <MenuCard
                        key={item.id}
                        image={item.image}
                        name={item.name}
                        description={item.description}
                        price={item.price}
                        rating={item.rating}
                        reviewCount={item.reviewCount}
                        onPress={() => handleSelectItem(item.id)}
                      />
                    ))}
                  </View>
                ) : (
                  <View style={styles.noResultsContainer}>
                    <AppText weight="regular" style={styles.noResultsText}>
                      No items found for "{searchQuery}"
                    </AppText>
                    <AppText weight="regular" style={styles.noResultsSubtext}>
                      Try searching with different keywords
                    </AppText>
                  </View>
                )}
              </View>
            )}
          </ScrollView>

          {/* Voice Search Info Overlay */}
          <InfoOverlay
            visible={voiceInfoVisible}
            icon="🎤"
            title="Voice Search"
            message="Voice search feature is coming soon!"
            onClose={() => setVoiceInfoVisible(false)}
          />
        </Animated.View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  modalContent: {
    flex: 1,
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bg,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    marginRight: Spacing.md,
  },
  searchIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
    marginRight: Spacing.sm,
    tintColor: Colors.muted,
    resizeMode: 'contain',
  },
  searchInput: {
    flex: 1,
    fontSize: scaleFontSize(14),
    color: Colors.text,
    fontFamily: 'OpenSans-Regular',
    padding: 0,
  },
  micIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
    marginLeft: Spacing.sm,
    tintColor: Colors.muted,
    resizeMode: 'contain',
  },
  cancelButton: {
    paddingVertical: Spacing.xs,
  },
  cancelText: {
    fontSize: scaleFontSize(14),
    color: Colors.black,
  },
  contentContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.xl,
  },
  trendingSection: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
  },
  trendingTitle: {
    fontSize: scaleFontSize(16),
    color: Colors.black,
    marginBottom: Spacing.md,
  },
  trendingContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  trendingChip: {
    backgroundColor: Colors.bg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.pill,
    borderWidth: 1,
    borderColor: Colors.black,
  },
  trendingChipPressed: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  trendingChipText: {
    fontSize: scaleFontSize(14),
    color: Colors.black,
  },
  resultsSection: {
    flex: 1,
  },
  resultsTitle: {
    fontSize: scaleFontSize(16),
    color: Colors.black,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  resultsContainer: {
    paddingHorizontal: Spacing.lg,
  },
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: moderateScale(60),
    paddingHorizontal: Spacing.xl,
  },
  noResultsText: {
    fontSize: scaleFontSize(16),
    color: Colors.black,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  noResultsSubtext: {
    fontSize: scaleFontSize(14),
    color: Colors.muted,
    textAlign: 'center',
  },
});

export default SearchModal;
