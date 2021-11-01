import { StyleSheet } from 'react-native';
import R from 'res/R';

const styles = StyleSheet.create({
  modal: {
    backgroundColor: R.colors.white,
    justifyContent: 'center',
    borderRadius: 5,
    padding: 20,
  },
  title: {
    ...R.fonts.AirbnbCerealAppMedium,
    fontSize: 20,
  },
  subtitle: {
    ...R.theme.subhead,
    fontSize: 14,
    marginVertical: R.metrics.smallMargin
  },
  body: {
    marginVertical: R.metrics.doubleMargin,
  },
  btnGroup: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  noTxt: {
    color: R.colors.body2,
  },
  sliderMinMaxLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: R.metrics.baseMargin,
  },
  sliderMinMaxText: {
    ...R.theme.subhead
  },
  label: {
    paddingVertical: R.metrics.smallMargin,
    ...R.fonts.AirbnbCerealAppBook,
  },
  item: {
    paddingVertical: R.metrics.baseMargin
  }
});

export default styles;
