/* eslint-disable import/no-unresolved */
import { StyleSheet, Dimensions } from 'react-native';
import R from 'res/R';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  imgContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  img: {
    width: width * 0.3,
    height: height * 0.25,
  },
  txtContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtTitle: {
    ...R.theme.headline,
    fontSize: 17,
    textAlign: 'center'
  },
  txtDesc: {
    ...R.theme.subhead,
    fontSize: 13,
    textAlign: 'center',
    paddingHorizontal: '20%',
    paddingVertical: 5,
    lineHeight: 18,
  },
  btnContainer: {
    flex: 2,
    alignSelf: 'center'
  },
  btnAction: {
    height: 45,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: R.metrics.doubleMargin,
  }
});
