import React, { useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/Foundation';
// import AffiliatesStack from '@screens/MainTab/Affiliates/Navigator';
// import HomeStack from '@screens/MainTab/Home/Navigator';
// import LiveShowStack from '@screens/MainTab/LiveShow/Navigator';
// import DonateStack from '@screens/MainTab/Donate/Navigator';
// import SearchShowsStack from '@screens/MainTab/SearchShows/Navigator';
// import { Platform } from 'react-native';

import RequestsStack from './Requests';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  const screenOptions = useCallback(
    ({ _route }) => ({
      keyboardHidesTabBar: false,
      headerShown: false,
      // tabBarIcon: ({ focused, color, size }) => {
      //   const { name } = route;
      //   let iconName;

      //   if (name === 'Payments') {
      //     iconName = 'home';
      //   } else if (name === 'Live') {
      //     iconName = 'play-video';
      //   } else if (name === 'Search') {
      //     iconName = 'magnifying-glass';
      //   } else if (name === 'Affiliates') {
      //     iconName = 'link';
      //   } else if (name === 'Donate') {
      //     iconName = 'heart';
      //   }

      //   // You can return any component that you like here!
      //   return <Icon name={iconName} size={size} color={color} />;
      // },
    }),
    [],
  );
  return (
    <Tab.Navigator>
      <Tab.Screen name="Payments" component={RequestsStack} />
      <Tab.Screen name="Requests" component={RequestsStack} />
      <Tab.Screen name="MyCards" component={RequestsStack} />
      <Tab.Screen name="Notifications" component={RequestsStack} />
    </Tab.Navigator>
  );
}
