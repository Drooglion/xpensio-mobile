import { StyleSheet } from 'react-native';
import R from 'res/R';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
  },
  img: {
    backgroundColor: '#363A3E',
    width: undefined,
    zIndex: 0,
  },
  addReceipt: {
    backgroundColor: '#363A3E',
    width: undefined,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addReceiptTxt: {
    ...R.theme.body,
    color: R.colors.white,
  },
  cameraIcon: {
    fontSize: 60,
    color: R.colors.white,
    padding: R.metrics.smallMargin,
  },
  dotsContainer: {
    position: 'absolute',
    bottom: -10,
    alignSelf: 'center',
  },
  dotStyle: {
    height: 10,
    width: 10,
    borderRadius: 10,
  },
});

export default styles;
