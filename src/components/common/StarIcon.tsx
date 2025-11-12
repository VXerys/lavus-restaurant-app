import React from 'react';
import { Pressable, StyleSheet, Animated, View, Text } from 'react-native';
import { Colors } from '@theme/tokens';
import { moderateScale, scaleFontSize } from '@utils/responsive';

interface StarIconProps {
  filled?: boolean;
  size?: number;
  onPress?: () => void;
  scaleAnim?: Animated.Value;
}

const StarIcon: React.FC<StarIconProps> = ({ 
  filled = false, 
  size = 48,
  onPress,
  scaleAnim,
}) => {
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  return (
    <AnimatedPressable
      onPress={onPress}
      style={[
        styles.container,
        { 
          width: moderateScale(size + 8), 
          height: moderateScale(size + 8),
        },
        scaleAnim && {
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <View style={[
        styles.star,
        { 
          width: moderateScale(size), 
          height: moderateScale(size),
        },
      ]}>
        <Text style={[
          styles.starText,
          { 
            fontSize: scaleFontSize(size * 0.9),
            lineHeight: moderateScale(size),
          },
          filled ? styles.starFilled : styles.starEmpty,
        ]}>
          ★
        </Text>
      </View>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  star: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  },
  starText: {
    fontWeight: '400',
    textAlign: 'center',
    includeFontPadding: false,
  },
  starFilled: {
    color: Colors.primary,
  },
  starEmpty: {
    color: '#E0E0E0',
  },
});

export default StarIcon;
