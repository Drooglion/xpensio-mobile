import React from 'react';
import { Platform } from 'react-native';
import { Picker, View } from 'native-base';
import styles from './styles';

const ios = Platform.OS === 'ios';

const PickerInput = props => (
  <View style={styles.wrapper}>
    <Picker dropdownIconColor="black" style={styles.picker} {...props} />
  </View>
);

export default PickerInput;
