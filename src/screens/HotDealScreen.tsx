import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppText from '@components/AppText';
import HotDealCard from '@components/HotDealCard';
import { Colors, Spacing } from '@theme/tokens';
import { scaleFontSize } from '@utils/responsive';
import { hotDealsData } from '@mocks/data/hotDeals';

interface HotDealScreenProps {
  navigation?: any;
}

const HotDealScreen: React.FC<HotDealScreenProps> = ({ navigation }) => {
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
          {hotDealsData.map((deal) => (
            <HotDealCard
              key={deal.id}
              type={deal.type}
              label={deal.label}
              title={deal.title}
              image={deal.image}
              dealId={deal.id}
              onPress={() => {
                if (navigation) {
                  navigation.navigate('HotDealDetail', { dealId: deal.id });
                } else {
                  console.log(`${deal.title} pressed - ID: ${deal.id}`);
                }
              }}
            />
          ))}
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
