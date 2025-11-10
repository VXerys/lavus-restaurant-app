import React from 'react';
import { Text, TextProps } from 'react-native';
import { Fonts } from '@assets';

interface Props extends TextProps {
  weight?: 'regular' | 'medium' | 'semiBold' | 'serifTitle';
  align?: 'left' | 'center' | 'right';
}

export const AppText: React.FC<Props> = ({
  weight = 'regular',
  align = 'left',
  style,
  children,
  ...rest
}) => {
  return (
    <Text
      {...rest}
      style={[
        {
          fontFamily: Fonts[weight],
          textAlign: align,
          // default color set; override via style prop if needed
          color: '#222'
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export default AppText;
