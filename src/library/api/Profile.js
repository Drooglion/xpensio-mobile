import gql from 'graphql-tag';

const MY_PROFILE = gql`
  query MY_PROFILE {
    profile @rest(
      type: "Profile",
      path: "api/v1/profile"
    ) {
      payload
    }
  }
`;

/* const METRICS = gql`
  query METRICS {
    analytics @rest(type: "Analytics", path: "api/v1/dashboard/me") {
      payload @type(name: "Payload") {
        metrics @type(name: "Metrics") {
          expense
          activeCards
          receiptsMatched
          payments
        }
      }
    }
  }
`; */

const METRICS = gql`
  query METRICS {
    analytics(from: $from, to: $to) @rest(
      type: "Analytics",
      path: "api/v1/analytics/mine/metrics?dateFrom={args.from}&dateTo={args.to}"
    ) {
      payload,
      code
    }
  }
`;

const UPDATE_PROFILE = gql`
  mutation UPDATE_PROFILE {
    profile(input: $input) @rest(
      type: "Profile",
      path: "api/v1/profile",
      method: "PUT"
    ) {
      payload
      code
    }
  }
`;

const CHANGE_PASSWORD = gql`
  mutation CHANGE_PASSWORD {
    profile(input: $input) @rest(
      type: "Profile",
      path: "api/v1/profile/change_password",
      method: "POST"
    ) {
      payload
      code
    }
  }
`;

const GET_SIGNED_URL_FOR_UPLOAD = gql`
  mutation GET_SIGNED_URL_FOR_UPLOAD {
    profile (input: $input) @rest(
      type: "Profile",
      path: "api/v1/profile/upload_profile_photo/request_upload_url",
      method: "POST"
    ) {
      payload
      code
    }
  }
`;

const UPLOAD_PROFILE_IMG = gql`
  mutation UPLOAD_PROFILE_IMG {
    profile (input: $input) @rest(
      type: "Profile",
      path: "api/v1/profile/upload_profile_photo",
      method: "POST"
    ) {
      payload
      code
    }
  }
`;

const GET_SIGNED_URL_FOR_FRONT_ID = gql`
  mutation GET_SIGNED_URL_FOR_FRONT_ID {
    profile (input: $input) @rest(
      type: "Profile",
      path: "api/v1/profile/upload_id/front/request_upload_url",
      method: "POST"
    ) {
      payload
      code
    }
  }
`;

const GET_SIGNED_URL_FOR_BACK_ID = gql`
  mutation GET_SIGNED_URL_FOR_BACK_ID {
    profile (input: $input) @rest(
      type: "Profile",
      path: "api/v1/profile/upload_id/back/request_upload_url",
      method: "POST"
    ) {
      payload
      code
    }
  }
`;

const UPDATE_IDENTIFICATION = gql`
  mutation UPDATE_IDENTIFICATION {
    profile (input: $input) @rest(
      type: "Profile",
      path: "api/v1/profile/upload_id",
      method: "POST"
    ) {
      payload
      code
    }
  }
`;


export default {
  MY_PROFILE,
  METRICS,
  UPDATE_PROFILE,
  CHANGE_PASSWORD,
  GET_SIGNED_URL_FOR_UPLOAD,
  UPLOAD_PROFILE_IMG,
  GET_SIGNED_URL_FOR_FRONT_ID,
  GET_SIGNED_URL_FOR_BACK_ID,
  UPDATE_IDENTIFICATION,
};
