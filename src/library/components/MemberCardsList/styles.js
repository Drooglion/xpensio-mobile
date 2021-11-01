/* eslint-disable import/no-unresolved */
import { StyleSheet } from 'react-native';
import R from 'res/R';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingBottom: R.metrics.baseMargin,
  },
  listItem: {
    paddingLeft: 0,
    paddingRight: 0,
    height: 50,
  },
  itemLeft: {
    flex: 1,
  },
  itemBody: {
    flex: 0
  },
  itemRight: {
    flex: 1,
    paddingRight: 0,
    right: -15,
  },
  virtualCard: {
    borderColor: R.colors.primary,
    backgroundColor: R.colors.primary,
    height: 32,
    width: 50,
    justifyContent: 'center',
  },
  virtualCardText: {
    ...R.theme.footnote,
    ...R.fonts.AirbnbCerealAppBold,
    color: R.colors.white,
    paddingLeft: 0,
    paddingRight: 0,
  },
  plasticCard: {
    backgroundColor: R.colors.white,
    borderColor: R.colors.primary,
    height: 32,
    width: 50,
    justifyContent: 'center',
  },
  plasticCardText: {
    ...R.theme.footnote,
    ...R.fonts.AirbnbCerealAppBold,
    color: R.colors.primary,
    paddingLeft: 0,
    paddingRight: 0,
  },
  disabledCard: {
    backgroundColor: R.colors.inactive,
    borderColor: R.colors.inactive,
  },
  disabledText: {
    color: R.colors.body2,
  },
  disableText: {
    ...R.theme.caption1,
    ...R.fonts.AirbnbCerealAppMedium,
    color: R.colors.error,
  },
  enableText: {
    ...R.theme.caption1,
    ...R.fonts.AirbnbCerealAppMedium,
    color: R.colors.secondary,
  },
});
