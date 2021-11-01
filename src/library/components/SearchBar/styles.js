import { StyleSheet } from 'react-native';
// eslint-disable-next-line import/no-unresolved
import R from 'res/R';

export default StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    paddingHorizontal: R.metrics.doubleMargin,
    paddingVertical: R.metrics.baseMargin,
  },
  searchBar: {
    flex: 1,
    marginLeft: 0,
    backgroundColor: R.colors.searchBg,
    borderBottomWidth: 0,
    borderBottomColor: R.colors.transparent,
    borderRadius: R.metrics.searchRadius,
    paddingHorizontal: R.metrics.baseMargin
  },
  searchIcon: {
    ...R.theme.body,
    color: R.colors.subhead,
    marginTop: 3,
  },
  searchInput: {
    ...R.theme.body,
    height: 40,
  },
  btnFilter: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: R.metrics.baseMargin,
  },
  iconFilter: {
    width: 25,
    height: 25,
  }
});
