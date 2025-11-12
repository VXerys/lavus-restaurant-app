import React from 'react';
import { View, StyleSheet, ScrollView, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  AppText,
  Button,
  DetailScreenHeader,
  ClaimedSuccessOverlay,
  DealImageSection,
  DealInfoHeader,
  TermsConditionsSection,
  HowToRedeemSection,
} from '@components';
import { Colors, Spacing } from '@theme/tokens';
import { scaleHeight, scaleFontSize } from '@utils/responsive';
import { getHotDealById } from '@mocks/data/hotDeals';
import { useClaimDealAnimation } from '@hooks/useClaimDealAnimation';

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

  // Use custom hook for claim animation
  const {
    isClaiming,
    isClaimed,
    scaleAnim,
    fadeAnim,
    checkmarkScale,
    checkmarkRotate,
    handleClaimDeal,
  } = useClaimDealAnimation(onBack);

  if (!dealData) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.container}>
          <DetailScreenHeader title="" onBack={onBack} />
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
        <DetailScreenHeader title="" onBack={onBack} />

        {/* Claimed Success Overlay */}
        <ClaimedSuccessOverlay
          visible={isClaimed}
          fadeAnim={fadeAnim}
          checkmarkScale={checkmarkScale}
          checkmarkRotate={checkmarkRotate}
        />

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Deal Image */}
          <DealImageSection image={dealData.image} />

          {/* Deal Info Section */}
          <View style={styles.infoSection}>
            {/* Deal Header Info */}
            <DealInfoHeader
              label={dealData.label}
              title={dealData.title}
              discount={dealData.discount}
              validUntil={dealData.validUntil}
              description={dealData.description}
            />

            {/* Terms & Conditions */}
            <TermsConditionsSection />

            {/* How to Redeem */}
            <HowToRedeemSection />
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
  infoSection: {
    paddingHorizontal: Spacing.lg,
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 10,
  },
});

export default HotDealDetailScreen;
