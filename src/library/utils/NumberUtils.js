/* eslint-disable import/no-unresolved */
import { isNil } from 'lodash';
import Currencies from 'library/constants/Currencies';
import HelperUtils from 'library/utils/HelperUtils';

const paymentAmount = value => value / 100;

const formatCurrency = (country, value) => {
  if (value === undefined) value = 0;
  let currency = '';
  try {
    if (country !== '' && !isNil(country)) {
      currency = `${Currencies.getSymbolFromCurrency(country.toUpperCase())}${paymentAmount(parseFloat(value)).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}`;
    }
  } catch (error) {
    HelperUtils.bugsnag.notify(error);
  }
  return currency;
};

const formatAmount = value => parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');

export default {
  formatCurrency,
  formatAmount,
};
