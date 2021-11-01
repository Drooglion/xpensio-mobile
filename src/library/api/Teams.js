import gql from 'graphql-tag';

const TEAM_MEMBER = gql`
  query TEAM_MEMBER {
    teams (teamId: $teamId, memberId: $memberId) @rest(
      type: "Team",
      path: "api/v1/teams/{args.teamId}/members/{args.memberId}"
    ) {
      payload
    }
  }
`;

const TEAM_MEMBERS = gql`
  query TEAM_MEMBERS {
    teams (id: $id) @rest(
      type: "Team",
      path: "api/v1/teams/{args.id}/members"
    ) {
      payload
    }
  }
`;

const TEAM_LIST = gql`
  query TEAM_LIST {
    teams @rest(
      type: "Team",
      path: "api/v1/teams"
    ) {
      payload
    }
  }
`;

const TEAM_DROPDOWN = gql`
  query TEAM_DROPDOWN {
    teams @rest(
      type: "Team",
      path: "api/v1/teams/list"
    ) {
      payload
    }
  }
`;

export default {
  TEAM_DROPDOWN,
  TEAM_LIST,
  TEAM_MEMBERS,
  TEAM_MEMBER,
};
