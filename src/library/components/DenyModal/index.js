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

const DenyModal = ({
  isVisible,
  onCancel,
  onSubmit,
  reason,
  reasonError,
  handleTextChange,
  submitDisabled,
}) => (
  <Modal
    isVisible={isVisible}
    animationIn="bounceIn"
    userNativeDriver
  >
    <View style={styles.modal}>
      <Text style={styles.title}>{R.strings.denyReason}</Text>
      <Text style={styles.subtitle}>{R.strings.denyReasonCaption}</Text>
      <KeyboardAvoidingView enabled behavior="padding" style={styles.body}>
        <Item floatingLabel error={reasonError}>
          <Input
            style={styles.input}
            onChangeText={handleTextChange}
            value={reason}
            placeholder={R.strings.denyPlaceholder}
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
            {R.strings.done}
          </Text>
        </Button>
      </View>
    </View>
  </Modal>
);

DenyModal.propTypes = {
  isVisible: PropTypes.bool,
  onCancel: PropTypes.func,
  reason: PropTypes.string,
  reasonError: PropTypes.bool,
  handleTextChange: PropTypes.func,
  onSubmit: PropTypes.func,
  submitDisabled: PropTypes.bool,
};

DenyModal.defaultProps = {
  isVisible: false,
  onCancel: () => {},
  reason: '',
  reasonError: false,
  handleTextChange: () => {},
  onSubmit: () => {},
  submitDisabled: false,
};

export default DenyModal;
