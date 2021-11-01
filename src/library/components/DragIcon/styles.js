/* eslint-disable import/no-unresolved */
import { StyleSheet } from 'react-native';
import R from 'res/R';

const styles = StyleSheet.create({
  dragIcon: {
    alignSelf: 'center',
    width: 60,
    height: 8,
    borderRadius: 10,
    marginVertical: R.metrics.baseMargin,
    backgroundColor: R.colors.grey,
  },
});

export default styles;
