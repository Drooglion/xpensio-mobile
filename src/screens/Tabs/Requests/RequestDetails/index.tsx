import React, { useEffect } from 'react';
import {
  Button,
  Container,
  Content,
  Footer,
  FooterTab,
  StyleProvider,
  Text,
  Tabs,
  Tab,
  TabHeading,
} from 'native-base';
import { useNavigation } from '@react-navigation/native';

import getTheme from 'native-base-theme/components';
import theme from 'native-base-theme/variables/theme';
import R from 'res/R';
import Header from 'library/components/Header';
import Scanner from 'library/components/Scanner';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import styles from './styles';
import TabSelection from '../../../../library/components/TabSelection';

const RequestDetails = () => {
  let tab: {} | undefined | null = {};
  const navigation = useNavigation();
  const { t } = useTranslation();

  const tabs = [t('details'), t('conversation')];

  const goToTabPage = page => {
    tab.goToPage(page);
  };

  const onCancel = () => {
    navigation.goBack();
  };

  const currencyFomart = number => {
    return number.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };

  return (
    <StyleProvider style={getTheme(theme)}>
      <Container>
        <Header
          title="Facebook Ads"
          subtitle={t('requested by Vanessa Liwanag')}
          hasBack
          onBackPress={onCancel}
          backgroundColor={R.colors.primary}
          inverseFontColor
          iosBarStyle={'light-content'}
          androidStatusBarColor="#fff"
        />
        <View style={{ flexGrow: 1 }}>
          <Tabs
            initialPage={0}
            ref={e => {
              tab = e;
            }}
            locked
            tabContainerStyle={styles.tabContainer}
            tabBarUnderlineStyle={{ backgroundColor: 'white' }}>
            <Tab
              heading={'Details'}
              tabStyle={{ backgroundColor: R.colors.primary }}
              activeTabStyle={{ backgroundColor: R.colors.primary }}
              textStyle={styles.textStyle}
              activeTextStyle={styles.activeTextStyle}>
              <View style={styles.detailsContainer}>
                <View style={styles.group}>
                  <Text style={styles.title}>DESCRIPTION</Text>
                  <Text>
                    New Campaign for XPENSIO - Expense Management on Facebook.
                  </Text>
                </View>
                <View style={styles.group}>
                  <Text style={styles.title}>TEAM</Text>
                  <Text>Product Team</Text>
                </View>
                <View style={styles.group}>
                  <Text style={styles.title}>CATEGORY</Text>
                  <View style={styles.category}>
                    <Text style={styles.textCategory}>Advertising</Text>
                  </View>
                </View>
                <View style={styles.group}>
                  <Text style={styles.title}>PROJECT</Text>
                  <Text>New Campaign</Text>
                </View>
                <View style={styles.group}>
                  <Text style={styles.title}>DATE REQUESTED</Text>
                  <Text>Monday, 15 October 2018 9:00 AM</Text>
                </View>
                <View style={styles.group}>
                  <Text style={styles.title}>PURCHASE TYPE</Text>
                  <Text>Single purchase</Text>
                </View>
                <View style={styles.group}>
                  <Text style={styles.title}>AMOUNT</Text>
                  <Text>
                    {'\u20B1'}
                    {currencyFomart(10000)}
                  </Text>
                </View>
                <View style={styles.btnGroup}>
                  <Button bordered danger style={styles.btn} onPress={() => {}}>
                    <Text style={styles.btnTxtAction}>{R.strings.deny}</Text>
                  </Button>
                  <Button
                    success
                    style={[styles.btn, { backgroundColor: R.colors.approve }]}
                    onPress={() => {}}>
                    <Text style={styles.btnTxtAction}>{R.strings.approve}</Text>
                  </Button>
                </View>
              </View>
            </Tab>

            <Tab
              heading={'Conversation'}
              tabStyle={{ backgroundColor: R.colors.primary }}
              activeTabStyle={{ backgroundColor: R.colors.primary }}
              textStyle={styles.textStyle}
              activeTextStyle={styles.activeTextStyle}></Tab>
          </Tabs>
        </View>
      </Container>
    </StyleProvider>
  );
};

export default RequestDetails;
