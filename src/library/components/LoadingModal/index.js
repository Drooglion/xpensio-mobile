/* eslint-disable import/no-unresolved */
import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { Modal, View } from 'react-native';
import LoadingIndicator from 'library/components/LoadingIndicator';

import STORE_QUERIES from 'library/store/queries';
import styles from './styles';

const LoadingModal = ({ loadingModal, onDismiss }) => (
  <Modal
    visible={loadingModal}
    onRequestClose={() => {}}
    onDismiss={onDismiss}
    transparent
  >
    <View style={styles.modalBackground}>
      <View style={styles.activityIndicatorWrapper}>
        <LoadingIndicator />
      </View>
    </View>
  </Modal>
);

LoadingModal.propTypes = {
  loadingModal: PropTypes.bool.isRequired,
  onDismiss: PropTypes.func,
};

LoadingModal.defaultProps = {
  onDismiss: () => {},
};

export default graphql(
  STORE_QUERIES.loadingModal, {
    props: ({ data: { loadingModal } }) => ({
      loadingModal
    })
  }
)(LoadingModal);
