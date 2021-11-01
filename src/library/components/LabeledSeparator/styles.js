import { StyleSheet } from 'react-native';
// eslint-disable-next-line import/no-unresolved
import R from 'res/R';

export default StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: R.metrics.baseMargin,
  },
  separator: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: R.colors.divider,
  },
  label: {
    ...R.fonts.AirbnbCerealAppMedium,
    textTransform: 'lowercase',
    color: R.colors.divider,
    fontSize: 12,
    position: 'absolute',
    paddingVertical: R.metrics.smallMargin,
    paddingHorizontal: R.metrics.baseMargin,
    backgroundColor: R.colors.white,
  },
});
