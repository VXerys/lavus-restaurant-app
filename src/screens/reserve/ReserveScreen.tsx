import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppText from '@components/common/AppText';
import { Colors, Spacing } from '@theme/tokens';

const ReserveScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.content}>
          <AppText weight="serifTitle" style={styles.title}>Reserve</AppText>
          <AppText weight="regular" style={styles.subtitle}>
            Coming soon! Make table reservations and view your bookings here.
          </AppText>
        </View>
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  title: {
    fontSize: 32,
    color: Colors.black,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.muted,
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default ReserveScreen;
