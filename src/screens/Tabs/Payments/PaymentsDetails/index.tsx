/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */

import React, { useState } from 'react';
// import { Query, compose, graphql } from 'react-apollo';
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

// import PAYMENTS from 'library/api/Payments';
// import STORE_QUERIES from 'library/store/queries';
// import STORE_MUTATIONS from 'library/store/mutations';

import EmptyList from 'library/components/EmptyList';
import DenyModal from 'library/components/DenyModal';
import Header from 'library/components/Header';
import Loading from 'library/components/Loading';

import HelperUtils from 'library/utils/HelperUtils';
import StringUtils from 'library/utils/StringUtils';
import NumberUtils from 'library/utils/NumberUtils';
import DateUtils from 'library/utils/DateUtils';
import R from 'res/R';
import getTheme from 'native-base-theme/components';
import theme from 'native-base-theme/variables/theme';
// import ParallaxContent from './ParallaxContent';
import TabSelection from './TabSelection';
import SummaryTab from './SummaryTab';
import ReceiptTab from './ReceiptTab';
import styles from './styles';

const PaymentsDetails = () => {
  let tab = {};
  const currency = 'NZD';
  const actAsAdmin = false;
  // const {
  //   state: {
  //     params: { id, refetch: refetchPayments, paymentTab },
  //   },
  // } = navigation;

  /* hooks */
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [denyModalVisible, setDenyModalVisible] = useState<boolean>(true);
  const [denyReason, setDenyReason] = useState<string>('');

  const onTabChange = index => {
    setActiveTab(index);
    tab.goToPage(index);
  };

  const handleSave = async inputs => {
    const variables = { input: { ...inputs }, paymentId: id };
    try {
      updateLoadingModal({ variables: { loadingModal: true } });
      await updatePayment({ variables });
      refetchPayments();
      setIsEditing(false);
      updateLoadingModal({ variables: { loadingModal: false } });
      setTimeout(() => {
        showDialogModal({
          variables: {
            title: R.strings.success,
            icon: 'success',
            description: 'Payment details updated',
          },
        });
      }, 500);
    } catch (error) {
      HelperUtils.bugsnag.notify(error);
      setIsEditing(false);
      updateLoadingModal({ variables: { loadingModal: false } });
    }
  };

  const handleRejectPayment = async () => {
    const variables = { id, input: { reason: denyReason } };
    try {
      const res = await rejectPayment({ variables });
      const {
        data: {
          payments: {
            payload: { messages },
          },
        },
      } = res;
      refetchPayments();
      toggleDenyModal(false);
      setTimeout(() => {
        showDialogModal({
          variables: {
            icon: 'success',
            title: R.strings.success,
            description: messages[0],
          },
        });
      }, 500);
    } catch (error) {
      HelperUtils.bugsnag.notify(error);
      toggleDenyModal(false);
      setTimeout(() => {
        showDialogModal({
          variables: {
            title: 'Unable to Deny',
            description: 'Something went wrong',
          },
        });
      }, 500);
    }
  };

  const setEditing = () => {
    setIsEditing(true);
  };

  const toggleDenyModal = toggle => {
    setDenyModalVisible(toggle);
    setDenyReason('');
  };

  const handleDenyReasonChange = value => {
    setDenyReason(value);
  };

  const paymentUnavailable = () => (
    <View>
      <Header hasBack onBackPress={() => navigation.goBack()} />
      <EmptyList
        image={R.images.empty_payments}
        text={R.strings.paymentUnavailable}
      />
    </View>
  );

  return (
    <StyleProvider style={getTheme(theme)}>
      <Container style={styles.container}>
        <DenyModal
          isVisible={denyModalVisible}
          reason={denyReason}
          handleTextChange={handleDenyReasonChange}
          onCancel={() => toggleDenyModal(false)}
          onSubmit={handleRejectPayment}
          submitDisabled={!denyReason}
        />
        {/* <ParallaxContent
          payment={payload}
          onBackPress={() => navigation.navigate('Payments')}
          refetch={refetchListToDetails}>
          <View style={styles.parallaxChild}>
            <Item style={styles.paymentHeader}>
              <Left style={styles.paymentHeaderLeft}>
                <UserAvatar
                  size={40}
                  fontDecrease="2"
                  name={StringUtils.getInitials(payload.merchantName)}
                />
              </Left>
              <Body style={styles.paymentHeaderBody}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.merchantName}>
                  {payload.merchantName}
                </Text>
                <Text style={styles.transactionDate}>
                  {DateUtils.formatReceiptDate(payload.createdAt)}
                </Text>
              </Body>
              <Right style={styles.paymentHeaderRight}>
                <Text numberOfLines={1} style={styles.amountTotal}>
                  {NumberUtils.formatCurrency(
                    payload.currency,
                    payload.amountTotal,
                  )}
                </Text>
              </Right>
            </Item>
            <TabSelection selected={activeTab} onTabSelect={onTabChange} />
            <Tabs
              initialPage={0}
              ref={e => {
                tab = e;
              }}
              locked
              tabContainerStyle={styles.tabContainer}
              tabBarUnderlineStyle={styles.tabUnderline}>
              <Tab heading={<TabHeading />}>
                <SummaryTab
                  actAsAdmin={actAsAdmin}
                  paymentTab={paymentTab}
                  currency={currency}
                  payment={payload}
                  toggleDenyModal={toggleDenyModal}
                />
              </Tab>
              <Tab heading={<TabHeading />}>
                <ReceiptTab
                  currency={currency}
                  handleSave={handleSave}
                  toggleDenyModal={toggleDenyModal}
                  actAsAdmin={actAsAdmin}
                  payment={payload}
                  paymentTab={paymentTab}
                  setEditing={setEditing}
                  isEditing={isEditing}
                />
              </Tab>
            </Tabs>
          </View>
        </ParallaxContent> */}
      </Container>
    </StyleProvider>
  );
};

// export default compose(
//   graphql(STORE_QUERIES.privilege, { name: 'privilege' }),
//   graphql(STORE_QUERIES.companyConfiguration, { name: 'companyConfiguration' }),
//   graphql(PAYMENTS.REJECT_PAYMENT, { name: 'rejectPayment' }),
//   graphql(PAYMENTS.UPDATE_PAYMENT, { name: 'updatePayment' }),
//   graphql(STORE_MUTATIONS.updateLoadingModal, { name: 'updateLoadingModal' }),
//   graphql(STORE_MUTATIONS.showDialogModal, { name: 'showDialogModal' }),
// )(PaymentsDetails);

export default PaymentsDetails;
