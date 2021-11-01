import gql from 'graphql-tag';

const LOGIN_ACCOUNT = gql`
  mutation LOGIN_ACCOUNT {
    account(input: $input) @rest(
      type: "Account",
      path: "api/v1/account/login",
      method: "POST"
    ) {
      payload
    }
  }
`;

const LOGIN_VIA_GOOGLE = gql`
  mutation LOGIN_VIA_GOOGLE {
    account(input: $input) @rest(
      type: "Account",
      path: "api/v1/account/login/google",
      method: "POST"
    ) {
      payload
    }
  }
`;

const REQUEST_OTP_PASSWORD = gql`
  mutation REQUEST_OTP_PASSWORD {
    requestOtpPassword(input: $input) @rest(
      type: "Account",
      path: "api/v1/account/otp_password",
      method: "POST"
    ) {
      payload
    }
  }
`;


const MY_ACCOUNT = gql`
  query MY_ACCOUNT {
    account @rest(type: "Account", path: "api/v1/account/me/") {
      payload
    }
  }
`;

const FORGOT_PASSWORD = gql`
  mutation FORGOT_PASSWORD {
    forgotPassword(input: $input) @rest(
      type: "Account",
      path: "api/v1/account/forgot_password",
      method: "POST"
    ) {
      payload
    }
  }
`;

const GET_BALANCE = gql`
  query GET_BALANCE {
    balance(id: $id) @rest(
      type: "Account", 
      path: "api/v1/users/{args.id}/wallet_balance",
    ) {
      payload
    }
  }
`;

export default {
  LOGIN_ACCOUNT,
  LOGIN_VIA_GOOGLE,
  MY_ACCOUNT,
  REQUEST_OTP_PASSWORD,
  FORGOT_PASSWORD,
  GET_BALANCE,
};
