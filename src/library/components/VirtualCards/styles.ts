import { StyleSheet, Dimensions, PixelRatio } from 'react-native';
import { hasNotch } from 'react-native-device-info';
import R from 'res/R';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: R.metrics.doubleMargin,
  },
  actionContainer: {
    justifyContent: 'center',
  },
  txtDesc: {
    alignSelf: 'center',
    ...R.theme.subhead,
    fontSize: 12,
    textAlign: 'center',
    paddingHorizontal: '20%',
    paddingVertical: PixelRatio.get() < 3 ? 0 : 10,
    lineHeight: 16,
  },
  btnGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: R.metrics.section,
  },
  btn: {
    width: 150,
    height: 35,
    justifyContent: 'center',
    alignSelf: 'center',
    marginHorizontal: R.metrics.baseMargin,
  },
  btnTxtAction: {
    fontSize: 12,
  },
  cardContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    alignSelf: 'center',
    height: height * 0.45,
    width: width * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardDetails: {
    top: 10,
    width: width * (PixelRatio.get() < 3 ? 0.4 : 0.45),
  },
  cardNumber: {
    ...R.fonts.AirbnbCerealAppBold,
    fontSize: PixelRatio.get() < 3 ? 12 : 15,
    letterSpacing: 0.5,
  },
  cardHolder: {
    paddingTop: 15,
    paddingBottom: 10,
  },
  cardTxtName: {
    ...R.fonts.AirbnbCerealAppBold,
    fontSize: PixelRatio.get() < 3 ? 12 : 15,
  },
  cardTxtCompany: {
    ...R.fonts.AirbnbCerealAppMedium,
    fontSize: PixelRatio.get() < 3 ? 8 : 10,
    paddingTop: 5,
  },
  cardTxtMute: {
    ...R.fonts.AirbnbCerealAppBold,
    color: R.colors.subhead,
    fontSize: PixelRatio.get() < 3 ? 6 : 8,
  },
  cardTxtExp: {
    ...R.fonts.AirbnbCerealAppMedium,
    fontSize: PixelRatio.get() < 3 ? 13 : 16,
  },
  bottomSheet: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: R.metrics.baseMargin,
  },
  bottomSheetContent: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: R.metrics.smallMargin,
    paddingBottom: hasNotch()
      ? R.metrics.doubleSection
      : R.metrics.doubleMargin,
    paddingHorizontal: R.metrics.baseMargin,
  },
  bottomSheetDetails: {
    justifyContent: 'center',
  },
  virtualCardViewWarning: {
    ...R.theme.title2,
    fontSize: 10,
    color: R.colors.error,
    textAlign: 'center',
  },
  item: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 8,
    borderBottomWidth: 0,
  },
  label: {
    ...R.fonts.AirbnbCerealAppMedium,
    fontSize: 10,
    lineHeight: 16,
    color: R.colors.subhead,
    paddingTop: R.metrics.smallMargin,
    paddingBottom: 2,
  },
  text: {
    ...R.theme.body,
    fontSize: 15,
  },
});
