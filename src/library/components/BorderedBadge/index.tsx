import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'native-base';

import styles from './styles';

type Props = {
  text: string;
  style: any;
};

const BorderedBadge = ({ text, style }: Props) => (
  <View style={StyleSheet.flatten([styles.badgeContainer, style])}>
    <Text uppercase style={styles.badgeText}>
      {text}
    </Text>
  </View>
);

BorderedBadge.defaultProps = {
  style: {},
};

export default BorderedBadge;
