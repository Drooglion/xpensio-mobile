import React, { useState, useCallback } from 'react';
import _isEmpty from 'lodash/isEmpty';
import {
  Button,
  Container,
  Content,
  Input,
  Item,
  StyleProvider,
  Text,
  View,
} from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import getTheme from 'native-base-theme/components';
import theme from 'native-base-theme/variables/theme';
import R from 'res/R';
import styles from './styles';
import LoadingIndicator from 'library/components/LoadingIndicator';
import Header from 'library/components/Header';
import useGetProfile from 'hooks/api/private/profile/useGetProfile';
import useActivateCard from 'hooks/api/private/card/useActivateCard';
import Loading from 'library/components/Loading';
import Toast from 'react-native-toast-message';
import { useResource } from 'contexts/resourceContext';

/* Receives a navigation params
 * sendCode:  function to call for resending OTP
 */

const ActivateCard = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { data: profile, isLoading: profileIsLoading } = useGetProfile();
  const { mutate: activateCard, isLoading } = useActivateCard();
  const mobileNumber = profile?.profile.mobileNumber;
  const route = useRoute();
  const { card, sendCode } = route.params;
  const { dispatch } = useResource();

  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState<string>('');

  const onCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const resendCode = useCallback(async () => {
    const sideEffects = {
      onSuccess: () => {
        setCodeSent(true);
        Toast.show({
          type: 'success',
          text1: t('activatePhysicalCardDesc'),
        });
      },
      onError: err => {
        Toast.show({
          type: 'error',
          text1: err.message,
        });
      },
    };
    await sendCode(sideEffects);
  }, [sendCode, t]);

  const activate = useCallback(() => {
    if (!_isEmpty(code)) {
      const params = { cardId: card.id as string, code };
      const sideEffects = {
        onSettled: () => {
          navigation.replace('ActivateCardSuccess' as never);
        },
        onSuccess: () => {
          navigation.replace('ActivateCardSuccess' as never);
        },
        onError: (err: any) => {
          // dispatch({
          //   type: 'SET_DIALOG_MODAL',
          //   dialogModal: {
          //     visible: true,
          //     title: t('activationFailed'),
          //     description: err.message,
          //     icon: 'error',
          //   },
          // });
        },
      };
      activateCard(params, sideEffects);
    }
  }, [code, activateCard, card, dispatch, navigation, t]);

  // const activate = () => {
  //   setIsSubmitting(true);
  //   setTimeout(() => {
  //     setIsSubmitting(false);
  //     if (code === '111111') {
  //       navigation.navigate('ActivateCardSuccess' as never);
  //     }
  //   }, 1000);
  // };

  return (
    <StyleProvider style={getTheme(theme)}>
      <Container style={R.sharedStyles.container}>
        <Header
          title={t('activatePhysicalCard')}
          hasBack
          onBackPress={onCancel}
        />
        <Toast />
        <Content
          contentContainerStyle={styles.infoContainer}
          scrollEnabled={false}>
          {profileIsLoading ? (
            <Loading />
          ) : (
            <>
              <View style={styles.texts}>
                <Text style={styles.txtDesc}>
                  {t('activatePhysicalCardDesc')}
                </Text>
                <Text style={styles.txtMobile}>{mobileNumber}</Text>
              </View>
              <Item style={styles.itemInput}>
                <Input
                  autoFocus
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="numeric"
                  maxLength={6}
                  onChangeText={text => setCode(text)}
                  returnKeyType="done"
                  selectionColor={R.colors.cursor}
                  style={styles.input}
                  value={code}
                  textAlign="center"
                />
              </Item>
              <View style={styles.resendContainer}>
                <Text style={styles.txtResendDesc}>{t('resendCodeDesc')}</Text>
                <Button transparent onPress={resendCode} disabled={codeSent}>
                  <Text style={styles.txtResend}>
                    {codeSent ? t('sent') : t('resendCode')}
                  </Text>
                </Button>
              </View>
              <Button
                disabled={isLoading || _isEmpty(code)}
                primary={!_isEmpty(code)}
                style={styles.btnAction}
                onPress={activate}>
                {isLoading ? (
                  <LoadingIndicator color={R.colors.white} size={5} />
                ) : (
                  <Text>{t('activate')}</Text>
                )}
              </Button>
            </>
          )}
        </Content>
      </Container>
    </StyleProvider>
  );
};

export default ActivateCard;
