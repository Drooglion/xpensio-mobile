import React from 'react';
import { Button, Text, View } from 'native-base';
import styles from './styles';

type Props = {
  type: string;
  uploadFromCamera(type: string): void;
  uploadFromGallery(type: string): void;
};

const UploadIdentificationIdButton = ({
  type,
  uploadFromCamera,
  uploadFromGallery,
}: Props) => (
  <View style={styles.btnGroup}>
    <Button
      bordered
      style={styles.uploadBtn}
      onPress={() => uploadFromCamera(type)}>
      <Text>Take photo</Text>
    </Button>
    <Button
      bordered
      style={styles.uploadBtn}
      onPress={() => uploadFromGallery(type)}>
      <Text>Gallery</Text>
    </Button>
  </View>
);

UploadIdentificationIdButton.defaultProps = {
  uploadFromCamera: () => {},
  uploadFromGallery: () => {},
};

export default UploadIdentificationIdButton;
