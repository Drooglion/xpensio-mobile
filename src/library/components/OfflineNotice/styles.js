/* eslint-disable import/no-unresolved */
import { Dimensions, StyleSheet } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';
import R from 'res/R';


const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: R.colors.error,
    flexDirection: 'row',
    height: height * (isIphoneX() ? 0.08 : 0.065),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    paddingTop: isIphoneX() ? 30 : 0,
    top: 0,
    width,
  },
  offlineText: {
    color: R.colors.white,
  }
});

export default styles;
