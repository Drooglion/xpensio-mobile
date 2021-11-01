/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from 'react';
import * as Animatable from 'react-native-animatable';
import { Text } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import R from 'res/R';

import styles from './styles';

const OfflineNotice = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected !== isConnected) {
        setIsConnected(state.isConnected);
      }
    });
    return function cleanup() {
      unsubscribe();
    };
  });

  return !isConnected ? (
    <Animatable.View
      animation="slideInDown"
      style={styles.offlineContainer}
      useNativeDriver
    >
      <Text style={styles.offlineText}>
        {R.strings.noInternetConnection}
      </Text>
    </Animatable.View>
  ) : null;
};

export default OfflineNotice;
