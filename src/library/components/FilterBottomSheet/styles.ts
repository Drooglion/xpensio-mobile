import { StyleSheet } from 'react-native';
import R from 'res/R';

const styles = StyleSheet.create({
  container: {
    paddingVertical: R.metrics.baseMargin,
    paddingHorizontal: R.metrics.doubleMargin,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: R.colors.secondary,
  },
  title: {
    ...R.theme.headline,
    color: R.colors.white,
  },
  btnApply: {
    borderColor: R.colors.white,
    height: 35,
  },
  btnApplyText: {
    ...R.theme.body,
    ...R.fonts.AirbnbCerealAppMedium,
    fontSize: 14,
    color: R.colors.secondary,
  },
  content: {
    flex: 1,
    padding: R.metrics.doubleMargin,
  },
  label: {
    ...R.theme.subhead,
  },
});

export default styles;
