/* eslint-disable import/no-unresolved */
import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

import LoadingIndicator from 'library/components/LoadingIndicator';

const ImageView = ({ visible, imageUrls, onClose }) => (
  <Modal
    onRequestClose={onClose}
    onDismiss={onClose}
    transparent
    visible={visible}
  >
    <ImageViewer
      enableSwipeDown
      onSwipeDown={onClose}
      onCancelA={onClose}
      imageUrls={imageUrls}
      loadingRender={() => <LoadingIndicator />}
    />
  </Modal>
);

ImageView.propTypes = {
  visible: PropTypes.bool,
  imageUrls: PropTypes.instanceOf(Array),
  onClose: PropTypes.func.isRequired,
};

ImageView.defaultProps = {
  visible: false,
  imageUrls: [],
};

export default ImageView;
