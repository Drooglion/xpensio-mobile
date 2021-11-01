/* eslint-disable import/no-unresolved */
import React from 'react';
import PropTypes from 'prop-types';
import { Label, View } from 'native-base';
import CountryPicker from 'react-native-country-picker-modal';
import R from 'res/R';
import styles from './styles';

const CountryInput = props => (
  <View style={{ alignItems: 'flex-start' }}>
    <Label style={styles.label}>{R.strings.country}</Label>
    <View style={styles.wrapper}>
      <CountryPicker
        closeable
        filterable
        hideAlphabetFilter
        translation="eng"
        showCountryNameWithFlag
        styles={{
          header: {
            marginTop: R.metrics.doubleSection
          }
        }}
        {...props}
      />
    </View>
  </View>
);

CountryInput.propTypes = {
  label: PropTypes.string,
};

CountryInput.defaultProps = {
  label: R.strings.country,
};

export default CountryInput;
