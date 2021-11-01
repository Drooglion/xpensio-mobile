/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import { compose, graphql } from 'react-apollo';
import { KeyboardAvoidingView } from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import ACCOUNT from 'library/api/Account';
import HelperUtils from 'library/utils/HelperUtils';
import {
  Button,
  Item,
  Input,
  Text,
  View
} from 'native-base';
import { capitalize } from 'lodash';
import R from 'res/R';

import LoadingIndicator from 'library/components/LoadingIndicator';
import styles from './styles';

const OtpConfirmModal = ({
  errorText,
  isVisible,
  onCancel,
  onSubmit,
  pin,
  pinError,
  handlePin,
  submitDisabled,
  requestOtpPassword,
  onDismiss,
}) => {
  const activationCodeSize = 6;
  const [codeSent, setCodeSent] = useState(false);

  const request = async () => {
    try {
      await requestOtpPassword({ variables: { input: {} } });
      setCodeSent(true);
    } catch (error) {
      HelperUtils.bugsnag.notify(error);
    }
  };

  const close = () => {
    setCodeSent(false);
    onCancel();
  };

  return (
    <Modal
      isVisible={isVisible}
      onDismiss={onDismiss}
      userNativeDriver
    >
      <View style={styles.modal}>
        <Text style={styles.title}>{R.strings.confirmAction}</Text>
        <Text style={styles.desc}>{R.strings.confirmActionDesc}</Text>
        <KeyboardAvoidingView enabled behavior="padding" style={styles.body}>
          <Item floatingLabel error={pinError}>
            <Input
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="numeric"
              maxLength={activationCodeSize}
              onChangeText={handlePin}
              onSubmitEditing={onSubmit}
              placeholder={R.strings.pin}
              returnKeyType="done"
              value={pin}
              style={styles.input}
            />
          </Item>
          <Text style={styles.txtError}>
            {capitalize(errorText)}
          </Text>
        </KeyboardAvoidingView>
        <View style={styles.actionWrapper}>
          <Button
            info
            disabled={codeSent}
            onPress={request}
            style={styles.actionBtn}
          >
            <Text style={styles.actionBtnText}>
              {codeSent ? R.strings.codeOtpSent : R.strings.getCode}
            </Text>
          </Button>
          <View style={{ flexDirection: 'row' }}>
            {
              submitDisabled ? null : (
                <Button
                  transparent
                  onPress={close}
                  style={{ marginRight: R.metrics.baseMargin }}
                >
                  <Text style={styles.noTxt}>
                    {R.strings.cancel}
                  </Text>
                </Button>
              )
            }
            <Button
              disabled={submitDisabled}
              transparent
              onPress={onSubmit}
            >
              {
                submitDisabled ? (
                  <LoadingIndicator size={5} />
                ) : (
                  <Text uppercase style={styles.txtConfirm}>
                    {R.strings.ok}
                  </Text>
                )
              }
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

OtpConfirmModal.propTypes = {
  isVisible: PropTypes.bool,
  onCancel: PropTypes.func,
  pin: PropTypes.string,
  pinError: PropTypes.bool,
  handlePin: PropTypes.func,
  onSubmit: PropTypes.func,
  submitDisabled: PropTypes.bool,
  onDismiss: PropTypes.func,
};

OtpConfirmModal.defaultProps = {
  isVisible: false,
  onCancel: () => {},
  pin: '',
  pinError: false,
  handlePin: () => {},
  onSubmit: () => {},
  submitDisabled: false,
  onDismiss: () => {},
};

export default compose(
  graphql(ACCOUNT.REQUEST_OTP_PASSWORD, { name: 'requestOtpPassword' })
)(OtpConfirmModal);
