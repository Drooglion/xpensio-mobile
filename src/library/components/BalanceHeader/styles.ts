import { Platform, StyleSheet } from 'react-native';
import { hasNotch } from 'react-native-device-info';
import R from 'res/R';

const isIos = Platform.OS === 'ios';

export default StyleSheet.create({
  header: {
    paddingLeft: R.metrics.doubleMargin,
    paddingRight: R.metrics.doubleMargin,
    backgroundColor: R.colors.white,
    marginTop: isIos ? (hasNotch() ? -25 : 0) : 0,
    marginBottom: 30,
  },
  body: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingTop: R.metrics.baseMargin,
  },
  title: {
    ...R.theme.title1,
    textAlign: 'left',
    paddingLeft: 0,
  },
  subtitle: {
    ...R.theme.subhead,
    fontSize: 12,
    lineHeight: 16,
  },
  backTitle: {
    ...R.theme.title2,
    flex: 1,
    textAlign: 'left',
    paddingLeft: 0,
  },
  left: {
    flex: 0,
  },
  right: {
    flex: 0,
  },
});
