import React, { Fragment } from 'react';
import { Button, Label, Item, Input, Text, View } from 'native-base';
import { isNil } from 'lodash';
import { useTranslation } from 'react-i18next';

import hooks from 'library/hooks';
import NumberUtils from 'library/utils/NumberUtils';
import StringUtils from 'library/utils/StringUtils';
import R from 'res/R';
import LoadingIndicator from 'library/components/LoadingIndicator';

import styles from './styles';
import { IPayment } from 'types/Payment';

export interface ReceiptTabProps {
  actAsAdmin: boolean;
  currency: string;
  payment: IPayment;
  isEditing: boolean;
  paymentTab: number;
  handleSave(inputs: any): void;
  toggleDenyModal(toggle: boolean): void;
  setEditing(): void;
  isUpdating: boolean;
}

const ReceiptTab = ({
  actAsAdmin,
  currency,
  payment,
  isEditing,
  paymentTab,
  handleSave,
  toggleDenyModal,
  setEditing,
  isUpdating,
}: ReceiptTabProps) => {
  const { t } = useTranslation();

  const { inputs, handleChange } = hooks.useForm({
    merchantTin: payment.merchantTin,
    orNumber: payment.orNumber,
  });

  const footerActionButton = () => {
    const paymentStatus = StringUtils.paymentStatus(payment.status);
    let component = null;
    console.log({ paymentTab });

    if (paymentTab === 1 && isEditing) {
      component = (
        <Button block onPress={() => handleSave(inputs)} disabled={isUpdating}>
          {isUpdating ? (
            <LoadingIndicator size={5} color={R.colors.white} />
          ) : (
            <Text uppercase={false}>{t('save')}</Text>
          )}
        </Button>
      );
    } else {
      component =
        actAsAdmin && paymentTab === 1 && paymentStatus === 'APPROVED' ? (
          <Button
            block
            danger
            onPress={() => toggleDenyModal(true)}
            disabled={isUpdating}>
            {isUpdating ? (
              <LoadingIndicator size={5} color={R.colors.white} />
            ) : (
              <Text uppercase={false}>{t('disapprovePayment')}</Text>
            )}
          </Button>
        ) : null;
    }

    return component;
  };

  const renderOriginalAmount = () => {
    const { originalAmount, originalCurrency } = payment;
    return isNil(originalAmount) || originalCurrency === currency ? null : (
      <Item stackedLabel style={styles.receiptItem}>
        <Label style={styles.label}>{t('originalAmount')}</Label>
        <Text style={styles.text}>
          {NumberUtils.formatCurrency(originalCurrency, payment.originalAmount)}
        </Text>
      </Item>
    );
  };

  return (
    <Fragment>
      <View style={styles.tabContent}>
        <Item stackedLabel style={styles.item}>
          <Label style={styles.label}>{R.strings.addOrReferenceNoLabel}</Label>
          {actAsAdmin ? (
            <Text style={styles.text}>{payment.orNumber || '--'}</Text>
          ) : (
            <Input
              disabled={actAsAdmin}
              style={styles.receiptInput}
              placeholder={t('addOrReferenceNo')}
              onFocus={setEditing}
              onChangeText={text => handleChange('orNumber', text)}
              value={inputs.orNumber}
            />
          )}
        </Item>
        <Item stackedLabel style={styles.item}>
          <Label style={styles.label}>{t('tinNumber')}</Label>
          {actAsAdmin ? (
            <Text style={styles.text}>{payment.merchantTin || '--'}</Text>
          ) : (
            <Input
              disabled={actAsAdmin}
              style={styles.receiptInput}
              placeholder={t('addTinNumber')}
              onFocus={setEditing}
              onChangeText={text => handleChange('merchantTin', text)}
              value={inputs.merchantTin}
            />
          )}
        </Item>
        <Item stackedLabel style={styles.item}>
          <Label style={styles.label}>{t('merchant')}</Label>
          <Text style={styles.text}>{payment.merchantName || '--'}</Text>
        </Item>
        <Item stackedLabel style={styles.receiptItem}>
          <Label style={styles.label}>{t('address')}</Label>
          <Text style={styles.text}>{payment.merchantAddress || '--'}</Text>
        </Item>
        <Item stackedLabel style={styles.receiptItem}>
          <Label style={styles.label}>{t('taxable')}</Label>
          <Text style={styles.text}>
            {NumberUtils.formatCurrency(currency, payment.amountTaxable || 0)}
          </Text>
        </Item>
        <Item stackedLabel style={styles.receiptItem}>
          <Label style={styles.label}>{t('tax')}</Label>
          <Text style={styles.text}>
            {NumberUtils.formatCurrency(currency, payment.amountTax || 0)}
          </Text>
        </Item>
        <Item stackedLabel style={styles.receiptItem}>
          <Label style={styles.label}>{t('totalAmount')}</Label>
          <Text style={styles.text}>
            {NumberUtils.formatCurrency(currency, payment.amountTotal)}
          </Text>
        </Item>
      </View>
      <View style={styles.footer}>{footerActionButton()}</View>
    </Fragment>
  );
};

export default ReceiptTab;
