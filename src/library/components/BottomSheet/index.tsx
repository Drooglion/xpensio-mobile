import React from 'react';
import { Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles';

const { height, width } = Dimensions.get('window');

export interface BottomSheetProps {
  visible: boolean;
  children: React.ReactNode;
  height?: number;
  hasBackdrop?: boolean;
  onClose(): void;
}

const BottomSheet = ({
  hasBackdrop = false,
  visible,
  height: sheetHeight = 0.45,
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

export default BottomSheet;
