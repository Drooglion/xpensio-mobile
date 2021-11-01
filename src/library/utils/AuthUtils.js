/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */
import AsyncStorage from '@react-native-community/async-storage';
import { GoogleSignin } from 'react-native-google-signin';
import firebase from 'react-native-firebase';
import HelperUtils from 'library/utils/HelperUtils';

const getToken = async () => {
  let token = '';
  try {
    token = await AsyncStorage.getItem('AUTH_TOKEN');
    return token;
  } catch (error) {
    HelperUtils.bugsnag.notify(error);
    console.log(error.message);
    return null;
  }
};

const getLoginTimestamp = async () => {
  let LOGIN_TIMESTAMP = '';
  try {
    LOGIN_TIMESTAMP = await AsyncStorage.getItem('LOGIN_TIMESTAMP');
    return LOGIN_TIMESTAMP;
  } catch (error) {
    HelperUtils.bugsnag.notify(error);
    console.log(error.message);
    return null;
  }
};

const setToken = async (token) => {
  try {
    await AsyncStorage.setItem('AUTH_TOKEN', token);
  } catch (error) {
    HelperUtils.bugsnag.notify(error);
    console.log(error.message);
  }
};

const signOut = async (navigation, client) => {
  try {
    await AsyncStorage.clear();
    GoogleSignin.revokeAccess();
    GoogleSignin.signOut();
    client.resetStore();
    navigation.navigate('AuthLoading');
  } catch (error) {
    HelperUtils.bugsnag.notify(error);
  }
};

const sessionSignOut = async (navigation, client) => {
  try {
    await AsyncStorage.clear();
    GoogleSignin.revokeAccess();
    GoogleSignin.signOut();
    client.resetStore();
    navigation.navigate({
      key: 'AuthLoading',
      routeName: 'AuthLoading',
      params: 'sessionSignOut'
    });
  } catch (error) {
    HelperUtils.bugsnag.notify(error);
  }
};

const registerDeviceToken = async () => {
  let fcmToken = null;
  try {
    fcmToken = await firebase.messaging().getToken();
  } catch (error) {
    HelperUtils.bugsnag.notify(error);
  }
  return fcmToken;
};

export default {
  getToken,
  getLoginTimestamp,
  setToken,
  signOut,
  sessionSignOut,
  registerDeviceToken,
};
