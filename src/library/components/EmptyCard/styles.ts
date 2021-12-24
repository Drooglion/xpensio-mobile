import { StyleSheet } from 'react-native';
import R from 'res/R';

export default StyleSheet.create({
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgContainer: {
    flexGrow: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: R.metrics.doubleSection,
  },
  img: {
    height: 300,
    width: 200,
  },
  txtContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  //@ts-ignore
  txtTitle: {
    ...R.theme.headline,
    fontSize: 17,
    textAlign: 'center',
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
    alignSelf: 'center',
  },
  btnAction: {
    height: 35,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: R.metrics.doubleMargin,
  },
  btnText: {
    fontSize: 12,
  },
});
