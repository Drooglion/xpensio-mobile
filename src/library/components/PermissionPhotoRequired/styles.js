/* eslint-disable import/no-unresolved */
import { StyleSheet } from 'react-native';
import R from 'res/R';

export default StyleSheet.create({
  requiredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  requiredBtn: {
    marginVertical: R.metrics.doubleMargin,
    alignSelf: 'center'
  },
  requiredTxt: {
    ...R.fonts.AirbnbCerealAppBook,
  }
});
