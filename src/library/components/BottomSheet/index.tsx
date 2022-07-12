import React from 'react';
import { Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles';

const { height, width } = Dimensions.get('window');

export interface BottomSheetProps {
  visible: boolean;
  children: React.ReactNode;
  sheetHeight: number;
  hasBackdrop: boolean;
  onClose(): void;
}

const BottomSheet = ({
  hasBackdrop,
  visible,
  sheetHeight,
  children,
  onClose,
}: BottomSheetProps) => (
  <Modal
    animationIn="slideInUp"
    animationOut="slideOutDown"
    animationOutTiming={400}
    deviceHeight={height}
    deviceWidth={width}
    hasBackdrop={hasBackdrop}
    onModalHide={onClose}
    onBackdropPress={onClose}
    onBackButtonPress={onClose}
    isVisible={visible}
    useNativeDriver
    style={[
      styles.modalBackground,
      {
        height: height * sheetHeight,
      },
    ]}>
    {children}
  </Modal>
);

BottomSheet.defaultProps = {
  hasBackdrop: false,
  visible: false,
  sheetHeight: 0.45,
  children: null,
  onClose: () => {},
};

export default BottomSheet;
