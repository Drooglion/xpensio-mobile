import { StyleSheet } from 'react-native';
import R from 'res/R';

export default StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingTop: R.metrics.section,
    paddingBottom: R.metrics.doubleSection,
  },
  section: {
    paddingLeft: R.metrics.doubleMargin,
    paddingRight: R.metrics.doubleMargin,
  },
  sectionTitle: {
    ...R.theme.caption2,
    ...R.fonts.AirbnbCerealAppMedium,
    color: R.colors.subhead,
    marginBottom: R.metrics.smallMargin,
  },
  balance: {
    ...R.theme.title3,
    fontSize: 24,
  },
  item: {
    borderBottomWidth: 0,
  },
  left: {
    left: -2,
  },
  body: {
    flex: 0,
  },
  right: {
    right: -15,
  },
  disableText: {
    ...R.theme.caption1,
    ...R.fonts.AirbnbCerealAppMedium,
    color: R.colors.error,
  },
  horizontalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: R.metrics.smallMargin,
    right: -15,
  },
  approveText: {
    ...R.theme.caption1,
    ...R.fonts.AirbnbCerealAppMedium,
    color: R.colors.success,
  },
  denyText: {
    ...R.theme.caption1,
    ...R.fonts.AirbnbCerealAppMedium,
    color: R.colors.error,
  },
  ruleItem: {
    borderBottomWidth: 0,
    marginTop: R.metrics.baseMargin,
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
  issueCardBtn: {
    marginTop: R.metrics.baseMargin,
    width: 150,
    justifyContent: 'center',
  },
  issueCardText: {
    ...R.theme.body,
    ...R.fonts.AirbnbCerealAppMedium,
    color: R.colors.white,
  },
  addRuleBtn: {
    marginTop: R.metrics.baseMargin,
    width: 150,
    justifyContent: 'center',
  },
  addRuleText: {
    ...R.theme.body,
    ...R.fonts.AirbnbCerealAppMedium,
    color: R.colors.white,
  },
});
