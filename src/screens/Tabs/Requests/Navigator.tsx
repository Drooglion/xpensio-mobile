import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Requests from './index';
import RequestDetails from './RequestDetails';

export type RequestNavigatorParamList = {
  RequestsList: undefined;
  RequestDetails: { id: string };
};

const Stack = createStackNavigator<RequestNavigatorParamList>();

export default () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="RequestsList">
      <Stack.Screen
        name="RequestsList"
        component={Requests}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RequestDetails"
        component={RequestDetails}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
