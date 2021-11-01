/* eslint-disable import/no-unresolved */
import { StyleSheet } from 'react-native';
import R from 'res/R';

export default StyleSheet.create({
  list: {
    paddingBottom: R.metrics.baseMargin,
  },
  listItem: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  ruleBody: {
    flex: 1,
    flexDirection: 'column',
  },
  ruleItem: {
    flex: 1,
    borderBottomWidth: 0,
    marginTop: R.metrics.baseMargin,
  },
  left: {
    flex: 1,
  },
  body: {
    flex: 0,
  },
  right: {
    flex: 1,
  },
  bodyText: {
    ...R.theme.body,
  },
  limitProgress: {
    marginTop: R.metrics.smallMargin,
  },
  editBtn: {
    alignSelf: 'flex-end',
    marginBottom: R.metrics.baseMargin,
    right: -15,
  },
  editText: {
    ...R.theme.caption1,
    ...R.fonts.AirbnbCerealAppMedium,
    color: R.colors.secondary,
  },
});
