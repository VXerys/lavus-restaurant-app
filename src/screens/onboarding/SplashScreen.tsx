import React, { useEffect } from 'react';
import { Image, StatusBar, StyleSheet, View } from 'react-native';
import { Colors } from '@theme/tokens';
import { Images } from '@assets';

const SplashScreen: React.FC<{ onDone?: () => void }> = ({ onDone }) => {
  useEffect(() => {
    const t = setTimeout(() => onDone?.(), 1100); // short delay to mimic native splash
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <Image source={Images.logo} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  logo: {
    width: 180,
    height: 220,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
