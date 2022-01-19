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
      createdAt: '2014-06-26 05:12:31',
      createdAtFormatted: 'July 24, 2022',
      amountTotal: 2500,
      originalAmount: 2500,
      originalCurrency: 'NZD',
    }),
    new Payment({
      id: '2',
      image: null,
      merchantName: 'TGI Fridays',
      status: 2,
      attachments: [
        {
          url: 'https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/contoso-receipt.png',
        },
      ],
      createdAt: '2014-06-26 12:07:31',
      createdAtFormatted: 'July 24, 2022',
      amountTotal: 2500,
      originalAmount: 2500,
      originalCurrency: 'NZD',
    }),
    new Payment({
      id: '3',
      image:
        'data:image/png;base64,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',
      merchantName: 'Jollibee',
      status: -1,
      attachments: [
        {
          url: 'https://miro.medium.com/max/2000/1*XABefyicvTbpAARnM33BLA.jpeg',
        },
        {
          url: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/MaxValu_Matsuyama_Store_receipt_JPY254_20191109.jpg',
        },
      ],
      createdAt: '2014-06-26 18:07:31',
      createdAtFormatted: 'July 24, 2022',
      amountTotal: 2500,
      originalAmount: 2500,
      originalCurrency: 'NZD',
    }),
  ],
  [
    new Payment({
      id: '4',
      image: 'https://fontmeme.com/images/T.G.I.-Friday%E2%80%99s-Logo.jpg',
      merchantName: 'TGI Fridays',
      status: 1,
      attachments: [],
      createdAt: '2014-06-26 17:07:31',
      createdAtFormatted: 'Yesterday',
      amountTotal: 2500,
      originalAmount: 2500,
      originalCurrency: 'NZD',
    }),
    new Payment({
      id: '1123',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png',
      merchantName: 'Starbucks',
      status: 2,
      attachments: [
        {
          url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Receipt.agr.jpg/800px-Receipt.agr.jpg',
        },
        {
          url: 'https://makereceipt.com/images/CustomLogoReceipt4.jpg',
        },
      ],
      createdAt: '2014-06-26 03:12:31',
      createdAtFormatted: 'Yesterday',
      amountTotal: 600,
      originalAmount: 600,
      originalCurrency: 'NZD',
    }),
    new Payment({
      id: '1222',
      image:
        'https://play-lh.googleusercontent.com/1zfN_BL13q20v0wvBzMWiZ_sL_t4KcCJBeAMRpOZeT3p34quM-4-pO-VcLj8PJNXPA0',
      merchantName: 'Airbnb.com',
      status: 2,
      attachments: [
        {
          url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Receipt.agr.jpg/800px-Receipt.agr.jpg',
        },
        {
          url: 'https://makereceipt.com/images/CustomLogoReceipt4.jpg',
        },
      ],
      createdAt: '2014-06-26 03:12:31',
      createdAtFormatted: 'Yesterday',
      amountTotal: 28000,
      originalAmount: 28000,
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
