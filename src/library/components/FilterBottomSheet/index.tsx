import React from 'react';
import { Content, View, Text, Button } from 'native-base';
import BottomSheet from 'library/components/BottomSheet';

import styles from './styles';
import { SafeAreaView } from 'react-native';

type Props = {
  sheetHeight: number;
  isVisible: boolean;
  onClose(): void;
  title: string;
  btnText: string;
  onFilterPress(): void;
  children?: JSX.Element;
};

const FilterBottomSheet = ({
  sheetHeight,
  isVisible,
  onClose,
  title,
  btnText,
  onFilterPress,
  children,
}: Props) => (
  <BottomSheet sheetHeight={sheetHeight} visible={isVisible} onClose={onClose}>
    <View style={styles.container}>
      <Text allowFontScaling={false} style={styles.title}>
        {title}
      </Text>
      <Button onPress={onFilterPress} light rounded style={styles.btnApply}>
        <Text allowFontScaling={false} style={styles.btnApplyText}>
          {btnText}
        </Text>
      </Button>
    </View>
    <SafeAreaView style={styles.content}>{children}</SafeAreaView>
  </BottomSheet>
);

FilterBottomSheet.defaultProps = {
  sheetHeight: 0.6,
  title: 'Filter',
  btnText: 'Apply',
};

export default FilterBottomSheet;
