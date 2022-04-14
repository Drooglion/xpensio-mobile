import React, { useCallback } from 'react';
import dayjs from 'dayjs';
import { KeyboardAvoidingView } from 'react-native';
import Toast from 'react-native-toast-message';
import {
  Button,
  Container,
  Content,
  Footer,
  FooterTab,
  Text,
  StyleProvider,
} from 'native-base';

import Header from 'library/components/Header';
import LoadingIndicator from 'library/components/LoadingIndicator';

import { useNavigation } from '@react-navigation/native';

import R from 'res/R';
import getTheme from 'native-base-theme/components';
import theme from 'native-base-theme/variables/theme';
import EditProfileForm from './EditProfileForm';
import styles from './styles';
import { useTranslation } from 'react-i18next';
import { IProfileType } from 'types/Profile';
import useForm from 'hooks/useForm';
import useUpdateProfile, {
  ParamsType,
} from 'hooks/api/private/profile/useUpdateProfile';

type Props = {
  loading: boolean;
  profile: IProfileType;
};

const Root = ({ loading, profile }: Props) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { inputs, handleChange } = useForm({
    title: profile?.title || '',
    firstName: profile?.firstName || '',
    middleName: profile?.middleName || '',
    lastName: profile?.lastName || '',
    email: profile?.email || '',
    mobileNumber: profile?.mobileNumber || '',
    birthday: (profile && dayjs(profile?.birthday).format('YYYY-MM-DD')) || '',
    nationality: profile?.nationality || '',
    gender: profile?.gender || 0,
    addressLine1: profile?.addressLine1 || '',
    addressLine2: profile?.addressLine2 || '',
    city: profile?.city || '',
    country: profile?.country || '',
    state: profile?.state || '',
    zipCode: profile?.zipCode || '',
  });

  const { mutate: updateProfile, isLoading: updating } = useUpdateProfile();

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const submit = useCallback(async () => {
    /* Include first some required fields that isn't
     * included in the edit form
     */
    const payload = {
      ...inputs,
      sssGsisNumber: profile.sssGsisNumber,
      tinNumber: profile.tinNumber,
      motherFirstName: profile.motherFirstName,
      motherLastName: profile.motherLastName,
      birthPlace: profile.birthPlace,
      civilStatus: profile.civilStatus,
    } as ParamsType;

    updateProfile(payload, {
      onSuccess: data => {
        Toast.show({
          type: 'success',
          text1: 'Profile Updated',
        });
      },
      onError: (err: any) => {
        Toast.show({
          type: 'error',
          text1: err.message,
        });
      },
    });
  }, [inputs, updateProfile, profile]);

  return (
    <StyleProvider style={getTheme(theme)}>
      <Container>
        <Header
          hasBack
          title={R.strings.personalDetails}
          onBackPress={goBack}
        />
        <Toast />
        <Content
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <KeyboardAvoidingView enabled behavior="padding">
            <EditProfileForm
              inputs={inputs}
              handleChange={handleChange}
              errors={{}}
              loading={loading || updating}
            />
          </KeyboardAvoidingView>
        </Content>
        <Footer style={styles.footer}>
          <FooterTab style={styles.footerTab}>
            <Button
              danger
              disabled={loading || updating}
              style={styles.btnCancel}
              onPress={goBack}>
              <Text style={styles.btnTxt}>{R.strings.cancel}</Text>
            </Button>
            <Button
              disabled={loading || updating}
              style={styles.btnSave}
              onPress={submit}>
              {loading || updating ? (
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

export default Root;
