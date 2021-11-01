/* eslint-disable import/no-unresolved */
import { StyleSheet } from 'react-native';
import R from 'res/R';

export default StyleSheet.create({
  cameraContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    alignItems: 'center',
  },
  camera: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: R.colors.body2,
  },
  header: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  headerLeft: {
    flex: 0,
    paddingLeft: R.metrics.baseMargin,
  },
  backArrow: {
    color: R.colors.white,
  },
  headerBody: {
    alignItems: 'flex-start',
    paddingLeft: R.metrics.baseMargin,
  },
  title: {
    ...R.theme.body,
    color: R.colors.white,
    fontSize: 20,
  },
  subtitle: {
    ...R.theme.caption2,
    color: R.colors.white,
  },
  headerRight: {
    flex: 0,
    paddingRight: R.metrics.baseMargin,
  },
  amount: {
    ...R.theme.body,
    color: R.colors.white,
    fontSize: 18,
  },
  footer: {
    height: 120,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: R.metrics.doubleMargin,
  },
  footerTab: {
    backgroundColor: R.colors.cameraFooterBg,
    alignItems: 'center',
    paddingTop: R.metrics.doubleMargin,
  },
  btnRetake: {
    alignSelf: 'flex-start',
    height: 70,
  },
  imgRetake: {
    height: 30,
    width: 30,
  },
  btnSnap: {
    alignSelf: 'flex-start',
    height: 70,
  },
  imgSnap: {
    height: 60,
    width: 60,
  },
  btnGallery: {
    alignSelf: 'flex-start',
    height: 70,
  },
  imgGallery: {
    height: 30,
    width: 30,
  },
  iconSavePhoto: {
    fontSize: 60,
    color: R.colors.white,
  },
});
