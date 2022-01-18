import React, { useCallback } from 'react';

/* Deprecated, replace with react-native-skeleton */
// import ListLoader from 'library/components/ListLoader';
import { useNavigation } from '@react-navigation/native';
import PaymentsList from 'library/components/PaymentsList';
import Payment from 'models/Payment';

import styles from './styles';

const dummyData: Payment[][] = [
  [
    new Payment({
      id: '1',
      image: null,
      merchantName: 'Merchant Name A',
      status: 1,
      attachments: [
        { url: 'https://picsum.photos/200' },
        { url: 'https://picsum.photos/200' },
      ],
      createdAt: '2014-06-26 04:07:31',
      createdAtFormatted: 'July 24, 2022',
      amountTotal: 2500,
      originalAmount: 2500,
      originalCurrency: 'NZD',
    }),
    new Payment({
      id: '2',
      image: 'https://picsum.photos/200',
      merchantName: 'Merchant Name B',
      status: 2,
      attachments: [],
      createdAt: '2014-06-26 04:07:31',
      createdAtFormatted: 'July 24, 2022',
      amountTotal: 2500,
      originalAmount: 2500,
      originalCurrency: 'NZD',
    }),
    new Payment({
      id: '3',
      image: 'https://picsum.photos/200',
      merchantName: 'Merchant Name C',
      status: -1,
      attachments: [
        { url: 'https://picsum.photos/200' },
        { url: 'https://picsum.photos/200' },
      ],
      createdAt: '2014-06-26 04:07:31',
      createdAtFormatted: 'July 24, 2022',
      amountTotal: 2500,
      originalAmount: 2500,
      originalCurrency: 'NZD',
    }),
  ],
  [
    new Payment({
      id: '4',
      image: 'https://picsum.photos/200',
      merchantName: 'Merchant Name D',
      status: 1,
      attachments: [],
      createdAt: '2014-06-26 04:07:31',
      createdAtFormatted: 'July 24, 2022',
      amountTotal: 2500,
      originalAmount: 2500,
      originalCurrency: 'NZD',
    }),
  ],
];

const MyPayments = () => {
  const navigation = useNavigation();

  const onItemClick = useCallback(
    (payment: Payment) => {
      navigation.navigate('PaymentsDetails' as never, { payment } as never);
    },
    [navigation],
  );

  return <PaymentsList onItemClick={onItemClick} data={dummyData} />;
};

export default MyPayments;
