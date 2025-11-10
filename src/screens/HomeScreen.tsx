import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppText from '@components/AppText';
import { Colors, Spacing } from '@theme/tokens';

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <AppText weight="semiBold" style={styles.text}>
        Home Screen
      </AppText>
      <AppText weight="regular" style={styles.subtitle}>
        (No Login - Guest Mode)
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  text: {
    fontSize: 24,
    color: Colors.black,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.muted,
  },
});

export default HomeScreen;
