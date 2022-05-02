import React, { useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Thumbnail } from 'native-base';

import PaymentsStack from './Payments/Navigator';
import RequestsStack from './Requests/Navigator';
import CardsStack from './Cards/Navigator';
import NotificationsStack from './Notifications/Navigator';
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
      {/* Move Notifications at the end */}
      <Tab.Screen name="Payments" component={PaymentsStack} />
      <Tab.Screen name="Requests" component={RequestsStack} />
      <Tab.Screen name="My cards" component={CardsStack} />
      <Tab.Screen name="Notifications" component={NotificationsStack} />
    </Tab.Navigator>
  );
}
