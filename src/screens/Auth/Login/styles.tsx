import { StyleSheet, Dimensions } from 'react-native';
import R from '../../../res/R';

const { height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: R.metrics.doubleSection,
  },
  logo: {
    height: 130,
    width: '100%',
    marginTop: height * 0.13,
    marginBottom: R.metrics.doubleSection,
  },
  form: {
    marginHorizontal: R.metrics.doubleMargin,
    paddingHorizontal: R.metrics.doubleMargin,
    alignItems: 'center',
  },
  item: {
    marginLeft: 0,
    marginBottom: R.metrics.smallMargin,
  },
  signIn: {
    backgroundColor: R.colors.primary,
    width: '100%',
    justifyContent: 'center',
    marginVertical: R.metrics.section,
  },
  hr: {
    marginVertical: R.metrics.smallMargin,
  },
  or: {
    ...R.fonts.AirbnbCerealAppMedium,
    color: R.colors.divider,
    fontSize: 12,
  },
  input: {
    ...R.theme.body,
    fontSize: 16,
  },
  txtErrorLogin: {
    ...R.fonts.AirbnbCerealAppBook,
    fontSize: 14,
    color: R.colors.error,
    alignSelf: 'flex-start',
  },
});
