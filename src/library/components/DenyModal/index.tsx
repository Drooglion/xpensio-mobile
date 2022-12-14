import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import Modal from 'react-native-modal';
import { Button, Item, Input, Text, View } from 'native-base';
import R from 'res/R';
import LoadingIndicator from 'library/components/LoadingIndicator';

import styles from './styles';
import { useTranslation } from 'react-i18next';

type DenyModalProps = {
  visible: boolean;
  reason?: string;
  error?: string;
  onReasonChanged(text: string): void;
  onCancel(): void;
  onSubmit(): void;
  loading: boolean;
};

const DenyModal = ({
  visible,
  reason,
  error,
  onReasonChanged,
  onCancel,
  onSubmit,
  loading,
}: DenyModalProps) => {
  const { t } = useTranslation();
  return (
    <Modal isVisible={visible} animationIn="bounceIn" useNativeDriver>
      <View style={styles.modal}>
        <Text style={styles.title}>{t('denyReason')}</Text>
        <Text style={styles.subtitle}>{t('denyReasonCaption')}</Text>
        <KeyboardAvoidingView enabled behavior="padding" style={styles.body}>
          <Item floatingLabel error={!!error}>
            <Input
              style={styles.input}
              onChangeText={onReasonChanged}
              value={reason}
              placeholder={t('denyPlaceholder')}
            />
          </Item>
        </KeyboardAvoidingView>
        <View style={styles.btnGroup}>
          <Button
            transparent
            onPress={onCancel}
            style={{ marginRight: R.metrics.baseMargin }}>
            <Text style={styles.noTxt}>{t('cancel')}</Text>
          </Button>
          <Button
            disabled={!reason || loading}
            primary={!!reason || loading}
            onPress={onSubmit}>
            {loading ? (
              <LoadingIndicator size={5} color={R.colors.white} />
            ) : (
              <Text style={styles.doneTxt} uppercase>
                {t('done')}
              </Text>
            )}
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default DenyModal;
