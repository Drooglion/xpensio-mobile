/* eslint-disable import/no-unresolved */
import { StyleSheet, Dimensions } from 'react-native';
import R from 'res/R';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  avatarContainer: {
    bottom: 0,
    position: 'absolute',
  },
  messageContainer: {
    marginVertical: R.metrics.smallMargin,
  },
  messageInbound: {
    alignSelf: 'flex-start',
    backgroundColor: R.colors.grey,
    borderRadius: R.metrics.semiDoubleMargin,
    marginRight: width * 0.13,
  },
  messageOutbound: {
    alignSelf: 'flex-end',
    backgroundColor: R.colors.secondary,
    borderRadius: R.metrics.semiDoubleMargin,
    marginLeft: width * 0.20,
  },
  messageText: {
    ...R.fonts.AirbnbCerealAppBook,
    paddingHorizontal: R.metrics.semiDoubleMargin,
    paddingVertical: R.metrics.baseMargin,
    fontSize: R.metrics.semiDoubleMargin,
  },
  textOutbound: {
    color: R.colors.white,
    textAlign: 'right',
  },
  textInbound: {
    color: R.colors.black,
    textAlign: 'left',
  },
});

export default styles;
