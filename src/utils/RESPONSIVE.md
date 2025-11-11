# Responsive Utilities

## Overview
Responsive utilities help create consistent, scalable UI across different screen sizes and devices.

## Base Dimensions
- **Base Width**: 375px (iPhone 11 Pro)
- **Base Height**: 812px (iPhone 11 Pro)

## Functions

### `scaleWidth(size: number): number`
Scales a value based on screen width.

### `scaleHeight(size: number): number`
Scales a value based on screen height.

### `scaleFontSize(size: number): number`
Scales font size based on screen width and pixel ratio for optimal readability.

### `moderateScale(size: number, factor?: number): number`
Moderately scales a value (less aggressive than scaleWidth). Good for spacing and padding.

### `getButtonWidth(percentage?: number): number`
Gets responsive button width with min/max constraints.
- **Min Width**: 280px
- **Max Width**: 400px
- **Default**: 85% of screen width

### Device Checks
- `isSmallDevice` - True if screen width < 375px
- `isLargeDevice` - True if screen width > 414px
- `screenWidth` - Current screen width
- `screenHeight` - Current screen height

## Usage

```typescript
import { scaleFontSize, moderateScale, getButtonWidth } from '@utils/responsive';

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(24),
  },
  title: {
    fontSize: scaleFontSize(32),
  },
  button: {
    width: getButtonWidth(0.8),
  },
});
```

## Best Practices
1. Always use `scaleFontSize()` for text
2. Use `moderateScale()` for padding, margins, gaps
3. Use `getButtonWidth()` for consistent button widths
4. Use percentage-based widths with maxWidth/maxHeight for images
