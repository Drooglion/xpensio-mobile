import React from 'react';
import {
  Container,
  Tabs,
  Tab,
  TabHeading,
  StyleProvider,
  View,
} from 'native-base';
import { isEmpty } from 'lodash';

import Header from 'library/components/Header';
// import BalanceHeader from 'library/components/BalanceHeader';
import MyPayments from 'library/components/MyPayments';
// import TeamPayments from 'library/components/TeamPayments';
import TabSelection from 'library/components/TabSelection';
import { useTranslation } from 'react-i18next';

// import StringUtils from 'library/utils/StringUtils';
//
// import STORE_QUERIES from 'library/store/queries';

import getTheme from 'native-base-theme/components';
import theme from 'native-base-theme/variables/theme';
import styles from './styles';

const Payments = ({ navigation }) => {
  let tab: {} | undefined | null = {};
  const { t } = useTranslation();
  const actAsAdmin: boolean = false;
  const tabs = !actAsAdmin ? [t('myPayments')] : [t('myPayments'), t('team')];

  const goToTabPage = page => {
    tab.goToPage(page);
  };

  const onMyPaymentPress = (item, refetch) => {
    //     handleOnPress({ item, refetch, paymentTab: 'myPayment' });
  };

  const onTeamPaymentPress = (item, refetch) => {
    //       handleOnPress({ item, refetch, paymentTab: 'teamPayment' });
  };

  //   const snapCallback = params => {
  //     navigation.pop();
  //     navigation.navigate('PaymentsDetails', params);
  //   };

  const handleOnPress = ({ item, paymentTab }) => {
    if (StringUtils.paymentStatus(item.status) === 'APPROVED') {
      if (isEmpty(item.attachments)) {
        navigation.navigate({
          routeName: 'Camera',
          key: 'Camera',
          params: {
            item,
            callback: () => snapCallback({ item }),
          },
        });
      } else {
        navigation.navigate({
          routeName: 'PaymentsDetails',
          key: 'PaymentsDetails',
          params: {
            id: item.id,
            paymentTab,
          },
        });
      }
    } else {
      navigation.navigate({
        routeName: 'PaymentsDetails',
        key: 'PaymentsDetails',
        params: {
          id: item.id,
          paymentTab,
        },
      });
    }
  };

  return (
    <StyleProvider style={getTheme(theme)}>
      <Container>
        <Header title="S$ 1,500.00" subtitle={t('availableFunds')} />
        {/* <BalanceHeader /> */}
        <View style={{ flexGrow: 1 }}>
          <TabSelection tabs={tabs} onChange={goToTabPage} />
          <Tabs
            initialPage={0}
            ref={e => {
              tab = e;
            }}
            locked
            tabContainerStyle={styles.tabContainer}
            tabBarUnderlineStyle={styles.tabUnderline}>
            <Tab heading={<TabHeading />}>
              <MyPayments />
            </Tab>
            {/* {!actAsAdmin ? null : (
              <Tab heading={<TabHeading />}>
                <TeamPayments onItemClick={onTeamPaymentPress} />
              </Tab>
            )} */}
          </Tabs>
        </View>
      </Container>
    </StyleProvider>
  );
};

export default Payments;
