import React from 'react';
import { View, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { Colors, Spacing } from '@theme/tokens';
import { screenWidth, scaleHeight } from '@utils/responsive';

interface DealImageSectionProps {
  image: ImageSourcePropType;
}

const DealImageSection: React.FC<DealImageSectionProps> = ({ image }) => {
  return (
    <View style={styles.container}>
      <Image 
        source={image} 
        style={styles.image} 
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: scaleHeight(320),
    backgroundColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  image: {
    width: '85%',
    height: '75%',
  },
});

export default DealImageSection;
