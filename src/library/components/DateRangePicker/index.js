/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Text,
  View,
  StyleProvider,
} from 'native-base';
import { Calendar } from 'react-native-calendars';
import ReactNativeModal from 'react-native-modal';

import R from 'res/R';
import getTheme from 'native-base-theme/components';
import theme from 'native-base-theme/variables/theme';
import styles from './styles';

const XDate = require('xdate');

type Props = {
  initialRange: React.PropTypes.array.isRequired,
  onSuccess: React.PropTypes.func.isRequired,
  onCancel: React.PropTypes.func.isRequired,
};
export default class DateRangePicker extends Component<Props> {

  state = { isFromDatePicked: false, isToDatePicked: false, markedDates: {} };

  componentDidMount() { this.setupInitialRange(); }

  onDayPress = (day) => {
    const { isFromDatePicked, isToDatePicked, fromDate } = this.state;
    if (!isFromDatePicked || (isFromDatePicked && isToDatePicked)) {
      this.setupStartMarker(day);
    } else if (!isToDatePicked) {
      const markedDates = {...this.state.markedDates}
      const [mMarkedDates, range] = this.setupMarkedDates(fromDate, day.dateString, markedDates);
      if (range >= 0) {
        this.setState({ isFromDatePicked: true, isToDatePicked: true, markedDates: mMarkedDates });
        this.props.onSuccess(fromDate, day.dateString);
      } else {
        this.setupStartMarker(day);
      }
    }
  }

  setupStartMarker = (day) => {
    const { theme } = this.props;
    const markedDates = { [day.dateString]: { startingDay: true, color: theme.markColor, textColor: theme.markTextColor } };
    this.setState({
      isFromDatePicked: true,
      isToDatePicked: false,
      fromDate: day.dateString,
      markedDates
    });
  }

  setupMarkedDates = (fromDate, toDate, markedDates) => {
    const { theme } = this.props;
    const mFromDate = new XDate(fromDate);
    const mToDate = new XDate(toDate);
    const range = mFromDate.diffDays(mToDate);
    if (range >= 0) {
      if (range === 0) {
        markedDates = { [toDate]: { color: theme.markColor, textColor: theme.markTextColor } };
      } else {
        for (let i = 1; i <= range; i += 1) {
          const tempDate = mFromDate.addDays(1).toString('yyyy-MM-dd');
          if (i < range) {
            markedDates[tempDate] = { color: theme.markColor, textColor: theme.markTextColor };
          } else {
            markedDates[tempDate] = { endingDay: true, color: theme.markColor, textColor: theme.markTextColor };
          }
        }
      }
    }
    return [markedDates, range];
  }

  setupInitialRange = () => {
    const { initialRange, theme } = this.props;
    if (!initialRange) return;
    const [fromDate, toDate] = initialRange;
    const markedDates = { [fromDate]: { startingDay: true, color: theme.markColor, textColor: theme.markTextColor } };
    const [mMarkedDates, range] = this.setupMarkedDates(fromDate, toDate, markedDates);
    this.setState({
      markedDates: mMarkedDates,
      fromDate
    });
  }

  render() {
    const {
      isVisible,
      minDate,
      maxDate,
      onCancel,
    } = this.props;
    const { fromDate, markedDates } = this.state;
    return (
      <ReactNativeModal
        isVisible={isVisible}
      >
        <StyleProvider style={getTheme(theme)}>
          <View style={styles.container}>
            <Calendar
              {...this.props}
              minDate={minDate}
              maxDate={maxDate}
              markingType="period"
              current={fromDate}
              markedDates={markedDates}
              onDayPress={(day) => { this.onDayPress(day); }}
              theme={{
                arrowColor: R.colors.primary,
                monthTextColor: R.colors.body,
                textSectionTitleColor: R.colors.subhead,
                textDayFontFamily: R.fonts.AirbnbCerealAppBook.fontFamily,
                textMonthFontFamily: R.fonts.AirbnbCerealAppMedium.fontFamily,
                textDayHeaderFontFamily: R.fonts.AirbnbCerealAppBook.fontFamily,
                textMonthFontWeight: R.fonts.AirbnbCerealAppMedium.fontWeight,
                textMonthFontSize: 18,
              }}
              style={styles.calendar}
            />
            <Button
              full
              light
              onPress={onCancel}
              style={styles.btnClose}
            >
              <Text style={styles.txtClose}>{R.strings.cancel}</Text>
            </Button>
          </View>
        </StyleProvider>
      </ReactNativeModal>
    );
  }
}

DateRangePicker.propTypes = {
  isVisible: PropTypes.bool,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  theme: PropTypes.instanceOf(Object),
};

DateRangePicker.defaultProps = {
  isVisible: false,
  minDate: undefined,
  maxDate: undefined,
  theme: { markColor: '#00adf5', markTextColor: '#ffffff' }
};
