import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppText from '@components/common/AppText';
import Button from '@components/common/Button';
import { ScanAnalyzing, ScanningFrame, ScanSuccessOverlay } from '@components/scan';
import { NavigationIcons } from '@assets';
import { Colors, Spacing } from '@theme/tokens';
import {
  scaleFontSize,
  moderateScale,
  getButtonWidth,
} from '@utils/responsive';
import { useScanAnimation } from '@hooks/useScanAnimation';

interface ScanScreenProps {
  onBack?: () => void;
  onScanComplete?: (data: string) => void;
}

const ScanScreen: React.FC<ScanScreenProps> = ({ onBack, onScanComplete }) => {
  const {
    isScanning,
    isAnalyzing,
    isSuccess,
    scanLinePosition,
    cornerOpacity,
    cornerScale,
    successFadeAnim,
    successScale,
    checkmarkScale,
    checkmarkRotate,
    startScanning,
    startAnalyzing,
    showSuccess,
  } = useScanAnimation();

  const handleAnalyzingComplete = () => {
    // Show success animation
    showSuccess(() => {
      // After success animation, navigate to dishes screen
      onScanComplete?.('PROTOTYPE_QR_CODE_DATA');
    });
  };

  const handleScanNow = () => {
    startScanning();
    // Simulate scanning delay
    setTimeout(() => {
      startAnalyzing();
    }, 2500);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.container}>
        {/* Header with Back Button */}
        <View style={styles.header}>
          <Pressable
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.backButtonPressed,
            ]}
            onPress={onBack}
          >
            <Image source={NavigationIcons.back} style={styles.backIcon} />
          </Pressable>
          <AppText weight="regular" style={styles.headerTitle}>
            Scan to Pay
          </AppText>
        </View>

        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('@assets/images/logo-restaurant.png')}
            style={styles.logo}
          />
        </View>

        {/* Title */}
        <View style={styles.titleContainer}>
          <AppText weight="serifTitle" style={styles.title}>
            Scan To Pay
          </AppText>
        </View>

        {/* QR Code Area */}
        <View style={styles.scanArea}>
          {isScanning ? (
            <ScanningFrame
              scanLinePosition={scanLinePosition}
              cornerOpacity={cornerOpacity}
              cornerScale={cornerScale}
              qrImage={require('@assets/images/scan/myqr.webp')}
            />
          ) : (
            <View style={styles.qrPlaceholder}>
              {/* QR Code Placeholder Icon */}
              <View style={styles.qrIcon}>
                <View style={styles.qrPattern}>
                  {/* Top Left */}
                  <View style={[styles.qrCorner, styles.qrTopLeft]} />
                  {/* Top Right */}
                  <View style={[styles.qrCorner, styles.qrTopRight]} />
                  {/* Center Pattern */}
                  <View style={styles.qrCenter} />
                  {/* Bottom Left */}
                  <View style={[styles.qrCorner, styles.qrBottomLeft]} />
                  {/* Bottom Right */}
                  <View style={[styles.qrCorner, styles.qrBottomRight]} />
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Scan Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="SCAN NOW"
            variant="primary"
            width={getButtonWidth(0.5)}
            onPress={handleScanNow}
            disabled={isScanning}
          />
        </View>

        {/* Analyzing Overlay */}
        <ScanAnalyzing
          isVisible={isAnalyzing}
          onComplete={handleAnalyzingComplete}
        />

        {/* Success Overlay */}
        <ScanSuccessOverlay
          visible={isSuccess}
          fadeAnim={successFadeAnim}
          scaleAnim={successScale}
          checkmarkScale={checkmarkScale}
          checkmarkRotate={checkmarkRotate}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(Spacing.lg),
    paddingVertical: moderateScale(Spacing.md),
    position: 'relative',
  },
  backButton: {
    width: moderateScale(44),
    height: moderateScale(44),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: moderateScale(Spacing.sm),
    zIndex: 10,
  },
  backButtonPressed: {
    opacity: 0.6,
    transform: [{ scale: 0.95 }],
  },
  backIcon: {
    width: moderateScale(24),
    height: moderateScale(24),
    tintColor: Colors.black,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: scaleFontSize(16),
    color: Colors.muted,
    flex: 1,
    textAlign: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: moderateScale(Spacing.md),
    marginBottom: moderateScale(Spacing.lg),
  },
  logo: {
    width: moderateScale(120),
    height: moderateScale(120),
    resizeMode: 'contain',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: moderateScale(Spacing.xl),
  },
  title: {
    fontSize: scaleFontSize(36),
    color: Colors.black,
    textAlign: 'center',
  },
  scanArea: {
    alignSelf: 'center',
    width: moderateScale(320),
    height: moderateScale(320),
    backgroundColor: Colors.bg,
    borderRadius: moderateScale(16),
    overflow: 'hidden',
    marginBottom: moderateScale(Spacing.xl),
  },
  qrPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  qrIcon: {
    width: moderateScale(200),
    height: moderateScale(200),
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrPattern: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  qrCorner: {
    position: 'absolute',
    width: moderateScale(50),
    height: moderateScale(50),
    backgroundColor: Colors.black,
    borderWidth: moderateScale(8),
    borderColor: Colors.black,
  },
  qrTopLeft: {
    top: 0,
    left: 0,
  },
  qrTopRight: {
    top: 0,
    right: 0,
  },
  qrBottomLeft: {
    bottom: 0,
    left: 0,
  },
  qrBottomRight: {
    bottom: 0,
    right: 0,
  },
  qrCenter: {
    position: 'absolute',
    top: '35%',
    left: '35%',
    width: '30%',
    height: '30%',
    backgroundColor: Colors.black,
  },
  buttonContainer: {
    alignItems: 'center',
    paddingHorizontal: moderateScale(Spacing.xl),
    paddingBottom: moderateScale(Spacing.lg),
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: scaleFontSize(16),
    color: Colors.muted,
    textAlign: 'center',
  },
});

export default ScanScreen;
