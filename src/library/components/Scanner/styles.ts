import { Dimensions, StyleSheet } from 'react-native';
import R from 'res/R';

const height = Dimensions.get('window').height;

export default StyleSheet.create({
  infoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtTitle: {
    ...R.theme.headline,
    fontSize: 17,
    paddingVertical: 5,
  },
  txtDesc: {
    ...R.theme.subhead,
    fontSize: 13,
    textAlign: 'center',
    paddingVertical: 5,
    lineHeight: 18,
  },
  qrCameraStyle: {
    height: height * 0.4,
  },
  qrContainerStyle: {
    paddingVertical: 40,
  },
});
