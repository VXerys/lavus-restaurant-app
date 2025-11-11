import React, { useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, Image, Pressable, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppText from '@components/AppText';
import Button from '@components/Button';
import { NavigationIcons } from '@assets';
import { Colors, Spacing, Radius } from '@theme/tokens';
import { 
  screenWidth, 
  scaleFontSize, 
  moderateScale, 
  scaleHeight
} from '@utils/responsive';
import { getHotDealById } from '@mocks/data/hotDeals';

interface HotDealDetailScreenProps {
  onBack?: () => void;
  dealId?: string;
  route?: {
    params?: {
      dealId?: string;
    };
  };
}

const HotDealDetailScreen: React.FC<HotDealDetailScreenProps> = ({ 
  onBack, 
  dealId: propDealId,
  route,
}) => {
  const dealId = propDealId || route?.params?.dealId || 'hd-001';
  const dealData = getHotDealById(dealId);

  // Animation states
  const [isClaiming, setIsClaiming] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const checkmarkScale = useRef(new Animated.Value(0)).current;
  const checkmarkRotate = useRef(new Animated.Value(0)).current;

  const handleClaimDeal = () => {
    if (isClaiming || isClaimed) return;

    setIsClaiming(true);

    // Button press animation - scale down
    Animated.sequence([
      // Press down
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      // Scale up to emphasize
      Animated.spring(scaleAnim, {
        toValue: 1.05,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
      // Return to normal
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // After button animation, show claimed state
      setIsClaimed(true);

      // Animate overlay fade in and checkmark appearance
      Animated.parallel([
        // Fade in overlay
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        // Pop in checkmark with rotation
        Animated.sequence([
          Animated.delay(150),
          Animated.parallel([
            Animated.spring(checkmarkScale, {
              toValue: 1,
              friction: 6,
              tension: 80,
              useNativeDriver: true,
            }),
            Animated.spring(checkmarkRotate, {
              toValue: 1,
              friction: 8,
              tension: 80,
              useNativeDriver: true,
            }),
          ]),
        ]),
      ]).start(() => {
        // Wait to show the success state
        setTimeout(() => {
          // Fade out and navigate back
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 350,
            useNativeDriver: true,
          }).start(() => {
            // Navigate back to HotDeal screen
            if (onBack) {
              onBack();
            }
          });
        }, 1200);
      });
    });
  };

  if (!dealData) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Pressable style={styles.backButton} onPress={onBack}>
              <Image source={NavigationIcons.back} style={styles.backIcon} />
            </Pressable>
            <AppText weight="regular" style={styles.headerTitle}>Deal Details</AppText>
          </View>
          <View style={styles.errorContainer}>
            <AppText weight="regular" style={styles.errorText}>
              Deal not found
            </AppText>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* Header with Back Button */}
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={onBack}>
            <Image source={NavigationIcons.back} style={styles.backIcon} />
          </Pressable>
          <AppText weight="regular" style={styles.headerTitle}>Deal Details</AppText>
        </View>

        {/* Claimed Success Overlay - Center of Screen */}
        {isClaimed && (
          <Animated.View 
            style={[
              styles.claimedOverlay,
              {
                opacity: fadeAnim,
              },
            ]}
          >
            <Animated.View
              style={[
                styles.claimedCard,
                {
                  transform: [
                    { scale: checkmarkScale },
                    { 
                      rotate: checkmarkRotate.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['-10deg', '0deg'],
                      }),
                    },
                  ],
                },
              ]}
            >
              <View style={styles.checkmark}>
                <AppText weight="semiBold" style={styles.checkmarkText}>
                  ✓
                </AppText>
              </View>
              <AppText weight="semiBold" style={styles.claimedText}>
                Deal Claimed!
              </AppText>
              <AppText weight="regular" style={styles.claimedSubtext}>
                Your exclusive offer is ready to use
              </AppText>
            </Animated.View>
          </Animated.View>
        )}

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Deal Image */}
          <View style={styles.imageContainer}>
            <Image 
              source={dealData.image} 
              style={styles.dealImage} 
              resizeMode="contain"
            />
          </View>

          {/* Deal Info Section */}
          <View style={styles.infoSection}>
            {/* Category Label */}
            {dealData.label && (
              <AppText weight="regular" style={styles.categoryLabel}>
                {dealData.label}
              </AppText>
            )}

            {/* Deal Title */}
            <AppText weight="serifTitle" style={styles.dealTitle}>
              {dealData.title}
            </AppText>

            {/* Discount Badge (if available) */}
            {dealData.discount && (
              <View style={styles.discountBadge}>
                <AppText weight="semiBold" style={styles.discountText}>
                  {dealData.discount}% OFF
                </AppText>
              </View>
            )}

            {/* Valid Until (if available) */}
            {dealData.validUntil && (
              <View style={styles.validityContainer}>
                <AppText weight="regular" style={styles.validityLabel}>
                  Valid until:
                </AppText>
                <AppText weight="semiBold" style={styles.validityDate}>
                  {new Date(dealData.validUntil).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </AppText>
              </View>
            )}

            {/* Description */}
            <AppText weight="regular" style={styles.description}>
              {dealData.description}
            </AppText>

            {/* Terms & Conditions Section */}
            <View style={styles.termsSection}>
              <AppText weight="serifTitle" style={styles.termsTitle}>
                Terms & Conditions
              </AppText>
              <View style={styles.termsList}>
                <View style={styles.termItem}>
                  <View style={styles.bullet} />
                  <AppText weight="regular" style={styles.termText}>
                    This offer is valid for dine-in and takeaway orders only
                  </AppText>
                </View>
                <View style={styles.termItem}>
                  <View style={styles.bullet} />
                  <AppText weight="regular" style={styles.termText}>
                    Cannot be combined with other promotions or discounts
                  </AppText>
                </View>
                <View style={styles.termItem}>
                  <View style={styles.bullet} />
                  <AppText weight="regular" style={styles.termText}>
                    Subject to availability while stocks last
                  </AppText>
                </View>
                <View style={styles.termItem}>
                  <View style={styles.bullet} />
                  <AppText weight="regular" style={styles.termText}>
                    Management reserves the right to modify or cancel this offer at any time
                  </AppText>
                </View>
              </View>
            </View>

            {/* How to Redeem Section */}
            <View style={styles.redeemSection}>
              <AppText weight="serifTitle" style={styles.redeemTitle}>
                How to Redeem
              </AppText>
              <View style={styles.redeemSteps}>
                <View style={styles.stepItem}>
                  <View style={styles.stepNumber}>
                    <AppText weight="semiBold" style={styles.stepNumberText}>1</AppText>
                  </View>
                  <AppText weight="regular" style={styles.stepText}>
                    Visit any Lavu's Restaurant location
                  </AppText>
                </View>
                <View style={styles.stepItem}>
                  <View style={styles.stepNumber}>
                    <AppText weight="semiBold" style={styles.stepNumberText}>2</AppText>
                  </View>
                  <AppText weight="regular" style={styles.stepText}>
                    Show this deal to your server before ordering
                  </AppText>
                </View>
                <View style={styles.stepItem}>
                  <View style={styles.stepNumber}>
                    <AppText weight="semiBold" style={styles.stepNumberText}>3</AppText>
                  </View>
                  <AppText weight="regular" style={styles.stepText}>
                    Enjoy your special discount or offer!
                  </AppText>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Action Buttons */}
        {!isClaimed && (
          <Animated.View 
            style={[
              styles.bottomActions,
              {
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <Button
              title="Claim Now"
              onPress={handleClaimDeal}
              variant="primary"
              disabled={isClaiming}
            />
          </Animated.View>
        )}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.bg,
  },
  backButton: {
    width: moderateScale(40),
    height: moderateScale(40),
    backgroundColor: Colors.black,
    borderRadius: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    // Android Shadow
    elevation: 3,
  },
  backIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain',
    tintColor: Colors.white,
  },
  headerTitle: {
    fontSize: scaleFontSize(18),
    color: Colors.black,
    flex: 1,
    fontWeight: '600',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: scaleFontSize(16),
    color: Colors.muted,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: scaleHeight(120),
  },
  imageContainer: {
    width: screenWidth,
    height: scaleHeight(320),
    backgroundColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  dealImage: {
    width: '85%',
    height: '75%',
  },
  infoSection: {
    paddingHorizontal: Spacing.lg,
  },
  categoryLabel: {
    fontSize: scaleFontSize(10),
    color: Colors.primary,
    letterSpacing: 2,
    marginBottom: Spacing.xs - 2,
    fontWeight: '700',
  },
  dealTitle: {
    fontSize: scaleFontSize(32),
    color: Colors.black,
    lineHeight: scaleFontSize(40),
    marginBottom: Spacing.md,
  },
  discountBadge: {
    backgroundColor: '#FF6B6B',
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(24),
    alignSelf: 'flex-start',
    marginBottom: Spacing.lg,
    // iOS Shadow
    shadowColor: '#FF6B6B',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    // Android Shadow
    elevation: 6,
  },
  discountText: {
    fontSize: scaleFontSize(16),
    color: Colors.white,
    letterSpacing: 1,
    fontWeight: '700',
  },
  validityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    paddingVertical: moderateScale(12),
    paddingHorizontal: Spacing.lg,
    backgroundColor: '#FFFBEA',
    borderRadius: Radius.md,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    // Android Shadow
    elevation: 2,
  },
  validityLabel: {
    fontSize: scaleFontSize(13),
    color: '#666',
    marginRight: Spacing.xs,
    fontWeight: '500',
  },
  validityDate: {
    fontSize: scaleFontSize(13),
    color: Colors.black,
    fontWeight: '700',
  },
  description: {
    fontSize: scaleFontSize(16),
    color: '#444',
    lineHeight: scaleFontSize(26),
    marginBottom: Spacing.xl + Spacing.sm,
  },
  termsSection: {
    marginBottom: Spacing.xl,
  },
  termsTitle: {
    fontSize: scaleFontSize(22),
    color: Colors.black,
    marginBottom: Spacing.md,
    fontWeight: '600',
  },
  termsList: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    // Android Shadow
    elevation: 2,
  },
  termItem: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
    paddingRight: Spacing.sm,
  },
  bullet: {
    width: moderateScale(7),
    height: moderateScale(7),
    borderRadius: moderateScale(3.5),
    backgroundColor: Colors.primary,
    marginRight: Spacing.md,
    marginTop: moderateScale(7),
  },
  termText: {
    flex: 1,
    fontSize: scaleFontSize(15),
    color: '#555',
    lineHeight: scaleFontSize(24),
  },
  redeemSection: {
    marginBottom: Spacing.xl + Spacing.lg,
  },
  redeemTitle: {
    fontSize: scaleFontSize(22),
    color: Colors.black,
    marginBottom: Spacing.md,
    fontWeight: '600',
  },
  redeemSteps: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    // Android Shadow
    elevation: 2,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.lg,
  },
  stepNumber: {
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: moderateScale(18),
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
    // iOS Shadow
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // Android Shadow
    elevation: 3,
  },
  stepNumberText: {
    fontSize: scaleFontSize(18),
    color: Colors.white,
    fontWeight: '700',
  },
  stepText: {
    flex: 1,
    fontSize: scaleFontSize(15),
    color: '#555',
    lineHeight: scaleFontSize(24),
    paddingTop: moderateScale(6),
  },
  bottomActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.lg + Spacing.xs,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    // Android Shadow
    elevation: 10,
  },
  claimedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  claimedCard: {
    backgroundColor: Colors.white,
    borderRadius: moderateScale(24),
    paddingVertical: moderateScale(48),
    paddingHorizontal: moderateScale(40),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Spacing.xl,
    maxWidth: moderateScale(320),
    borderWidth: 1,
    borderColor: 'rgba(149, 174, 69, 0.2)',
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    // Android Shadow
    elevation: 16,
  },
  claimedContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
  },
  checkmarkContainer: {
    marginBottom: Spacing.sm,
  },
  checkmark: {
    width: moderateScale(96),
    height: moderateScale(96),
    borderRadius: moderateScale(48),
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateScale(24),
    borderWidth: moderateScale(4),
    borderColor: 'rgba(149, 174, 69, 0.2)',
    // iOS Shadow
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    // Android Shadow
    elevation: 8,
  },
  checkmarkText: {
    fontSize: scaleFontSize(52),
    color: Colors.white,
    fontWeight: '700',
    lineHeight: scaleFontSize(52),
  },
  claimedText: {
    fontSize: scaleFontSize(22),
    color: Colors.black,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: Spacing.xs,
    letterSpacing: 0.3,
  },
  claimedSubtext: {
    fontSize: scaleFontSize(15),
    color: Colors.muted,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: scaleFontSize(22),
  },
});

export default HotDealDetailScreen;
