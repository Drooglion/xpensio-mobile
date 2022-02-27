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
});
