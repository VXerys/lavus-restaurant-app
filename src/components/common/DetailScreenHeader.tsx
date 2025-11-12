import React from 'react';
import { View, StyleSheet, Pressable, Image } from 'react-native';
import AppText from './AppText';
import { NavigationIcons } from '@assets';
import { Colors, Spacing } from '@theme/tokens';
import { scaleFontSize, moderateScale } from '@utils/responsive';

interface DetailScreenHeaderProps {
  title: string;
  onBack?: () => void;
}

const DetailScreenHeader: React.FC<DetailScreenHeaderProps> = ({ 
  title, 
  onBack 
}) => {
  return (
    <View style={styles.header}>
      <Pressable style={styles.backButton} onPress={onBack}>
        <Image source={NavigationIcons.back} style={styles.backIcon} />
      </Pressable>
      <AppText weight="regular" style={styles.headerTitle}>
        {title}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.bg,
  },
  backButton: {
    width: moderateScale(40),
    height: moderateScale(40),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  backIcon: {
    width: moderateScale(24),
    height: moderateScale(24),
    resizeMode: 'contain',
    tintColor: Colors.black,
  },
  headerTitle: {
    fontSize: scaleFontSize(18),
    color: Colors.black,
    flex: 1,
    fontWeight: '600',
  },
});

export default DetailScreenHeader;
