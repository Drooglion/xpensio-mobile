/* eslint-disable import/no-unresolved */
import { StyleSheet } from 'react-native';
import R from 'res/R';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: R.metrics.baseMargin,
    marginBottom: R.metrics.smallMargin,
  },
  header: {
    height: 'auto',
    paddingTop: 0,
    paddingBottom: R.metrics.smallMargin,
  },
  title: {
    ...R.theme.caption2,
    ...R.fonts.AirbnbCerealAppMedium,
    color: R.colors.subhead,
    paddingLeft: 0,
  },
  expandIcon: {
    fontSize: 15,
    color: R.colors.subhead,
    paddingBottom: 2,
  },
  item: {
    marginLeft: R.metrics.baseMargin,
    marginRight: R.metrics.baseMargin,
    paddingTop: R.metrics.smallMargin,
    paddingBottom: R.metrics.smallMargin,
  },
  radio: {
    borderRadius: 10,
    paddingLeft: 4,
  },
  option: {
    ...R.theme.body,
    marginLeft: R.metrics.doubleMargin,
  },
});
