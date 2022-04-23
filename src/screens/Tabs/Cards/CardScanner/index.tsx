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

import getTheme from 'native-base-theme/components';
import theme from 'native-base-theme/variables/theme';
import R from 'res/R';
import Header from 'library/components/Header';
import Scanner from 'library/components/Scanner';
import { qrCodeValid } from 'library/utils/HelperUtils';
import { useResource } from 'contexts/resourceContext';

const CardScanner = ({}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { card } = route.params;
  const { t } = useTranslation();
  const { dispatch } = useResource();

  // useEffect(() => {
  //   setTimeout(() => {
  //     navigation.navigate('ActivateCard');
  //   }, 2500);
  // }, [navigation]);

  const readHandler = async (data: string) => {
    const valid = qrCodeValid(data);
    if (valid) {
      navigation.navigate('ActivateCard');
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
    // const {
    //   state: { params },
    // } = navigation;
    // if (data === R.strings.qrcodeValue) {
    //   try {
    //     const variables = { input: { id: params.id, last4: params.last4 } };
    //     await getActivationCard({ variables });
    //     navigation.navigate({
    //       key: 'ActivatePhysicalCard',
    //       routeName: 'ActivatePhysicalCard',
    //       params,
    //     });
    //   } catch (error) {
    //     HelperUtils.bugsnag.notify(error);
    //     console.log('Error getting activation card: ', { error });
    //   }
    // } else {
    //   showDialogModal({
    //     variables: {
    //       description: R.strings.invalidQrDesc,
    //       title: R.strings.invalidQr,
    //     },
    //   });
    // }
  };

  const onCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <StyleProvider style={getTheme(theme)}>
      <Container style={R.sharedStyles.container}>
        <Header title={R.strings.pairCard} hasBack onBackPress={onCancel} />
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
