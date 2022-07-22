import { Dimensions, StyleSheet } from 'react-native';
import R from 'res/R';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  modalBackground: {
    zIndex: 5000,
    position: 'absolute',
    left: width * -0.05,
    bottom: height * -0.03,
    backgroundColor: R.colors.white,
    width,
    height: height * 0.45,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 30 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
  },
});

export default styles;
