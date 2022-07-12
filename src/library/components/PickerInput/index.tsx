import React from 'react';
import { Platform, SafeAreaView } from 'react-native';
import { Picker, View } from 'native-base';
import styles from './styles';

const ios = Platform.OS === 'ios';

const PickerInput = props => (
  <SafeAreaView style={styles.wrapper}>
    <Picker
      dropdownIconColor="black"
      style={styles.picker}
      textStyle={styles.textStyle}
      {...props}
    />
  </SafeAreaView>
);

export default PickerInput;
