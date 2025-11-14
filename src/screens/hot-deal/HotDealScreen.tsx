import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppText from '@components/common/AppText';
import HotDealCard from '@components/hot-deal/HotDealCard';
import { Colors, Spacing } from '@theme/tokens';
import { scaleFontSize } from '@utils/responsive';
import { fetchHotDeals } from '@mocks/data/hotDeals';

interface HotDealScreenProps {
  navigation?: any;
}

const HotDealScreen: React.FC<HotDealScreenProps> = ({ navigation }) => {
  const [deals, setDeals] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      const data = await fetchHotDeals();
      if (mounted) setDeals(data);
      setLoading(false);
    };
    load();
    return () => { mounted = false };
  }, []);
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Page Title */}
          <View style={styles.headerContainer}>
            <AppText weight="serifTitle" style={styles.pageTitle}>
              Lastest deals on your hand!
            </AppText>
          </View>

          {/* Hot Deal Cards */}
          {loading ? (
            <ActivityIndicator size="large" color={Colors.black} />
          ) : (
            deals.map((deal) => (
              <HotDealCard
                key={deal.id}
                type={deal.type}
                label={deal.label}
                title={deal.title}
                image={typeof deal.image === 'string' ? { uri: deal.image } : deal.image}
                dealId={deal.id}
                onPress={() => {
                  if (navigation) {
                    navigation.navigate('HotDealDetail', { dealId: deal.id });
                  } else {
                    console.log(`${deal.title} pressed - ID: ${deal.id}`);
                  }
                }}
              />
            ))
          )}
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.xl + Spacing.lg, // Extra padding for bottom tab bar
  },
  headerContainer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.lg + Spacing.xs,
  },
  pageTitle: {
    fontSize: scaleFontSize(24),
    color: Colors.black,
    lineHeight: scaleFontSize(40),
    maxWidth: '100%',
  },
});

export default HotDealScreen;
