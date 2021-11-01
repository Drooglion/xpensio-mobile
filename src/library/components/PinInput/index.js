/* eslint-disable import/no-unresolved */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Icon,
  Text,
  View
} from 'native-base';
import { Svg, Circle } from 'react-native-svg';
import R from 'res/R';
import styles from './styles';

const PinInput = ({ handlePress, pinCode }) => {
  const onPress = (value) => {
    handlePress(value);
  };

  const renderPinCodeEntries = () => {
    const numberOfEntries = 4;
    const pinCodeEntries = [];
    for (let i = 0; i < numberOfEntries; i += 1) {
      const fill = R.colors[(pinCode.length >= (i + 1)) ? 'primary' : 'subhead'];
      pinCodeEntries.push(
        <Svg height={48} width={48} key={i}>
          <Circle cx={20} cy={20} r={10} fill={fill} />
        </Svg>
      );
    }
    return pinCodeEntries;
  };

  return (
    <View style={styles.container}>
      <View style={styles.pinCodeEntry}>
        { renderPinCodeEntries() }
      </View>
      <View style={styles.pinInput}>
        <View style={styles.row}>
          <NumPad value={1} onPress={onPress} />
          <NumPad value={2} onPress={onPress} />
          <NumPad value={3} onPress={onPress} />
        </View>
        <View style={styles.row}>
          <NumPad value={4} onPress={onPress} />
          <NumPad value={5} onPress={onPress} />
          <NumPad value={6} onPress={onPress} />
        </View>
        <View style={styles.row}>
          <NumPad value={7} onPress={onPress} />
          <NumPad value={8} onPress={onPress} />
          <NumPad value={9} onPress={onPress} />
        </View>
        <View style={styles.row}>
          <NumPad value="" onPress={onPress} disable />
          <NumPad value={0} onPress={onPress} />
          <NumPad value="backSpace" onPress={onPress} />
        </View>
      </View>
    </View>
  );
};

const NumPad = ({ value, onPress, disabled }) => (
  <Button
    disabled={disabled}
    dark
    style={styles.numBtn}
    transparent
    onPress={() => onPress(value)}
  >
    {
      value === 'backSpace' ? (
        <Icon name="backspace" />
      ) : (
        <Text style={styles.numTxt}>
          {value}
        </Text>
      )
    }
  </Button>
);

export default PinInput;

PinInput.propTypes = {
  handlePress: PropTypes.func,
  pinCode: PropTypes.string
};

PinInput.defaultProps = {
  handlePress: () => {},
  pinCode: ''
};
