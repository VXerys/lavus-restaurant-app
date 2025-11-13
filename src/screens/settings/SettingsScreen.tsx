import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText, UserAvatar, Button, InfoOverlay } from '@components';
import { Colors, Spacing, Radius } from '@theme/tokens';
import { moderateScale, scaleFontSize } from '@utils/responsive';
import { useAuth } from '../../contexts/AuthContext';

interface Props {
  navigation?: any;
  onBack?: () => void;
}

const SettingsScreen: React.FC<Props> = ({ navigation, onBack }) => {
  const { user, signOut, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [loading, setLoading] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);

  const handleSave = async () => {
    if (!displayName.trim()) {
      Alert.alert('Error', 'Name cannot be empty');
      return;
    }

    setLoading(true);
    try {
      await updateUserProfile({ displayName: displayName.trim() });
      setIsEditing(false);
      setSuccessVisible(true);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut();
              if (navigation) {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Main' }],
                });
              }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error: any) {
              Alert.alert('Error', 'Failed to sign out');
            }
          },
        },
      ]
    );
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (navigation) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={handleBack} style={styles.backButton}>
            <AppText weight="semiBold" style={styles.backText}>←</AppText>
          </Pressable>
          <AppText weight="serifTitle" style={styles.headerTitle}>Settings</AppText>
          <View style={styles.backButton} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <UserAvatar
              displayName={user?.displayName}
              photoURL={user?.photoURL}
              size="large"
            />
            <View style={styles.profileInfo}>
              <AppText weight="semiBold" style={styles.email}>{user?.email}</AppText>
              <AppText weight="regular" style={styles.emailLabel}>Email Address</AppText>
            </View>
          </View>

          {/* Account Information */}
          <View style={styles.section}>
            <AppText weight="serifTitle" style={styles.sectionTitle}>Account Information</AppText>

            {/* Display Name */}
            <View style={styles.inputGroup}>
              <AppText weight="regular" style={styles.inputLabel}>Full Name</AppText>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={displayName}
                  onChangeText={setDisplayName}
                  placeholder="Enter your name"
                  placeholderTextColor={Colors.muted}
                  autoFocus
                />
              ) : (
                <View style={styles.inputDisplay}>
                  <AppText weight="regular" style={styles.inputText}>
                    {user?.displayName || 'Not set'}
                  </AppText>
                </View>
              )}
            </View>

            {/* Phone Number */}
            <View style={styles.inputGroup}>
              <AppText weight="regular" style={styles.inputLabel}>Phone Number</AppText>
              <View style={styles.inputDisplay}>
                <AppText weight="regular" style={styles.inputText}>
                  {user?.phoneNumber || 'Not set'}
                </AppText>
              </View>
            </View>

            {/* Edit/Save Button */}
            {isEditing ? (
              <View style={styles.buttonRow}>
                <Button
                  title="Cancel"
                  variant="outline"
                  onPress={() => {
                    setIsEditing(false);
                    setDisplayName(user?.displayName || '');
                  }}
                  style={styles.halfButton}
                />
                <Button
                  title={loading ? 'Saving...' : 'Save'}
                  variant="primary"
                  onPress={handleSave}
                  disabled={loading}
                  style={styles.halfButton}
                />
              </View>
            ) : (
              <Button
                title="Edit Profile"
                variant="outline"
                onPress={() => setIsEditing(true)}
              />
            )}
          </View>

          {/* Preferences Section */}
          <View style={styles.section}>
            <AppText weight="serifTitle" style={styles.sectionTitle}>Preferences</AppText>
            
            <Pressable style={styles.menuItem}>
              <AppText weight="regular" style={styles.menuItemText}>Dietary Restrictions</AppText>
              <AppText weight="regular" style={styles.menuItemArrow}>→</AppText>
            </Pressable>

            <Pressable style={styles.menuItem}>
              <AppText weight="regular" style={styles.menuItemText}>Favorite Cuisines</AppText>
              <AppText weight="regular" style={styles.menuItemArrow}>→</AppText>
            </Pressable>

            <Pressable style={styles.menuItem}>
              <AppText weight="regular" style={styles.menuItemText}>Allergies</AppText>
              <AppText weight="regular" style={styles.menuItemArrow}>→</AppText>
            </Pressable>
          </View>

          {/* About Section */}
          <View style={styles.section}>
            <AppText weight="serifTitle" style={styles.sectionTitle}>About</AppText>
            
            <Pressable style={styles.menuItem}>
              <AppText weight="regular" style={styles.menuItemText}>Terms of Service</AppText>
              <AppText weight="regular" style={styles.menuItemArrow}>→</AppText>
            </Pressable>

            <Pressable style={styles.menuItem}>
              <AppText weight="regular" style={styles.menuItemText}>Privacy Policy</AppText>
              <AppText weight="regular" style={styles.menuItemArrow}>→</AppText>
            </Pressable>

            <View style={styles.menuItem}>
              <AppText weight="regular" style={styles.menuItemText}>App Version</AppText>
              <AppText weight="regular" style={styles.versionText}>1.0.0</AppText>
            </View>
          </View>

          {/* Sign Out Button */}
          <View style={styles.signOutSection}>
            <Button
              title="Sign Out"
              variant="outline"
              onPress={handleSignOut}
              style={styles.signOutButton}
            />
          </View>
        </ScrollView>

        {/* Success Overlay */}
        <InfoOverlay
          visible={successVisible}
          icon="✓"
          title="Success"
          message="Profile updated successfully!"
          onClose={() => setSuccessVisible(false)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.bg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.muted + '20',
  },
  backButton: {
    width: moderateScale(40),
    height: moderateScale(40),
    justifyContent: 'center',
  },
  backText: {
    fontSize: scaleFontSize(28),
    color: Colors.black,
  },
  headerTitle: {
    fontSize: scaleFontSize(20),
    color: Colors.black,
  },
  content: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.white,
    marginTop: Spacing.md,
    marginHorizontal: Spacing.lg,
    borderRadius: Radius.md,
  },
  profileInfo: {
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  email: {
    fontSize: scaleFontSize(16),
    color: Colors.black,
    marginBottom: Spacing.xs,
  },
  emailLabel: {
    fontSize: scaleFontSize(13),
    color: Colors.muted,
  },
  section: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    marginTop: Spacing.md,
  },
  sectionTitle: {
    fontSize: scaleFontSize(18),
    color: Colors.black,
    marginBottom: Spacing.md,
  },
  inputGroup: {
    marginBottom: Spacing.md,
  },
  inputLabel: {
    fontSize: scaleFontSize(14),
    color: Colors.muted,
    marginBottom: Spacing.xs,
  },
  input: {
    backgroundColor: Colors.white,
    borderRadius: Radius.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: scaleFontSize(15),
    color: Colors.black,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  inputDisplay: {
    backgroundColor: Colors.white,
    borderRadius: Radius.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.muted + '30',
  },
  inputText: {
    fontSize: scaleFontSize(15),
    color: Colors.black,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },
  halfButton: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: Radius.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    marginBottom: Spacing.sm,
  },
  menuItemText: {
    fontSize: scaleFontSize(15),
    color: Colors.black,
  },
  menuItemArrow: {
    fontSize: scaleFontSize(18),
    color: Colors.muted,
  },
  versionText: {
    fontSize: scaleFontSize(15),
    color: Colors.muted,
  },
  signOutSection: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
  },
  signOutButton: {
    borderColor: '#FF3B30',
  },
});

export default SettingsScreen;
