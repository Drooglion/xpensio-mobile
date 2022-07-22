import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Button, Label, Item, Input, Text } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isNil } from 'lodash';
import { useTranslation } from 'react-i18next';
import useGetProfile from 'hooks/api/private/profile/useGetProfile';

import hooks from 'library/hooks';
import NumberUtils from 'library/utils/NumberUtils';
import StringUtils from 'library/utils/StringUtils';
import R from 'res/R';
import LoadingIndicator from 'library/components/LoadingIndicator';

import styles from './styles';
import Payment, { PaymentStatus } from 'models/Payment';

export interface ReceiptTabProps {
  actAsAdmin: boolean;
  currency: string;
  payment: Payment;
  paymentTab: number;
  handleSave(inputs: any): void;
  toggleDenyModal(toggle: boolean): void;
  isUpdating: boolean;
}

const ReceiptTab = ({
  actAsAdmin,
  currency,
  payment,
  paymentTab,
  handleSave,
  toggleDenyModal,
  isUpdating,
}: ReceiptTabProps) => {
  const { t } = useTranslation();
  const [userId, setUserId] = useState<string>();
  const { data: profile } = useGetProfile();

  useEffect(() => {
    setUserId(profile?.userId);
  }, [profile?.userId]);

  const { inputs, handleChange } = hooks.useForm({
    merchantTin: payment.merchantTin,
    orNumber: payment.orNumber,
  });

  const onSaveChanges = () => {
    handleSave(inputs);
  };

  const footerActionButton = () => {
    const paymentStatus = StringUtils.paymentStatus(payment.status);
    const adminAction =
      actAsAdmin && paymentTab === 0 && paymentStatus === 'APPROVED';
    return adminAction ? (
      <Button
        block
        danger
        style={{ marginVertical: R.metrics.section }}
        onPress={() => toggleDenyModal(true)}>
        <Text uppercase={false}>{t('disapprovePayment')}</Text>
      </Button>
    ) : userId === payment.user.id &&
      payment.status !== PaymentStatus.DENIED ? (
      <Button
        block
        primary
        style={{ marginVertical: R.metrics.section }}
        onPress={onSaveChanges}>
        {isUpdating ? (
          <LoadingIndicator size={5} color={R.colors.white} />
        ) : (
          <Text uppercase={false}>{t('saveChanges')}</Text>
        )}
      </Button>
    ) : null;
  };

  /* const footerActionButton = () => {
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
  }; */

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
    <SafeAreaView style={styles.tabContent}>
      <Item stackedLabel style={styles.item}>
        <Label style={styles.label}>{R.strings.addOrReferenceNoLabel}</Label>
        {actAsAdmin ? (
          <Text style={styles.text}>{payment.orNumber || '--'}</Text>
        ) : payment.status !== PaymentStatus.DENIED ? (
          <Input
            disabled={actAsAdmin}
            style={styles.receiptInput}
            placeholder={t('addOrReferenceNo')}
            onChangeText={text => handleChange('orNumber', text)}
            value={inputs.orNumber}
          />
        ) : (
          <Text style={styles.text}>
            {payment.orNumber ? payment.orNumber : ''}
          </Text>
        )}
      </Item>
      <Item stackedLabel style={styles.item}>
        <Label style={styles.label}>{t('tinNumber')}</Label>
        {actAsAdmin ? (
          <Text style={styles.text}>{payment.merchantTin || '--'}</Text>
        ) : payment.status !== PaymentStatus.DENIED ? (
          <Input
            disabled={actAsAdmin}
            style={styles.receiptInput}
            placeholder={t('addTinNumber')}
            onChangeText={text => handleChange('merchantTin', text)}
            value={inputs.merchantTin}
          />
        ) : (
          <Text style={styles.text}>
            {payment.merchantTin ? payment.merchantTin : ''}
          </Text>
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
      {renderOriginalAmount()}
      <Item stackedLabel style={styles.receiptItem}>
        <Label style={styles.label}>{t('totalAmount')}</Label>
        <Text style={styles.text}>
          {NumberUtils.formatCurrency(currency, payment.amountTotal)}
        </Text>
      </Item>
      {footerActionButton()}
    </SafeAreaView>
  );
};

export default ReceiptTab;
