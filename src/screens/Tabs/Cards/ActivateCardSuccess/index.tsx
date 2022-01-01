import {
  Button,
  Container,
  Content,
  StyleProvider,
  Text,
  Thumbnail,
} from 'native-base';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import getTheme from 'native-base-theme/components';
import theme from 'native-base-theme/variables/theme';
import R from 'res/R';
import styles from './styles';

const ActivateCardSuccess = () => {
  const navigation = useNavigation();

  const onContinue = () => {
    navigation.navigate('Tabs', {
      screen: 'My cards',
    });
  };

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
          <Text style={styles.txtTitle}>{R.strings.cardAdded}</Text>
          <Text style={styles.txtDesc}>{R.strings.cardAddedDesc}</Text>
          <Button primary style={styles.btnAction} onPress={onContinue}>
            <Text>{R.strings.continue}</Text>
          </Button>
        </Content>
      </Container>
    </StyleProvider>
  );
};

export default ActivateCardSuccess;
