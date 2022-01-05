import React, { useEffect } from 'react';
import {
  Button,
  Container,
  Content,
  Footer,
  FooterTab,
  StyleProvider,
  Text,
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import getTheme from 'native-base-theme/components';
import theme from 'native-base-theme/variables/theme';
import R from 'res/R';
import Header from 'library/components/Header';
import Scanner from 'library/components/Scanner';

const CardScanner = ({}) => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('ActivateCard');
    }, 2500);
  }, [navigation]);

  const readHandler = async (data: string) => {
    console.log('qr_data', data);
  };

  const onCancel = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

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
