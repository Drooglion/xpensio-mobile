import gql from 'graphql-tag';

const GET_CATEGORIES = gql`
  query GET_CATEGORIES {
    categories @rest(
      type: "Category",
      path: "api/v1/settings/categories"
    ) {
      payload
    }
  }
`;

export default {
  GET_CATEGORIES
};
