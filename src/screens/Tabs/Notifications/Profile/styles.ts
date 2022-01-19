import { StyleSheet, PixelRatio } from 'react-native';
import R from 'res/R';

const horizontalPadding = {
  paddingHorizontal: R.metrics.baseMargin,
  marginHorizontal: R.metrics.doubleMargin
};

export default StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingBottom: PixelRatio.get() < 3 ? 20 : 40,
  },
  details: {
    ...horizontalPadding,
  },
  namePosition: {
    // paddingVertical: PixelRatio.get() < 3 ? 20 : 35,
    paddingTop: 16,
    paddingBottom: R.metrics.section,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    ...R.theme.title2,
    fontSize: 20,
    lineHeight: 24,
  },
  position: {
    ...R.theme.caption2,
    color: R.colors.subhead,
  },
  subDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subDetail: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  subDetailsTxt: {
    ...R.theme.body,
  },
  subDetailsSubTxt: {
    ...R.theme.subhead,
    fontSize: 12,
  },
  team: {
    ...horizontalPadding,
  },
  teamTitle: {
    ...R.theme.title2,
    fontSize: 22,
    marginVertical: R.metrics.smallMargin
  },
  teamTxt: {
    ...R.theme.body,
    color: R.colors.body2,
    marginVertical: R.metrics.smallMargin
  },
  actionBtns: {
    paddingHorizontal: R.metrics.baseMargin,
  },
  editProfileBtn: {
    ...horizontalPadding,
    marginBottom: R.metrics.doubleMargin,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  editProfileTxt: {
    fontSize: 12,
  },
});
