/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Label,
  Item,
  Text,
  View,
} from 'native-base';
import { isNil, capitalize } from 'lodash';

import BorderedBadge from 'library/components/BorderedBadge';
import NumberUtils from 'library/utils/NumberUtils';
import StringUtils from 'library/utils/StringUtils';
import R from 'res/R';

import styles from './styles';

const SummaryTab = ({
  currency,
  payment,
  actAsAdmin,
  paymentTab,
  toggleDenyModal,
}) => {
  const { request } = payment;

  const renderOriginalAmount = () => {
    const { originalAmount, originalCurrency } = payment;
    return isNil(originalAmount) || originalCurrency === currency ? null : (
      <Item style={styles.item}>
        <Label style={styles.label}>{R.strings.originalAmount}</Label>
        <View style={styles.row}>
          <Text style={styles.text}>
            { NumberUtils.formatCurrency(originalCurrency, originalAmount) }
          </Text>
          <Text style={styles.currency}>{originalCurrency.toUpperCase()}</Text>
        </View>
      </Item>
    );
  };

  const footerActionButton = () => {
    const paymentStatus = StringUtils.paymentStatus(payment.status);
    const showAction = actAsAdmin
      && paymentTab === 'teamPayment'
      && paymentStatus === 'APPROVED';
    return showAction ? (
      <Button
        block
        danger
        style={{ marginVertical: R.metrics.section }}
        onPress={() => toggleDenyModal(true)}
      >
        <Text upperCase={false}>
          {R.strings.disapprovePayment}
        </Text>
      </Button>
    ) : null;
  };


  return (
    <View style={styles.tabContent}>
      {/* <View style={styles.row}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>{payment.merchantName}</Text>
        <Text numberOfLines={1} style={styles.amount}>
          {NumberUtils.formatCurrency(currency, payment.amountTotal)}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.subtitle}>
          {DateUtils.formatReceiptDate(payment.createdAt)}
        </Text>
      </View> */}
      <Item style={styles.item}>
        <Label style={styles.label}>{R.strings.paidWith}</Label>
        <Text style={styles.text}>{`${payment.card.brand} - ${payment.card.last4 || ''}`}</Text>
      </Item>
      {
        payment.status !== 1
          ? (
            <Item style={styles.item}>
              <Label style={styles.label}>{R.strings.status}</Label>
              <BorderedBadge
                text={capitalize(StringUtils.paymentStatus(payment.status))}
              />
            </Item>
          ) : null
      }
      { renderOriginalAmount() }
      <Item style={styles.item}>
        <Label style={styles.label}>{R.strings.totalAmount}</Label>
        <View style={styles.row}>
          <Text style={styles.text}>
            {NumberUtils.formatCurrency(currency, payment.amountTotal)}
          </Text>
          <Text style={styles.currency}>{currency.toUpperCase()}</Text>
        </View>
      </Item>
      <Item style={styles.item}>
        <Label style={styles.label}>{R.strings.request}</Label>
        <Text style={styles.text}>{request ? request.title : ''}</Text>
      </Item>
      <Item style={styles.item}>
        <Label style={styles.label}>{R.strings.category}</Label>
        <Text style={styles.text}>{request && request.category ? request.category.name : ''}</Text>
      </Item>
      <Item style={styles.item}>
        <Label style={styles.label}>{R.strings.project}</Label>
        <Text style={styles.text}>{request && request.project ? request.project.name : ''}</Text>
      </Item>
      <Item style={styles.item}>
        <Label style={styles.label}>{R.strings.notes}</Label>
        <Text style={styles.text}>{payment.note}</Text>
      </Item>
      { footerActionButton() }
    </View>
  );
};

SummaryTab.propTypes = {
  payment: PropTypes.instanceOf(Object).isRequired,
  currency: PropTypes.string.isRequired,
};

export default SummaryTab;
