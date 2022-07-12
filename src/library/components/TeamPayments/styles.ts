import { StyleSheet } from 'react-native';
import R from 'res/R';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listLoader: {
    paddingBottom: R.metrics.smallMargin,
    paddingTop: R.metrics.doubleMargin,
  },
  list: {},
  option: {
    paddingTop: R.metrics.baseMargin,
    paddingBottom: R.metrics.baseMargin,
    paddingHorizontal: 16,
    marginLeft: 0,
  },
  optionText: {
    fontSize: 16,
    lineHeight: 24,
    color: R.colors.body2,
  },
  selectedOptionText: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    color: R.colors.secondary,
  },
  filterContentBtn: {
    borderColor: R.colors.secondary,
    height: 30,
  },
  selectedFilterContentBtn: {
    borderColor: R.colors.secondary,
    backgroundColor: R.colors.secondary,
    height: 30,
  },
  filterContentText: {
    fontSize: 12,
    lineHeight: 14,
    color: R.colors.secondary,
  },
  selectedFilterContentText: {
    fontSize: 12,
    lineHeight: 14,
    color: R.colors.white,
  },
  activeFilterContentBtn: {
    backgroundColor: R.colors.secondary,
    height: 30,
    marginTop: R.metrics.baseMargin,
    marginHorizontal: R.metrics.doubleMargin,
  },
  activeFilterContentText: {
    fontSize: 12,
    lineHeight: 14,
    color: R.colors.white,
  },
  iconFilter: {
    fontSize: 16,
    color: R.colors.white,
    lineHeight: 14,
  },
});

export default styles;
