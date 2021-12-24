import { StyleSheet } from 'react-native';
import R from 'res/R';

export default StyleSheet.create({
  header: {
    paddingLeft: R.metrics.doubleMargin,
    paddingRight: R.metrics.doubleMargin,
    backgroundColor: R.colors.white,
    marginBottom: 30,
  },
  body: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingTop: R.metrics.baseMargin,
  },
  right: {
    flex: undefined,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  left: {
    flex: 0.15,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  title: {
    ...R.theme.title1,
    textAlign: 'left',
    paddingLeft: 0,
  },
  //@ts-ignore
  subtitle: {
    ...R.theme.subhead,
    fontSize: 12,
    lineHeight: 16,
  },
  backTitle: {
    ...R.theme.title2,
    flex: 1,
    textAlign: 'left',
    paddingLeft: 0,
  },
  btnClose: {
    marginRight: R.metrics.smallMargin,
  },
  btnSearch: {
    color: R.colors.black,
    fontSize: 29,
  },
  highlightBack: {
    height: 40,
    width: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.7)',
  },
});
