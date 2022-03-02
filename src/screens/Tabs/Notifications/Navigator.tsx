import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Notifications from '.';
import Profile from './Profile';
import ChangePassword from './ChangePassword';

const Navigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Notifications"
      component={Notifications}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ChangePassword"
      component={ChangePassword}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default Navigator;
