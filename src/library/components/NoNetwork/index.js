/* eslint-disable import/no-unresolved */
import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import * as Animatable from 'react-native-animatable';

import styles from './styles';

const NoNetwork = ({ text }) => (
  <View style={styles.infoContainer}>
    <Animatable.Text
      style={styles.txtTitle}
      animation="fadeIn"
      duration={600}
    >
      {text}
    </Animatable.Text>
  </View>
);

NoNetwork.propTypes = {
  text: PropTypes.string,
};

NoNetwork.defaultProps = {
  text: 'No Data',
};

export default NoNetwork;
