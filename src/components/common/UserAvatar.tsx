import React from 'react';
import { View, StyleSheet, Pressable, Image } from 'react-native';
import AppText from './AppText';
import { Colors } from '@theme/tokens';
import { moderateScale } from '@utils/responsive';

interface Props {
  displayName?: string | null;
  photoURL?: string | null;
  size?: 'small' | 'medium' | 'large';
  onPress?: () => void;
}

const UserAvatar: React.FC<Props> = ({ 
  displayName, 
  photoURL, 
  size = 'medium',
  onPress 
}) => {
  // Get initials from display name
  const getInitials = (name?: string | null): string => {
    if (!name) return '?';
    
    const words = name.trim().split(' ');
    if (words.length >= 2) {
      return `${words[0][0]}${words[1][0]}`.toUpperCase();
    }
    return name[0].toUpperCase();
  };

  const sizeMap = {
    small: 32,
    medium: 40,
    large: 80,
  };

  const fontSizeMap = {
    small: 14,
    medium: 16,
    large: 28,
  };

  const avatarSize = moderateScale(sizeMap[size]);
  const fontSize = moderateScale(fontSizeMap[size]);

  const renderContent = () => {
    if (photoURL) {
      return (
        <Image
          source={{ uri: photoURL }}
          style={[styles.avatarImage, { width: avatarSize, height: avatarSize, borderRadius: avatarSize / 2 }]}
        />
      );
    }
    
    return (
      <View style={[styles.avatarPlaceholder, { width: avatarSize, height: avatarSize, borderRadius: avatarSize / 2 }]}>
        <AppText weight="semiBold" style={[styles.initials, { fontSize }]}>
          {getInitials(displayName)}
        </AppText>
      </View>
    );
  };

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.pressable,
          pressed && styles.pressed,
        ]}
      >
        {renderContent()}
      </Pressable>
    );
  }

  return renderContent();
};

const styles = StyleSheet.create({
  pressable: {
    borderRadius: 100,
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
  avatarImage: {
    resizeMode: 'cover',
  },
  avatarPlaceholder: {
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    color: Colors.white,
  },
});

export default UserAvatar;
