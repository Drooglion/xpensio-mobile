import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MyCards from './index';
import CardScanner from './CardScanner';
import ActivateCard from './ActivateCard';
import ActivateCardSuccess from './ActivateCardSuccess';

const Stack = createStackNavigator<any>();

export default () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="MyCards">
      <Stack.Screen name="MyCards" component={MyCards} />
    </Stack.Navigator>
  );
};
