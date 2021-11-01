/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

export default class Divider extends Component {
  render() {
    return <View style={[styles.divider, this.props.style]} />;
  }
}

Divider.propTypes = {
  style: PropTypes.instanceOf(Object),
};

Divider.defaultProps = {
  style: {},
};
