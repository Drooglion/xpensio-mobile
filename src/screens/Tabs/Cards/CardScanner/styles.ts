import { Dimensions, StyleSheet } from 'react-native';
import R from 'res/R';

const { height } = Dimensions.get('window');

export default StyleSheet.create({
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
  btnAction: {
    ...R.sharedStyles.btnAction,
  },
  infoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrCameraStyle: {
    height: height * 0.4,
  },
  qrContainerStyle: {
    paddingTop: 50,
    paddingBottom: 20,
  },
});
