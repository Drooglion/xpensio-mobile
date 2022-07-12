import { StyleSheet } from 'react-native';
import R from 'res/R';

const styles = StyleSheet.create({
  container: {
    paddingTop: R.metrics.semiDoubleMargin,
    paddingHorizontal: R.metrics.doubleMargin,
  },
  btn: {
    marginHorizontal: R.metrics.smallMargin,
    borderColor: R.colors.subhead,
    height: 25,
  },
  txt: {
    ...R.theme.caption1,
    color: R.colors.subhead,
    lineHeight: 14,
    paddingLeft: 8,
    paddingRight: 5,
  },
  iconFilter: {
    fontSize: 16,
    color: R.colors.subhead,
    lineHeight: 12,
    marginRight: 8,
  },
  btnActive: {
    marginHorizontal: R.metrics.smallMargin,
    borderColor: R.colors.secondary,
    backgroundColor: R.colors.secondary,
    height: 25,
  },
  activeTxt: {
    ...R.theme.caption1,
    color: R.colors.white,
    lineHeight: 14,
    paddingLeft: 8,
    paddingRight: 8,
  },
  activeIconFilter: {
    color: R.colors.white,
  },
});

export default styles;
