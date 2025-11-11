import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base dimensions (iPhone 11 Pro)
const baseWidth = 375;
const baseHeight = 812;

/**
 * Scales a value based on screen width
 * @param size - The size to scale
 * @returns Scaled size
 */
export const scaleWidth = (size: number): number => {
  return (SCREEN_WIDTH / baseWidth) * size;
};

/**
 * Scales a value based on screen height
 * @param size - The size to scale
 * @returns Scaled size
 */
export const scaleHeight = (size: number): number => {
  return (SCREEN_HEIGHT / baseHeight) * size;
};

/**
 * Scales font size based on screen width and pixel ratio
 * @param size - The font size to scale
 * @returns Scaled font size
 */
export const scaleFontSize = (size: number): number => {
  const scale = SCREEN_WIDTH / baseWidth;
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

/**
 * Moderately scales a value (less aggressive than scaleWidth)
 * Good for spacing and padding
 * @param size - The size to scale
 * @param factor - Scaling factor (default: 0.5)
 * @returns Scaled size
 */
export const moderateScale = (size: number, factor: number = 0.5): number => {
  return size + (scaleWidth(size) - size) * factor;
};

/**
 * Get responsive dimensions
 */
export const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

/**
 * Check if device is small (width < 375)
 */
export const isSmallDevice = SCREEN_WIDTH < 375;

/**
 * Check if device is large (width > 414)
 */
export const isLargeDevice = SCREEN_WIDTH > 414;

/**
 * Get responsive button width
 * @param percentage - Percentage of screen width (0-1)
 * @returns Responsive width
 */
export const getButtonWidth = (percentage: number = 0.85): number => {
  const maxWidth = 400; // Maximum width for tablets
  const minWidth = 280; // Minimum width for small phones
  const calculatedWidth = SCREEN_WIDTH * percentage;
  
  if (calculatedWidth > maxWidth) return maxWidth;
  if (calculatedWidth < minWidth) return minWidth;
  return calculatedWidth;
};

/**
 * Get responsive padding
 */
export const getResponsivePadding = () => {
  if (isSmallDevice) return moderateScale(16);
  if (isLargeDevice) return moderateScale(28);
  return moderateScale(24);
};
