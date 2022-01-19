/* eslint-disable import/no-unresolved */
import { StyleSheet, Dimensions } from 'react-native';
import R from 'res/R';

const { height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: R.colors.primary,
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: height * 0.3,
  },
  tagline: {
    ...R.theme.headline,
    color: R.colors.white,
    marginTop: R.metrics.doubleMargin,
  },
});
