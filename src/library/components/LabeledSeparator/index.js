import React, { Component } from 'react';
import { View, Text, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

export default class LabeledSeparator extends Component {
  render() {
    const {
      label,
      containerStyle,
      separatorStyle,
      labelStyle,
    } = this.props;

    return (
      <View style={[styles.container, containerStyle]}>
        <View style={[styles.separator, separatorStyle]} />
        <Text style={[styles.label, labelStyle]}>{label}</Text>
      </View>
    );
  }
}

LabeledSeparator.propTypes = {
  label: PropTypes.string.isRequired,
  containerStyle: ViewPropTypes.style,
  separatorStyle: ViewPropTypes.style,
  labelStyle: ViewPropTypes.style,
};

LabeledSeparator.defaultProps = {
  containerStyle: {},
  separatorStyle: {},
  labelStyle: {},
};
