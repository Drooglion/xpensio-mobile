/* eslint-disable import/no-unresolved */

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
// import MyPayments from 'library/components/MyPayments';
// import TeamPayments from 'library/components/TeamPayments';
import TabSelection from 'library/components/TabSelection';

// import StringUtils from 'library/utils/StringUtils';
//
// import STORE_QUERIES from 'library/store/queries';

import R from 'res/R';
import getTheme from 'native-base-theme/components';
import theme from 'native-base-theme/variables/theme';
import styles from './styles';

const Payments = ({ navigation }) => {
  let tab = {};
  const actAsAdmin = false;
  const tabs = !actAsAdmin
    ? [R.strings.myPayments]
    : [R.strings.myPayments, R.strings.team];

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

  //   const handleOnPress = ({ item, refetch, paymentTab }) => {
  //     if (StringUtils.paymentStatus(item.status) === 'APPROVED') {
  //       if (isEmpty(item.attachments)) {
  //         navigation.navigate({
  //           routeName: 'Camera',
  //           key: 'Camera',
  //           params: {
  //             item,
  //             refetch,
  //             callback: () => snapCallback({ item, refetch }),
  //           },
  //         });
  //       } else {
  //         navigation.navigate({
  //           routeName: 'PaymentsDetails',
  //           key: 'PaymentsDetails',
  //           params: {
  //             id: item.id,
  //             refetch,
  //             paymentTab,
  //           },
  //         });
  //       }
  //     } else {
  //       navigation.navigate({
  //         routeName: 'PaymentsDetails',
  //         key: 'PaymentsDetails',
  //         params: {
  //           id: item.id,
  //           refetch,
  //           paymentTab,
  //         },
  //       });
  //     }
  //   };

  return (
    <StyleProvider style={getTheme(theme)}>
      <Container>
        <Header title="S$ 1,500.00" subtitle={R.strings.availableFunds} />
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
              {/* <MyPayments onItemClick={onMyPaymentPress} /> */}
            </Tab>
            {!actAsAdmin ? null : (
              <Tab heading={<TabHeading />}>
                {/* <TeamPayments onItemClick={onTeamPaymentPress} /> */}
              </Tab>
            )}
          </Tabs>
        </View>
      </Container>
    </StyleProvider>
  );
};

export default Payments;
