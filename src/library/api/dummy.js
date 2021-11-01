const myPayments = [
  {
    isSection: true,
    image: 'https://pngimg.com/uploads/uber/uber_PNG27.png',
    title: 'Uber',
    description: '5:20 PM',
    total: {
      amount: 228,
      currency: 'PHP',
    },
    hasReceipt: true,
    comment: null,
    createdAt: '2019-01-26T17:20:26.441Z',
  },
  {
    isSection: false,
    image: 'https://pngimg.com/uploads/uber/uber_PNG27.png',
    title: 'Uber',
    description: '5:20 PM',
    total: {
      amount: 228,
      currency: 'PHP',
    },
    hasReceipt: true,
    comment: null,
    createdAt: '2019-01-26T17:20:26.441Z',
  },
  {
    isSection: false,
    image: 'https://diylogodesigns.com/wp-content/uploads/2018/09/Starbucks_Coffee_Logo.png-768x768.png',
    title: 'Starbucks',
    description: '8:00 AM',
    total: {
      amount: 385,
      currency: 'PHP',
    },
    hasReceipt: false,
    comment: {
      description: 'Coffee with client',
      author: 'Product Team',
    },
    createdAt: '2019-01-26T08:00:26.441Z',
  },
  {
    isSection: true,
    image: null,
    title: 'Shakey\'s',
    description: '7:14 PM',
    total: {
      amount: 1200,
      currency: 'PHP',
    },
    hasReceipt: false,
    comment: null,
    createdAt: '2019-01-25T19:14:26.441Z',
  },
  {
    isSection: false,
    image: null,
    title: 'Shakey\'s',
    description: '7:14 PM',
    total: {
      amount: 1200,
      currency: 'PHP',
    },
    hasReceipt: false,
    comment: null,
    createdAt: '2019-01-25T19:14:26.441Z',
  },
];

