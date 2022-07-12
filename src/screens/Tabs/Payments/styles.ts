import { StyleSheet } from 'react-native';
import R from 'res/R';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: R.metrics.doubleSection,
  },
  tabsContainer: {
    flexGrow: 1,
  },
  tabs: {
    height: 60,
    flexDirection: 'row',
    paddingHorizontal: R.metrics.doubleMargin,
  },
  tab: {
    height: 35,
    borderRadius: 0,
    borderBottomWidth: 2,
    borderBottomColor: R.colors.transparent,
    marginRight: R.metrics.baseMargin,
  },
  tabActive: {
    borderBottomColor: R.colors.primary,
  },
  tabText: {
    ...R.theme.body,
    ...R.fonts.AirbnbCerealAppLight,
    color: R.colors.subhead,
    paddingLeft: 2,
    paddingRight: 2,
  },
  tabTextActive: {
    ...R.theme.body,
    ...R.fonts.AirbnbCerealAppLight,
    fontStyle: 'normal',
    color: R.colors.primary,
  },
  tabContainer: {
    height: 0,
    borderColor: R.colors.transparent,
    borderBottomColor: R.colors.bottomTabBorderColor,
    elevation: 0,
    shadowColor: R.colors.transparent,
  },
  tabUnderline: {
    opacity: 0,
  },
  listLoader: {
    paddingBottom: R.metrics.smallMargin,
    paddingTop: R.metrics.doubleMargin,
  },
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
