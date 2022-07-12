import { StyleSheet, Platform } from 'react-native';
import R from 'res/R';

const androidStyle = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  picker: {
    color: 'black',
    marginLeft: -15,
  },
  textStyle: {
    ...R.theme.body,
  },
});

const iosStyle = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  picker: {
    width: '100%',
    paddingLeft: 0,
  },
  pickerItem: {
    backgroundColor: 'red',
  },
  textStyle: {
    ...R.theme.body,
    paddingLeft: 0,
    marginLeft: 0,
  },
});

export default Platform.OS === 'ios' ? iosStyle : androidStyle;
