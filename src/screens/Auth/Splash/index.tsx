import React from 'react';
import { Container, Content, Text, Thumbnail } from 'native-base';
import { useTranslation } from 'react-i18next';

import R from 'res/R';
import styles from './SplashScreenStyles';

const Splash = () => {
  const { t } = useTranslation();
  return (
    <Container style={styles.container}>
      <Content contentContainerStyle={styles.content}>
        <Thumbnail
          square
          large
          source={R.images.logo_splash}
          resizeMode="contain"
        />
        {/* <Text style={styles.tagline}>{t('tagline')}</Text> */}
      </Content>
    </Container>
  );
};

export default Splash;