const teamPayments = [
  {
    isSection: true,
    image: 'https://pbs.twimg.com/profile_images/745504113257943040/c9o1B6LW.jpg',
    title: 'Uber',
    description: 'Dominick Danao',
    total: {
      amount: 228,
      currency: 'PHP',
    },
    hasReceipt: false,
    comment: null,
    createdAt: '2019-01-26T17:20:26.441Z',
  },
  {
    isSection: false,
    image: 'https://pbs.twimg.com/profile_images/745504113257943040/c9o1B6LW.jpg',
    title: 'Uber',
    description: 'Dominick Danao',
    total: {
      amount: 228,
      currency: 'PHP',
    },
    hasReceipt: false,
    comment: null,
    createdAt: '2019-01-26T17:20:26.441Z',
  },
  {
    isSection: false,
    image: 'https://media.licdn.com/dms/image/C5103AQG_YGVnHRo2yA/profile-displayphoto-shrink_200_200/0?e=1551312000&v=beta&t=UU019rmiLjwrWtGmeZIr9_Da8PZ2U85W8B09y50W3fM',
    title: 'Starbucks',
    description: 'Jerick Coneras',
    total: {
      amount: 385,
      currency: 'PHP',
    },
    hasReceipt: true,
    comment: {
      description: 'Coffee with client',
      author: 'Product Team',
    },
    createdAt: '2019-01-26T08:00:26.441Z',
  },
  {
    isSection: true,
    image: null,
    title: 'Shakey\'s',
    description: 'Mitch Belen',
    total: {
      amount: 1202,
      currency: 'PHP',
    },
    hasReceipt: false,
    comment: null,
    createdAt: '2019-01-25T19:14:26.441Z',
  },
  {
    isSection: false,
    image: null,
    title: 'Shakey\'s',
    description: 'Mitch Belen',
    total: {
      amount: 1202,
      currency: 'PHP',
    },
    hasReceipt: false,
    comment: null,
    createdAt: '2019-01-25T19:14:26.441Z',
  },
  {
    isSection: false,
    image: 'https://pbs.twimg.com/profile_images/511760717330919425/Tqe0ORv7_400x400.jpeg',
    title: 'TGI Fridays',
    description: 'Jon Danao',
    total: {
      amount: 2035,
      currency: 'PHP',
    },
    hasReceipt: true,
    comment: null,
    createdAt: '2019-01-25T19:14:26.441Z',
  },
  {
    isSection: false,
    image: 'https://pbs.twimg.com/profile_images/745504113257943040/c9o1B6LW.jpg',
    title: 'Airbnb.com',
    description: 'Dominick Danao',
    total: {
      amount: 3800,
      currency: 'PHP',
    },
    hasReceipt: true,
    comment: null,
    createdAt: '2019-01-25T17:20:26.441Z',
  },
  {
    isSection: true,
    image: 'https://media.licdn.com/dms/image/C5103AQG_YGVnHRo2yA/profile-displayphoto-shrink_200_200/0?e=1551312000&v=beta&t=UU019rmiLjwrWtGmeZIr9_Da8PZ2U85W8B09y50W3fM',
    title: 'Starbucks',
    description: 'Jerick Coneras',
    total: {
      amount: 385,
      currency: 'PHP',
    },
    hasReceipt: true,
    comment: {
      description: 'Coffee with client',
      author: 'Product Team',
    },
    createdAt: '2019-01-24T08:00:26.441Z',
  },
  {
    isSection: false,
    image: 'https://media.licdn.com/dms/image/C5103AQG_YGVnHRo2yA/profile-displayphoto-shrink_200_200/0?e=1551312000&v=beta&t=UU019rmiLjwrWtGmeZIr9_Da8PZ2U85W8B09y50W3fM',
    title: 'Grab',
    description: 'Jerick Coneras',
    total: {
      amount: 420,
      currency: 'PHP',
    },
    hasReceipt: false,
    comment: null,
    createdAt: '2019-01-24T08:00:26.441Z',
  },
  {
    isSection: false,
    image: 'https://media.licdn.com/dms/image/C5103AQG_YGVnHRo2yA/profile-displayphoto-shrink_200_200/0?e=1551312000&v=beta&t=UU019rmiLjwrWtGmeZIr9_Da8PZ2U85W8B09y50W3fM',
    title: 'Starbucks',
    description: 'Jerick Coneras',
    total: {
      amount: 500,
      currency: 'PHP',
    },
    hasReceipt: true,
    comment: null,
    createdAt: '2019-01-24T08:00:26.441Z',
  },
  {
    isSection: false,
    image: 'https://pbs.twimg.com/profile_images/745504113257943040/c9o1B6LW.jpg',
    title: 'Amazon Web Services',
    description: 'Dominick Danao',
    total: {
      amount: 5000,
      currency: 'PHP',
    },
    hasReceipt: true,
    comment: null,
    createdAt: '2019-01-24T17:20:26.441Z',
  },
];

