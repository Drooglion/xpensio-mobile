import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
import Payments from '.';
import PaymentsDetails from './PaymentsDetails';

const Navigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Payment"
      component={Payments}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="PaymentsDetails"
      component={PaymentsDetails}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default Navigator;
