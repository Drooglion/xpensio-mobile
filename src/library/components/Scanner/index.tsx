import React, { Fragment } from 'react';
import { Text, View } from 'native-base';
import QRCodeScanner from 'react-native-qrcode-scanner';

import CameraGuide from '../CameraGuide';

import styles from './styles';

export interface ScannerProps {
  onRead(data: string): void;
}

const Scanner = ({ onRead }: ScannerProps) => (
  <Fragment>
    <QRCodeScanner
      cameraStyle={styles.qrCameraStyle}
      containerStyle={styles.qrContainerStyle}
      customMarker={<CameraGuide />}
      fadeIn
      onRead={e => onRead(e.data)}
      showMarker
    />
    <View style={styles.infoContainer}>
      {/* @ts-ignore */}
      <Text style={styles.txtTitle}> Scanning ... </Text>
      {/* @ts-ignore */}
      <Text style={styles.txtDesc}>
        {' '}
        Place the QR code inside the center guide.{' '}
      </Text>
    </View>
  </Fragment>
);

export default Scanner;
