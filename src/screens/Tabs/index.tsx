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

import RequestsStack from './Requests';
import PaymentsStack from './Payments';
import R from 'res/R';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  const screenOptions = useCallback(
    ({ route }) => ({
      keyboardHidesTabBar: false,
      headerShown: false,
      tabBarIcon: ({ focused }: { focused: boolean }) => {
        const { name } = route;
        let iconName = '';
        if (name === 'Payments') {
          iconName = `ic_payments${focused ? '_selected' : ''}`;
        } else if (name === 'MyCards') {
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
    <Tab.Navigator
      screenOptions={screenOptions}
      //@ts-ignore
      tabBarOptions={{
        activeTintColor: R.colors.primary,
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Payments" component={PaymentsStack} />
      <Tab.Screen name="Requests" component={RequestsStack} />
      <Tab.Screen name="MyCards" component={RequestsStack} />
      <Tab.Screen name="Notifications" component={RequestsStack} />
    </Tab.Navigator>
  );
}
