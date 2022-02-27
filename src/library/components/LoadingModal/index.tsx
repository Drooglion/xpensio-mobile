import React from 'react';
import { Modal, View } from 'react-native';

import LoadingIndicator from 'library/components/LoadingIndicator';
import styles from './styles';

type LoadingModalProps = {
  visible: boolean;
  onDismiss(): void;
};

const LoadingModal = ({ visible, onDismiss }: LoadingModalProps) => (
  <Modal
    visible={visible}
    onRequestClose={onDismiss}
    onDismiss={onDismiss}
    transparent>
    <View style={styles.modalBackground}>
      <View style={styles.activityIndicatorWrapper}>
        <LoadingIndicator />
      </View>
    </View>
  </Modal>
);

export default LoadingModal;
