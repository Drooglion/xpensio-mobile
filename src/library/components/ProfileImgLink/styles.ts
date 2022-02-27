import { StyleSheet } from 'react-native';
import R from 'res/R';

export default StyleSheet.create({
  profileImg: {
    paddingTop: R.metrics.baseMargin,
    alignSelf: 'center',
  },
  imgContainer: {
    alignItems: 'center',
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: R.colors.subhead,
    shadowOffset: { height: 0, width: 0 },
  },
  img: {},
  imgBtnTxt: {
    ...R.fonts.AirbnbCerealAppMedium,
    color: R.colors.secondary,
    fontSize: 12,
  },
});
