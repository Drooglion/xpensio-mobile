/* eslint-disable import/no-unresolved */
import React from 'react';
import PropTypes from 'prop-types';
import { Bubbles } from 'react-native-loader';
import R from 'res/R';

const LoadingIndicator = ({ color, size }) => (
  <Bubbles size={size} color={color} />
);

LoadingIndicator.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

LoadingIndicator.defaultProps = {
  size: 10,
  color: R.colors.primary,
};

export default LoadingIndicator;
