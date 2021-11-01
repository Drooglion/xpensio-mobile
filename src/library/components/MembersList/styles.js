/* eslint-disable import/no-unresolved */
import { StyleSheet } from 'react-native';
import R from 'res/R';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingTop: 0,
    paddingBottom: R.metrics.doubleMargin,
  },
  listItem: {
    paddingLeft: R.metrics.doubleMargin,
    paddingRight: R.metrics.doubleMargin,
    paddingTop: R.metrics.smallMargin,
    paddingBottom: R.metrics.smallMargin,
  },
  sectionText: {
    ...R.theme.caption2,
    ...R.fonts.AirbnbCerealAppMedium,
    color: R.colors.subhead,
    paddingLeft: R.metrics.doubleMargin,
    paddingRight: R.metrics.doubleMargin,
    marginTop: R.metrics.section,
  },
  itemLeft: {
    paddingTop: R.metrics.baseMargin,
  },
  itemBody: {
    justifyContent: 'center',
    paddingRight: R.metrics.section,
  },
  itemRight: {
    justifyContent: 'center',
    paddingRight: 0,
  },
  name: {
    ...R.theme.body,
    fontSize: 17,
  },
  badge: {
    width: 25,
    height: 25,
    backgroundColor: R.colors.pending,
  },
  badgeCount: {
    ...R.theme.caption1,
    ...R.fonts.AirbnbCerealAppMedium,
    color: R.colors.white,
  },
  email: {
    ...R.theme.caption1,
    color: R.colors.subhead,
  },
});
