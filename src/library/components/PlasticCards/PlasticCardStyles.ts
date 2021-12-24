import { StyleSheet, Dimensions, PixelRatio, Platform } from 'react-native';
import R from 'res/R';

const isAndroid = Platform.OS === 'android';
const { height } = Dimensions.get('window');

export default StyleSheet.create({
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'visible',
    paddingTop: R.metrics.section,
  },
  img: {
    height: 360,
    width: 240,
    overflow: 'visible',
  },
  cardDetails: {
    width: 240,
    position: 'absolute',
    paddingLeft: 25,
    paddingRight: 25,
    bottom: height * 0.15,
    overflow: 'hidden',
    // left: PixelRatio.get() < 3 ? width * 0.27 : width * 0.23,
  },
  cardNumber: {
    fontFamily: isAndroid ? 'monospace' : 'Courier',
    fontSize: 16,
    color: R.colors.black,
    textShadowColor: 'rgba(0, 0, 0, 0.27)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
    marginBottom: 10,
  },
  cardHolder: {
    paddingTop: 15,
    paddingBottom: 0,
  },
  cardName: {
    flexDirection: 'row',
  },
  cardTxtName: {
    ...R.fonts.AirbnbCerealAppMedium,
    // fontSize: PixelRatio.get() < 3 ? 15 : 18,
    fontSize: 18,
    color: R.colors.black,
    textShadowColor: 'rgba(0, 0, 0, 0.15)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
    flex: 1,
    flexWrap: 'wrap',
  },
  cardTxtCompany: {
    ...R.fonts.AirbnbCerealAppMedium,
    fontSize: PixelRatio.get() < 3 ? 8 : 12,
    paddingTop: 5,
  },
  //@ts-ignore
  cardTxtMute: {
    ...R.fonts.AirbnbCerealAppBook,
    color: R.colors.grey,
    // fontSize: PixelRatio.get() < 3 ? 8 : 12,
    fontSize: 10,
  },
  //@ts-ignore
  cardTxtExp: {
    ...R.fonts.AirbnbCerealAppMedium,
    // fontSize: PixelRatio.get() < 3 ? 15 : 18,
    fontSize: 18,
    color: R.colors.white,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
});
