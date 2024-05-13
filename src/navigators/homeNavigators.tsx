import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '@screens/HomeScreen';
import BottomTab from '@components/BottomTab';
import ProfileScreen from '@/screens/ProfileScreen';
import ChatSelectionScreen from '@/screens/ChatSelectionScreen';
import HistoryScreen from '@/screens/HistoryScreen';

export type HomeTabParamsList = {
  ChatSelectionScreen: undefined;
  HistoryScreen: undefined;
  HomeScreen: undefined;
  ProfileScreen: undefined;
};

const Tab = createBottomTabNavigator<HomeTabParamsList>();

const HomeNavigators = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{headerShown: false}}
      // eslint-disable-next-line react/no-unstable-nested-components
      tabBar={props => <BottomTab {...props} />}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="HistoryScreen" component={HistoryScreen} />
      <Tab.Screen name="ChatSelectionScreen" component={ChatSelectionScreen} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default HomeNavigators;
