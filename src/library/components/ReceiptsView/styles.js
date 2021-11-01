/* eslint-disable import/no-unresolved */
import { StyleSheet } from 'react-native';
import R from 'res/R';

const styles = StyleSheet.create({
  btnDelete: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: R.colors.white,
  },
  txtDelete: {
    ...R.theme.body,
    color: R.colors.error,
  },
});

export default styles;
