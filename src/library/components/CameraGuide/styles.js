/* eslint-disable import/no-unresolved */
import { StyleSheet, Dimensions } from 'react-native';
import R from 'res/R';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    height: height * 0.3,
    width: width * 0.6,
  },
  topGuides: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  topLeftGuide: {
    height: 30,
    width: 30,
    borderTopLeftRadius: 3,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: R.colors.white,
    shadowColor: R.colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  topRightGuide: {
    height: 30,
    width: 30,
    borderTopRightRadius: 3,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: R.colors.white,
    shadowColor: R.colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  bottomGuides: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  bottomLeftGuide: {
    height: 30,
    width: 30,
    borderBottomLeftRadius: 3,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderColor: R.colors.white,
    shadowColor: R.colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  bottomRightGuide: {
    height: 30,
    width: 30,
    borderBottomRightRadius: 3,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: R.colors.white,
    shadowColor: R.colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
});
