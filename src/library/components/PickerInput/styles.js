/* eslint-disable import/no-unresolved */
import { StyleSheet, Platform } from 'react-native';
import R from 'res/R';

const androidStyle = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
  },
});

const iosStyle = StyleSheet.create({
  wrapper: {
    alignSelf: 'flex-start',
  },
  textStyle: {
    ...R.theme.body,
    paddingLeft: R.metrics.smallMargin,
    marginLeft: 0,
  },
});

export default Platform.OS === 'ios' ? iosStyle : androidStyle;
