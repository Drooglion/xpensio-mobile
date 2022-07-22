import { StyleSheet, PixelRatio } from 'react-native';
import R from 'res/R';

export default StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingHorizontal: R.metrics.baseMargin,
    marginHorizontal: R.metrics.doubleMargin,
    paddingBottom: PixelRatio.get() < 3 ? 50 : 60,
  },
  txtDesc: {
    ...R.fonts.AirbnbCerealAppBook,
    color: R.colors.body2,
    fontSize: 16,
    paddingTop: 5,
    paddingRight: '10%',
  },
  footerTab: {
    ...R.sharedStyles.footerTab,
  },
  footer: {
    ...R.sharedStyles.footer,
  },
  btnCancel: {
    height: 45,
    marginHorizontal: R.metrics.smallMargin,
    backgroundColor: R.colors.error,
    color: R.colors.white,
  },
  btnSave: {
    height: 45,
    marginHorizontal: R.metrics.smallMargin,
    backgroundColor: R.colors.primary,
    color: R.colors.white,
  },
  btnTxt: {
    ...R.theme.body,
    color: R.colors.white,
  },
  label: {
    ...R.fonts.AirbnbCerealAppMedium,
    fontSize: 12,
    color: R.colors.subhead,
    marginTop: PixelRatio.get() < 3 ? 15 : 20,
  },
  input: {
    ...R.theme.body,
    paddingLeft: 0,
    paddingRight: 0,
    height: 40,
  },
  picker: {
    ...R.theme.body,
    paddingLeft: 0,
    paddingRight: 0,
    height: 40,
  },
  itemPicker: {
    alignItems: 'flex-start',
  },
  sectionTitle: {
    ...R.theme.title2,
    marginVertical: R.metrics.section,
  },
  itemLeft: {
    alignItems: 'flex-start',
  },
  addressSection: {
    marginVertical: R.metrics.baseMargin,
  },
  checkmark: {
    fontSize: 20,
    position: 'absolute',
    right: 0,
    bottom: 5,
  },
  checkmarkVerified: {
    color: R.colors.success,
  },
  checkmarkUnverified: {
    color: R.colors.subhead,
  },
});
