import React from 'react';
import { Button, Text, View } from 'native-base';
import styles from './styles';

export interface ActionButtonProps {
  danger: boolean;
  text: string;
  onPress(): void;
}

const ActionButton = ({ danger, onPress, text }: ActionButtonProps) => (
  <View style={styles.btnGroup}>
    <Button
      small
      bordered
      danger={danger}
      info={!danger}
      style={styles.btn}
      onPress={onPress}>
      <Text style={styles.btnTxtAction}>{text}</Text>
    </Button>
  </View>
);

export default ActionButton;
