import { useState, useRef } from 'react';
import { Animated } from 'react-native';

export const useClaimDealAnimation = (onComplete?: () => void) => {
  const [isClaiming, setIsClaiming] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false);
  
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const checkmarkScale = useRef(new Animated.Value(0)).current;
  const checkmarkRotate = useRef(new Animated.Value(0)).current;

  const handleClaimDeal = () => {
    if (isClaiming || isClaimed) return;

    setIsClaiming(true);

    // Button press animation - scale down
    Animated.sequence([
      // Press down
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      // Scale up to emphasize
      Animated.spring(scaleAnim, {
        toValue: 1.05,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
      // Return to normal
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // After button animation, show claimed state
      setIsClaimed(true);

      // Animate overlay fade in and checkmark appearance
      Animated.parallel([
        // Fade in overlay
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        // Pop in checkmark with rotation
        Animated.sequence([
          Animated.delay(150),
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
          ]),
        ]),
      ]).start(() => {
        // Wait to show the success state
        setTimeout(() => {
          // Fade out and navigate back
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 350,
            useNativeDriver: true,
          }).start(() => {
            // Navigate back or call completion callback
            if (onComplete) {
              onComplete();
            }
          });
        }, 1200);
      });
    });
  };

  return {
    isClaiming,
    isClaimed,
    scaleAnim,
    fadeAnim,
    checkmarkScale,
    checkmarkRotate,
    handleClaimDeal,
  };
};
