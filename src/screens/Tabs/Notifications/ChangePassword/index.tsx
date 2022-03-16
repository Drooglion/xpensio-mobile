import React, { useCallback } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { capitalize, isEmpty } from 'lodash';
import {
  Button,
  Container,
  Content,
  Footer,
  FooterTab,
  Label,
  Item,
  Input,
  Text,
  StyleProvider,
} from 'native-base';

import LoadingModal from 'library/components/LoadingModal';
import Header from 'library/components/Header';
import { useNavigation } from '@react-navigation/native';
import useForm from 'hooks/useForm';

import R from 'res/R';
import getTheme from 'native-base-theme/components';
import theme from 'native-base-theme/variables/theme';
import styles from './styles';
import useChangePassword from 'hooks/api/private/profile/useChangePassword';

const ChangePassword = () => {
  const navigation = useNavigation();

  const successCallback = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const { changePassword, loading, error } = useChangePassword({
    callback: successCallback,
  });

  const { inputs, handleChange } = useForm({
    currentPassword: '',
    password: '',
    confirmPassword: '',
  });

  const save = async () => {
    try {
      await changePassword(inputs);
    } catch (err) {
      console.log('Change Password: ', { err });
    }
  };

  return (
    <StyleProvider style={getTheme(theme)}>
      <Container>
        <Header
          hasBack
          title={R.strings.changePassword}
          onBackPress={() => navigation.goBack()}
        />
        <LoadingModal visible={loading} />
        <Content contentContainerStyle={styles.content} scrollEnabled={false}>
          <KeyboardAvoidingView enabled behavior="padding">
            <Item stackedLabel error={!isEmpty(error)}>
              <Label style={styles.label}>{R.strings.currentPassword}</Label>
              <Input
                autoFocus
                secureTextEntry
                style={styles.input}
                onChangeText={text => handleChange('currentPassword', text)}
                value={inputs.currentPassword}
              />
            </Item>
            <Item stackedLabel error={!isEmpty(error)}>
              <Label style={styles.label}>{R.strings.newPassword}</Label>
              <Input
                secureTextEntry
                style={styles.input}
                onChangeText={text => handleChange('password', text)}
                value={inputs.password}
              />
            </Item>
            <Item stackedLabel error={!isEmpty(error)}>
              <Label style={styles.label}>{R.strings.retypePassword}</Label>
              <Input
                secureTextEntry
                style={styles.input}
                onChangeText={text => handleChange('confirmPassword', text)}
                value={inputs.confirmPassword}
              />
            </Item>
            <Text style={styles.errors}>{capitalize(error)}</Text>
          </KeyboardAvoidingView>
        </Content>
        <Footer transparent style={styles.footer}>
          <FooterTab style={styles.footerTab}>
            <Button
              danger
              style={styles.btnAction}
              onPress={() => navigation.goBack()}>
              <Text style={styles.btnTxt}>{R.strings.cancel}</Text>
            </Button>
            <Button primary style={styles.btnAction} onPress={save}>
              <Text style={styles.btnTxt}>{R.strings.save}</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    </StyleProvider>
  );
};

export default ChangePassword;
