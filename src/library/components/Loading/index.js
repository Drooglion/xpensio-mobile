/* eslint-disable import/no-unresolved */
import React from 'react';
import { View } from 'native-base';
import LoadingIndicator from 'library/components/LoadingIndicator';
import styles from './styles';

const Loading = () => (
  <View style={styles.container}>
    <LoadingIndicator />
  </View>
);

export default Loading;
