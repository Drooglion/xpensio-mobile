/* eslint-disable import/no-unresolved */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Content,
  View,
  Text,
  Button,
} from 'native-base';
import BottomSheet from 'library/components/BottomSheet';

import styles from './styles';

const FilterBottomSheet = ({
  sheetHeight,
  isVisible,
  onClose,
  title,
  btnText,
  onFilterPress,
  children,
}) => (
  <BottomSheet
    sheetHeight={sheetHeight}
    isVisible={isVisible}
    onClose={onClose}
    onBackdropPress={onClose}
    onBackButtonPress={onClose}
  >
    <View style={styles.container}>
      <Text
        allowFontScaling={false}
        style={styles.title}
      >
        {title}
      </Text>
      <Button
        onPress={onFilterPress}
        light
        rounded
        style={styles.btnApply}
      >
        <Text
          allowFontScaling={false}
          style={styles.btnApplyText}
        >
          {btnText}
        </Text>
      </Button>
    </View>
    <Content
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </Content>
  </BottomSheet>
);

FilterBottomSheet.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onFilterPress: PropTypes.func.isRequired,
  sheetHeight: PropTypes.number,
  title: PropTypes.string,
  btnText: PropTypes.string,
};

FilterBottomSheet.defaultProps = {
  sheetHeight: 0.6,
  title: 'Filter',
  btnText: 'Apply',
};

export default FilterBottomSheet;
