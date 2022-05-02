import { StyleSheet, Dimensions } from 'react-native';
import R from 'res/R';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  infoContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  texts: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: R.metrics.section,
  },
  txtTitle: {
    ...R.theme.headline,
    fontSize: 17,
    paddingVertical: 5,
  },
  txtDesc: {
    ...R.theme.subhead,
    fontSize: 13,
    textAlign: 'center',
    paddingHorizontal: '20%',
    paddingVertical: 5,
    lineHeight: 18,
  },
  txtMobile: {
    ...R.fonts.AirbnbCerealAppMedium,
    fontSize: 13,
    textAlign: 'center',
    paddingHorizontal: '20%',
    paddingVertical: 5,
    lineHeight: 18,
  },
  itemInput: {
    width: width * 0.75,
  },
  input: {
    alignSelf: 'center',
    height: height * 0.08,
    letterSpacing: width * 0.03,
    ...R.theme.large,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: R.metrics.smallMargin,
    width: width * 0.75,
  },
  txtResendDesc: {
    ...R.theme.subhead,
    fontSize: 13,
  },
  txtResend: {
    ...R.theme.subhead,
    fontWeight: '500',
    color: R.colors.secondary,
    paddingLeft: 4,
  },
  btnAction: {
    ...R.sharedStyles.btnAction,
    width: '70%',
    marginVertical: 50,
  },
});
