import gql from 'graphql-tag';

const MY_PAYMENTS = gql`
  query MY_PAYMENTS {
    myPayments (page: $page) @rest(
      type: "Payment",
      path: "api/v1/payments/mine?page={args.page}&q="
    ) {
      payload
    }
  }
`;

const FILTER_MY_PAYMENTS = gql`
  query FILTER_MY_PAYMENTS {
    myPayments (
      page: $page,
      q: $q,
      category: $category,
      receipt: $receipt,
      date_from: $date_from,
      date_to: $date_to
    ) @rest(
      type: "Payment",
      path: "api/v1/payments/mine?page={args.page}&q={args.q}&category={args.category}&receipt={args.receipt}&date_from={args.date_from}&date_to={args.date_to}"
    ) {
      payload
    }
  }
`;

const MY_PAYMENT = gql`
  query MY_PAYMENT {
    myPayment (id: $id) @rest(
      type: "Payment",
      path: "api/v1/payments/{args.id}"
    ) {
      payload
    }
  }
`;

const TEAM_PAYMENTS = gql`
  query TEAM_PAYMENTS {
    teamPayments (page: $page, teamId: $teamId) @rest(
      type: "Payment",
      path: "api/v1/teams/{args.teamId}/payments?page={args.page}&q="
    ) {
      payload
    }
  }
`;

const FILTER_TEAM_PAYMENTS = gql`
  query FILTER_TEAM_PAYMENTS {
    teamPayments (
      page: $page,
      teamId: $teamId,
      q: $q,
      category: $category,
      receipt: $receipt,
      date_from: $date_from,
      date_to: $date_to
    ) @rest(
      type: "Payment",
      path: "api/v1/teams/{args.teamId}/payments?page={args.page}&q={args.q}&category={args.category}&receipt={args.receipt}&date_from={args.date_from}&date_to={args.date_to}"
    ) {
      payload
    }
  }
`;

const UPDATE_PAYMENT = gql`
  mutation UPDATE_PAYMENT {
    payments (input: $input, paymentId: $paymentId) @rest(
      type: "Payment",
      path: "api/v1/payments/{args.paymentId}",
      method: "PUT"
    ) {
      payload
      code
    }
  }
`;

const GET_SIGNED_URL_FOR_UPLOAD = gql`
  mutation GET_SIGNED_URL_FOR_UPLOAD {
    payments (input: $input, paymentId: $paymentId) @rest(
      type: "Payment",
      path: "api/v1/payments/{args.paymentId}/attachments/request_upload_url",
      method: "POST"
    ) {
      payload
      code
    }
  }
`;

const UPLOAD_ATTACHMENT = gql`
  mutation UPLOAD_ATTACHMENT {
    payments (input: $input, id: $id) @rest(
      type: "Payment",
      path: "api/v1/payments/{args.id}/attachments",
      method: "POST"
    ) {
      payload
      code
    }
  }
`;

const REJECT_PAYMENT = gql`
  mutation REJECT_PAYMENT {
    payments (id: $id, input: $input) @rest(
      type: "Payment",
      path: "api/v1/payments/{args.id}/disapprove",
      method: "PUT"
    ) {
      payload
    }
  }
`;

const DELETE_ATTACHMENT = gql`
  mutation DELETE_ATTACHMENT {
    deleteAttachment (
      paymentId: $paymentId,
      attachmentId: $attachmentId
    ) @rest(
      type: "Payment",
      path: "api/v1/payments/{args.paymentId}/attachments/{args.attachmentId}",
      method: "DELETE"
    ) {
      NoReponse
    }
  }
`;

export default {
  MY_PAYMENTS,
  MY_PAYMENT,
  FILTER_MY_PAYMENTS,
  TEAM_PAYMENTS,
  FILTER_TEAM_PAYMENTS,
  UPDATE_PAYMENT,
  GET_SIGNED_URL_FOR_UPLOAD,
  UPLOAD_ATTACHMENT,
  REJECT_PAYMENT,
  DELETE_ATTACHMENT,
};
