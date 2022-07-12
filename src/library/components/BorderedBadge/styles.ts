import { StyleSheet } from 'react-native';
import R from 'res/R';

export default StyleSheet.create({
  badgeContainer: {
    justifyContent: 'center',
    paddingVertical: 2,
    paddingHorizontal: 10,
    backgroundColor: R.colors.error,
    borderWidth: 1,
    borderColor: R.colors.error,
    borderRadius: 15,
    marginTop: 3,
  },
  badgeText: {
    ...R.theme.body,
    ...R.fonts.AirbnbCerealAppMedium,
    color: R.colors.white,
    fontSize: 10,
  },
});
