import React, { useState } from 'react';
import ScanScreen from './ScanScreen';
import YourDishesScreen from './YourDishesScreen';
import PaymentCompletedScreen from './PaymentCompletedScreen';
import ReviewScreen from './ReviewScreen';
import ReviewCompletedScreen from './ReviewCompletedScreen';

interface ScanFlowScreenProps {
  onBack?: () => void;
  onComplete?: () => void;
}

type FlowStep = 'scan' | 'dishes' | 'completed' | 'review' | 'reviewCompleted';

const ScanFlowScreen: React.FC<ScanFlowScreenProps> = ({ onBack, onComplete }) => {
  const [currentStep, setCurrentStep] = useState<FlowStep>('scan');

  const handleScanComplete = (data: string) => {
    // Setelah scan selesai, otomatis lanjut ke YourDishes screen
    console.log('QR Code scanned:', data);
    setCurrentStep('dishes');
  };

  const handleDishesBack = () => {
    // Kembali ke scan screen
    setCurrentStep('scan');
  };

  const handlePayNow = () => {
    // Process payment and show completed screen
    console.log('Processing payment...');
    setCurrentStep('completed');
  };

  const handleReviewNow = () => {
    // Navigate to review screen
    console.log('Navigate to review');
    setCurrentStep('review');
  };

  const handleGoHome = () => {
    // Navigate back to home
    console.log('Go to home');
    onComplete?.();
  };

  const handleReviewSubmit = (rating: number) => {
    // Handle review submission
    console.log('Review submitted with rating:', rating);
    // Navigate to review completed screen
    setCurrentStep('reviewCompleted');
  };

  const handleReviewCompletedGoHome = () => {
    // Navigate back to home
    console.log('Go to home from review completed');
    onComplete?.();
  };

  if (currentStep === 'scan') {
    return (
      <ScanScreen
        onBack={onBack}
        onScanComplete={handleScanComplete}
      />
    );
  }

  if (currentStep === 'dishes') {
    return (
      <YourDishesScreen
        onBack={handleDishesBack}
        onPayNow={handlePayNow}
      />
    );
  }

  if (currentStep === 'completed') {
    return (
      <PaymentCompletedScreen
        onReviewNow={handleReviewNow}
        onGoHome={handleGoHome}
      />
    );
  }

  if (currentStep === 'review') {
    return (
      <ReviewScreen
        onSubmit={handleReviewSubmit}
      />
    );
  }

  return (
    <ReviewCompletedScreen
      onGoHome={handleReviewCompletedGoHome}
    />
  );
};

export default ScanFlowScreen;
