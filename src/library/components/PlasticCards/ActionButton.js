/* eslint-disable import/no-unresolved */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Text, View } from 'native-base';
import styles from './styles';

const ActionButton = ({ danger, onPress, text }) => (
  <View style={styles.btnGroup}>
    <Button
      small
      bordered
      danger={danger}
      info={!danger}
      style={styles.btn}
      onPress={onPress}
    >
      <Text style={styles.btnTxtAction}>
        {text}
      </Text>
    </Button>
  </View>
);

ActionButton.propTypes = {
  danger: PropTypes.bool,
  onPress: PropTypes.func,
  text: PropTypes.string,
};

ActionButton.defaultProps = {
  danger: false,
  onPress: () => {},
  text: '',
};

export default ActionButton;
