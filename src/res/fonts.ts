import { Platform } from 'react-native';

const isAndroid = Platform.OS === 'android';
const fonts = {
  AirbnbCerealAppBlack: {
    fontFamily: isAndroid ? 'Airbnb Cereal App Black' : 'Airbnb Cereal App',
    fontWeight: isAndroid ? undefined : '900',
  } as const,
  AirbnbCerealAppBold: {
    fontFamily: isAndroid ? 'Airbnb Cereal App Bold' : 'Airbnb Cereal App',
    fontWeight: isAndroid ? undefined : '700',
  } as const,
  AirbnbCerealAppBook: {
    fontFamily: isAndroid ? 'Airbnb Cereal App Book' : 'Airbnb Cereal App',
    fontWeight: isAndroid ? undefined : '400',
  } as const,
  AirbnbCerealAppExtraBold: {
    fontFamily: isAndroid
      ? 'Airbnb Cereal App Extra Bold'
      : 'Airbnb Cereal App',
    fontWeight: isAndroid ? undefined : '800',
  } as const,
  AirbnbCerealAppLight: {
    fontFamily: isAndroid ? 'Airbnb Cereal App Light' : 'Airbnb Cereal App',
    fontWeight: isAndroid ? undefined : '300',
  } as const,
  AirbnbCerealAppMedium: {
    fontFamily: isAndroid ? 'Airbnb Cereal App Medium' : 'Airbnb Cereal App',
    fontWeight: isAndroid ? undefined : '500',
  } as const,
  AvenirBookOblique: {
    fontFamily: isAndroid ? 'Avenir Book Oblique' : 'Avenir-BookOblique',
    fontWeight: isAndroid ? undefined : '400',
  } as const,
};

export default fonts;
