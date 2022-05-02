import React from 'react';
import { Modal, View } from 'react-native';
import { useResource } from 'contexts/resourceContext';

import LoadingIndicator from 'library/components/LoadingIndicator';
import styles from './styles';

const LoadingModal = () => {
  const { state } = useResource();

  return (
    <Modal visible={state.loadingModal} transparent>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <LoadingIndicator />
        </View>
      </View>
    </Modal>
  );
};

export default LoadingModal;
