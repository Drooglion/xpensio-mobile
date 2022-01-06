import React from 'react';

/* Deprecated, replace with react-native-skeleton */
// import ListLoader from 'library/components/ListLoader';
import PaymentsList from 'library/components/PaymentsList';

import styles from './styles';

const MyPayments = () => {
  const onItemClick = () => {};
  return <PaymentsList onItemClick={onItemClick} />;
};

export default MyPayments;
