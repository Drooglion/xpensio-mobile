import React, { useCallback } from 'react';
import {
  Button,
  Container,
  Content,
  Footer,
  FooterTab,
  StyleProvider,
  Text,
} from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';

import getTheme from 'native-base-theme/components';
import theme from 'native-base-theme/variables/theme';
import R from 'res/R';
import Header from 'library/components/Header';
import Scanner from 'library/components/Scanner';
import { qrCodeValid } from 'library/utils/HelperUtils';
import { useResource } from 'contexts/resourceContext';
import useGetActivationCode from 'hooks/api/private/card/useGetActivationCode';

const CardScanner = ({}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { card } = route.params;
  const { t } = useTranslation();
  const { dispatch } = useResource();
  const { mutate: getActivationCode } = useGetActivationCode();

  const sendCode = useCallback(
    async (sideEffects: Record<string, (value: any) => void>) => {
      const payload = { cardId: card.last4 };
      await getActivationCode(payload, sideEffects || {});
    },
    [getActivationCode, card],
  );

  const readHandler = async (data: string) => {
    const valid = qrCodeValid(data);
    if (valid) {
      const sideEffects = {
        onSuccess: () => {
          navigation.navigate('ActivateCard', { sendCode, card });
        },
        onError: err => {
          Toast.show({
            type: 'error',
            text1: err.message,
          });
        },
      };

      sendCode(sideEffects);
    } else {
      dispatch({
        type: 'SET_DIALOG_MODAL',
        dialogModal: {
          visible: true,
          title: t('invalidQr'),
          description: t('invalidQrDesc'),
          icon: 'error',
        },
      });
    }
  };

  const onCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <StyleProvider style={getTheme(theme)}>
      <Container style={R.sharedStyles.container}>
        <Header title={R.strings.pairCard} hasBack onBackPress={onCancel} />
        <Toast />
        <Content scrollEnabled={false}>
          <Scanner onRead={readHandler} />
        </Content>
        <Footer style={R.sharedStyles.footer}>
          <FooterTab style={R.sharedStyles.footerTab}>
            <Button danger style={R.sharedStyles.btnFooter} onPress={onCancel}>
              <Text style={R.sharedStyles.txtBtnFooter}>{t('cancel')}</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    </StyleProvider>
  );
};

export default CardScanner;
