import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Requests from './index';
import RequestDetails from './RequestDetails';

const Stack = createStackNavigator<any>();

export default () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Requests">
      <Stack.Screen name="Requests" component={Requests} />
    </Stack.Navigator>
  );
};
