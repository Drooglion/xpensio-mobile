import gql from 'graphql-tag';

const MY_NOTIFICATIONS = gql`
  query MY_NOTIFICATIONS {
    notifications @rest(
      type: "Notification",
      path: "api/v1/account/notifications"
    ) {
      payload
    }
  }
`;

const READ_NOTIFICATION = gql`
  mutation READ_NOTIFICATION {
    readNotification(input: $input) @rest(
      type: "Notification",
      path: "api/v1/account/notifications/{args.input.key}/read",
      method: "POST"
    ) {
      payload
      code
    }
  }
`;

export default {
  MY_NOTIFICATIONS,
  READ_NOTIFICATION,
};
