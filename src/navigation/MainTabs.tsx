import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import HomeScreen from '@screens/HomeScreen';
import HotDealScreen from '@screens/HotDealScreen';
import RewardsScreen from '@screens/RewardsScreen';
import ReserveScreen from '@screens/ReserveScreen';
import BottomTabBar, { TabRoute } from '@components/BottomTabBar';

interface MainTabsProps {
  onLoginPress: () => void;
  navigation?: any;
}

const MainTabs: React.FC<MainTabsProps> = ({ onLoginPress, navigation }) => {
  const [activeTab, setActiveTab] = useState<TabRoute>('home');

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
        return <RewardsScreen />;
      case 'reserve':
        return <ReserveScreen />;
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
