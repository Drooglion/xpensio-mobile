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
  body: {
    ...R.theme.body,
    color: R.colors.body2,
    paddingVertical: 20,
  },
  btnGroup: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  noTxt: {
    color: R.colors.body2,
  }

});

export default styles;
