/* eslint-disable import/no-unresolved */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Label,
  Item,
  Input,
  Text,
  View,
} from 'native-base';
import { isNil } from 'lodash';

import hooks from 'library/hooks';
import NumberUtils from 'library/utils/NumberUtils';
import StringUtils from 'library/utils/StringUtils';
import R from 'res/R';

import styles from './styles';

const ReceiptTab = ({
  actAsAdmin,
  currency,
  payment,
  isEditing,
  handleSave,
  toggleDenyModal,
  paymentTab,
  setEditing,
}) => {
  const { inputs, handleChange } = hooks.useForm({
    merchantTin: payment.merchantTin,
    orNumber: payment.orNumber,
  });

  const footerActionButton = () => {
    const paymentStatus = StringUtils.paymentStatus(payment.status);
    let component = null;

    if (paymentTab === 'myPayment' && isEditing) {
      component = (
        <Button block onPress={() => handleSave(inputs)}>
          <Text upperCase={false}>
            {R.strings.save}
          </Text>
        </Button>
      );
    } else {
      component = (
        actAsAdmin
        && paymentTab === 'teamPayment'
        && paymentStatus === 'APPROVED'
      ) ? (
        <Button
          block
          danger
          onPress={() => toggleDenyModal(true)}
        >
          <Text upperCase={false}>
            {R.strings.disapprovePayment}
          </Text>
        </Button>
        ) : null;
    }

    return component;
  };

  const renderOriginalAmount = () => {
    const { originalAmount, originalCurrency } = payment;
    return isNil(originalAmount) || originalCurrency === currency ? null : (
      <Item stackedLabel style={styles.receiptItem}>
        <Label style={styles.label}>{R.strings.originalAmount}</Label>
        <Text style={styles.text}>
          {NumberUtils.formatCurrency(originalCurrency, payment.originalAmount)}
        </Text>
      </Item>
    );
  };

  return (
    <Fragment>
      <View style={styles.tabContent}>
        <Item stackedLabel style={styles.receiptItem}>
          <Label style={styles.label}>{R.strings.addOrReferenceNoLabel}</Label>
          <Input
            disabled={paymentTab === 'teamPayment'}
            style={styles.receiptInput}
            placeholder={R.strings.addOrReferenceNo}
            onStartEditing
            onFocus={setEditing}
            onChangeText={text => handleChange('orNumber', text)}
            value={inputs.orNumber}
          />
        </Item>
        <Item stackedLabel style={styles.receiptItem}>
          <Label style={styles.label}>{R.strings.tinNumber}</Label>
          <Input
            disabled={paymentTab === 'teamPayment'}
            style={styles.receiptInput}
            placeholder={R.strings.addTinNumber}
            onFocus={setEditing}
            onChangeText={text => handleChange('merchantTin', text)}
            value={inputs.merchantTin}
          />
        </Item>
        <Item stackedLabel style={styles.receiptItem}>
          <Label style={styles.label}>{R.strings.merchant}</Label>
          <Text style={styles.text}>
            { paymentTab.merchantName || '--' }
          </Text>
        </Item>
        <Item stackedLabel style={styles.receiptItem}>
          <Label style={styles.label}>{R.strings.address}</Label>
          <Text style={styles.text}>
            { paymentTab.merchantAddress || '--' }
          </Text>
        </Item>
        <Item stackedLabel style={styles.receiptItem}>
          <Label style={styles.label}>{R.strings.taxable}</Label>
          <Text style={styles.text}>
            { NumberUtils.formatCurrency(currency, paymentTab.amountTaxable || 0) }
          </Text>
        </Item>
        <Item stackedLabel style={styles.receiptItem}>
          <Label style={styles.label}>{R.strings.tax}</Label>
          <Text style={styles.text}>
            { NumberUtils.formatCurrency(currency, paymentTab.amountTax || 0) }
          </Text>
        </Item>
        <Item stackedLabel style={styles.receiptItem}>
          <Label style={styles.label}>{R.strings.totalAmount}</Label>
          <Text style={styles.text}>
            {NumberUtils.formatCurrency(currency, payment.amountTotal)}
          </Text>
        </Item>
      </View>
      <View style={styles.footer}>
        { footerActionButton() }
      </View>
    </Fragment>
  );
};

ReceiptTab.propTypes = {
  actAsAdmin: PropTypes.bool.isRequired,
  payment: PropTypes.instanceOf(Object).isRequired,
  currency: PropTypes.string.isRequired,
  handleSave: PropTypes.func,
  toggleDenyModal: PropTypes.func,
  setEditing: PropTypes.func,
};

ReceiptTab.defaultProps = {
  handleSave: () => {},
  toggleDenyModal: () => {},
  setEditing: () => {},
};

export default ReceiptTab;
