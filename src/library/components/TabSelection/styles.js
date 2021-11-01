/* eslint-disable import/no-unresolved */
import { StyleSheet } from 'react-native';
import R from 'res/R';

export default StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: R.metrics.doubleMargin,
  },
  tab: {
    height: 35,
    borderRadius: 0,
    borderBottomWidth: 2,
    borderBottomColor: R.colors.transparent,
    marginRight: R.metrics.baseMargin,
  },
  tabActive: {
    borderBottomColor: R.colors.primary,
  },
  tabText: {
    ...R.theme.body,
    color: R.colors.subhead,
    paddingLeft: 2,
    paddingRight: 2,
  },
  tabTextActive: {
    ...R.theme.body,
    ...R.fonts.AirbnbCerealAppMedium,
    color: R.colors.primary,
  }
});
