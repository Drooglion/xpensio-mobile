/* eslint-disable import/no-unresolved */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'native-base';
import QRCodeScanner from 'react-native-qrcode-scanner';

import CameraGuide from '../CameraGuide';

import styles from './styles';

const Scanner = ({ onRead }) => (
  <Fragment>
    <QRCodeScanner
      cameraStyle={styles.qrCameraStyle}
      containerStyle={styles.qrContainerStyle}
      customMarker={<CameraGuide />}
      fadeIn
      onRead={onRead}
      showMarker
    />
    <View style={styles.infoContainer}>
      <Text style={styles.txtTitle}> Scanning ... </Text>
      <Text style={styles.txtDesc}> Place the QR code inside the center guide. </Text>
    </View>
  </Fragment>
);

export default Scanner;

Scanner.propTypes = {
  onRead: PropTypes.func.isRequired
};
