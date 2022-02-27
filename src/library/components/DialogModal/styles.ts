import { Dimensions, StyleSheet } from 'react-native';
import R from 'res/R';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContentCentered: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: R.colors.white,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: width * 0.8,
  },
  modalContent: {
    backgroundColor: R.colors.white,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: width * 0.8,
  },
  title: {
    ...R.fonts.AirbnbCerealAppMedium,
    marginVertical: R.metrics.baseMargin,
    fontSize: 20,
  },
  subtitle: {
    ...R.theme.subhead,
    fontSize: 14,
    marginVertical: R.metrics.smallMargin,
  },
  body: {
    marginVertical: R.metrics.smallMargin,
  },
  btnGroup: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  noTxt: {
    color: R.colors.body2,
  },
  img: {
    width: 120,
    height: 120,
    margin: R.metrics.baseMargin,
  },
  iconSuccess: {
    fontSize: 80,
    color: R.colors.success,
  },
  txtOk: {
    color: R.colors.primary,
  },
});

export default styles;
