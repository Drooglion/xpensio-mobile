import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
import Cards from '.';
import CardScanner from './CardScanner';
import ActivateCard from './ActivateCard';
import ActivateCardSuccess from './ActivateCardSuccess';

const Navigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Cards"
      component={Cards}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Scanner"
      component={CardScanner}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ActivateCard"
      component={ActivateCard}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ActivateCardSuccess"
      component={ActivateCardSuccess}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default Navigator;
