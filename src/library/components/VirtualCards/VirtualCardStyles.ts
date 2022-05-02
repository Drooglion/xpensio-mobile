import { StyleSheet, Platform } from 'react-native';
import R from 'res/R';

const isAndroid = Platform.OS === 'android';
//const { height, width } = Dimensions.get('window');

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
    position: 'absolute',
    bottom: 40,
    width: 240,
    paddingLeft: 25,
    paddingRight: 25,
    overflow: 'hidden',
  },
  cardNumber: {
    fontFamily: isAndroid ? 'monospace' : 'Courier',
    fontSize: 16,
    color: R.colors.white,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
    marginBottom: 10,
  },
  cardHolder: {
    paddingTop: 20,
    paddingBottom: 0,
  },
  cardName: {
    flexDirection: 'row',
  },
  cardTxtName: {
    ...R.fonts.AirbnbCerealAppMedium,
    // fontSize: PixelRatio.get() < 3 ? 15 : 18,
    fontSize: 16,
    color: R.colors.white,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
    flex: 1,
    flexWrap: 'wrap',
  },
  cardTxtCompany: {
    ...R.fonts.AirbnbCerealAppMedium,
    fontSize: 10,
    marginBottom: 20,
    color: R.colors.white,
  },
  cardExp: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  cardTxtMute: {
    ...R.fonts.AirbnbCerealAppBook,
    color: R.colors.grey,
    // fontSize: PixelRatio.get() < 3 ? 8 : 12,
    fontSize: 10,
    marginRight: 4,
  },
  cardTxtExp: {
    ...R.fonts.AirbnbCerealAppMedium,
    // fontSize: PixelRatio.get() < 3 ? 15 : 18,
    fontSize: 16,
    color: R.colors.white,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
});
