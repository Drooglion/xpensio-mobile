import gql from 'graphql-tag';

const ADD_TOKEN = gql`
  mutation ADD_TOKEN {
    firebase(input: $input) @rest(
      type: "Firebase",
      path: "api/v1/account/firebase/messaging/add_token",
      method: "POST"
    ) {
      payload
    }
  }
`;

export default {
  ADD_TOKEN,
};
