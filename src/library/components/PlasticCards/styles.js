/* eslint-disable import/no-unresolved */
import { StyleSheet, Dimensions, PixelRatio } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';
import R from 'res/R';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: R.metrics.doubleMargin,
  },
  actionContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  txtDesc: {
    alignSelf: 'center',
    ...R.theme.subhead,
    fontSize: 12,
    textAlign: 'center',
    paddingVertical: PixelRatio.get() < 3 ? 0 : 10,
    lineHeight: 16
  },
  btnGroup: {
    padding: R.metrics.section
  },
  btn: {
    width: 150,
    justifyContent: 'center',
    alignSelf: 'center',
    marginHorizontal: R.metrics.baseMargin,
    marginVertical: R.metrics.smallMargin
  },
  btnOpenScanner: {
    width: undefined,
    justifyContent: 'center',
    alignSelf: 'center',
    marginHorizontal: R.metrics.baseMargin,
    marginVertical: R.metrics.smallMargin
  },
  btnTxtAction: {
    fontSize: 12
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
    width: width * (PixelRatio.get() < 3 ? 0.40 : 0.45)
  },
  cardNumber: {
    ...R.fonts.AirbnbCerealAppBold,
    fontSize: PixelRatio.get() < 3 ? 12 : 15,
    letterSpacing: 0.5
  },
  cardHolder: {
    paddingTop: 15,
    paddingBottom: 10
  },
  cardTxtName: {
    ...R.fonts.AirbnbCerealAppBold,
    fontSize: PixelRatio.get() < 3 ? 12 : 15,
  },
  cardTxtCompany: {
    ...R.fonts.AirbnbCerealAppMedium,
    fontSize: PixelRatio.get() < 3 ? 8 : 10,
    paddingTop: 5
  },
  cardTxtMute: {
    ...R.fonts.AirbnbCerealAppBold,
    color: R.colors.subhead,
    fontSize: PixelRatio.get() < 3 ? 6 : 8,
  },
  cardExp: {
    flexDirection: 'row'
  },
  cardTxtExp: {
    ...R.fonts.AirbnbCerealAppMedium,
    fontSize: PixelRatio.get() < 3 ? 13 : 16,
  },
  bottomSheet: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomSheetContent: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: R.metrics.smallMargin,
    paddingBottom: isIphoneX() ? R.metrics.doubleSection : R.metrics.doubleMargin
  },
  bottomSheetDetails: {
    justifyContent: 'center'
  },
  virtualCardViewWarning: {
    ...R.theme.title2,
    fontSize: 12,
    color: R.colors.error
  },
  item: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginVertical: R.metrics.baseMargin,
    borderBottomWidth: 0,
  },
  label: {
    ...R.fonts.AirbnbCerealAppMedium,
    fontSize: 10,
    lineHeight: 16,
    color: R.colors.subhead
  },
  text: {
    ...R.theme.body,
  }
});
