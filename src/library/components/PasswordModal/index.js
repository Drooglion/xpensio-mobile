/* eslint-disable import/no-unresolved */
import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import {
  Button,
  Item,
  Input,
  Text,
  View
} from 'native-base';
import R from 'res/R';

import styles from './styles';

const PasswordModal = ({
  isVisible,
  onCancel,
  onSubmit,
  password,
  passwordError,
  handlePassword,
  submitDisabled,
}) => (
  <Modal
    isVisible={isVisible}
    userNativeDriver
  >
    <View style={styles.modal}>
      <Text style={styles.title}>{R.strings.enterPassword}</Text>
      <KeyboardAvoidingView enabled behavior="padding" style={styles.body}>
        <Item floatingLabel error={passwordError}>
          <Input
            autoFocus
            autoCapitalize="none"
            secureTextEntry
            style={styles.input}
            onChangeText={handlePassword}
            onSubmitEditing={onSubmit}
            value={password}
            placeholder={R.strings.password}
          />
        </Item>
      </KeyboardAvoidingView>
      <View style={styles.btnGroup}>
        <Button
          transparent
          onPress={onCancel}
          style={{ marginRight: R.metrics.baseMargin }}
        >
          <Text style={styles.noTxt}>
            {R.strings.cancel}
          </Text>
        </Button>
        <Button
          disabled={submitDisabled}
          primray
          onPress={onSubmit}
        >
          <Text uppercase>
            {R.strings.ok}
          </Text>
        </Button>
      </View>
    </View>
  </Modal>
);

PasswordModal.propTypes = {
  isVisible: PropTypes.bool,
  onCancel: PropTypes.func,
  password: PropTypes.string,
  passwordError: PropTypes.bool,
  handlePassword: PropTypes.func,
  onSubmit: PropTypes.func,
  submitDisabled: PropTypes.bool,
};

PasswordModal.defaultProps = {
  isVisible: false,
  onCancel: () => {},
  password: '',
  passwordError: false,
  handlePassword: () => {},
  onSubmit: () => {},
  submitDisabled: false,
};

export default PasswordModal;
