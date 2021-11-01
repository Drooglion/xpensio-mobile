/* eslint-disable import/no-unresolved */
import { StyleSheet } from 'react-native';
import R from 'res/R';

export default StyleSheet.create({
  btnForgot: {
    alignSelf: 'flex-end',
    height: undefined,
    justifyContent: 'flex-end',
  },
  forgot: {
    ...R.fonts.AirbnbCerealAppMedium,
    color: R.colors.subhead,
    fontSize: 12,
    paddingLeft: 2,
    paddingRight: 2,
  },
});
