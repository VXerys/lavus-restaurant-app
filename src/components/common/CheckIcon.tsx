import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '@theme/tokens';

interface CheckIconProps {
  size?: number;
  color?: string;
}

const CheckIcon: React.FC<CheckIconProps> = ({ 
  size = 80, 
  color = Colors.primary 
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20 6L9 17L4 12"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default CheckIcon;
