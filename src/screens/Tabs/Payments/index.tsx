import React, { useEffect, useRef, useState } from 'react';
import {
  Container,
  Tabs,
  Tab,
  TabHeading,
  StyleProvider,
  View,
} from 'native-base';
import { isEmpty } from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';

import Header from 'library/components/Header';
// import BalanceHeader from 'library/components/BalanceHeader';
import MyPayments from 'library/components/MyPayments';
// import TeamPayments from 'library/components/TeamPayments';
import TabSelection from 'library/components/TabSelection';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

// import StringUtils from 'library/utils/StringUtils';

import getTheme from 'native-base-theme/components';
import theme from 'native-base-theme/variables/theme';
import styles from './styles';
import { useResource } from 'contexts/resourceContext';
import useGetMyPayments from 'hooks/api/private/payments/useGetMyPayments';
import { IPayment } from 'types/Payment';
import ListLoader from 'library/components/ListLoader';
import useGetWalletBalance from 'hooks/api/private/account/useGetWalletBalance';
import NumberUtils from 'library/utils/NumberUtils';

const Payments = () => {
  const tab = useRef<any>(null);
  const { t } = useTranslation();
  const navigation = useNavigation();
  const {
    data,
    refresh,
    loading: paymentsLoading,
    error: paymentsError,
  } = useGetMyPayments();
  const {
    balance,
    getBalance,
    loading: balanceLoading,
    error: balanceError,
  } = useGetWalletBalance();
  const { state, dispatch } = useResource();

  const [userId, setUserId] = useState<string>();
  const [payments, setPayments] = useState<IPayment[]>([]);

  const actAsAdmin: boolean = false;
  const tabs = !actAsAdmin ? [t('myPayments')] : [t('myPayments'), t('team')];

  useEffect(() => {
    const getUserId = async () => {
      const id = await AsyncStorage.getItem('USER_ID');
      console.log('userId', id);
      if (id) {
        setUserId(id);
      }
    };

    getUserId();
  }, []);

  useEffect(() => {
    console.log('state', state);
  }, [state]);

  useEffect(() => {
    if (userId) {
      getBalance({ userId });
    }
  }, [userId]);

  useEffect(() => {
    if (balance) {
      console.log('wallet balance', balance);
    }
    if (balanceError) {
      console.log('error', balanceError);
    }
  }, [balance, balanceError]);

  useEffect(() => {
    if (data) {
      console.log('payments', data.items);
      setPayments(data.items);
    }
  }, [data]);

  const goToTabPage = (page: any) => {
    console.log('page', page);
    if (tab.current) {
      tab.current.goToPage(page);
    }
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
        <Header
          title={
            balanceError
              ? t('notAvailable')
              : balance
              ? NumberUtils.formatCurrency(balance.currency, balance.value)
              : t('notAvailable')
          }
          subtitle={t('availableFunds')}
        />
        {/* <BalanceHeader /> */}
        <View style={styles.tabsContainer}>
          <TabSelection tabs={tabs} onChange={goToTabPage} />
          <Tabs
            initialPage={0}
            ref={tab}
            locked
            tabContainerStyle={styles.tabContainer}
            tabBarUnderlineStyle={styles.tabUnderline}>
            <Tab heading={<TabHeading />}>
              {paymentsLoading ? (
                <ListLoader style={styles.listLoader} />
              ) : (
                <MyPayments data={payments} />
              )}
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
