/* eslint-disable import/no-unresolved */
import { StyleSheet } from 'react-native';
import R from 'res/R';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  eye: {
    color: R.colors.subhead,
    fontSize: 25,
  },
  eyeOff: {
    color: R.colors.grey,
    fontSize: 25,
  }
});

export default styles;
