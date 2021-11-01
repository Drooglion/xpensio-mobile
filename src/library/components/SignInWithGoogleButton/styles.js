import { StyleSheet } from 'react-native';
// eslint-disable-next-line import/no-unresolved
import R from 'res/R';

export default StyleSheet.create({
  btnGoogle: {
    backgroundColor: R.colors.googleRed,
    width: '100%',
    marginVertical: R.metrics.section,
    justifyContent: 'center',
  },
  textGoogle: {
    flexDirection: 'row',
    width: '90%',
    textAlign: 'center',
  },
});
