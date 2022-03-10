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
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import getTheme from 'native-base-theme/components';
import theme from 'native-base-theme/variables/theme';
import R from 'res/R';
import styles from './styles';
import LoadingIndicator from 'library/components/LoadingIndicator';
import Header from 'library/components/Header';

const ActivateCard = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const [mobileNumber, setMobileNumber] = useState<string>();
  const [code, setCode] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    setMobileNumber('+63 917 123 4567');
  }, []);

  const onCancel = () => {
    navigation.goBack();
  };

  const resendCode = () => {};

  const activate = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      if (code === '111111') {
        navigation.navigate('ActivateCardSuccess' as never);
      }
    }, 1000);
  };

  return (
    <StyleProvider style={getTheme(theme)}>
      <Container style={R.sharedStyles.container}>
        <Header
          title={t('activatePhysicalCard')}
          hasBack
          onBackPress={onCancel}
        />
        <Content
          contentContainerStyle={styles.infoContainer}
          scrollEnabled={false}>
          <View style={styles.texts}>
            <Text style={styles.txtDesc}>{t('activatePhysicalCardDesc')}</Text>
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
            <Button transparent onPress={resendCode}>
              <Text style={styles.txtResend}>{t('resendCode')}</Text>
            </Button>
          </View>
          <Button
            disabled={isSubmitting}
            style={styles.btnAction}
            onPress={activate}>
            {isSubmitting ? (
              <LoadingIndicator color={R.colors.white} size={5} />
            ) : (
              <Text>{t('activate')}</Text>
            )}
          </Button>
        </Content>
      </Container>
    </StyleProvider>
  );
};

export default ActivateCard;
