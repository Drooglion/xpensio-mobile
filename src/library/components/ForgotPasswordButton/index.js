import React from 'react';
import { Button, Text } from 'native-base';
import R from 'res/R';
import styles from './styles';

const ForgotPasswordButton = props => (
  <Button transparent style={styles.btnForgot} {...props}>
    <Text style={styles.forgot}>{R.strings.forgotPassword}</Text>
  </Button>
);

export default ForgotPasswordButton;
