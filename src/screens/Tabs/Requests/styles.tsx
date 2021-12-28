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
    color: R.colors.subhead,
    paddingLeft: 2,
    paddingRight: 2,
  },
  tabTextActive: {
    ...R.theme.body,
    fontStyle: 'normal',
    color: R.colors.primary,
  },
  tabContainer: {
    height: 0,
    borderColor: R.colors.transparent,
    borderBottomColor: R.colors.bottomTabBorderColor,
    elevation: 0,
    shadowColor: 0,
  },
  tabUnderline: {
    opacity: 0,
  },
  sectionContainer: {
    paddingHorizontal: R.metrics.doubleMargin,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  requestAmountContainer: {
    alignItems: 'flex-end',
  },
  requestContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  requestTitleContainer: {
    paddingLeft: 20,
  },
  iconContainer: {
    backgroundColor: 'orange',
    borderRadius: 100,
    padding: 9,
  },
  icon: {
    fontSize: 20,
    color: 'white',
  },
  txtAmount: {
    fontSize: 18,
  },
  txtStatus: {
    ...R.theme.subhead,
    fontSize: 9,
    lineHeight: 16,
    fontWeight: '500',
  },
  txtTitle: {
    fontSize: 18,
  },
  txtDescription: {
    ...R.theme.subhead,
    fontSize: 11,
    lineHeight: 16,
  },
  txtHeader: {
    color: R.colors.subhead,
    marginVertical: 15,
    backgroundColor: 'white',
    fontSize: 13,
  },
  commentDetails: {
    fontSize: 13,
    paddingBottom: 10,
    color: R.colors.subhead,
  },
  commentAuthor: {
    fontSize: 11,
    fontStyle: 'italic',
    color: R.colors.subhead,
    paddingBottom: 5,
  },
  commentContainer: {
    left: 58,
    borderLeftWidth: 3,
    borderColor: R.colors.grey,
    paddingLeft: 10,
    marginBottom: 25,
    width: '70%',
  },
  listContainer: {
    flexDirection: 'row',
    paddingHorizontal: R.metrics.doubleMargin,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 35,
  },
  searchInput: {
    color: 'black',
    backgroundColor: R.colors.searchBg,
    borderRadius: 3,
    fontSize: 16,
    padding: 15,
    paddingLeft: 40,
  },
  searchIcon: {
    color: 'gray',
    position: 'absolute',
    fontSize: 20,
    left: 10,
    top: 15,
  },
  searchContainer: {
    width: '90%',
    justifyContent: 'center',
    paddingBottom: 10,
  },
});
