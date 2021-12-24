import React from 'react';
import { Button, Text } from 'native-base';
import R from 'res/R';
import styles from './styles';

export interface AddAnotherCardButtonProps {
  onPress(): void;
}

const AddAnotherCardButton = ({ onPress }: AddAnotherCardButtonProps) => (
  <Button small transparent style={styles.btnOpenScanner} onPress={onPress}>
    <Text style={styles.btnTxtAction}>{R.strings.addAnotherCard}</Text>
  </Button>
);

export default AddAnotherCardButton;
