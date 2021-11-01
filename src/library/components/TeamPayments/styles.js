/* eslint-disable import/no-unresolved */
import { StyleSheet } from 'react-native';
import R from 'res/R';

const styles = StyleSheet.create({
  listLoader: {
    paddingBottom: R.metrics.smallMargin,
    paddingTop: R.metrics.doubleMargin,
  },
  filterContentBtn: {
    borderColor: R.colors.secondary,
    height: 30,
  },
  filterContentText: {
    fontSize: 12,
    lineHeight: 14,
    color: R.colors.secondary,
  },
  activeFilterContentBtn: {
    backgroundColor: R.colors.secondary,
    height: 30,
  },
  activeFilterContentText: {
    fontSize: 12,
    lineHeight: 14,
    color: R.colors.white,
  },
});

export default styles;
