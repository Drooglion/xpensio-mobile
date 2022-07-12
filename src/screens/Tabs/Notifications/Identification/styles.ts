import { StyleSheet, PixelRatio } from 'react-native';
import R from 'res/R';

export default StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingHorizontal: R.metrics.baseMargin,
    marginHorizontal: R.metrics.doubleMargin,
    paddingBottom: PixelRatio.get() < 3 ? 50 : 60,
  },
  form: {},
  item: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginVertical: R.metrics.smallMargin,
    borderBottomWidth: 0,
  },
  label: {
    ...R.fonts.AirbnbCerealAppMedium,
    marginTop: PixelRatio.get() < 3 ? 15 : 20,
    fontSize: 12,
    lineHeight: 16,
    color: R.colors.subhead,
  },
  text: {
    ...R.theme.body,
  },
  footerTab: {
    ...R.sharedStyles.footerTab,
  },
  footer: {
    ...R.sharedStyles.footer,
    backgroundColor: R.colors.transparent,
  },
  btnCancel: {
    height: 45,
    marginHorizontal: R.metrics.smallMargin,
    backgroundColor: R.colors.error,
    color: R.colors.white,
  },
  btnSave: {
    height: 45,
    marginHorizontal: R.metrics.smallMargin,
    backgroundColor: R.colors.primary,
    color: R.colors.white,
  },
  btnAction: {
    height: 45,
    marginHorizontal: R.metrics.smallMargin,
  },
  btnTxt: {
    ...R.theme.body,
    color: R.colors.white,
  },
  input: {
    ...R.fonts.AirbnbCerealAppBook,
    marginTop: PixelRatio.get() < 3 ? 10 : 16,
    fontSize: 14,
  },
  itemUpload: {
    borderBottomWidth: 0,
  },
  btnGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  uploadBtn: {
    flex: 0.49,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 170,
    marginVertical: R.metrics.baseMargin,
  },
  pickerLabel: {
    ...R.fonts.AirbnbCerealAppMedium,
    fontSize: 12,
    color: R.colors.subhead,
    marginTop: PixelRatio.get() < 3 ? 0 : 5,
  },
  picker: {
    ...R.fonts.AirbnbCerealAppBook,
    fontSize: 14,
    paddingLeft: 0,
    paddingRight: 0,
  },
  photoIdRemove: {
    position: 'absolute',
    left: 220,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemLeft: {
    alignItems: 'flex-start',
  },
});
