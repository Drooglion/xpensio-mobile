import { Platform } from 'react-native';

const isAndroid = Platform.OS === 'android';
const fonts = {
  AirbnbCerealAppBlack: {
    fontFamily: isAndroid ? 'Airbnb Cereal App Black' : 'Airbnb Cereal App',
    fontWeight: isAndroid ? null : '900',
  },
  AirbnbCerealAppBold: {
    fontFamily: isAndroid ? 'Airbnb Cereal App Bold' : 'Airbnb Cereal App',
    fontWeight: isAndroid ? null : '700',
  },
  AirbnbCerealAppBook: {
    fontFamily: isAndroid ? 'Airbnb Cereal App Book' : 'Airbnb Cereal App',
    fontWeight: isAndroid ? null : '400',
  },
  AirbnbCerealAppExtraBold: {
    fontFamily: isAndroid ? 'Airbnb Cereal App Extra Bold' : 'Airbnb Cereal App',
    fontWeight: isAndroid ? null : '800',
  },
  AirbnbCerealAppLight: {
    fontFamily: isAndroid ? 'Airbnb Cereal App Light' : 'Airbnb Cereal App',
    fontWeight: isAndroid ? null : '300',
  },
  AirbnbCerealAppMedium: {
    fontFamily: isAndroid ? 'Airbnb Cereal App Medium' : 'Airbnb Cereal App',
    fontWeight: isAndroid ? null : '500',
  },
  AvenirBookOblique: {
    fontFamily: isAndroid ? 'Avenir Book Oblique' : 'Avenir-BookOblique',
    fontWeight: isAndroid ? null : '400',
  },
};

export default fonts;
