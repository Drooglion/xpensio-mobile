import gql from 'graphql-tag';

const TITLES = gql`
  query TITLES {
    titles @rest(
      type: "Title",
      path: "api/v1/references/titles"
    ) {
      payload
    }
  }
`;

const NATIONALITIES = gql`
  query NATIONALITIES {
    nationalities @rest(
      type: "Nationality",
      path: "api/v1/references/nationalities"
    ) {
      payload
    }
  }
`;

const ID_TYPES = gql`
  query ID_TYPES {
    idTypes @rest(
      type: "IdType",
      path: "api/v1/references/id_types"
    ) {
      payload
    }
  }
`;

export default {
  TITLES,
  NATIONALITIES,
  ID_TYPES,
};
