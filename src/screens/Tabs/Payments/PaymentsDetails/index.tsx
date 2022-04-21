import React, { useEffect, useRef, useState } from 'react';
import {
  Container,
  Tabs,
  Tab,
  TabHeading,
  Text,
  View,
  StyleProvider,
  Item,
  Left,
  Body,
  Right,
} from 'native-base';
import UserAvatar from 'react-native-user-avatar';

import EmptyList from 'library/components/EmptyList';
import DenyModal from 'library/components/DenyModal';
import Header from 'library/components/Header';

import HelperUtils from 'library/utils/HelperUtils';
import StringUtils from 'library/utils/StringUtils';
import NumberUtils from 'library/utils/NumberUtils';
import DateUtils from 'library/utils/DateUtils';
import R from 'res/R';
import getTheme from 'native-base-theme/components';
import theme from 'native-base-theme/variables/theme';
import ParallaxContent from './ParallaxContent';
import TabSelection from './TabSelection';
import SummaryTab from './SummaryTab';
import ReceiptTab from './ReceiptTab';
import styles from './styles';
import useUpdatePayment from 'hooks/api/private/payments/useUpdatePayment';

import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { IPayment } from 'types/Payment';
import { useResource } from 'contexts/resourceContext';
import useRejectPayment from 'hooks/api/private/payments/useRejectPayment';

const PaymentsDetails = () => {
  const tab = useRef<any>(null);
  const currency = 'php';
  const { state, dispatch } = useResource();
  const actAsAdmin = state.actAsAdmin;

  const { t } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  const { mutate: updatePayment, isLoading: updatingPayment } =
    useUpdatePayment();
  const { mutate: rejectPayment, isLoading: rejectingPayment } =
    useRejectPayment();
  const { payment, paymentTab } = route.params;

  /* hooks */
  const [details, setDetails] = useState<IPayment>();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [denyModalVisible, setDenyModalVisible] = useState<boolean>(false);
  const [denyReason, setDenyReason] = useState<string>('');

  useEffect(() => {
    if (route) {
      if (route.params) {
        const { payment } = route.params;
        setDetails(payment);
      }
    }
  }, [route]);

  const goToTabPage = (page: number) => {
    if (tab.current) {
      setActiveTab(page);
      tab.current.goToPage(page);
    }
  };

  const setEditing = () => {
    setIsEditing(true);
  };

  const toggleDenyModal = (toggle: boolean) => {
    setDenyModalVisible(toggle);
    setDenyReason('');
  };

  const handleDenyReasonChange = (value: string) => {
    setDenyReason(value);
  };
  const handleSave = async (inputs: Record<string, string>) => {
    dispatch({ type: 'SET_LOADING_MODAL', loadingModal: true });
    const params = { id: payment.id, payload: { ...inputs } };

    await updatePayment(params, {
      onSuccess: () => {
        dispatch({
          type: 'SET_DIALOG_MODAL',
          dialogModal: {
            visible: true,
            title: t('message.updated'),
            icon: 'congratulations',
            description: t('paymentDetailsUpdated'),
          },
        });
      },
      onSettled: () => {
        setIsEditing(false);
        dispatch({ type: 'SET_LOADING_MODAL', loadingModal: false });
      },
    });
  };

  const handleRejectPayment = () => {
    setDenyModalVisible(false);
    const params = { id: payment.id, payload: { reason: denyReason } };
    rejectPayment(params, {
      onSuccess: (message: string) => {
        setTimeout(() => {
          dispatch({
            type: 'SET_DIALOG_MODAL',
            dialogModal: {
              visible: true,
              title: t('message.updated'),
              icon: 'congratulations',
              description: message,
            },
          });
        }, 500);
      },
    });
    // try {
    //   const res = await rejectPayment({ variables });
    //   const {
    //     data: {
    //       payments: {
    //         payload: { messages },
    //       },
    //     },
    //   } = res;
    //   refetchPayments();
    //   toggledenymodal(false);
    //   setTimeout(() => {
    //     showDialogModal({
    //       variables: {
    //         icon: 'success',
    //         title: t('success'),
    //         description: messages[0],
    //       },
    //     });
    //   }, 500);
    // } catch (error) {
    //   HelperUtils.bugsnag.notify(error);
    //   toggleDenyModal(false);
    //   setTimeout(() => {
    //     showDialogModal({
    //       variables: {
    //         title: 'Unable to Deny',
    //         description: 'Something went wrong',
    //       },
    //     });
    //   }, 500);
    // }
  };

  const paymentUnavailable = () => (
    <View>
      <Header hasBack onBackPress={() => navigation.goBack()} />
      <EmptyList
        image={R.images.empty_payments}
        text={t('paymentUnavailable')}
      />
    </View>
  );

  return (
    <StyleProvider style={getTheme(theme)}>
      <Container style={styles.container}>
        <DenyModal
          loading={rejectingPayment}
          visible={denyModalVisible}
          reason={denyReason}
          onReasonChanged={handleDenyReasonChange}
          onCancel={() => toggleDenyModal(false)}
          onSubmit={handleRejectPayment}
        />
        {details ? (
          <ParallaxContent
            payment={details}
            onBackPress={() => navigation.navigate('Payments' as never)}
            refetch={() => {}}>
            <View style={styles.parallaxChild}>
              <Item style={styles.paymentHeader}>
                <Left style={styles.paymentHeaderLeft}>
                  <UserAvatar
                    size={40}
                    name={StringUtils.getInitials(details?.merchantName)}
                  />
                </Left>
                <Body style={styles.paymentHeaderBody}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.merchantName}>
                    {details.merchantName}
                  </Text>
                  <Text style={styles.transactionDate}>
                    {DateUtils.formatReceiptDate(details.createdAt)}
                  </Text>
                </Body>
                <Right style={styles.paymentHeaderRight}>
                  <Text numberOfLines={1} style={styles.amountTotal}>
                    {NumberUtils.formatCurrency(
                      details.currency,
                      details.amountTotal,
                    )}
                  </Text>
                </Right>
              </Item>
              <TabSelection active={activeTab} onTabSelect={goToTabPage} />
              <Tabs
                initialPage={0}
                ref={tab}
                locked
                tabContainerStyle={styles.tabContainer}
                tabBarUnderlineStyle={styles.tabUnderline}>
                <Tab heading={<TabHeading />}>
                  <SummaryTab
                    actAsAdmin={actAsAdmin}
                    paymentTab={activeTab}
                    currency={currency}
                    payment={details}
                    toggleDenyModal={toggleDenyModal}
                  />
                </Tab>
                <Tab heading={<TabHeading />}>
                  <ReceiptTab
                    currency={currency}
                    handleSave={handleSave}
                    toggleDenyModal={toggleDenyModal}
                    actAsAdmin={actAsAdmin}
                    payment={details}
                    paymentTab={activeTab}
                    setEditing={setEditing}
                    isEditing={isEditing}
                    isUpdating={updatingPayment}
                  />
                </Tab>
              </Tabs>
            </View>
          </ParallaxContent>
        ) : null}
      </Container>
    </StyleProvider>
  );
};

export default PaymentsDetails;
