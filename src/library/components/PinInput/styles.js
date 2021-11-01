/* eslint-disable import/no-unresolved */
import { StyleSheet, Dimensions } from 'react-native';
import R from 'res/R';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flexGrow: 1
  },
  pinInput: {
    flex: 6
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  numBtn: {
    width: width * 0.3,
    height: height * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numTxt: {
    ...R.fonts.AirbnbCerealAppMedium,
    fontSize: 22
  },
  pinCodeEntry: {
    flex: 4,
    paddingVertical: width * 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width * 0.15
  }
});
