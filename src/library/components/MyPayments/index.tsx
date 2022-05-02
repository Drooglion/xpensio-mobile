import React, { useCallback } from 'react';

/* Deprecated, replace with react-native-skeleton */
// import ListLoader from 'library/components/ListLoader';
import { useNavigation } from '@react-navigation/native';
import PaymentsList from 'library/components/PaymentsList';

import styles from './styles';
import { IPayment } from 'types/Payment';

export interface MyPaymentsProps {
  data: IPayment[];
}

const MyPayments = ({ data }: MyPaymentsProps) => {
  const navigation = useNavigation();

  const onItemClick = useCallback(
    (payment: IPayment) => {
      navigation.navigate('PaymentsDetails' as never, { payment } as never);
    },
    [navigation],
  );

  return <PaymentsList onItemClick={onItemClick} data={data} />;
};

export default MyPayments;
