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
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png',
      merchantName: 'Starbucks',
      status: 1,
      attachments: [
        {
          url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Receipt.agr.jpg/800px-Receipt.agr.jpg',
        },
        {
          url: 'https://makereceipt.com/images/CustomLogoReceipt4.jpg',
        },
      ],
      createdAt: '2014-06-26 04:07:31',
      createdAtFormatted: 'July 24, 2022',
      amountTotal: 2500,
      originalAmount: 2500,
      originalCurrency: 'NZD',
    }),
    new Payment({
      id: '2',
      image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      merchantName: 'Merchant Name B',
      status: 2,
      attachments: [
        {
          url: 'https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/contoso-receipt.png',
        },
      ],
      createdAt: '2014-06-26 04:07:31',
      createdAtFormatted: 'July 24, 2022',
      amountTotal: 2500,
      originalAmount: 2500,
      originalCurrency: 'NZD',
    }),
    new Payment({
      id: '3',
      image:
        'https://assets.grab.com/wp-content/uploads/sites/4/2021/04/15151634/Grab_Logo_2021.jpg',
      merchantName: 'Grab',
      status: -1,
      attachments: [
        {
          url: 'https://miro.medium.com/max/2000/1*XABefyicvTbpAARnM33BLA.jpeg',
        },
        {
          url: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/MaxValu_Matsuyama_Store_receipt_JPY254_20191109.jpg',
        },
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
      image:
        'https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
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
