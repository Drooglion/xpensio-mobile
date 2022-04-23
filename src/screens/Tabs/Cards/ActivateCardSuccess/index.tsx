import React, { useCallback } from 'react';
import {
  Button,
  Container,
  Content,
  StyleProvider,
  Text,
  Thumbnail,
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import getTheme from 'native-base-theme/components';
import theme from 'native-base-theme/variables/theme';
import R from 'res/R';
import styles from './styles';

const ActivateCardSuccess = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const onContinue = useCallback(() => {
    navigation.pop(2);
  }, [navigation]);

  return (
    <StyleProvider style={getTheme(theme)}>
      <Container style={R.sharedStyles.container}>
        <Content
          contentContainerStyle={styles.infoContainer}
          scrollEnabled={false}>
          <Thumbnail
            square
            source={R.images.ic_add_card_success}
            style={styles.img}
            resizeMode="contain"
          />
          <Text style={styles.txtTitle}>{t('cardAdded')}</Text>
          <Text style={styles.txtDesc}>{t('cardAddedDesc')}</Text>
          <Button primary style={styles.btnAction} onPress={onContinue}>
            <Text>{t('continue')}</Text>
          </Button>
        </Content>
      </Container>
    </StyleProvider>
  );
};

export default ActivateCardSuccess;
