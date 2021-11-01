/* eslint-disable import/no-unresolved */
import { StyleSheet } from 'react-native';
import R from 'res/R';

export default StyleSheet.create({
  divider: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: R.colors.divider,
    marginTop: R.metrics.doubleMargin,
    marginBottom: R.metrics.doubleMargin,
  }
});
