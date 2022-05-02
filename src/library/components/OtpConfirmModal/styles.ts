import { StyleSheet, Dimensions } from 'react-native';
import R from 'res/R';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  modal: {
    backgroundColor: R.colors.white,
    justifyContent: 'center',
    borderRadius: 5,
    padding: 20,
  },
  title: {
    ...R.fonts.AirbnbCerealAppMedium,
    fontSize: 25,
    lineHeight: 30,
  },
  subtitle: {
    ...R.theme.subhead,
    fontSize: 14,
    lineHeight: 20,
  },
  body: {
    marginTop: R.metrics.doubleMargin,
    marginBottom: 0,
  },
  btnGroup: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  noTxt: {
    ...R.fonts.AirbnbCerealAppMedium,
    fontSize: 15,
    color: R.colors.body2,
  },
  input: {
    textAlign: 'center',
    height: height * 0.08,
    letterSpacing: width * 0.035,
    ...R.theme.large,
  },
  desc: {
    ...R.theme.caption2,
    fontSize: 13,
    paddingTop: R.metrics.smallMargin,
  },
  row: {
    flexDirection: 'row',
  },
  actionWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionBtn: {
    height: 40,
  },
  actionBtnText: {
    ...R.fonts.AirbnbCerealAppMedium,
    fontSize: 13,
  },
  txtConfirm: {
    ...R.fonts.AirbnbCerealAppMedium,
    fontSize: 15,
    color: R.colors.primary,
  },
  txtError: {
    marginVertical: R.metrics.smallMargin,
    ...R.fonts.AirbnbCerealAppBook,
    color: R.colors.error,
    fontSize: 12,
    textTransform: 'capitalize',
  },
});
