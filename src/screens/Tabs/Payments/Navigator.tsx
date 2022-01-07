import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
import Payments from '.';

const Navigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Payment" component={Payments} />
  </Stack.Navigator>
);

export default Navigator;
