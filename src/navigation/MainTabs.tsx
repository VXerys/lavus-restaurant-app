import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { HomeScreen } from '@screens/home';
import { HotDealScreen } from '@screens/hot-deal';
import { RewardsScreen } from '@screens/rewards';
import { ReserveScreen } from '@screens/reserve';
import { BottomTabBar } from '@components/navigation';
import type { TabRoute } from '@components/navigation/BottomTabBar';

interface MainTabsProps {
  onLoginPress: () => void;
  navigation?: any;
  initialTab?: TabRoute;
}

const MainTabs: React.FC<MainTabsProps> = ({ onLoginPress, navigation, initialTab }) => {
  const [activeTab, setActiveTab] = useState<TabRoute>(initialTab || 'home');

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen onLoginPress={onLoginPress} navigation={navigation} />;
      case 'hotDeal':
        return <HotDealScreen navigation={navigation} />;
      case 'scan':
        // TODO: Implement scan functionality
        return <HomeScreen onLoginPress={onLoginPress} navigation={navigation} />;
      case 'rewards':
        return <RewardsScreen navigation={navigation} />;
      case 'reserve':
        return <ReserveScreen navigation={navigation} />;
      default:
        return <HomeScreen onLoginPress={onLoginPress} navigation={navigation} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.screenContainer}>
        {renderScreen()}
      </View>
      <BottomTabBar
        activeTab={activeTab}
        onTabPress={(tab) => {
          setActiveTab(tab);
          console.log('Tab pressed:', tab);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
  },
});

export default MainTabs;
