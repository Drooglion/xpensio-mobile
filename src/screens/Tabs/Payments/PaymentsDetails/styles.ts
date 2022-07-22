import { StyleSheet, Dimensions } from 'react-native';
import R from 'res/R';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  cover: {
    height: 300,
    width,
    backgroundColor: R.colors.hint,
    position: 'absolute',
    left: 0,
    right: 0,
  },
  header: {
    height: 300,
  },
  headerLeft: {
    flex: 0,
    paddingLeft: R.metrics.baseMargin,
    alignSelf: 'flex-start',
  },
  backArrow: {
    color: R.colors.white,
  },
  content: {},
  paymentHeader: {
    marginTop: R.metrics.baseMargin,
    marginBottom: R.metrics.section,
    paddingHorizontal: R.metrics.doubleMargin,
    borderBottomColor: R.colors.transparent,
  },
  paymentHeaderLeft: {
    flex: 0,
    marginRight: 10,
  },
  paymentHeaderBody: {
    flex: 1,
    alignItems: 'flex-start',
  },
  paymentHeaderRight: {
    flex: 0,
    alignSelf: 'flex-start',
    marginLeft: R.metrics.doubleMargin,
  },
  merchantName: {
    ...R.theme.title2,
    fontSize: 20,
    lineHeight: 24,
  },
  transactionDate: {
    ...R.theme.caption1,
    color: R.colors.subhead,
  },
  amountTotal: {
    ...R.theme.title2,
    ...R.fonts.AirbnbCerealAppLight,
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'right',
  },
  segment: {
    width: width - R.metrics.doubleMargin * 2,
    alignSelf: 'center',
    marginHorizontal: R.metrics.doubleMargin,
  },
  segmentBtn: {
    flex: 1,
    justifyContent: 'center',
  },
  segmentText: {
    ...R.fonts.AirbnbCerealAppBook,
    fontSize: 13,
  },
  tabsContainer: {
    flexGrow: 1,
  },
  tabContainer: {
    height: 0,
    borderColor: R.colors.transparent,
    elevation: 0,
    shadowColor: R.colors.transparent,
  },
  tabUnderline: {
    opacity: 0,
  },
  tabContent: {
    flex: 1,
    paddingTop: 0,
    paddingHorizontal: R.metrics.doubleMargin,
    paddingBottom: R.metrics.doubleMargin,
    textAlign: 'left',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: R.colors.hint,
  },
  title: {
    flex: 1,
    ...R.theme.title2,
    fontSize: 24,
    paddingVertical: R.metrics.smallMargin,
  },
  subtitle: {
    ...R.theme.caption2,
    marginBottom: R.metrics.doubleMargin,
  },
  amount: {
    flex: 1,
    textAlign: 'right',
    ...R.theme.title2,
    fontSize: 24,
  },
  item: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 16,
    borderBottomWidth: 0,
  },
  label: {
    ...R.fonts.AirbnbCerealAppMedium,
    fontSize: 10,
    lineHeight: 16,
    color: R.colors.subhead,
    textTransform: 'uppercase',
  },
  text: {
    ...R.theme.body,
  },
  currency: {
    ...R.fonts.AirbnbCerealAppBook,
    color: '#b9b9b9',
    fontSize: 12,
    paddingTop: 2,
    paddingLeft: 5,
  },
  receiptItem: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderBottomWidth: 0,
  },
  receiptInput: {
    ...R.theme.body,
    paddingLeft: 0,
    borderBottomWidth: 1,
    borderBottomColor: R.colors.hint,
  },
  footer: {
    paddingHorizontal: R.metrics.doubleMargin,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnReject: {
    backgroundColor: R.colors.error,
  },
  btnText: {
    color: R.colors.white,
  },
  parallaxChild: {
    paddingTop: R.metrics.baseMargin,
    paddingBottom: R.metrics.doubleSection,
  },
  dropdownIcon: {
    position: 'absolute',
    fontSize: 20,
    color: R.colors.subhead,
    right: 0,
  },
  itemInput: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: R.colors.hint,
  },
  input: {
    ...R.theme.body,
    paddingLeft: 0,
    paddingRight: 0,
    height: 40,
    width: '100%',
  },
  placeholder: {
    ...R.theme.body,
    color: R.colors.hint,
  },
});
