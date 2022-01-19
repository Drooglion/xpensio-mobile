import React, { useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import {
  Button,
  Container,
  Content,
  Footer,
  FooterTab,
  Text,
  StyleProvider,
} from 'native-base';
import DeviceInfo from 'react-native-device-info';
import { getName } from 'country-list';
import { capitalize, isEmpty } from 'lodash';
import moment from 'moment';

import Header from 'library/components/Header';
import LoadingIndicator from 'library/components/LoadingIndicator';

import PROFILE from 'library/api/Profile';
import ApiUtils from 'library/utils/ApiUtils';
import hooks from 'library/hooks';
import STORE_MUTATIONS from 'library/store/mutations';

import R from 'res/R';
import getTheme from 'native-base-theme/components';
import theme from 'native-base-theme/variables/theme';
import EditProfileForm from './EditProfileForm';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const EditProfile = ({ navigation, updateProfile, showDialogModal }) => {
  const { t } = useTranslation();
  const userLocaleCountryCode = DeviceInfo.getDeviceCountry();
  const {
    state: {
      params: { profile },
    },
  } = navigation;
  const { inputs, handleChange } = hooks.useForm({
    title: profile.title || '',
    firstName: profile.firstName || '',
    middleName: profile.middleName || '',
    lastName: profile.lastName || '',
    email: profile.email || '',
    mobileNumber: profile.mobileNumber || '',
    birthday: (profile && moment(profile.birthday).format('YYYY-MM-DD')) || '',
    nationality: profile.nationality || '',
    gender: profile.gender || 0,
    addressLine1: profile.addressLine1 || '',
    addressLine2: profile.addressLine2 || '',
    city: profile.city || '',
    country: profile.country || getName(userLocaleCountryCode),
    state: profile.state || '',
    zipCode: profile.zipCode || '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const save = async () => {
    try {
      setLoading(true);
      setErrors({});
      const variables = { input: { ...inputs } };
      await updateProfile({ variables });
      setLoading(false);
      showDialogModal({
        variables: {
          title: 'Saved',
          description: 'Profile Updated',
          icon: 'success',
        },
      });
    } catch (error) {
      setLoading(false);
      console.log('error: ', { error });
      const responseErrors = ApiUtils.formatError(error);
      const {
        payload: { messages },
      } = responseErrors;
      if (!isEmpty(messages)) {
        messages.forEach(e => {
          setErrors(prev => ({
            ...prev,
            [e.key]: e.value,
          }));
        });
        showDialogModal({
          variables: {
            title: capitalize(messages[0].key),
            description: capitalize(messages[0].value),
          },
        });
      }
    }
  };

  return (
    <StyleProvider style={getTheme(theme)}>
      <Container>
        <Header
          hasBack
          title={R.strings.personalDetails}
          onBackPress={() => navigation.goBack()}
        />
        <Content contentContainerStyle={styles.content}>
          <KeyboardAvoidingView style={styles.form} enabled behavior="padding">
            <EditProfileForm
              errors={errors}
              inputs={inputs}
              handleChange={handleChange}
              mobileNumberVerified={profile.mobileNumberVerified}
              emailVerified={profile.emailVerified}
              loading={loading}
            />
          </KeyboardAvoidingView>
        </Content>
        <Footer transparent style={styles.footer}>
          <FooterTab style={styles.footerTab}>
            <Button
              danger
              disabled={loading}
              style={styles.btnCancel}
              onPress={() => navigation.goBack()}>
              <Text style={styles.btnTxt}>{R.strings.cancel}</Text>
            </Button>
            <Button disabled={loading} style={styles.btnSave} onPress={save}>
              {loading ? (
                <LoadingIndicator color={R.colors.white} size={5} />
              ) : (
                <Text style={styles.btnTxt}>{R.strings.save}</Text>
              )}
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    </StyleProvider>
  );
};

export default compose(
  graphql(STORE_MUTATIONS.showDialogModal, { name: 'showDialogModal' }),
  graphql(PROFILE.UPDATE_PROFILE, {
    name: 'updateProfile',
    options: { refetchQueries: [{ query: PROFILE.MY_PROFILE }] },
  }),
)(EditProfile);
