/* eslint-disable import/no-unresolved */
import { StyleSheet } from 'react-native';
import R from 'res/R';

export default StyleSheet.create({
  list: {
    paddingHorizontal: R.metrics.baseMargin,
    paddingBottom: R.metrics.section,
    paddingTop: R.metrics.baseMargin,
  },
  listItem: {
    borderBottomWidth: 0,
    justifyContent: 'space-between',
  },
  listTxt: {
    ...R.theme.body
  },
  listItemDivider: {
    paddingBottom: R.metrics.smallMargin,
    backgroundColor: R.colors.transparent,
  },
  listItemDividerTxt: {
    ...R.theme.caption1,
    ...R.fonts.AirbnbCerealAppMedium,
    color: R.colors.subhead,
  },
  listItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemRightTxt: {
    ...R.theme.subhead,
  },
  icon: {
    fontSize: 14,
    color: R.colors.subhead,
    paddingTop: 3,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
