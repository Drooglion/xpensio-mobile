import React from 'react';
import { Platform } from 'react-native';
import { Picker, View } from 'native-base';
import styles from './styles';

const ios = Platform.OS === 'ios';

const PickerInput = props => (
  <View style={styles.wrapper}>
    <Picker
      {...props}
      textStyle={ios ? styles.textStyle : null}
    />
  </View>
);

export default PickerInput;
