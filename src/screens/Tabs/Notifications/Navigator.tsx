import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Notifications from '.';
import Profile from './Profile';
import ChangePassword from './ChangePassword';
import EditProfile from './EditProfile';
import Identification from './Identification';
import Team from './Team';

const Navigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="NotificationsList"
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
    <Stack.Screen
      name="EditProfile"
      component={EditProfile}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Identification"
      component={Identification}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Team"
      component={Team}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default Navigator;
