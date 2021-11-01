import { StyleSheet, Dimensions } from 'react-native';
import R from 'res/R';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    height: 130,
    width: '100%',
    marginTop: height * 0.06,
  },
  form: {
    marginHorizontal: R.metrics.doubleMargin,
    paddingHorizontal: R.metrics.doubleMargin,
    marginTop: R.metrics.doubleMargin,
    alignItems: 'center',
  },
  item: {
    marginLeft: 0,
    marginBottom: R.metrics.smallMargin,
  },
  submit: {
    backgroundColor: R.colors.primary,
    width: '100%',
    justifyContent: 'center',
    marginTop: R.metrics.section,
  },
  or: {
    ...R.fonts.AirbnbCerealAppMedium,
    color: R.colors.divider,
    fontSize: 12,
  },
  input: {
    ...R.theme.body,
    fontSize: 16,
  },
  txtErrorLogin: {
    ...R.fonts.AirbnbCerealAppBook,
    fontSize: 14,
    color: R.colors.error,
    alignSelf: 'flex-start',
  },
  descWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  descTitle: {
    marginVertical: R.metrics.doubleMargin,
    ...R.fonts.AirbnbCerealAppBold,
    fontSize: 22,
    textAlign: 'center',
  },
  descText: {
    marginVertical: R.metrics.doubleMargin,
    ...R.theme.body,
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
    width: width * 0.9,
  },
});
