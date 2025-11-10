import React, { useEffect, useRef } from 'react';
import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View, Animated, ViewStyle } from 'react-native';
import { CategoryIcons, CategoryKey } from '@assets';

interface Props {
  category: CategoryKey;
  label?: string;
  active?: boolean;
  onPress?: (key: CategoryKey) => void;
  size?: number; // diameter of circular icon container
  style?: ViewStyle;
}

export const CategoryIcon: React.FC<Props> = ({
  category,
  label,
  active = false,
  onPress,
  size = 56,
  style,
}) => {
  const scale = useRef(new Animated.Value(active ? 1 : 0.92)).current;
  const elevation = useRef(new Animated.Value(active ? 4 : 1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: active ? 1 : 0.92,
        useNativeDriver: true,
        damping: 12,
        stiffness: 160,
      }),
      Animated.timing(elevation, {
        toValue: active ? 4 : 1,
        duration: 180,
        useNativeDriver: false,
      }),
    ]).start();
  }, [active, scale, elevation]);

  const iconSet = CategoryIcons[category];
  const source: ImageSourcePropType = active ? iconSet.active : iconSet.inactive;

  return (
    <Pressable onPress={() => onPress?.(category)} style={({ pressed }) => [styles.wrapper, style, pressed && { opacity: 0.85 }]}>
      <Animated.View
        style={[
          styles.container,
          {
            backgroundColor: active ? '#7DA23B' : '#F7F7FA',
            transform: [{ scale }],
            shadowOpacity: active ? 0.25 : 0.12,
            shadowRadius: active ? 6 : 3,
            elevation: elevation as any,
          },
        ]}
      >
        <View style={[styles.iconCircle, { width: size, height: size, borderRadius: size / 2 }]}>          
          <Image source={source} style={{ width: size * 0.55, height: size * 0.55, resizeMode: 'contain' }} />
        </View>
        {label && <Text style={[styles.label, active && styles.labelActive]} numberOfLines={1}>{label}</Text>}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 40,
  },
  container: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 32,
    alignItems: 'center',
    width: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
  },
  iconCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ECECEC',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: '#222',
    fontFamily: 'OpenSans-SemiBold',
  },
  labelActive: {
    color: '#FFF',
  },
});

export default CategoryIcon;
