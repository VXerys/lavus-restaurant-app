import React, { useCallback, useState } from 'react';
import { View, Image, StyleSheet, FlatList, ListRenderItemInfo } from 'react-native';
import AppText from '@components/AppText';
import PagerDots from '@components/PagerDots';
import Button from '@components/Button';
import { Colors, Spacing } from '@theme/tokens';
import { 
  screenWidth, 
  scaleFontSize, 
  moderateScale, 
  getButtonWidth
} from '@utils/responsive';

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
    <View style={[styles.slide, { width: screenWidth }]}>      
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
      <View style={styles.dotsContainer}>
        <PagerDots total={slides.length} index={index} />
      </View>
      <Button
        title="Getting Started"
        variant="primary"
        width={getButtonWidth(0.7)}
        onPress={onDone}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    paddingBottom: moderateScale(Spacing.xxl + Spacing.lg),
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: moderateScale(Spacing.xl + Spacing.sm),
    paddingBottom: moderateScale(Spacing.xxl),
  },
  image: {
    width: screenWidth * 0.7,
    height: screenWidth * 0.7,
    maxWidth: 350,
    maxHeight: 350,
    resizeMode: 'contain',
    marginBottom: moderateScale(Spacing.lg),
  },
  title: {
    fontSize: scaleFontSize(32),
    color: Colors.black,
    textAlign: 'center',
    marginBottom: moderateScale(Spacing.sm),
  },
  subtitle: {
    fontSize: scaleFontSize(15),
    lineHeight: scaleFontSize(22),
    color: Colors.muted,
    textAlign: 'center',
    maxWidth: screenWidth * 0.85,
    paddingHorizontal: moderateScale(Spacing.lg),
  },
  dotsContainer: {
    marginTop: moderateScale(Spacing.lg),
    marginBottom: moderateScale(Spacing.lg),
  },
});

export default OnboardingScreen;
