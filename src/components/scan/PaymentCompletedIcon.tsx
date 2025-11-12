import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '@theme/tokens';
import { moderateScale } from '@utils/responsive';

interface PaymentCompletedIconProps {
  size?: number;
}

const PaymentCompletedIcon: React.FC<PaymentCompletedIconProps> = ({ size = 120 }) => {
  return (
    <View style={[styles.container, { width: moderateScale(size), height: moderateScale(size) }]}>
      {/* Bell/Cloche Top */}
      <View style={styles.bellTop}>
        <View style={styles.bellTopLeft} />
        <View style={styles.bellTopRight} />
        <View style={styles.bellHandle} />
      </View>
      
      {/* Bell/Cloche Body */}
      <View style={styles.bellBody}>
        {/* Left curve */}
        <View style={styles.bellLeft} />
        {/* Right curve */}
        <View style={styles.bellRight} />
      </View>
      
      {/* Decorative elements */}
      <View style={styles.decorations}>
        {/* Left side decorations */}
        <View style={[styles.diamond, styles.diamondLeft1]} />
        <View style={[styles.wave, styles.waveLeft1]} />
        <View style={[styles.wave, styles.waveLeft2]} />
        <View style={[styles.wave, styles.waveLeft3]} />
        
        {/* Right side decorations */}
        <View style={[styles.diamond, styles.diamondRight1]} />
        <View style={[styles.wave, styles.waveRight1]} />
        <View style={[styles.wave, styles.waveRight2]} />
        <View style={[styles.wave, styles.waveRight3]} />
        
        {/* Bottom decorations */}
        <View style={[styles.diamond, styles.diamondBottom]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  bellTop: {
    width: '100%',
    height: '25%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  bellTopLeft: {
    width: '35%',
    height: moderateScale(20),
    backgroundColor: Colors.primary,
    borderTopLeftRadius: moderateScale(30),
    borderBottomLeftRadius: moderateScale(10),
    borderBottomRightRadius: moderateScale(5),
  },
  bellTopRight: {
    width: '35%',
    height: moderateScale(20),
    backgroundColor: Colors.primary,
    borderTopRightRadius: moderateScale(30),
    borderBottomRightRadius: moderateScale(10),
    borderBottomLeftRadius: moderateScale(5),
  },
  bellHandle: {
    position: 'absolute',
    top: -moderateScale(8),
    width: moderateScale(20),
    height: moderateScale(15),
    backgroundColor: Colors.primary,
    borderRadius: moderateScale(10),
  },
  bellBody: {
    width: '100%',
    height: '40%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -moderateScale(5),
  },
  bellLeft: {
    width: '45%',
    height: '100%',
    backgroundColor: Colors.primary,
    borderTopLeftRadius: moderateScale(10),
    borderBottomLeftRadius: moderateScale(40),
  },
  bellRight: {
    width: '45%',
    height: '100%',
    backgroundColor: Colors.primary,
    borderTopRightRadius: moderateScale(10),
    borderBottomRightRadius: moderateScale(40),
  },
  decorations: {
    position: 'absolute',
    width: '120%',
    height: '120%',
  },
  diamond: {
    position: 'absolute',
    width: moderateScale(12),
    height: moderateScale(12),
    backgroundColor: Colors.primary,
    transform: [{ rotate: '45deg' }],
  },
  diamondLeft1: {
    left: '5%',
    top: '35%',
  },
  diamondRight1: {
    right: '5%',
    top: '35%',
  },
  diamondBottom: {
    left: '45%',
    bottom: '15%',
  },
  wave: {
    position: 'absolute',
    width: moderateScale(6),
    height: moderateScale(20),
    backgroundColor: Colors.primary,
    borderRadius: moderateScale(10),
  },
  waveLeft1: {
    left: '10%',
    top: '45%',
    transform: [{ rotate: '15deg' }],
  },
  waveLeft2: {
    left: '15%',
    top: '55%',
    transform: [{ rotate: '25deg' }],
    height: moderateScale(16),
  },
  waveLeft3: {
    left: '20%',
    top: '65%',
    transform: [{ rotate: '35deg' }],
    height: moderateScale(12),
  },
  waveRight1: {
    right: '10%',
    top: '45%',
    transform: [{ rotate: '-15deg' }],
  },
  waveRight2: {
    right: '15%',
    top: '55%',
    transform: [{ rotate: '-25deg' }],
    height: moderateScale(16),
  },
  waveRight3: {
    right: '20%',
    top: '65%',
    transform: [{ rotate: '-35deg' }],
    height: moderateScale(12),
  },
});

export default PaymentCompletedIcon;
