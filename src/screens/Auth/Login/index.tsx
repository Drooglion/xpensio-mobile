/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
// import firebase from 'react-native-firebase';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Button,
  Text,
  Thumbnail,
  StyleProvider,
} from 'native-base';
// import { compose, graphql } from 'react-apollo';
// import { GoogleSignin } from 'react-native-google-signin';
// import moment from 'moment';
// import Hr from 'react-native-hr-component';
// import capitalize from 'lodash/capitalize';

import ForgotPasswordButton from 'library/components/ForgotPasswordButton';
// import LoadingIndicator from 'library/components/LoadingIndicator';
// import STORE_MUTATIONS from 'library/store/mutations';
// import ACCOUNT from 'library/api/Account';
import SignInWithGoogleButton from 'library/components/SignInWithGoogleButton';
import PasswordInput from '../../../library/components/PasswordInput';
// import hooks from 'library/hooks';
import R from 'res/R';
import getTheme from 'native-base-theme/components';
import theme from 'native-base-theme/variables/theme';
import styles from './styles';
import useForm from 'hooks/useForm';
import useSigninUser from 'hooks/api/private/auth/useSignInUser';

const Login = () => {
  const { submit } = useSigninUser();
  const { inputs, handleChange } = useForm({ email: '', password: '' });

  const login = async () => {
    try {
      submit(inputs);
    } catch (err) {
      console.log({ err });
    }
  };

  return (
    <StyleProvider style={getTheme(theme)}>
      <Container style={styles.container}>
        <StatusBar backgroundColor={R.colors.white} barStyle="dark-content" />
        <Content contentContainerStyle={styles.container} scrollEnabled={false}>
          <Thumbnail
            large
            source={R.images.logo_login}
            resizeMode="contain"
            style={styles.logo}
          />
          <Form style={styles.form}>
            <Item error={false} style={styles.item} underline>
              <Input
                placeholder={R.strings.email}
                textContentType="emailAddress"
                keyboardType="email-address"
                returnKeyType="next"
                autoCapitalize="none"
                autoCorrect={false}
                selectionColor={R.colors.cursor}
                onChangeText={(text: string) => handleChange('email', text)}
                value={inputs.email}
              />
            </Item>
            <Item error={false} style={styles.item} underline>
              <PasswordInput
                placeholder={R.strings.password}
                textContentType="password"
                returnKeyType="done"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
                selectionColor={R.colors.cursor}
                onSubmitEditing={() => {}}
                onChangeText={(text: string) => handleChange('password', text)}
                value={inputs.password}
              />
            </Item>
            {/* <Text style={styles.txtErrorLogin}>
              {capitalize(inputs.errorMessage)}
            </Text> */}
            <ForgotPasswordButton onPress={() => {}} />
            <Button style={styles.signIn} onPress={login} disabled={false}>
              <Text>{R.strings.signIn}</Text>
              {/* {inputs.signinInProgress ? (
                <LoadingIndicator size={5} color={R.colors.white} />
              ) : (
                <Text>{R.strings.signIn}</Text>
              )} */}
            </Button>
            {/* <Hr
              lineColor={R.colors.divider}
              text={R.strings.or}
              textStyles={styles.or}
              textPadding={10}
              hrStyles={styles.hr}
            /> */}
            <SignInWithGoogleButton disabled={false} onPress={login} />
          </Form>
        </Content>
      </Container>
    </StyleProvider>
  );
};

export default Login;
