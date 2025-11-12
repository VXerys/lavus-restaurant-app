import React from 'react';
import { View, StyleSheet, Pressable, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '@components/common';
import { NavBarIcons } from '@assets';
import { Colors, Spacing } from '@theme/tokens';

export type TabRoute = 'home' | 'hotDeal' | 'scan' | 'rewards' | 'reserve';

interface BottomTabBarProps {
  activeTab: TabRoute;
  onTabPress: (tab: TabRoute) => void;
}

const BottomTabBar: React.FC<BottomTabBarProps> = ({ activeTab, onTabPress }) => {
  const insets = useSafeAreaInsets();
  
  const tabs = [
    { key: 'home' as TabRoute, label: 'Home', icon: NavBarIcons.home },
    { key: 'hotDeal' as TabRoute, label: 'Hot Deal', icon: NavBarIcons.hotDeal },
    { key: 'scan' as TabRoute, label: '', icon: NavBarIcons.scan }, // Scan button - no label
    { key: 'rewards' as TabRoute, label: 'Rewards', icon: NavBarIcons.rewards },
    { key: 'reserve' as TabRoute, label: 'Reserve', icon: NavBarIcons.reserve },
  ];

  return (
    <View style={styles.container}>
      <View style={[styles.tabBar, { paddingBottom: Math.max(insets.bottom, Spacing.md) }]}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          const isScanButton = tab.key === 'scan';

          if (isScanButton) {
            // Special scan button in the center
            return (
              <Pressable
                key={tab.key}
                style={styles.scanButtonWrapper}
                onPress={() => onTabPress(tab.key)}
              >
                <View style={styles.scanButton}>
                  <Image source={tab.icon} style={styles.scanIcon} />
                </View>
              </Pressable>
            );
          }

          return (
            <Pressable
              key={tab.key}
              style={styles.tabItem}
              onPress={() => onTabPress(tab.key)}
            >
              <Image
                source={isActive ? tab.icon.active : tab.icon.inactive}
                style={styles.tabIcon}
              />
              <AppText
                weight={isActive ? 'semiBold' : 'regular'}
                style={[
                  styles.tabLabel,
                  isActive && styles.tabLabelActive,
                ]}
              >
                {tab.label}
              </AppText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bg,
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md + 4,
    // paddingBottom will be set dynamically with safe area insets
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    // Android Shadow
    elevation: 12,
    overflow: 'visible',
    zIndex: 10, // Above notch container
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
  },
  tabIcon: {
    width: 24,
    height: 24,
    marginBottom: 4,
    resizeMode: 'contain',
  },
  tabLabel: {
    fontSize: 12,
    color: Colors.black,
    textAlign: 'center',
  },
  tabLabelActive: {
    color: Colors.primary,
  },
  scanButtonWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -52, // Elevate the scan button above the tab bar (increased from -24)
    // iOS Shadow for wrapper - creates outer glow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    // Android Shadow
    elevation: 24,
  },
  scanButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    // iOS Shadow - Strong shadow for floating effect
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    // Android Shadow
    elevation: 20,
  },
  scanIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
});

export default BottomTabBar;
