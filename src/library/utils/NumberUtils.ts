import { isNil } from 'lodash';
import Currencies from 'library/constants/Currencies';
import HelperUtils from 'library/utils/HelperUtils';

const paymentAmount = (value: number) => value / 100;

const formatCurrency = (country: string, value: number | string) => {
  if (value === undefined) {
    value = 0;
  }
  let currency = '';
  try {
    if (country !== '' && !isNil(country)) {
      currency = `${Currencies.getSymbolFromCurrency(
        country.toUpperCase(),
      )}${paymentAmount(typeof value === 'string' ? parseFloat(value) : value)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}`;
    }
  } catch (error) {
    HelperUtils.bugsnag.notify(error);
  }
  return currency;
};

const formatAmount = (value: number | string) =>
  (typeof value === 'string' ? parseFloat(value) : value)
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,');

export default {
  formatCurrency,
  formatAmount,
};
