/* eslint-disable import/no-unresolved */

import React, { Component } from 'react';
import { View } from 'native-base';

import styles from './styles';

export default class CameraGuide extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topGuides}>
          <View style={styles.topLeftGuide} />
          <View style={styles.topRightGuide} />
        </View>
        <View style={styles.bottomGuides}>
          <View style={styles.bottomLeftGuide} />
          <View style={styles.bottomRightGuide} />
        </View>
      </View>
    );
  }
}
