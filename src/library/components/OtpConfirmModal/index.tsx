import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from 'react-native';
import Modal from 'react-native-modal';
import { Button, Item, Input, Text, View } from 'native-base';
import { useTranslation } from 'react-i18next';

import R from 'res/R';

import LoadingIndicator from 'library/components/LoadingIndicator';
import styles from './styles';
import useRequestOtpPassword from 'hooks/api/private/account/useRequestOtpPassword';

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
  const { t } = useTranslation();
  const [pin, setPin] = useState<string>();
  const [codeSent, setCodeSent] = useState(false);
  const { mutate: requestOtpPassword, isLoading: requestingOtpPassword } =
    useRequestOtpPassword();

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
    requestOtpPassword();
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

  const canSubmit = !requestingOtpPassword && !loading && pin?.length === 6;

  return (
    <Modal isVisible={visible} onDismiss={onCancel} useNativeDriver>
      <View style={styles.modal}>
        <Text style={styles.title}>{t('confirmAction')}</Text>
        <Text style={styles.desc}>{t('confirmActionDesc')}</Text>
        <KeyboardAvoidingView enabled behavior="padding" style={styles.body}>
          <Item floatingLabel error={!!error}>
            <Input
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="numeric"
              maxLength={activationCodeSize}
              onChangeText={onPinChanged}
              onSubmitEditing={onSubmitPin}
              placeholder={t('pinPlaceholder')}
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
            disabled={codeSent || requestingOtpPassword}
            onPress={request}
            style={styles.actionBtn}>
            <Text style={styles.actionBtnText}>
              {codeSent ? t('codeOtpSent') : t('getCode')}
            </Text>
          </Button>
          <View style={styles.row}>
            {loading ? null : (
              <Button
                transparent
                onPress={close}
                style={{ marginRight: R.metrics.baseMargin }}>
                <Text style={styles.noTxt}>{t('cancel')}</Text>
              </Button>
            )}
            <Button disabled={!canSubmit} transparent onPress={submit}>
              {loading ? (
                <LoadingIndicator size={5} />
              ) : (
                <Text
                  uppercase
                  style={canSubmit ? styles.txtConfirm : styles.noTxt}>
                  {t('ok')}
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
