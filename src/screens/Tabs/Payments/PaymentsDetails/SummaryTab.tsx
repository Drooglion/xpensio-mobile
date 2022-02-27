import React from 'react';
import { Button, Label, Item, Text, View } from 'native-base';
import { isNil, capitalize } from 'lodash';
import { useTranslation } from 'react-i18next';

import BorderedBadge from 'library/components/BorderedBadge';
import NumberUtils from 'library/utils/NumberUtils';
import StringUtils from 'library/utils/StringUtils';
import R from 'res/R';

import styles from './styles';
import { IPayment } from 'types/Payment';

export interface SummaryTabProps {
  currency: string;
  payment: IPayment;
  actAsAdmin: boolean;
  paymentTab: number;
  toggleDenyModal(toggle: boolean): void;
}

const SummaryTab = ({
  currency,
  payment,
  actAsAdmin,
  paymentTab,
  toggleDenyModal,
}: SummaryTabProps) => {
  const { t } = useTranslation();

  const renderOriginalAmount = () => {
    const { originalAmount, originalCurrency } = payment;
    return isNil(originalAmount) || originalCurrency === currency ? null : (
      <Item style={styles.item}>
        <Label style={styles.label}>{t('originalAmount')}</Label>
        <View style={styles.row}>
          <Text style={styles.text}>
            {NumberUtils.formatCurrency(originalCurrency, originalAmount)}
          </Text>
          <Text style={styles.currency}>{originalCurrency.toUpperCase()}</Text>
        </View>
      </Item>
    );
  };

  const footerActionButton = () => {
    const paymentStatus = StringUtils.paymentStatus(payment.status);
    const showAction =
      actAsAdmin && paymentTab === 1 && paymentStatus === 'APPROVED';
    return showAction ? (
      <Button
        block
        danger
        style={{ marginVertical: R.metrics.section }}
        onPress={() => toggleDenyModal(true)}>
        <Text uppercase={false}>{t('disapprovePayment')}</Text>
      </Button>
    ) : null;
  };

  return (
    <View style={styles.tabContent}>
      {/* <View style={styles.row}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
          {payment.merchantName}
        </Text>
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
        <Label style={styles.label}>{t('paidWith')}</Label>
        <Text style={styles.text}>{`${payment.card.brand} - ${
          payment.card.last4 || ''
        }`}</Text>
      </Item>
      {payment.status !== 1 ? (
        <Item style={styles.item}>
          <Label style={styles.label}>{t('status')}</Label>
          <BorderedBadge
            text={capitalize(StringUtils.paymentStatus(payment.status))}
          />
        </Item>
      ) : null}
      {renderOriginalAmount()}
      <Item style={styles.item}>
        <Label style={styles.label}>{t('totalAmount')}</Label>
        <View style={styles.row}>
          <Text style={styles.text}>
            {NumberUtils.formatCurrency(currency, payment.amountTotal)}
          </Text>
          <Text style={styles.currency}>{currency.toUpperCase()}</Text>
        </View>
      </Item>
      <Item style={styles.item}>
        <Label style={styles.label}>{t('request')}</Label>
        <Text style={styles.text}>
          {payment.request ? payment.request : ''}
        </Text>
      </Item>
      <Item style={styles.item}>
        <Label style={styles.label}>{t('category')}</Label>
        <Text style={styles.text}>
          {payment.category ? payment.category : ''}
        </Text>
      </Item>
      <Item style={styles.item}>
        <Label style={styles.label}>{t('project')}</Label>
        <Text style={styles.text}>
          {payment.project ? payment.project : ''}
        </Text>
      </Item>
      <Item style={styles.item}>
        <Label style={styles.label}>{t('notes')}</Label>
        <Text style={styles.text}>{payment.note}</Text>
      </Item>
      {footerActionButton()}
    </View>
  );
};

export default SummaryTab;
