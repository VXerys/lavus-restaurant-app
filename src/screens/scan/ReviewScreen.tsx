import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppText from '@components/common/AppText';
import Button from '@components/common/Button';
import StarIcon from '@components/common/StarIcon';
import { Colors, Spacing } from '@theme/tokens';
import {
  scaleFontSize,
  moderateScale,
  getButtonWidth,
} from '@utils/responsive';

interface ReviewScreenProps {
  onSubmit?: (rating: number) => void;
  onBack?: () => void;
}

// Emoji images mapping
const emojiImages = {
  1: require('@assets/images/review/Review-bintang1.png'),
  2: require('@assets/images/review/Review-bintang2.png'),
  3: require('@assets/images/review/Review-bintang3.png'),
  4: require('@assets/images/review/Review-bintang4.png'),
  5: require('@assets/images/review/Review-bintang5.png'),
};

const ReviewScreen: React.FC<ReviewScreenProps> = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);

  // Animations
  const emojiScale = useRef(new Animated.Value(0)).current;
  const emojiRotate = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  // Star scale animations
  const starScales = useRef(
    [0, 1, 2, 3, 4].map(() => new Animated.Value(1))
  ).current;

  // Initial fade in animation
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  // Emoji animation when rating changes
  useEffect(() => {
    if (rating > 0) {
      // Reset and animate
      emojiScale.setValue(0);
      emojiRotate.setValue(0);

      Animated.parallel([
        Animated.spring(emojiScale, {
          toValue: 1,
          friction: 5,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.spring(emojiRotate, {
          toValue: 1,
          friction: 8,
          tension: 80,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [rating, emojiScale, emojiRotate]);

  const handleStarPress = (starIndex: number) => {
    const newRating = starIndex + 1;
    setRating(newRating);

    // Animate the pressed star
    Animated.sequence([
      Animated.timing(starScales[starIndex], {
        toValue: 1.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.spring(starScales[starIndex], {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit?.(rating);
    }
  };

  const rotateInterpolation = emojiRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['-10deg', '0deg'],
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <Animated.View 
        style={[
          styles.container,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('@assets/images/logo-restaurant.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Title */}
        <View style={styles.titleContainer}>
          <AppText weight="serifTitle" style={styles.title}>
            How was your{'\n'}whole experience?
          </AppText>
        </View>

        {/* Emoji Face with Animation */}
        {rating > 0 && (
          <Animated.View
            style={[
              styles.emojiContainer,
              {
                transform: [
                  { scale: emojiScale },
                  { rotate: rotateInterpolation },
                ],
              },
            ]}
          >
            <View style={styles.emojiBackground}>
              <Image
                source={emojiImages[rating as keyof typeof emojiImages]}
                style={styles.emojiImage}
                resizeMode="contain"
              />
            </View>
          </Animated.View>
        )}

        {/* Empty State */}
        {rating === 0 && (
          <View style={styles.emptyStateContainer}>
            <View style={styles.emptyStateCircle} />
          </View>
        )}

        {/* Star Rating */}
        <View style={styles.starsContainer}>
          {[0, 1, 2, 3, 4].map((index) => (
            <StarIcon
              key={index}
              filled={index < rating}
              size={52}
              onPress={() => handleStarPress(index)}
              scaleAnim={starScales[index]}
            />
          ))}
        </View>

        {/* Submit Button */}
        {rating > 0 && (
          <Animated.View
            style={[
              styles.buttonContainer,
              {
                opacity: fadeAnim,
              },
            ]}
          >
            <Button
              title="Submit"
              variant="primary"
              width={getButtonWidth(0.4)}
              onPress={handleSubmit}
            />
          </Animated.View>
        )}
      </Animated.View>
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
    paddingHorizontal: moderateScale(Spacing.xl),
    paddingTop: moderateScale(Spacing.lg),
    alignItems: 'center',
  },
  logoContainer: {
    marginTop: moderateScale(Spacing.md),
    marginBottom: moderateScale(Spacing.lg),
  },
  logo: {
    width: moderateScale(100),
    height: moderateScale(100),
  },
  titleContainer: {
    marginBottom: moderateScale(Spacing.xxl),
  },
  title: {
    fontSize: scaleFontSize(32),
    color: Colors.black,
    textAlign: 'center',
    lineHeight: scaleFontSize(42),
  },
  emojiContainer: {
    marginBottom: moderateScale(Spacing.xxl),
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiBackground: {
    width: moderateScale(160),
    height: moderateScale(160),
    borderRadius: moderateScale(32),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: moderateScale(4),
    },
    shadowOpacity: 0.15,
    shadowRadius: moderateScale(12),
    elevation: 5,
  },
  emojiImage: {
    width: '100%',
    height: '100%',
  },
  emptyStateContainer: {
    marginBottom: moderateScale(Spacing.xxl),
    alignItems: 'center',
    justifyContent: 'center',
    height: moderateScale(160),
  },
  emptyStateCircle: {
    width: moderateScale(160),
    height: moderateScale(160),
    borderRadius: moderateScale(32),
    backgroundColor: Colors.bg,
    borderWidth: 2,
    borderColor: Colors.dotInactive,
    borderStyle: 'dashed',
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateScale(Spacing.xxl),
    gap: moderateScale(4),
  },
  buttonContainer: {
    marginTop: moderateScale(Spacing.xxl),
    alignItems: 'center',
  },
});

export default ReviewScreen;
