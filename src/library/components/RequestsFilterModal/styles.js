/* eslint-disable import/no-unresolved */
import { StyleSheet } from 'react-native';
import R from 'res/R';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingTop: R.metrics.doubleMargin,
    paddingHorizontal: R.metrics.doubleMargin,
  },
  btnClose: {
    marginRight: R.metrics.smallMargin,
  },
  iconClose: {
    color: R.colors.body,
    fontSize: 40,
  },
  title: {
    ...R.theme.title2,
    flex: 1,
    textAlign: 'left',
    marginBottom: R.metrics.doubleMargin,
  },
  accordion: {
    borderColor: R.colors.transparent,
    paddingLeft: 0,
  },
  titleContainer: {
    flexDirection: 'row',
  },
  sectionTitle: {
    ...R.theme.caption2,
    ...R.fonts.AirbnbCerealAppMedium,
    color: R.colors.subhead,
    flex: 1,
  },
  itemIcon: {
    color: R.colors.subhead,
    fontSize: 18,
  },
  itemBody: {
    marginLeft: 0,
    paddingLeft: 0,
    alignItems: 'flex-start',
  },
  btnApply: {
    height: 45,
    marginHorizontal: R.metrics.doubleMargin,
  },
  txtApply: {
    color: R.colors.white,
  },
  footerTab: {
    paddingBottom: R.metrics.section,
    backgroundColor: R.colors.white
  },
  footer: {
    borderColor: R.colors.transparent,
    backgroundColor: R.colors.transparent,
  },
});
