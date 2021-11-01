/* eslint-disable import/no-unresolved */
import { StyleSheet } from 'react-native';
import R from 'res/R';

export default StyleSheet.create({
  container: {
    /* width: '100%',
    backgroundColor: R.colors.white,
    padding: R.metrics.baseMargin,
    borderRadius: R.metrics.cardRadius, */
  },
  calendar: {
    padding: R.metrics.baseMargin,
    borderRadius: R.metrics.cardRadius,
  },
  btnClose: {
    marginTop: R.metrics.baseMargin,
    borderRadius: R.metrics.cardRadius,
  },
  txtClose: {
    color: R.colors.secondary,
  },
});
