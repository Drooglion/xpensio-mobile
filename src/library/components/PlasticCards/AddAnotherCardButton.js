/* eslint-disable import/no-unresolved */
import React from 'react';
import { Button, Text } from 'native-base';
import R from 'res/R';
import styles from './styles';

const AddAnotherCardButton = onPress => (
  <Button
    small
    transparent
    style={styles.btnOpenScanner}
    onPress={onPress}
  >
    <Text style={styles.btnTxtAction}>
      {R.strings.addAnotherCard}
    </Text>
  </Button>
);

export default AddAnotherCardButton;
