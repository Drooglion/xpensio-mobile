/* eslint-disable import/no-unresolved */
import { StyleSheet } from 'react-native';
import metrics from './metrics';
import colors from './colors';
import theme from './theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingTop: metrics.doubleMargin,
    paddingHorizontal: metrics.doubleMargin,
  },
  btnClose: {
    marginRight: metrics.smallMargin,
  },
  iconClose: {
    color: colors.body,
    fontSize: 40,
  },
  title: {
    ...theme.title2,
    flex: 1,
    textAlign: 'left',
    marginBottom: metrics.section,
  },
  btnFooter: {
    height: 45,
    marginHorizontal: metrics.doubleMargin,
  },
  txtBtnFooter: {
    color: colors.white,
  },
  footerTab: {
    paddingBottom: metrics.section,
    backgroundColor: colors.white,
    paddingHorizontal: metrics.doubleMargin,
    height: metrics.footerHeight
  },
  footer: {
    borderColor: colors.transparent,
    backgroundColor: colors.transparent,
  },
  tabContainer: {
    height: 0,
    borderColor: colors.transparent,
    borderBottomColor: colors.bottomTabBorderColor,
    elevation: 0,
    shadowColor: 0,
  },
  tabUnderline: {
    opacity: 0,
  },
  btnAction: {
    width: '90%',
    justifyContent: 'center',
    alignSelf: 'center'
  }
});
