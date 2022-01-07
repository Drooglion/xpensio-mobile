import React from 'react';

/* Deprecated, replace with react-native-skeleton */
// import ListLoader from 'library/components/ListLoader';
import PaymentsList from 'library/components/PaymentsList';
import { Payment } from 'types/Payment';

import styles from './styles';

const dummyData: Payment[][] = [
  [
    {
      image: null,
      merchantName: 'Merchant Name',
      status: 'APPROVED',
      attachments: [],
      createdAt: '2014-06-26 04:07:31',
      createdAtFormatted: 'July 24, 2022',
      amountTotal: 2500,
      originalAmount: 2500,
      originalCurrency: 'NZD',
    },
    {
      image: 'https://picsum.photos/200',
      merchantName: 'Merchant Name',
      status: 'APPROVED',
      attachments: [],
      createdAt: '2014-06-26 04:07:31',
      createdAtFormatted: 'July 24, 2022',
      amountTotal: 2500,
      originalAmount: 2500,
      originalCurrency: 'NZD',
    },
    {
      image: 'https://picsum.photos/200',
      merchantName: 'Merchant Name',
      status: 'APPROVED',
      attachments: [],
      createdAt: '2014-06-26 04:07:31',
      createdAtFormatted: 'July 24, 2022',
      amountTotal: 2500,
      originalAmount: 2500,
      originalCurrency: 'NZD',
    },
  ],
  [
    {
      image: 'https://picsum.photos/200',
      merchantName: 'Merchant Name',
      status: 'APPROVED',
      attachments: [],
      createdAt: '2014-06-26 04:07:31',
      createdAtFormatted: 'July 24, 2022',
      amountTotal: 2500,
      originalAmount: 2500,
      originalCurrency: 'NZD',
    },
  ],
];

const MyPayments = () => {
  const onItemClick = () => {};
  return <PaymentsList onItemClick={onItemClick} data={dummyData} />;
};

export default MyPayments;
