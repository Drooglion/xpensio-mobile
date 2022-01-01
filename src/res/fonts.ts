import { Platform } from 'react-native';

const isAndroid = Platform.OS === 'android';
const fonts = {
  AirbnbCerealAppBlack: {
    fontFamily: isAndroid ? 'Airbnb Cereal App Black' : 'Airbnb Cereal App',
    fontWeight: isAndroid ? undefined : '900',
  },
  AirbnbCerealAppBold: {
    fontFamily: isAndroid ? 'Airbnb Cereal App Bold' : 'Airbnb Cereal App',
    fontWeight: isAndroid ? undefined : '700',
  },
  AirbnbCerealAppBook: {
    fontFamily: isAndroid ? 'Airbnb Cereal App Book' : 'Airbnb Cereal App',
    fontWeight: isAndroid ? undefined : '400',
  },
  AirbnbCerealAppExtraBold: {
    fontFamily: isAndroid
      ? 'Airbnb Cereal App Extra Bold'
      : 'Airbnb Cereal App',
    fontWeight: isAndroid ? undefined : '800',
  },
  AirbnbCerealAppLight: {
    fontFamily: isAndroid ? 'Airbnb Cereal App Light' : 'Airbnb Cereal App',
    fontWeight: isAndroid ? undefined : '300',
  },
  AirbnbCerealAppMedium: {
    fontFamily: isAndroid ? 'Airbnb Cereal App Medium' : 'Airbnb Cereal App',
    fontWeight: isAndroid ? undefined : '500',
  },
  AvenirBookOblique: {
    fontFamily: isAndroid ? 'Avenir Book Oblique' : 'Avenir-BookOblique',
    fontWeight: isAndroid ? undefined : '400',
  },
};

export default fonts;
