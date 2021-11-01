/* eslint-disable import/no-unresolved */
import { StyleSheet, PixelRatio } from 'react-native';
import R from 'res/R';

export default StyleSheet.create({
  wrapper: {
    paddingVertical: R.metrics.baseMargin,
  },
  label: {
    ...R.fonts.AirbnbCerealAppMedium,
    fontSize: 12,
    color: R.colors.subhead,
    marginTop: PixelRatio.get() < 3 ? 15 : 20,
  },
});
