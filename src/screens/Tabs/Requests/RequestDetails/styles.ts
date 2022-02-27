import { PixelRatio, StyleSheet } from 'react-native';
import R from 'res/R';

export default StyleSheet.create({
  detailsContainer: {
    paddingHorizontal: R.metrics.doubleMargin,
    paddingTop: 30,
  },
  group: {
    marginBottom: 20,
  },
  title: {
    ...R.theme.subhead,
    fontSize: 12,
    color: R.colors.titleDetails,
    fontWeight: '500',
  },
  category: {
    backgroundColor: 'transaparent',
    width: 100,
    borderRadius: 20,
    paddingHorizontal: 5,
    paddingVertical: 3,
    textAlign: 'center',
    borderWidth: 2,
    borderColor: R.colors.titleCategory,
    marginTop: 5,
  },
  textCategory: {
    textAlign: 'center',
    color: R.colors.titleCategory,
    fontSize: 13,
    fontWeight: '500',
  },
  btnGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: R.metrics.section,
    marginTop: 40,
  },
  btnTxtAction: {
    fontSize: 15,
  },
  btn: {
    width: 160,
    height: 45,
    justifyContent: 'center',
    alignSelf: 'center',
    marginHorizontal: R.metrics.baseMargin,
  },
  tabsContainer: {
    flexGrow: 1,
  },
  tabContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    elevation: 0,
    marginBottom: 10,
    borderBottomWidth: 0,
  },
  tabContent: {
    flex: 1,
    paddingHorizontal: R.metrics.section,
    paddingVertical: R.metrics.baseMargin,
  },
  descriptionItem: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginVertical: R.metrics.baseMargin,
    borderBottomWidth: 0,
  },
  descriptionLabel: {
    ...R.fonts.AirbnbCerealAppMedium,
    fontSize: 10,
    lineHeight: 16,
    color: R.colors.subhead,
  },
  descriptionText: {
    ...R.theme.body,
  },
  textStyle: {
    color: R.colors.white,
    fontSize: 17,
  },
  activeTextStyle: {
    color: R.colors.white,
    fontWeight: '600',
    fontSize: 17,
  },
  chatTab: {
    flex: 1,
    paddingHorizontal: R.metrics.baseMargin,
    paddingVertical: R.metrics.doubleMargin,
  },
  messages: {
    flex: 1,
  },
  messageInput: {
    flex: 1,
    borderBottomWidth: 0,
    paddingHorizontal: R.metrics.baseMargin,
  },
  icon: {
    fontSize: 20,
    color: 'white',
  },
  formButton: {
    flex: 0,
  },
  footer: {
    ...R.sharedStyles.footer,
  },
  footerTab: {
    ...R.sharedStyles.footerTab,
  },
  footerForm: {
    borderTopColor: R.colors.grey,
    borderTopWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 0,
  },
  btnAction: {
    height: PixelRatio.get() < 3 ? 38 : 45,
    marginHorizontal: R.metrics.smallMargin,
  },
});
