import { useState, useRef, useEffect } from 'react';
import { Animated } from 'react-native';

export const useScanAnimation = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Scanning line animation
  const scanLinePosition = useRef(new Animated.Value(0)).current;
  
  // Corner animations
  const cornerOpacity = useRef(new Animated.Value(0)).current;
  const cornerScale = useRef(new Animated.Value(0.8)).current;

  // Success overlay animations
  const successFadeAnim = useRef(new Animated.Value(0)).current;
  const successScale = useRef(new Animated.Value(0)).current;
  const checkmarkScale = useRef(new Animated.Value(0)).current;
  const checkmarkRotate = useRef(new Animated.Value(0)).current;

  // Start scanning animation
  useEffect(() => {
    if (isScanning && !isAnalyzing) {
      // Animate corners appearing
      Animated.parallel([
        Animated.timing(cornerOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(cornerScale, {
          toValue: 1,
          friction: 6,
          tension: 80,
          useNativeDriver: true,
        }),
      ]).start();

      // Continuous scanning line animation
      const scanAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(scanLinePosition, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(scanLinePosition, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      );
      scanAnimation.start();

      return () => {
        scanAnimation.stop();
      };
    }
  }, [isScanning, isAnalyzing, scanLinePosition, cornerOpacity, cornerScale]);

  const startScanning = () => {
    setIsScanning(true);
    setIsAnalyzing(false);
    setIsSuccess(false);
  };

  const startAnalyzing = () => {
    setIsAnalyzing(true);
    // Reset scan line position
    Animated.timing(scanLinePosition, {
      toValue: 0,
      duration: 0,
      useNativeDriver: true,
    }).start();
  };

  const showSuccess = (onComplete?: () => void) => {
    setIsSuccess(true);

    // Success animation sequence
    Animated.sequence([
      // Fade in overlay
      Animated.timing(successFadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      // Scale in card
      Animated.spring(successScale, {
        toValue: 1,
        friction: 8,
        tension: 80,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Checkmark animation
      Animated.parallel([
        Animated.spring(checkmarkScale, {
          toValue: 1,
          friction: 6,
          tension: 80,
          useNativeDriver: true,
        }),
        Animated.spring(checkmarkRotate, {
          toValue: 1,
          friction: 8,
          tension: 80,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Auto proceed after showing success
        setTimeout(() => {
          // Fade out
          Animated.parallel([
            Animated.timing(successFadeAnim, {
              toValue: 0,
              duration: 350,
              useNativeDriver: true,
            }),
            Animated.timing(successScale, {
              toValue: 0.8,
              duration: 350,
              useNativeDriver: true,
            }),
          ]).start(() => {
            if (onComplete) {
              onComplete();
            }
          });
        }, 1500);
      });
    });
  };

  const reset = () => {
    setIsScanning(false);
    setIsAnalyzing(false);
    setIsSuccess(false);
    scanLinePosition.setValue(0);
    cornerOpacity.setValue(0);
    cornerScale.setValue(0.8);
    successFadeAnim.setValue(0);
    successScale.setValue(0);
    checkmarkScale.setValue(0);
    checkmarkRotate.setValue(0);
  };

  return {
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
    reset,
  };
};
