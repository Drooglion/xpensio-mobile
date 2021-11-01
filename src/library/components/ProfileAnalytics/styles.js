/* eslint-disable import/no-unresolved */
import { StyleSheet } from 'react-native';
import R from 'res/R';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: R.colors.divider,
  },
  payments: {
    height: 70,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: R.colors.divider,
  },
  receipts: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    ...R.theme.title3,
    fontSize: 24,
    marginBottom: 3,
  },
  title: {
    ...R.theme.caption2,
    color: R.colors.subhead
  }
});

export default styles;
