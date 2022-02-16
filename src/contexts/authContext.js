import React, { useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const reducer = (prevState, action) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        token: action.token,
        user: action.user,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        isSignout: false,
        token: action.token,
        user: action.user,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        isSignout: true,
        token: null,
        user: null,
      };
  }
};

const initialState = {
  isLoading: true,
  isSignout: false,
  token: null,
  user: null,
};

const AuthContext = React.createContext(undefined);

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error(
      'useAuthContext must be used within an AuthContextProvider',
    );
  }

  return context;
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = React.useMemo(
    () => ({
      state,
      dispatch,
      signIn: async ({ token, user }) => {
        try {
          await AsyncStorage.setItem('AUTH_TOKEN', token);
          await AsyncStorage.setItem('AUTH_USER_ID', user);
          dispatch({
            type: 'SIGN_IN',
            token,
          });
        } catch (err) {
          console.log(err);
        }
      },
      signOut: async () => {
        try {
          await AsyncStorage.clear();
          dispatch({ type: 'SIGN_OUT' });
        } catch (err) {
          console.log(err);
        }
      },
    }),
    [state],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
