import gql from 'graphql-tag';

const MY_REQUESTS = gql`
  query MY_REQUESTS {
    myRequests (page: $page) @rest(
      type: "Request",
      path: "api/v1/requests/me/?page={args.page}"
    ) {
      payload
    }
  }
`;

const REQUEST = gql`
  query REQUEST {
    request (id: $id) @rest(
      type: "Request",
      path: "api/v1/requests/{args.id}"
    ) {
      payload
    }
  }
`;

const FILTER_MY_REQUESTS = gql`
  query FILTER_MY_REQUESTS {
    myRequests (
      page: $page,
      q: $q,
      category: $category,
      status: $status,
      start_date: $start_date,
      end_date: $end_date
    ) @rest(
      type: "Request",
      path: "api/v1/requests/me/search?page={args.page}&q={args.q}&category={args.category}&status={args.status}&start_date={args.start_date}&end_date={args.end_date}"
    ) {
      payload
    }
  }
`;

const TEAM_REQUESTS = gql`
  query TEAM_REQUESTS {
    teamRequests (page: $page) @rest(
      type: "Request",
      path: "api/v1/requests/?page={args.page}&q="
    ) {
      payload
    }
  }
`;

const FILTER_TEAM_REQUESTS = gql`
  query FILTER_MY_REQUESTS {
    teamRequests (
      page: $page,
      q: $q,
      category: $category,
      status: $status,
      start_date: $start_date,
      end_date: $end_date,
    ) @rest(
      type: "Request",
      path: "api/v1/requests/search?page={args.page}&q={args.q}&category={args.category}&status={args.status}&start_date={args.start_date}&end_date={args.end_date}"
    ) {
      payload
    }
  }
`;

const APPROVE_REQUEST = gql`
  mutation APPROVE_REQUEST {
    denyRequest (id: $id, input: $input) @rest(
      type: "Request",
      path: "api/v1/requests/{args.id}/approve",
      method: "PUT"
    ) {
      payload
    }
  }
`;

const DENY_REQUEST = gql`
  mutation DENY_REQUEST {
    denyRequest (id: $id, input: $input) @rest(
      type: "Request",
      path: "api/v1/requests/{args.id}/deny",
      method: "PUT"
    ) {
      payload
    }
  }
`;

export default {
  APPROVE_REQUEST,
  DENY_REQUEST,
  MY_REQUESTS,
  REQUEST,
  FILTER_MY_REQUESTS,
  FILTER_TEAM_REQUESTS,
  TEAM_REQUESTS,
};