const myRequests = [
  {
    isSection: true,
    image: 'https://pngimg.com/uploads/uber/uber_PNG27.png',
    title: 'Uber',
    description: 'New campaign for XPENSIO - Expense Management on Facebook',
    total: {
      amount: 228,
      currency: 'PHP',
    },
    hasReceipt: true,
    comment: null,
    createdAt: '2019-01-26T17:20:26.441Z',
    status: 0,
    team: {
      id: '08d3ad5a-8287-4272-b23b-5ead3cbd79c1',
      name: 'Executives'
    },
    category: {
      name: 'Grocery'
    },
    project: {
      name: 'Gorgeous Fresh Bike'
    },
    typeOfExpense: 1,
  },
  {
    isSection: false,
    image: 'https://pngimg.com/uploads/uber/uber_PNG27.png',
    title: 'Uber',
    description: '5:20 PM',
    total: {
      amount: 228,
      currency: 'PHP',
    },
    hasReceipt: true,
    comment: null,
    createdAt: '2019-01-26T17:20:26.441Z',
    status: 1,
    team: {
      id: '08d3ad5a-8287-4272-b23b-5ead3cbd79c1',
      name: 'Executives'
    },
    category: {
      name: 'Grocery'
    },
    project: {
      name: 'Gorgeous Fresh Bike'
    },
    typeOfExpense: 1,
  },
  {
    isSection: false,
    image: 'https://diylogodesigns.com/wp-content/uploads/2018/09/Starbucks_Coffee_Logo.png-768x768.png',
    title: 'Starbucks',
    description: '8:00 AM',
    total: {
      amount: 385,
      currency: 'PHP',
    },
    hasReceipt: false,
    comment: {
      description: 'Coffee with client',
      author: 'Product Team',
    },
    createdAt: '2019-01-26T08:00:26.441Z',
    status: 2,
    team: {
      id: '08d3ad5a-8287-4272-b23b-5ead3cbd79c1',
      name: 'Executives'
    },
    category: {
      name: 'Grocery'
    },
    project: {
      name: 'Gorgeous Fresh Bike'
    },
    typeOfExpense: 0,
  },
  {
    isSection: true,
    image: null,
    title: 'Shakey\'s',
    description: '7:14 PM',
    total: {
      amount: 1200,
      currency: 'PHP',
    },
    hasReceipt: false,
    comment: null,
    createdAt: '2019-01-25T19:14:26.441Z',
    status: 1,
    team: {
      id: '08d3ad5a-8287-4272-b23b-5ead3cbd79c1',
      name: 'Executives'
    },
    category: {
      name: 'Grocery'
    },
    project: {
      name: 'Gorgeous Fresh Bike'
    },
    typeOfExpense: 1,
  },
  {
    isSection: false,
    image: null,
    title: 'Shakey\'s',
    description: '7:14 PM',
    total: {
      amount: 1200,
      currency: 'PHP',
    },
    hasReceipt: false,
    comment: null,
    createdAt: '2019-01-25T19:14:26.441Z',
    status: 0,
    team: {
      id: '08d3ad5a-8287-4272-b23b-5ead3cbd79c1',
      name: 'Executives'
    },
    category: {
      name: 'Grocery'
    },
    project: {
      name: 'Gorgeous Fresh Bike'
    },
    typeOfExpense: 0,
  },
];

