import gql from 'graphql-tag';

const companyConfiguration = gql`
  query companyConfiguration {
    companyConfiguration @client {
      id
      currency
      plan
      pricePerUser
      freePlan
      monthlySupport
      pricePerMonthlySupport
      invoiceContact
      invoiceCompany
      invoiceAddress
      companyId
    }
  }
`;

const role = gql`
  query role {
    role @client
  }
`;

const viewedCardNumber = gql`
  query viewedCardNumber {
    viewedCardNumber @client
  }
`;

const loadingModal = gql`
  query loadingModal {
    loadingModal @client
  }
`;

const dialogModal = gql`
  query dialogModal {
    dialogModal @client {
      description
      title
      icon
      visible
    }
  }
`;

const user = gql`
  query user {
    user @client {
      id
      firstName
      lastName
      email
      photoUrl
    }
  }
`;

const privilege = gql`
  query privilege {
    privilege @client {
      actAsAdmin
    }
  }
`;

export default {
  companyConfiguration,
  role,
  loadingModal,
  dialogModal,
  viewedCardNumber,
  user,
  privilege,
};
