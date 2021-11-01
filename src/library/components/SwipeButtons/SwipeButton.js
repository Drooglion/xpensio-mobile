/* eslint-disable import/no-unresolved */

import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Text, View } from 'native-base';
import styles from './SwipeButtonStyles';

const SwipeButton = ({ icon, text }) => (
  <View style={styles.swipeout}>
    <Icon name={icon} style={styles.swipeoutIcon} />
    <Text uppercase style={styles.swipeoutText}>
      {text}
    </Text>
  </View>
);

SwipeButton.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default SwipeButton;
