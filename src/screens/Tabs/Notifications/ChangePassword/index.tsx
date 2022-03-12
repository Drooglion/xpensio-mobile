import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { capitalize } from 'lodash';
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

import ApiUtils from 'library/utils/ApiUtils';
import HelperUtils from 'library/utils/HelperUtils';

import R from 'res/R';
import getTheme from 'native-base-theme/components';
import theme from 'native-base-theme/variables/theme';
import styles from './styles';

const ChangePassword = () => {
  const navigator = useNavigation();
  const loading = false;
  const errors = [];
  const { inputs, handleChange } = useForm({
    currentPassword: '',
    password: '',
    confirmPassword: '',
  });
  // const save = () => {
  //   const { navigation, changePassword } = this.props;
  //   const { formFields } = this.state;
  //   const input = { ...formFields };
  //   const variables = { input };
  //   this.setState({ loading: true, errors: '' });
  //   changePassword({ variables })
  //     .then(() => {
  //       this.setState({ loading: false });
  //       navigation.goBack();
  //     }).catch((error) => {
  //       HelperUtils.bugsnag.notify(error);
  //       const responseErrors = ApiUtils.formatError(error);
  //       const { payload: { messages } } = responseErrors;
  //       const errors = `${messages[0].key} ${messages[0].value}`;
  //       this.setState({
  //         loading: false,
  //         errors,
  //         formFields: {
  //           currentPassword: '',
  //           password: '',
  //           confirmPassword: '',
  //         }
  //       });
  //     });
  // }

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
            <Item stackedLabel error={errors !== ''}>
              <Label style={styles.label}>{R.strings.currentPassword}</Label>
              <Input
                autoFocus
                secureTextEntry
                style={styles.input}
                onChangeText={text => handleChange('currentPassword', text)}
                value={inputs.currentPassword}
              />
            </Item>
            <Item stackedLabel error={errors !== ''}>
              <Label style={styles.label}>{R.strings.newPassword}</Label>
              <Input
                secureTextEntry
                style={styles.input}
                onChangeText={text => handleChange('password', text)}
                value={inputs.password}
              />
            </Item>
            <Item stackedLabel error={errors !== ''}>
              <Label style={styles.label}>{R.strings.retypePassword}</Label>
              <Input
                secureTextEntry
                style={styles.input}
                onChangeText={text => handleTextChange('confirmPassword', text)}
                value={inputs.confirmPassword}
              />
            </Item>
            <Text style={styles.errors}>{capitalize(errors)}</Text>
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
            <Button primary style={styles.btnAction} onPress={() => {}}>
              <Text style={styles.btnTxt}>{R.strings.save}</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    </StyleProvider>
  );
};

export default ChangePassword;
