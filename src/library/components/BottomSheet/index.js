/* eslint-disable import/no-unresolved */
import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles';

const { height, width } = Dimensions.get('window');

const BottomSheet = ({
  hasBackdrop,
  children,
  isVisible,
  onClose,
  sheetHeight,
  onBackdropPress,
  onBackButtonPress
}) => (
  <Modal
    animationIn="slideInUp"
    animationOut="slideOutDown"
    animationOutTiming={400}
    deviceHeight={height}
    deviceWidth={width}
    hasBackdrop={hasBackdrop}
    hideModalContentWhileAnimating
    onModalHide={onClose}
    onBackdropPress={onBackdropPress}
    onBackButtonPress={onBackButtonPress}
    isVisible={isVisible}
    style={[styles.modalBackground, {
      height: height * sheetHeight
    }]}
    userNativeDriver
  >
    { children }
  </Modal>
);

BottomSheet.propTypes = {
  sheetHeight: PropTypes.number,
  hasBackdrop: PropTypes.bool,
  onBackdropPress: PropTypes.func,
  onBackButtonPress: PropTypes.func,
};

BottomSheet.defaultProps = {
  sheetHeight: 0.45,
  hasBackdrop: false,
  onBackdropPress: () => {},
  onBackButtonPress: () => {},
};

export default BottomSheet;
