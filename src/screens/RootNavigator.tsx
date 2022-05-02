import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import isNil from 'lodash/isNil';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

/* Navigators */
import Tabs from './Tabs';
import { useAuth } from 'contexts/authContext';

/* Auth */
// import Auth from './Auth/Root';
import Splash from './Auth/Splash';
import Login from './Auth/Login';
import ForgotPassword from './Auth/ForgotPassword';
import useFetchAccount from 'hooks/api/private/account/useFetchAccount';
import LoadingModal from 'library/components/LoadingModal';
import DialogModal from 'library/components/DialogModal';
// import Register from './Auth/Register';
// import CompleteRegister from './Auth/CompleteRegister';
// import Splash from './Auth/Splash';
// import Settings from './Settings/Navigator';
// import Media from './Media/Navigator';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const { state, dispatch } = useAuth();
  useFetchAccount({});

  console.log({ state, dispatch });

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let token;

      try {
        token = await AsyncStorage.getItem('AUTH_TOKEN');
      } catch (e) {
        console.log(e);
      }

      dispatch({ type: 'RESTORE_TOKEN', token });
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
            <Stack.Screen name="Tabs">
              {() => (
                <>
                  <LoadingModal />
                  <DialogModal />
                  <Tabs />
                </>
              )}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
