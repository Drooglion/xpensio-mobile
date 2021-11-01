/* eslint-disable import/no-unresolved */
import { StyleSheet, Dimensions } from 'react-native';
import R from 'res/R';

const { height } = Dimensions.get('window');

export default StyleSheet.create({
  infoContainer: {
    height: height * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 250,
    height: 250,
  },
  txtTitle: {
    ...R.theme.headline,
    color: R.colors.subhead,
    fontSize: 17,
    textAlign: 'center',
    paddingHorizontal: R.metrics.section,
  },
});
