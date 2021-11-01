import gql from 'graphql-tag';

const MY_CARDS = gql`
  query MY_CARDS {
    cards @rest(type: "Card", path: "api/v1/account/me/cards") {
      payload
    }
  }
`;

const LOCK_CARD = gql`
  mutation LOCK_CARD {
    lockCard(id: $id, input: $input) @rest(
      type: "Card",
      path: "api/v1/cards/{args.id}/lock",
      method: "PUT"
    ) {
      payload
      code
    }
  }
`;

const UNLOCK_CARD = gql`
  mutation UNLOCK_CARD {
    unlockCard(id: $id, input: $input) @rest(
      type: "Card",
      path: "api/v1/cards/{args.id}/unlock",
      method: "PUT"
    ) {
      payload
      code
    }
  }
`;

const SET_CARD_RULE = gql`
  mutation SET_CARD_RULE {
    setCardRule(
      memberId: $memberId,
      teamId: $teamId,
      input: $input
    ) @rest(
      type: "Card",
      path: "api/v1/teams/{args.teamId}/members/{args.memberId}/card_rules",
      method: "PUT"
    ) {
      payload
      code
    }
  }
`;

const REQUEST_CARD = gql`
  mutation REQUEST_CARD {
    requestCard(input: $input) @rest(
      type: "Card",
      path: "api/v1/cards/requests",
      method: "POST"
    ) {
      payload
    }
  }
`;

const GET_ACTIVATION_CODE = gql`
  mutation GET_ACTIVATION_CODE {
    getActivationCard(input: $input) @rest(
      type: "Card",
      path: "api/v1/cards/{args.input.id}/get_activation_code",
      method: "POST"
    ) {
      payload
    }
  }
`;

const ACTIVATE_PHYSICAL_CARD = gql`
  mutation ACTIVATE_PHYSICAL_CARD {
    activatePhysicalCard(id: $id, input: $input) @rest(
      type: "Card",
      path: "api/v1/cards/{args.id}/activate",
      method: "POST"
    ) {
      payload
    }
  }
`;

const GET_CARD_DETAILS = gql`
  mutation GET_CARD_DETAILS {
    getCardDetails(id: $id, input: $input) @rest(
      type: "Card",
      path: "api/v1/cards/{args.id}",
      method: "POST"
    ) {
      payload
    }
  }
`;


export default {
  MY_CARDS,
  LOCK_CARD,
  UNLOCK_CARD,
  SET_CARD_RULE,
  REQUEST_CARD,
  ACTIVATE_PHYSICAL_CARD,
  GET_ACTIVATION_CODE,
  GET_CARD_DETAILS,
};
