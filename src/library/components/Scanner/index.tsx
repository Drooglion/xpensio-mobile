import React, { Fragment } from 'react';
import { Text, View } from 'native-base';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { useTranslation } from 'react-i18next';

import CameraGuide from '../CameraGuide';

import styles from './styles';

export interface ScannerProps {
  onRead(data: string): void;
}

const Scanner = ({ onRead }: ScannerProps) => {
  const { t } = useTranslation();

  return (
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
        <Text style={styles.txtTitle}>{t('scanning')}</Text>
        <Text style={styles.txtDesc}>{t('scanDesc')}</Text>
      </View>
    </Fragment>
  );
};

export default Scanner;
