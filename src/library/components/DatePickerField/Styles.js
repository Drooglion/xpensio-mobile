import styled from 'styled-components/native';
import { Item, Label, Input, View, Text } from 'native-base';

export const Container = styled(View).attrs(props => ({
  ...props,
}))``;

export const Wrapper = styled(View).attrs(props => ({
  ...props,
}))`
  flex: 1;
  flex-direction: column;
  height: 50px;
`;

export const SecuredWrapper = styled(View).attrs(props => ({
  ...props,
}))`
  flex: 1;
  flex-direction: row;
  position: absolute;
  top: 5;
`;

export const StyledItem = styled(Item).attrs(props => ({
  ...props,
  regular: true,
}))`
  background-color: #232323;
  padding: 8px;
  border-radius: 12px;
`;

export const StyledLabel = styled(Label).attrs(props => ({
  ...props,
}))`
  color: #dbdbdb;
  padding-left: 8px;
  font-size: 12px;
`;

export const StyledInput = styled(Input).attrs(props => ({
  ...props,
}))`
  padding-left: 8px;
`;

export const ErrorText = styled(Text).attrs(props => ({
  ...props,
}))`
  font-size: 11px;
  color: #db4849;
  margin-left: 8px;
  margin-right: 8px;
  margin-top: 4px;
`;
