/* eslint-disable import/no-unresolved */
import { StyleSheet } from 'react-native';
import R from 'res/R';

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    zIndex: 20,
    top: 25,
    right: 20,
    backgroundColor: R.colors.transparent,
  },
  txtClose: {
    ...R.theme.body,
    color: R.colors.white,
  },
  btnDelete: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: R.colors.white,
  },
  txtDelete: {
    ...R.theme.body,
    color: R.colors.error,
  },
});

export default styles;
