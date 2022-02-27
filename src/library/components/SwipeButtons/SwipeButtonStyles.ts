import { StyleSheet } from 'react-native';
import R from 'res/R';

export default StyleSheet.create({
  swipeout: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 10,
  },
  swipeoutIcon: {
    alignSelf: 'center',
    fontSize: 24,
    color: R.colors.white,
  },
  swipeoutText: {
    ...R.fonts.AirbnbCerealAppMedium,
    fontSize: 9,
    color: R.colors.white,
  },
});
