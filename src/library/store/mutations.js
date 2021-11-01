import gql from 'graphql-tag';

const updateCompanyConfiguration = gql`
  mutation updateCompanyConfiguration (
    $id: String,
    $currency: String,
    $plan: String,
    $pricePerUser: String,
    $freePlan: String,
    $monthlySupport: String,
    $pricePerMonthlySupport: String,
    $invoiceContact: String,
    $invoiceCompany: String,
    $invoiceAddress: String,
    $companyId: String
  ) {
    updateCompanyConfiguration (
      id: $id,
      currency: $currency,
      plan: $plan,
      pricePerUser: $pricePerUser,
      freePlan: $freePlan,
      monthlySupport: $monthlySupport,
      pricePerMonthlySupport: $pricePerMonthlySupport,
      invoiceContact: $invoiceContact,
      invoiceCompany: $invoiceCompany,
      invoiceAddress: $invoiceAddress,
      companyId: $companyId
    ) @client
  }
`;

const updateRole = gql`
  mutation updateRole (
    $role: Int,
  ) {
    updateRole (
      role: $role
    ) @client
  }
`;

const setViewedCardNumber = gql`
  mutation setViewedCardNumber (
    $viewedCardNumber: Int,
  ) {
    setViewedCardNumber (
      viewedCardNumber: $viewedCardNumber
    ) @client
  }
`;

const clearViewedCardNumber = gql`
  mutation {
    clearViewedCardNumber @client
  }
`;

const updateLoadingModal = gql`
  mutation updateLoadingModal (
    $loadingModal: Boolean
  ) {
    updateLoadingModal (
      loadingModal: $loadingModal
    ) @client
  }
`;

const closeDialogModal = gql`
  mutation {
    closeDialogModal @client
  }
`;

const showDialogModal = gql`
  mutation showDialogModal (
    $description: String,
    $title: String,
    $icon: String,
  ) {
    showDialogModal (
      description: $description,
      title: $title,
      icon: $icon,
    ) @client
  }
`;

const updateUser = gql`
  mutation updateUser (
    $id: String,
    $firstName: String,
    $lastName: String,
    $email: String,
    $photoUrl: String,
  ) {
    updateUser (
      id: $id,
      firstName: $firstName,
      lastName: $lastName,
      email: $email,
      photoUrl: $photoUrl,
    ) @client
  }
`;

const setPhotoUrl = gql`
  mutation setPhotoUrl (
    $photoUrl: String
  ) {
    setPhotoUrl (
      photoUrl: $photoUrl
    ) @client
  }
`;

const setPrivelege = gql`
  mutation setPrivelege (
    $actAsAdmin: Bool
  ) {
    setPrivelege (
      actAsAdmin: $actAsAdmin
    ) @client
  }
`;

export default {
  updateCompanyConfiguration,
  updateRole,
  updateLoadingModal,
  showDialogModal,
  closeDialogModal,
  setViewedCardNumber,
  clearViewedCardNumber,
  updateUser,
  setPhotoUrl,
  setPrivelege,
};
