import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from 'react-native';
import Modal from 'react-native-modal';
import { Button, Item, Input, Text, View } from 'native-base';
import R from 'res/R';

import LoadingIndicator from 'library/components/LoadingIndicator';
import styles from './styles';

export interface OtpConfirmModalProps {
  visible: boolean;
  loading: boolean;
  error?: string;
  onSubmit(pin: string): void;
  onCancel(): void;
}

const OtpConfirmModal = ({
  visible,
  loading,
  error,
  onSubmit,
  onCancel,
}: OtpConfirmModalProps) => {
  const activationCodeSize = 6;
  const [pin, setPin] = useState<string>();
  const [codeSent, setCodeSent] = useState(false);

  useEffect(() => {
    if (visible) {
      setPin(undefined);
      setCodeSent(false);
    }
  }, [visible]);

  const onPinChanged = (value: string) => {
    setPin(value);
  };

  const request = async () => {
    setCodeSent(true);
    /* try {
      await requestOtpPassword({ variables: { input: {} } });
      setCodeSent(true);
    } catch (error) {
      HelperUtils.bugsnag.notify(error);
    } */
  };

  const onSubmitPin = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => {
    setPin(e.nativeEvent.text);
  };

  const submit = () => {
    if (pin) {
      onSubmit(pin);
    }
  };

  const close = () => {
    setCodeSent(false);
    onCancel();
  };

  return (
    <Modal isVisible={visible} onDismiss={onCancel} useNativeDriver>
      <View style={styles.modal}>
        <Text style={styles.title}>{R.strings.confirmAction}</Text>
        <Text style={styles.desc}>{R.strings.confirmActionDesc}</Text>
        <KeyboardAvoidingView enabled behavior="padding" style={styles.body}>
          <Item floatingLabel error={!!error}>
            <Input
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="numeric"
              maxLength={activationCodeSize}
              onChangeText={onPinChanged}
              onSubmitEditing={onSubmitPin}
              placeholder={R.strings.pinPlaceholder}
              returnKeyType="done"
              value={pin}
              style={styles.input}
            />
          </Item>
          <Text style={styles.txtError}>{error}</Text>
        </KeyboardAvoidingView>
        <View style={styles.actionWrapper}>
          <Button
            info
            disabled={codeSent}
            onPress={request}
            style={styles.actionBtn}>
            <Text style={styles.actionBtnText}>
              {codeSent ? R.strings.codeOtpSent : R.strings.getCode}
            </Text>
          </Button>
          <View style={styles.row}>
            {loading ? null : (
              <Button
                transparent
                onPress={close}
                style={{ marginRight: R.metrics.baseMargin }}>
                <Text style={styles.noTxt}>{R.strings.cancel}</Text>
              </Button>
            )}
            <Button
              disabled={loading || !pin || pin.length < 6}
              transparent
              onPress={submit}>
              {loading ? (
                <LoadingIndicator size={5} />
              ) : (
                <Text uppercase style={styles.txtConfirm}>
                  {R.strings.ok}
                </Text>
              )}
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default OtpConfirmModal;
