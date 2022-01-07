import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-native';
import { Button, Text } from 'native-base';
import ImageViewer from 'react-native-image-zoom-viewer';

import LoadingIndicator from 'library/components/LoadingIndicator';
import R from 'res/R';
import styles from './styles';

const ImageView = ({
  visible,
  imageUrls,
  onClose,
  onDelete,
  onChange,
  index,
}) => (
  <Modal
    onRequestClose={onClose}
    onDismiss={onClose}
    transparent
    visible={visible}>
    <ImageViewer
      index={index}
      enableSwipeDown
      onSwipeDown={onClose}
      swipeDownThreshold={10}
      onCancel={onClose}
      onChange={onChange}
      imageUrls={imageUrls}
      failImageSource={R.images.noimage}
      loadingRender={() => <LoadingIndicator color={R.colors.white} />}
    />
    <Button style={styles.btnDelete} onPress={onDelete} block>
      <Text style={styles.txtDelete}>{R.strings.deleteReceipt}</Text>
    </Button>
  </Modal>
);

ImageView.propTypes = {
  visible: PropTypes.bool,
  imageUrls: PropTypes.instanceOf(Array),
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  index: PropTypes.number,
};

ImageView.defaultProps = {
  visible: false,
  imageUrls: [],
  index: 0,
  onChange: () => {},
};

export default ImageView;
