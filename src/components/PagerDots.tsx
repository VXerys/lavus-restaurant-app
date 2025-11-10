import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '@theme/tokens';

interface Props {
  total: number;
  index: number;
}

export const PagerDots: React.FC<Props> = ({ total, index }) => {
  return (
    <View style={styles.row}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={[styles.dot, i === index ? styles.dotActive : styles.dotInactive]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  dotInactive: { backgroundColor: Colors.dotInactive },
  dotActive: { backgroundColor: Colors.black },
});

export default PagerDots;
