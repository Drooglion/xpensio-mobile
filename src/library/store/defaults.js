const defaults = {
  viewedCardNumber: '',
  role: '',
  companyConfiguration: {
    __typename: 'CompanyConfiguration',
    id: '',
    currency: '',
    plan: '',
    pricePerUser: '',
    freePlan: '',
    monthlySupport: '',
    pricePerMonthlySupport: '',
    invoiceContact: '',
    invoiceCompany: '',
    invoiceAddress: '',
    companyId: ''
  },
  loadingModal: false,
  dialogModal: {
    __typename: 'DialogModal',
    description: '',
    title: '',
    icon: '',
    visible: false,
  },
  user: {
    __typename: 'User',
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    photoUrl: '',
  },
  privilege: {
    __typename: 'Privilege',
    actAsAdmin: false,
  }
};

export default defaults;
