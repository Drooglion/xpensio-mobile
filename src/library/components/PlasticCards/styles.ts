import { StyleSheet, PixelRatio } from 'react-native';
import R from 'res/R';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: R.metrics.doubleMargin,
  },
  actionContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  txtDesc: {
    alignSelf: 'center',
    ...R.theme.subhead,
    fontSize: 12,
    textAlign: 'center',
    paddingVertical: PixelRatio.get() < 3 ? 0 : 10,
    lineHeight: 16,
  },
  btnGroup: {
    padding: R.metrics.section,
  },
  btn: {
    width: 150,
    height: 35,
    justifyContent: 'center',
    alignSelf: 'center',
    marginHorizontal: R.metrics.baseMargin,
  },
  btnOpenScanner: {
    width: undefined,
    justifyContent: 'center',
    alignSelf: 'center',
    marginHorizontal: R.metrics.baseMargin,
    marginVertical: R.metrics.smallMargin,
  },
  btnTxtAction: {
    fontSize: 12,
  },
  item: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginVertical: R.metrics.baseMargin,
    borderBottomWidth: 0,
  },
});
