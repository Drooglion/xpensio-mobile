/* eslint-disable import/no-unresolved */
import { StyleSheet, Dimensions } from 'react-native';
import R from 'res/R';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  infoContainer: {
    height: height * 0.50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: width * 0.35,
    height: height * 0.25,
  },
  txtTitle: {
    ...R.theme.headline,
    fontSize: 17,
    textAlign: 'center'
  },
});
