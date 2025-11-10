import React from 'react';
import { Pressable, StyleSheet, ViewStyle, TextStyle, PressableProps } from 'react-native';
import AppText from './AppText';
import { Colors, Spacing, Radius } from '@theme/tokens';

export interface ButtonProps extends PressableProps {
  title: string;
  variant?: 'primary' | 'outline';
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
  const buttonStyles: ViewStyle[] = [
    styles.base,
    variant === 'primary' ? styles.primary : styles.outline,
    size === 'large' ? styles.large : styles.medium,
    width ? { width: width as any } : {},
    style as ViewStyle,
  ];

  const textStyles: TextStyle[] = [
    styles.text,
    variant === 'primary' ? styles.textPrimary : styles.textOutline,
    ...(textStyle ? [textStyle] : []),
  ];

  return (
    <Pressable style={buttonStyles} {...pressableProps}>
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
  outline: {
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.black,
  },
  large: {
    paddingVertical: Spacing.lg + 2,
    paddingHorizontal: Spacing.xxl * 2,
    minWidth: 200,
  },
  medium: {
    paddingVertical: Spacing.md + 2,
    paddingHorizontal: Spacing.xl,
    minWidth: 150,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
  textPrimary: {
    color: Colors.primary,
  },
  textOutline: {
    color: Colors.black,
  },
});

export default Button;
