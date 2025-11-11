import React from 'react';
import { View, StyleSheet, Image, Pressable, ImageSourcePropType } from 'react-native';
import AppText from './AppText';
import { Colors, Spacing, Radius } from '@theme/tokens';
import { moderateScale, scaleFontSize, scaleHeight } from '@utils/responsive';

interface HotDealCardProps {
  type: 'hero' | 'regular';
  label?: string;
  title: string;
  image: ImageSourcePropType;
  onPress?: () => void;
  dealId?: string;
}

const HotDealCard: React.FC<HotDealCardProps> = ({
  type,
  label,
  title,
  image,
  onPress,
}) => {
  if (type === 'hero') {
    return (
      <Pressable
        style={styles.heroCard}
        onPress={onPress}
        android_ripple={{ color: 'rgba(255, 255, 255, 0.1)' }}
      >
        <View style={styles.heroContent}>
          {label && (
            <AppText weight="regular" style={styles.heroLabel}>
              {label}
            </AppText>
          )}
          
          {/* Subtitle text "Accumulate with" */}
          <AppText weight="regular" style={styles.heroSubtitle}>
            {title}
          </AppText>
          
          {/* Image - Contains "Lavu's rewards" text with star */}
          <View style={styles.heroImageContainer}>
            <Image source={image} style={styles.heroImage} resizeMode="contain" />
          </View>
          
          {/* Button positioned at bottom left */}
          <Pressable style={styles.heroButton} onPress={onPress}>
            <AppText weight="semiBold" style={styles.heroButtonText}>
              Learn more
            </AppText>
          </Pressable>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable
      style={styles.regularCard}
      onPress={onPress}
      android_ripple={{ color: 'rgba(0, 0, 0, 0.05)' }}
    >
      <View style={styles.regularImageContainer}>
        <Image source={image} style={styles.regularImage} resizeMode="cover" />
      </View>
      <View style={styles.regularContent}>
        {label && (
          <AppText weight="regular" style={styles.regularLabel}>
            {label}
          </AppText>
        )}
        <AppText weight="serifTitle" style={styles.regularTitle}>
          {title}
        </AppText>
        <Pressable style={styles.regularButton} onPress={onPress}>
          <AppText weight="semiBold" style={styles.regularButtonText}>
            Learn more
          </AppText>
        </Pressable>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  // Hero Card Styles (Black card with star)
  heroCard: {
    backgroundColor: Colors.black,
    borderRadius: moderateScale(20),
    overflow: 'hidden',
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    // Android Shadow
    elevation: 8,
  },
  heroContent: {
    paddingTop: scaleHeight(28),
    paddingBottom: scaleHeight(24),
    paddingHorizontal: Spacing.xl,
    minHeight: scaleHeight(170),
  },
  heroLabel: {
    fontSize: scaleFontSize(9.5),
    color: Colors.white,
    letterSpacing: 2,
    marginBottom: Spacing.xs - 2,
    opacity: 0.65,
    fontWeight: '400',
  },
  heroSubtitle: {
    fontSize: scaleFontSize(18),
    color: Colors.white,
    marginBottom: Spacing.xs - 4,
    fontWeight: '300',
    lineHeight: scaleFontSize(24),
  },
  heroImageContainer: {
    width: '100%',
    height: scaleHeight(75),
    marginBottom: Spacing.sm + 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroImage: {
    width: '95%',
    height: '100%',
  },
  heroButton: {
    backgroundColor: '#8B9D5E', // Olive green color
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(38),
    borderRadius: moderateScale(24),
    alignSelf: 'flex-start',
    alignItems: 'center',
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    // Android Shadow
    elevation: 3,
  },
  heroButtonText: {
    fontSize: scaleFontSize(14),
    color: Colors.black,
    letterSpacing: 0,
    fontWeight: '600',
  },

  // Regular Card Styles (White cards with horizontal layout)
  regularCard: {
    backgroundColor: Colors.white,
    borderRadius: moderateScale(22),
    overflow: 'hidden',
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md + 2,
    paddingLeft: Spacing.md,
    paddingRight: Spacing.lg,
    minHeight: scaleHeight(125),
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    // Android Shadow
    elevation: 4,
  },
  regularImageContainer: {
    width: moderateScale(130),
    height: moderateScale(100),
    borderRadius: moderateScale(18),
    overflow: 'hidden',
    backgroundColor: '#F8F8F5',
    marginRight: Spacing.md + 2,
  },
  regularImage: {
    width: '100%',
    height: '100%',
  },
  regularContent: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: Spacing.xs - 2,
  },
  regularLabel: {
    fontSize: scaleFontSize(9),
    color: '#999999',
    letterSpacing: 1.3,
    marginBottom: Spacing.xs - 3,
    fontWeight: '400',
  },
  regularTitle: {
    fontSize: scaleFontSize(21),
    color: Colors.black,
    lineHeight: scaleFontSize(27),
    marginBottom: Spacing.sm + 2,
    maxWidth: '95%',
  },
  regularButton: {
    backgroundColor: Colors.black,
    paddingVertical: moderateScale(9),
    paddingHorizontal: Spacing.lg + Spacing.xs,
    borderRadius: Radius.lg,
    alignSelf: 'flex-start',
    minWidth: moderateScale(115),
    alignItems: 'center',
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    // Android Shadow
    elevation: 2,
  },
  regularButtonText: {
    fontSize: scaleFontSize(13),
    color: '#8B9D5E', // Olive green text
    letterSpacing: 0.2,
  },
});

export default HotDealCard;
