/* eslint-disable import/no-unresolved */
import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import { Button, Text, View } from 'native-base';
import R from 'res/R';

import styles from './styles';

const SignOutModal = ({ isVisible, onCancel, onSignOut }) => (
  <Modal
    isVisible={isVisible}
    animationIn="bounceIn"
    userNativeDriver
  >
    <View style={styles.modal}>
      <Text style={styles.title}>{R.strings.signOut}</Text>
      <Text style={styles.body}>{R.strings.signOutMessage}</Text>
      <View style={styles.btnGroup}>
        <Button transparent onPress={onCancel}>
          <Text uppercase style={styles.noTxt}>{R.strings.no}</Text>
        </Button>
        <Button primray transparent onPress={onSignOut}>
          <Text uppercase>{R.strings.yes}</Text>
        </Button>
      </View>
    </View>
  </Modal>
);

SignOutModal.propTypes = {
  isVisible: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onSignOut: PropTypes.func.isRequired,
};

SignOutModal.defaultProps = {
  isVisible: false
};

export default SignOutModal;
