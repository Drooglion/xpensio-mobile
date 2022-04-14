import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
// import Config from 'react-native-config';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleProvider } from 'native-base';
import SplashScreen from 'react-native-splash-screen';
import './i18n';

// import RootNavigator from './src/screens/RootNavigator';
import getTheme from './native-base-theme/components';
import platform from './native-base-theme/variables/platform';
// import Login from './src/screens/Auth/Login';
import RootNavigator from './src/screens/RootNavigator';
import { AuthContextProvider } from 'contexts/authContext';

import { ResourceProvider } from 'contexts/resourceContext';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  /* client for react-query provider */
  const queryClient = new QueryClient();

  return (
    <StyleProvider style={getTheme(platform)}>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <ResourceProvider>
            <RootNavigator />
          </ResourceProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </StyleProvider>
  );
};

export default App;
