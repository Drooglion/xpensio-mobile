/* eslint-disable import/no-unresolved */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Text } from 'native-base';
import * as Animatable from 'react-native-animatable';

import R from 'res/R';
import styles from './styles';


const PermissionPhotoRequired = ({ onClick }) => (
  <Animatable.View
    animation="fadeIn"
    style={styles.requiredView}
  >
    <Text style={styles.requiredTxt}>
      {R.strings.photoPermissionRequired}
    </Text>
    <Button
      style={styles.requiredBtn}
      primary
      onPress={onClick}
    >
      <Text style={styles.requiredTxt}>
        {R.strings.allow}
      </Text>
    </Button>
  </Animatable.View>
);

PermissionPhotoRequired.propTypes = {
  onClick: PropTypes.func,
};

PermissionPhotoRequired.defaultProps = {
  onClick: () => {},
};

export default PermissionPhotoRequired;
