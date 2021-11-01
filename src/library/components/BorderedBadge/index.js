import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Text, View } from 'native-base';

import styles from './styles';

const BorderedBadge = ({ text, style }) => (
  <View style={StyleSheet.flatten([styles.badgeContainer, style])}>
    <Text uppercase style={styles.badgeText}>
      {text}
    </Text>
  </View>
);

BorderedBadge.propTypes = {
  style: PropTypes.instanceOf(Object),
  text: PropTypes.string.isRequired
};

BorderedBadge.defaultProps = {
  style: {},
};

export default BorderedBadge;