const teamRequests = [
  {
    isSection: true,
    image: 'https://pbs.twimg.com/profile_images/745504113257943040/c9o1B6LW.jpg',
    title: 'Uber',
    description: 'Dominick Danao',
    total: {
      amount: 228,
      currency: 'PHP',
    },
    hasReceipt: false,
    comment: null,
    createdAt: '2019-01-26T17:20:26.441Z',
    status: 0,
    team: {
      id: '08d3ad5a-8287-4272-b23b-5ead3cbd79c1',
      name: 'Executives'
    },
    category: {
      name: 'Grocery'
    },
    project: {
      name: 'Gorgeous Fresh Bike'
    },
    typeOfExpense: 0,
  },
  {
    isSection: false,
    image: 'https://pbs.twimg.com/profile_images/745504113257943040/c9o1B6LW.jpg',
    title: 'Uber',
    description: 'Dominick Danao',
    total: {
      amount: 228,
      currency: 'PHP',
    },
    hasReceipt: false,
    comment: null,
    createdAt: '2019-01-26T17:20:26.441Z',
    status: 0,
    team: {
      id: '08d3ad5a-8287-4272-b23b-5ead3cbd79c1',
      name: 'Executives'
    },
    category: {
      name: 'Grocery'
    },
    project: {
      name: 'Gorgeous Fresh Bike'
    },
    typeOfExpense: 0,
  },
  {
    isSection: false,
    image: 'https://media.licdn.com/dms/image/C5103AQG_YGVnHRo2yA/profile-displayphoto-shrink_200_200/0?e=1551312000&v=beta&t=UU019rmiLjwrWtGmeZIr9_Da8PZ2U85W8B09y50W3fM',
    title: 'Starbucks',
    description: 'Jerick Coneras',
    total: {
      amount: 385,
      currency: 'PHP',
    },
    hasReceipt: true,
    comment: {
      description: 'Coffee with client',
      author: 'Product Team',
    },
    createdAt: '2019-01-26T08:00:26.441Z',
    status: 0,
    team: {
      id: '08d3ad5a-8287-4272-b23b-5ead3cbd79c1',
      name: 'Executives'
    },
    category: {
      name: 'Grocery'
    },
    project: {
      name: 'Gorgeous Fresh Bike'
    },
    typeOfExpense: 1,
  },
  {
    isSection: true,
    image: null,
    title: 'Shakey\'s',
    description: 'Mitch Belen',
    total: {
      amount: 1202,
      currency: 'PHP',
    },
    hasReceipt: false,
    comment: null,
    createdAt: '2019-01-25T19:14:26.441Z',
    status: 1,
    team: {
      id: '08d3ad5a-8287-4272-b23b-5ead3cbd79c1',
      name: 'Executives'
    },
    category: {
      name: 'Grocery'
    },
    project: {
      name: 'Gorgeous Fresh Bike'
    },
    typeOfExpense: 0,
  },
  {
    isSection: false,
    image: null,
    title: 'Shakey\'s',
    description: 'Mitch Belen',
    total: {
      amount: 1202,
      currency: 'PHP',
    },
    hasReceipt: false,
    comment: null,
    createdAt: '2019-01-25T19:14:26.441Z',
    status: 1,
    team: {
      id: '08d3ad5a-8287-4272-b23b-5ead3cbd79c1',
      name: 'Executives'
    },
    category: {
      name: 'Grocery'
    },
    project: {
      name: 'Gorgeous Fresh Bike'
    },
    typeOfExpense: 0,
  },
  {
    isSection: false,
    image: 'https://pbs.twimg.com/profile_images/511760717330919425/Tqe0ORv7_400x400.jpeg',
    title: 'TGI Fridays',
    description: 'Jon Danao',
    total: {
      amount: 2035,
      currency: 'PHP',
    },
    hasReceipt: true,
    comment: null,
    createdAt: '2019-01-25T19:14:26.441Z',
    status: 2,
    team: {
      id: '08d3ad5a-8287-4272-b23b-5ead3cbd79c1',
      name: 'Executives'
    },
    category: {
      name: 'Grocery'
    },
    project: {
      name: 'Gorgeous Fresh Bike'
    },
    typeOfExpense: 0,
  },
  {
    isSection: false,
    image: 'https://pbs.twimg.com/profile_images/745504113257943040/c9o1B6LW.jpg',
    title: 'Airbnb.com',
    description: 'Dominick Danao',
    total: {
      amount: 3800,
      currency: 'PHP',
    },
    hasReceipt: true,
    comment: null,
    createdAt: '2019-01-25T17:20:26.441Z',
    status: 1,
    team: {
      id: '08d3ad5a-8287-4272-b23b-5ead3cbd79c1',
      name: 'Executives'
    },
    category: {
      name: 'Grocery'
    },
    project: {
      name: 'Gorgeous Fresh Bike'
    },
    typeOfExpense: 0,
  },
  {
    isSection: false,
    image: 'https://media.licdn.com/dms/image/C5103AQG_YGVnHRo2yA/profile-displayphoto-shrink_200_200/0?e=1551312000&v=beta&t=UU019rmiLjwrWtGmeZIr9_Da8PZ2U85W8B09y50W3fM',
    title: 'Starbucks',
    description: 'Jerick Coneras',
    total: {
      amount: 385,
      currency: 'PHP',
    },
    hasReceipt: true,
    comment: {
      description: 'Coffee with client',
      author: 'Product Team',
    },
    createdAt: '2019-01-24T08:00:26.441Z',
    status: 2,
    team: {
      id: '08d3ad5a-8287-4272-b23b-5ead3cbd79c1',
      name: 'Executives'
    },
    category: {
      name: 'Grocery'
    },
    project: {
      name: 'Gorgeous Fresh Bike'
    },
    typeOfExpense: 1,
  },
  {
    isSection: false,
    image: 'https://media.licdn.com/dms/image/C5103AQG_YGVnHRo2yA/profile-displayphoto-shrink_200_200/0?e=1551312000&v=beta&t=UU019rmiLjwrWtGmeZIr9_Da8PZ2U85W8B09y50W3fM',
    title: 'Grab',
    description: 'Jerick Coneras',
    total: {
      amount: 420,
      currency: 'PHP',
    },
    hasReceipt: false,
    comment: null,
    createdAt: '2019-01-24T08:00:26.441Z',
    status: 2,
    team: {
      id: '08d3ad5a-8287-4272-b23b-5ead3cbd79c1',
      name: 'Executives'
    },
    category: {
      name: 'Grocery'
    },
    project: {
      name: 'Gorgeous Fresh Bike'
    },
    typeOfExpense: 1,
  },
  {
    isSection: false,
    image: 'https://media.licdn.com/dms/image/C5103AQG_YGVnHRo2yA/profile-displayphoto-shrink_200_200/0?e=1551312000&v=beta&t=UU019rmiLjwrWtGmeZIr9_Da8PZ2U85W8B09y50W3fM',
    title: 'Starbucks',
    description: 'Jerick Coneras',
    total: {
      amount: 500,
      currency: 'PHP',
    },
    hasReceipt: true,
    comment: null,
    createdAt: '2019-01-24T08:00:26.441Z',
    status: 2,
    team: {
      id: '08d3ad5a-8287-4272-b23b-5ead3cbd79c1',
      name: 'Executives'
    },
    category: {
      name: 'Grocery'
    },
    project: {
      name: 'Gorgeous Fresh Bike'
    },
    typeOfExpense: 1,
  },
  {
    isSection: false,
    image: 'https://pbs.twimg.com/profile_images/745504113257943040/c9o1B6LW.jpg',
    title: 'Amazon Web Services',
    description: 'Dominick Danao',
    total: {
      amount: 5000,
      currency: 'PHP',
    },
    hasReceipt: true,
    comment: null,
    createdAt: '2019-01-24T17:20:26.441Z',
    status: 2,
    team: {
      id: '08d3ad5a-8287-4272-b23b-5ead3cbd79c1',
      name: 'Executives'
    },
    category: {
      name: 'Grocery'
    },
    project: {
      name: 'Gorgeous Fresh Bike'
    },
    typeOfExpense: 0,
  },
];

const plasticCards = [
  {
    firstName: 'Dominick Nowell',
    lastName: 'Danao',
    companyName: 'Magpie.IM Inc',
    disabled: false
  },
  {
    firstName: 'Vanessa',
    lastName: 'Liwanag',
    companyName: 'Xpensio Corp',
    disabled: true
  }
];

const virtualCards = [
  {
    cardNo: '5202400498115500',
    firstName: 'Dominick Nowell',
    lastName: 'Danao',
    companyName: 'Magpie.IM Inc',
    address: '19F Marco Polo Hotel, Marelaco Ave Pasig City',
    expiryMonth: 9,
    expiryYear: 22,
    cvv: 102
  },
  {
    cardNo: '5121190809214355',
    firstName: 'Vanessa',
    lastName: 'Liwanag',
    companyName: 'Xpensio Corp',
    address: '19F Marco Polo Hotel, Marelaco Ave Pasig City',
    expiryMonth: 10,
    expiryYear: 34,
    cvv: 102
  }
];


export default {
  myPayments,
  teamPayments,
  myRequests,
  teamRequests,
  plasticCards,
  virtualCards
};
