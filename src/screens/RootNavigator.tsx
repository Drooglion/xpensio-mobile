import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import isNil from 'lodash/isNil';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

/* Navigators */
import Tabs from './Tabs';
import RequestDetails from './Tabs/Requests/RequestDetails';
import { useAuth } from 'contexts/authContext';

/* Auth */
// import Auth from './Auth/Root';
import Splash from './Auth/Splash';
import Login from './Auth/Login';
import ForgotPassword from './Auth/ForgotPassword';
// import Register from './Auth/Register';
// import CompleteRegister from './Auth/CompleteRegister';
// import Splash from './Auth/Splash';
// import Settings from './Settings/Navigator';
// import Media from './Media/Navigator';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const { state, dispatch } = useAuth();

  console.log({ state, dispatch });

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let token;
      let userId;

      try {
        token = await AsyncStorage.getItem('AUTH_TOKEN');
        userId = await AsyncStorage.getItem('AUTH_USER_ID');
      } catch (e) {
        console.log(e);
      }

      dispatch({ type: 'RESTORE_TOKEN', token, userId });
    };

    bootstrapAsync();
  }, [dispatch]);

  console.log('RootNav', state);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="Tabs">{() => <Tabs />}</Stack.Screen>
        <Stack.Screen name="Request Details" component={RequestDetails} /> */}
        {state.isLoading ? (
          <Stack.Screen name="Splash" component={Splash} />
        ) : state.isSignout || isNil(state.token) ? (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          </>
        ) : (
          <>
            <Stack.Screen name="Tabs">{() => <Tabs />}</Stack.Screen>
            <Stack.Screen name="Request Details" component={RequestDetails} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
