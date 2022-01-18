import React, { useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Thumbnail } from 'native-base';
// import Icon from 'react-native-vector-icons/Foundation';
// import AffiliatesStack from '@screens/MainTab/Affiliates/Navigator';
// import HomeStack from '@screens/MainTab/Home/Navigator';
// import LiveShowStack from '@screens/MainTab/LiveShow/Navigator';
// import DonateStack from '@screens/MainTab/Donate/Navigator';
// import SearchShowsStack from '@screens/MainTab/SearchShows/Navigator';
// import { Platform } from 'react-native';

import PaymentsStack from './Payments';
import RequestsStack from './Requests';
import CardsStack from './Cards';
import NotificationsStack from './Notifications';
import R from 'res/R';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  const screenOptions = useCallback(
    ({ route }) => ({
      swipeEnabled: false,
      keyboardHidesTabBar: false,
      headerShown: false,
      tabBarActiveTintColor: R.colors.primary,
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: { display: 'flex' },
      tabBarIcon: ({ focused }: { focused: boolean }) => {
        const { name } = route;
        let iconName = '';
        if (name === 'Payments') {
          iconName = `ic_payments${focused ? '_selected' : ''}`;
        } else if (name === 'My cards') {
          iconName = `ic_cards${focused ? '_selected' : ''}`;
        } else if (name === 'Notifications') {
          iconName = `ic_notifications${focused ? '_selected' : ''}`;
        } else if (name === 'Requests') {
          iconName = `ic_requests${focused ? '_selected' : ''}`;
        }

        return (
          <Thumbnail
            //@ts-ignore
            source={R.images[iconName]}
            square
            // eslint-disable-next-line react-native/no-inline-styles
            style={{ height: 20, width: 20 }}
          />
        );
      },
    }),
    [],
  );
  return (
    //@ts-ignore
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Payments" component={PaymentsStack} />
      <Tab.Screen name="Requests" component={RequestsStack} />
      <Tab.Screen name="My cards" component={CardsStack} />
      <Tab.Screen name="Notifications" component={NotificationsStack} />
    </Tab.Navigator>
  );
}
