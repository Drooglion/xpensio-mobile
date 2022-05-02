import React from 'react';
import PropTypes from 'prop-types';
import { Label, View } from 'native-base';
import CountryPicker, {
  Country,
  CountryCode,
} from 'react-native-country-picker-modal';
import R from 'res/R';
import styles from './styles';

type Props = {
  onSelect: (country: Country) => void;
  countryCode: CountryCode;
};

const CountryInput = ({ onSelect, countryCode }: Props) => (
  <View style={{ alignItems: 'flex-start' }}>
    <Label style={styles.label}>{R.strings.country}</Label>
    <View style={styles.wrapper}>
      <CountryPicker
        withFilter
        withCountryNameButton
        withEmoji={false}
        withFlag
        withCallingCode
        preferredCountries={['NZ', 'AU', 'SG', 'PH']}
        styles={{
          header: {
            marginTop: R.metrics.doubleSection,
          },
        }}
        onSelect={onSelect}
        countryCode={countryCode}
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
