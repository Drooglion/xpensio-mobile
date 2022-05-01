import React from 'react';
import PropTypes from 'prop-types';
import { Button, Text, View } from 'native-base';
import styles from './styles';

const UploadIdentificationIdButton = ({
  type,
  uploadFromCamera,
  uploadFromGallery,
}) => (
  <View style={styles.btnGroup}>
    <Button
      bordered
      style={styles.uploadBtn}
      onPress={() => uploadFromCamera(type)}
    >
      <Text>Take photo</Text>
    </Button>
    <Button
      bordered
      style={styles.uploadBtn}
      onPress={() => uploadFromGallery(type)}
    >
      <Text>Gallery</Text>
    </Button>
  </View>
);

UploadIdentificationIdButton.propTypes = {
  type: PropTypes.string.isRequired,
  uploadFromCamera: PropTypes.func,
  uploadFromGallery: PropTypes.func,
};

UploadIdentificationIdButton.defaultProps = {
  uploadFromCamera: () => {},
  uploadFromGallery: () => {},
};

export default UploadIdentificationIdButton;
