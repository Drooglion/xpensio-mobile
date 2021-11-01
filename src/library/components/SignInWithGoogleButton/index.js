/* eslint-disable import/no-unresolved */
import React, { Fragment } from 'react';
import { View, ViewPropTypes } from 'react-native';
import { Button, Icon, Text } from 'native-base';
import PropTypes from 'prop-types';

import R from 'res/R';
// Replace with react-native-indiciator
// import LoadingIndicator from 'library/components/LoadingIndicator';
import styles from './styles';

const SignInWithGoogleButton = ({
  disabled,
  onPress,
  buttonStyle,
  iconStyle,
  textStyle,
}) => (
  <Button
    rounded
    iconLeft
    style={[styles.btnGoogle, buttonStyle]}
    onPress={onPress}
    disabled={disabled}>
    {disabled ? (
      <Text>Loading</Text>
    ) : (
      // <LoadingIndicator color={R.colors.white} size={5} />
      <Fragment>
        <Icon name="logo-google" style={iconStyle} />
        <Text style={[styles.textGoogle, textStyle]}>
          {R.strings.signInGoogle}
        </Text>
      </Fragment>
    )}
  </Button>
);

SignInWithGoogleButton.propTypes = {
  onPress: PropTypes.func,
  buttonStyle: ViewPropTypes.style,
  iconStyle: ViewPropTypes.style,
  textStyle: ViewPropTypes.style,
};

SignInWithGoogleButton.defaultProps = {
  onPress: () => {},
  buttonStyle: {},
  iconStyle: {},
  textStyle: {},
};

export default SignInWithGoogleButton;
