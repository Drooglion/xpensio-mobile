/* eslint-disable import/no-unresolved */
import { StyleSheet } from 'react-native';
import R from 'res/R';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 0,
    paddingTop: 0,
  },
  list: {
    paddingTop: R.metrics.baseMargin,
    paddingBottom: R.metrics.doubleSection,
  },
  listItem: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: R.metrics.doubleMargin,
    paddingRight: R.metrics.doubleMargin,
  },
  headerText: {
    ...R.theme.caption2,
    color: R.colors.subhead,
    paddingTop: 10,
  },
  itemLeft: {
    paddingTop: 10,
    alignSelf: 'flex-start',
  },
  itemBody: {
    justifyContent: 'center',
    paddingRight: R.metrics.section,
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingRight: undefined,
  },
  name: {
    ...R.theme.body,
  },
  originalAmount: {
    ...R.theme.body,
    ...R.fonts.AirbnbCerealAppLight,
  },
  amount: {
    ...R.theme.body,
  },
  time: {
    ...R.fonts.AirbnbCerealAppBook,
    fontSize: 11,
    lineHeight: 16,
    color: R.colors.subhead,
  },
  missing: {
    ...R.fonts.AvenirBookOblique,
    fontSize: 10,
    lineHeight: 16,
    color: R.colors.error,
    marginTop: R.metrics.baseMargin,
  },
  commentBox: {
    borderLeftWidth: 2,
    borderLeftColor: R.colors.divider,
    paddingLeft: R.metrics.baseMargin,
    marginTop: R.metrics.baseMargin,
  },
  comment: {
    ...R.fonts.AirbnbCerealAppBook,
    fontSize: 11,
    lineHeight: 13,
    color: R.colors.body2,
    marginBottom: R.metrics.baseMargin,
  },
  team: {
    ...R.fonts.AvenirBookOblique,
    fontSize: 8,
    lineHeight: 10,
    color: R.colors.subhead,
  },
});
