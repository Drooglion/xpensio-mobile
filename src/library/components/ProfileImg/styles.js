/* eslint-disable import/no-unresolved */
import { StyleSheet } from 'react-native';
import R from 'res/R';

export default StyleSheet.create({
  profileImg: {
    alignSelf: 'center',
    position: 'relative',
    padding: R.metrics.baseMargin,
    backgroundColor: '#fff'
  },
  imgContainer: {
    alignItems: 'center',
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: R.colors.subhead,
    shadowOffset: { height: 0, width: 0 },
  },
  imgBtnTxt: {
    ...R.fonts.AirbnbCerealAppMedium,
    color: R.colors.secondary,
    fontSize: 12
  },
  img: {
    // borderWidth: 5,
    // borderColor: R.colors.white,
  },
  upload: {
    backgroundColor: R.colors.primary,
    position: 'absolute',
    height: 35,
    width: 35,
    bottom: -5,
    right: -5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  uploadIcon: {
    fontSize: 23,
    color: R.colors.white
  },
});
