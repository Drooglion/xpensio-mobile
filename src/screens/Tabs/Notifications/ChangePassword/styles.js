/* eslint-disable import/no-unresolved */
import { StyleSheet, PixelRatio } from 'react-native';
import R from 'res/R';

export default StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingHorizontal: R.metrics.baseMargin,
    marginHorizontal: R.metrics.doubleMargin,
    paddingVertical: R.metrics.doubleMargin,
  },
  txtDesc: {
    ...R.fonts.AirbnbCerealAppBook,
    color: R.colors.body2,
    fontSize: 16,
    paddingTop: 5,
    paddingRight: '10%'
  },
  footerTab: {
    ...R.sharedStyles.footerTab
  },
  footer: {
    ...R.sharedStyles.footer
  },
  btnAction: {
    height: 45,
    marginHorizontal: R.metrics.smallMargin,
  },
  btnTxt: {
    color: R.colors.white
  },
  label: {
    ...R.fonts.AirbnbCerealAppMedium,
    fontSize: 12,
    color: R.colors.subhead,
    marginTop: PixelRatio.get() < 3 ? 15 : 20,
  },
  input: {
    ...R.theme.body,
  },
  errors: {
    paddingVertical: R.metrics.doubleMargin,
    ...R.theme.body,
    fontSize: 12,
    color: R.colors.error,
  }
});
