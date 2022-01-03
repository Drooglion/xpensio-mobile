/* eslint-disable import/no-unresolved */
import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import * as Animatable from 'react-native-animatable';

import styles from './styles';

const EmptyList = ({ image, text }) => (
  <View style={styles.infoContainer}>
    <Animatable.Image
      source={image}
      style={styles.img}
      animation="zoomIn"
      duration={1000}
    />
    <Animatable.Text style={styles.txtTitle} animation="fadeIn">
      {text}
    </Animatable.Text>
  </View>
);

EmptyList.propTypes = {
  image: PropTypes.number,
  text: PropTypes.string,
};

EmptyList.defaultProps = {
  image: '',
  text: 'No Data',
};

export default EmptyList;
