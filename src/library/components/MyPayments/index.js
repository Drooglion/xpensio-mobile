/* eslint-disable import/no-unresolved */
/* eslint-disable no-lonely-if */
import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import PAYMENTS from 'library/api/Payments';

import ListLoader from 'library/components/ListLoader';
import PaymentsList from 'library/components/PaymentsList';
import HelperUtils from 'library/utils/HelperUtils';

import styles from './styles';

const MyPayments = ({ onItemClick }) => {
  let page = 1;
  return (
    <Query
      query={PAYMENTS.MY_PAYMENTS}
      variables={{ page }}
      fetchPolicy="network-only"
    >
      {({
        error,
        loading,
        data,
        fetchMore,
        refetch,
      }) => {
        if (error) {
          HelperUtils.bugsnag.notify(error);
          return null;
        }

        if (loading) return <ListLoader style={styles.listLoader} />;
        const { myPayments: { payload: { result } } } = data;
        return (
          <PaymentsList
            data={result}
            refetch={refetch}
            loading={false}
            isRefreshing={false}
            onRefresh={() => { refetch(); page = 1; }}
            onItemClick={onItemClick}
            loadMore={() => {
              page += 1;
              fetchMore({
                variables: { page },
                updateQuery: (prev, { fetchMoreResult }) => {
                  if (!fetchMoreResult) return prev;
                  return Object.assign({}, prev, {
                    myPayments: {
                      ...prev.myPayments,
                      payload: {
                        ...prev.myPayments.payload,
                        result: [
                          ...prev.myPayments.payload.result,
                          ...fetchMoreResult.myPayments.payload.result
                        ]
                      }
                    }
                  });
                }
              });
            }}
          />
        );
      }}
    </Query>
  );
};

MyPayments.propTypes = {
  onItemClick: PropTypes.func.isRequired,
};

export default MyPayments;
