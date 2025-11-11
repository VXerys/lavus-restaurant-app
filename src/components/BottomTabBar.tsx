import React from 'react';
import { View, StyleSheet, Pressable, Image } from 'react-native';
import AppText from './AppText';
import { NavBarIcons } from '@assets';
import { Colors, Spacing } from '@theme/tokens';

export type TabRoute = 'home' | 'hotDeal' | 'scan' | 'rewards' | 'reserve';

interface BottomTabBarProps {
  activeTab: TabRoute;
  onTabPress: (tab: TabRoute) => void;
}

const BottomTabBar: React.FC<BottomTabBarProps> = ({ activeTab, onTabPress }) => {
  const tabs = [
    { key: 'home' as TabRoute, label: 'Home', icon: NavBarIcons.home },
    { key: 'hotDeal' as TabRoute, label: 'Hot Deal', icon: NavBarIcons.hotDeal },
    { key: 'scan' as TabRoute, label: '', icon: NavBarIcons.scan }, // Scan button - no label
    { key: 'rewards' as TabRoute, label: 'Rewards', icon: NavBarIcons.rewards },
    { key: 'reserve' as TabRoute, label: 'Reserve', icon: NavBarIcons.reserve },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
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
    backgroundColor: Colors.white,
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    // Android Shadow
    elevation: 8,
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.md,
    backgroundColor: Colors.white,
    
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xs,
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
    marginTop: -24, // Elevate the scan button above the tab bar
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
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    // Android Shadow
    elevation: 8,
  },
  scanIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
});

export default BottomTabBar;
