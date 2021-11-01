/* eslint-disable import/no-unresolved */
import React, { Fragment } from 'react';
import {
  Button,
  Icon,
  Input,
} from 'native-base';
import R from 'res/R';
import hooks from 'library/hooks';
import styles from './styles';

const PasswordInput = (props) => {
  const { inputs, handleChange } = hooks.useForm({ secureTextEntry: true });
  const { secureTextEntry } = inputs;
  return (
    <Fragment>
      <Input
        autoCorrect={false}
        autoCapitalize="none"
        placeholder={R.strings.password}
        {...props}
        secureTextEntry={secureTextEntry}
      />
      <Button
        icon
        transparent
        onPress={() => handleChange('secureTextEntry', !secureTextEntry)}
      >
        <Icon
          style={styles.eyeOff}
          name={secureTextEntry ? 'eye' : 'eye-off'}
        />
      </Button>
    </Fragment>
  );
};

export default PasswordInput;
