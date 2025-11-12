import React from 'react';
import { Pressable, StyleSheet, ViewStyle, TextStyle, PressableProps } from 'react-native';
import AppText from './AppText';
import { Colors, Spacing, Radius } from '@theme/tokens';
import { scaleFontSize, moderateScale } from '@utils/responsive';

export interface ButtonProps extends PressableProps {
  title: string;
  variant?: 'primary' | 'outline' | 'reward';
  size?: 'medium' | 'large';
  width?: number | string;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'large',
  width,
  style,
  textStyle,
  ...pressableProps
}) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'primary':
        return styles.primary;
      case 'outline':
        return styles.outline;
      case 'reward':
        return styles.reward;
      default:
        return styles.primary;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'primary':
        return styles.textPrimary;
      case 'outline':
        return styles.textOutline;
      case 'reward':
        return styles.textReward;
      default:
        return styles.textPrimary;
    }
  };

  const buttonStyles: ViewStyle[] = [
    styles.base,
    size === 'large' ? styles.large : styles.medium,
    getVariantStyle(),
    width ? { width: width as any } : {},
    style as ViewStyle,
  ];

  const textStyles: TextStyle[] = [
    styles.text,
    getTextStyle(),
    ...(textStyle ? [textStyle] : []),
  ];

  return (
    <Pressable 
      style={({ pressed }) => [
        ...buttonStyles,
        pressed && variant === 'primary' && styles.primaryPressed,
        pressed && variant === 'outline' && styles.outlinePressed,
        pressed && variant === 'reward' && styles.rewardPressed,
        pressed && styles.pressed,
      ]} 
      {...pressableProps}
    >
      <AppText weight="medium" style={textStyles}>
        {title}
      </AppText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.sm,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  primary: {
    backgroundColor: Colors.black,
  },
  primaryPressed: {
    backgroundColor: '#333333',
    opacity: 0.8,
  },
  outline: {
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.black,
  },
  outlinePressed: {
    backgroundColor: '#f0f0f0',
    borderColor: '#666666',
  },
  reward: {
    backgroundColor: Colors.primary,
    borderRadius: moderateScale(12),
    paddingVertical: moderateScale(14),
    paddingHorizontal: moderateScale(32),
  },
  rewardPressed: {
    backgroundColor: '#d4c89f',
    opacity: 0.9,
  },
  large: {
    paddingVertical: moderateScale(16),
    paddingHorizontal: moderateScale(Spacing.xxl * 2),
    minWidth: moderateScale(200),
  },
  medium: {
    paddingVertical: moderateScale(Spacing.md + 2),
    paddingHorizontal: moderateScale(Spacing.xl),
    minWidth: moderateScale(150),
  },
  text: {
    fontSize: scaleFontSize(18),
    textAlign: 'center',
    fontWeight: '500',
  },
  textPrimary: {
    color: Colors.primary,
  },
  textOutline: {
    color: Colors.black,
  },
  textReward: {
    color: Colors.black,
  },
  pressed: {
    transform: [{ scale: 0.97 }],
  },
});

export default Button;
