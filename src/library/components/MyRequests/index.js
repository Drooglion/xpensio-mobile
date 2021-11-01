/* eslint-disable import/no-unresolved */
/* eslint-disable no-lonely-if */
import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import REQUESTS from 'library/api/Requests';

import ListLoader from 'library/components/ListLoader';
import RequestsList from 'library/components/RequestsList';
import HelperUtils from 'library/utils/HelperUtils';

import styles from './styles';

const MyRequests = ({ onItemClick }) => {
  let page = 1;
  return (
    <Query
      query={REQUESTS.MY_REQUESTS}
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
        const { myRequests: { payload: { result } } } = data;
        return (
          <RequestsList
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
                    myRequests: {
                      ...prev.myRequests,
                      payload: {
                        ...prev.myRequests.payload,
                        result: [
                          ...prev.myRequests.payload.result,
                          ...fetchMoreResult.myRequests.payload.result
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

MyRequests.propTypes = {
  onItemClick: PropTypes.func.isRequired,
};

export default MyRequests;
