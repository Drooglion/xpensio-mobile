import React from 'react';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Button,
  Text,
  Thumbnail,
  StyleProvider,
  View,
} from 'native-base';
// import { capitalize } from 'lodash';

// import Header from 'library/components/Header';
import R from 'res/R';
import getTheme from 'native-base-theme/components';
import theme from 'native-base-theme/variables/theme';
import styles from './styles';

const ForgotPassword = ({ navigation }) => {
  return (
    <StyleProvider style={getTheme(theme)}>
      <Container style={styles.container}>
        <Content contentContainerStyle={styles.container} scrollEnabled={false}>
          {/* <Header hasBack onBackPress={() => navigation.goBack()} /> */}
          <Thumbnail
            large
            source={R.images.logo_login}
            resizeMode="contain"
            style={styles.logo}
          />
          <View style={styles.descWrapper}>
            <Text style={styles.descTitle} textAlign="center">
              {R.strings.forgotYourPassword}
            </Text>
            <Text style={styles.descText} textAlign="center">
              {R.strings.forgotYourPasswordDesc}
            </Text>
          </View>
          <Form style={styles.form}>
            <Item error={false} style={styles.item} underline>
              <Input
                placeholder={R.strings.email}
                textContentType="emailAddress"
                keyboardType="email-address"
                returnKeyType="done"
                autoCapitalize="none"
                autoCorrect={false}
                selectionColor={R.colors.cursor}
                onChangeText={() => {}}
                onSubmitEditing={() => {}}
                value=""
              />
            </Item>
            {/* <Text style={styles.txtErrorLogin}>
              {capitalize(inputs.errorMessage)}
            </Text> */}
            <Button style={styles.submit} onPress={() => {}} disabled={false}>
              <Text>{R.strings.submit}</Text>
              {/* {inputs.submitInProgress ? (
                <LoadingIndicator size={5} color={R.colors.white} />
              ) : (
                <Text>{R.strings.submit}</Text>
              )} */}
            </Button>
          </Form>
        </Content>
      </Container>
    </StyleProvider>
  );
};

export default ForgotPassword;
