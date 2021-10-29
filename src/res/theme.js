import colors from './colors';
import fonts from './fonts';

const theme = {
  large: {
    ...fonts.AirbnbCerealAppBook,
    color: colors.body,
    fontSize: 34,
    lineHeight: 41,
  },
  title1: {
    ...fonts.AirbnbCerealAppMedium,
    color: colors.black,
    fontSize: 32,
    lineHeight: 44,
  },
  title2: {
    ...fonts.AirbnbCerealAppMedium,
    color: colors.black,
    fontSize: 28,
    lineHeight: 36,
  },
  title3: {
    ...fonts.AirbnbCerealAppBook,
    color: colors.black,
    fontSize: 20,
    lineHeight: 25,
  },
  headline: {
    ...fonts.AirbnbCerealAppMedium,
    color: colors.black,
    fontSize: 17,
    lineHeight: 22,
  },
  body: {
    ...fonts.AirbnbCerealAppBook,
    color: colors.body,
    fontSize: 16,
    lineHeight: 21,
  },
  callout: {
    ...fonts.AirbnbCerealAppBook,
    color: colors.body,
    fontSize: 16,
    lineHeight: 21,
  },
  subhead: {
    ...fonts.AirbnbCerealAppBook,
    color: colors.subhead,
    fontSize: 15,
    lineHeight: 21,
  },
  footnote: {
    ...fonts.AirbnbCerealAppBook,
    color: colors.body2,
    fontSize: 13,
    lineHeight: 18,
  },
  caption1: {
    ...fonts.AirbnbCerealAppBook,
    color: colors.body2,
    fontSize: 12,
    lineHeight: 16,
  },
  caption2: {
    ...fonts.AirbnbCerealAppBook,
    color: colors.body2,
    fontSize: 12,
    lineHeight: 18,
  },
  tab: {
    ...fonts.AirbnbCerealAppLight,
    fontSize: 10,
    lineHeight: 16,
  },
};

export default theme;
