import React from 'react';
import { View, StyleSheet, Modal, Pressable } from 'react-native';
import AppText from './AppText';
import Button from './Button';
import { Colors, Radius, Spacing } from '@theme/tokens';
import { scaleWidth, scaleHeight, scaleFontSize, moderateScale } from '@utils/responsive';

interface InfoModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  message: string;
  icon?: string; // Emoji icon
  buttonText?: string;
}

const InfoModal: React.FC<InfoModalProps> = ({
  visible,
  onClose,
  title,
  message,
  icon = '⚠️',
  buttonText = 'Got it',
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable 
        style={styles.overlay}
        onPress={onClose}
      >
        <Pressable style={styles.modalContainer} onPress={(e) => e.stopPropagation()}>
          <View style={styles.modalContent}>
            {/* Icon */}
            <View style={styles.iconContainer}>
              <AppText style={styles.icon}>{icon}</AppText>
            </View>

            {/* Title */}
            <AppText weight="semiBold" style={styles.title}>
              {title}
            </AppText>

            {/* Message */}
            <AppText weight="regular" style={styles.message}>
              {message}
            </AppText>

            {/* Button */}
            <View style={styles.buttonContainer}>
              <Button
                title={buttonText}
                onPress={onClose}
                variant="primary"
                width={scaleWidth(200)}
              />
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: scaleWidth(320),
    maxWidth: '90%',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: moderateScale(Spacing.xl),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  iconContainer: {
    width: scaleWidth(64),
    height: scaleWidth(64),
    borderRadius: scaleWidth(32),
    backgroundColor: Colors.bg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scaleHeight(16),
  },
  icon: {
    fontSize: scaleFontSize(32),
  },
  title: {
    fontSize: scaleFontSize(20),
    color: Colors.black,
    textAlign: 'center',
    marginBottom: scaleHeight(12),
  },
  message: {
    fontSize: scaleFontSize(15),
    color: Colors.muted,
    textAlign: 'center',
    lineHeight: scaleFontSize(22),
    marginBottom: scaleHeight(24),
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
});

export default InfoModal;
