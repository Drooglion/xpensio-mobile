import { StyleSheet } from 'react-native';
import R from 'res/R';

export default StyleSheet.create({
  img: {
    width: 170,
    height: 170,
    marginVertical: 30,
  },
  txtTitle: {
    ...R.theme.headline,
    fontSize: 17,
    paddingVertical: 5,
  },
  txtDesc: {
    ...R.theme.subhead,
    fontSize: 13,
    textAlign: 'center',
    paddingHorizontal: '20%',
    paddingVertical: 5,
    lineHeight: 18,
  },
  btnAction: {
    ...R.sharedStyles.btnAction,
    width: '70%',
    marginVertical: 50,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
