# Scan Components

This directory contains components for the QR Code scanning functionality.

## Components

### ScanFrame

- Visual frame overlay for camera scanning
- Animated scanning line that moves up and down
- Corner brackets to indicate scan area
- Props:
  - `isScanning`: boolean - Controls the scanning animation

### ScanAnalyzing

- Overlay displayed during QR code analysis
- Shows progress bar and analyzing message
- Auto-dismisses after completion
- Props:
  - `isVisible`: boolean - Controls visibility
  - `onComplete`: function - Callback when analysis completes

## Features

- Real camera-based QR code scanning using react-native-vision-camera
- Smooth animations for scanning line
- Progress indicator during analysis
- Demo mode: All QR codes are considered valid for demonstration purposes
- Supports multiple barcode formats: QR, EAN-13, EAN-8, Code-128, Code-39
- Camera permission handling with user-friendly alerts
- Responsive design that works across different screen sizes

## Usage

```tsx
import { ScanFrame, ScanAnalyzing } from '@components/scan';

// In your screen
<ScanFrame isScanning={isScanning} />
<ScanAnalyzing
  isVisible={isAnalyzing}
  onComplete={handleAnalysisComplete}
/>
```

## Permissions

### Android (AndroidManifest.xml)

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-feature android:name="android.hardware.camera" android:required="false" />
```

### iOS (Info.plist)

```xml
<key>NSCameraUsageDescription</key>
<string>We need camera access to scan QR codes for payment</string>
```
