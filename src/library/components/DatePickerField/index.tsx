import React from 'react';
import DatePicker from 'react-native-datepicker';
import { StyleSheet } from 'react-native';
import {
  StyledLabel,
  StyledItem,
  Wrapper,
  SecuredWrapper,
  Container,
  ErrorText,
} from './Styles';
import _capitalize from 'lodash/capitalize';
import dayjs from 'dayjs';
import R from 'res/R';

const DatePickerField = (props: any) => {
  return (
    <Container>
      <DatePicker
        mode="date"
        placeholder="Select Date"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        showIcon={false}
        customStyles={customStyles}
        {...props}
        date={props.date ? dayjs(new Date(props.date)).toDate() : undefined}
      />
      {props.feedback && (
        <ErrorText>{_capitalize(props.feedback[0])}</ErrorText>
      )}
    </Container>
  );
};

const customStyles = StyleSheet.create({
  btnTextConfirm: {
    color: R.colors.primary,
  },
  dateText: {
    ...R.theme.body,
    position: 'absolute',
    left: 0,
    bottom: 4,
    width: R.metrics.windowWidth,
    color: 'black',
  },
  dateInput: {
    borderColor: 'transparent',
  },
  disabled: {
    backgroundColor: R.colors.transparent,
  },
  placeholderText: {
    ...R.theme.body,
    position: 'absolute',
    left: 8,
    bottom: 4,
    width: R.metrics.windowWidth,
  },
});

export default DatePickerField;
