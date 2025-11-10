import React, { useCallback, useState } from 'react';
import { View, Image, StyleSheet, Dimensions, FlatList, ListRenderItemInfo, Pressable } from 'react-native';
import AppText from '@components/AppText';
import PagerDots from '@components/PagerDots';
import { Colors, Spacing } from '@theme/tokens';

const { width } = Dimensions.get('window');

interface Slide {
  key: string;
  title: string;
  subtitle: string;
  image: any;
}

const slides: Slide[] = [
  {
    key: 'joy',
    title: 'Joyfulness',
    subtitle: 'Enjoy happy moments with family',
    image: require('@assets/images/onboarding/splash-1.png'),
  },
  {
    key: 'conv',
    title: 'Convenience',
    subtitle: 'All your favorite foods in one place with online reservation feature',
    image: require('@assets/images/onboarding/splash-2.png'),
  },
  {
    key: 'reviews',
    title: 'Enjoy & Reviews',
    subtitle: 'Enjoy all your great food, review and share your experience.',
    image: require('@assets/images/onboarding/splash-3.png'),
  },
];

const OnboardingScreen: React.FC<{ onDone?: () => void }> = ({ onDone }) => {
  const [index, setIndex] = useState(0);
  const onViewableItemsChanged = useCallback(({ viewableItems }: any) => {
    if (viewableItems?.length) {
      setIndex(viewableItems[0].index || 0);
    }
  }, []);

  const viewConfigRef = { viewAreaCoveragePercentThreshold: 50 };

  const renderItem = ({ item }: ListRenderItemInfo<Slide>) => (
    <View style={[styles.slide, { width }]}>      
      <Image source={item.image} style={styles.image} />
      <AppText weight="serifTitle" style={styles.title}>{item.title}</AppText>
      <AppText weight="regular" style={styles.subtitle}>{item.subtitle}</AppText>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={slides}
        keyExtractor={(s) => s.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfigRef}
      />
      <PagerDots total={slides.length} index={index} />
      <Pressable style={styles.button} onPress={onDone}>        
        <AppText weight="medium" style={styles.buttonText}>Getting Started</AppText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    paddingBottom: Spacing.xxl,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: Spacing.xxl,
  },
  image: {
    width: width - Spacing.xxl * 2,
    height: width - Spacing.xxl * 2,
    resizeMode: 'contain',
    marginTop: Spacing.xxl,
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: 30,
    color: Colors.black,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.muted,
    textAlign: 'center',
    marginBottom: Spacing.xxl,
    maxWidth: width - Spacing.xxl * 2,
  },
  button: {
    backgroundColor: Colors.black,
    paddingVertical: Spacing.md + 2,
    paddingHorizontal: Spacing.xxl,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    marginTop: Spacing.xl,
  },
  buttonText: {
    color: Colors.primary,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default OnboardingScreen;
