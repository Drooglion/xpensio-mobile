import { StyleSheet } from 'react-native';
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const metrics = {
  windowHeight,
  windowWidth,
  section: 25,
  baseMargin: 10,
  semiDoubleMargin: 15,
  doubleMargin: 20,
  smallMargin: 5,
  doubleSection: 50,
  whitespace: 100,
  horizontalLineHeight: StyleSheet.hairlineWidth,
  cardRadius: 6,
  buttonRadius: 4,
  searchRadius: 4,
  avatar: 36,
  avatarChat: 12,
  footerHeight: 70,
};

export default metrics;
